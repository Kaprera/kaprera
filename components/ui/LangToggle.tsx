"use client";

import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const segment =
  "flex h-[30px] min-w-[30px] items-center justify-center rounded-full px-1.5 text-[13px] font-semibold transition-colors duration-250";
const activeSegment = "bg-blue text-white";
const idleSegment = "text-muted";

/** Segmented EN/ع switch — both languages visible, active one highlighted. */
export function LangToggle() {
  const { isAr, toggle } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isAr}
      aria-label="switch language"
      title={isAr ? "switch to English" : "التبديل إلى العربية"}
      className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-0.5 rounded-full border border-hair p-[4px] transition-[border-color,translate] duration-250 ease-brand hover:-translate-y-0.5 hover:border-blue"
    >
      <span aria-hidden className={cn(segment, !isAr ? activeSegment : idleSegment)}>
        EN
      </span>
      <span aria-hidden className={cn(segment, isAr ? activeSegment : idleSegment, "pb-[3px]")}>
        ع
      </span>
    </button>
  );
}
