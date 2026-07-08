import { Cairo, Inter, JetBrains_Mono } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jbm",
  display: "swap",
});

// Heavy Arabic family: declared but not preloaded, so the browser only fetches
// it once Arabic glyphs actually render (after the visitor switches language).
export const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
  preload: false,
});
