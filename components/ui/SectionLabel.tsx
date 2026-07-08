"use client";

import { useLang, type Bi } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface SectionLabelProps {
  num: string;
  text: Bi;
  light?: boolean;
  className?: string;
}

/** Monospace section label, e.g. “— 02 / what we do”. */
export function SectionLabel({ num, text, light, className }: SectionLabelProps) {
  const { t } = useLang();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[13px] tracking-[0.04em] lowercase",
        light ? "text-white/85" : "text-muted",
        className,
      )}
    >
      <span className={cn("inline-block h-px w-[26px]", light ? "bg-white" : "bg-blue")} aria-hidden />
      <span className={cn("keep-mono", light ? "text-white" : "text-blue-text")}>{num}</span>
      <span>{t(text)}</span>
    </span>
  );
}
