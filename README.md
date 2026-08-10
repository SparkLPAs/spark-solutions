# Spark Solutions

Marketing site for **Spark Solutions** — the white-label estate planning SaaS
platform for financial services professionals, will writers and estate
planners. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and
Contentlayer.

## Stack

- **Framework:** Next.js 14 (App Router), TypeScript
- **Styling:** Tailwind CSS + shadcn/ui-style primitives
- **Animation:** Framer Motion (scroll-triggered fade-ins)
- **Content:** Contentlayer2 + MDX for the blog and reviews
- **Forms:** React Hook Form + Zod
- **Email:** Resend (demo request notifications + auto-reply)
- **Analytics:** GTM, GA4 (via GTM), Meta Pixel, Microsoft Clarity
- **Deployment:** Vercel

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example` for the full list. At minimum, set:

- `NEXT_PUBLIC_SITE_URL` — the deployed domain. **Never hard-code the domain
  anywhere in the app** — always read it from `lib/env.ts`.
- `NEXT_PUBLIC_MONTHLY_PRICE` / `NEXT_PUBLIC_SETUP_FEE` — platform pricing.
  **Never hard-code pricing** — always read it from `lib/env.ts`.
- `RESEND_API_KEY`, `DEMO_NOTIFICATION_EMAIL`, `RESEND_FROM_EMAIL` — required
  for the `/demo` request form to send email. Without a valid `RESEND_API_KEY`
  the `/api/demo` route will return a 502 when a demo is requested.
- `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_CLARITY_ID`
  — optional; each analytics script only renders when its ID is set.

## Project structure

```
app/                    Route segments (App Router)
  page.tsx              Home (10 sections per build brief)
  for/financial-services, for/will-writers
  how-it-works, partners, pricing, features, about
  demo/                 Demo request page + form
  api/demo/route.ts     Resend email handler for demo requests
  blog/                 Blog index + [slug] detail page (Contentlayer)
  reviews/page.tsx      Reviews page (Contentlayer)
  legal/privacy, legal/terms
  sitemap.ts, robots.ts
components/             Nav, Footer, Hero, FeatureCard, PricingCard,
                        TestimonialCard, CTABanner, BlogCard, ReviewCard,
                        DemoForm, analytics/*, ui/* (shadcn-style primitives)
content/blog/*.mdx      5 seed blog articles
content/reviews/*.mdx   Real partner reviews — empty until real ones are
                        added; see "Adding a real review" below.
lib/                    env.ts (site + pricing config), content.ts (shared
                        copy), validations.ts (Zod schemas), email.ts
                        (Resend), utils.ts, analytics-events.ts
```

## Adding a real review

The `/reviews` page pulls from `content/reviews/*.mdx`. It starts empty and
shows an honest "check back soon" message until real reviews are added — do
not add placeholder/fabricated reviews to make the page look populated.
Publishing one is a normal PR to this repo, so nothing goes live without
being reviewed and merged — that's the approval step.

To add a real one, create a new file `content/reviews/<slug>.mdx`:

```mdx
---
authorName: "Jane Smith"
businessName: "XYZ Solutions"
role: "Independent Financial Adviser"
rating: 5
date: "2026-08-10"
---

The review text goes here, written in the partner's own words. Can span
multiple paragraphs of Markdown.
```

Field notes:

- `authorName` — required.
- `businessName` — required. The review is attributed as "Jane Smith at
  XYZ Solutions" on the site — get sign-off from the reviewer to be named
  alongside their business before publishing.
- `role` — optional job title, shown alongside the date (e.g. "Independent
  Financial Adviser · August 2026"). Omit if not given.
- `rating` — optional, 1–5. Omit entirely if no star rating was given.
- `date` — required, `YYYY-MM-DD`. Reviews are sorted newest-first.
- The MDX body below the frontmatter is the review text itself.

## Design system

Colour tokens, fonts and spacing live in `tailwind.config.ts` and
`app/globals.css`. Headings use Syne, body copy uses Inter, pricing/stats use
DM Mono — all loaded via `next/font/google` in `app/layout.tsx`.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add all variables from `.env.example` in the Vercel project's
   Environment Variables settings.
4. Deploy — Vercel auto-builds on every push to `main`.

## Open decisions (see build brief)

A few items in the original brief are marked "Decision needed" and are
stubbed with placeholders pending confirmation:

- **Domain** — `NEXT_PUBLIC_SITE_URL` defaults to `spark-solutions.co.uk`;
  update if a different Spark subdomain is chosen.
- **Partner testimonials** — `lib/content.ts` uses a `[PARTNER QUOTE]`
  placeholder until real quotes are supplied.
- **Pricing** — defaults to £325/month via `NEXT_PUBLIC_MONTHLY_PRICE`;
  confirm the final figure (£300, £315 or £325).
- **About page photo** — `/about` uses an abstract illustration in place of
  a headshot until one is supplied.
- **Migrated content** — no content was carried over from the previous
  osiris-solutions.co.uk site; flag any pages/copy to migrate.
