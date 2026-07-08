"use client";

import { bi, useLang } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/Button";

/** Branded 404 hero: giant ghost numeral, lowercase headline, and two ways out. */
export function NotFoundContent() {
  const { t } = useLang();
  return (
    <main className="subpage-hero-tint relative flex min-h-svh items-center overflow-hidden pt-[78px]">
      <span
        aria-hidden
        className="keep-mono pointer-events-none absolute -bottom-[6%] end-[clamp(-30px,2vw,80px)] font-mono text-[clamp(180px,30vw,420px)] leading-none font-medium text-blue/8 select-none"
      >
        404
      </span>
      <div className="wrap relative z-[1] py-20">
        <span className="mb-[18px] inline-flex items-center gap-[9px] font-mono text-[13px] tracking-[0.04em] lowercase text-muted">
          <span className="inline-block size-[7px] rounded-full bg-blue" aria-hidden />
          <span>
            <span className="keep-mono">404</span> {t(bi("/ page not found", "/ الصفحة غير موجودة"))}
          </span>
        </span>
        <h1 className="mb-[18px] max-w-[16ch] text-[clamp(38px,7vw,72px)] leading-[1.04] font-black tracking-[-0.03em] lowercase">
          {t(bi("this page doesn't exist.", "هذه الصفحة غير موجودة."))}
        </h1>
        <p className="mb-9 max-w-[52ch] text-lg text-muted">
          {t(
            bi(
              "the page you're looking for was moved, renamed, or never existed. let's get you back on track.",
              "الصفحة التي تبحث عنها نُقلت أو أعيدت تسميتها أو لم تكن موجودة أصلًا. لنعدك إلى المسار الصحيح.",
            ),
          )}
        </p>
        <div className="flex flex-wrap gap-3.5">
          <ButtonLink href="/" shine withArrow>
            {t(bi("back to home", "العودة إلى الرئيسية"))}
          </ButtonLink>
          <ButtonLink href="/#contact" variant="ghost">
            {t(bi("contact us", "تواصل معنا"))}
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
