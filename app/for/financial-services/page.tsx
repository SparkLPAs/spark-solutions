import Link from "next/link";
import type { Metadata } from "next";
import { CreditCard, Layers, Bot } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { FeatureCard } from "@/components/FeatureCard";
import { CTABanner } from "@/components/CTABanner";
import { businessTypeLabels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Estate Planning Software for Financial Advisers & Mortgage Brokers",
  description:
    "Estate planning software for financial advisers, mortgage brokers and protection specialists. Add a fully branded wills, trusts and LPA platform to your business — connected to your own Stripe account.",
  alternates: { canonical: "/for/financial-services" },
};

const highlightFeatures = [
  {
    title: "White-Labelled Website",
    description:
      "We launch a fully branded estate planning website for your business — your logo, your colours, secured with HTTPS.",
  },
  {
    title: "AI-Assisted Documents",
    description:
      "Industry-leading document generation software for wills, trusts and LPAs, with an AI assistant on hand for estate planning queries.",
  },
  {
    title: "Paid Directly via Stripe",
    description:
      "Your revenue is paid to you directly via Stripe — Spark Solutions charges a single platform fee, nothing more.",
  },
];

const highlightIcons = [Layers, Bot, CreditCard];
const highlightTones = ["blue", "navy", "green"] as const;

export default function FinancialServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="For Financial Services Professionals"
        title="Estate Planning Software for Financial Advisers and Mortgage Brokers"
        subtitle="Add a fully branded estate planning platform to your existing client relationships — wills, trusts and LPAs, connected to your own Stripe account, live in days."
      >
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link href="/start-trial">
            <Button size="lg" className="bg-accent text-primary-dark hover:bg-accent/90">
              Start Free Trial
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="lg" variant="outline">
              Book a Demo
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
              <FeatureCard
                icon={highlightIcons[i]}
                title={f.title}
                description={f.description}
                tone={highlightTones[i]}
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* What's included callout */}
      <section className="border-y border-border bg-surface">
        <div className="section">
          <FadeIn>
            <p className="eyebrow text-center">One Plan, Everything Included</p>
            <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
              No tiers to navigate, no add-ons to negotiate
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-ink-body">
              Every partner gets the full platform — the branded website, the document
              suite, Online Wills, the legal &amp; probate partner, training and
              marketing — for a single monthly fee.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="mt-10 text-center">
            <Link href="/pricing" className="text-sm font-semibold text-primary">
              See the full pricing breakdown →
            </Link>
          </FadeIn>
        </div>
      </section>

      <CTABanner title="Ready to add estate planning to your business?" />
    </>
  );
}
