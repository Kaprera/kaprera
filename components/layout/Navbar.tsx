"use client";

import { useEffect, useState } from "react";
import { useEscape } from "@/hooks/useEscape";
import { useScrollLock } from "@/hooks/useScrollLock";
import { bi, useLang, type Bi } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { CONTACT } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { LangToggle } from "@/components/ui/LangToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS: ReadonlyArray<{ href: string; label: Bi }> = [
  { href: "#work", label: bi("work", "أعمالنا") },
  { href: "#services", label: bi("services", "خدماتنا") },
  { href: "#testimonials", label: bi("testimonials", "آراء العملاء") },
  { href: "#contact", label: bi("contact", "تواصل") },
];

const BOOK_A_CALL = bi("book a call", "احجز مكالمة");

export function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useScrollLock(open);
  useEscape(open, () => setOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      {/* background + blur live on their own layer so the header doesn't become
          a containing block for the fixed mobile-menu overlay */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-surface/70 backdrop-blur-[14px] backdrop-saturate-[1.8]" />
      <div
        className={cn(
          "wrap flex items-center justify-between transition-[height] duration-300 ease-brand",
          scrolled ? "h-16" : "h-[78px]",
        )}
      >
        <a href="#top" aria-label="kaprera home">
          <span
            role="img"
            aria-label="kaprera"
            className={cn(
              "brand-logo block aspect-[640/140] transition-[height] duration-300 ease-brand",
              scrolled ? "h-[26px]" : "h-[30px]",
            )}
          />
        </a>

        <nav
          id="primary-nav"
          aria-label="primary"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          className={cn(
            "md:flex md:items-center md:gap-[34px]",
            // below md the nav becomes a dimmed backdrop holding a centered card
            "max-md:fixed max-md:inset-0 max-md:z-[100] max-md:flex max-md:items-center max-md:justify-center max-md:bg-black/55 max-md:p-6 max-md:backdrop-blur-xs max-md:transition-opacity max-md:duration-300",
            open ? "max-md:opacity-100" : "max-md:pointer-events-none max-md:opacity-0",
          )}
        >
          <div
            className={cn(
              "md:contents",
              "max-md:flex max-md:max-h-[86vh] max-md:w-full max-md:max-w-[340px] max-md:flex-col max-md:overflow-y-auto max-md:rounded-[20px] max-md:bg-surface max-md:px-[22px] max-md:pt-3.5 max-md:pb-6 max-md:shadow-[0_30px_80px_rgba(0,0,0,0.35)] max-md:transition-[translate,scale] max-md:duration-350 max-md:ease-brand",
              open ? "max-md:translate-y-0 max-md:scale-100" : "max-md:translate-y-6 max-md:scale-[0.98]",
            )}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="relative text-[15px] lowercase text-ink transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-blue after:transition-[width] after:duration-250 after:ease-brand hover:text-blue hover:after:w-full max-md:border-b max-md:border-hair max-md:px-0.5 max-md:py-4 max-md:text-lg max-md:font-medium max-md:after:hidden"
              >
                {t(label)}
              </a>
            ))}
            <div className="md:contents max-md:mt-5 max-md:flex max-md:gap-2.5">
              <LangToggle />
              <ThemeToggle />
            </div>
            <ButtonLink
              href={CONTACT.bookCall}
              target="_blank"
              rel="noopener"
              shine
              withArrow
              className="max-md:mt-3.5 max-md:w-full"
            >
              {t(BOOK_A_CALL)}
            </ButtonLink>
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="toggle menu"
          aria-expanded={open}
          aria-controls="primary-nav"
          className="relative z-[101] flex cursor-pointer flex-col gap-[5px] p-2 md:hidden"
        >
          {/* the X stays visible over the dark scrim */}
          <span
            className={cn(
              "h-0.5 w-6 transition-[translate,rotate] duration-300 ease-brand",
              open ? "translate-y-[7px] rotate-45 bg-white" : "bg-ink",
            )}
          />
          <span className={cn("h-0.5 w-6 bg-ink transition-opacity duration-200", open && "opacity-0")} />
          <span
            className={cn(
              "h-0.5 w-6 transition-[translate,rotate] duration-300 ease-brand",
              open ? "-translate-y-[7px] -rotate-45 bg-white" : "bg-ink",
            )}
          />
        </button>
      </div>
    </header>
  );
}
