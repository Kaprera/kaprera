"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

type Phase =
  /** server HTML / pre-hydration — keep content visible for slow connections */
  | "ssr"
  /** hydrated and off-screen — hidden, waiting to enter */
  | "waiting"
  | "shown";

/** Fade/slide-up once when scrolled into view (skipped for reduced motion). */
export function Reveal({ as: Tag = "div", className, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("ssr");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // already (or now) on screen — show; the entrance only ever plays
          // for content that was hidden while off-screen
          setPhase("shown");
          observer.disconnect();
        } else {
          setPhase("waiting");
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-[opacity,translate] duration-700 ease-brand motion-reduce:translate-y-0 motion-reduce:opacity-100",
        phase === "waiting" ? "translate-y-7 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
