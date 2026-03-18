"use client";

import { useEffect, useState } from "react";
import { useWatchStore } from "@/lib/store/watchStore";
import {
  AnalyticsEventRecord,
  getAnalyticsEvents,
  subscribeToAnalytics
} from "@/lib/analytics/track";
import { TEST_MODE } from "@/lib/config/testMode";

export function DevPanel() {
  const {
    watches,
    currentIndex,
    saved,
    totalSwipes,
    totalLikes,
    totalPasses,
    totalSaves,
    resetIndex,
    clearSavedLocal,
    seedRandomSaved
  } = useWatchStore();

  const [events, setEvents] = useState<AnalyticsEventRecord[]>(
    TEST_MODE ? getAnalyticsEvents() : []
  );

  useEffect(() => {
    if (!TEST_MODE) return;
    const unsubscribe = subscribeToAnalytics((event) => {
      setEvents((prev) => [...prev, event].slice(-50));
    });
    return unsubscribe;
  }, []);

  if (!TEST_MODE) return null;

  const currentDisplayIndex =
    watches.length === 0 ? 0 : Math.min(currentIndex + 1, watches.length);

  return (
    <div className="pointer-events-none fixed bottom-3 right-3 z-50 flex max-w-xs flex-col gap-2 text-[10px]">
      <div className="pointer-events-auto rounded-2xl border border-borderSoft/80 bg-black/80 p-3 text-[10px] text-muted shadow-lg backdrop-blur-md">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">
            Dev Tools
          </span>
          <span className="text-[0.6rem] text-muted">
            {currentDisplayIndex}/{watches.length || 0}
          </span>
        </div>

        <div className="mb-2 grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={resetIndex}
            className="rounded-md border border-borderSoft/70 bg-surface px-2 py-1 text-[0.6rem] text-muted hover:border-accent/40 hover:text-accent"
          >
            Reset index
          </button>
          <button
            type="button"
            onClick={clearSavedLocal}
            className="rounded-md border border-borderSoft/70 bg-surface px-2 py-1 text-[0.6rem] text-muted hover:border-red-500/50 hover:text-red-300"
          >
            Clear saved
          </button>
          <button
            type="button"
            onClick={seedRandomSaved}
            className="rounded-md border border-borderSoft/70 bg-surface px-2 py-1 text-[0.6rem] text-muted hover:border-emerald-500/60 hover:text-emerald-300"
          >
            Seed random
          </button>
          <span className="self-center text-right text-[0.6rem] text-muted">
            Saved: {saved.length}
          </span>
        </div>

        <div className="mb-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[0.6rem]">
          <div>
            <span className="text-muted">Swipes: </span>
            <span className="text-white">{totalSwipes}</span>
          </div>
          <div>
            <span className="text-muted">Likes: </span>
            <span className="text-white">{totalLikes}</span>
          </div>
          <div>
            <span className="text-muted">Passes: </span>
            <span className="text-white">{totalPasses}</span>
          </div>
          <div>
            <span className="text-muted">Saves: </span>
            <span className="text-white">{totalSaves}</span>
          </div>
        </div>

        <div className="max-h-32 overflow-y-auto rounded-md border border-borderSoft/60 bg-black/40 p-1.5">
          <p className="mb-1 text-[0.6rem] text-muted">
            Analytics events (latest first):
          </p>
          <ul className="space-y-0.5 text-[0.6rem]">
            {events
              .slice()
              .reverse()
              .slice(0, 10)
              .map((e, idx) => {
                const p = e.properties ?? {};
                return (
                <li key={`${e.timestamp}-${e.event}-${idx}`}>
                  <span className="text-accent">{e.event}</span>
                  {" — "}
                  <span className="text-muted">
                    {p.brand} {p.model}{" "}
                    {p.color_name ? `(${p.color_name})` : ""}
                  </span>
                </li>
                );
              })}
            {events.length === 0 && (
              <li className="text-[0.6rem] text-muted">No events yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

