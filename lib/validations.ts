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

export const trialRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  companyName: z.string().trim().min(2, "Enter your company name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
});

export type TrialRequestInput = z.infer<typeof trialRequestSchema>;
