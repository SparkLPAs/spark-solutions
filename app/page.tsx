import Link from "next/link";
import type { Metadata } from "next";
import { Users, TrendingUp, Landmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { PricingCard } from "@/components/PricingCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CTABanner } from "@/components/CTABanner";
import {
  homeSteps,
  hubStats,
  modules,
  pricingFeatures,
  stats,
  testimonials,
  trustBar,
} from "@/lib/content";
import { pricing, site } from "@/lib/env";

export const metadata: Metadata = {
  title: "White-Label Estate Planning Platform for Financial Services",
  description:
    "Spark Solutions gives financial services professionals a fully branded estate planning platform — AI-assisted document generation, Online Wills, a legal & probate partner, and a Probate Bank that grows with every will you write.",
  alternates: { canonical: "/" },
};

const hubIcons = [Users, TrendingUp, Landmark];
const hubAccents = ["text-leads", "text-revenue", "text-probate"];
const hubDots = ["bg-leads", "bg-revenue", "bg-probate"];
const moduleTones = [
  "bg-primary/10 text-primary",
  "bg-primary-dark/10 text-primary-dark",
  "bg-leads/10 text-leads",
  "bg-accent/25 text-primary-dark",
  "bg-revenue/10 text-revenue",
  "bg-primary/10 text-primary",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
        <div className="relative mx-auto max-w-8xl px-6 py-24 sm:py-32">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                Estate Planning · SaaS for Financial Services
              </p>
              <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.08] sm:text-6xl">
                Power Your Estate Planning Business, All in One Platform
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                A white-labelled website, AI-assisted document generation, self-service
                Online Wills, a regulated legal &amp; probate partner, training and
                marketing — everything a will writer, estate planning consultant or
                financial services professional needs to run the business, in one place.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href={site.signupUrl}>
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
              <p className="mt-4 text-sm text-white/50">
                {pricing.trialDays} days free. No card required to start exploring.
              </p>
            </div>

            <FadeIn delay={0.15}>
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-4 rounded-[1.75rem] bg-gradient-to-br from-accent/20 via-transparent to-leads/10 blur-2xl" />
                <div className="relative rounded-xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl backdrop-blur">
                  <div className="rounded-lg bg-surface p-6">
                    <div className="flex items-center justify-between">
                      <p className="font-heading text-sm font-semibold text-ink">
                        Your Estate Planning Hub
                      </p>
                      <span className="rounded-full bg-accent/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-dark">
                        Live
                      </span>
                    </div>
                    <div className="mt-5 space-y-3">
                      {hubStats.map((s, i) => {
                        const Icon = hubIcons[i];
                        return (
                          <div
                            key={s.label}
                            className="flex items-center justify-between rounded-md border border-border bg-white px-4 py-3"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`h-1.5 w-1.5 rounded-full ${hubDots[i]}`} />
                              <Icon className={`h-3.5 w-3.5 ${hubAccents[i]}`} />
                              <span className="text-xs font-medium text-ink-muted">
                                {s.label}
                              </span>
                            </div>
                            <span className="font-mono text-sm font-semibold text-ink">
                              {s.prefix}
                              {s.value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-white/10 pt-8 text-sm tracking-wide text-white/60">
            {trustBar.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Estate planning hub — Leads / Revenue / Probate Bank */}
      <section className="section">
        <FadeIn>
          <p className="eyebrow text-center">Your Dashboard</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
            Meet your new estate planning hub
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink-body">
            Every lead, every pound of revenue, and the future value of every will
            you&apos;ve written — tracked automatically, from every source, in one
            place.
          </p>
        </FadeIn>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {hubStats.map((s, i) => {
            const Icon = hubIcons[i];
            return (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div className="card h-full">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow">{s.label}</p>
                    <Icon className={`h-5 w-5 ${hubAccents[i]}`} />
                  </div>
                  <p className="mt-4 font-mono text-3xl font-medium text-ink sm:text-4xl">
                    {s.prefix}
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">Current month to date</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-body">
                    {s.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Problem / Insight */}
      <section className="border-y border-border bg-surface">
        <div className="section">
          <FadeIn>
            <h2 className="mx-auto max-w-3xl text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
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
                body: "Spark Solutions turns that moment into revenue — a branded platform, a regulated legal partner, and a Probate Bank that keeps growing with every will you write.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="card h-full bg-white">
                  <p className="eyebrow">{item.title}</p>
                  <p className="mt-3 text-ink-body leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
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
      </section>

      {/* Who It Is For */}
      <section className="border-y border-border bg-surface">
        <div className="section">
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
                className="card block h-full bg-white transition hover:border-primary"
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
                className="card block h-full bg-white transition hover:border-primary"
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
        </div>
      </section>

      {/* Modules */}
      <section className="section">
        <FadeIn>
          <p className="eyebrow text-center">Everything Included</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
            Six modules. One platform.
          </h2>
        </FadeIn>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {modules.map((m, i) => (
            <FadeIn key={m.title} delay={(i % 2) * 0.1}>
              <div className="card h-full">
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-md font-mono text-xs font-semibold ${moduleTones[i]}`}
                >
                  {m.n.padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-ink">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">
                  {m.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-muted">
          <Link href="/features" className="font-semibold text-primary">
            See every module in detail →
          </Link>
        </p>
      </section>

      {/* Pricing Preview */}
      <section className="border-y border-border bg-surface">
        <div className="section">
          <FadeIn>
            <p className="eyebrow text-center">Pricing</p>
            <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
              Everything you need, in one plan
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-ink-body">
              One powerful plan with everything included — no tiers, no compromises.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-14">
            <PricingCard
              price={pricing.monthly}
              setupFee={pricing.setupFee}
              features={pricingFeatures}
            />
          </FadeIn>
          <p className="mt-8 text-center text-sm text-ink-muted">
            <Link href="/pricing" className="font-semibold text-primary">
              See the full pricing breakdown →
            </Link>
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section">
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
      </section>

      <CTABanner title="Ready to add estate planning to your business?" />
    </>
  );
}
