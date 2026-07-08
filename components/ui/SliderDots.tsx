"use client";

import { cn } from "@/lib/cn";

interface SliderDotsProps {
  count: number;
  index: number;
  /** restarts the fill animation when autoplay is resynced */
  epoch: number;
  paused: boolean;
  durationMs: number;
  onSelect: (index: number) => void;
  label: string;
  itemLabel: string;
  /** fill colour of the active dot's progress bar */
  fillColor?: string;
  /** white styling for colored backgrounds */
  light?: boolean;
}

/**
 * Slider pagination. The active dot stretches into a track and a fill "loads"
 * across it over the autoplay interval (reduced motion gets a solid dot).
 */
export function SliderDots({
  count,
  index,
  epoch,
  paused,
  durationMs,
  onSelect,
  label,
  itemLabel,
  fillColor,
  light,
}: SliderDotsProps) {
  return (
    <div className="flex gap-2" role="tablist" aria-label={label}>
      {Array.from({ length: count }, (_, i) => {
        const active = i === index;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`${itemLabel} ${i + 1}`}
            onClick={() => onSelect(i)}
            className={cn(
              "relative h-2 cursor-pointer overflow-hidden rounded-full transition-[width,background-color] duration-300",
              light ? (active ? "bg-white/30" : "bg-white/40") : "bg-hair",
              active ? "w-[26px]" : "w-2",
            )}
          >
            {active && (
              <span
                // remount on slide/epoch change so the fill restarts from zero
                key={`${i}-${epoch}`}
                aria-hidden
                className="absolute inset-0 origin-left animate-[fill-x_linear_forwards] rounded-[inherit] rtl:origin-right"
                style={{
                  backgroundColor: fillColor ?? (light ? "#fff" : "var(--blue)"),
                  animationDuration: `${durationMs}ms`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
