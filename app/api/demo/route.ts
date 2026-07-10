import { NextResponse } from "next/server";

import { demoRequestSchema } from "@/lib/validations";
import { sendDemoRequestEmails } from "@/lib/email";
import { submitToCrm } from "@/lib/crm";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = demoRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // The CRM lead is the primary record of this enquiry. Email notification is
  // best-effort on top of that -- a missing/misconfigured email provider
  // shouldn't fail the visitor's submission.
  const crmResult = await submitToCrm(parsed.data);
  if (!crmResult.ok) console.error("Failed to record demo request in CRM:", crmResult.error);

  try {
    await sendDemoRequestEmails(parsed.data);
  } catch (error) {
    console.error("Failed to send demo request emails", error);
  }

  return NextResponse.json({ ok: true });
}
