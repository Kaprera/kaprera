"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { bi, useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { LangToggle } from "@/components/ui/LangToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/** Condensing header for careers / privacy: brand, back link, and the two toggles. */
export function SubpageHeader() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] border-b transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-hair shadow-[0_4px_24px_rgba(0,0,0,0.04)]" : "border-transparent",
      )}
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-surface/70 backdrop-blur-[14px] backdrop-saturate-[1.8]" />
      <div
        className={cn(
          "wrap flex items-center justify-between transition-[height] duration-300 ease-brand",
          scrolled ? "h-16" : "h-[78px]",
        )}
      >
        <Link href="/" aria-label="kaprera home">
          <span
            role="img"
            aria-label="kaprera"
            className={cn(
              "brand-logo block aspect-[640/140] transition-[height] duration-300 ease-brand",
              scrolled ? "h-[26px]" : "h-[30px]",
            )}
          />
        </Link>
        <div className="flex items-center gap-3.5">
          {/* subpages are reached from the footer links — return the visitor there */}
          <Link
            href="/#footer"
            className="group inline-flex items-center gap-[7px] text-[15px] lowercase text-ink transition-colors duration-200 hover:text-blue"
          >
            <ArrowLeftIcon className="transition-[translate,scale] duration-300 ease-brand group-hover:-translate-x-[3px] rtl:-scale-x-100 rtl:group-hover:translate-x-[3px]" />
            <span className="max-[600px]:hidden">{t(bi("back to site", "العودة إلى الموقع"))}</span>
          </Link>
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
