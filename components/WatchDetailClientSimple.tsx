"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Watch } from "@/types/watch";
import { WatchDetailGallery } from "@/components/WatchDetailGallery";
import { useWatchStore } from "@/lib/store/watchStore";
import { useAuth } from "@/lib/auth";
import { AuthModal } from "@/components/AuthModal";
import { saveWatchForUser } from "@/lib/supabase/savedWatches";

interface Props {
  watch: Watch;
  initialVariantId?: string;
}

export function WatchDetailClientSimple({ watch, initialVariantId }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const { saveWatch } = useWatchStore();
  const [authOpen, setAuthOpen] = useState(false);

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    initialVariantId ?? watch.variants[0]?.id
  );

  const activeVariant =
    watch.variants.find((v) => v.id === selectedVariantId) ??
    watch.variants[0];

  const handleSave = () => {
    if (!activeVariant) return;
    if (!user) {
      setAuthOpen(true);
      return;
    }
    // TODO: Unify with discover flow — single path that persists to Supabase and store.
    saveWatch(watch.id, activeVariant.id, user.id);
    void saveWatchForUser({
      userId: user.id,
      watchId: watch.id,
      variantId: activeVariant.id
    });
    toast.success("Saved to My Collection");
  };

  return (
    <>
      <div className="flex h-full flex-col gap-5 pb-4">
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Back to swiping"
              className="touch-target inline-flex h-8 w-8 items-center justify-center rounded-full border border-borderSoft bg-surface text-xs text-muted hover:border-accent/40 hover:text-white"
            >
              ←
            </button>
            <div className="space-y-0.5">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                {watch.brand}
              </p>
              <h1 className="text-lg font-semibold">{watch.model}</h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[0.65rem] text-muted">From</p>
            <p className="text-base font-semibold text-accent">
              $
              {(
                activeVariant?.price_override ?? watch.base_price
              ).toLocaleString()}
            </p>
          </div>
        </header>

        {activeVariant && (
          <WatchDetailGallery
            watch={watch}
            initialVariantId={initialVariantId ?? activeVariant.id}
            onVariantChange={(variant) => setSelectedVariantId(variant.id)}
          />
        )}

        <section className="space-y-3">
          <div className="glass rounded-3xl p-4">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Specs
            </h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted">
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.14em]">
                  Case size
                </dt>
                <dd className="text-white">{watch.case_size}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.14em]">
                  Movement
                </dt>
                <dd className="text-white">{watch.movement}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.14em]">
                  Water resistance
                </dt>
                <dd className="text-white">{watch.water_resistance}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.14em]">
                  Category
                </dt>
                <dd className="text-white">{watch.category}</dd>
              </div>
            </dl>
          </div>

          <div className="glass rounded-3xl p-4 text-xs text-muted">
            <p>{watch.description}</p>
          </div>
        </section>

        <section className="mt-1 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="touch-target flex w-full items-center justify-center rounded-2xl bg-accent px-4 py-3.5 text-sm font-semibold text-black shadow-soft-card transition-transform hover:brightness-110"
          >
            Save to Collection
          </button>
        </section>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}

