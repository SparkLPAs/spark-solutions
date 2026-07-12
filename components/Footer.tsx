import Link from "next/link";

import { Logo } from "@/components/Logo";
import { footerLinks, sparkBrandFamily } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary-dark text-white">
      <div className="mx-auto max-w-8xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              The white-label estate planning platform for financial services
              professionals. Wills, trusts and LPAs, under your own brand.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Product</p>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Who It&apos;s For</p>
            <ul className="mt-4 space-y-3">
              {footerLinks.audience.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Legal</p>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/70">
              <a href="mailto:hello@spark-solutions.co.uk" className="hover:text-white">
                hello@spark-solutions.co.uk
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            Part of the Spark brand family:{" "}
            {sparkBrandFamily.map((b, i) => (
              <span key={b.name}>
                <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                  {b.name}
                </a>
                {i < sparkBrandFamily.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} Spark Solutions. Registered in England and Wales.
          </p>
        </div>
      </div>
    </footer>
  );
}
