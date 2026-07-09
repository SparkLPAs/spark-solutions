export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Spark Solutions",
  // Partner login and trial signup live on the existing platform backend, not
  // in this app. "Start Free Trial" creates a real account and triggers
  // backend provisioning of a white-labelled site — it is NOT the /demo
  // lead-capture form. Point these at the real URLs once the Spark-branded
  // backend exists.
  loginUrl: process.env.NEXT_PUBLIC_LOGIN_URL || "#",
  signupUrl: process.env.NEXT_PUBLIC_SIGNUP_URL || "#",
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
