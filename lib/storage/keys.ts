/**
 * Single source of truth for client-side persistence keys.
 * Prefix: watchswipe_ — avoids collisions with other apps on the same origin.
 */
export const STORAGE_KEYS = {
  /** Zustand-derived watch stack + saved collection (persisted subset). */
  watchState: "watchswipe_watch_state_v1",
  /** Feedback form submissions buffered locally before any backend exists. */
  feedbackQueue: "watchswipe_feedback_v1",
  /** Discover page onboarding overlay dismissed flag. */
  discoverOnboardingSeen: "watchswipe_discover_onboarding_seen"
} as const;
