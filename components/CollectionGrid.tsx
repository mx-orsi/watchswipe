import Link from "next/link";
import { SavedWatch, Watch, WatchVariant } from "@/types/watch";
import { WatchGridItem } from "@/components/WatchGridItem";

interface CollectionGridProps {
  watches: Watch[];
  saved: SavedWatch[];
  onRemove?: (savedId: string) => void;
  onFeedbackClick?: () => void;
}

export function CollectionGrid({
  watches,
  saved,
  onRemove,
  onFeedbackClick
}: CollectionGridProps) {
  if (saved.length === 0) {
    return (
      <div className="glass relative overflow-hidden rounded-[1.75rem] px-6 py-10 text-center">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl"
          aria-hidden
        />
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          Empty shelf
        </p>
        <p className="mt-3 text-sm font-medium text-white">
          Start swiping to build your collection.
        </p>
        <p className="mx-auto mt-2 max-w-xs text-xs text-muted">
          Swipe in Discover and tap Save—your exact variant is kept.
        </p>
        <Link
          href="/discover"
          className="mt-6 inline-flex touch-target items-center justify-center rounded-full bg-accent px-5 py-2.5 text-xs font-semibold text-black"
        >
          Start discovering
        </Link>
        {onFeedbackClick && (
          <button
            type="button"
            onClick={onFeedbackClick}
            className="mt-3 inline-flex touch-target items-center justify-center rounded-full border border-borderSoft/80 bg-surface px-4 py-2 text-[0.7rem] text-muted hover:border-accent/40 hover:text-white"
          >
            Send feedback
          </button>
        )}
      </div>
    );
  }

  const watchMap = new Map<string, Watch>();
  const variantMap = new Map<string, WatchVariant>();

  watches.forEach((w) => {
    watchMap.set(w.id, w);
    w.variants.forEach((v) => {
      variantMap.set(v.id, v);
    });
  });

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 pt-1 pb-6">
      {saved.map((entry) => {
        const watch = watchMap.get(entry.watch_id);
        const variant = variantMap.get(entry.watch_variant_id);
        if (!watch || !variant) return null;
        return (
          <WatchGridItem
            key={entry.id}
            watch={watch}
            variant={variant}
            saved={entry}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
}
