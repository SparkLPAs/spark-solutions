import { NextResponse } from "next/server";

import { demoRequestSchema } from "@/lib/validations";
import { sendDemoRequestEmails } from "@/lib/email";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = demoRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    await sendDemoRequestEmails(parsed.data);
  } catch (error) {
    console.error("Failed to send demo request emails", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
