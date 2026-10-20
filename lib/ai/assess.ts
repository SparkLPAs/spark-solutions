import type Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

import { modules, pricingFeatures } from "@/lib/content";
import { pricing, formatPrice } from "@/lib/env";

// Grounds the readiness-check report the same way lib/ai/chat.ts grounds
// the chat widget: real modules, real pricing, read at request time.
export function buildAssessSystemPrompt(): string {
  const modulesList = modules.map((m) => `${m.n}. ${m.title} — ${m.description}`).join("\n");
  const featuresList = pricingFeatures.map((f) => `- ${f}`).join("\n");

  return `You write the result of Spark Solutions' "Is this right for my practice?" readiness check — a \
short quiz a prospective partner (financial adviser, mortgage broker, will writer, accountant and \
similar) just completed on spark-solutions.co.uk.

You'll be given their quiz answers and an optional one-line description of their business. Write a \
short, honest, specific report on how well Spark Solutions fits what they told you — not a generic \
sales pitch, and not a 12-month roadmap. This is a go/no-go nudge for someone evaluating whether to \
book a demo or start a trial.

FACTS YOU MAY STATE (the only platform facts you know — never add, estimate or recall others):
- Platform fee: from ${formatPrice(pricing.monthly)}/month (up to ${formatPrice(pricing.monthlyMax)}/month depending on the document engine chosen at setup)
- Setup fee: ${pricing.setupFee === 0 ? "none" : formatPrice(pricing.setupFee)}
- Free trial: ${pricing.trialDays} days, cancel any time before it ends

The six modules every partner gets, for one fee:
${modulesList}

${featuresList}

RULES:
- Base every point on what THEY told you in their answers — generic praise that could apply to anyone \
is a failure here. Reference their specific situation (volume, current process, what they said matters \
most to them).
- Be honest about fit, not just positive. If their answers suggest a real mismatch or an open question \
(e.g. they already have an established platform, or their volume is very low), say so plainly as a \
"watch out" rather than glossing over it — this builds more trust than pure positivity, and matches \
how the rest of the site talks (plain, no hype).
- Never invent a partner testimonial, case study or outcome. Never state a fact about the platform \
that isn't in the list above.
- Never give legal, financial or regulatory advice — if their answers touch on compliance concerns, \
note that it's worth raising directly with the team, don't answer it yourself.
- Plain UK English, no hype, no exclamation marks, no emoji.
- You must always respond by calling the "write_report" tool — never plain text.`;
}

export const WRITE_REPORT_TOOL: Anthropic.Tool = {
  name: "write_report",
  description: "Submit the finished readiness-check report.",
  input_schema: {
    type: "object",
    properties: {
      headline: {
        type: "string",
        description: "One short, specific sentence capturing the overall fit — not a generic tagline.",
      },
      summary: {
        type: "string",
        description: "2-3 sentences summarising their situation and how Spark Solutions fits it.",
      },
      fit_points: {
        type: "array",
        items: { type: "string" },
        description: "3-5 specific reasons this fits their business, each grounded in their actual answers and a real platform module/feature.",
      },
      watch_outs: {
        type: "array",
        items: { type: "string" },
        description: "0-3 honest considerations or open questions worth raising before signing up, based on their answers. Empty array if genuinely none.",
      },
      recommended_path: {
        type: "string",
        description: "One or two sentences recommending a specific next step (book a demo / start the free trial / talk to the team about X) and why, given their answers.",
      },
      closing: {
        type: "string",
        description: "One short closing sentence.",
      },
    },
    required: ["headline", "summary", "fit_points", "watch_outs", "recommended_path", "closing"],
  },
};

export const writeReportToolOutputSchema = z.object({
  headline: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  fit_points: z.array(z.string().trim().min(1)).min(1).max(6),
  watch_outs: z.array(z.string().trim().min(1)).max(4).default([]),
  recommended_path: z.string().trim().min(1),
  closing: z.string().trim().min(1),
});

export type WriteReportToolOutput = z.infer<typeof writeReportToolOutputSchema>;
