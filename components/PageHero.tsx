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
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <div className="relative mx-auto max-w-8xl px-6 py-20 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-[1.1] sm:text-5xl">
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
