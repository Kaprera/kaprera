"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useAutoplay, usePrefersReducedMotion } from "@/hooks/useAutoplay";
import { useHydrated } from "@/hooks/useHydrated";
import { bi, useLang, type Bi } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { CONTACT } from "@/lib/site";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { SliderDots } from "@/components/ui/SliderDots";

const AUTO_MS = 4000;
const START_PROJECT = bi("start a project", "ابدأ مشروعك");

interface Service {
  num: string;
  eyebrow: Bi;
  headline: Bi;
  statement: Bi;
  detail: Bi;
  chips: readonly Bi[];
  bgClass: string;
  /** mid-tone of the panel gradient so the playing dot matches it */
  fill: string;
  icon: (size: number) => ReactNode;
}

const iconProps = (size: number, strokeWidth: number) =>
  ({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  }) as const;

const SERVICES: readonly Service[] = [
  {
    num: "01",
    eyebrow: bi("01 / what we do", "٠١ / ماذا نقدّم"),
    headline: bi("ui / ux design", "تصميم الواجهات وتجربة المستخدم"),
    statement: bi(
      "intuitive, on-brand interfaces that convert — from research to polished design systems.",
      "واجهات بديهية ومتوافقة مع هويتك تحقّق التحويل — من البحث إلى أنظمة تصميم متقنة.",
    ),
    detail: bi(
      "User-centered interfaces that are intuitive, on-brand, and built to convert — every flow researched, prototyped, and refined.",
      "واجهات تركّز على المستخدم، بديهية ومتوافقة مع هويتك ومصمّمة للتحويل — كل مسار مدروس ومُنمذج ومصقول.",
    ),
    chips: [
      bi("research", "بحث"),
      bi("wireframes", "نماذج أولية"),
      bi("prototyping", "نماذج تفاعلية"),
      bi("design systems", "أنظمة تصميم"),
    ],
    bgClass: "svc-bg-1",
    fill: "#008cc1",
    icon: (size) => (
      <svg {...iconProps(size, 1.8)}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: "02",
    eyebrow: bi("02 / what we do", "٠٢ / ماذا نقدّم"),
    headline: bi("web development", "تطوير الويب"),
    statement: bi(
      "fast, scalable, high-performance websites — clean code and strong core-web-vitals.",
      "مواقع سريعة وقابلة للتوسّع وعالية الأداء — كود نظيف ومؤشرات أداء قوية.",
    ),
    detail: bi(
      "Fast, responsive, high-performance websites engineered to scale — clean architecture and rock-solid performance.",
      "مواقع سريعة ومتجاوبة وعالية الأداء مصمّمة للتوسّع — بنية نظيفة وأداء صلب.",
    ),
    chips: [
      bi("clean code", "كود نظيف"),
      bi("responsive", "متجاوب"),
      bi("core web vitals", "مؤشرات الأداء"),
      bi("scalable", "قابل للتوسّع"),
    ],
    bgClass: "svc-bg-2",
    fill: "#4a37c9",
    icon: (size) => (
      <svg {...iconProps(size, 1.8)}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    num: "03",
    eyebrow: bi("03 / what we do", "٠٣ / ماذا نقدّم"),
    headline: bi("seo", "تحسين محركات البحث"),
    statement: bi(
      "technical & on-page seo that grows organic visibility — content that ranks.",
      "تحسين تقني وداخلي يزيد الظهور العضوي — محتوى يتصدّر نتائج البحث.",
    ),
    detail: bi(
      "Technical and on-page SEO that grows organic visibility over time — structured data, fast vitals, and content that ranks.",
      "تحسين تقني وداخلي لمحركات البحث يزيد الظهور العضوي مع الوقت — بيانات منظّمة وأداء سريع ومحتوى يتصدّر النتائج.",
    ),
    chips: [
      bi("keyword strategy", "استراتيجية الكلمات"),
      bi("technical seo", "سيو تقني"),
      bi("structured data", "بيانات منظّمة"),
      bi("content", "المحتوى"),
    ],
    bgClass: "svc-bg-3",
    fill: "#0c9b86",
    icon: (size) => (
      <svg {...iconProps(size, 1.8)}>
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M8 11h6M11 8v6" />
      </svg>
    ),
  },
];

/** Full-panel colour-morphing services carousel. */
export function ServicesSlider() {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [stageInView, setStageInView] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const advance = useCallback(() => setIndex((i) => (i + 1) % SERVICES.length), []);
  const autoplay = useAutoplay(AUTO_MS, advance, !reduce);

  const go = useCallback(
    (n: number) => {
      setIndex(((n % SERVICES.length) + SERVICES.length) % SERVICES.length);
      autoplay.reset();
    },
    [autoplay],
  );

  // staggered content reveal starts once the stage scrolls into view
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStageInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // touch swipe
  const touch = useRef({ startX: 0, deltaX: 0, active: false });
  const onTouchStart = (event: React.TouchEvent) => {
    touch.current = { startX: event.touches[0].clientX, deltaX: 0, active: true };
    autoplay.pause();
  };
  const onTouchMove = (event: React.TouchEvent) => {
    if (touch.current.active) touch.current.deltaX = event.touches[0].clientX - touch.current.startX;
  };
  const onTouchEnd = () => {
    const { active, deltaX } = touch.current;
    if (active && Math.abs(deltaX) > 50) go(deltaX < 0 ? index + 1 : index - 1);
    touch.current.active = false;
    autoplay.resume();
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="our services"
      className="relative mt-[30px]"
      onFocus={autoplay.pause}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) autoplay.resume();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(index - 1);
        if (event.key === "ArrowRight") go(index + 1);
      }}
    >
      <div
        ref={stageRef}
        className="relative isolate overflow-hidden rounded-[28px] shadow-[0_50px_100px_-45px_rgba(0,0,0,0.55)]"
      >
        <div aria-hidden>
          {SERVICES.map((service, i) => (
            <span key={service.num} className={cn("svc-bg", service.bgClass)} data-active={index === i} />
          ))}
          {/* slow drifting orb for life */}
          <span className="pointer-events-none absolute -top-[120px] start-[40%] size-[420px] animate-[svc-orb_16s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_70%)] blur-[40px]" />
        </div>

        <div className="relative z-[1] overflow-hidden">
          <div
            dir="ltr"
            className="flex transition-transform duration-[850ms] ease-brand will-change-transform"
            style={{ transform: `translateX(-${index * 100}%)` }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {SERVICES.map((service, i) => (
              <ServicePanel
                key={service.num}
                service={service}
                position={`${i + 1} of ${SERVICES.length}`}
                active={index === i}
                animate={stageInView && index === i}
              />
            ))}
          </div>
        </div>

        <StageArrow direction="prev" onClick={() => go(index - 1)} />
        <StageArrow direction="next" onClick={() => go(index + 1)} />
      </div>

      <div className="mt-7 flex items-center justify-center gap-[18px]">
        <SliderDots
          count={SERVICES.length}
          index={index}
          epoch={autoplay.epoch}
          paused={autoplay.paused}
          durationMs={AUTO_MS}
          onSelect={go}
          label="services"
          itemLabel="go to service"
          fillColor={SERVICES[index].fill}
        />
        <div className="font-mono text-[13px] text-muted">
          <b className="keep-mono font-bold text-ink">{String(index + 1).padStart(2, "0")}</b>
          {" / "}
          {String(SERVICES.length).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

function StageArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const prev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={prev ? "previous service" : "next service"}
      className={cn(
        "group absolute z-[3] grid size-[54px] cursor-pointer place-items-center rounded-full border border-white/32 bg-white/16 text-white backdrop-blur-[6px] transition-[background-color] duration-300 hover:bg-white/32 focus-visible:outline-white",
        "top-1/2 -translate-y-1/2 max-md:top-auto max-md:bottom-[22px] max-md:size-12 max-md:translate-y-0",
        prev ? "start-5" : "end-5",
      )}
    >
      {prev ? (
        <ChevronLeftIcon
          size={22}
          className="transition-[translate,scale] duration-300 ease-brand group-hover:-translate-x-[3px] rtl:-scale-x-100 rtl:group-hover:translate-x-[3px] max-md:group-hover:translate-x-0"
        />
      ) : (
        <ChevronRightIcon
          size={22}
          className="transition-[translate,scale] duration-300 ease-brand group-hover:translate-x-[3px] rtl:-scale-x-100 rtl:group-hover:-translate-x-[3px] max-md:group-hover:translate-x-0"
        />
      )}
    </button>
  );
}

function Staggered({ delay, animate, children }: { delay: number; animate: boolean; children: ReactNode }) {
  const hydrated = useHydrated();
  return (
    <div
      style={{ "--ad": `${delay}s` } as CSSProperties}
      className={cn(
        "transition-[opacity,translate] duration-750 ease-brand [transition-delay:var(--ad)]",
        // pre-hydration the server HTML stays visible — on slow connections
        // the panel copy must not wait for the JS bundle to fade in
        !hydrated || animate ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100",
      )}
    >
      {children}
    </div>
  );
}

function ServicePanel({
  service,
  position,
  active,
  animate,
}: {
  service: Service;
  position: string;
  active: boolean;
  animate: boolean;
}) {
  const { t, isAr } = useLang();
  return (
    <article
      dir={isAr ? "rtl" : "ltr"}
      role="group"
      aria-roledescription="slide"
      aria-label={`${position} — ${service.headline.en}`}
      inert={active ? undefined : true}
      className="relative grid min-h-[440px] min-w-full flex-[0_0_100%] grid-cols-[1.12fr_0.88fr] items-center gap-[clamp(28px,5vw,64px)] px-[clamp(66px,7vw,104px)] py-[clamp(34px,4vw,56px)] text-white rtl:text-right max-md:min-h-0 max-md:grid-cols-1 max-md:gap-5 max-md:px-5 max-md:pt-7 max-md:pb-[76px]"
    >
      {/* giant ghost numeral */}
      <span
        aria-hidden
        className="keep-mono pointer-events-none absolute -bottom-[8%] end-[clamp(18px,5vw,60px)] font-mono text-[clamp(170px,30vw,400px)] leading-none font-medium text-white/10 select-none max-md:top-[-4%] max-md:bottom-auto max-md:text-[clamp(150px,46vw,280px)] max-md:opacity-90"
      >
        {service.num}
      </span>

      <div className="relative z-[2]">
        <Staggered delay={0.05} animate={animate}>
          <span className="inline-flex items-center gap-[13px] font-mono text-[12.5px] tracking-[0.14em] text-white/82 uppercase">
            <span className="grid size-[42px] place-items-center rounded-xl border border-white/22 bg-white/15 text-white max-md:size-9 max-md:rounded-[10px]">
              {service.icon(20)}
            </span>
            <span>{t(service.eyebrow)}</span>
          </span>
        </Staggered>
        <Staggered delay={0.14} animate={animate}>
          <h3 className="mt-[18px] mb-4 text-[clamp(40px,5.8vw,74px)] leading-[0.98] font-extrabold tracking-[-0.035em] lowercase [text-shadow:0_14px_40px_rgba(0,0,0,0.18)] max-md:mt-2.5 max-md:mb-2.5 max-md:text-4xl [html[lang=ar]_&]:text-[clamp(34px,4.2vw,56px)] [html[lang=ar]_&]:leading-[1.15] [html[lang=ar]_&]:tracking-[-0.01em]">
            {t(service.headline)}
          </h3>
        </Staggered>
        <Staggered delay={0.2} animate={animate}>
          <p className="mb-7 max-w-[38ch] text-[clamp(15px,1.5vw,18px)] leading-[1.55] text-white/88 max-md:mb-4 max-md:max-w-none">
            {t(service.statement)}
          </p>
        </Staggered>
        <Staggered delay={0.26} animate={animate}>
          <a
            href={CONTACT.bookCall}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-[26px] py-[15px] text-[15px] font-bold text-[#0a0a0a] transition-[translate,box-shadow] duration-350 ease-brand hover:-translate-y-[3px] hover:shadow-[0_18px_38px_rgba(0,0,0,0.30)] motion-reduce:hover:translate-y-0 max-md:px-5 max-md:py-3"
          >
            <span>{t(START_PROJECT)}</span>
            <ArrowRightIcon
              size={18}
              className="transition-[translate,scale] duration-350 ease-brand group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
            />
          </a>
        </Staggered>
      </div>

      <div className="relative z-[2]">
        <Staggered delay={0.22} animate={animate}>
          <div className="mb-[22px] rounded-[22px] border border-white/20 bg-white/10 p-8 backdrop-blur-[8px] max-md:mb-3 max-md:p-4">
            <div className="mb-[22px] grid size-20 place-items-center rounded-[20px] border border-white/24 bg-white/18 text-white max-md:mb-2.5 max-md:size-11 max-md:rounded-xl">
              {service.icon(34)}
            </div>
            <p className="text-[15.5px] leading-[1.62] text-white/92 max-md:text-sm">{t(service.detail)}</p>
          </div>
        </Staggered>
        <Staggered delay={0.3} animate={animate}>
          <div className="flex flex-wrap gap-[9px]">
            {service.chips.map((chip) => (
              <span
                key={chip.en}
                className="rounded-full border border-white/22 bg-white/12 px-3.5 py-[7px] font-mono text-xs text-white"
              >
                {t(chip)}
              </span>
            ))}
          </div>
        </Staggered>
      </div>
    </article>
  );
}
