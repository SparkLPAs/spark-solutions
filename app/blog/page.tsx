import type { Metadata } from "next";
import { allPosts } from "contentlayer2/generated";

import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { BlogCard } from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insight on estate planning, revenue growth and client conversations for mortgage brokers, IFAs, will writers and other financial services professionals.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Estate Planning Insight for Financial Services Professionals"
        subtitle="Practical guidance on adding estate planning revenue to your business, having the right conversations with clients, and getting the most from your Spark Solutions platform."
      />
      <section className="section">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={(i % 3) * 0.1}>
              <BlogCard post={post} />
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
