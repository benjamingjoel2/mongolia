import type { Metadata } from "next";
import { contact, planHref, site } from "@/config/site";
import { images } from "@/lib/images";
import { adventures, getAdventure, getRegion, pick } from "@/lib/content";
import { difficultyLabels, seasonLabels } from "@/data/taxonomy";
import type { AdventureSlug } from "@/data/types";
import { Hero } from "@/components/sections/Hero";
import { IntroReel } from "@/components/sections/IntroReel";
import { StoryMosaic, type MosaicItem } from "@/components/sections/StoryMosaic";
import { JoinCarousel, type CarouselCard } from "@/components/sections/JoinCarousel";
import { ExpandCards, type ExpandCard } from "@/components/sections/ExpandCards";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: { absolute: `${site.name}: Mongolia adventure travel. ${site.tagline}` },
  alternates: { canonical: "/" },
};

const featured: AdventureSlug[] = [
  "classic-mongolia-gobi-kharkhorin",
  "orkhon-valley-horse-trek",
  "khovsgol-reindeer-herders",
  "golden-eagle-festival-expedition",
  "naadam-festival-journey",
  "gobi-camel-trek-dune-camping",
  "altai-mountains-trek",
  "winter-mongolia-tsagaan-sar",
];

export default function Home() {
  const mosaic: MosaicItem[] = pick(getAdventure, featured).map((a) => ({
    id: a.slug,
    title: a.shortTitle,
    image: a.hero,
    story: {
      label: pick(getRegion, a.regions)
        .map((r) => r.shortName)
        .join(" · "),
      story: a.story,
      facts: [`${a.days} days`, difficultyLabels[a.difficulty].label, a.seasons.map((s) => seasonLabels[s]).join(" & ")],
      priceFromUSD: a.priceFromUSD,
      links: [
        { label: "See the full itinerary", href: `/adventures/${a.slug}` },
        { label: "Plan my adventure", href: planHref },
      ],
    },
  }));

  const cards: CarouselCard[] = [
    {
      id: "plan",
      title: "*Plan* your adventure in five steps…",
      stat: "One specialist, from first message to flight home",
      href: planHref,
      tone: "felt",
      body: "Tell us when, where and how you like to travel. Your specialist replies within two working days.",
    },
    {
      id: "stay",
      title: "*Stay* with nomad families…",
      stat: "10 ways to live the steppe",
      href: "/experiences",
      image: images.teaWithHerders,
    },
    {
      id: "festivals",
      title: "*Time* it with Naadam or the eagles…",
      stat: "5 festivals through the year",
      href: "/festivals",
      image: images.eagleHuntersRiver,
    },
    {
      id: "regions",
      title: "*Choose* your corner of the country…",
      stat: "6 regions, from the Gobi to the taiga",
      href: "/regions",
      image: images.altaiGreenSnow,
    },
    {
      id: "responsible",
      title: "*Travel* lightly on the steppe…",
      stat: "How we work with herding families",
      href: "/responsible-travel",
      image: images.horseHerdGreen,
    },
    {
      id: "pack",
      title: "*Pack* for four seasons in a day…",
      stat: "8 kit lists for summer and winter",
      href: "/what-to-pack",
      image: images.gerSnow,
    },
  ];

  const people: ExpandCard[] = [
    {
      id: "guides",
      eyebrow: "On the ground",
      title: "Local guides and drivers",
      body: "Guides who grew up in the regions you travel through, and drivers who know every river crossing. They speak your language and the herders' too, and they set the pace with you, not for you.",
      image: images.herderPreparingHorse,
      link: { label: "About us", href: "/about" },
    },
    {
      id: "specialist",
      eyebrow: "From the first message",
      title: "One dedicated specialist",
      body: `Your specialist plans your trip from the first message to the day you fly home: routes, camps, dietary needs, festival tickets and every transfer. One person, one thread, no call centre.`,
      image: images.gerSunsetCar,
      link: { label: "How we plan", href: "/about" },
    },
    {
      id: "families",
      eyebrow: "Under the same sky",
      title: "Herding families and ger camps",
      body: "You sleep in family gers and small camps we know personally, paid fairly and booked with respect for the rhythms of herding life. Camp names stay placeholders until our partner agreements are signed.",
      image: images.gerInterior,
      link: { label: "Responsible travel", href: "/responsible-travel" },
    },
  ];


  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    description: site.description,
    url: site.url,
    email: contact.email,
    address: { "@type": "PostalAddress", ...contact.postalAddress },
    areaServed: { "@type": "Country", name: "Mongolia" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <IntroReel />
      <Hero
        image={images.gersSnowPeaks}
        lines={["Steppe", "& Sky"]}
        horizon={66}
        scrollTo="adventures"
        waitForIntro
        lead={
          <>
            <em className="italic">Nothing between you and the sky.</em> Small-group and private adventures across the
            steppe, the Gobi and the Altai, planned by one dedicated specialist and led by local guides.
          </>
        }
      >
        <ArrowLink href={planHref} arrowClassName="text-gobi">
          Plan my adventure
        </ArrowLink>
      </Hero>

      <section id="adventures" data-theme="light" className="gutter pb-24 pt-[9.7vw] md:pb-[10vw]">
        <Reveal>
          <DisplayHeading text="*Adventures* under the eternal blue sky" className="mx-auto max-w-[17ch] text-center" />
        </Reveal>
        <div className="mt-14 md:mt-[7vw]">
          <StoryMosaic items={mosaic} />
        </div>
        <div className="mt-14 flex justify-center md:mt-20">
          <ArrowLink href="/adventures" arrowClassName="text-felt" className="text-[20px] md:text-[26px]">
            {`See all ${adventures.length} adventures`}
          </ArrowLink>
        </div>
      </section>

      <section id="your-trip" data-theme="light" className="bg-sand pb-16 pt-14 md:pb-[4vw] md:pt-[6vw]">
        <Reveal className="gutter">
          <DisplayHeading text="Now it's *your* trip" />
        </Reveal>
        <div className="mt-10 md:mt-[5vw]">
          <JoinCarousel cards={cards} label="Ways to start planning" />
        </div>
      </section>

      <section id="people" data-theme="light" className="gutter pb-24 pt-[9.7vw] md:pb-[8vw]">
        <Reveal>
          <DisplayHeading text="… and *meet* the people who make it" className="mx-auto max-w-[12ch] text-center" />
        </Reveal>
        <div className="mt-14 md:mt-[8vw]">
          <ExpandCards cards={people} />
        </div>
      </section>

    </>
  );
}
