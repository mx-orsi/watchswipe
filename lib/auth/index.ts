"use client";

/**
 * Auth layer — currently demo-only. Supabase client is in @/lib/supabase.
 * TODO: Swap AuthProvider implementation for Supabase session when moving to production auth.
 */
export { AuthProvider, useAuth } from "./demoAuth";
