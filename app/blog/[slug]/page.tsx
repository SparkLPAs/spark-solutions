import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer2/generated";

import { CTABanner } from "@/components/CTABanner";
import { site } from "@/lib/env";
import { MDXContent } from "./mdx-content";

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: post.url },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${site.url}${post.url}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="section">
        <div className="mx-auto max-w-3xl">
          <header>
            <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              &middot; {post.author}
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {post.title}
            </h1>
          </header>

          <div className="mt-10">
            <MDXContent code={post.body.code} />
          </div>
        </div>
      </article>

      <CTABanner title="Ready to add estate planning to your business?" />
    </>
  );
}
