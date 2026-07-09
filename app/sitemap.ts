import type { MetadataRoute } from "next";
import { allPosts } from "contentlayer2/generated";

import { site } from "@/lib/env";

const staticRoutes = [
  "",
  "/for/financial-services",
  "/for/will-writers",
  "/how-it-works",
  "/pricing",
  "/features",
  "/about",
  "/demo",
  "/blog",
  "/legal/privacy",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${site.url}${post.url}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
