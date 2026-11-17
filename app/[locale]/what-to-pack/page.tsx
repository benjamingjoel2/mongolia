import type { Metadata } from "next";
import { initLocale, t, tr } from "@/lib/i18n/server";
import { pageMeta } from "@/lib/seo";
import { packing } from "@/data/packing";
import { images } from "@/lib/images";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { PackingGuide } from "@/components/sections/PackingGuide";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowLink } from "@/components/ui/ArrowLink";

export async function generateMetadata(): Promise<Metadata> {
  await initLocale();
  return pageMeta({
    title: t("What to pack for Mongolia"),
    description: t("Layers for four seasons in a day, riding kit, sleep, sun and dust protection, first aid, power and documents. Generic packing lists for summer and winter trips in Mongolia."),
    path: "/what-to-pack",
  });
}

export default async function WhatToPackPage() {
  await initLocale();
  return (
    <>
      <Hero
        size="page"
        image={images.gerSnow}
        horizon={70}
        eyebrow={t("Kit lists")}
        title={t("*Pack* for four seasons in a day")}
        lead={t("Mongolia's weather turns fast: a hot afternoon in the Gobi, a frosty night in the mountains. Pack soft bags, warm layers and a good sense of humour.")}
      />
      <StoryBlock text={t("Luggage travels in the back of a 4x4 or on a camel, so *pack light and soft*: one duffel of up to 15 kg and a daypack is ideal.")} />
      <section data-theme="light" className="gutter bg-sand py-20 md:py-[8vw]">
        <h2 className="sr-only">{t("Packing lists")}</h2>
        <PackingGuide categories={tr(packing)} />
        <p className="mt-12 max-w-[60ch] text-[15px] text-charcoal/70">
          {t("Generic guidance only. Your specialist sends a tailored list for your route and season, including anything we provide on the ground (sleeping bags for wild camps, riding helmets).")}
        </p>
        <div className="mt-6">
          <ArrowLink href="/faq#what-to-pack" arrowClassName="text-felt">
            {t("Packing questions in the FAQ")}
          </ArrowLink>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
