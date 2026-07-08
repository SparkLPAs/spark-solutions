import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "contentlayer2/generated";

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={post.url} className="card block transition hover:border-primary">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
        {new Date(post.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
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
