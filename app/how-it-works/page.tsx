import type { Metadata } from "next";
import { CreditCard, Palette, TrendingUp } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "How It Works — Launch Your Estate Planning Platform in Three Steps",
  description:
    "See how Spark Solutions works: sign up and connect Stripe, customise your brand, and start earning estate planning revenue — usually live within days.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    n: "1",
    icon: CreditCard,
    title: "Sign up and connect Stripe",
    body: "Create your Spark Solutions account and choose your partner model — White-Label, Branded Consultant or Referrer. During onboarding you connect your own Stripe account, so client payments are set up to reach you directly from day one. There's no lengthy application process and no need to speak to a developer.",
    mockup: {
      label: "Stripe Connect",
      rows: ["Account connected", "Payouts: Direct to you"],
    },
  },
  {
    n: "2",
    icon: Palette,
    title: "Customise your brand",
    body: "Upload your logo, set your colours and connect your own domain, or launch straight away under the Spark Solutions brand as a Branded Consultant. Every client-facing email, page and document reflects your chosen setup, so clients experience a platform that feels like a natural extension of your existing business.",
    mockup: {
      label: "Brand Settings",
      rows: ["Logo · Colours · Domain", "Client emails: Your brand"],
    },
  },
  {
    n: "3",
    icon: TrendingUp,
    title: "Start earning",
    body: "Invite clients into their own guided portal to create wills, trusts and LPAs — at a mortgage review, a protection conversation or an annual check-in. They complete their documents online at their own pace, payments land directly in your Stripe account, and every document is stored securely for as long as they need it.",
    mockup: {
      label: "Partner Dashboard",
      rows: ["Clients invited: Live", "Revenue: Paid direct"],
    },
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="Three Steps From Sign-Up to Estate Planning Revenue"
        subtitle="Spark Solutions is built to be simple to launch. Most partners are live and inviting clients within days, not months."
      />

      <section className="section">
        <div className="space-y-20">
          {steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.05}>
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-primary font-heading text-lg font-bold text-primary">
                    {step.n}
                  </span>
                  <h2 className="mt-5 font-heading text-2xl font-bold text-ink sm:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink-body">{step.body}</p>
                </div>
                <div
                  className={`rounded-lg border border-border bg-surface p-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${
                    i % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="rounded-md bg-white p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <step.icon className="h-4 w-4" />
                      </div>
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-border" />
                        <div className="h-2.5 w-2.5 rounded-full bg-border" />
                        <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                      </div>
                    </div>
                    <p className="mt-6 font-heading text-sm font-semibold text-ink">
                      {step.mockup.label}
                    </p>
                    <div className="mt-4 space-y-3">
                      {step.mockup.rows.map((row) => (
                        <div
                          key={row}
                          className="flex items-center justify-between rounded-md border border-border px-4 py-3"
                        >
                          <span className="text-xs text-ink-muted">{row}</span>
                          <div className="h-1.5 w-10 rounded-full bg-accent" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <CTABanner title="See it for yourself in a live demo" />
    </>
  );
}
