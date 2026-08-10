import type { Metadata } from "next";
import { allReviews } from "contentlayer2/generated";

import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/FadeIn";
import { ReviewCard } from "@/components/ReviewCard";
import { CTABanner } from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What financial services professionals and will writers say about running their estate planning revenue through Spark Solutions.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const reviews = [...allReviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What Our Partners Say"
        subtitle="Real feedback from financial services professionals and will writers running their estate planning revenue through Spark Solutions."
      />
      <section className="section">
        {reviews.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <FadeIn key={review.slug} delay={(i % 3) * 0.1}>
                <ReviewCard review={review} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <p className="mx-auto max-w-xl text-center text-ink-body">
            We&apos;re gathering real feedback from partners now — check back soon.
          </p>
        )}
      </section>
      <CTABanner title="Ready to add estate planning revenue to your business?" />
    </>
  );
}
