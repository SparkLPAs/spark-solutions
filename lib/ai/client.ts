import Anthropic from "@anthropic-ai/sdk";

// Server-side only — never imported from a client component. Mirrors
// lib/email.ts's getResend(): a key missing in a given environment throws
// at call time rather than crashing the build.
export const CHAT_MODEL = "claude-sonnet-5";

export function getAnthropic(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  return new Anthropic({ apiKey });
}
