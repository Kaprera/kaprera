"use client";

import { Fragment } from "react";
import { bi, useLang, type Bi } from "@/lib/i18n";

const INDUSTRIES: readonly Bi[] = [
  bi("ICT & Technology", "تقنية المعلومات والاتصالات"),
  bi("Education", "التعليم"),
  bi("NGOs", "المنظمات غير الحكومية"),
  bi("Advisory", "الاستشارات"),
  bi("Management & IT Consultancy", "الإدارة واستشارات تقنية المعلومات"),
];

export function Industries() {
  const { t } = useLang();
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-[22px] gap-y-3.5">
      <span className="font-mono text-[13px] text-muted">{t(bi("industries we serve —", "القطاعات التي نخدمها —"))}</span>
      {INDUSTRIES.map((industry, i) => (
        <Fragment key={industry.en}>
          <span className="text-sm text-ink">{t(industry)}</span>
          {i < INDUSTRIES.length - 1 && (
            <span aria-hidden className="text-hair">
              ·
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
