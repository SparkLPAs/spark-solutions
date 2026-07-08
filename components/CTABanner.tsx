import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CTABanner({
  title,
  ctaLabel = "Book a Free Demo",
  ctaHref = "/demo",
}: {
  title: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="bg-primary-dark text-white">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">{title}</h2>
        <Link href={ctaHref} className="mt-8 inline-block">
          <Button size="lg" className="bg-accent text-primary-dark hover:bg-accent/90">
            {ctaLabel}
          </Button>
        </Link>
      </div>
    </section>
  );
}
