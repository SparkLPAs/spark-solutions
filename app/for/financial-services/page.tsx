import Link from "next/link";
import type { Metadata } from "next";
import { CreditCard, Layers, FolderLock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { FeatureCard } from "@/components/FeatureCard";
import { CTABanner } from "@/components/CTABanner";
import { coreFeatures, partnerModels, businessTypeLabels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Estate Planning Software for Financial Advisers & Mortgage Brokers",
  description:
    "Estate planning software for financial advisers, mortgage brokers and protection specialists. Add a fully branded wills, trusts and LPA platform to your business — connected to your own Stripe account.",
  alternates: { canonical: "/for/financial-services" },
};

const highlightFeatures = coreFeatures.filter((f) =>
  ["Stripe Connect", "White-Label Ready", "Document Storage"].includes(f.title)
);

const highlightIcons = [CreditCard, Layers, FolderLock];

export default function FinancialServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="For Financial Services Professionals"
        title="Estate Planning Software for Financial Advisers and Mortgage Brokers"
        subtitle="Add a fully branded estate planning platform to your existing client relationships — wills, trusts and LPAs, connected to your own Stripe account, live in days."
      >
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link href="/demo">
            <Button size="lg" className="bg-accent text-primary-dark hover:bg-accent/90">
              Book a Free Demo
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline">
              See Pricing
            </Button>
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/10 pt-6 text-sm tracking-wide text-white/60">
          {businessTypeLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </PageHero>

      {/* Pain point */}
      <section className="section">
        <FadeIn>
          <h2 className="mx-auto max-w-3xl text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
            Your clients need estate planning. You don&apos;t want to build a platform for it.
          </h2>
        </FadeIn>
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <FadeIn>
            <div className="card h-full">
              <p className="eyebrow">The Problem</p>
              <p className="mt-3 leading-relaxed text-ink-body">
                Estate planning is rarely top of mind for your clients — until a mortgage
                completes, a protection policy is set up, or a life event forces the
                conversation. By then they&apos;ve often gone elsewhere for their will, trust
                or LPA, and that revenue and relationship goes with them.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="card h-full">
              <p className="eyebrow">The Obstacle</p>
              <p className="mt-3 leading-relaxed text-ink-body">
                Building a compliant will-writing platform for England &amp; Wales, integrating
                secure document storage and handling payments isn&apos;t something a mortgage
                broker, IFA or protection adviser has the time, budget or appetite to build —
                and shouldn&apos;t need to.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why it fits FS */}
      <section className="border-y border-border bg-surface">
        <div className="section">
          <FadeIn>
            <p className="eyebrow text-center">Why It Fits Your Business</p>
            <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
              You already have the trust. We supply the platform.
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "Existing trusted relationships",
                body: "Clients already trust you with their mortgage, protection or financial planning. Extending that trust to their will, trust or LPA is a natural next step, not a cold introduction.",
              },
              {
                title: "Natural moments to ask",
                body: "A mortgage review, a new protection policy or an annual financial review are all moments where estate planning belongs in the conversation — and where clients are receptive to acting.",
              },
              {
                title: "Revenue without the overhead",
                body: "Offer wills, trusts and LPAs under your own brand and take the revenue directly through your own Stripe account, without hiring, training or building anything in-house.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="card h-full">
                  <h3 className="font-heading text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-body">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <FadeIn>
          <p className="eyebrow text-center">Built For The Way You Work</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
            An estate planning platform for mortgage brokers and advisers
          </h2>
        </FadeIn>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {highlightFeatures.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.1}>
              <FeatureCard icon={highlightIcons[i]} title={f.title} description={f.description} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Partner model callout */}
      <section className="border-y border-border bg-surface">
        <div className="section">
          <FadeIn>
            <p className="eyebrow text-center">Choose Your Level of Involvement</p>
            <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
              From full white-label to a simple referral
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {[partnerModels[0], partnerModels[2]].map((model, i) => (
              <FadeIn key={model.name} delay={i * 0.1}>
                <div className="card h-full">
                  <h3 className="font-heading text-xl font-semibold text-ink">{model.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-body">{model.summary}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Best for: <span className="font-normal normal-case">{model.bestFor}</span>
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2} className="mt-10 text-center">
            <Link href="/partners" className="text-sm font-semibold text-primary">
              Compare all three partner models →
            </Link>
          </FadeIn>
        </div>
      </section>

      <CTABanner title="Ready to add estate planning to your business?" />
    </>
  );
}
