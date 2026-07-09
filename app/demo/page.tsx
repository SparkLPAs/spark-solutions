import type { Metadata } from "next";
import { Calendar, MessageCircle, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { DemoForm } from "@/components/DemoForm";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Book a Free Demo",
  description:
    "Book a free demo of Spark Solutions and see how to add white-label estate planning — wills, trusts and LPAs — to your financial services business.",
  alternates: { canonical: "/demo" },
};

const expectations = [
  {
    icon: MessageCircle,
    title: "A conversation, not a pitch",
    description:
      "Tell us about your business and Jason will tailor the walkthrough to how you'd actually use the platform.",
  },
  {
    icon: Calendar,
    title: "Within 1 business day",
    description: "You'll hear back to arrange a time that suits you — no automated waiting queue.",
  },
  {
    icon: ShieldCheck,
    title: "No obligation, no pressure",
    description: "See the platform, ask questions, and decide in your own time. Nothing is charged until you choose to start a trial.",
  },
];

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Demo"
        title="See Spark Solutions in Action"
        subtitle="Tell us a little about your business and Jason will walk you through the platform — no obligation, no pressure."
      />
      <section className="section">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <FadeIn>
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">What to expect</p>
              <div className="mt-6 space-y-8">
                {expectations.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-body">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <DemoForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
