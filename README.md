# Foundhouse site

Marketing site for [foundhouse.tech](https://foundhouse.tech), rebuilt as a Next.js app and deployed on Railway.

## Stack

Next.js (App Router, TypeScript), Tailwind CSS v4, `next/font` for Inter + Manrope. No database, no external services, a single Node process.

## Local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Structure

| Path | What |
| --- | --- |
| `src/lib/site.ts` | `START_URL`, where the project CTAs point. |
| `src/app/page.tsx` | Home page: hero, services, about, why, featured work, closing CTA. |
| `src/app/start/page.tsx` | Qualification form page. `/start/thanks` is the no-booking-URL fallback. |
| `src/app/api/lead/route.ts` | Lead endpoint: validate, write to Notion, return booking redirect. |
| `src/lib/form.ts` | Packages (tiers), service/intention/funding options, validation. |
| `src/components/` | Header, Footer, motion (framer-motion reveals). |
| `public/images/` | Logo, team photos, product screenshots. |

## Deploy (Railway)

`railway.json` sets the build/start commands and a `/` health check. Railway injects `PORT`; `next start` reads it automatically.

```bash
railway login
railway init            # create the project (first time)
railway up              # build + deploy from this folder
railway domain          # get / attach a public URL
```

## Environment variables (Railway → service → Variables)

| Variable | Purpose |
| --- | --- |
| `NOTION_TOKEN` | Internal integration secret; the integration must be connected to the **Leads & Form Submissions** database. Without it, leads still route to booking but are not written to Notion. |
| `BOOKING_URL_TIER1` | Optional override; fullHouse booking page (default baked into `src/app/api/lead/route.ts`). |
| `BOOKING_URL_TIER2` | Optional override; halfHouse booking page (default baked in). |
| `BOOKING_URL_TIER3` | Optional; tinyHouse has no booking page and lands on `/start/thanks?tier=3` (webinars soon + email updates opt-in via `/api/subscribe`). |
| `SITE_URL` | Optional; canonical/OG URLs, defaults to https://foundhouse.tech. |

## Qualification form

`/start` renders `QualificationForm`; submit POSTs to `/api/lead`, which validates, writes the lead to Notion (Package = tier, Services, Project intention, Funding situation, links, description, about), and returns the booking URL for the tier. Package definitions live in `src/lib/form.ts`.

## Roadmap

1. ✅ Replicate current site, CTAs → `/start`
2. ✅ Qualification form on `/start` → tier → booking page
3. ✅ Booking pages: tier 1 and 2 go to Google booking pages; tier 3 gets the webinar notice + email updates
