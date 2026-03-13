"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Watch, WatchVariant } from "@/types/watch";
import { ColorSelector } from "@/components/ColorSelector";

interface WatchDetailGalleryProps {
  watch: Watch;
  initialVariantId?: string;
  onVariantChange?: (variant: WatchVariant) => void;
}

export function WatchDetailGallery({
  watch,
  initialVariantId,
  onVariantChange
}: WatchDetailGalleryProps) {
  const [activeId, setActiveId] = useState<string>(
    initialVariantId ?? watch.variants[0]?.id
  );

  // Keep gallery in sync when opening via ?variant= or when parent remounts
  useEffect(() => {
    if (!initialVariantId) return;
    if (watch.variants.some((v) => v.id === initialVariantId)) {
      setActiveId(initialVariantId);
    }
  }, [initialVariantId, watch.id]);

  const active = watch.variants.find((v) => v.id === activeId) ?? watch.variants[0];

  const handleChange = (id: string) => {
    setActiveId(id);
    const variant = watch.variants.find((v) => v.id === id);
    if (variant && onVariantChange) onVariantChange(variant);
  };

  if (!active) return null;

  return (
    <div className="space-y-4">
      <div
        className="glass relative overflow-hidden rounded-card shadow-soft-card"
        style={{ maxHeight: "min(70vh, 640px)" }}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.img
            key={active.id}
            src={active.image_url}
            alt={`${watch.brand} ${watch.model} - ${active.color_name}`}
            className="h-full w-full object-cover"
            initial={{ opacity: 0.2, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        </div>
      </div>

      {watch.variants.length > 1 && (
        <ColorSelector
          variants={watch.variants}
          activeId={active.id}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
