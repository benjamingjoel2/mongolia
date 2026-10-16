import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/data/posts";
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
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.excerpt, path: `/journal/${p.slug}`, image: p.hero, type: "article" });
}

const fmt = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { default: Body } = await import(`@/content/journal/${slug}.mdx`);
  const related = pick(getAdventure, post.relatedAdventures);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: sized(post.hero, 1200),
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero size="page" image={post.hero} eyebrow={`${fmt(post.date)} · ${post.readingMinutes} min read`} title={post.title} lead={post.excerpt} />
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
              More from the journal
            </ArrowLink>
            <ArrowLink href="/plan-my-adventure" arrowClassName="text-felt">
              Plan my adventure
            </ArrowLink>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section data-theme="light" className="bg-sand pb-16 pt-14 md:pb-[4vw] md:pt-[6vw]">
          <div className="gutter">
            <DisplayHeading text="*Go* there" />
          </div>
          <div className="mt-10 md:mt-[5vw]">
            <JoinCarousel label="Related adventures" cards={related.map(adventureCard)} />
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
