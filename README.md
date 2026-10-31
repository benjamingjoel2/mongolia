# Steppe & Sky

Marketing site for Steppe & Sky, Mongolia adventure travel. *Nothing between you and the sky.*

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · Framer Motion · MDX.
Layout, section order, type scale and interactions are rebuilt from the reference blueprint mapped in
[`docs/PLAN.md`](docs/PLAN.md).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
```

## Where things live

| Path | What |
|---|---|
| `config/site.ts` | Brand, palette, contact email and business address, currencies and rates, navigation, intro reel |
| `data/` | Typed content: `adventures`, `regions`, `experiences`, `festivals`, `stays`, `faqs`, `legal`, `months`, `packing`, `posts` (reads MDX frontmatter). Schema in `data/types.ts` |
| `content/journal/*.mdx` | Journal posts (frontmatter: title, excerpt, date, readingMinutes, hero image key, tags, relatedAdventures) |
| `lib/images.ts` | Placeholder photography (Unsplash), served through Unsplash's CDN by `lib/imageLoader.ts` |
| `lib/planner.ts` | Planner schema (zod), shared by the form and `POST /api/enquiry` |
| `app/globals.css` | Design tokens: colours, fluid type scale, gutters, motion |
| `components/` | `layout/` (header, mobile bar, currency switcher, footer), `sections/` (hero, mosaic + story overlay, carousel, expand cards, map, accordion…), `planner/`, `ui/`, `i18n/` (language selector, locale-aware `Link`) |
| `app/[locale]/` | Every page, pre-rendered in English, French, German and Spanish |
| `lib/i18n/`, `i18n/` | Translation helpers and the FR/DE/ES dictionaries (see Languages below) |

## Languages

English, French, German and Spanish. English stays at the original URLs (`proxy.ts` rewrites them to the `en` locale segment; `/en/...` redirects to the root), the others live under `/fr/`, `/de/` and `/es/`. Every page is pre-rendered per language; there is no translation library in the browser.

- **Copy** is written in English in the code and data. Server components call `t("English")` from `@/lib/i18n/server`, data goes through `tr(data)` (or the `get…()` helpers in `lib/content.ts`), client components use `useT()` from `@/lib/i18n/client`. Mark copy that is translated later with `msg("…")`.
- **Translations** live in `i18n/{fr,de,es}.json`, keyed by `hashKey(English)` (`lib/i18n/hash.ts`). After changing any copy run `node scripts/i18n-extract.cjs`: it rewrites `i18n/source.json` (every English string, by key) and `i18n/client-keys.json` (the strings client components need; only those reach the browser) and lists missing translations. `--strict` exits non-zero if any are missing.
- **Journal posts** are translated as `content/journal/<slug>.<locale>.mdx` (same frontmatter keys; the English file stays `<slug>.mdx`).
- **SEO**: `<html lang>`, canonical and hreflang alternates (en, fr, de, es, x-default = en) come from `pageMeta()` in `lib/seo.ts`; the sitemap lists every page in all four languages.
- **Selector**: EN · FR · DE · ES in the header (under the wordmark on wide screens) and in the mobile menu. It links to the same page in the other language; there are no automatic redirects by browser language.

## Before launch: placeholders to replace

- **Contact**: create the `steppeandsky@tourground.com` inbox and confirm the business address (Regus Central Tower, Great Chinggis Khaan Square 2, Ulaanbaatar) in `config/site.ts`. The site deliberately shows no phone, WhatsApp, social links, licence numbers, team profiles or testimonials.
- **Legal**: Privacy Policy, Booking Terms and Cookie Policy (`data/legal.ts`, `/privacy`, `/booking-terms`, `/cookies`) are complete; have a lawyer review them.
- **Partners**: ger camp names (`data/stays.ts`) are descriptive stand-ins, not real camps, until partner agreements are signed; the site no longer labels them "placeholder" (see `IMAGES-NEEDED.md`). The hotel in Ulaanbaatar is described as "4-star hotel" until it is chosen.
- **Community projects**: the Responsible travel page no longer promises project details; add named community partnerships there once confirmed.
- **Translations**: FR, DE and ES were written for launch; have a native speaker review them, especially the legal pages. Guides are described as English-speaking in every language (true today); update the copy if French, German or Spanish-speaking guides are added.
- **Dates and rules**: festival dates (`verifyYearly: true`), visa guidance (FAQ marked "verify against official sources"), tipping amounts.
- **Currency rates** in `config/site.ts` are static.
- **Integrations**: `app/api/enquiry/route.ts` and `app/api/contact/route.ts` validate and log submissions; connect email/CRM at the `TODO(integration)` markers.
- **Photography**: Unsplash placeholders; swap the entries in `lib/images.ts`. Set `intro.video` in `config/site.ts` to replace the opening image reel with a film.
- **Maps**: the route and region maps are stylised SVGs (`lib/map.ts`), captioned "not to scale"; swap for a real map provider later.

## Deploy

Hosted on Vercel (project `steppe-and-sky`). Production: <https://steppeandsky.tourground.com>.
Set `NEXT_PUBLIC_SITE_URL` to the production domain (used for canonical URLs, sitemap and Open Graph).
