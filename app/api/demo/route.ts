import { NextResponse } from "next/server";

import { demoRequestSchema } from "@/lib/validations";
import { sendDemoRequestEmails } from "@/lib/email";
import { submitDemoToCrm } from "@/lib/crm";
import { isLikelySpam } from "@/lib/spam-check";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);

  // Checked before real validation, on the raw body — honeypot/renderedAt
  // aren't part of demoRequestSchema, they're spam signals only. A fake
  // "success" response (no CRM entry, no emails sent) avoids tipping a bot
  // off that it was filtered, and costs nothing beyond this one check.
  if (json && isLikelySpam(json)) {
    console.log("Blocked a likely-spam demo request submission");
    return NextResponse.json({ ok: true });
  }

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
  const crmResult = await submitDemoToCrm(parsed.data);
  if (!crmResult.ok) console.error("Failed to record demo request in CRM:", crmResult.error);

  try {
    await sendDemoRequestEmails(parsed.data);
  } catch (error) {
    console.error("Failed to send demo request emails", error);
  }

  return NextResponse.json({ ok: true });
}
