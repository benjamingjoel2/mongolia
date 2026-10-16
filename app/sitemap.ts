import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { adventures, experiences, regions } from "@/lib/content";
import { getPosts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const statics = [
    "",
    "/adventures",
    "/regions",
    "/experiences",
    "/festivals",
    "/when-to-go",
    "/responsible-travel",
    "/what-to-pack",
    "/about",
    "/testimonials",
    "/faq",
    "/contact",
    "/journal",
    "/plan-my-adventure",
  ].map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 }));
  return [
    ...statics,
    ...adventures.map((a) => ({ url: `${base}/adventures/${a.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...regions.map((r) => ({ url: `${base}/regions/${r.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...experiences.map((e) => ({ url: `${base}/experiences/${e.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...getPosts().map((p) => ({ url: `${base}/journal/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
