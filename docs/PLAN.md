# Steppe & Sky: reference map and build plan

Status: **draft for approval**. No site code has been written yet.

Reference studied: `https://localadventure.mammut.com/en/adventure`. I rendered it in headless Chromium at 1440×900 (desktop) and 390×844 (mobile), captured full-page screenshots, the rendered DOM, computed styles for every visible element, and click and hover states.

---

## 0. Read this first: what the reference actually is

The reference is a **single-page 2020 campaign microsite**, the "Local Adventure Challenge". It is not a travel catalogue. I checked every link it contains:

| Link on the reference | What it is |
|---|---|
| `/en/adventure`, `#inspiration`, `#join`, `#prizes` | The one page and its three anchors |
| `/de-DE/…`, `/fr-FR/…` | The same page in other languages |
| `/en/@erikhedenfalk` | The **same page**, deep-linked to open one story overlay |
| Everything else | Off-site: Instagram, Strava, FATMAP, Google Maps, a T&C PDF, the parent brand's privacy policy |

So the reference has **no** adventure listing, filters, map, detail page, guide page or location page. The brief expects those templates to come from the reference, but they don't exist there.

**What I propose:** the homepage becomes a close, section-by-section twin of the reference. Every other page is built only from the reference's own components and design language: giant tight grotesk type, italic emphasis words, staggered numbered image tiles, full-screen story overlays, the grey horizontal carousel, expandable image cards, the blob-shaped nav indicator, the red blob buttons and the arrow links. Where the brief needs something the reference never had (filters, itinerary, map, planner form), I'll design it in that same language and flag it as "extended". If you have a different reference for the listing and detail pages, send screenshots and I'll follow those instead.

**Access limits:** the reference's images and video are hosted on `images/videos.ctfassets.net`, which this environment's network policy blocks. So I saw the layout, type, colour and boxes, but most image areas rendered as grey gradients. Layout, proportions and interactions are captured. Actual photo content is not, and we're replacing it with Mongolia imagery anyway. Unsplash, npm and Google Fonts are all reachable.

---

## 1. Reference design tokens (measured)

| Token | Desktop 1440 | Mobile 390 |
|---|---|---|
| Font | Helvetica Now Text (licensed, **not** to be loaded) | same |
| Weights used | 500 (headings, nav, labels), 400 (body, lead, links) | same |
| Letter-spacing | −0.04em on everything (e.g. 100px → −4px) | same |
| Line-height | 0.85 (hero), 0.99 (headings), 1.1 (body copy) | same |
| Hero display | 185px / 157px LH, uppercase, 500 | 86px / 73px |
| Section heading (H2) | 100px / 99px, 500, centred, one word in *italic* | 36px |
| Card title | 50px / 49.5px, 500, white | 20px (tiles), 28px (carousel) |
| Hero lead | 30px / 29.7px, 400 | 21px / 23px |
| Overlay story text | 100px / 99px, 500, white, key phrase italic | 35px |
| Prize body | 25px / 27.5px, 400 | 21px / 23px |
| Arrow link | 22–23px, 400, with "→" glyph | 16px |
| Nav | 15px, 500, uppercase, −0.3px | 13px |
| Index number ("01") | ~13.5px, 500 | same |
| Micro stat ("328,657 are…") | 16px, 500 | 12px |
| Page gutter | 57px (≈4vw) | 15px |
| Colours | Black `#000`, White `#fff`, Brand red `rgb(226,0,26)`, Signal orange `rgb(252,77,3)`, Panel grey `#ececec`, Tile grey `#ccc` | same |
| Motion | `transition-duration: .8s` (30 uses), `.725s` with `.075s` stagger (12 uses); slow, smooth ease-out | same |

---

## 2. Reference page map: section by section

### R0. Intro video overlay (full screen, first visit)
- Layout: fixed, 100vw×100vh, black, `<video>` cover-fit and autoplaying muted.
- UI: "Click to skip" centred at ~47% height (18px, 500, white) with a 35px white underline bar that works as a **progress bar**. Mute toggle icon bottom-left (24px, 15px inset).
- Interaction: click anywhere to skip, and it fades out over .8s to reveal the hero. A deep link (`/@handle`) also passes through it.

