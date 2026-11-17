import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { adventures } from "@/data/adventures";
import { regions } from "@/data/regions";
import { experiences } from "@/data/experiences";
import { getPosts } from "@/data/posts";
import { locales, localizePath } from "@/lib/i18n/config";

/** Every page in every language, each entry listing its hreflang alternates (x-default = English). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const url = (path: string, locale: (typeof locales)[number]) => `${base}${localizePath(path, locale)}`.replace(/(.)\/$/, "$1");
  type Entry = { path: string; changeFrequency: "monthly" | "yearly"; priority: number; lastModified?: string };
  const pages: Entry[] = [
    "/",
    "/adventures",
    "/regions",
    "/experiences",
    "/festivals",
    "/when-to-go",
    "/responsible-travel",
    "/what-to-pack",
    "/about",
    "/privacy",
    "/booking-terms",
    "/cookies",
    "/faq",
    "/contact",
    "/journal",
    "/plan-my-adventure",
  ].map((p) => ({ path: p, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
  pages.push(
    ...adventures.map(({ slug: s }): Entry => ({ path: `/adventures/${s}`, changeFrequency: "monthly", priority: 0.9 })),
    ...regions.map(({ slug: s }): Entry => ({ path: `/regions/${s}`, changeFrequency: "yearly", priority: 0.6 })),
    ...experiences.map(({ slug: s }): Entry => ({ path: `/experiences/${s}`, changeFrequency: "yearly", priority: 0.6 })),
    ...getPosts().map((p): Entry => ({ path: `/journal/${p.slug}`, lastModified: p.date, changeFrequency: "yearly", priority: 0.5 })),
  );
  return pages.flatMap((p) =>
    locales.map((l) => ({
      url: url(p.path, l),
      ...(p.lastModified ? { lastModified: p.lastModified } : {}),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: {
        languages: { ...Object.fromEntries(locales.map((x) => [x, url(p.path, x)])), "x-default": url(p.path, "en") },
      },
    })),
  );
}
