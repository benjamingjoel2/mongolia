import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adventures, getAdventure, getFestival, getRegion, getStay, pick, testimonialsFor, getExperience } from "@/lib/content";
import { difficultyLabels, monthNames, seasonLabels, styleLabels } from "@/data/taxonomy";
import type { Adventure, Meal } from "@/data/types";
import { site } from "@/config/site";
import { adventureCard } from "@/lib/cards";
import { Hero } from "@/components/sections/Hero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { Accordion } from "@/components/sections/Accordion";
import { MongoliaMap } from "@/components/sections/MongoliaMap";
import { JoinCarousel } from "@/components/sections/JoinCarousel";
import { ExpandCards } from "@/components/sections/ExpandCards";
import { QuoteCycler } from "@/components/sections/QuoteCycler";
import { CtaBand } from "@/components/sections/CtaBand";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BlobButton } from "@/components/ui/BlobButton";
import { Price, FromPrice } from "@/components/ui/Price";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Check, Close } from "@/components/ui/icons";
import { comfortLabels } from "@/data/taxonomy";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return adventures.map((a) => ({ slug: a.slug }));
}


export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getAdventure(slug);
  if (!a) return {};
  return pageMeta({ title: a.seo.title, description: a.seo.description, path: `/adventures/${a.slug}`, image: a.hero });
}

const mealNames: Record<Meal, string> = { B: "Breakfast", L: "Lunch", D: "Dinner" };

const fmtDate = (iso: string, withYear = true) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: withYear ? "numeric" : undefined, timeZone: "UTC" });

function DifficultyMeter({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-1" aria-hidden>
      {[1, 2, 3, 4].map((n) => (
        <span key={n} className={`h-2 w-5 rounded-full ${n <= level ? "bg-felt" : "bg-charcoal/15"}`} />
      ))}
    </span>
  );
}

