import type { Metadata } from "next";
import { people, getRegion, pick } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { ExpandCards } from "@/components/sections/ExpandCards";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Steppe & Sky",
  description:
    "Real Mongolia, done properly. One dedicated specialist plans your trip; local guides, drivers and herding families make it. Meet the team behind Steppe & Sky.",
  alternates: { canonical: "/about" },
};

const steps = [
  ["Your first message", "Tell us when, where and how you like to travel, by planner, email or WhatsApp."],
  ["One specialist", "The same person plans your whole trip and answers every question, start to finish."],
  ["Shaped together", "Routes, camps and pace adjusted until it feels right. Nothing is booked until you say so."],
  ["On the ground", "Local guides and drivers lead the way, with your specialist a message away."],
  ["Home again", "We check in when you're back, because feedback shapes the next route."],
];

export default function AboutPage() {
  return (
    <>
      <Hero
        size="page"
        image={images.riderRidge}
        horizon={60}
        eyebrow={`About ${site.name}`}
        title="Real Mongolia, *done properly*"
        lead={site.promise}
      />
      <StoryBlock
        label="Who we are"
        text="We are a small team of planners and guides who believe the best of Mongolia is found *slowly, with the people who live here*. No big coaches, no call centres, no shortcuts."
      />

      <section data-theme="light" className="gutter pb-20 md:pb-[8vw]">
        <DisplayHeading text="How we *plan*" className="mb-12 md:mb-16" />
        <ol className="grid gap-8 md:grid-cols-5 md:gap-[1.95vw]">
          {steps.map(([t, d], i) => (
            <li key={t} className="border-t border-charcoal/20 pt-5">
              <span className="text-micro tabular-nums text-felt">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[22px] font-medium leading-tight tracking-[-0.03em]">{t}</h3>
              <p className="mt-3 text-[16px] leading-snug text-charcoal/75">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="team" data-theme="light" className="gutter scroll-mt-14 bg-sand py-20 md:py-[8vw]">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <DisplayHeading text="The *team*" />
          <p className="max-w-[40ch] text-[15px] text-charcoal/70">
            Placeholder profiles. Names, portraits and bios will be replaced with the real team before launch.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-[1.95vw]">
          {people.map((p, i) => (
            <li key={p.slug} className={i % 3 === 1 ? "md:mt-[6vw]" : ""}>
              <Reveal delay={(i % 3) * 0.06}>
                <div className="relative aspect-[4/5] overflow-hidden bg-steppe-tint">
                  <Photo image={p.image} sizes="(min-width: 768px) 31vw, 48vw" />
                  <span className="absolute left-3 top-3 rounded-full bg-offwhite/90 px-3 py-1 text-[12px] font-medium text-charcoal">Placeholder</span>
                </div>
                <h3 className="mt-4 text-[22px] font-medium leading-tight tracking-[-0.03em] md:text-[28px]">{p.name}</h3>
                <p className="text-micro mt-1 uppercase tracking-[0.04em] text-felt">{p.title}</p>
                <p className="mt-3 hidden text-[16px] leading-snug text-charcoal/75 md:block">{p.bio}</p>
                <p className="mt-3 text-[14px] text-charcoal/70">
                  {p.languages.join(", ")} · {pick(getRegion, p.regions).map((r) => r.shortName).join(", ")}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section data-theme="light" className="gutter py-20 md:py-[8vw]">
        <DisplayHeading text="What we *stand for*" className="mx-auto mb-12 max-w-[14ch] text-center md:mb-[6vw]" />
        <ExpandCards
          cards={[
            { id: "local", eyebrow: "Local", title: "Led by Mongolians", body: "Our guides and drivers are from the regions you visit. They know the families, the tracks and the weather, and they're paid fairly all season.", image: images.herderPortrait },
            { id: "honest", eyebrow: "Honest", title: "No surprises", body: "We tell you about long drives, simple toilets and cold nights before you book. Real Mongolia is better when you know what to expect.", image: images.gerSunsetCar },
            { id: "respect", eyebrow: "Respectful", title: "Guests of the steppe", body: "We travel on herders' terms, keep groups small and leave no trace. Read our responsible travel promises for the details.", image: images.gerOrnateDoor, link: { label: "Responsible travel", href: "/responsible-travel" } },
          ]}
        />
      </section>
      <CtaBand />
    </>
  );
}
