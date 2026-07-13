import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { CTABanner } from "@/components/CTABanner";
import { sparkBrandFamily, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — 16+ Years of Estate Planning Expertise",
  description:
    "Spark Solutions was built on 16+ years of estate planning expertise, including senior leadership at England and Wales' largest estate planning company. Formerly Osiris Solutions, Spark Solutions is now part of a wider brand family including SparkWills, SparkTrusts, SparkLPAs, SparkMade and Spark-Works.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Spark Solutions"
        title="Built on 16+ Years of Estate Planning Expertise"
        subtitle="Spark Solutions exists to make it simple for financial services professionals and will writers to offer their clients wills, trusts and LPAs — without building the technology themselves."
      />

      {/* Founder */}
      <section className="section">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <FadeIn>
            <div
              role="img"
              aria-label="Placeholder for a photo of Jason, founder of Spark Solutions"
              className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg border border-border bg-primary-dark"
            >
              <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full border-2 border-accent/60 bg-white/5" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-md bg-white/10 px-3 py-2 text-center text-xs text-white/70 backdrop-blur">
                Photo of Jason coming soon
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="eyebrow">The Founder</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
              Jason
            </h2>
            <p className="mt-5 leading-relaxed text-ink-body">
              Jason has spent 16 years in estate planning, starting out as part of the
              founding team behind what would go on to become the largest estate planning
              company in England and Wales. As a senior member of that leadership team, he
              was a major contributor to its growth — helping take the business from a
              start-up to the biggest name in the sector, and shaping how estate planning
              is delivered at scale for individuals, families and the professionals who
              serve them.
            </p>
            <p className="mt-4 leading-relaxed text-ink-body">
              Spark Solutions is built on that experience. Rather than start another
              estate planning practice, Jason built the platform that pulls together
              everything you need into one place: letting financial services
              professionals and will writers offer estate planning under their own brand,
              connected to their own Stripe account, without needing to write a single
              line of code.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-2xl font-medium text-primary sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-ink-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Rebrand story */}
      <section className="border-y border-border bg-surface">
        <div className="section">
          <FadeIn>
            <p className="eyebrow text-center">The Rebrand</p>
            <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
              From Osiris Solutions to Spark Solutions
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-ink-body">
              The platform behind Spark Solutions began life as Osiris Solutions. As the
              product grew beyond a single tool into a full family of estate planning
              services, it made sense to bring everything under one clear, modern name.
              Osiris Solutions is being retired in favour of Spark Solutions — same
              platform, same team, same commitment to making estate planning simple for
              the professionals who offer it and the clients who rely on it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Brand family */}
      <section className="section">
        <FadeIn>
          <p className="eyebrow text-center">The Spark Family</p>
          <h2 className="mt-3 text-center font-heading text-3xl font-bold text-ink sm:text-4xl">
            Part of a wider family of estate planning products
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-ink-body">
            Spark Solutions is the partner platform at the centre of a growing family of
            products, each focused on a specific part of the estate planning journey.
          </p>
        </FadeIn>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {sparkBrandFamily.map((brand, i) => (
            <FadeIn key={brand.name} delay={(i % 5) * 0.06}>
              <a
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card block h-full text-center transition hover:border-primary/40 hover:shadow-md"
              >
                <p className="font-heading text-base font-semibold text-ink">{brand.name}</p>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      <CTABanner title="Ready to add estate planning to your business?" />
    </>
  );
}
