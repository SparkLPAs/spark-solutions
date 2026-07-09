export const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/features", label: "Features" },
  { href: "/for/financial-services", label: "For FS Professionals" },
  { href: "/for/will-writers", label: "For Will Writers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export const footerLinks = {
  product: [
    { href: "/how-it-works", label: "How It Works" },
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

export type Module = {
  n: string;
  title: string;
  description: string;
};

// The six real modules that make up the platform.
export const modules: Module[] = [
  {
    n: "1",
    title: "Your white-labelled estate planning website",
    description:
      "We design and launch a fully branded website for your business — your colours, your logo, compliant legal descriptions throughout. Every site is secured with HTTPS so lead contact information reaches you safely.",
  },
  {
    n: "2",
    title: "AI-assisted document generation",
    description:
      "Industry-leading software for creating wills, Lasting Powers of Attorney and trusts, built for accuracy, compliance and ease of use — with an AI-powered assistant on hand to answer estate planning queries as you go.",
  },
  {
    n: "3",
    title: "Online Wills — self-service DIY documents",
    description:
      "Offer clients a self-service platform where they enter their details and instantly generate a simple will. Use it as a low-friction gateway into the rest of your estate planning services.",
  },
  {
    n: "4",
    title: "A trusted legal & probate partner",
    description:
      "Executorship, probate, estate administration and trust-related services, delivered through our trusted legal partner. Every piece of work is reviewed and approved by a fully qualified, regulated solicitor.",
  },
  {
    n: "5",
    title: "Estate planning training",
    description:
      "A professional learning platform with expert-developed courses, so you and your team can build real estate planning knowledge — no prior experience required.",
  },
  {
    n: "6",
    title: "A marketing module built for growth",
    description:
      "Our marketing team helps grow your brand and get you noticed, with campaigns tailored to your goals — so the leads keep arriving while you focus on clients.",
  },
];

export const homeSteps = [
  {
    n: "1",
    title: "Start your free trial",
    body: "Create your account and explore the full platform, free, for 14 days.",
  },
  {
    n: "2",
    title: "Launch your branded site",
    body: "We launch your white-labelled estate planning website — your logo, your colours.",
  },
  {
    n: "3",
    title: "Start earning",
    body: "Generate documents, sell Online Wills and get paid directly via Stripe.",
  },
];

export const trustBar = [
  "White-Labelled Website",
  "AI-Assisted Documents",
  "Regulated Legal Partner",
  "Paid Directly via Stripe",
];

// Live counters shown in the "estate planning hub" dashboard preview.
export const hubStats = [
  {
    label: "Leads",
    value: "709",
    prefix: "",
    description: "Track all your customers and leads from every source, in one place.",
  },
  {
    label: "Revenue",
    value: "1,362.32",
    prefix: "£",
    description: "Get paid directly via Stripe when you sell wills through Online Wills.",
  },
  {
    label: "Probate Bank",
    value: "207,509.00",
    prefix: "£",
    description: "Track the future value of probate cases pipelined from wills you've written.",
  },
];

export const stats = [
  { value: "14+", label: "Years of estate planning expertise" },
  { value: "6", label: "Modules, one platform" },
  { value: "14", label: "Day free trial" },
];

export const testimonials = [
  {
    quote: "[PARTNER QUOTE]",
    name: "[Partner Name]",
    role: "[Business Type], Spark Solutions Partner",
  },
];

export const pricingFeatures = [
  "White-labelled estate planning website",
  "Industry-leading document generation software with AI assistant",
  "White-labelled, customer self-service (DIY) Online Wills website",
  "Legal & probate partner, reviewed by a regulated solicitor",
  "Free document storage",
  "Access to a pool of experienced estate planners (commission share)",
  "Estate planning training module",
  "Social media marketing module",
];

export const faqs = [
  {
    q: "Can I book a demonstration before joining the platform?",
    a: "Yes. You can book a live demo at any time, or start your 14-day free trial straight away and explore the platform yourself — whichever you prefer.",
  },
  {
    q: "I don't have any estate planning experience, can I still use this platform?",
    a: "Yes. The platform is built for people without an estate planning background. The AI-powered assistant, guided document wizards and our estate planning training module are all there to bring you up to speed.",
  },
  {
    q: "What if I already have an estate planning website?",
    a: "That's fine — you don't have to use the white-labelled website we launch for you. You can still access the document generation software, Online Wills, legal & probate partner and every other module on your existing site.",
  },
  {
    q: "Is there a limit on how many documents I can write each month?",
    a: "No. Your monthly platform fee includes unlimited use of the document generation software — there's no per-document or per-transaction charge.",
  },
  {
    q: "Do I need to use your solicitors?",
    a: "No. Our legal & probate partner is there whenever you need a regulated solicitor to review or handle probate, estate administration or trust work — but you're free to use your own where you already have a relationship.",
  },
  {
    q: "Can I build and sell a Will Bank?",
    a: "Yes. As clients complete wills through your platform, the future probate value attached to those wills builds your Probate Bank — a growing asset for your business that you can track from your dashboard.",
  },
];

export const businessTypeLabels = [
  "Mortgage Broker",
  "Protection Broker",
  "IFA",
  "Equity Release Specialist",
  "Accountant",
];
