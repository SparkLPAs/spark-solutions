import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
      <svg
        className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 opacity-[0.07] sm:h-96 sm:w-96"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path d="M17.5 6.5 10 18h5.2l-1 7.5L22 13h-5.2l0.7-6.5Z" fill="white" />
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-3 pb-6 sm:justify-start sm:pl-6 lg:pl-[calc((100%-90rem)/2+1.5rem)]">
        <span className="h-1.5 w-1.5 rounded-full bg-leads" />
        <span className="h-1.5 w-1.5 rounded-full bg-revenue" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
      <div className="relative mx-auto max-w-8xl px-6 py-20 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
