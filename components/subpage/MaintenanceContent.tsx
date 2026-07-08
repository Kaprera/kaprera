"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useAutoplay";
import { bi, useLang, type Bi } from "@/lib/i18n";
import { CONTACT } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";

const STUCK_AT = 99;

interface LogItem {
  done: boolean;
  text: Bi;
}

const LOG: readonly LogItem[] = [
  { done: true, text: bi("turned it off and on again", "أطفأناه وشغّلناه من جديد") },
  { done: true, text: bi("blamed the cache", "ألقينا اللوم على الكاش") },
  {
    done: true,
    text: bi("made the logo bigger, then smaller, then bigger", "كبّرنا الشعار، ثم صغّرناه، ثم كبّرناه"),
  },
  { done: false, text: bi("pixel perfection", "الكمال البكسلي") },
];

/** Full-viewport maintenance hero on the brand gradient — funny on purpose. */
export function MaintenanceContent() {
  const { t, isAr, toggle } = useLang();

  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden text-white">
      {/* brand gradient + slow drift, same layer the work showcase uses */}
      <span aria-hidden className="hero-bg hero-bg-intro" data-active="true" />

      {/* giant ghost status code */}
      <span
        aria-hidden
        className="keep-mono pointer-events-none absolute -bottom-[6%] end-[clamp(-30px,2vw,80px)] z-0 font-mono text-[clamp(180px,30vw,420px)] leading-none font-medium text-white/8 select-none"
      >
        503
      </span>

      <div className="wrap relative z-[1] flex items-center justify-between pt-7">
        <Image
          src="/branding/logos/kaprera-wordmark-light.webp"
          alt="kaprera"
          width={640}
          height={140}
          priority
          className="h-[30px] w-auto"
        />
        <button
          type="button"
          onClick={toggle}
          className="cursor-pointer rounded-full border border-white/32 bg-white/6 px-4 py-2 font-mono text-[13px] text-white/90 transition-colors duration-250 hover:bg-white/14"
        >
          {isAr ? "English" : "العربية"}
        </button>
      </div>

      <div className="wrap relative z-[1] flex flex-1 flex-col justify-center py-16">
        <span className="mb-[26px] inline-flex w-fit items-center gap-2.5 rounded-full border border-white/32 bg-white/6 px-3.5 py-[7px] font-mono text-[13px] text-white/90">
          <span className="size-[7px] animate-[caret-blink_1s_steps(1)_infinite] rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.22)]" />
          <span>
            <span className="keep-mono">503</span> {t(bi("/ down for maintenance", "/ متوقف للصيانة"))}
          </span>
        </span>

        <h1 className="mb-[22px] max-w-[17ch] text-[clamp(36px,6.5vw,72px)] leading-[1.04] font-black tracking-[-0.03em] lowercase">
          {t(bi("we saw one misaligned pixel. one.", "لمحنا بكسلًا واحدًا غير متراصف. واحدًا فقط."))}
        </h1>
        <p className="mb-9 max-w-[54ch] text-[clamp(16px,2.2vw,20px)] text-white/85">
          {t(
            bi(
              "so naturally the whole site is down while we fix it. we'll be back shortly — sharper than ever.",
              "فكان لا بدّ طبعًا من إيقاف الموقع بأكمله لإصلاحه. سنعود بعد قليل — أكثر أناقة من أي وقت.",
            ),
          )}
        </p>

        <div className="grid max-w-[880px] grid-cols-[1.1fr_0.9fr] items-stretch gap-5 max-md:grid-cols-1">
          <MaintenanceLog />
          <Progress />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3.5">
          <ButtonLink href={CONTACT.bookCall} target="_blank" rel="noopener" variant="inverse" shine withArrow>
            {t(bi("book a call", "احجز مكالمة"))}
          </ButtonLink>
          <ButtonLink href={`mailto:${CONTACT.email}`} variant="inverseGhost">
            {t(bi("email us", "راسلنا"))}
          </ButtonLink>
          <span className="font-mono text-[13px] text-white/70">
            {t(bi("yes, the buttons still work. we're down, not gone.", "نعم، الأزرار لا تزال تعمل. الموقع متوقف، لسنا مختفين."))}
          </span>
        </div>
      </div>

      <div className="wrap relative z-[1] pb-7">
        <p className="font-mono text-[12.5px] text-white/60">
          {t(
            bi(
              "if this is taking longer than expected, it's because it's going really well.",
              "إذا طالت المدة أكثر من المتوقع، فذلك لأن الأمور تسير على نحو ممتاز.",
            ),
          )}
        </p>
      </div>
    </main>
  );
}

function MaintenanceLog() {
  const { t } = useLang();
  return (
    <div className="rounded-[22px] border border-white/20 bg-white/10 p-7 backdrop-blur-[8px] max-md:p-5">
      <h2 className="mb-4 font-mono text-[12.5px] tracking-[0.14em] text-white/82 uppercase">
        {t(bi("maintenance log", "سجلّ الصيانة"))}
      </h2>
      <ul className="flex flex-col gap-2.5">
        {LOG.map((item) => (
          <li key={item.text.en} className="flex items-start gap-2.5 text-[15px] text-white/92">
            <span
              aria-hidden
              className="keep-mono mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-white/28 bg-white/10 font-mono text-[11px] leading-none"
            >
              {item.done ? "✓" : ""}
            </span>
            <span className={item.done ? "line-through decoration-white/45" : undefined}>{t(item.text)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Races to 99% and stays there. Like every deploy ever. */
function Progress() {
  const { t } = useLang();
  const reduce = usePrefersReducedMotion();
  const [counted, setCounted] = useState(0);
  // reduced motion skips the count-up and shows the punchline immediately
  const pct = reduce ? STUCK_AT : counted;
  const stuck = pct >= STUCK_AT;

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setCounted((p) => {
        const next = p + Math.max(1, Math.round((STUCK_AT - p) / 10));
        if (next >= STUCK_AT) clearInterval(id);
        return Math.min(next, STUCK_AT);
      });
    }, 130);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="flex flex-col justify-center rounded-[22px] border border-white/20 bg-white/10 p-7 backdrop-blur-[8px] max-md:p-5">
      <div className="mb-3 flex items-baseline justify-between font-mono text-[12.5px] text-white/82">
        <span className="tracking-[0.14em] uppercase">{t(bi("progress", "التقدّم"))}</span>
        <span className="keep-mono text-lg font-bold text-white" aria-hidden>
          {pct}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 overflow-hidden rounded-full bg-white/20"
      >
        <div
          className="h-full rounded-full bg-white transition-[width] duration-300 ease-brand"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-3 min-h-[2.6em] font-mono text-[12.5px] leading-[1.5] text-white/70">
        {stuck
          ? t(
              bi(
                "it's been at 99% for a while now. that's normal. that's the plan.",
                "عالق عند ٩٩٪ منذ فترة. هذا طبيعي. هذه هي الخطة.",
              ),
            )
          : t(bi("loading… smoothly, for now.", "جارٍ التحميل… بسلاسة، حتى الآن."))}
      </p>
    </div>
  );
}
