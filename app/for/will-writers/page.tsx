import Link from "next/link";
import type { Metadata } from "next";
import { ScrollText, GraduationCap, Bot } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { FeatureCard } from "@/components/FeatureCard";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Will Writing Platform White Label for Will Writers & Estate Planners",
  description:
    "A white-label will writing platform for freelance will writers and small estate planning practices. AI-assisted document generation for wills, trusts and LPAs — launch under your own brand in days.",
  alternates: { canonical: "/for/will-writers" },
};

const highlightFeatures = [
  {
    title: "AI-Assisted Document Suite",
    description:
      "Wills, trusts and LPAs generated through a structured, legally compliant wizard — with an AI assistant on hand for estate planning queries.",
  },
  {
    title: "Estate Planning Training",
    description:
      "No prior estate planning experience? Our training module and online courses bring you up to speed fast.",
  },
  {
    title: "Online Wills, Self-Service",
    description:
      "Offer a self-service DIY will option too — a low-friction way for clients to start, and a gateway into your fuller services.",
  },
];

const highlightIcons = [ScrollText, GraduationCap, Bot];
const highlightTones = ["blue", "green", "rose"] as const;

export default function WillWritersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Will Writers & Estate Planners"
        title="A White-Label Will Writing Platform for Modern Estate Planners"
        subtitle="Launch a guided, legally compliant will writing platform under your own brand — without building or maintaining any of the technology yourself."
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
                title: "A regulated legal partner behind you",
                body: "For probate, estate administration or trust work beyond your remit, our legal & probate partner steps in — every piece of work reviewed by a regulated solicitor.",
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
              Everything you need, from day one
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-ink-body">
              Your branded website, the full document suite, Online Wills, the legal &amp;
              probate partner, training and marketing — one plan, no tiers to work out.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="mt-10 text-center">
            <Link href="/pricing" className="text-sm font-semibold text-primary">
              See the full pricing breakdown →
            </Link>
          </FadeIn>
        </div>
      </section>

      <CTABanner title="Ready to launch your own will writing platform?" />
    </>
  );
}
