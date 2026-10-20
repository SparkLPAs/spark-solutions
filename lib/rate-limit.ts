// Lightweight, no-new-dependency rate limiting for the public AI endpoints
// (/api/chat, /api/assess) — same philosophy as lib/spam-check.ts: these
// endpoints have no auth, call a paid LLM API per request, and cost real
// money if scripted. A fixed-window counter per IP, held in memory.
//
// Known limitation: this resets on every cold start and isn't shared across
// concurrent serverless instances, so it's a best-effort speed bump, not a
// hard guarantee — it stops a casual script hammering a single warm
// instance, not a distributed attack. If that's not enough, the real next
// step is a managed store (Upstash Redis) or a challenge (Cloudflare
// Turnstile) — deliberately not reached for here first.
type Bucket = { count: number; windowStart: number };

const buckets = new Map<string, Bucket>();

// Keeps the map from growing unbounded across a long-lived warm instance.
const MAX_TRACKED_KEYS = 5000;

export function checkRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStart >= windowMs) {
    if (buckets.size >= MAX_TRACKED_KEYS) buckets.clear();
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (existing.count >= limit) {
    return { allowed: false, retryAfterMs: windowMs - (now - existing.windowStart) };
  }

  existing.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

// Vercel sets x-forwarded-for on every request; this is a best-effort
// client identifier, not an authenticated one.
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
