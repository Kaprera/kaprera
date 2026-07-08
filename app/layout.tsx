import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { ServiceWorkerRegister } from "@/components/layout/ServiceWorkerRegister";
import { LangProvider } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { cairo, inter, jetBrainsMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "kaprera — digital agency in Beirut | web design, development & SEO",
    template: "%s — kaprera",
  },
  description:
    "kaprera is a digital agency in Beirut, Lebanon. We design websites and brands, build fast high-performance sites, and grow organic visibility with SEO — turning audiences into customers.",
  keywords: [
    "kaprera",
    "digital agency",
    "digital agency Lebanon",
    "digital agency Beirut",
    "web design Lebanon",
    "web development Beirut",
    "UI/UX design",
    "SEO Lebanon",
    "branding",
    "landing pages",
    "website design",
    "startups",
    "scaleups",
  ],
  authors: [{ name: "kaprera", url: SITE_URL }],
  applicationName: "kaprera",
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/branding/logos/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/branding/logos/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "kaprera",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    siteName: "kaprera",
    url: SITE_URL,
    locale: "en_US",
    alternateLocale: "ar_AR",
    images: [
      {
        url: `${SITE_URL}/branding/logos/kaprera-logo.png`,
        type: "image/png",
        width: 1563,
        height: 1563,
        alt: "kaprera — digital agency in Beirut, Lebanon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/branding/logos/kaprera-logo.png`],
  },
};

export const viewport: Viewport = {
  themeColor: "#008cc1",
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint: applies the saved theme, language/direction, and the
// session flag that skips the intro preloader — no flash of the wrong state.
const bootScript = `(function(){try{var d=localStorage.getItem("theme");var dark=d?d==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(dark)document.documentElement.setAttribute("data-theme","dark");var l=localStorage.getItem("lang");if(l==="ar"){document.documentElement.lang="ar";document.documentElement.dir="rtl"}if(sessionStorage.getItem("kaprera-preloaded"))document.documentElement.classList.add("skip-preloader")}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetBrainsMono.variable} ${cairo.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <LangProvider>
          {children}
          <Footer />
          <CookieConsent />
        </LangProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
