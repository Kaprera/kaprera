"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useAutoplay, usePrefersReducedMotion } from "@/hooks/useAutoplay";
import { CASES, type CaseStudy } from "@/lib/cases";
import { bi, useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { onPreloaderDone } from "@/lib/preloader-signal";
import { CONTACT } from "@/lib/site";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { SliderDots } from "@/components/ui/SliderDots";
import { CaseModal } from "./CaseModal";

const AUTO_MS = 7000;
const SLIDE_COUNT = CASES.length + 1; // intro + case studies

const HEADLINE = bi(
  "stronger digital presence for startups & scaleups.",
  "حضور رقمي أقوى للشركات الناشئة والمتنامية.",
);
const SUBLINE = bi(
  "we design websites and brands that turn audiences into customers.",
  "نصمّم مواقع وعلامات تجارية تحوّل الجمهور إلى عملاء.",
);
const EYEBROW = bi("digital agency · beirut, lebanon", "وكالة رقمية · بيروت، لبنان");
const OUR_WORK = bi("/ our work", "/ أعمالنا");
const VIEW_CASE = bi("view case study", "عرض دراسة الحالة");

/** Full-width colored hero: slide 1 is the intro, slides 2+ are the case studies. */
export function WorkShowcase() {
  const { t, isAr } = useLang();
  const [index, setIndex] = useState(0);
  const [openCase, setOpenCase] = useState<CaseStudy | null>(null);

  const advance = useCallback(() => setIndex((i) => (i + 1) % SLIDE_COUNT), []);
  const autoplay = useAutoplay(AUTO_MS, advance, !openCase);

  const go = useCallback(
    (n: number) => {
      setIndex(((n % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
      autoplay.reset();
    },
    [autoplay],
  );

  const dir = isAr ? "rtl" : "ltr";

  return (
    <section className="relative overflow-hidden pt-[150px] pb-14 text-white max-md:pt-[138px] max-md:pb-[50px]">
      {/* cross-fading full-width backgrounds, one per slide */}
      <div className="absolute inset-0" aria-hidden>
        <span className={cn("hero-bg hero-bg-intro")} data-active={index === 0} />
        {CASES.map((caseStudy, i) => (
          <span key={caseStudy.key} className={cn("hero-bg", caseStudy.heroBgClass)} data-active={index === i + 1} />
        ))}
      </div>

      <div className="wrap relative z-[1]">
        <div
          id="work"
          className="scroll-mt-24"
          onFocus={autoplay.pause}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) autoplay.resume();
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") go(index - 1);
            if (event.key === "ArrowRight") go(index + 1);
          }}
        >
          <div className="overflow-hidden">
            <div
              dir="ltr" /* keeps slide order stable in rtl; content restores its own direction */
              className="flex items-stretch transition-transform duration-600 ease-brand will-change-transform"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              <div
                dir={dir}
                role="group"
                aria-roledescription="slide"
                aria-label={`1 of ${SLIDE_COUNT} — intro`}
                inert={index !== 0 ? true : undefined}
                className="relative min-w-full flex-[0_0_100%] overflow-hidden px-0.5"
              >
                <IntroSlide onSeeWork={() => go(1)} />
              </div>

              {CASES.map((caseStudy, i) => (
                <div
                  key={caseStudy.key}
                  dir={dir}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 2} of ${SLIDE_COUNT} — ${caseStudy.name}`}
                  inert={index !== i + 1 ? true : undefined}
                  className="min-w-full flex-[0_0_100%] overflow-hidden px-0.5"
                >
                  <div className="grid h-full grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] content-center items-center gap-12 pt-1.5 pb-1 max-md:grid-cols-1 max-md:gap-6">
                    <CaseShot caseStudy={caseStudy} onOpen={() => setOpenCase(caseStudy)} />
                    <div>
                      <span className="mb-3.5 inline-flex items-center gap-2 font-mono text-[13px] lowercase text-white/85">
                        <span className="keep-mono text-white">{String(i + 2).padStart(2, "0")}</span>
                        <span>{t(OUR_WORK)}</span>
                      </span>
                      <h2 className="mb-4 text-[clamp(30px,5vw,52px)] leading-[1.04] font-black tracking-[-0.03em] max-md:text-[clamp(28px,8vw,40px)]">
                        {caseStudy.name}
                      </h2>
                      <p className="mb-[22px] max-w-[46ch] text-[clamp(16px,2.2vw,19px)] text-white/85">
                        {t(caseStudy.blurb)}
                      </p>
                      <div className="mb-[26px] flex flex-wrap gap-2">
                        {caseStudy.tags.map((tag) => (
                          <Chip key={tag.en} text={tag} light />
                        ))}
                      </div>
                      <Button variant="inverse" onClick={() => setOpenCase(caseStudy)} aria-haspopup="dialog">
                        {t(VIEW_CASE)}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 flex items-center gap-4 border-t border-white/28 pt-7 max-md:mt-10">
            <SliderArrow direction="prev" onClick={() => go(index - 1)} />
            <SliderArrow direction="next" onClick={() => go(index + 1)} />
            <SliderDots
              count={SLIDE_COUNT}
              index={index}
              epoch={autoplay.epoch}
              paused={autoplay.paused}
              durationMs={AUTO_MS}
              onSelect={go}
              label="our work slides"
              itemLabel="go to slide"
              light
            />
            <div className="ms-auto font-mono text-[13px] text-white/80">
              <b className="keep-mono font-bold text-white">{String(index + 1).padStart(2, "0")}</b>
              {" / "}
              {String(SLIDE_COUNT).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      <CaseModal caseStudy={openCase} onClose={() => setOpenCase(null)} />
    </section>
  );
}

function SliderArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "previous slide" : "next slide"}
      className="flex size-[46px] cursor-pointer items-center justify-center rounded-full border border-hair bg-surface text-ink transition-[border-color,color,translate,background-color] duration-250 hover:-translate-y-0.5 hover:border-blue hover:text-blue"
    >
      {direction === "prev" ? (
        <ChevronLeftIcon className="rtl:-scale-x-100" />
      ) : (
        <ChevronRightIcon className="rtl:-scale-x-100" />
      )}
    </button>
  );
}

function IntroSlide({ onSeeWork }: { onSeeWork: () => void }) {
  const { t, lang } = useLang();
  return (
    <>
      <span className="mb-[26px] inline-flex items-center gap-2.5 rounded-full border border-white/32 bg-white/6 px-3.5 py-[7px] font-mono text-[13px] text-white/90">
        <span className="size-[7px] rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.22)]" />
        <span>{t(EYEBROW)}</span>
      </span>
      <TypewriterHeadline key={lang} text={t(HEADLINE)} />
      <p className="mb-[38px] max-w-[560px] text-[clamp(17px,2.4vw,21px)] text-white/85">{t(SUBLINE)}</p>
      <div className="flex flex-wrap gap-3.5">
        <ButtonLink href={CONTACT.bookCall} target="_blank" rel="noopener" variant="inverse" shine withArrow>
          {t(bi("book a call", "احجز مكالمة"))}
        </ButtonLink>
        <Button variant="inverseGhost" onClick={onSeeWork}>
          {t(bi("see our work", "شاهد أعمالنا"))}
        </Button>
      </div>

      {/* vertical kaprera-mark pattern on the inline-end side */}
      <div
        aria-hidden
        className="absolute inset-y-0 end-[5%] flex animate-[float-y_12s_ease-in-out_infinite] flex-col items-center justify-center gap-5 max-md:hidden"
      >
        <i className="h-[26px] w-0.5 rounded-[1px] bg-white opacity-35" />
        <i className="hp-mark aspect-[913/793] w-[clamp(84px,9.5vw,124px)] opacity-16" />
        <i className="size-2.5 rounded-full bg-white opacity-22" />
        <i className="hp-mark aspect-[913/793] w-[clamp(84px,9.5vw,124px)] rotate-180 opacity-30" />
        <i className="size-2.5 rounded-full bg-white opacity-38" />
        <i className="hp-mark aspect-[913/793] w-[clamp(84px,9.5vw,124px)] opacity-48" />
        <i className="h-[26px] w-0.5 rounded-[1px] bg-white opacity-35" />
      </div>
    </>
  );
}

/**
 * Types the headline over an invisible ghost of the final text, so the full
 * height is reserved from the start — no layout shift and no reflow reads.
 * Typing begins only once the intro preloader has cleared.
 */
function TypewriterHeadline({ text }: { text: string }) {
  const reduce = usePrefersReducedMotion();
  const [started, setStarted] = useState(false);
  const [typed, setTyped] = useState("");
  // reduced motion shows the full headline immediately, no typing state needed
  const display = reduce ? text : typed;
  const done = display.length >= text.length;

  useEffect(() => onPreloaderDone(() => setStarted(true)), []);

  useEffect(() => {
    if (!started || reduce) return;
    let i = 0;
    const delayFor = (ch: string) => {
      if (ch === "," || ch === "،") return 320;
      if (ch === "." || ch === "&" || ch === "—") return 300;
      if (ch === " ") return 120;
      return 75;
    };
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i < text.length) timer = setTimeout(step, delayFor(text[i - 1]));
    };
    timer = setTimeout(step, 0);
    return () => clearTimeout(timer);
  }, [started, text, reduce]);

  const caret = (
    <span
      aria-hidden
      className="ms-2 inline-block h-[0.82em] w-1 animate-[caret-blink_1s_steps(1)_infinite] rounded-[2px] bg-white align-baseline"
    />
  );

  return (
    <h1 className="relative mb-[26px] max-w-[13ch] text-[clamp(40px,8vw,84px)] leading-[1.02] font-black tracking-[-0.03em] lowercase">
      {done ? (
        <>
          {text}
          {caret}
        </>
      ) : (
        <>
          <span aria-hidden className="invisible">
            {text}
          </span>
          <span className="absolute inset-0">
            {display}
            {caret}
          </span>
          <span className="sr-only">{text}</span>
        </>
      )}
    </h1>
  );
}

function CaseShot({ caseStudy, onOpen }: { caseStudy: CaseStudy; onOpen: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const { image, name } = caseStudy;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`open ${name} case study`}
      className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-(--radius-card) border border-white/70 bg-white shadow-[0_1px_1px_rgba(4,18,38,0.10),0_10px_20px_-8px_rgba(4,18,38,0.28),0_26px_48px_-18px_rgba(4,18,38,0.38)] transition-[translate,box-shadow,border-color] duration-350 ease-brand hover:-translate-y-1.5 hover:border-white hover:shadow-[0_2px_4px_rgba(4,18,38,0.12),0_16px_30px_-8px_rgba(4,18,38,0.32),0_40px_68px_-20px_rgba(4,18,38,0.44)] motion-reduce:hover:translate-y-0"
    >
      {!loaded && <span aria-hidden className="shimmer-layer absolute inset-0" />}
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 900px) 92vw, 550px"
        onLoad={() => setLoaded(true)}
        className={cn(
          "relative h-full w-full transition-opacity duration-500 ease-brand",
          image.contain ? "object-contain p-3" : "object-cover object-top",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </button>
  );
}
