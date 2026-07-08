import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/env";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your data.`,
  alternates: { canonical: "/legal/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="section">
        <div className="prose prose-slate mx-auto max-w-3xl prose-headings:font-heading prose-headings:text-ink prose-a:text-primary">
          <p>
            {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is
            committed to protecting the privacy of visitors to our website and
            partners who use our platform. This policy explains what information we
            collect, why we collect it, and how it is used.
          </p>

          <h2>Information we collect</h2>
          <p>
            When you request a demo or contact us, we collect the information you
            provide directly — including your name, business name, business type,
            email address, phone number, and any message you send. When you use our
            platform as a partner, we collect account and usage information necessary
            to operate the service.
          </p>

          <h2>How we use your information</h2>
          <p>
            We use the information you provide to respond to demo requests, operate
            and improve the platform, communicate with partners, and comply with our
            legal obligations. We do not sell your personal data.
          </p>

          <h2>Analytics</h2>
          <p>
            We use analytics tools including Google Analytics, Google Tag Manager,
            Meta Pixel and Microsoft Clarity to understand how visitors use our site.
            These tools may set cookies and collect device and usage information.
          </p>

          <h2>Data retention</h2>
          <p>
            We retain personal data for as long as necessary to provide our services
            and to comply with our legal, accounting and regulatory obligations.
          </p>

          <h2>Your rights</h2>
          <p>
            Under UK data protection law, you have the right to access, correct or
            delete the personal data we hold about you. To exercise these rights,
            contact us at{" "}
            <a href="mailto:jason@yourdomain.com">jason@yourdomain.com</a>.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this policy, contact us at{" "}
            <a href="mailto:jason@yourdomain.com">jason@yourdomain.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
