import { NextResponse } from "next/server";

import { trialRequestSchema } from "@/lib/validations";
import { sendTrialRequestEmails } from "@/lib/email";
import { submitTrialToCrm } from "@/lib/crm";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = trialRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // The CRM lead is the primary record of this enquiry. Email notification is
  // best-effort on top of that -- a missing/misconfigured email provider
  // shouldn't fail the visitor's submission.
  const crmResult = await submitTrialToCrm(parsed.data);
  if (!crmResult.ok) console.error("Failed to record trial request in CRM:", crmResult.error);

  try {
    await sendTrialRequestEmails(parsed.data);
  } catch (error) {
    console.error("Failed to send trial request emails", error);
  }

  return NextResponse.json({ ok: true });
}
