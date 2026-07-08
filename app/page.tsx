import Link from "next/link";
import type { Metadata } from "next";
import {
  Layers,
  CreditCard,
  ScrollText,
  ShieldCheck,
  Landmark,
  FolderLock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { FeatureCard } from "@/components/FeatureCard";
import { PricingCard } from "@/components/PricingCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTABanner } from "@/components/CTABanner";
import {
  coreFeatures,
  homeSteps,
  pricingFeatures,
  stats,
  testimonials,
  trustBar,
} from "@/lib/content";
import { pricing } from "@/lib/env";

export const metadata: Metadata = {
  title: "White-Label Estate Planning Platform for Financial Services",
  description:
    "Turn your client relationships into estate planning revenue with Spark Solutions — a fully branded platform for wills, trusts and LPAs, connected to your own Stripe account.",
  alternates: { canonical: "/" },
};

const featureIcons = [Layers, CreditCard, ScrollText, ShieldCheck, Landmark, FolderLock];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
        <div className="relative mx-auto max-w-8xl px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              Estate Planning · SaaS for Financial Services
            </p>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.08] sm:text-6xl">
              Turn Your Client Relationships Into Estate Planning Revenue
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Spark Solutions gives financial services professionals a fully branded
              estate planning platform — connected to their own Stripe account, ready
              in minutes.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/demo">
                <Button size="lg" className="bg-accent text-primary-dark hover:bg-accent/90">
                  Book a Free Demo
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>

          <FadeIn delay={0.15} className="relative mt-16">
            <div className="mx-auto max-w-4xl rounded-lg border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur">
              <div className="rounded-md bg-surface p-6 sm:p-10">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 rounded-full bg-primary/20" />
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-border" />
                    <div className="h-2.5 w-2.5 rounded-full bg-border" />
                    <div className="h-2.5 w-2.5 rounded-full bg-border" />
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {["Wills", "Trusts", "LPAs"].map((label) => (
                    <div key={label} className="rounded-md border border-border bg-white p-4">
                      <div className="h-2 w-12 rounded-full bg-accent" />
                      <p className="mt-3 font-heading text-sm font-semibold text-ink">
                        {label}
                      </p>
                      <div className="mt-3 h-1.5 w-full rounded-full bg-border" />
                      <div className="mt-2 h-1.5 w-2/3 rounded-full bg-border" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-white/10 pt-8 text-sm tracking-wide text-white/60">
            {trustBar.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Insight */}
      <section className="section">
        <FadeIn>
          <h2 className="max-w-3xl text-center font-heading text-3xl font-bold text-ink sm:text-4xl mx-auto">
            Your clients need estate planning. They just don&apos;t know it yet.
          </h2>
        </FadeIn>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "The Problem",
              body: "Estate planning is easy to put off. Most clients never think about it until a life event forces the conversation — by which point they've gone elsewhere for it.",
            },
            {
              title: "The Moment",
              body: "You already have the relationship, the trust and the timing. A mortgage review, a protection conversation, an annual check-in — each one is a natural opening.",
            },
            {
              title: "The Opportunity",
              body: "Spark Solutions turns that moment into revenue. Offer wills, trusts and LPAs under your own brand, without building or maintaining any of it yourself.",
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <div className="card h-full">
                <p className="eyebrow">{item.title}</p>
                <p className="mt-3 text-ink-body leading-relaxed">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-surface">
        <div className="section">
          <FadeIn>
            <p className="eyebrow text-center">How It Works</p>
            <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
              Three steps. Keep it simple.
            </h2>
          </FadeIn>
          <ol className="mt-14 grid gap-10 sm:grid-cols-3">
            {homeSteps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.1}>
                <li>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-primary font-heading text-lg font-bold text-primary">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-body">{s.body}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* Who It Is For */}
      <section className="section">
        <FadeIn>
          <p className="eyebrow text-center">Who It&apos;s For</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
            Built for two kinds of estate planning business
          </h2>
        </FadeIn>
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <FadeIn>
            <Link
              href="/for/financial-services"
              className="card block h-full transition hover:border-primary"
            >
              <h3 className="font-heading text-xl font-semibold text-ink">
                Financial Services Professionals
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-body">
                Mortgage brokers, IFAs, protection advisers and equity release
                specialists who want to add estate planning revenue to existing client
                relationships.
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-primary">
                See how it fits your business →
              </span>
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/for/will-writers"
              className="card block h-full transition hover:border-primary"
            >
              <h3 className="font-heading text-xl font-semibold text-ink">
                Will Writers &amp; Estate Planners
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-body">
                Freelance will writers and small practices who want a modern, guided
                platform without building their own technology.
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-primary">
                See how it fits your business →
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="border-y border-border bg-surface">
        <div className="section">
          <FadeIn>
            <p className="eyebrow text-center">Features</p>
            <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
              Everything you need to launch
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map((f, i) => (
              <FadeIn key={f.title} delay={(i % 3) * 0.1}>
                <FeatureCard icon={featureIcons[i]} title={f.title} description={f.description} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section">
        <FadeIn>
          <p className="eyebrow text-center">Pricing</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
            One simple platform fee
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-14">
          <PricingCard
            price={pricing.monthly}
            setupFee={pricing.setupFee}
            features={pricingFeatures.slice(0, 5)}
          />
        </FadeIn>
        <p className="mt-8 text-center text-sm text-ink-muted">
          <Link href="/pricing" className="font-semibold text-primary">
            See the full pricing breakdown →
          </Link>
        </p>
      </section>

      {/* Social Proof */}
      <section className="border-y border-border bg-surface">
        <div className="section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <FadeIn>
              <div className="grid grid-cols-3 gap-6 sm:gap-10">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-mono text-3xl font-medium text-primary sm:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-2 text-xs leading-snug text-ink-muted sm:text-sm">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid gap-6">
                {testimonials.map((t) => (
                  <TestimonialCard key={t.name} {...t} />
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTABanner title="Ready to add estate planning to your business?" />
    </>
  );
}
