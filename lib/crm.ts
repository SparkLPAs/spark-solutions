import type { DemoRequestInput } from "@/lib/validations";

type CrmResult = { ok: boolean; error?: string };

// Sends a lead straight into the internal CRM's Leads board as unassigned.
// Best-effort: env vars are set once via Vercel, not code.
async function postLead(payload: {
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  message: string;
}): Promise<CrmResult> {
  const url = process.env.CRM_LEADS_URL;
  const secret = process.env.LEADS_INBOUND_SECRET;
  if (!url || !secret) {
    return { ok: false, error: "CRM_LEADS_URL or LEADS_INBOUND_SECRET is not configured" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
      body: JSON.stringify({ pipelineId: "spark-solutions", ...payload }),
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

export function submitDemoToCrm(data: DemoRequestInput): Promise<CrmResult> {
  return postLead({
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
  });
}

// Leads captured mid-conversation by the chat widget (app/api/chat) — far
// less structured than the demo form (no phone, business is optional,
// often just a name + email + one-line reason), so this intentionally
// doesn't reuse DemoRequestInput.
export function submitChatLeadToCrm(data: {
  name?: string;
  email: string;
  business?: string;
  reason?: string;
}): Promise<CrmResult> {
  return postLead({
    name: data.name || "Not given",
    company: data.business || "Not given",
    email: data.email,
    phone: "",
    source: "Spark Solutions AI assistant",
    message: data.reason || "Captured mid-conversation by the chat widget.",
  });
}

// Leads captured at the end of the "is this right for my practice?"
// readiness check (app/api/assess), once a visitor has opted in to be
// contacted about their result.
export function submitAssessLeadToCrm(data: {
  name?: string;
  email: string;
  tier: string;
  businessDescription?: string;
}): Promise<CrmResult> {
  return postLead({
    name: data.name || "Not given",
    company: data.businessDescription || "Not given",
    email: data.email,
    phone: "",
    source: "Spark Solutions readiness check",
    message: `Readiness result: ${data.tier}`,
  });
}
