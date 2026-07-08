"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { MoonIcon, SunIcon } from "./icons";

/* the <html> data-theme attribute is the source of truth (set pre-paint by the boot script) */
function subscribeTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";

const segment = "flex h-[30px] w-[30px] items-center justify-center rounded-full transition-colors duration-250";
const activeSegment = "bg-blue text-white";
const idleSegment = "text-muted";

/** Segmented light/dark switch — both options visible, active one highlighted. */
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribeTheme, isDark, () => false);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable — theme still applies for this view
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label="dark mode"
      title={dark ? "switch to light mode" : "switch to dark mode"}
      className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-0.5 rounded-full border border-hair p-[4px] transition-[border-color,translate] duration-250 ease-brand hover:-translate-y-0.5 hover:border-blue"
    >
      <span aria-hidden className={cn(segment, !dark ? activeSegment : idleSegment)}>
        <SunIcon size={15} />
      </span>
      <span aria-hidden className={cn(segment, dark ? activeSegment : idleSegment)}>
        <MoonIcon size={15} />
      </span>
    </button>
  );
}
