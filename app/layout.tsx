import type { Metadata } from "next";
import { Syne, Inter, DM_Mono } from "next/font/google";

import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import {
  GoogleTagManagerNoscript,
  GoogleTagManagerScript,
} from "@/components/analytics/GoogleTagManager";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { Clarity } from "@/components/analytics/Clarity";
import { site } from "@/lib/env";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — White-Label Estate Planning Platform for Financial Services`,
    template: `%s — ${site.name}`,
  },
  description:
    "Spark Solutions gives financial services professionals a fully branded estate planning platform — AI-assisted document generation, Online Wills, a legal & probate partner, and a Probate Bank that grows with every will you write.",
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — White-Label Estate Planning Platform for Financial Services`,
    description:
      "Turn your client relationships into estate planning revenue with a fully branded platform, six modules, and a Probate Bank that grows with every will you write.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — White-Label Estate Planning Platform`,
    description:
      "Turn your client relationships into estate planning revenue with a fully branded platform, six modules, and a Probate Bank that grows with every will you write.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organisationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description:
      "White-label estate planning SaaS platform for financial services professionals, will writers and estate planners.",
  };

  return (
    <html lang="en-GB" className={`${syne.variable} ${inter.variable} ${dmMono.variable}`}>
      <head>
        <GoogleTagManagerScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
      </head>
      <body>
        <GoogleTagManagerNoscript />
        <Nav />
        <main>{children}</main>
        <Footer />
        <MetaPixel />
        <Clarity />
      </body>
    </html>
  );
}
