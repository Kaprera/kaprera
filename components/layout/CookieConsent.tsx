"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { bi, useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "cookie-consent";

const MESSAGE = bi(
  "We use cookies to enhance your experience and analyse site traffic. See our",
  "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة الموقع. اطّلع على",
);
const POLICY = bi("privacy policy", "سياسة الخصوصية");
const ACCEPT = bi("accept all", "قبول الكل");
const DECLINE = bi("necessary only", "الضرورية فقط");

export function CookieConsent() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    // two frames so the slide-in transition actually plays
    const id = requestAnimationFrame(() => {
      setDismissed(false);
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (dismissed) return null;

  // 'all' = analytics/marketing allowed · 'necessary' = strictly necessary only
  const dismiss = (value: "all" | "necessary") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // storage unavailable — still dismiss for this view
    }
    // let analytics scripts react without a page reload
    document.dispatchEvent(new CustomEvent("cookieconsent", { detail: value }));
    setVisible(false);
    setTimeout(() => setDismissed(true), 500);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="cookie consent"
      className={cn(
        "fixed inset-x-4 bottom-4 z-[80] mx-auto flex max-w-[540px] flex-col gap-3.5 rounded-(--radius-card) border border-hair bg-surface p-[18px_20px] text-ink shadow-[0_16px_50px_rgba(0,0,0,0.16)] transition-[translate,opacity] duration-500 ease-brand motion-reduce:translate-y-0",
        visible ? "translate-y-0 opacity-100" : "translate-y-[160%] opacity-0",
      )}
    >
      <p className="text-sm leading-[1.6] text-muted">
        {t(MESSAGE)}{" "}
        <Link href="/privacy-policy" className="font-semibold text-blue-text hover:underline">
          {t(POLICY)}
        </Link>
        .
      </p>
      <div className="flex justify-end gap-2.5 rtl:justify-start">
        <button
          type="button"
          onClick={() => dismiss("necessary")}
          className="cursor-pointer rounded-full border border-hair px-[22px] py-[9px] text-sm font-semibold lowercase text-ink transition-[border-color,color,translate] duration-200 hover:-translate-y-px hover:border-blue hover:text-blue-text max-[480px]:flex-1"
        >
          {t(DECLINE)}
        </button>
        <button
          type="button"
          onClick={() => dismiss("all")}
          className="cursor-pointer rounded-full bg-blue-dark px-[22px] py-[9px] text-sm font-semibold lowercase text-white transition-[background-color,translate] duration-200 hover:-translate-y-px hover:bg-[#00719c] max-[480px]:flex-1"
        >
          {t(ACCEPT)}
        </button>
      </div>
    </div>
  );
}
