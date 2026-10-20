import { z } from "zod";

export const businessTypes = [
  "Mortgage Broker",
  "IFA",
  "Protection Adviser",
  "Equity Release",
  "Will Writer",
  "Estate Planner",
  "Accountant",
  "Other",
] as const;

export const referralSources = ["Google", "LinkedIn", "Referral", "Other"] as const;

export const demoRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  businessName: z.string().trim().min(2, "Enter your business name"),
  businessType: z.enum(businessTypes, {
    errorMap: () => ({ message: "Select a business type" }),
  }),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  referralSource: z.enum(referralSources, {
    errorMap: () => ({ message: "Let us know how you heard about us" }),
  }),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;

// ── Chat widget (app/api/chat) ──────────────────────────────────────────
export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(1500),
});

export const chatRequestSchema = z.object({
  // Capped at 20 (10 exchanges) — the widget only ever sends its own
  // trailing window, same idea as spark-AI's history.slice(-20).
  messages: z.array(chatMessageSchema).min(1).max(20),
  page: z.string().trim().max(200).optional(),
});

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;

// ── Readiness check (app/api/assess) ────────────────────────────────────
export const assessAnswerSchema = z.object({
  question: z.string().trim().max(300),
  answer: z.string().trim().max(200),
});

export const assessRequestSchema = z.object({
  tier: z.string().trim().max(100),
  score: z.number().min(0).max(100),
  answers: z.array(assessAnswerSchema).min(1).max(12),
  businessDescription: z.string().trim().max(300).optional().or(z.literal("")),
  name: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address").optional().or(z.literal("")),
  consent: z.boolean().optional(),
  // Spam signals only, same convention as the demo form — see lib/spam-check.ts.
  honeypot: z.string().optional(),
  renderedAt: z.number().optional(),
});

export type AssessRequestInput = z.infer<typeof assessRequestSchema>;
