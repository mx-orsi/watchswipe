import Link from "next/link";
import { seedWatches } from "@/lib/data/seedWatches";

export default function HomePage() {
  const watchOfTheDay = seedWatches[0];

  return (
    <div className="flex h-full flex-col gap-8 pb-2">
      <section className="mt-4 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Curated microbrand discovery
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Discover microbrand{" "}
            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
              watches
            </span>
          </h1>
          <p className="text-sm text-muted max-w-sm">
            Swipe through a handpicked lineup of independent watchmakers and
            build your collection in seconds.
          </p>
          <p className="text-xs text-muted/90 max-w-sm">
            Swipe through curated microbrand watches and build your collection.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/discover"
            className="touch-target inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-medium text-black shadow-soft-card"
          >
            Start Swiping
          </Link>
          <Link
            href="/collection"
            className="touch-target inline-flex items-center justify-center rounded-full border border-borderSoft bg-surface px-4 py-3 text-xs text-muted"
          >
            View Collection
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Watch of the day</span>
          <span>
            {watchOfTheDay.brand} · {watchOfTheDay.model}
          </span>
        </div>
        <div className="glass relative overflow-hidden rounded-card p-4 shadow-soft-card">
          <div className="space-y-2">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
              Featured microbrand
            </p>
            <h2 className="text-lg font-medium">
              {watchOfTheDay.brand} {watchOfTheDay.model}
            </h2>
            <p className="text-xs text-muted line-clamp-2">
              {watchOfTheDay.description}
            </p>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="space-y-1 text-xs text-muted">
              <p>{watchOfTheDay.case_size}</p>
              <p>{watchOfTheDay.movement}</p>
              <p>{watchOfTheDay.water_resistance} WR</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted">From</p>
              <p className="text-lg font-semibold">
                ${watchOfTheDay.base_price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10 space-y-3">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Featured brands</span>
        </div>
        <div className="glass flex items-center gap-3 overflow-x-auto rounded-full px-3 py-2 text-[0.7rem] text-muted">
          {["Baltic", "Lorier", "Traska", "Zelos", "Nodus", "Farer", "Serica", "Studio Underd0g"].map(
            (brand) => (
              <div
                key={brand}
                className="flex items-center gap-1 rounded-full bg-white/3 px-3 py-1"
              >
                <span className="h-1 w-1 rounded-full bg-accent/70" />
                <span>{brand}</span>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}

