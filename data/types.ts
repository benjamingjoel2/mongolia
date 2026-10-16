/**
 * Content model for Steppe & Sky. Every page is generated from data typed here, so this
 * file is also the schema to mirror when the content moves to a CMS.
 * All prices are base USD; the currency switcher converts them for display.
 */
import type { Img } from "@/lib/images";

export type { Img };

/* ---------- Shared vocabularies (used by filters and the planner) ---------- */

export type RegionSlug =
  | "ulaanbaatar-terelj"
  | "central-mongolia"
  | "gobi"
  | "north-khovsgol"
  | "far-west-altai"
  | "east-khentii";

export type AdventureSlug =
  | "classic-mongolia-gobi-kharkhorin"
  | "orkhon-valley-horse-trek"
  | "khovsgol-reindeer-herders"
  | "golden-eagle-festival-expedition"
  | "naadam-festival-journey"
  | "gobi-camel-trek-dune-camping"
  | "altai-mountains-trek"
  | "winter-mongolia-tsagaan-sar"
  | "family-nomad-adventure"
  | "photography-expedition";

export type ExperienceSlug =
  | "nomad-family-ger-stay"
  | "horse-riding"
  | "camel-trekking"
  | "eagle-hunting-traditions"
  | "naadam-games"
  | "throat-singing"
  | "dinosaur-fossil-sites"
  | "stargazing"
  | "overland-4x4"
  | "cooking-with-herders";

export type FestivalSlug =
  | "naadam"
  | "golden-eagle-festival"
  | "tsagaan-sar"
  | "khovsgol-ice-festival"
  | "thousand-camel-festival";

export type StaySlug =
  | "terelj-river-camp"
  | "orkhon-valley-camp"
  | "gobi-dunes-camp"
  | "khovsgol-lakeshore-camp"
  | "altai-family-gers"
  | "khentii-steppe-camp";

export type PersonSlug =
  | "specialist-saraa"
  | "guide-bat"
  | "guide-oyuna"
  | "guide-erlan"
  | "driver-ganaa"
  | "guide-tuya";

export type Activity =
  | "overland"
  | "horse-riding"
  | "camel-trekking"
  | "hiking"
  | "eagle-hunting"
  | "festival"
  | "culture"
  | "photography"
  | "family"
  | "wildlife";

export type Difficulty = "easy" | "moderate" | "challenging" | "expedition";
export type Season = "spring" | "summer" | "autumn" | "winter";
export type TripStyle = "group" | "private";
export type ComfortLevel = "traditional" | "comfortable" | "luxury";
/** 1 = January … 12 = December */
export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface Seo {
  title: string;
  description: string;
}

/* ---------- Regions ---------- */

export interface Place {
  name: string;
  description: string;
  image: Img;
}

export interface Region {
  slug: RegionSlug;
  name: string;
  /** Short name for tags and filters, e.g. "The Gobi". */
  shortName: string;
  tagline: string;
  /** One or two sentences for cards. */
  summary: string;
  /** Large-type intro paragraph (story overlay style). Wrap one phrase in *asterisks* for italics. */
  story: string;
  hero: Img;
  gallery: Img[];
  places: Place[];
  bestMonths: MonthNumber[];
  highlights: string[];
  /** Approx. position on the stylised Mongolia map, as % of map width/height. */
  map: { x: number; y: number };
  gettingThere: string;
  seo: Seo;
}

/* ---------- Adventures ---------- */

export type Meal = "B" | "L" | "D";

export interface ItineraryDay {
  /** Day number, or a range label like "4-5" for multi-day blocks. */
  day: string;
  title: string;
  description: string;
  /** Approximate time on the road or trail, e.g. "5 hrs drive" or "4-5 hrs riding". */
  travel?: string;
  activities: string[];
  /** Where you sleep that night: a stay slug when it's one of our camps, plus a readable label. */
  staySlug?: StaySlug;
  stay: string;
  meals: Meal[];
}

export interface Departure {
  /** ISO date YYYY-MM-DD */
  start: string;
  end: string;
  style: TripStyle;
  priceUSD: number;
  status: "open" | "limited" | "full";
  note?: string;
}

export interface RoutePoint {
  label: string;
  /** % of map width/height, same coordinate space as Region.map */
  x: number;
  y: number;
}

