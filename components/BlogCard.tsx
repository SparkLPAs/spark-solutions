import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "contentlayer2/generated";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  if (featured) {
    return (
      <Link
        href={post.url}
        className="card-interactive group grid overflow-hidden rounded-lg border border-border bg-white p-0 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="relative flex flex-col justify-between overflow-hidden bg-primary-dark p-8 text-white">
          <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-80" />
          <span className="relative w-fit rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            Latest
          </span>
          <p className="relative mt-8 text-sm text-white/60">{formatDate(post.date)}</p>
        </div>
        <div className="flex flex-col justify-center p-8">
          <h3 className="font-heading text-2xl font-semibold leading-snug text-ink">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-body">{post.description}</p>
          <span className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={post.url} className="card block transition hover:border-primary">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
        {formatDate(post.date)}
      </p>
      <h3 className="mt-3 font-heading text-xl font-semibold leading-snug text-ink">
        {post.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-body">{post.description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Read article <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
