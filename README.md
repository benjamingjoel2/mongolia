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
| `components/` | `layout/` (header, mobile bar, currency switcher, footer), `sections/` (hero, mosaic + story overlay, carousel, expand cards, map, accordion…), `planner/`, `ui/` |

## Before launch: placeholders to replace

- **Contact**: create the `steppeandsky@tourground.com` inbox and confirm the business address (Regus Central Tower, Great Chinggis Khaan Square 2, Ulaanbaatar) in `config/site.ts`. The site deliberately shows no phone, WhatsApp, social links, licence numbers, team profiles or testimonials.
- **Legal**: Privacy Policy, Booking Terms and Cookie Policy (`data/legal.ts`, `/privacy`, `/booking-terms`, `/cookies`) are complete; have a lawyer review them.
- **Partners**: ger camp names (`data/stays.ts`) are placeholders by design (see `IMAGES-NEEDED.md`).
- **Dates and rules**: festival dates (`verifyYearly: true`), visa guidance (FAQ marked "verify against official sources"), tipping amounts.
- **Currency rates** in `config/site.ts` are static.
- **Integrations**: `app/api/enquiry/route.ts` and `app/api/contact/route.ts` validate and log submissions; connect email/CRM at the `TODO(integration)` markers.
- **Photography**: Unsplash placeholders; swap the entries in `lib/images.ts`. Set `intro.video` in `config/site.ts` to replace the opening image reel with a film.
- **Maps**: the route and region maps are stylised SVG placeholders (`lib/map.ts`).

## Deploy

Hosted on Vercel (project `steppe-and-sky`). Production: <https://steppeandsky.tourground.com>.
Set `NEXT_PUBLIC_SITE_URL` to the production domain (used for canonical URLs, sitemap and Open Graph).