export default async function AdventurePage({ params }: Params) {
  const { slug } = await params;
  const a = getAdventure(slug);
  if (!a) notFound();

  const regionList = pick(getRegion, a.regions);
  const festival = a.festival ? getFestival(a.festival) : undefined;
  const diff = difficultyLabels[a.difficulty];
  const planHref = `/plan-my-adventure?adventure=${a.slug}`;

  const stays = [...new Set(a.itinerary.map((d) => d.staySlug).filter(Boolean))]
    .map((s) => getStay(s!))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const related = adventures
    .filter((x) => x.slug !== a.slug)
    .map((x) => ({ x, score: x.regions.filter((r) => a.regions.includes(r)).length * 2 + x.activities.filter((t) => a.activities.includes(t)).length }))
    .sort((p, q) => q.score - p.score)
    .slice(0, 5)
    .map(({ x }) => x);

  const quotes = testimonialsFor(a.slug).map((t) => ({ id: t.id, quote: t.quote, name: t.name, detail: t.country, placeholder: t.placeholder }));

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Region", value: regionList.map((r) => r.shortName).join(" · ") },
    { label: "Duration", value: `${a.days} days` },
    {
      label: "Difficulty",
      value: (
        <span className="flex flex-col gap-2">
          <span className="flex items-center gap-3">
            {diff.label} <DifficultyMeter level={diff.level} />
          </span>
          <span className="text-[14px] leading-snug text-charcoal/65">{diff.description}</span>
        </span>
      ),
    },
    { label: "Season", value: `${a.seasons.map((s) => seasonLabels[s]).join(", ")} · ${a.months.map((m) => monthNames[m].slice(0, 3)).join(", ")}` },
    { label: "Style", value: `${a.styles.map((s) => styleLabels[s]).join(" or ")}${a.groupSize ? ` · ${a.groupSize}` : ""}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: a.title,
    description: a.summary,
    touristType: a.activities,
    itinerary: { "@type": "ItemList", itemListElement: a.itinerary.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: `Day ${d.day}: ${d.title}` })) },
    offers: a.departures.map((d) => ({
      "@type": "Offer",
      price: d.priceUSD,
      priceCurrency: "USD",
      availability: d.status === "full" ? "https://schema.org/SoldOut" : d.status === "limited" ? "https://schema.org/LimitedAvailability" : "https://schema.org/InStock",
      validFrom: d.start,
      url: `${site.url}/adventures/${a.slug}`,
    })),
    provider: { "@type": "TravelAgency", name: site.name, url: site.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero
        size="page"
        image={a.hero}
        eyebrow={`${regionList.map((r) => r.shortName).join(" · ")} · ${a.days} days`}
        title={a.title}
        lead={a.summary}
        scrollTo="overview"
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <span className="rounded-full bg-gobi px-4 py-2 text-[15px] font-medium text-charcoal md:text-[17px]">
            <FromPrice usd={a.priceFromUSD} />
          </span>
          <ArrowLink href={planHref} arrowClassName="text-gobi">
            Enquire about this adventure
          </ArrowLink>
        </div>
      </Hero>

      {/* Key facts */}
      <section id="overview" data-theme="light" className="gutter scroll-mt-14 border-b border-charcoal/10 py-12 md:py-16">
        <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-[repeat(5,minmax(0,1fr))_auto]">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-micro mb-2 uppercase tracking-[0.04em] text-charcoal/70">{f.label}</dt>
              <dd className="text-[18px] font-medium leading-snug tracking-[-0.02em] md:text-[20px]">{f.value}</dd>
            </div>
          ))}
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <dt className="text-micro uppercase tracking-[0.04em] text-charcoal/70">From, per person</dt>
            <dd className="flex flex-col items-start gap-3 lg:items-end">
              <Price usd={a.priceFromUSD} className="text-[32px] font-medium leading-none tracking-[-0.04em] md:text-[40px]" />
              <BlobButton href={planHref}>Plan this adventure</BlobButton>
            </dd>
          </div>
        </dl>
        {festival && (
          <p className="mt-10 inline-flex flex-wrap items-center gap-3 rounded-full bg-gobi-tint px-5 py-3 text-[15px]">
            <span className="font-medium">Timed for {festival.name}:</span> {festival.when}
            <span className="rounded-full border border-charcoal/30 px-2 py-0.5 text-[12px] uppercase tracking-[0.04em]">Verify yearly</span>
          </p>
        )}
      </section>

      <StoryBlock label="The adventure" text={a.story}>
        <ol className="grid gap-x-12 gap-y-6 md:grid-cols-2">
          {a.highlights.map((h, i) => (
            <li key={h} className="flex items-baseline gap-4 border-t border-charcoal/15 pt-5">
              <span className="text-micro tabular-nums text-felt">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[19px] leading-snug tracking-[-0.02em] md:text-[22px]">{h}</span>
            </li>
          ))}
        </ol>
      </StoryBlock>

      {/* Day by day */}
      <section id="itinerary" data-theme="light" className="gutter bg-sand py-20 md:py-[8vw]">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <DisplayHeading text="*Day* by day" />
          <p className="max-w-[38ch] text-[16px] text-charcoal/70 md:text-[18px]">
            Every itinerary is a starting point. Your specialist can add rest days, swap camps or change the pace.
          </p>
        </div>
        <Accordion
          allowExpandAll
          defaultOpen={[`day-${a.itinerary[0].day}`]}
          items={a.itinerary.map((d) => {
            const stay = d.staySlug ? getStay(d.staySlug) : undefined;
            return {
              id: `day-${d.day}`,
              kicker: d.day.includes("-") ? `Days ${d.day}` : `Day ${d.day}`,
              title: d.title,
              summary: [d.travel, d.stay].filter(Boolean).join(" · "),
              content: (
                <div className="flex flex-col gap-6">
                  <p className="text-body-lg">{d.description}</p>
                  <dl className="grid gap-6 text-[15px] md:grid-cols-3 md:text-[16px]">
                    <div>
                      <dt className="text-micro mb-2 uppercase tracking-[0.04em] text-charcoal/70">Activities</dt>
                      <dd>
                        <ul className="flex flex-wrap gap-2">
                          {d.activities.map((x) => (
                            <li key={x} className="rounded-full border border-charcoal/20 px-3 py-1">
                              {x}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-micro mb-2 uppercase tracking-[0.04em] text-charcoal/70">Tonight</dt>
                      <dd>
                        {d.stay}
                        {stay && <span className="block text-charcoal/70">{comfortLabels[stay.comfort].label}</span>}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-micro mb-2 uppercase tracking-[0.04em] text-charcoal/70">Meals</dt>
                      <dd>{d.meals.length ? d.meals.map((m) => mealNames[m]).join(", ") : "Own arrangements"}</dd>
                    </div>
                  </dl>
                </div>
              ),
            };
          })}
        />
      </section>

      {/* Route map */}
      <section id="route" data-theme="light" className="gutter py-20 md:py-[8vw]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <DisplayHeading text="The *route*" />
            <p className="text-body-lg mt-8 max-w-[30ch] text-charcoal/75">
              Distances in Mongolia are big and roads are often tracks. Expect some long days in the 4x4, broken up by
              stops with herders, picnics and leg-stretching walks.
            </p>
          </div>
          <MongoliaMap route={a.route} label={`Route map for ${a.title}`} />
        </div>
      </section>

      {/* Stays */}
      {stays.length > 0 && (
        <section id="stays" data-theme="light" className="gutter pb-20 md:pb-[8vw]">
          <div className="mb-12 md:mb-16">
            <DisplayHeading text="Where you'll *sleep*" />
            <p className="mt-6 max-w-[48ch] text-[16px] text-charcoal/70 md:text-[18px]">
              A mix of family gers, small ger camps and a city hotel. Camp names are placeholders until our partner
              agreements are signed.
            </p>
          </div>
          <ExpandCards
            layout={stays.length >= 3 ? "podium" : "stack"}
            cards={stays.slice(0, 3).map((s) => ({
              id: s.slug,
              eyebrow: comfortLabels[s.comfort].label,
              title: s.name,
              body: `${s.description} ${s.facilities.slice(0, 3).join(" · ")}.`,
              image: s.image,
            }))}
          />
        </section>
      )}

      {/* Included */}
      <section data-theme="dark" className="gutter bg-charcoal py-20 text-offwhite md:py-[8vw]">
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-h2 mb-8">What&apos;s included</h2>
            <ul className="flex flex-col gap-4">
              {a.included.map((x) => (
                <li key={x} className="flex gap-4 text-[17px] leading-snug md:text-[19px]">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-steppe text-offwhite">
                    <Check className="size-3.5" />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h2 mb-8">Not included</h2>
            <ul className="flex flex-col gap-4">
              {a.notIncluded.map((x) => (
                <li key={x} className="flex gap-4 text-[17px] leading-snug text-offwhite/80 md:text-[19px]">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-offwhite/40">
                    <Close className="size-3" />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <h3 className="mb-5 mt-14 text-[22px] font-medium tracking-[-0.03em]">Good to know</h3>
            <ul className="flex flex-col gap-3 text-[16px] leading-snug text-offwhite/80 md:text-[17px]">
              {a.goodToKnow.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden className="text-gobi">→</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Dates and prices */}
      <section id="dates" data-theme="light" className="gutter py-20 md:py-[8vw]">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <DisplayHeading text="Dates & *prices*" />
          <p className="max-w-[40ch] text-[15px] text-charcoal/70 md:text-[17px]">
            Per person sharing, excluding international flights. Private trips run on any date you choose.
          </p>
        </div>
        <DeparturesTable adventure={a} planHref={planHref} />
      </section>

      {/* Gallery */}
      <section aria-label="Gallery" data-theme="light" className="gutter pb-20 md:pb-[8vw]">
        <ul className="grid grid-cols-2 gap-[10px] md:grid-cols-4 md:gap-[1.95vw]">
          {a.gallery.map((g, i) => (
            <li key={g.src} className={i % 2 ? "md:mt-[6vw]" : ""}>
              <Reveal delay={i * 0.06} className="relative aspect-[4/5] overflow-hidden bg-steppe-tint">
                <Photo image={g} sizes="(min-width: 768px) 23vw, 48vw" />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {quotes.length > 0 && (
        <section data-theme="light" className="gutter bg-sand py-20 md:py-[8vw]">
          <div className="md:pl-[26.5vw]">
            <p className="text-micro mb-10 uppercase tracking-[0.04em] text-felt">Travellers on this route</p>
            <QuoteCycler quotes={quotes} />
          </div>
        </section>
      )}

      {/* Experiences on this trip */}
      <section data-theme="light" className="gutter py-16 md:py-[6vw]">
        <p className="text-micro mb-6 uppercase tracking-[0.04em] text-charcoal/70">Experiences on this adventure</p>
        <ul className="flex flex-wrap gap-2">
          {pick(getExperience, a.experiences).map((e) => (
            <li key={e.slug}>
              <Link href={`/experiences/${e.slug}`} className="inline-flex h-11 items-center rounded-blob-pill border border-charcoal/25 px-5 text-[16px] transition-colors hover:border-charcoal hover:bg-charcoal hover:text-offwhite">
                {e.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section data-theme="light" className="bg-sand pb-16 pt-14 md:pb-[4vw] md:pt-[6vw]">
        <div className="gutter">
          <DisplayHeading text="You might *also* like" />
        </div>
        <div className="mt-10 md:mt-[5vw]">
          <JoinCarousel label="Related adventures" cards={related.map(adventureCard)} />
        </div>
      </section>

      <CtaBand href={planHref} button="Enquire about this adventure" />
    </>
  );
}

function DeparturesTable({ adventure: a, planHref }: { adventure: Adventure; planHref: string }) {
  const status = { open: "Available", limited: "Limited spaces", full: "Full" } as const;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">Departure dates and prices for {a.title}</caption>
        <thead>
          <tr className="text-micro uppercase tracking-[0.04em] text-charcoal/70">
            <th scope="col" className="pb-4 font-medium">Dates</th>
            <th scope="col" className="pb-4 font-medium">Style</th>
            <th scope="col" className="pb-4 font-medium">Availability</th>
            <th scope="col" className="pb-4 text-right font-medium">Per person</th>
            <th scope="col" className="pb-4"><span className="sr-only">Enquire</span></th>
          </tr>
        </thead>
        <tbody>
          {a.departures.map((d) => (
            <tr key={`${d.start}-${d.style}-${d.priceUSD}`} className="border-t border-charcoal/15 align-top">
              <td className="py-5 pr-6">
                <span className="text-[19px] font-medium tracking-[-0.02em] md:text-[22px]">
                  {fmtDate(d.start, false)} – {fmtDate(d.end)}
                </span>
                {d.note && <span className="mt-1 block max-w-[40ch] text-[14px] text-charcoal/70">{d.note}</span>}
              </td>
              <td className="py-5 pr-6 text-[16px]">{styleLabels[d.style]}</td>
              <td className="py-5 pr-6">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[13px] font-medium ${
                    d.status === "open" ? "bg-steppe-tint text-steppe-deep" : d.status === "limited" ? "bg-gobi-tint text-charcoal" : "bg-charcoal/10 text-charcoal/70"
                  }`}
                >
                  {status[d.status]}
                </span>
              </td>
              <td className="py-5 pr-6 text-right">
                <Price usd={d.priceUSD} className="text-[20px] font-medium tracking-[-0.03em] md:text-[24px]" />
              </td>
              <td className="py-5 text-right">
                {d.status !== "full" && (
                  <ArrowLink href={`${planHref}&departure=${d.start}`} arrowClassName="text-felt" className="whitespace-nowrap text-[16px] md:text-[17px]">
                    Enquire
                  </ArrowLink>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
