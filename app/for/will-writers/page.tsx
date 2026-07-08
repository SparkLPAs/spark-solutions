import Link from "next/link";
import type { Metadata } from "next";
import { ScrollText, Landmark, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { FeatureCard } from "@/components/FeatureCard";
import { CTABanner } from "@/components/CTABanner";
import { coreFeatures, partnerModels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Will Writing Platform White Label for Will Writers & Estate Planners",
  description:
    "A white-label will writing platform for freelance will writers and small estate planning practices. Modern, guided will writing software for wills, trusts and LPAs — launch under your own brand in days.",
  alternates: { canonical: "/for/will-writers" },
};

const highlightFeatures = coreFeatures.filter((f) =>
  ["Wills", "Trusts", "LPAs"].includes(f.title)
);

const highlightIcons = [ScrollText, Landmark, ShieldCheck];

export default function WillWritersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Will Writers & Estate Planners"
        title="A White-Label Will Writing Platform for Modern Estate Planners"
        subtitle="Launch a guided, legally compliant will writing platform under your own brand — without building or maintaining any of the technology yourself."
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
      </PageHero>

      {/* Pain point */}
      <section className="section">
        <FadeIn>
          <h2 className="mx-auto max-w-3xl text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
            Your expertise deserves a modern platform, not a paper trail
          </h2>
        </FadeIn>
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <FadeIn>
            <div className="card h-full">
              <p className="eyebrow">The Problem</p>
              <p className="mt-3 leading-relaxed text-ink-body">
                Freelance will writers and small estate planning practices are experts at the
                work itself, but clients increasingly expect a guided, digital experience —
                not printed forms, back-and-forth emails and manual document tracking.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="card h-full">
              <p className="eyebrow">The Obstacle</p>
              <p className="mt-3 leading-relaxed text-ink-body">
                Building your own online wizard, payment flow and secure document storage
                takes time, money and technical skill most will writers simply don&apos;t have
                — or shouldn&apos;t have to spend their time on.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why it fits will writers */}
      <section className="border-y border-border bg-surface">
        <div className="section">
          <FadeIn>
            <p className="eyebrow text-center">Why It Fits Your Practice</p>
            <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
              Launch fast, keep your name on the door
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "Live in days, not months",
                body: "Skip the cost and time of building your own will writing software. Spark Solutions gives you a fully built, legally compliant platform ready to brand and launch.",
              },
              {
                title: "A guided, modern client experience",
                body: "Clients complete wills, trusts and LPAs through a structured online wizard — reducing errors, saving you admin time and giving them a far better experience than paper forms.",
              },
              {
                title: "Low-cost ways to start",
                body: "Whether you want your own branded platform or a fast, low-cost way to launch, the Branded Consultant and Referrer models let you start earning without a large upfront investment.",
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
          <p className="eyebrow text-center">The Full Document Suite</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
            Will writing software built for every client need
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
            <p className="eyebrow text-center">Fast, Low-Cost Ways To Launch</p>
            <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
              Branded Consultant or Referrer — your choice
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {[partnerModels[1], partnerModels[2]].map((model, i) => (
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

      <CTABanner title="Ready to launch your own will writing platform?" />
    </>
  );
}
