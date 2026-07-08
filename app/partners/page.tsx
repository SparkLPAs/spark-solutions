import type { Metadata } from "next";
import { Check } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { CTABanner } from "@/components/CTABanner";
import { partnerModels } from "@/lib/content";

export const metadata: Metadata = {
  title: "White Label Will Writing Software UK — Compare Partner Models",
  description:
    "Compare the three ways to partner with Spark Solutions: White-Label, Branded Consultant and Referrer. White label will writing software UK for financial services professionals and will writers.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner Models"
        title="White Label Will Writing Software, or a Lighter-Touch Way In"
        subtitle="Three ways to work with Spark Solutions — from a full white-label platform under your own brand to a simple referral link. Choose the model that fits where your business is today."
      />

      <section className="section">
        <FadeIn>
          <p className="eyebrow text-center">Compare the Options</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
            Every model, one platform fee
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {partnerModels.map((model, i) => (
            <FadeIn key={model.name} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-lg border border-border bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <p className="eyebrow">{`Model ${i + 1}`}</p>
                <h3 className="mt-3 font-heading text-xl font-semibold text-ink">
                  {model.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-body">{model.summary}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {model.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm text-ink-body">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-md bg-surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Best for
                  </p>
                  <p className="mt-1 text-sm text-ink-body">{model.bestFor}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="section">
          <FadeIn>
            <p className="eyebrow text-center">Not Sure Which Fits?</p>
            <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
              You can change models as your business grows
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-ink-body">
              Many partners start as a Referrer to test demand, move to a Branded Consultant
              once they see steady client interest, and later upgrade to a full White-Label
              partnership once estate planning becomes a core part of their offering. There&apos;s
              no penalty for starting small.
            </p>
          </FadeIn>
        </div>
      </section>

      <CTABanner title="Talk to us about the right partner model for you" />
    </>
  );
}
