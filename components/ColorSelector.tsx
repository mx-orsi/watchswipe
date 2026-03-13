import { WatchVariant } from "@/types/watch";

interface Props {
  variants: WatchVariant[];
  activeId: string | null;
  onChange: (id: string) => void;
}

export function ColorSelector({ variants, activeId, onChange }: Props) {
  if (variants.length <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-1.5">
        {variants.map((variant) => {
          const active = variant.id === activeId;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(variant.id);
              }}
              className="touch-target relative h-7 w-7 rounded-full border border-borderSoft/70 bg-surface"
            >
              <span
                className="absolute inset-1 rounded-full"
                style={{ backgroundColor: variant.hex_color }}
              />
              {active && (
                <span className="absolute inset-0 rounded-full ring-2 ring-accent ring-offset-2 ring-offset-surface/60" />
              )}
            </button>
          );
        })}
      </div>
      <p className="text-[0.7rem] text-muted">
        {variants.find((v) => v.id === activeId)?.color_name ??
          variants[0]?.color_name}
      </p>
    </div>
  );
}

