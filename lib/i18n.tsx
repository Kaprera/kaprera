"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import type { Bi } from "./bi";

export { bi } from "./bi";
export type { Bi } from "./bi";

export type Lang = "en" | "ar";

const STORAGE_KEY = "lang";

/* localStorage-backed language store (also syncs across tabs) */
const listeners = new Set<() => void>();

function readLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

function writeLang(next: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // storage unavailable (private mode) — the toggle still works via listeners
  }
  listeners.forEach((listener) => listener());
}

function subscribeLang(onChange: () => void): () => void {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

interface LangContextValue {
  lang: Lang;
  isAr: boolean;
  t: (text: Bi) => string;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  isAr: false,
  t: (text) => text.en,
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  // Server-renders English; the saved language applies right after hydration.
  // (The <html> lang/dir attributes are already set pre-paint by the boot script.)
  const lang = useSyncExternalStore(subscribeLang, readLang, () => "en" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggle = useCallback(() => writeLang(readLang() === "ar" ? "en" : "ar"), []);
  const t = useCallback((text: Bi) => (lang === "ar" ? text.ar : text.en), [lang]);

  return <LangContext.Provider value={{ lang, isAr: lang === "ar", t, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
