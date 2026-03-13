import { Watch, WatchVariant } from "@/types/watch";
import { TEST_MODE } from "@/lib/config/testMode";

export type AnalyticsEventName =
  | "discover_opened"
  | "watch_swiped_left"
  | "watch_swiped_right"
  | "watch_detail_opened"
  | "watch_saved"
  | "watch_unsaved"
  | "color_variant_selected"
  | "collection_viewed";

export interface AnalyticsPayload {
  watch_id?: string;
  brand?: string;
  model?: string;
  variant_id?: string;
  color_name?: string;
  category?: string;
  price?: number;
  [key: string]: unknown;
}

export interface AnalyticsEventRecord {
  event: AnalyticsEventName;
  properties: AnalyticsPayload;
  timestamp: string;
}

type AnalyticsSubscriber = (event: AnalyticsEventRecord) => void;

const subscribers = new Set<AnalyticsSubscriber>();
const buffer: AnalyticsEventRecord[] = [];
const MAX_BUFFER = 50;

export function buildWatchPayload(
  watch: Watch,
  variant?: WatchVariant | null
): AnalyticsPayload {
  const price =
    (variant?.price_override ?? watch.base_price) ?? watch.base_price;

  return {
    watch_id: watch.id,
    brand: watch.brand,
    model: watch.model,
    category: watch.category,
    price,
    ...(variant
      ? {
          variant_id: variant.id,
          color_name: variant.color_name
        }
      : {})
  };
}

export function trackEvent(
  eventName: AnalyticsEventName,
  payload: AnalyticsPayload = {}
): void {
  const event: AnalyticsEventRecord = {
    event: eventName,
    properties: {
      ...payload
    },
    timestamp: new Date().toISOString()
  };

  // For now we only log events, but the structure mirrors tools
  // like PostHog or Mixpanel so we can easily forward them later.
  // eslint-disable-next-line no-console
  console.log("[analytics]", event);

  if (TEST_MODE) {
    buffer.push(event);
    if (buffer.length > MAX_BUFFER) {
      buffer.splice(0, buffer.length - MAX_BUFFER);
    }
    subscribers.forEach((subscriber) => subscriber(event));
  }
}

export function getAnalyticsEvents(): AnalyticsEventRecord[] {
  return [...buffer];
}

export function subscribeToAnalytics(
  subscriber: AnalyticsSubscriber
): () => void {
  subscribers.add(subscriber);
  return () => {
    subscribers.delete(subscriber);
  };
}


