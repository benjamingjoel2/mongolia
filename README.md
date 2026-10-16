# Steppe & Sky

Marketing site for Steppe & Sky, Mongolia adventure travel. *Nothing between you and the sky.*

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · Framer Motion.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
```

## Where things live

| Path | What |
|---|---|
| `config/site.ts` | Brand name, palette, contact details, WhatsApp number, currencies and rates, navigation |
| `data/` | Typed content (regions, adventures, experiences, festivals, stays, people, testimonials, FAQs, posts) |
| `content/journal/` | Journal posts (MDX) |
| `app/globals.css` | Design tokens: colours, fluid type scale, gutters, motion |
| `components/layout/` | Header, mobile bottom bar and menu, currency switcher, footer, WhatsApp button |
| `components/ui/` | Buttons, arrow links, headings, price, icons |
| `docs/PLAN.md` | Reference map and build plan |

Everything marked `PLACEHOLDER` in `config/site.ts` (email, phone, WhatsApp number, site URL) must be replaced before launch. Currency rates are static and should be updated regularly.
