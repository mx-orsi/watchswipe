"use client";

import { useState } from "react";
import { STORAGE_KEYS } from "@/lib/storage/keys";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STORAGE_KEY = STORAGE_KEYS.feedbackQueue;

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  const [confused, setConfused] = useState("");
  const [likedMost, setLikedMost] = useState("");
  const [wouldUseAgain, setWouldUseAgain] = useState<"yes" | "no" | "unsure">(
    "yes"
  );

  if (!open) return null;

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSubmit = () => {
    const payload = {
      confused,
      likedMost,
      wouldUseAgain,
      createdAt: new Date().toISOString(),
      path:
        typeof window !== "undefined"
          ? window.location.pathname + window.location.search
          : undefined
    };

    // Log for now so we can hook into analytics/backends later.
    // eslint-disable-next-line no-console
    console.log("[feedback]", payload);

    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        const existing = Array.isArray(parsed) ? parsed : [];
        existing.push(payload);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      } catch {
        // ignore localStorage errors
      }
    }

    setConfused("");
    setLikedMost("");
    setWouldUseAgain("yes");
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-borderSoft bg-surfaceElevated/95 p-4 text-xs text-muted shadow-soft-card">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Send feedback
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="touch-target rounded-full px-2 py-1 text-[0.65rem] text-muted hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-[0.65rem] text-muted">
              What confused you
            </label>
            <textarea
              rows={2}
              value={confused}
              onChange={(e) => setConfused(e.target.value)}
              className="w-full rounded-2xl border border-borderSoft bg-surface px-3 py-2 text-xs text-white outline-none placeholder:text-[0.7rem] placeholder:text-muted focus:border-accent/70"
              placeholder="Anything that felt unclear or unexpected."
            />
          </div>

          <div>
            <label className="mb-1 block text-[0.65rem] text-muted">
              What did you like most
            </label>
            <textarea
              rows={2}
              value={likedMost}
              onChange={(e) => setLikedMost(e.target.value)}
              className="w-full rounded-2xl border border-borderSoft bg-surface px-3 py-2 text-xs text-white outline-none placeholder:text-[0.7rem] placeholder:text-muted focus:border-accent/70"
              placeholder="Anything that felt especially good."
            />
          </div>

          <div>
            <p className="mb-1 text-[0.65rem] text-muted">
              Would you use this again
            </p>
            <div className="flex gap-2">
              {[
                { id: "yes", label: "Yes" },
                { id: "unsure", label: "Not sure" },
                { id: "no", label: "No" }
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    setWouldUseAgain(option.id as "yes" | "no" | "unsure")
                  }
                  className={`flex-1 rounded-full border px-2 py-1 text-[0.65rem] ${
                    wouldUseAgain === option.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-borderSoft bg-surface text-muted"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-1 w-full rounded-full bg-accent px-4 py-2 text-[0.75rem] font-semibold text-black shadow-soft-card hover:brightness-110"
          >
            Submit feedback
          </button>
        </div>
      </div>
    </div>
  );
}

