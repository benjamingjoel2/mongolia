import type { Metadata } from "next";
import { packing } from "@/data/packing";
import { images } from "@/lib/images";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { PackingGuide } from "@/components/sections/PackingGuide";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "What to pack for Mongolia",
  description:
    "Layers for four seasons in a day, riding kit, sleep, sun and dust protection, first aid, power and documents. Generic packing lists for summer and winter trips in Mongolia.",
  alternates: { canonical: "/what-to-pack" },
};

export default function WhatToPackPage() {
  return (
    <>
      <Hero
        size="page"
        image={images.gerSnow}
        horizon={70}
        eyebrow="Kit lists"
        title="*Pack* for four seasons in a day"
        lead="Mongolia's weather turns fast: a hot afternoon in the Gobi, a frosty night in the mountains. Pack soft bags, warm layers and a good sense of humour."
      />
      <StoryBlock text="Luggage travels in the back of a 4x4 or on a camel, so *pack light and soft*: one duffel of up to 15 kg and a daypack is ideal." />
      <section data-theme="light" className="gutter bg-sand py-20 md:py-[8vw]">
        <h2 className="sr-only">Packing lists</h2>
        <PackingGuide categories={packing} />
        <p className="mt-12 max-w-[60ch] text-[15px] text-charcoal/70">
          Generic guidance only. Your specialist sends a tailored list for your route and season, including anything we
          provide on the ground (sleeping bags for wild camps, riding helmets).
        </p>
        <div className="mt-6">
          <ArrowLink href="/faq#what-to-pack" arrowClassName="text-felt">
            Packing questions in the FAQ
          </ArrowLink>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
