"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { CollectionGrid } from "@/components/CollectionGrid";
import { useWatchStore } from "@/lib/store/watchStore";
import { useAuth } from "@/lib/auth/DemoAuthContext";
import { AuthModal } from "@/components/AuthModal";

export default function CollectionPage() {
  const { user } = useAuth();
  const { watches, saved, removeSaved } = useWatchStore();
  const [authOpen, setAuthOpen] = useState(false);

  const handleRemove = (id: string) => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    removeSaved(id);
    toast.success("Removed from My Collection");
  };

  return (
    <>
      <div className="flex h-full flex-col gap-5 pb-2">
        <header className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
              My Collection
            </p>
            <h1 className="text-xl font-semibold tracking-tight">
              Saved watches
            </h1>
            {saved.length > 0 && (
              <p className="text-xs text-muted">
                {saved.length} piece{saved.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <Link
            href="/discover"
            className="touch-target rounded-full border border-borderSoft/80 bg-surfaceElevated/80 px-3 py-1.5 text-[0.7rem] text-muted transition-colors hover:border-accent/30 hover:text-white"
          >
            Discover
          </Link>
        </header>

        {!user && (
          <div className="glass flex flex-col gap-3 rounded-2xl px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-muted">
              Sign in to sync your collection across devices.
            </span>
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="touch-target shrink-0 rounded-full bg-accent/15 px-4 py-2 text-[0.75rem] font-medium text-accent"
            >
              Sign in
            </button>
          </div>
        )}

        <CollectionGrid watches={watches} saved={saved} onRemove={handleRemove} />
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}

