import type { DemoRequestInput, TrialRequestInput } from "@/lib/validations";

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

export function submitTrialToCrm(data: TrialRequestInput): Promise<CrmResult> {
  return postLead({
    name: data.fullName,
    company: data.companyName,
    email: data.email,
    phone: data.phone,
    source: "Spark Solutions trial signup",
    message: "Requested via the Start Free Trial form.",
  });
}
