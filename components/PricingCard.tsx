import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice, pricing, site } from "@/lib/env";

export function PricingCard({
  price,
  setupFee,
  features,
  ctaHref = site.signupUrl,
  ctaLabel = "Start Free Trial",
  secondaryHref = "/demo",
  secondaryLabel = "Book a Demo",
}: {
  price: number;
  setupFee: number;
  features: string[];
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-border bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <p className="eyebrow">Pro plan · everything included</p>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="font-mono text-5xl font-medium text-ink">
          {formatPrice(price)}
        </span>
        <span className="text-sm text-ink-muted">/ month</span>
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        {pricing.trialDays}-day free trial ·{" "}
        {setupFee === 0 ? "no setup fee" : `${formatPrice(setupFee)} setup fee`}
      </p>

      <ul className="mt-8 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-ink-body">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={ctaHref} className="flex-1">
          <Button className="w-full">{ctaLabel}</Button>
        </Link>
        <Link href={secondaryHref} className="flex-1">
          <Button variant="ghost" className="w-full">
            {secondaryLabel}
          </Button>
        </Link>
      </div>
      <p className="mt-3 text-center text-xs text-ink-muted">
        Cancel any time before your {pricing.trialDays}-day trial ends — completely free, no
        questions asked.
      </p>
    </div>
  );
}
