import { NextResponse } from "next/server";

import { chatRequestSchema } from "@/lib/validations";
import { getAnthropic, CHAT_MODEL } from "@/lib/ai/client";
import { buildChatSystemPrompt, RESPOND_TOOL, respondToolOutputSchema } from "@/lib/ai/chat";
import { submitChatLeadToCrm } from "@/lib/crm";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`chat:${ip}`, { limit: 20, windowMs: 5 * 60 * 1000 });
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)) } }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = chatRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  let anthropic;
  try {
    anthropic = getAnthropic();
  } catch {
    console.error("ANTHROPIC_API_KEY is not configured");
    return NextResponse.json({ error: "Chat is not available right now." }, { status: 503 });
  }

  try {
    const response = await anthropic.messages.create({
      model: CHAT_MODEL,
      max_tokens: 1024,
      system: buildChatSystemPrompt(parsed.data.page),
      messages: parsed.data.messages.map((m) => ({ role: m.role, content: m.content })),
      tools: [RESPOND_TOOL],
      tool_choice: { type: "tool", name: "respond" },
    });

    const toolUse = response.content.find((block) => block.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      throw new Error("Model did not call the respond tool");
    }

    const output = respondToolOutputSchema.safeParse(toolUse.input);
    if (!output.success) {
      throw new Error("Model response did not match the expected shape");
    }

    let leadCaptured = false;
    if (output.data.lead) {
      const crmResult = await submitChatLeadToCrm(output.data.lead);
      if (!crmResult.ok) {
        console.error("Failed to record chat lead in CRM:", crmResult.error);
      }
      leadCaptured = crmResult.ok;
    }

    return NextResponse.json({
      reply: output.data.reply,
      suggestions: output.data.suggestions,
      leadCaptured,
    });
  } catch (error) {
    console.error("Chat request failed:", error);
    return NextResponse.json(
      { error: "Sorry, something went wrong. Please try again in a moment." },
      { status: 502 }
    );
  }
}
