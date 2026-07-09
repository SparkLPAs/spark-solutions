import type { Metadata } from "next";
import { Plus, Globe, Bot, ScrollText, Scale, GraduationCap, Megaphone } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { PricingCard } from "@/components/PricingCard";
import { CTABanner } from "@/components/CTABanner";
import { pricingFeatures, faqs, modules } from "@/lib/content";
import { pricing, formatPrice } from "@/lib/env";

const moduleIcons = [Globe, Bot, ScrollText, Scale, GraduationCap, Megaphone];
const moduleLabels = [
  "Branded Website",
  "AI-Assisted Documents",
  "Online Wills",
  "Legal & Probate Partner",
  "Training",
  "Marketing",
];

export const metadata: Metadata = {
  title: "Pricing — Estate Planning SaaS UK, One Simple Platform Fee",
  description: `Transparent pricing for Spark Solutions, the estate planning SaaS UK financial services professionals and will writers trust. ${formatPrice(
    pricing.monthly
  )}/month, no setup fee, no per-transaction cut.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="Pricing"
        title="Estate Planning SaaS UK Pricing: One Simple Platform Fee"
        subtitle={`No setup fee and no per-transaction cut — just a single monthly platform fee, with a ${pricing.trialDays}-day free trial to try everything first.`}
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[56rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-hero-mesh opacity-40 blur-2xl" />
        <div className="section relative">
          <FadeIn>
            <PricingCard
              price={pricing.monthly}
              setupFee={pricing.setupFee}
              features={pricingFeatures}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mx-auto mt-14 max-w-3xl">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Every module, every plan
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {modules.map((m, i) => {
                  const Icon = moduleIcons[i];
                  return (
                    <div key={m.title} className="flex items-center gap-2 text-ink-muted">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium sm:text-sm">{moduleLabels[i]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="section">
          <FadeIn>
            <p className="eyebrow text-center">Frequently Asked Questions</p>
            <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
              Everything you need to know
            </h2>
          </FadeIn>

          <div className="mx-auto mt-14 max-w-2xl divide-y divide-border rounded-lg border border-border bg-white">
            {faqs.map((faq, i) => (
              <FadeIn key={faq.q} delay={(i % 5) * 0.05}>
                <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-semibold text-ink">
                    {faq.q}
                    <Plus className="h-4 w-4 shrink-0 text-primary transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-body">{faq.a}</p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="No setup fee. No per-transaction cut."
        subtitle={`Try everything free for ${pricing.trialDays} days. Cancel any time before your trial ends.`}
      />
    </>
  );
}
