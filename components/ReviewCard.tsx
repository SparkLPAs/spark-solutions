"use client";

import { Star } from "lucide-react";
import { useMDXComponent } from "next-contentlayer2/hooks";
import type { Review } from "contentlayer2/generated";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export function ReviewCard({ review }: { review: Review }) {
  const Body = useMDXComponent(review.body.code);

  return (
    <div className="card">
      {typeof review.rating === "number" && (
        <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={
                i < review.rating!
                  ? "h-4 w-4 fill-accent text-accent"
                  : "h-4 w-4 text-border"
              }
            />
          ))}
        </div>
      )}
      <div className="mt-4 text-sm leading-relaxed text-ink-body [&_p]:mt-3 [&_p:first-child]:mt-0">
        <Body />
      </div>
      <p className="mt-5 text-sm font-semibold text-ink">
        {review.authorName} at {review.businessName}
      </p>
      <p className="text-xs text-ink-muted">
        {review.role ? `${review.role} · ` : ""}
        {formatDate(review.date)}
      </p>
    </div>
  );
}
