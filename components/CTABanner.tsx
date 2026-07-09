import Link from "next/link";

import { Button } from "@/components/ui/button";
import { pricing, site } from "@/lib/env";

export function CTABanner({
  title,
  subtitle,
  ctaLabel = "Start Free Trial",
  ctaHref = site.signupUrl,
  secondaryLabel = "Book a Demo",
  secondaryHref = "/demo",
}: {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-primary-dark text-white">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          {subtitle ?? `${pricing.trialDays} days free. Cancel any time before your trial ends.`}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href={ctaHref}>
            <Button size="lg" className="bg-accent text-primary-dark hover:bg-accent/90">
              {ctaLabel}
            </Button>
          </Link>
          <Link href={secondaryHref}>
            <Button size="lg" variant="outline">
              {secondaryLabel}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
