import type { MetadataRoute } from "next";
import { publishedEssays } from "@/content/seed/essays.seed";
import { labSeed } from "@/content/seed/lab.seed";
import { workSeed } from "@/content/seed/work.seed";
import { absoluteUrl, toIsoDate } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), priority: 1, changeFrequency: "monthly" },
    { url: absoluteUrl("/work"), priority: 0.9, changeFrequency: "monthly" },
    { url: absoluteUrl("/lab"), priority: 0.8, changeFrequency: "monthly" },
    { url: absoluteUrl("/essays"), priority: 0.9, changeFrequency: "weekly" },
    { url: absoluteUrl("/about"), priority: 0.7, changeFrequency: "yearly" },
  ];

  const workRoutes: MetadataRoute.Sitemap = workSeed.map((work) => ({
    url: absoluteUrl(`/work/${work.slug}`),
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const labRoutes: MetadataRoute.Sitemap = labSeed.map((project) => ({
    url: absoluteUrl(`/lab/${project.slug}`),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const essayRoutes: MetadataRoute.Sitemap = publishedEssays.map((article) => ({
    url: absoluteUrl(`/essays/${article.slug}`),
    lastModified: toIsoDate(article.publishedAt),
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...workRoutes, ...labRoutes, ...essayRoutes];
}
