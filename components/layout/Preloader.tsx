"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { markPreloaderDone } from "@/lib/preloader-signal";
import { cn } from "@/lib/cn";

export function Preloader() {
  const tagRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // repeat views in this session skip the intro (better LCP) — the boot
    // script already hid it before paint, so just clear it out
    if (document.documentElement.classList.contains("skip-preloader")) {
      markPreloaderDone();
      const frame = requestAnimationFrame(() => setGone(true));
      return () => cancelAnimationFrame(frame);
    }
    try {
      sessionStorage.setItem("kaprera-preloaded", "1");
    } catch {
      // fine — the intro will just play again next view
    }

    let finished = false;
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    const finish = () => {
      if (finished) return;
      finished = true;
      setDone(true);
      markPreloaderDone(); // let the hero start typing
      timers.push(setTimeout(() => setGone(true), 700));
    };

    const tag = tagRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // finish when the intro animation ends; hard fallback in case the
    // animation already ran before hydration
    if (tag && !reduce) tag.addEventListener("animationend", finish, { once: true });
    else timers.push(setTimeout(finish, 0));
    timers.push(setTimeout(finish, 2500));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (gone) return null;

  return (
    <div
      id="preloader"
      role="status"
      aria-label="loading"
      className={cn(
        "fixed inset-0 z-[9999] grid content-center place-items-center gap-[22px] bg-blue transition-[opacity,visibility] duration-600 ease-brand",
        done && "invisible opacity-0",
      )}
    >
      <div aria-hidden className="flex flex-col items-center gap-[clamp(16px,3.2vh,30px)]">
        {/* width-aware: the lockup is ~3.6:1, so cap by vw too to keep it small on phones */}
        <div className="h-[min(15vh,14vw,150px)] overflow-hidden">
          <div className="flex h-full items-stretch">
            <Image
              src="/branding/logos/anim-mark-white.webp"
              alt=""
              width={290}
              height={325}
              preload
              className="h-full w-auto animate-[pl-mark-in_700ms_var(--ease-brand)_forwards] opacity-0 motion-reduce:opacity-100"
            />
            <Image
              src="/branding/logos/anim-word-white.webp"
              alt="kaprera"
              width={891}
              height={325}
              preload
              className="h-full w-auto animate-[pl-word-in_850ms_var(--ease-brand)_240ms_forwards] opacity-0 [clip-path:inset(0_100%_0_0)] motion-reduce:opacity-100 motion-reduce:[clip-path:none]"
            />
          </div>
        </div>
        <div
          ref={tagRef}
          className="animate-[pl-tag-in_600ms_var(--ease-brand)_800ms_forwards] font-sans text-[clamp(12px,1.9vh,16px)] font-medium tracking-[0.04em] text-white/90 opacity-0 motion-reduce:opacity-100"
        >
          design, build, grow.
        </div>
      </div>
    </div>
  );
}
