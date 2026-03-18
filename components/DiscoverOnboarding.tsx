"use client";

import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/lib/storage/keys";

// Not mounted by default — import on /discover if first-visit hints are desired.
const STORAGE_KEY = STORAGE_KEYS.discoverOnboardingSeen;

export function DiscoverOnboarding() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setVisible(true);
      window.localStorage.setItem(STORAGE_KEY, "1");
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/20 to-transparent">
      <div className="pointer-events-auto mb-16 w-full max-w-xs rounded-2xl bg-black/85 px-4 py-3 text-[0.7rem] text-muted shadow-soft-card backdrop-blur-md">
        <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">
          How swiping works
        </p>
        <ul className="space-y-1.5">
          <li>
            <span className="text-white font-medium">Swipe right</span>{" "}
            <span className="text-muted">= like</span>
          </li>
          <li>
            <span className="text-white font-medium">Swipe left</span>{" "}
            <span className="text-muted">= pass</span>
          </li>
          <li>
            <span className="text-white font-medium">Tap</span>{" "}
            <span className="text-muted">= view details</span>
          </li>
          <li>
            <span className="text-white font-medium">Save</span>{" "}
            <span className="text-muted">= add to your collection</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

