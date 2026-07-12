declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackDemoRequestSubmitted() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "demo_request_submitted" });

  window.fbq?.("track", "Lead");
}

export function trackTrialRequestSubmitted() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "trial_request_submitted" });

  window.fbq?.("track", "Lead");
}