export interface Adventure {
  slug: AdventureSlug;
  title: string;
  /** Short tile title for the mosaic, e.g. "Horse trekking in the Orkhon". */
  shortTitle: string;
  /** One line for cards and meta descriptions. */
  summary: string;
  /** Large-type story paragraph for the overlay. Wrap one phrase in *asterisks* for italics. */
  story: string;
  regions: RegionSlug[];
  activities: Activity[];
  days: number;
  difficulty: Difficulty;
  seasons: Season[];
  months: MonthNumber[];
  styles: TripStyle[];
  priceFromUSD: number;
  groupSize?: string;
  highlights: string[];
  hero: Img;
  gallery: Img[];
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
  departures: Departure[];
  route: RoutePoint[];
  festival?: FestivalSlug;
  experiences: ExperienceSlug[];
  /** Notes on fitness, riding or comfort that set expectations honestly. */
  goodToKnow: string[];
  seo: Seo;
}

/* ---------- Experiences ---------- */

export interface Experience {
  slug: ExperienceSlug;
  title: string;
  summary: string;
  story: string;
  /** Body paragraphs for the detail page. */
  body: string[];
  regions: RegionSlug[];
  months: MonthNumber[];
  etiquette?: string[];
  hero: Img;
  gallery: Img[];
  adventures: AdventureSlug[];
  seo: Seo;
}

/* ---------- Festivals ---------- */

export interface Festival {
  slug: FestivalSlug;
  name: string;
  /** Human-friendly timing, e.g. "July, main celebrations usually 11-15 July". */
  when: string;
  /** Dates move each year; every festival must be re-checked annually. */
  verifyYearly: true;
  months: MonthNumber[];
  location: string;
  summary: string;
  story: string;
  body: string[];
  highlights: string[];
  tips: string[];
  hero: Img;
  adventures: AdventureSlug[];
  seo: Seo;
}

/* ---------- Stays (ger camps) ---------- */

export interface Stay {
  slug: StaySlug;
  /** PLACEHOLDER name until partner agreements are signed. Never a real camp's name. */
  name: string;
  placeholder: true;
  region: RegionSlug;
  comfort: ComfortLevel;
  description: string;
  facilities: string[];
  image: Img;
}

/* ---------- People ---------- */

export interface Person {
  slug: PersonSlug;
  /** PLACEHOLDER first name until real team profiles are supplied. */
  name: string;
  placeholder: true;
  role: "specialist" | "guide" | "driver";
  title: string;
  bio: string;
  languages: string[];
  regions: RegionSlug[];
  image: Img;
}

/* ---------- Testimonials ---------- */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  country: string;
  adventure: AdventureSlug;
  /** All seed testimonials are invented placeholders and must be labelled as such. */
  placeholder: true;
}

/* ---------- FAQs ---------- */

export type FaqTopic =
  | "Before you go"
  | "Getting around"
  | "Comfort and food"
  | "Health and safety"
  | "On the road"
  | "Culture"
  | "Booking";

export interface Faq {
  id: string;
  topic: FaqTopic;
  question: string;
  /** Paragraphs */
  answer: string[];
  /** Mark answers that must be checked against official sources before publishing. */
  verify?: "official-sources";
}

/* ---------- When to go ---------- */

export interface MonthGuide {
  month: MonthNumber;
  name: string;
  /** Typical daytime high range in Ulaanbaatar / the central steppe, °C. */
  dayTempC: [number, number];
  /** Typical night low, °C. */
  nightTempC: number;
  conditions: string;
  /** 1 (only for the hardy) to 5 (ideal) for general touring. */
  rating: 1 | 2 | 3 | 4 | 5;
  festivals: FestivalSlug[];
  bestRegions: RegionSlug[];
  image: Img;
}

/* ---------- What to pack ---------- */

export interface PackingCategory {
  slug: string;
  title: string;
  /** Short reason this matters in Mongolia. */
  why: string;
  seasons: Season[];
  items: string[];
  image: Img;
}

/* ---------- Journal ---------- */

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date */
  date: string;
  readingMinutes: number;
  hero: Img;
  tags: string[];
  relatedAdventures: AdventureSlug[];
}
