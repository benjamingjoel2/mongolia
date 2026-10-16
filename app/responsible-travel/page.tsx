import type { Metadata } from "next";
import { images } from "@/lib/images";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { ExpandCards } from "@/components/sections/ExpandCards";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Check, Close } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Responsible travel: respecting nomad families and the steppe",
  description:
    "How we travel in Mongolia: respecting herding families, ger etiquette, leaving no trace on the steppe and making sure tourism money stays in local communities.",
  alternates: { canonical: "/responsible-travel" },
};

const principles = [
  {
    title: "Guests, not spectators",
    text: "We visit families who want visitors, agree a fair fee in advance and keep groups small. No staged performances, no turning up unannounced. Herding life comes first; our plans bend around it.",
  },
  {
    title: "Leave no trace on the steppe",
    text: "Grassland recovers slowly. Our drivers stick to existing tracks, we carry out every piece of rubbish (including from wild camps), use stoves rather than fires where wood is scarce, and never take fossils, stones or bones.",
  },
  {
    title: "Money that stays local",
    text: "Mongolian guides and drivers, paid properly and year-round where we can. Family stays and small camps over chains. Felt, cashmere and crafts bought directly from the people who make them.",
  },
  {
    title: "Wildlife and sacred places",
    text: "We keep a respectful distance from takhi, ibex and nesting birds, follow park rules, and treat ovoo cairns, monasteries and mountains like Burkhan Khaldun with the reverence local people give them.",
  },
];

const dos = [
  "Accept tea, food or a bowl of airag with your right hand, or both hands",
  "Move clockwise inside the ger, and sit where your host shows you",
  "Ask before photographing people, altars and family photos",
  "Walk clockwise around ovoo cairns; adding a stone is welcome",
  "Bring a small, useful gift for host families; your guide will suggest ideas",
];
const donts = [
  "Step on the threshold of a ger, or lean on the central posts",
  "Point your feet at the stove or the family altar",
  "Whistle inside a ger, or throw rubbish into the fire",
  "Touch a person's hat, or walk between the stove and an elder",
  "Fly drones near herds, homes or monasteries without permission",
];

export default function ResponsibleTravelPage() {
  return (
    <>
      <Hero
        size="page"
        image={images.horseHerdGreen}
        horizon={60}
        eyebrow="How we travel"
        title="Travel *lightly* on the steppe"
        lead="Nomadic life is not a backdrop. These are the promises we make to the families who host us, and the ones we ask of every traveller."
      />
      <StoryBlock label="Our approach" text="The steppe has hosted travellers for thousands of years. Our job is to make sure each visit *leaves it as generous as we found it*." />

      <section data-theme="light" className="gutter pb-20 md:pb-[8vw]">
        <ol className="grid gap-x-[1.95vw] gap-y-12 md:grid-cols-2">
          {principles.map((p, i) => (
            <li key={p.title} className={i % 2 ? "md:mt-[8vw]" : ""}>
              <Reveal className="border-t border-charcoal/20 pt-6">
                <span className="text-micro tabular-nums text-felt">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-h2 mt-3">{p.title}</h2>
                <p className="text-body-lg mt-6 max-w-[44ch] text-charcoal/80">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section id="ger-etiquette" data-theme="dark" className="gutter scroll-mt-14 bg-charcoal py-20 text-offwhite md:py-[8vw]">
        <DisplayHeading text="Ger *etiquette*" className="mb-6" />
        <p className="mb-14 max-w-[52ch] text-[17px] text-offwhite/75 md:text-[19px]">
          Nobody expects perfection, and families are forgiving. A little knowledge shows respect, and your guide will
          always help.
        </p>
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-[24px] font-medium tracking-[-0.03em]">Please do</h3>
            <ul className="flex flex-col gap-4">
              {dos.map((d) => (
                <li key={d} className="flex gap-4 text-[17px] leading-snug md:text-[19px]">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-steppe">
                    <Check className="size-3.5" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-[24px] font-medium tracking-[-0.03em]">Please don&apos;t</h3>
            <ul className="flex flex-col gap-4">
              {donts.map((d) => (
                <li key={d} className="flex gap-4 text-[17px] leading-snug text-offwhite/85 md:text-[19px]">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-felt">
                    <Close className="size-3" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section data-theme="light" className="gutter py-20 md:py-[8vw]">
        <DisplayHeading text="In *practice*" className="mb-12 text-center md:mb-[6vw]" />
        <ExpandCards
          cards={[
            {
              id: "families",
              eyebrow: "Host families",
              title: "Fair pay, agreed in advance",
              body: "Families set their own terms. We pay for nights, meals, horses and camels at agreed rates, and never ask a family to host during lambing, moving camp or a bereavement.",
              image: images.teaWithHerders,
            },
            {
              id: "trace",
              eyebrow: "On the land",
              title: "Pack it in, pack it out",
              body: "Every vehicle carries rubbish bags and we take waste back to towns with proper disposal. Refill your bottle from our filtered water rather than buying plastic.",
              image: images.steppeLoneGer,
            },
            {
              id: "community",
              eyebrow: "Communities",
              title: "Buy local, hire local",
              body: "Local guides, drivers and cooks. Crafts bought from makers. Placeholder: details of community projects we support will be added once partnerships are confirmed.",
              image: images.musicians,
            },
          ]}
        />
      </section>
      <CtaBand title="*Travel* well with us" />
    </>
  );
}
