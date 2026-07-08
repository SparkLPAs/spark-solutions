import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { DemoForm } from "@/components/DemoForm";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Book a Free Demo",
  description:
    "Book a free demo of Spark Solutions and see how to add white-label estate planning — wills, trusts and LPAs — to your financial services business.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Demo"
        title="See Spark Solutions in Action"
        subtitle="Tell us a little about your business and Jason will walk you through the platform — no obligation, no pressure."
      />
      <section className="section">
        <div className="mx-auto max-w-2xl">
          <FadeIn>
            <DemoForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
