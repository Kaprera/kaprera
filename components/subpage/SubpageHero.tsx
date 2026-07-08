"use client";

import type { ReactNode } from "react";
import { useLang, type Bi } from "@/lib/i18n";

interface SubpageHeroProps {
  eyebrow: Bi;
  title: Bi;
  lead: Bi;
  meta?: ReactNode;
}

export function SubpageHero({ eyebrow, title, lead, meta }: SubpageHeroProps) {
  const { t } = useLang();
  return (
    <section className="subpage-hero-tint border-b border-hair pt-[70px] pb-10">
      <div className="wrap">
        <span className="mb-[18px] inline-flex items-center gap-[9px] font-mono text-[13px] tracking-[0.04em] lowercase text-muted">
          <span className="inline-block size-[7px] rounded-full bg-blue" aria-hidden />
          <span>{t(eyebrow)}</span>
        </span>
        <h1 className="mb-[18px] text-[clamp(34px,6vw,56px)] leading-[1.05] font-extrabold tracking-[-0.02em]">
          {t(title)}
        </h1>
        <p className="max-w-[780px] text-lg text-muted">{t(lead)}</p>
        {meta && <p className="mt-[22px] font-mono text-[13px] text-muted">{meta}</p>}
      </div>
    </section>
  );
}