### R1. Header (fixed, overlays everything)
- Logo: circular red mark, 55px, top-left at 28/14px (38px at 15/15 on mobile).
- Nav: 3 uppercase items centred at the top (desktop), 15px/500, white on dark and black on light. ~50px gaps.
- **Active indicator:** a black, organic, slightly rotated **blob tab** hanging from the top edge behind the active item. It **morphs and slides** between items as you scroll-spy through sections (.8s). On a light background the active label turns white inside the black blob.
- Over light sections a thin black bar sits at the top of the viewport.
- Language switcher: flag icon top-right (24×15). Clicking slides out a row of 161px-wide tiles from the right.
- **Mobile:** the nav moves to a **fixed bottom bar** (44px, three items spread out) and the blob indicator rises from the bottom edge. Logo and switcher stay on top.

### R2. Hero (`#top`, 100vh, black)
- Giant two-line uppercase wordmark, 185px, line 1 indented ~180px and line 2 flush ~64px (a staggered left edge). On mobile it breaks mid-word ("ADVENT / URE").
- Behind and through the type: **3 layered parallax PNG cut-outs** (landscape layers), moving at different speeds on scroll and pointer.
- Bottom-right column (starting at 59% of width, 432px wide): the lead paragraph at 30px, then the "→ Share your adventure" arrow link 50px below.
- Centred near the bottom: a **red blob button** (60×56, irregular rounded shape) with a white ↓ arrow that scrolls to the next section.
- Load animation: the type and lead fade and rise in once the intro closes.

### R3. "Adventures to get you inspired" (`#inspiration`, white)
- H2 centred, 100px, two lines, first word italic, ~140px top padding.
- **Staggered two-column tile mosaic**, 8 tiles:
  - Left column at x≈57–705, right column at x≈733–1380. Tiles have varied widths (650px / 455px / 650px) and heights, and the columns are vertically offset (the right column drops ~110px), giving a broken-grid rhythm. Odd numbers sit on the left, even on the right.
  - Each tile: a full-bleed image, a bottom **gradient scrim** (transparent → grey/black), a small index "01" baseline-aligned to a 50px white title in the bottom-left (30px inset), with a 28px gap between tiles.
  - Hover: the image scales slightly (≈1.05) and the scrim deepens (.8s).
  - Scroll: tiles fade and translate up as they enter, with a slight parallax between columns.
- **Click opens a full-screen story overlay:** a full-bleed image or video background, the handle at top-left (13.5px), the story set at 100px (35px on mobile) in white with a key phrase in *italic*, in a 979px column on the right, ending in "→ Share your adventure" (22px). The URL changes to `/@handle`. Esc or close returns you, and the overlay scrolls internally.

### R4. "Now it's your turn" (`#join`, panel grey `#ececec`)
- H2 left-aligned at the gutter, 100px, one italic word.
- **Horizontal carousel** of 6 tall cards. The cards are 489px wide, alternating **652px tall (top-aligned)** and **528px tall (dropped 124px)**, with 29px gaps. The first card is **signal orange** and the rest are grey tiles with images.
- Card: a 50px title top-left with its first verb in *italic*, ending with an ellipsis ("*Join* our challenge…"), and a micro stat at the bottom-left (16px).
- Navigation: a **red circular button with →** sits fixed at the right edge, vertically centred, and advances the track. Drag or swipe and the trackpad also scroll it.
- Hover: the card image zooms slightly.

### R5. "… and *win* one of the following" (`#prizes`, white)
- H2 centred, 100px.
- **3 expandable full-width image cards**, staggered: card 1 centred (title at x≈518), card 2 left (x≈28), card 3 right (x≈1007). Each has a small eyebrow ("Grand prize", "Second prize"…) and a 50px white title over the image.
- Click expands the card in place to show 25px body copy in an 864px column (.8s height/opacity). The expanded state pushes the next card down.

