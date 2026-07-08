import type { Metadata } from "next";
import {
  ScrollText,
  Landmark,
  ShieldCheck,
  FolderLock,
  LayoutDashboard,
  Palette,
  CreditCard,
  Users,
} from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { FeatureCard } from "@/components/FeatureCard";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Features — Everything You Need to Add Estate Planning to Your Business",
  description:
    "Every feature you need to add estate planning to your financial services business: wills, trusts, LPAs, document storage, white-label theming, Stripe Connect, a partner dashboard and couple pricing.",
  alternates: { canonical: "/features" },
};

const features = [
  {
    icon: ScrollText,
    title: "Online Will Creation Wizard",
    description:
      "A guided, step-by-step wizard walks clients through creating a legally compliant will for England & Wales — no legal jargon, no blank pages. Clients complete it at their own pace, from any device, and every will is structured to meet current legal requirements before it's finalised.",
  },
  {
    icon: Landmark,
    title: "Trust Creation",
    description:
      "Clients can set up discretionary, protective or life interest trusts through the same guided experience used for wills. Each trust type is built around real scenarios — protecting assets for children, a vulnerable beneficiary or a surviving spouse — rather than generic legal templates.",
  },
  {
    icon: ShieldCheck,
    title: "LPA Creation",
    description:
      "Property & Financial Affairs and Health & Welfare Lasting Powers of Attorney are created online and prepared ready for registration. Clients choose their attorneys, set preferences and instructions, and receive documents structured to meet Office of the Public Guardian requirements.",
  },
  {
    icon: FolderLock,
    title: "Document Storage",
    description:
      "Every completed will, trust and LPA is stored securely in the cloud, accessible to the client whenever they need it. This also gives partners a natural recurring subscription revenue stream, layered on top of the one-off document fee.",
  },
  {
    icon: LayoutDashboard,
    title: "Partner Dashboard",
    description:
      "Manage every client, track document status and see your revenue in one place. The dashboard shows who's started, who's completed and who needs a nudge — so following up is quick instead of guesswork.",
  },
  {
    icon: Palette,
    title: "White-Label Theming",
    description:
      "Your logo, brand colours, domain and every client-facing email are fully configurable. White-Label partners can run the platform entirely under their own name, with no visible reference to Spark Solutions anywhere in the client journey.",
  },
  {
    icon: CreditCard,
    title: "Stripe Connect",
    description:
      "Partners connect their own Stripe account during onboarding, so client payments go straight to them. Spark Solutions never sits between you and your revenue, and there's no per-transaction cut on top of your platform fee.",
  },
  {
    icon: Users,
    title: "Couple Pricing Logic",
    description:
      "When two clients complete their documents together — a common scenario for spouses and partners — the platform automatically applies discounted couple pricing, making it easier to convert both members of a household in one go.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything You Need to Add Estate Planning to Your Financial Services Business"
        subtitle="From guided document creation to white-label branding and direct payments — every feature is built to make estate planning a natural, revenue-generating extension of your existing business."
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
