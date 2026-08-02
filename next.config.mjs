import { withContentlayer } from "next-contentlayer2";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  // /start-trial used to be a real page (a lead-capture form posing as
  // the trial signup — found still live and reachable by direct URL after
  // every on-page button had already been repointed at the real product).
  // Removed the page/form/API route entirely and redirect here instead, so
  // no old bookmark, ad, or search result can ever land someone on the
  // fake flow again — this catches every path in, not just the ones we
  // know link here.
  async redirects() {
    return [
      {
        source: "/start-trial",
        destination: process.env.NEXT_PUBLIC_SIGNUP_URL || "https://app.spark-solutions.co.uk/sign-up",
        permanent: true,
      },
    ];
  },
};

export default withContentlayer(nextConfig);
