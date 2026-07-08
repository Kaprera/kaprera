import { Cairo, Inter, JetBrains_Mono } from "next/font/google";

// Only the latin files are preloaded — every other subset (latin-ext included)
// still gets its unicode-range @font-face and downloads on demand if a glyph
// ever needs it. Site copy is plain English + Arabic, so preloading latin-ext
// was ~100 KB of critical-path fonts for glyphs that never render.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
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
