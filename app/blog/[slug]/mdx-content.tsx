"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-ink prose-a:text-primary prose-strong:text-ink">
      <Component />
    </div>
  );
}
