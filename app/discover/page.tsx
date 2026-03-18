"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWatchStore } from "@/lib/store/watchStore";
import { useAuth } from "@/lib/auth";
import { AuthModal } from "@/components/AuthModal";
import { SwipeCard } from "@/components/SwipeCard";

export default function DiscoverPage() {
  const { user } = useAuth();
  const { getCurrent, swipePass, swipeLove, saveWatch, resetIndex } =
    useWatchStore();
  const current = getCurrent();
  const [lastAction, setLastAction] = useState<"pass" | "like" | "save" | null>(
    null
  );
  const clearActionTimeout = useRef<number | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );
  const [authOpen, setAuthOpen] = useState(false);

  const setActionWithReset = useCallback((action: "pass" | "like" | "save") => {
    setLastAction(action);
    if (clearActionTimeout.current !== null) {
      window.clearTimeout(clearActionTimeout.current);
    }
    clearActionTimeout.current = window.setTimeout(() => {
      setLastAction(null);
      clearActionTimeout.current = null;
    }, 600);
  }, []);

  const activeVariant = useMemo(() => {
    if (!current) return null;
    return (
      current.variants.find((v) => v.id === selectedVariantId) ??
      current.variants[0]
    );
  }, [current, selectedVariantId]);

  useEffect(() => {
    if (!current) return;
    const first = current.variants[0]?.id ?? null;
    setSelectedVariantId((prev) => {
      if (prev && current.variants.some((v) => v.id === prev)) return prev;
      return first;
    });
  }, [current]);

  const handleLove = useCallback(() => {
    if (!current || !activeVariant) return;
    swipeLove();
    setActionWithReset("like");
  }, [activeVariant, current, setActionWithReset, swipeLove]);

  const handlePass = useCallback(() => {
    if (!current || !activeVariant) return;
    swipePass();
    setActionWithReset("pass");
  }, [activeVariant, current, setActionWithReset, swipePass]);

  const handleSave = useCallback(() => {
    if (!current || !activeVariant) return;
    if (!user) {
      setAuthOpen(true);
      return;
    }
    saveWatch(current.id, activeVariant.id, user.id);
    setActionWithReset("save");
  }, [activeVariant, current, saveWatch, setActionWithReset, user]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePass();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleLove();
      } else if (event.key.toLowerCase() === "s") {
        event.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleLove, handlePass, handleSave]);

  if (!current || !activeVariant) {
    return (
      <div className="flex h-full min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
        <div className="glass w-full max-w-xs rounded-3xl px-6 py-8">
          <p className="text-sm font-medium text-white">
            You&apos;ve reached the end
          </p>
          <p className="mt-2 text-xs text-muted">
            Restart the stack to swipe again.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetIndex();
            setSelectedVariantId(null);
            setLastAction(null);
          }}
          className="touch-target rounded-full bg-accent px-5 py-2.5 text-xs font-semibold text-black shadow-soft-card"
        >
          Restart stack
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full flex-col">
        <header className="flex items-center pt-1">
          <div className="space-y-0.5">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
              Discover
            </p>
            <h1 className="text-xl font-semibold tracking-tight">
              Swipe microbrand picks
            </h1>
          </div>
        </header>

        <div className="mt-4 flex flex-1 flex-col gap-4 pb-1">
          <SwipeCard
            watch={current}
            activeVariant={activeVariant}
            onVariantChange={setSelectedVariantId}
            onPass={handlePass}
            onLove={handleLove}
          />

          <div className="mt-auto flex items-stretch gap-3 pt-1">
            <button
              type="button"
              onClick={handlePass}
              className={`touch-target flex flex-1 items-center justify-center rounded-2xl border px-3 py-3.5 text-xs font-medium transition-colors ${
                lastAction === "pass"
                  ? "border-red-500/80 bg-red-500/15 text-red-100"
                  : "border-borderSoft/80 bg-surface text-muted hover:border-red-900/40 hover:bg-surfaceElevated hover:text-red-200/90"
              }`}
            >
              {lastAction === "pass" ? "Passed" : "Pass"}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={`touch-target flex flex-1 items-center justify-center rounded-2xl px-3 py-3.5 text-xs font-medium ring-1 transition-colors ${
                lastAction === "save"
                  ? "bg-accent text-black ring-accent"
                  : "bg-accent/10 text-accent ring-accent/25 hover:bg-accent/16"
              }`}
            >
              {lastAction === "save" ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={handleLove}
              className={`touch-target flex flex-1 items-center justify-center rounded-2xl border px-3 py-3.5 text-xs font-semibold shadow-soft-card transition-colors ${
                lastAction === "like"
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-50"
                  : "border-borderSoft/80 bg-surface text-muted hover:border-emerald-400/70 hover:bg-surfaceElevated hover:text-emerald-200"
              }`}
            >
              {lastAction === "like" ? "Liked" : "Like"}
            </button>
          </div>
        </div>

        <p className="mt-3 pb-1 text-center text-[0.65rem] text-muted/80">
          On desktop: ← pass, → like, S save
        </p>

        <span className="sr-only" aria-live="polite">
          {lastAction === "pass" && "Passed"}
          {lastAction === "like" && "Liked"}
          {lastAction === "save" && "Saved"}
        </span>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}

