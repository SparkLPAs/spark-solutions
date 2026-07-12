import type { Metadata } from "next";
import { CreditCard, Rocket, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { TrialForm } from "@/components/TrialForm";
import { FadeIn } from "@/components/FadeIn";
import { pricing } from "@/lib/env";

export const metadata: Metadata = {
  title: "Start Your Free Trial",
  description:
    "Start your free trial of Spark Solutions and add white-label estate planning — wills, trusts and LPAs — to your financial services business.",
  alternates: { canonical: "/start-trial" },
};

const expectations = [
  {
    icon: Rocket,
    title: `${pricing.trialDays} days, full access`,
    description: "Explore the document suite, Online Wills, training and marketing module — everything included.",
  },
  {
    icon: CreditCard,
    title: "No card required to start",
    description: "Cancel any time before your trial ends at no cost.",
  },
  {
    icon: ShieldCheck,
    title: "Within 1 business day",
    description: "We'll be in touch to get your account and branded site set up.",
  },
];

export default function StartTrialPage() {
  return (
    <>
      <PageHero
        eyebrow="Start Your Free Trial"
        title="Try Spark Solutions Free"
        subtitle={`Tell us a little about your business and we'll get your ${pricing.trialDays}-day free trial set up.`}
      />
      <section className="section">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <FadeIn>
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">What to expect</p>
              <div className="mt-6 space-y-8">
                {expectations.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-body">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <TrialForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
