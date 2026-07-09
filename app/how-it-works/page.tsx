import type { Metadata } from "next";
import { UserPlus, Palette, TrendingUp } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { CTABanner } from "@/components/CTABanner";
import { pricing } from "@/lib/env";

export const metadata: Metadata = {
  title: "How It Works — Launch Your Estate Planning Platform in Three Steps",
  description:
    "See how Spark Solutions works: start your free trial, launch your branded site and explore your modules, then connect Stripe and start earning — usually live within days.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  {
    n: "1",
    icon: UserPlus,
    title: "Start your free trial",
    body: `Create your account and explore the full platform free for ${pricing.trialDays} days — the document suite, Online Wills, training and marketing module included. No card required to start, and you can cancel any time before the trial ends at no cost.`,
    mockup: {
      label: "Create Account",
      rows: ["Email verified", "Plan: Pro — all features"],
    },
  },
  {
    n: "2",
    icon: Palette,
    title: "Launch your branded website",
    body: "We launch a fully branded estate planning website for your business — your logo, your colours, compliant legal descriptions throughout, secured with HTTPS. Explore the Will Suite, Online Wills and training module while your site goes live.",
    mockup: {
      label: "Estate Planning Website",
      rows: ["Logo · Colours · Domain", "Status: Live"],
    },
  },
  {
    n: "3",
    icon: TrendingUp,
    title: "Connect Stripe and start earning",
    body: "Connect your own Stripe account so client payments land directly with you, then invite clients into their guided portal to create wills, trusts and LPAs. Watch your Leads, Revenue and Probate Bank grow from your dashboard as every document completes.",
    mockup: {
      label: "Your Estate Planning Hub",
      rows: ["Leads: Growing", "Revenue: Paid direct"],
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
