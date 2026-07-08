import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/env";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms governing use of ${site.name}.`,
  alternates: { canonical: "/legal/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <section className="section">
        <div className="prose prose-slate mx-auto max-w-3xl prose-headings:font-heading prose-headings:text-ink prose-a:text-primary">
          <p>
            These terms govern your use of {site.name} (&ldquo;the Platform&rdquo;),
            operated by {site.name}, registered in England and Wales. By signing up
            as a partner or using our website, you agree to these terms.
          </p>

          <h2>The service</h2>
          <p>
            {site.name} provides a white-label estate planning platform through
            which partners offer wills, trusts and Lasting Powers of Attorney to
            their own clients, under their own brand and their own connected Stripe
            account.
          </p>

          <h2>Partner accounts</h2>
          <p>
            Partners are responsible for the accuracy of the information they and
            their clients provide, for connecting a valid Stripe account, and for
            complying with all applicable financial services and data protection
            regulations relevant to their own business.
          </p>

          <h2>Fees</h2>
          <p>
            Partners pay a monthly platform fee as set out on our{" "}
            <a href="/pricing">pricing page</a>. Fees are billed in advance and are
            non-refundable except as required by law. Partners may cancel at any
            time; access continues until the end of the current billing period.
          </p>

          <h2>Payments</h2>
          <p>
            Client payments are processed directly through each partner&apos;s own
            connected Stripe account. {site.name} does not hold or process client
            funds on behalf of partners.
          </p>

          <h2>Document accuracy</h2>
          <p>
            Documents produced through the Platform are generated based on
            information provided by the client. Partners are responsible for
            advising clients appropriately within the bounds of their own regulatory
            permissions.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {site.name} is not liable for
            indirect or consequential losses arising from use of the Platform.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the
            Platform after changes take effect constitutes acceptance of the revised
            terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href="mailto:jason@yourdomain.com">jason@yourdomain.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
