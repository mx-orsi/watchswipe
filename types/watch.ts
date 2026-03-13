export type WatchCategory =
  | "Dive"
  | "Field"
  | "Racing"
  | "Dress"
  | "Pilot"
  | "Chronograph";

export interface WatchVariant {
  id: string;
  watch_id: string;
  color_name: string;
  image_url: string;
  hex_color: string;
  price_override?: number | null;
  created_at?: string;
}

export interface Watch {
  id: string;
  brand: string;
  model: string;
  base_price: number;
  case_size: string;
  movement: string;
  water_resistance: string;
  category: WatchCategory;
  description: string;
  brand_url: string;
  created_at?: string;
  variants: WatchVariant[];
}

export interface SavedWatch {
  id: string;
  user_id?: string;
  watch_id: string;
  watch_variant_id: string;
  created_at?: string;
}

