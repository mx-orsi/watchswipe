import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const SUPABASE_CONFIGURED =
  Boolean(supabaseUrl?.trim()) && Boolean(supabaseAnonKey?.trim());

// Placeholders so build/SSR doesn't throw when env is missing. Real requests will fail until .env is set.
const url = supabaseUrl?.trim() || "https://placeholder.supabase.co";
const key = supabaseAnonKey?.trim() || "placeholder-anon-key";

if (!SUPABASE_CONFIGURED) {
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars are not set. Auth and persistence will not work until they are configured."
  );
}

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!client) {
    client = createClient(url, key);
  }
  return client;
}

