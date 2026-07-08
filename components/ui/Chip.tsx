"use client";

import { useLang, type Bi } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface ChipProps {
  text: Bi;
  light?: boolean;
}

export function Chip({ text, light }: ChipProps) {
  const { t } = useLang();
  return (
    <span
      className={cn(
        "rounded-full px-[11px] py-[5px] font-mono text-xs",
        light ? "bg-white/18 text-white" : "bg-blue/8 text-blue-text",
      )}
    >
      {t(text)}
    </span>
  );
}
