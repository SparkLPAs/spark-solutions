import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{mdx,md}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8",
          dark: "#1E3A5F",
        },
        accent: "#6EE7B7",
        surface: "#F8FAFF",
        border: "#E5E7EB",
        ink: {
          DEFAULT: "#0F172A",
          body: "#374151",
          muted: "#6B7280",
        },
        // The three hub metrics get a fixed, reused colour each time they
        // appear (homepage hub preview, /features, dashboards) rather than
        // ad-hoc hex values — mirrors the pink/green/blue coding on the live
        // platform, softened to sit inside this palette.
        leads: "#E11D8F",
        revenue: "#059669",
        probate: "#1D4ED8",
      },
      fontFamily: {
        heading: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(60rem 40rem at 80% -10%, rgba(110,231,183,0.15) 0%, transparent 60%)",
        "hero-mesh":
          "radial-gradient(50rem 34rem at 88% -12%, rgba(110,231,183,0.16) 0%, transparent 60%), radial-gradient(38rem 28rem at 6% 8%, rgba(29,78,216,0.35) 0%, transparent 55%), radial-gradient(46rem 30rem at 50% 118%, rgba(225,29,143,0.14) 0%, transparent 60%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
