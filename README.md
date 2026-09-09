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
| `src/app/start/page.tsx` | Project entry point. Phase 1 placeholder; the qualification form mounts here in Phase 2. |
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

Optional env: `SITE_URL` (used for canonical/OG URLs; defaults to https://foundhouse.tech).

## Roadmap

1. ✅ Replicate current site, CTAs → `/start`
2. Qualification form on `/start` → tier → booking page (see Notion Team HQ › Integrations & scripts)
3. Booking pages per team member
