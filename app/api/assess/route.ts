import { NextResponse } from "next/server";

import { assessRequestSchema } from "@/lib/validations";
import { isLikelySpam } from "@/lib/spam-check";
import { getAnthropic, CHAT_MODEL } from "@/lib/ai/client";
import { buildAssessSystemPrompt, WRITE_REPORT_TOOL, writeReportToolOutputSchema } from "@/lib/ai/assess";
import { submitAssessLeadToCrm } from "@/lib/crm";
import { sendAssessmentReportEmail } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  // Lower limit than /api/chat: this generates a full report in one call,
  // not a short reply, so it costs more per request.
  const rate = checkRateLimit(`assess:${ip}`, { limit: 8, windowMs: 60 * 60 * 1000 });
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a while." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)) } }
    );
  }

  const json = await request.json().catch(() => null);

  if (json && isLikelySpam(json)) {
    console.log("Blocked a likely-spam readiness check submission");
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 400 });
  }

  const parsed = assessRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
  const data = parsed.data;

  let anthropic;
  try {
    anthropic = getAnthropic();
  } catch {
    console.error("ANTHROPIC_API_KEY is not configured");
    return NextResponse.json(
      { error: "The readiness check isn't available right now. Please try again shortly." },
      { status: 503 }
    );
  }

  const answersBlock = data.answers.map((a) => `- ${a.question} → ${a.answer}`).join("\n");
  const userMessage = [
    `Readiness tier: ${data.tier} (score: ${data.score}%)`,
    data.businessDescription ? `What the business does: ${data.businessDescription}` : null,
    `Quiz answers:\n${answersBlock}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const response = await anthropic.messages.create({
      model: CHAT_MODEL,
      max_tokens: 1536,
      system: buildAssessSystemPrompt(),
      messages: [{ role: "user", content: userMessage }],
      tools: [WRITE_REPORT_TOOL],
      tool_choice: { type: "tool", name: "write_report" },
    });

    const toolUse = response.content.find((block) => block.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      throw new Error("Model did not call the write_report tool");
    }

    const output = writeReportToolOutputSchema.safeParse(toolUse.input);
    if (!output.success) {
      throw new Error("Model response did not match the expected shape");
    }

    let emailed = false;
    if (data.consent && data.email) {
      try {
        await sendAssessmentReportEmail(data.email, data.name || undefined, output.data);
        emailed = true;
      } catch (error) {
        console.error("Failed to send readiness check report email:", error);
      }

      const crmResult = await submitAssessLeadToCrm({
        name: data.name || undefined,
        email: data.email,
        tier: data.tier,
        businessDescription: data.businessDescription || undefined,
      });
      if (!crmResult.ok) {
        console.error("Failed to record readiness check lead in CRM:", crmResult.error);
      }
    }

    return NextResponse.json({ report: output.data, emailed });
  } catch (error) {
    console.error("Readiness check request failed:", error);
    return NextResponse.json(
      { error: "We couldn't generate your report just now. Please try again in a minute." },
      { status: 502 }
    );
  }
}
