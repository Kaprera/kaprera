"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useEscape } from "@/hooks/useEscape";
import { useScrollLock } from "@/hooks/useScrollLock";
import type { CaseStat, CaseStudy } from "@/lib/cases";
import { bi, useLang, type Bi } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { CONTACT } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

const CHALLENGE = bi("challenge", "التحدي");
const SOLUTION = bi("solution", "الحل");
const WHAT_WE_BUILT = bi("what we built", "ماذا بنينا");
const PROJECT_DETAILS = bi("project details", "تفاصيل المشروع");
const PERFORMANCE = bi("performance", "الأداء");
const RESULTS = bi("results", "النتائج");

interface CaseModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

/** Case-study dialog: dimmed backdrop, scroll lock, ESC / backdrop / × to close. */
export function CaseModal({ caseStudy, onClose }: CaseModalProps) {
  const open = caseStudy !== null;
  // state adjusted during render: keep the last case (and the dialog itself)
  // mounted through the exit transition
  const [lastCase, setLastCase] = useState<CaseStudy | null>(null);
  if (caseStudy && caseStudy !== lastCase) setLastCase(caseStudy);
  const shown = caseStudy ?? lastCase;

  const [mounted, setMounted] = useState(false);
  if (open && !mounted) setMounted(true);

  const [entered, setEntered] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useScrollLock(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
      const frame = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(frame);
    }
    lastFocus.current?.focus();
    const frame = requestAnimationFrame(() => setEntered(false));
    const timeout = setTimeout(() => setMounted(false), 350);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [open]);

  if (!mounted || !shown) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(10,10,10,0.55)] p-6 backdrop-blur-xs transition-opacity duration-300 ease-brand",
        entered ? "opacity-100" : "opacity-0",
      )}
    >
      <div
        className={cn(
          "relative w-full max-w-[720px] overflow-hidden rounded-[18px] bg-surface transition-[translate,scale] duration-350 ease-brand",
          entered ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.98]",
        )}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="close case study"
          className="absolute top-4 right-4 z-[4] flex size-[42px] cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[rgba(15,15,18,0.55)] text-xl leading-none text-white shadow-[0_2px_12px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-[rotate,background-color,box-shadow] duration-200 ease-brand hover:rotate-90 hover:bg-[rgba(15,15,18,0.82)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
        >
          ×
        </button>
        <div className="max-h-[88vh] overflow-y-auto">
          <ModalHero caseStudy={shown} />
          <ModalContent caseStudy={shown} />
        </div>
      </div>
    </div>
  );
}

function ModalHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const [loaded, setLoaded] = useState(false);
  const { image, name } = caseStudy;
  return (
    <div className={cn("relative flex aspect-[16/7] items-center justify-center bg-soft text-white")}>
      {!loaded && <span aria-hidden className="shimmer-layer absolute inset-0" />}
      <Image
        src={image.src}
        alt={`${name} website`}
        width={image.width}
        height={image.height}
        sizes="(max-width: 768px) 92vw, 720px"
        onLoad={() => setLoaded(true)}
        className={cn(
          // always cover from the top — `image.contain` letterboxes only the
          // slider thumbnail, in the modal it would shrink the shot
          "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-brand",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

function BlockHeading({ text }: { text: Bi }) {
  const { t } = useLang();
  return <h3 className="mb-[7px] font-mono text-[13px] font-normal text-muted">{t(text)}</h3>;
}

function StatGrid({ stats }: { stats: readonly CaseStat[] }) {
  const { t } = useLang();
  return (
    <div className="mt-2 grid grid-cols-3 gap-4 max-md:grid-cols-1">
      {stats.map((stat) => (
        <div key={stat.big} className="rounded-xl border border-hair px-4 py-[18px] text-center">
          <div className="text-2xl font-extrabold tracking-[-0.01em] text-blue">{stat.big}</div>
          <div className="mt-1.5 text-[12.5px] text-muted">{t(stat.small)}</div>
        </div>
      ))}
    </div>
  );
}

function Block({ children }: { children: ReactNode }) {
  return <div className="mb-[22px]">{children}</div>;
}

function ModalContent({ caseStudy }: { caseStudy: CaseStudy }) {
  const { t } = useLang();
  return (
    <div className="p-[34px]">
      <div className="mb-5 flex flex-wrap gap-2">
        {caseStudy.tags.map((tag) => (
          <Chip key={tag.en} text={tag} />
        ))}
      </div>
      <h2 id="case-modal-title" className="mb-1.5 text-[clamp(26px,4vw,34px)] font-extrabold tracking-[-0.02em]">
        {caseStudy.name}
      </h2>
      {caseStudy.url && caseStudy.href && (
        <a
          href={caseStudy.href}
          target="_blank"
          rel="noopener"
          className="mb-[26px] inline-block font-mono text-sm text-blue-text hover:underline"
        >
          {caseStudy.url}
        </a>
      )}

      <Block>
        <BlockHeading text={CHALLENGE} />
        <p className="text-base text-ink">{t(caseStudy.challenge)}</p>
      </Block>

      <Block>
        <BlockHeading text={SOLUTION} />
        <p className="text-base text-ink">{t(caseStudy.solution)}</p>
      </Block>

      <Block>
        <BlockHeading text={WHAT_WE_BUILT} />
        <ul className="mt-1">
          {caseStudy.highlights.map((item) => (
            <li
              key={item.en}
              className="relative mb-2 ps-5 text-[15.5px] leading-[1.65] text-ink before:absolute before:start-0.5 before:top-2.5 before:size-1.5 before:rounded-full before:bg-blue"
            >
              {t(item)}
            </li>
          ))}
        </ul>
      </Block>

      <Block>
        <BlockHeading text={PROJECT_DETAILS} />
        <div className="mt-2 grid grid-cols-2 gap-x-3.5 gap-y-2.5 max-sm:grid-cols-1">
          {caseStudy.specs.map((spec) => (
            <div key={spec.k.en} className="rounded-xl border border-hair px-3.5 py-3">
              <div className="mb-1 font-mono text-[11.5px] lowercase text-muted">{t(spec.k)}</div>
              <div className="text-[14.5px] font-semibold text-ink">{t(spec.v)}</div>
            </div>
          ))}
        </div>
      </Block>

      {caseStudy.perf && (
        <Block>
          <BlockHeading text={PERFORMANCE} />
          <StatGrid stats={caseStudy.perf.stats} />
          <p className="mt-2.5 font-mono text-[11.5px] text-muted">{t(caseStudy.perf.note)}</p>
        </Block>
      )}

      <Block>
        <BlockHeading text={RESULTS} />
        <StatGrid stats={caseStudy.results} />
      </Block>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3.5 border-t border-hair pt-6">
        <p className="text-[15px] text-muted">
          {t(bi("want results like these? let's talk about your project.", "تريد نتائج كهذه؟ لنتحدث عن مشروعك."))}
        </p>
        <ButtonLink href={CONTACT.bookCall} target="_blank" rel="noopener" shine withArrow>
          {t(bi("book a call", "احجز مكالمة"))}
        </ButtonLink>
      </div>
    </div>
  );
}
