import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { images, type ImageKey } from "@/lib/images";
import type { AdventureSlug, PostMeta } from "./types";

const DIR = path.join(process.cwd(), "content", "journal");

/** Journal index, read from MDX frontmatter at build time (newest first). */
export function getPosts(): PostMeta[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      const heroKey = (data.hero as ImageKey) in images ? (data.hero as ImageKey) : "steppeBigSky";
      return {
        slug: file.replace(/\.mdx$/, ""),
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

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}
