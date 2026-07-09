import type { Metadata } from "next";
import {
  Globe,
  Bot,
  ScrollText,
  Scale,
  GraduationCap,
  Megaphone,
  LayoutDashboard,
  CreditCard,
} from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { FeatureCard } from "@/components/FeatureCard";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Features — Everything You Need to Add Estate Planning to Your Business",
  description:
    "Every module included with Spark Solutions: a white-labelled website, AI-assisted document generation, Online Wills, a legal & probate partner, training, marketing, an estate planning hub and direct Stripe payments.",
  alternates: { canonical: "/features" },
};

const features = [
  {
    icon: Globe,
    title: "White-Labelled Estate Planning Website",
    description:
      "We design and launch a fully branded website for your business — your logo, your colours, compliant legal descriptions throughout. Every site is secured with HTTPS, so lead contact information reaches you safely from day one.",
  },
  {
    icon: Bot,
    title: "AI-Assisted Document Generation",
    description:
      "The Will Suite: industry-leading software for creating wills, discretionary, protective and life interest trusts, and Property & Financial Affairs / Health & Welfare LPAs — built for accuracy, compliance and ease of use, with an AI-powered assistant on hand to answer estate planning queries as you go.",
  },
  {
    icon: ScrollText,
    title: "Online Wills — Self-Service DIY",
    description:
      "Give clients a self-service platform where they enter their details and instantly generate a simple will. Use it as a low-friction gateway into your fuller services — and run your own marketing campaigns on it at whatever pricing points you choose, keeping all the revenue.",
  },
  {
    icon: Scale,
    title: "A Trusted Legal & Probate Partner",
    description:
      "Executorship, probate, estate administration and trust-related services, delivered through our trusted legal partner. Every piece of work is reviewed and approved by a fully qualified, regulated solicitor — plus a legal support line for complex questions.",
  },
  {
    icon: GraduationCap,
    title: "Estate Planning Training",
    description:
      "A professional learning platform with expert-developed courses and online training videos for wills and LPAs — so you and your team can build real estate planning knowledge, no prior experience required.",
  },
  {
    icon: Megaphone,
    title: "Marketing Module",
    description:
      "Our marketing team helps grow your brand and get you noticed, with campaigns tailored to your goals. Manage campaigns directly from your dashboard, so the leads keep arriving while you focus on clients.",
  },
  {
    icon: LayoutDashboard,
    title: "Your Estate Planning Hub",
    description:
      "One dashboard for the whole business: track every customer and lead from every source, watch your revenue grow, and see your Probate Bank — the future value of probate cases pipelined from wills you've written — build over time.",
  },
  {
    icon: CreditCard,
    title: "Get Paid Directly via Stripe",
    description:
      "Connect your own Stripe account during setup and get paid directly when you sell wills through Online Wills or any other service. Spark Solutions never sits between you and your revenue.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything You Need to Add Estate Planning to Your Financial Services Business"
        subtitle="One plan, six modules, and a hub that tracks every lead, every pound of revenue, and the future value of every will you write."
      />

      <section className="section">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={(i % 3) * 0.1}>
              <FeatureCard icon={f.icon} title={f.title} description={f.description} />
            </FadeIn>
          ))}
        </div>
      </section>

      <CTABanner title="Ready to add estate planning to your business?" />
    </>
  );
}
