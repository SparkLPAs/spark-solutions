import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/env";

export function PricingCard({
  price,
  setupFee,
  features,
  ctaHref = "/demo",
  ctaLabel = "Book a Free Demo",
}: {
  price: number;
  setupFee: number;
  features: string[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-border bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <p className="eyebrow">Platform fee</p>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="font-mono text-5xl font-medium text-ink">
          {formatPrice(price)}
        </span>
        <span className="text-sm text-ink-muted">/ month per partner</span>
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        {setupFee === 0 ? "No setup fee" : `${formatPrice(setupFee)} setup fee`} · cancel
        anytime
      </p>

      <ul className="mt-8 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-ink-body">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>

      <Link href={ctaHref} className="mt-8 block">
        <Button className="w-full">{ctaLabel}</Button>
      </Link>
      <p className="mt-3 text-center text-xs text-ink-muted">No per-transaction cut.</p>
    </div>
  );
}
