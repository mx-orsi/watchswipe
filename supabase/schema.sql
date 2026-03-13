-- WatchSwipe Supabase schema

create table if not exists public.watches (
  id text primary key,
  brand text not null,
  model text not null,
  base_price numeric not null,
  case_size text not null,
  movement text not null,
  water_resistance text not null,
  category text not null,
  description text not null,
  brand_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.watch_variants (
  id text primary key,
  watch_id text not null references public.watches(id) on delete cascade,
  color_name text not null,
  image_url text not null,
  hex_color text not null,
  price_override numeric null,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_watches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  watch_id text not null references public.watches(id) on delete cascade,
  watch_variant_id text not null references public.watch_variants(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists idx_watch_variants_watch_id
  on public.watch_variants (watch_id);

create index if not exists idx_saved_watches_user_id
  on public.saved_watches (user_id);

create index if not exists idx_saved_watches_watch_ids
  on public.saved_watches (watch_id, watch_variant_id);

