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
| `config/site.ts` | Brand, palette, contact details, WhatsApp number, currencies and rates, navigation, intro reel |
| `data/` | Typed content: `adventures`, `regions`, `experiences`, `festivals`, `stays`, `people`, `testimonials`, `faqs`, `months`, `packing`, `posts` (reads MDX frontmatter). Schema in `data/types.ts` |
| `content/journal/*.mdx` | Journal posts (frontmatter: title, excerpt, date, readingMinutes, hero image key, tags, relatedAdventures) |
| `lib/images.ts` | Placeholder photography (Unsplash), served through Unsplash's CDN by `lib/imageLoader.ts` |
| `lib/planner.ts` | Planner schema (zod), shared by the form and `POST /api/enquiry` |
| `app/globals.css` | Design tokens: colours, fluid type scale, gutters, motion |
| `components/` | `layout/` (header, mobile bar, currency switcher, footer, WhatsApp), `sections/` (hero, mosaic + story overlay, carousel, expand cards, map, accordion…), `planner/`, `ui/` |

## Before launch: placeholders to replace

- **Contact**: email, phone, WhatsApp number, address and site URL in `config/site.ts`.
- **Partners**: ger camp names (`data/stays.ts`) and team profiles (`data/people.ts`) are placeholders by design.
- **Testimonials** (`data/testimonials.ts`) are invented and labelled as placeholders on the site.
- **Dates and rules**: festival dates (`verifyYearly: true`), visa guidance (FAQ marked "verify against official sources"), tipping amounts and cancellation terms.
- **Currency rates** in `config/site.ts` are static.
- **Integrations**: `app/api/enquiry/route.ts` and `app/api/contact/route.ts` validate and log submissions; connect email/CRM at the `TODO(integration)` markers.
- **Photography**: Unsplash placeholders; swap the entries in `lib/images.ts`. Set `intro.video` in `config/site.ts` to replace the opening image reel with a film.
- **Maps**: the route and region maps are stylised SVG placeholders (`lib/map.ts`).

## Deploy

Hosted on Vercel (project `steppe-and-sky`). Production: <https://steppe-and-sky.vercel.app>.
Set `NEXT_PUBLIC_SITE_URL` to the production domain (used for canonical URLs, sitemap and Open Graph).
