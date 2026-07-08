"use client";

import { useLang, type Bi } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface SectionIntroProps {
  num: string;
  label: Bi;
  title: Bi;
  lede?: Bi;
}

/** Section header: numbered mono label, lowercase title, optional lede. */
export function SectionIntro({ num, label, title, lede }: SectionIntroProps) {
  const { t } = useLang();
  return (
    <>
      <Reveal>
        <SectionLabel num={num} text={label} className="mb-[22px]" />
      </Reveal>
      <Reveal as="h2" className="mb-4 text-[clamp(30px,5vw,48px)] leading-[1.05] font-extrabold tracking-[-0.02em] lowercase">
        {t(title)}
      </Reveal>
      {lede && (
        <Reveal as="p" className="max-w-[560px] text-lg text-muted">
          {t(lede)}
        </Reveal>
      )}
    </>
  );
}
