# kaprera — Next.js site

Production rebuild of kaprera.com (previously three static HTML files) on Next.js App Router + Tailwind CSS v4 + TypeScript (strict).

## Commands

```bash
npm run dev     # dev server (Turbopack)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint (incl. react-hooks v6 / compiler rules)
```

## Architecture

```
app/                    routes, metadata, fonts, global styles
  page.tsx              landing page (server component + JSON-LD)
  careers/              /careers
  privacy-policy/       /privacy-policy
  robots.ts sitemap.ts  generated SEO routes
components/
  layout/               Navbar, Footer, Preloader, CookieConsent, SubpageHeader, SW registration
  sections/             WorkShowcase (hero slider + typewriter), ServicesSlider,
                        Testimonials, Contact, CaseModal, SectionIntro, Industries
  ui/                   Button, Chip, Reveal, SectionLabel, SliderDots, toggles, icons
  subpage/              careers / privacy content
hooks/                  useAutoplay, useEscape, useScrollLock
lib/                    bi (bilingual strings), i18n provider, cases data,
                        structured-data, site constants, preloader signal
public/                 branding, case images, zeevora static page, service worker
```

## Key decisions

- **Theming** — colors are CSS variables on `:root` / `[data-theme="dark"]`, exposed to
  Tailwind via `@theme inline` (`bg-surface`, `text-ink`, …). The theme toggle flips one
  attribute; a boot script in `app/layout.tsx` applies the saved theme before first paint.
- **i18n** — every string is a `Bi { en, ar }` pair; `useLang()` resolves it. Language is
  stored in localStorage (`useSyncExternalStore`), and `<html lang dir>` flips to `ar`/`rtl`
  in place — layout mirrors via logical properties and `rtl:` variants. Cairo is declared
  with `preload: false` so it downloads only when Arabic actually renders.
- **Fonts** — Inter, JetBrains Mono, and Cairo are self-hosted at build time via
  `next/font/google`; there are no runtime Google Fonts requests.
- **Breakpoint** — the design collapses at a single 860px breakpoint, so `md` is
  overridden to `54rem` in `app/globals.css`.
- **Sliders** — all three (work, services, testimonials) share `useAutoplay`
  (pause on focus/hover/hidden tab) and `SliderDots` (progress-fill pagination).
  Inactive slides are `inert`.
- **Old URLs** — `/careers.html`, `/privacy-policy.html`, `/index.html` 308-redirect in
  `next.config.ts`; `/zeevora` rewrites to the static page in `public/`.
