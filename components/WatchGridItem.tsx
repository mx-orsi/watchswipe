import Link from "next/link";
import { Watch, WatchVariant, SavedWatch } from "@/types/watch";

interface WatchGridItemProps {
  watch: Watch;
  variant: WatchVariant;
  saved: SavedWatch;
  onRemove?: (savedId: string) => void;
}

export function WatchGridItem({
  watch,
  variant,
  saved,
  onRemove
}: WatchGridItemProps) {
  const price = variant.price_override ?? watch.base_price;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-borderSoft/60 bg-surfaceElevated/90 shadow-soft-card transition-colors hover:border-borderSoft">
      <Link
        href={`/watch/${watch.id}?variant=${variant.id}`}
        className="relative block aspect-[4/5] overflow-hidden"
      >
        <img
          src={variant.image_url}
          alt={`${watch.brand} ${watch.model} — ${variant.color_name}`}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-2 rounded-full bg-black/50 pl-1 pr-2.5 py-1 backdrop-blur-md">
          <span
            className="h-5 w-5 shrink-0 rounded-full ring-2 ring-white/20"
            style={{ backgroundColor: variant.hex_color }}
            aria-hidden
          />
          <span className="text-[0.65rem] font-medium text-white/95">
            {variant.color_name}
          </span>
        </div>
      </Link>
      <div className="flex flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              {watch.brand}
            </p>
            <p className="truncate text-xs font-medium text-white">{watch.model}</p>
          </div>
          <p className="shrink-0 text-xs font-semibold text-accent">
            ${price.toLocaleString()}
          </p>
        </div>
        {onRemove && (
          <button
            type="button"
            onClick={() => onRemove(saved.id)}
            className="touch-target w-full rounded-xl border border-borderSoft/70 py-2 text-[0.65rem] text-muted transition-colors hover:border-red-900/50 hover:text-red-300/90"
          >
            Remove
          </button>
        )}
      </div>
    </article>
  );
}
