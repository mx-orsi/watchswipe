# WatchSwipe

WatchSwipe is a visual discovery MVP for microbrand watches. Users can swipe through curated models, view details, and save specific color variants into a personal collection. The experience is mobile-first, dark-mode, and designed to feel like a native app inside a centered “phone” frame.

## Tech stack

- Next.js 14 (App Router, TypeScript)
- React 18
- Tailwind CSS
- Framer Motion
- Supabase (auth + `saved_watches` persistence)
- Zustand (client state)

## Core features

- **Home**: Hero landing with “Start Swiping”, watch of the day, and featured brands.
- **Discover**: Primary swipe interface with drag-to-swipe, color variant selector, and Pass / Save / Love actions.
- **Watch detail**: Large gallery, specs, color selector, Save to Collection, and Visit Brand link.
- **Collection**: “My Collection” grid of saved watch + variant pairs with remove support.
- **Profile**: Shows logged-in email, saved count, and a “watch personality” placeholder.
- **Auth**: Email/password via Supabase Auth, only required when saving/removing watches.

## Pages & navigation

- `/` – Home (landing, CTA to `/discover`)
- `/discover` – Swipe experience
- `/watch/[id]` – Watch detail
- `/collection` – Saved watches
- `/profile` – Profile, logout, and future “personality” section

A fixed bottom nav (`Discover`, `Collection`, `Profile`) keeps navigation accessible on mobile.

## Data model

Supabase tables (see `supabase/schema.sql`):

- `watches`
  - `id` (text, PK)
  - `brand`, `model`
  - `base_price` (numeric)
  - `case_size` (text)
  - `movement` (text)
  - `water_resistance` (text)
  - `category` (text)
  - `description` (text)
  - `brand_url` (text)
  - `created_at` (timestamptz, default now)
- `watch_variants`
  - `id` (text, PK)
  - `watch_id` (FK → `watches.id`)
  - `color_name`, `image_url`, `hex_color`
  - `price_override` (numeric, nullable)
  - `created_at` (timestamptz)
- `saved_watches`
  - `id` (uuid, PK, default `gen_random_uuid()`)
  - `user_id` (uuid, FK → `auth.users.id`)
  - `watch_id` (FK → `watches.id`)
  - `watch_variant_id` (FK → `watch_variants.id`)
  - `created_at` (timestamptz)

The app itself keeps a curated `seedWatches` array in `lib/data/seedWatches.ts` that mirrors the `watches`/`watch_variants` tables and powers the swipe stack.

## Supabase seed data

Seed SQL: `supabase/seed.sql`.

- Inserts 12 microbrand watches (Baltic, Lorier, Traska, Zelos, Nodus, Farer, Serica, Studio Underd0g).
- Each has 2–4 `watch_variants` with `color_name`, `image_url`, and `hex_color`.
- `saved_watches` is intentionally empty; you can add rows for testing if desired.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

These are used by `lib/supabase/client.ts` to create the Supabase client.

## Local setup

```bash
npm install
cp .env.example .env.local   # then set your Supabase values
```

1. **Create Supabase project** in the Supabase dashboard.
2. **Run schema**:
   - In the Supabase SQL editor, paste and run `supabase/schema.sql`.
3. **Run seed**:
   - In the SQL editor, paste and run `supabase/seed.sql`.
4. **Start dev server**:

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Build fails with `Cannot find module for page: /_document`

This is usually a **corrupted `.next` cache**. Clear it and rebuild:

```bash
npm run clean
npm run build
```

Or in one step: `npm run build:clean`. For dev: `npm run dev:clean`.

## Auth behavior

- Browsing and swiping are available to guests.
- When a guest taps **Save** (Discover or Watch Detail) or tries to remove from **Collection**, an `AuthModal` prompts login/sign-up.
- After sign-in, the app:
  - Loads `saved_watches` for the user into the local Zustand store.
  - Keeps subsequent saves/removals in sync with Supabase (`lib/supabase/savedWatches.ts`).

## Vercel deployment

1. Push this repo to GitHub.
2. Create a new Vercel project pointing at the repo.
3. Add environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Make sure your Supabase project has `schema.sql` and `seed.sql` applied.
5. Deploy; Vercel will run `next build` automatically.

## Replacing the watch catalog

- Update `lib/data/seedWatches.ts` with your own brands, models, and variants.
- Mirror those changes into `supabase/seed.sql` so the database stays in sync.
- Re-run the seed file on Supabase if you change IDs or add new rows.

