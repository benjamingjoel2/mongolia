import type { Metadata } from "next";
import { initLocale, t } from "@/lib/i18n/server";
import { pageMeta } from "@/lib/seo";
import { getExperiences, getRegion, pick } from "@/lib/content";
import { images } from "@/lib/images";
import { monthNames } from "@/data/taxonomy";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { StoryMosaic, type MosaicItem } from "@/components/sections/StoryMosaic";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export async function generateMetadata(): Promise<Metadata> {
  await initLocale();
  return pageMeta({
    title: t("Experiences: ger stays, horses, eagles and Naadam"),
    description: t("Stay with nomad families, ride Mongolian horses, trek with Bactrian camels, meet eagle hunters, hear throat singing and sleep under the darkest skies in Asia."),
    path: "/experiences",
  });
}

export default async function ExperiencesPage() {
  await initLocale();
  const experiences = getExperiences();
  const best = (months: number[]) => {
    const first = t(monthNames[months[0] as keyof typeof monthNames]);
    if (months.length === 1) return t("Best: {month}", { month: first });
    return t("Best: {from} to {to}", { from: first, to: t(monthNames[months[months.length - 1] as keyof typeof monthNames]) });
  };
  const items: MosaicItem[] = experiences.map((e) => ({
    id: e.slug,
    title: e.title,
    image: e.hero,
    story: {
      label: pick(getRegion, e.regions).map((r) => r.shortName).join(" · ") || t("Across Mongolia"),
      story: e.story,
      facts: [best(e.months)],
      links: [
        { label: t("Read more"), href: `/experiences/${e.slug}` },
        { label: t("Plan my adventure"), href: "/plan-my-adventure" },
      ],
    },
  }));
  return (
    <>
      <Hero
        size="page"
        image={images.teaWithHerders}
        horizon={72}
        eyebrow={t("10 ways to live the steppe")}
        title={t("*Experiences* under the open sky")}
        lead={t("Not shows put on for visitors: everyday nomadic life, shared with respect and on the herders' terms.")}
      />
      <StoryBlock text={t("The best moments are often the quiet ones: *milk tea in a stranger's ger*, a horse that finally trusts you, a sky so full of stars it looks unreal.")} />
      <section data-theme="light" className="gutter pb-24 md:pb-[10vw]">
        <DisplayHeading text={t("Choose your *moments*")} className="mb-12 md:mb-[6vw]" />
        <StoryMosaic items={items} />
      </section>
      <CtaBand />
    </>
  );
}
