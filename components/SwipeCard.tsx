"use client";

import { motion, PanInfo } from "framer-motion";
import { Watch, WatchVariant } from "@/types/watch";
import { ColorSelector } from "@/components/ColorSelector";

const swipeConfidenceThreshold = 120;

interface SwipeCardProps {
  watch: Watch;
  activeVariant: WatchVariant;
  onVariantChange: (id: string) => void;
  onPass: () => void;
  onLove: () => void;
}

export function SwipeCard({
  watch,
  activeVariant,
  onVariantChange,
  onPass,
  onLove
}: SwipeCardProps) {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const offset = info.offset.x;
    if (offset < -swipeConfidenceThreshold) {
      onPass();
    } else if (offset > swipeConfidenceThreshold) {
      onLove();
    }
  };

  return (
    <motion.div
      className="glass relative mt-1 flex flex-col overflow-hidden rounded-[2rem] shadow-soft-card"
      style={{ maxHeight: "min(70vh, 640px)" }}
      drag="x"
      dragElastic={0.2}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      whileHover={{ y: -4, scale: 1.01 }}
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 230, damping: 26 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          key={activeVariant.id}
          src={activeVariant.image_url}
          alt={`${watch.brand} ${watch.model} - ${activeVariant.color_name}`}
          className="h-full w-full object-cover"
          initial={{ opacity: 0.25, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
      </div>

      <div className="space-y-3 p-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              {watch.brand}
            </p>
            <h2 className="truncate text-base font-semibold">{watch.model}</h2>
            <p className="mt-1 text-xs text-muted">{watch.description}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[0.65rem] text-muted">From</p>
            <p className="text-sm font-semibold text-accent">
              $
              {(
                activeVariant.price_override ?? watch.base_price
              ).toLocaleString()}
            </p>
          </div>
        </div>

        {watch.variants.length > 1 && (
          <ColorSelector
            variants={watch.variants}
            activeId={activeVariant.id}
            onChange={onVariantChange}
          />
        )}

        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.7rem] text-muted">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.14em]">
              Case size
            </p>
            <p className="text-white">{watch.case_size}</p>
          </div>
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.14em]">
              Movement
            </p>
            <p className="text-white">{watch.movement}</p>
          </div>
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.14em]">
              Water resistance
            </p>
            <p className="text-white">{watch.water_resistance}</p>
          </div>
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.14em]">
              Category
            </p>
            <p className="text-white">{watch.category}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
