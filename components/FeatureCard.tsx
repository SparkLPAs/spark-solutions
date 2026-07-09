import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const tones = {
  blue: "bg-primary/10 text-primary",
  navy: "bg-primary-dark/10 text-primary-dark",
  mint: "bg-accent/25 text-primary-dark",
  rose: "bg-leads/10 text-leads",
  green: "bg-revenue/10 text-revenue",
} as const;

export function FeatureCard({
  icon: Icon,
  title,
  description,
  tone = "blue",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: keyof typeof tones;
}) {
  return (
    <div className="card">
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-md",
          tones[tone]
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-body">{description}</p>
    </div>
  );
}
