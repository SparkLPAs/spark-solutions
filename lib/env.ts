export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Spark Solutions",
  // The Spark-branded backend now exists and is live (app.spark-solutions.co.uk,
  // the partner dashboard) — pointing these at its real Clerk sign-in/sign-up
  // routes. /start-trial used to be a local lead-capture form
  // (components/TrialForm.tsx, now removed) — every CTA points here
  // instead, and /start-trial itself redirects here too (next.config.mjs).
  loginUrl: process.env.NEXT_PUBLIC_LOGIN_URL || "https://app.spark-solutions.co.uk/sign-in",
  signupUrl: process.env.NEXT_PUBLIC_SIGNUP_URL || "https://app.spark-solutions.co.uk/sign-up",
};

export const pricing = {
  monthly: Number(process.env.NEXT_PUBLIC_MONTHLY_PRICE ?? 325),
  setupFee: Number(process.env.NEXT_PUBLIC_SETUP_FEE ?? 0),
  trialDays: Number(process.env.NEXT_PUBLIC_TRIAL_DAYS ?? 14),
};

export const analytics = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || "",
};

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
