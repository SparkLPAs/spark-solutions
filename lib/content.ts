export const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/for/financial-services", label: "For FS Professionals" },
  { href: "/for/will-writers", label: "For Will Writers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export const footerLinks = {
  product: [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/partners", label: "Partner Models" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
  ],
  audience: [
    { href: "/for/financial-services", label: "For FS Professionals" },
    { href: "/for/will-writers", label: "For Will Writers" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ],
  legal: [
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/terms", label: "Terms of Service" },
  ],
};

export const sparkBrandFamily = [
  { name: "SparkWills", url: "#" },
  { name: "SparkTrusts", url: "#" },
  { name: "SparkLPAs", url: "#" },
  { name: "SparkMade", url: "#" },
  { name: "Spark-Works", url: "#" },
];

export type PartnerModel = {
  name: string;
  summary: string;
  bestFor: string;
  bullets: string[];
};

export const partnerModels: PartnerModel[] = [
  {
    name: "White-Label Partner",
    summary:
      "Full rebrand under your own name and colours. Your clients never see Spark Solutions.",
    bestFor: "Established FS businesses with their own brand to protect.",
    bullets: [
      "Your logo, colours and domain throughout",
      "Client-facing emails sent from your brand",
      "Your Stripe account, your revenue, direct",
      "Full partner dashboard and reporting",
    ],
  },
  {
    name: "Branded Consultant",
    summary:
      "Operate as a Spark Solutions-branded estate planning consultant. Lower setup cost, faster to launch.",
    bestFor: "Individuals adding estate planning to an existing client book.",
    bullets: [
      "Live in days, not weeks",
      "Spark Solutions handles the platform branding",
      "Your own Stripe account and revenue",
      "Full document suite from day one",
    ],
  },
  {
    name: "Referrer / Introducer",
    summary:
      "Simply refer clients and earn commission per completed document. No setup required.",
    bestFor: "FS firms not yet ready to operate a full estate planning service.",
    bullets: [
      "Zero setup, zero platform management",
      "Commission paid per completed document",
      "Share a single referral link",
      "Upgrade to a full partner model any time",
    ],
  },
];

export type Feature = {
  title: string;
  description: string;
};

export const coreFeatures: Feature[] = [
  {
    title: "White-Label Ready",
    description:
      "Your logo, colours, domain and client emails — fully configurable, zero Spark Solutions branding for White-Label partners.",
  },
  {
    title: "Stripe Connect",
    description:
      "Partners connect their own Stripe account and receive client payments directly. No routing through us.",
  },
  {
    title: "Wills",
    description:
      "A fully guided online will-writing wizard, legally compliant for England & Wales.",
  },
  {
    title: "Trusts",
    description:
      "Discretionary, protective and life interest trusts, built with the same guided wizard experience.",
  },
  {
    title: "LPAs",
    description:
      "Property & Financial Affairs and Health & Welfare Lasting Powers of Attorney, ready to register.",
  },
  {
    title: "Document Storage",
    description:
      "Secure cloud storage for every completed document, with recurring subscription revenue built in.",
  },
];

export const homeSteps = [
  {
    n: "1",
    title: "Sign up and connect Stripe",
    body: "Create your account and connect your own Stripe account in minutes.",
  },
  {
    n: "2",
    title: "Customise your brand",
    body: "Add your logo, colours and domain — or launch under the Spark Solutions brand.",
  },
  {
    n: "3",
    title: "Start earning",
    body: "Invite clients to create wills, trusts and LPAs, and get paid directly.",
  },
];

export const trustBar = [
  "100% White-Label",
  "Stripe Connect",
  "No Tech Setup",
  "Legally Compliant",
];

export const stats = [
  { value: "14+", label: "Years of estate planning expertise" },
  { value: "3", label: "Ways to partner" },
  { value: "£0", label: "Setup fee" },
];

export const testimonials = [
  {
    quote: "[PARTNER QUOTE]",
    name: "[Partner Name]",
    role: "[Business Type], White-Label Partner",
  },
];

export const pricingFeatures = [
  "Full white-label platform under your brand",
  "Unlimited wills, trusts and LPA documents",
  "Your own Stripe Connect account — direct payouts",
  "Partner dashboard with client and revenue reporting",
  "Secure document storage for every client",
  "Couple pricing logic built in",
  "No per-transaction cut",
  "Cancel anytime",
];

export const faqs = [
  {
    q: "Is there a setup fee?",
    a: "No. Spark Solutions has no setup fee — you pay a single monthly platform fee and keep everything you earn from your clients.",
  },
  {
    q: "How does Stripe Connect work?",
    a: "You connect your own Stripe account during onboarding. Client payments go directly to you — Spark Solutions never touches your revenue.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes. There's no long-term contract. Cancel whenever you like from your partner dashboard.",
  },
  {
    q: "Which partner model is right for me?",
    a: "White-Label suits established FS businesses that want full brand control. Branded Consultant suits individuals who want to launch fast. Referrer suits firms that just want to earn commission with no setup.",
  },
  {
    q: "Is the platform legally compliant?",
    a: "Yes. Every will, trust and LPA created on Spark Solutions is built to be legally compliant for England & Wales.",
  },
];

export const businessTypeLabels = [
  "Mortgage Broker",
  "Protection Broker",
  "IFA",
  "Equity Release Specialist",
  "Accountant",
];
