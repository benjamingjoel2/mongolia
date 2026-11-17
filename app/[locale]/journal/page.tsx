import type { Metadata } from "next";
import { initLocale, t } from "@/lib/i18n/server";
import { pageMeta } from "@/lib/seo";
import { getPosts } from "@/data/posts";
import { getLocale } from "@/lib/i18n/server";
import { formatDate } from "@/lib/i18n/config";
import { images } from "@/lib/images";
import { Hero } from "@/components/sections/Hero";
import { StoryMosaic } from "@/components/sections/StoryMosaic";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata(): Promise<Metadata> {
  await initLocale();
  return pageMeta({
    title: t("Journal"),
    description: t("Stories, guides and honest advice for planning a trip to Mongolia, from Naadam to life in a ger."),
    path: "/journal",
  });
}

export default async function JournalPage() {
  await initLocale();
  const locale = getLocale();
  const posts = getPosts(locale);
  return (
    <>
      <Hero size="page" image={images.milkyWaySteppe} horizon={78} eyebrow={t("Journal")} title={t("Notes from *the steppe*")} lead={t("Guides, stories and straight talk for planning your trip to Mongolia.")} />
      <section data-theme="light" className="gutter py-20 md:py-[8vw]">
        <h2 className="sr-only">{t("Latest posts")}</h2>
        <StoryMosaic
          syncUrl={false}
          items={posts.map((p) => ({
            id: p.slug,
            title: p.title,
            image: p.hero,
            href: `/journal/${p.slug}`,
            tags: p.tags.slice(0, 2),
            meta: `${formatDate(p.date, locale)} · ${t("{n} min read", { n: p.readingMinutes })}`,
          }))}
        />
      </section>
      <CtaBand />
    </>
  );
}
