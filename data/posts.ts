import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { images, type ImageKey } from "@/lib/images";
import type { Locale } from "@/lib/i18n/config";
import type { AdventureSlug, PostMeta } from "./types";

const DIR = path.join(process.cwd(), "content", "journal");

/** Slugs of the English posts (content/journal/<slug>.mdx); translations live in <slug>.<locale>.mdx. */
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => /^[^.]+\.mdx$/.test(f))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Journal index for a language, read from MDX frontmatter at build time (newest first). Falls back to English. */
export function getPosts(locale: Locale = "en"): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const localized = path.join(DIR, `${slug}.${locale}.mdx`);
      const file = locale !== "en" && fs.existsSync(localized) ? localized : path.join(DIR, `${slug}.mdx`);
      const { data } = matter(fs.readFileSync(file, "utf8"));
      const heroKey = (data.hero as ImageKey) in images ? (data.hero as ImageKey) : "steppeBigSky";
      return {
        slug,
        title: String(data.title),
        excerpt: String(data.excerpt ?? ""),
        date: String(data.date),
        readingMinutes: Number(data.readingMinutes ?? 5),
        hero: images[heroKey],
        tags: (data.tags as string[]) ?? [],
        relatedAdventures: (data.relatedAdventures as AdventureSlug[]) ?? [],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string, locale: Locale = "en") {
  return getPosts(locale).find((p) => p.slug === slug);
}
