import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs } from "@/data/posts";
import { initLocale, t, tr } from "@/lib/i18n/server";
import { formatDate, localizePath } from "@/lib/i18n/config";
import fs from "node:fs";
import path from "node:path";
import { getAdventure, pick } from "@/lib/content";
import { adventureCard } from "@/lib/cards";
import { sized } from "@/lib/images";
import { site } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { JoinCarousel } from "@/components/sections/JoinCarousel";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = await initLocale();
  const p = getPost((await params).slug, locale);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.excerpt, path: `/journal/${p.slug}`, image: tr(p.hero), type: "article" });
}

export default async function PostPage({ params }: Params) {
  const locale = await initLocale();
  const { slug } = await params;
  const post = getPost(slug, locale);
  if (!post) notFound();
  const hasTranslation = locale !== "en" && fs.existsSync(path.join(process.cwd(), "content", "journal", `${slug}.${locale}.mdx`));
  const { default: Body } = hasTranslation
    ? await import(`@/content/journal/${slug}.${locale}.mdx`)
    : await import(`@/content/journal/${slug}.mdx`);
  const related = pick(getAdventure, post.relatedAdventures);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: sized(post.hero, 1200),
    inLanguage: locale,
    url: `${site.url}${localizePath(`/journal/${slug}`, locale)}`,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero size="page" image={post.hero} eyebrow={`${formatDate(post.date, locale)} · ${t("{n} min read", { n: post.readingMinutes })}`} title={post.title} lead={post.excerpt} />
      <article data-theme="light" className="gutter py-20 md:py-[8vw]">
        <div className="mx-auto max-w-[54rem]">
          <ul className="mb-12 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full bg-sand px-3 py-1 text-[13px]">
                {t}
              </li>
            ))}
          </ul>
          <Body />
          <div aria-hidden className="ornament-line mt-16 opacity-80" />
          <div className="mt-10 flex flex-col gap-4 md:flex-row md:justify-between">
            <ArrowLink href="/journal" arrowClassName="text-felt">
              {t("More from the journal")}
            </ArrowLink>
            <ArrowLink href="/plan-my-adventure" arrowClassName="text-felt">
              {t("Plan my adventure")}
            </ArrowLink>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section data-theme="light" className="bg-sand pb-16 pt-14 md:pb-[4vw] md:pt-[6vw]">
          <div className="gutter">
            <DisplayHeading text={t("*Go* there")} />
          </div>
          <div className="mt-10 md:mt-[5vw]">
            <JoinCarousel label={t("Related adventures")} cards={related.map(adventureCard)} />
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
