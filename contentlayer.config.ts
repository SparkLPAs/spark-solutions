import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  // Scoped to content/blog specifically (was `**/*.mdx`, unscoped) — had to
  // narrow this when Review was added below, since an unscoped pattern
  // would also match content/reviews/*.mdx and try to parse real reviews
  // as blog posts (missing required fields, wrong slug/url).
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: true, default: "Jason" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace(/^blog\//, ""),
    },
    url: {
      type: "string",
      resolve: (post) => `/blog/${post._raw.flattenedPath.replace(/^blog\//, "")}`,
    },
  },
}));

// Real testimonials from real Spark Solutions partners (business owner,
// Aug 2026) — Online Wills/Osiris partners specifically, who he's lining
// up to provide these. Deliberately no example/placeholder .mdx file
// added alongside this — content/reviews/ starts empty and stays that way
// until real ones are written; see the root README's "Adding a real
// review" section for the exact fields a real one needs. Publishing a
// review is a PR to this repo, so nothing goes live without the business
// owner's own merge — that PR review *is* the approval step he asked for.
// app/reviews/page.tsx handles the zero-reviews state honestly rather
// than needing fake content to look "finished".
export const Review = defineDocumentType(() => ({
  name: "Review",
  filePathPattern: `reviews/**/*.mdx`,
  contentType: "mdx",
  fields: {
    authorName: { type: "string", required: true },
    // e.g. "XYZ Solutions" — attributed to a real business, business
    // owner's explicit call ("more powerful if it can be attributed to a
    // business, e.g. John Smith at XYZ Solutions").
    businessName: { type: "string", required: true },
    // e.g. "Independent Financial Adviser" or "Will Writer" — optional job
    // title shown alongside the business attribution, not required since
    // the name + business is the primary byline.
    role: { type: "string", required: false },
    // 1-5, optional — matches the existing per-partner Review model's
    // convention in the spark-partner-dashboard repo (not otherwise
    // related; that one is a partner's own client-facing testimonials,
    // this is testimonials about Spark Solutions itself).
    rating: { type: "number", required: false },
    date: { type: "date", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (review) => review._raw.flattenedPath.replace(/^reviews\//, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Review],
});
