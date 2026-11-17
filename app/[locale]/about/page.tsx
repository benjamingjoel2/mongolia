import type { Metadata } from "next";
import { initLocale, t, tr } from "@/lib/i18n/server";
import { pageMeta } from "@/lib/seo";
import { images } from "@/lib/images";
import { msg } from "@/lib/i18n/core";
import { site } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { ExpandCards } from "@/components/sections/ExpandCards";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export async function generateMetadata(): Promise<Metadata> {
  await initLocale();
  return pageMeta({
    title: t("About Steppe & Sky"),
    description: t("Real Mongolia, done properly. One dedicated specialist plans your trip; local guides, drivers and herding families make it. Meet the people behind Steppe & Sky."),
    path: "/about",
  });
}

const steps = [
  [msg("Your first message"), msg("Tell us when, where and how you like to travel, by planner or email.")],
  [msg("One specialist"), msg("The same person plans your whole trip and answers every question, start to finish.")],
  [msg("Shaped together"), msg("Routes, camps and pace adjusted until it feels right. Nothing is booked until you say so.")],
  [msg("On the ground"), msg("Local guides and drivers lead the way, with your specialist a message away.")],
  [msg("Home again"), msg("We check in when you're back, because feedback shapes the next route.")],
];

export default async function AboutPage() {
  await initLocale();
  return (
    <>
      <Hero
        size="page"
        image={images.riderRidge}
        horizon={60}
        eyebrow={t("About {name}", { name: site.name })}
        title={t("Real Mongolia, *done properly*")}
        lead={t(site.promise)}
      />
      <StoryBlock
        label={t("Who we are")}
        text={t("We are a small team of planners and guides who believe the best of Mongolia is found *slowly, with the people who live here*. No big coaches, no call centres, no shortcuts.")}
      />

      <section data-theme="light" className="gutter pb-20 md:pb-[8vw]">
        <DisplayHeading text={t("How we *plan*")} className="mb-12 md:mb-16" />
        <ol className="grid gap-8 md:grid-cols-5 md:gap-[1.95vw]">
          {steps.map(([title, d], i) => (
            <li key={title} className="border-t border-charcoal/20 pt-5">
              <span className="text-micro tabular-nums text-felt">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[22px] font-medium leading-tight tracking-[-0.03em]">{t(title)}</h3>
              <p className="mt-3 text-[16px] leading-snug text-charcoal/75">{t(d)}</p>
            </li>
          ))}
        </ol>
      </section>


      <section data-theme="light" className="gutter py-20 md:py-[8vw]">
        <DisplayHeading text={t("What we *stand for*")} className="mx-auto mb-12 max-w-[14ch] text-center md:mb-[6vw]" />
        <ExpandCards
          cards={[
            { id: "local", eyebrow: t("Local"), title: t("Led by Mongolians"), body: t("Our guides and drivers are from the regions you visit. They know the families, the tracks and the weather, and they're paid fairly all season."), image: tr(images.herderPortrait) },
            { id: "honest", eyebrow: t("Honest"), title: t("No surprises"), body: t("We tell you about long drives, simple toilets and cold nights before you book. Real Mongolia is better when you know what to expect."), image: tr(images.gerSunsetCar) },
            { id: "respect", eyebrow: t("Respectful"), title: t("Guests of the steppe"), body: t("We travel on herders' terms, keep groups small and leave no trace. Read our responsible travel promises for the details."), image: tr(images.gerOrnateDoor), link: { label: t("Responsible travel"), href: "/responsible-travel" } },
          ]}
        />
      </section>
      <CtaBand />
    </>
  );
}
