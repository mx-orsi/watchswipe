# WatchSwipe

WatchSwipe is a **visual discovery MVP** for microbrand watches. Users swipe through a curated catalog, open watch detail pages, and save color variants into a personal collection. The UI is mobile-first, dark-mode, and wrapped in a centered “phone” frame.

## Quick start

```bash
npm install
cp .env.example .env.local   # add Supabase URL + anon key if you use remote saves
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build: `npm run build` · Start prod: `npm run start` · Lint: `npm run lint`  
If build fails with cache issues: `npm run clean && npm run build` (or `npm run build:clean`).

## Project structure

| Area | Location | Purpose |
|------|----------|--------|
| **Catalog data** | `lib/data/seedWatches.ts` | Curated watch + variant list (powers swipe stack and detail). Mirror changes in `supabase/seed.sql` if you use Supabase. |
| **Auth** | `lib/auth/demoAuth.tsx`, `lib/auth/index.ts` | **Demo auth** — in-memory user only; no real Supabase Auth session. Replace when wiring production auth. |
| **Client state** | `lib/store/watchStore.ts` | Zustand store: swipe position, saved items, counters; persisted under `watchswipe_watch_state_v1`. |
| **Supabase** | `lib/supabase/client.ts`, `savedWatches.ts`, `SupabaseProvider.tsx` | Client singleton + `saved_watches` CRUD. Used when persisting saves remotely (detail page calls both store + Supabase). |
| **Analytics** | `lib/analytics/track.ts` | `trackEvent` + dev buffer when `NEXT_PUBLIC_TEST_MODE=true`. |
| **Persistence keys** | `lib/storage/keys.ts` | Single list of `localStorage` key names. |
| **App shell / nav** | `components/MobileAppShell.tsx`, `BottomNav.tsx` | Layout + bottom nav. |
| **Pages** | `app/` | App Router: `/`, `/discover`, `/watch/[id]`, `/collection`, `/profile`. |

## Tech stack

- Next.js 14 (App Router, TypeScript)
- React 18, Tailwind CSS, Framer Motion
- Zustand (client state)
- Supabase JS (optional — `saved_watches` when configured)
- react-hot-toast

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | For remote saves | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For remote saves | Supabase anon key |
| `NEXT_PUBLIC_TEST_MODE` | No | Set to `true` to enable DevPanel + analytics buffer (dev only) |

Without Supabase env, the app still runs; the client uses placeholders and console warns once.

## Core features

- **Home** — Landing, watch of the day, featured brands.
- **Discover** — Swipe stack, color selector, Pass / Save / Like.
- **Watch detail** — Gallery, specs, Save to Collection, brand link.
- **Collection** — Grid of saved watch+variant pairs.
- **Profile** — Account placeholder, feedback modal, logout (demo).

## Data model (Supabase)

See `supabase/schema.sql` — tables include `watches`, `watch_variants`, `saved_watches`. Seed data: `supabase/seed.sql`.

## What’s demo vs production-ready

| Aspect | Status |
|--------|--------|
| Swipe + catalog UI | Production-style |
| **Auth** | **Demo only** — no Supabase Auth; single demo user concept |
| **Discover Save** | Local store only — does not call `saveWatchForUser` |
| **Detail Save** | Store + Supabase insert when configured |
| **Catalog** | Static `seedWatches` — not loaded from DB at runtime |

## Known limitations / tech debt

- **Demo auth** — Replace with Supabase Auth and session hydration so `user_id` matches `auth.users`.
- **Split save flow** — Discover vs detail page handle persistence differently; unify once auth is real.
- **Catalog** — Single TS source + SQL seed; eventual DB-backed catalog would remove duplication.
- **DevPanel** — Not mounted in the shell by default (avoids runtime crashes if the analytics buffer has unexpected shape). With `NEXT_PUBLIC_TEST_MODE=true`, import `<DevPanel />` on a page when you want dev tools. `DiscoverOnboarding` remains opt-in.

## Replacing the catalog

1. Edit `lib/data/seedWatches.ts`.
2. Mirror structure in `supabase/seed.sql` if you rely on Supabase.
3. Re-run seed in Supabase SQL editor when IDs or rows change.

## Vercel deployment

1. Repo on GitHub → Vercel project.
2. Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Apply `schema.sql` + `seed.sql` in Supabase.
4. Deploy (Vercel runs `next build`).

## Troubleshooting

**Build fails with `Cannot find module for page: /_document`**  
Clear cache: `npm run clean` then `npm run build`.
