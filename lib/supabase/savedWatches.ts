import { SavedWatch } from "@/types/watch";
import { getSupabaseClient } from "@/lib/supabase/client";

const TABLE = "saved_watches";

export async function fetchSavedWatchesForUser(
  userId: string
): Promise<SavedWatch[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, user_id, watch_id, watch_variant_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as SavedWatch[];
}

export async function saveWatchForUser(params: {
  userId: string;
  watchId: string;
  variantId: string;
}): Promise<SavedWatch | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      user_id: params.userId,
      watch_id: params.watchId,
      watch_variant_id: params.variantId
    })
    .select("id, user_id, watch_id, watch_variant_id, created_at")
    .single();

  if (error || !data) {
    return null;
  }

  return data as SavedWatch;
}

export async function removeSavedWatch(savedId: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from(TABLE).delete().eq("id", savedId);
  return !error;
}