### R6. Footer (white, minimal)
- One row 43px tall: "→ Terms & Conditions", "→ Data Protection Policy" (18px, red arrows) on the left, and "In collaboration with" + partner logo on the right. On mobile the links stack.

---

## 3. Steppe & Sky: homepage mapped into the reference

| Ref | Steppe & Sky section | Content |
|---|---|---|
| R0 | **Intro reel** (first visit per session; respects `prefers-reduced-motion`) | No licensed video is available yet, so I'll build a slow-cross-fading 4-image Ken Burns reel (steppe at dawn, Gobi dunes, Altai, a ger under stars) with the same "Click to skip" progress bar and mute icon. It accepts an `.mp4` later from `/config`. |
| R1 | **Header** | Text logo "Steppe & Sky" in a felt-red circle/blob mark. Nav: Adventures · Regions · Experiences · Festivals · When to go · About · Journal · Contact (8 items, so on desktop I'll use the same centred uppercase style, with the blob indicator showing the current *page*). Top-right: the currency switcher (USD/EUR/GBP/AUD/MNT) uses the reference's slide-out tile row in place of the flag switcher, plus a red-blob "Plan my adventure" button. Mobile: the same fixed bottom bar with 4 items (Adventures, Regions, Festivals, Menu), and Menu opens a full-screen sheet with the rest. |
| R2 | **Hero** | Giant "NOTHING BETWEEN / YOU AND THE SKY" in the staggered two-line setting (or "STEPPE / & SKY" if the tagline is too long at 185px; I'll test both). Parallax layers are 3 Mongolia images (sky, mountain ridge, foreground steppe/rider), done with Framer Motion `useScroll`. Lead: "Real Mongolia, done properly. Small-group and private adventures across the steppe, the Gobi and the Altai, planned by one dedicated specialist and led by local guides." Arrow link: "→ Plan my adventure". Red blob ↓. |
| R3 | **"*Adventures* under the eternal blue sky"**: 8 staggered numbered tiles | 01 Classic Mongolia · 02 Horse trekking in the Orkhon · 03 Khövsgöl & reindeer herders · 04 Golden Eagle Festival · 05 Naadam journey · 06 Gobi camel trek · 07 Altai trek · 08 Winter & Tsagaan Sar. Click opens the **story overlay**: a full-bleed image, the region at top-left, a short 100px-set evocative paragraph with one italic phrase, and then (extended) a compact meta line: days · difficulty · season · **From $X pp**, "→ See the itinerary" and "→ Plan my adventure". Like the reference's `/@handle` deep link, the overlay updates the URL shallowly (`?story=slug`), and the full page lives at `/adventures/[slug]`. "→ All adventures" link under the mosaic. |
| R4 | **"Now it's *your* trip"**: the grey carousel, 6 cards | 1 (felt red, replacing orange) "*Plan* your adventure in five steps…" (micro: "One specialist, from first message to flight home"). 2 "*Stay* with nomad families…" (Experiences). 3 "*Time* it with Naadam or the eagles…" (Festivals). 4 "*Choose* your region…" (micro: "6 regions"). 5 "*Travel* lightly on the steppe…" (Responsible travel). 6 "*Pack* for four seasons in a day…" (What to pack; this replaces the reference's product/gear card). |
| R5 | **"… and *meet* the people who make it"** (replaces prizes): 3 expandable image cards | Card 1 "Your specialist": one person plans everything. Card 2 "Local guides": placeholder guide profiles (from `/data/people`). Card 3 "Herder families & ger camps": how stays work, placeholder camp names. Expanding shows 25px body copy plus "→ About us". |
| (extended) | **Testimonials strip** | Reuses the R3 overlay type style: one big 100px quote at a time, cycling, marked "Placeholder testimonial". It sits between R5 and the footer. If you want a strict twin with no extra sections, I'll move it to `/testimonials` only. |
| R6 | **Footer** | Same minimal row style, extended to 2 rows. Row 1: the 8 nav links + Responsible travel, What to pack, FAQ, Testimonials as "→" arrow links. Row 2: contact email, phone and WhatsApp, the tagline, "© Steppe & Sky", Privacy and Terms (placeholder). "In collaboration with" becomes "Planned with local families across Mongolia" (no named partners). |
| (global) | **Floating WhatsApp** | A felt-red blob button bottom-right (above the mobile bottom bar) linking to `wa.me/[NUMBER]` from `/config`. |

---

## 4. Other pages: templates derived from the reference

Every page shares the header, footer, WhatsApp button, gutters, type scale and .8s motion. **Extended** marks elements the reference doesn't have.

| Page | Section order |
|---|---|
| `/adventures` | (1) Compact black hero: 100px "*All* adventures" plus a lead paragraph (R2 at reduced height). (2) **Filter bar (extended)**: 6 uppercase filter triggers styled like the nav (Region, Activity, Duration, Difficulty, Season, Group/Private). Clicking one slides out a tile row like R1's switcher, with multi-select chips. The active filter count sits in a black blob. "Clear" is an arrow link. Filters sync to the URL query. (3) Result count, sort (price/duration). (4) Results in the **R3 staggered mosaic**: each tile shows index, title and a tag row (region · activity · days · difficulty · season), with "From $X pp" in the currency you've picked. Filtering animates with Framer `layout`. (5) R4-style grey carousel "Can't decide?", which links to the planner. |
| `/adventures/[slug]` | (1) R2 hero: giant title, lead, parallax image, red ↓. (2) **Key facts row (extended)**: region, days, difficulty, season, group/private, "From $X", "→ Plan my adventure". (3) Highlights in R3 type style (big 50px lines with numbers). (4) **Day-by-day (extended)**: numbered rows that expand like R5 cards. Each row shows the day number, title, drive or ride time, activities, **accommodation that night** and meals. (5) **Route map placeholder (extended)**: a stylised SVG outline of Mongolia with the route polyline and numbered stops, plus a "Map placeholder" label. (6) What's included / not included (guide, driver, 4x4, meals, ger stays, internal flights). (7) Dates & pricing table (departure dates, group or private price per person, converted). (8) R5-style expandable stay cards (placeholder ger camps). (9) Related adventures in the R4 grey carousel. (10) Enquire CTA: a big 100px "*Ready* when you are" with a red blob button that opens the planner modal. |
| `/regions` | Hero, an SVG regions map (extended; tap a region and the tile list highlights it), then 6 regions in the R3 mosaic. |
| `/regions/[slug]` | R2 hero, R3 overlay-style intro paragraph (big type), highlights (places) as R5 expandable cards, best months strip, adventures in this region (R4 carousel), and experiences found here. |
| `/experiences` | Hero, then 10 experiences in the R3 mosaic, with a click overlay (R3 story) and "→ Read more". |
| `/experiences/[slug]` | R2 hero, big-type story, "what it's like" / etiquette notes, where & when, linked adventures (R4 carousel). |
| `/festivals` | Hero, then 5 festivals as R5 expandable image cards (eyebrow = dates + "verify yearly" note). Each expands to a description and linked adventures. Ends with an R4 carousel of festival trips. |
| `/when-to-go` | Hero, then a **12-month strip (extended)**: horizontal R4-style carousel, one card per month with temperature, conditions, rating, festivals and recommended regions. Then a "seasons" summary in big type. |
| `/responsible-travel` | Hero, then 4 principles as R3 numbered big-type blocks (respecting nomad families, ger etiquette, leave no trace, supporting communities), and an etiquette do/don't list. |
| `/what-to-pack` | Hero, then gear categories (layers, footwear, sleep, riding, sun & dust, electronics, health, documents) as the R4 grey carousel, each expanding to a checklist. Season toggle (Summer/Winter). Generic categories only, no products. |
| `/about` | Hero, brand story in big overlay type, R5 cards (specialist, guides, families), placeholder people grid, and values. |
| `/testimonials` | Hero, then big quote slides (R3 overlay style) and a grid. All marked **placeholder**. |
| `/faq` | Hero, then 14 FAQs as R5-style expandable rows grouped by topic. Visa answers carry a "Verify against official sources" badge. JSON-LD `FAQPage`. |
| `/contact` | Hero, contact details as large arrow links (email, WhatsApp, phone), a short form, and "→ Or use the planner". |
| `/journal` | Hero, then posts in the R3 mosaic (title, date, reading time). |
| `/journal/[slug]` | R2 hero with title, then MDX body at 25px/1.1 (R5 body style) in an 864px column, then related adventures. |
| `/plan-my-adventure` (+ modal) | Full-screen like the R0/R3 overlay: black background, white type. **Progress indicator** is the 5 steps as nav-style labels with the moving blob under the current step plus the R0 progress bar. Region and activity steps use R3 image tiles as multi-select cards (checked = red ring and tick). Validation (zod) per step, localStorage autosave, a confirmation screen ("*Thank you*" in 100px), and POST to `/api/enquiry`. The modal opens from any "Plan my adventure" button through an intercepting route `@modal/(.)plan-my-adventure`, so the URL is shareable. |

---

## 5. Steppe & Sky palette (applied where the reference uses its colours)

| Role in reference | Reference colour | Steppe & Sky |
|---|---|---|
| Hero / overlay background | Black | **Charcoal** `#1C1D1F` |
| Page background | White | **Off-white** `#F7F4EE` |
| Brand mark, blob buttons, carousel arrow, footer arrows | Brand red | **Felt red** `#B3261E` |
| Feature card (first carousel card) | Signal orange | **Gobi gold** `#D9A441` (or felt red; I'll test both) |
| Join panel background | Grey `#ececec` | **Sand tint** `#EFE7DA` |
| Placeholder tile tone | `#ccc` | **Steppe green** `#5E7A45` at low tint |
| Links, focus rings, active filter | (none in reference) | **Eternal sky blue** `#2F6FB5` (sparingly, for accessibility states) |
| Ornament accent | (none in reference) | A thin *ulzii* (endless knot) inspired line motif in Gobi gold, used only as a divider in the footer and planner confirmation. Abstracted, not a reproduction of sacred symbols. |

I'll check every text/background pair for WCAG AA.

**Fonts (Google, via `next/font`):** **Inter Tight** 400/500 + italics, the closest free match to Helvetica Now's tight neo-grotesk proportions, set with the reference's −0.04em tracking. No reference font files are loaded.

---

## 6. Folder structure

```
/config/site.ts            brand, palette names, tagline, nav, currencies + rates, contact, WhatsApp, intro media
/data/
  types.ts                 all content types (below)
  regions.ts  adventures.ts  experiences.ts  festivals.ts  stays.ts
  people.ts  testimonials.ts  faqs.ts  months.ts  packing.ts  posts.ts (meta)
/content/journal/*.mdx     4 starter posts
/app/
  layout.tsx               fonts, metadata base, header, footer, WhatsApp, CurrencyProvider, @modal slot
  page.tsx                 homepage
  adventures/page.tsx      adventures/[slug]/page.tsx
  regions/…  experiences/…  festivals/  when-to-go/  responsible-travel/  what-to-pack/
  about/  testimonials/  faq/  contact/  journal/  journal/[slug]/
  plan-my-adventure/page.tsx
  @modal/(.)plan-my-adventure/page.tsx   @modal/default.tsx
  api/enquiry/route.ts     logs payload, TODO email/CRM
  sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx
/components/
  layout/   Header, BlobIndicator, MobileBar, MenuSheet, CurrencySwitcher, Footer, WhatsAppButton, IntroReel
  ui/       BlobButton, ArrowLink, DisplayHeading (italic-word support), Price, Tag, Reveal, Parallax, Container
  sections/ Hero, StoryMosaic + StoryTile + StoryOverlay, JoinCarousel + CarouselCard,
            ExpandCards, QuoteCycler, FactsRow, Itinerary, RouteMap, IncludedList, PricingTable,
            MonthStrip, RegionMap, FilterBar
  planner/  Planner, StepWhen, StepWhere, StepStyle, StepWho, StepContact, Progress, Confirmation, schema.ts
/lib/       currency.ts, filters.ts, mdx.ts, seo.ts, cn.ts
/public/images/   local fallbacks
```

## 7. Data types (summary)

```ts
type Currency = 'USD'|'EUR'|'GBP'|'AUD'|'MNT';
type Difficulty = 'easy'|'moderate'|'challenging'|'expedition';
type Season = 'spring'|'summer'|'autumn'|'winter';
type Activity = 'overland'|'horse-riding'|'camel-trekking'|'hiking'|'eagle-hunting'|'festival'|'culture'|'photography'|'family'|'wildlife';
type TripStyle = 'group'|'private';
type ComfortLevel = 'traditional'|'comfortable'|'luxury';
interface Img { src: string; alt: string; credit?: string; ratio?: '4/5'|'3/4'|'16/9'|'1/1' }

interface Region { slug; name; tagline; summary; story; hero: Img; places: {name; description; image: Img}[];
  bestMonths: number[]; highlights: string[]; mapPosition: {x:number;y:number}; seo }
interface Adventure { slug; title; regionSlugs: string[]; activities: Activity[]; days: number;
  difficulty: Difficulty; seasons: Season[]; styles: TripStyle[]; priceFromUSD: number;
  highlights: string[]; story: string; storyEmphasis: string; hero: Img; gallery: Img[];
  itinerary: ItineraryDay[]; included: string[]; notIncluded: string[];
  departures: {start: string; end: string; style: TripStyle; priceUSD: number; status: 'open'|'limited'|'full'}[];
  route: {x:number;y:number;label:string}[]; festivalSlug?: string; seo }
interface ItineraryDay { day: number; title; description; driveHours?: number; activities: string[];
  staySlug?: string; stayLabel: string; meals: ('B'|'L'|'D')[] }
interface Experience { slug; title; summary; story; regionSlugs; months: number[]; etiquette?: string[]; hero: Img; adventureSlugs }
interface Festival { slug; name; when: string; typicalDates: string; verifyYearly: true; location; summary; highlights; hero: Img; adventureSlugs }
interface Stay { slug; name /* placeholder */; placeholder: true; regionSlug; comfort: ComfortLevel; description; image: Img }
interface Person { slug; name /* placeholder */; placeholder: true; role: 'specialist'|'guide'|'driver'; bio; languages: string[]; image: Img }
interface Testimonial { id; quote; name; country; adventureSlug; placeholder: true }
interface Faq { id; topic; question; answer; verify?: 'official-sources' }
interface Month { month: number; name; tempDayC: [number, number]; conditions; rating: 1|2|3|4|5; festivals: string[]; regions: string[] }
interface PackingCategory { slug; title; seasons: Season[]; items: string[] }
interface PostMeta { slug; title; excerpt; date; readingMinutes; hero: Img; tags }
```

Currency: prices are stored in USD. `/config` holds static rates (marked "update regularly") and `<Price usd={…}/>` formats them with `Intl.NumberFormat`. The choice is kept in localStorage and a cookie.

## 8. Libraries
Next.js 15 (App Router, RSC) · TypeScript · Tailwind CSS 4 · Framer Motion · `@next/mdx` + `gray-matter` · `zod` + `react-hook-form` (planner) · `clsx`. Images from Unsplash via `next/image` `remotePatterns`, with local fallbacks.

## 9. Build phases & checks
1. Tokens, fonts, header (blob indicator, currency switcher, mobile bottom bar), footer, WhatsApp, layout.
2. Homepage (R0–R6 twin) + `/adventures` with filters. Side-by-side Playwright screenshots against the reference at 1440 and 390.
3. Planner page + modal + API route.
4. Detail pages, regions, experiences, festivals, when to go, responsible travel, what to pack, about, testimonials, FAQ, contact, journal (MDX).
5. Polish: reduced motion, keyboard and focus, aria, metadata/OG/sitemap/JSON-LD, Lighthouse (mobile) ≥ 90 across the board.

Each phase: `next build` clean, the dev server run, screenshots reviewed, then commit and push to `claude/nice-ride-9ijvzd`.
