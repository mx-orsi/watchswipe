"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "./client";

const SupabaseContext = createContext<SupabaseClient | null>(null);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => getSupabaseClient(), []);

  return (
    <SupabaseContext.Provider value={client}>
      {children}
    </SupabaseContext.Provider>
  );
}

/** Call from components that need the Supabase client (e.g. after real auth). */
export function useSupabaseClient(): SupabaseClient {
  const ctx = useContext(SupabaseContext);
  if (!ctx) {
    throw new Error("useSupabaseClient must be used within SupabaseProvider");
  }
  return ctx;
}

