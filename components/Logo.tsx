import Link from "next/link";

import { LogoMark } from "@/components/LogoMark";
import { cn } from "@/lib/utils";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 font-heading text-xl font-bold",
        dark ? "text-white" : "text-ink"
      )}
    >
      <LogoMark className="h-8 w-8 shrink-0" />
      <span>
        <span className={dark ? "text-accent" : "text-primary"}>Spark</span> Solutions
      </span>
    </Link>
  );
}
