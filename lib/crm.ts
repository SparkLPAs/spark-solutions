import type { DemoRequestInput } from "@/lib/validations";

// Sends a demo request straight into the internal CRM's Leads board as an
// unassigned lead. Best-effort: env vars are set once via Vercel, not code.
export async function submitToCrm(data: DemoRequestInput): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.CRM_LEADS_URL;
  const secret = process.env.LEADS_INBOUND_SECRET;
  if (!url || !secret) {
    return { ok: false, error: "CRM_LEADS_URL or LEADS_INBOUND_SECRET is not configured" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
      body: JSON.stringify({
        pipelineId: "spark-solutions",
        name: data.fullName,
        company: data.businessName,
        email: data.email,
        phone: data.phone,
        source: "Spark Solutions demo form",
        message: [
          `Business type: ${data.businessType}`,
          `Heard about us via: ${data.referralSource}`,
          data.message ? `Message: ${data.message}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, error: `CRM responded ${res.status}: ${body}` };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}
