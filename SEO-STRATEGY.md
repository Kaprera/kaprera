# kaprera — SEO Strategy & Runbook

_Last updated: 2026-07-11 · Owner: Ibrahim · Site: https://kaprera.com (static HTML/CSS/JS on Netlify)_

This is both the **strategy** (the *why*) and the **runbook** (the executable task list).
Tasks are tagged **P0 / P1 / P2** by priority and **[code]** (I implement in the repo) or
**[you]** (off-site: GBP, reviews, client sites). Check items off as they ship.

---

## 1. Positioning & goals

**What kaprera is:** a bilingual (EN/AR) digital agency in Beirut serving Lebanon + GCC/MENA.
**Priority service to win:** web development (then design/UI-UX as the natural upsell).
**Primary SEO goal (6 mo):** **local visibility** — own the map pack and page-1 organic for
"web development / digital agency" + Beirut/Lebanon, and be discoverable for GCC work.

### Success metrics (KPIs)
Track monthly in a simple sheet pulled from GSC + analytics (both already connected):

| KPI | Baseline (fill in) | 3-mo target | 6-mo target |
|---|---|---|---|
| Google Business Profile: map-pack impressions | ___ | +40% | +100% |
| GBP profile actions (calls, site clicks, direction req.) | ___ | +30% | +75% |
| Non-brand organic clicks (GSC) | ___ | +50% | 2–3× |
| Keywords ranking in top 10 (target list below) | ___ | 5+ | 12+ |
| Inbound leads attributed to organic/GBP | ___ | +3–5/mo | +8–12/mo |
| Google reviews (count / avg rating) | ___ / ___ | +5 | +12 |

> **Reality check:** the site is "barely ranking" today, so months 1–2 are foundation
> (technical + local + measurement baselines). Expect movement from ~month 3, compounding after.

---

## 2. The one strategic decision: bilingual indexing

**Problem:** Arabic content is rendered via a JS `data-en` / `data-ar` toggle on the *same URL*
(`index.html`, 123 instances). Googlebot indexes the **default (English) DOM only** — there is no
crawlable, distinctly-URL'd Arabic page. So an "equal bilingual" ranking goal is **structurally
impossible** in the current setup: Arabic search terms have nothing to rank.

**Options (pick one — everything in §5 depends on it):**

- **A. English-primary, Arabic-as-UX (lowest effort, recommended to start).**
  Accept that organic SEO targets English; keep the AR toggle purely as an on-site experience.
  Drop the "equal bilingual SEO" expectation. Fastest path to the local-visibility goal.
- **B. Add a real Arabic page at `/ar/` (medium effort, unlocks AR search).**
  A static, server-rendered Arabic `index.html` under `/ar/` with `dir="rtl"`, `lang="ar"`,
  reciprocal `hreflang` tags (`en` ↔ `ar` ↔ `x-default`), its own canonical, and an entry in
  `sitemap.xml`. This is the only way Arabic keywords can rank. Stays "lean" — one extra page,
  no blog. **Recommended if GCC/Arabic search is commercially important within 6 months.**
- **C. Full bilingual site.** Out of scope for "keep it lean." Not recommended now.

**➡️ Action P0 [you]:** Decide A or B. The runbook below assumes **A now, B as a fast-follow**.
Tasks that only apply to B are marked **(B only)**.

- [ ] **P0 [you]** — Confirm bilingual approach (A or B).

---

## 3. Keyword strategy (target map)

Group by intent. Lowercase brand tone is fine on-page; keywords below are for targeting.

### Local commercial (primary — highest priority)
- web development company beirut / lebanon
- web development agency lebanon
- digital agency beirut / lebanon
- website design company beirut / lebanon
- ui ux design agency lebanon
- ecommerce website development lebanon

### Regional (GCC expansion)
- web development agency saudi arabia / uae _(leverage Bayader = .sa client)_
- website design company gulf / mena

### Service + brand-adjacent (mid-funnel)
- custom website development
- high-performance / fast website development
- brand and website design agency
- next.js / modern website development lebanon _(only if you want to signal stack)_

### Arabic (B only)
- شركة تطوير مواقع بيروت / لبنان · تصميم مواقع لبنان · وكالة رقمية بيروت

**➡️ Action P1 [you+code]:** finalize a 12–15 keyword shortlist, assign each to a page/section
(homepage hero, services, each case study). Track them in GSC.

- [ ] **P1** — Lock the keyword shortlist and map keyword → page.

---

## 4. Technical SEO — audit & fixes

Foundation is already good (clean URLs, canonicals, cached 301s from the Next.js era, robots +
sitemap present, rich JSON-LD). Gaps and hardening below.

- [x] **P0 [code]** — **Social share image.** ✅ Built a 2400×1260 (2:1) on-brand card at
  `branding/og-cover.png`; repointed `og:image` + `twitter:image` and updated width/height + alt.
  _(Was the 1563×1563 square logo.)_
- [ ] **P1 [code]** — **Per-page titles & descriptions are thin.** `careers.html`,
  `privacy-policy.html` use bare `"careers — kaprera"` style titles. Fine for non-SEO pages, but
  ensure every indexable page has a unique, keyword-aware `<title>` (≤60 chars) and
  `meta description` (≤155 chars). _(Homepage title is already strong.)_
- [ ] **P1 [code]** — **Sitemap freshness & coverage.** `sitemap.xml` lists `/`, `/zeevora/`,
  `/careers`, `/privacy-policy`. Confirm `maintenance` stays excluded, keep `lastmod` accurate on
  every deploy, and add `/ar/` **(B only)**. Consider giving each case study a crawlable URL
  (see §5) and listing them.
- [x] **P1 [code]** — **Image SEO.** ✅ Case mockups already ship responsive `<picture>` (480/800/
  1600 WebP + JPG fallback), keyword+brand `alt`, explicit `width`/`height`, and `loading="lazy"`.
  Added dimensions/`loading` to the testimonial avatars and modal slide images that were missing
  them, and enriched the modal slide `alt`.
- [x] **P1 [code]** — **Core Web Vitals pass.** ✅ Lighthouse (desktop): **home 100/100/100/100**
  (LCP 0.6s, CLS 0, TBT 0); **case pages 100/100/100/100** (after fixing a button-contrast + a
  heading-order issue on the new pages). **Mobile home: perf 95, LCP 2.9s, CLS 0, TBT 0.**
  **⚠️ watch-item:** mobile LCP 2.9s is just over the 2.5s "good" bar (likely the hero preloader
  animation) — worth revisiting; monitor real CrUX field data in GSC before optimizing further.
- [ ] **P2 [code]** — **Robots hygiene.** `robots.txt` is `Allow: /` + sitemap — good. Make sure
  `maintenance.html` / `404.html` aren't indexable (they shouldn't be linked/sitemapped; add
  `X-Robots-Tag: noindex` via `netlify.toml` headers for `maintenance` if it's ever linked).
- [ ] **P2 [code]** — **Canonical audit.** Every page already self-canonicalizes; re-verify after
  any URL change so the cached-301 clean-URL scheme (`*.html → clean`) stays intact.
- [ ] **P0 [you]** — **Verify GSC coverage.** In Search Console: submit `sitemap.xml`, check
  Pages report for "Crawled – not indexed" / exclusions, and request indexing for the homepage.

---

## 5. On-page & content (lean — no blog)

Since we're keeping the site lean, the win is **making existing pages richer and more targeted**,
plus giving case studies real SEO surface area.

- [x] **P0 [code]** — **Homepage keyword alignment.** ✅ Hero subline now "we design **and build**
  websites and brands…" (adds the web-dev signal next to the H1), EN+AR kept in sync. Note: the
  services carousel already carries a strong "web development" panel and the eyebrow/testimonials
  already say "beirut, lebanon" — page was largely aligned; kept the H1 as the brand statement
  rather than stuff it.
- [x] **P1 [code]** — **Give case studies indexable URLs.** ✅ Built 4 standalone pages —
  `cases/{bayader,lbspotlight,ana-arabia,agripro}/index.html` — sharing `cases/case.css`, each with
  hero, overview, highlights, specs, results/perf, unique title+description+canonical, OG/Twitter
  tags, and `BreadcrumbList` + `CreativeWork` JSON-LD. The homepage "view case study" CTAs are now
  real `<a href="/cases/…/">` links (JS still opens the modal; middle/⌘-click and no-JS get the full
  page), and all four are in `sitemap.xml`. Lighthouse 100 across the board.
- [ ] **P1 [code]** — **Services depth.** Expand the services section copy so "web development"
  and "ui/ux design" each read as a mini service page with concrete deliverables, stack, and
  outcomes — enough text for Google to understand intent. Add the "industries we serve" line as
  crawlable text.
- [ ] **P2 [code]** — **Internal linking.** Link hero/services → relevant case studies with
  descriptive anchor text ("see our beirut web development work"), not "learn more."
- [ ] **P1 [code] (B only)** — Build `/ar/index.html` mirroring the homepage in Arabic with
  `lang="ar" dir="rtl"`, translated title/description/schema, reciprocal `hreflang`, own canonical.

---

## 6. Structured data (schema) enhancements

You already emit `ProfessionalService`, `Organization`, `WebSite`, `Service`, `OfferCatalog`,
`GeoCoordinates`, `PostalAddress`, `ItemList`. Add the high-value missing pieces:

- [x] **P0 [code]** — **`aggregateRating` + `Review`** ✅ Added to the `ProfessionalService` node,
  marking up the **two real on-page testimonials** (Lebanese Spotlight, Agri Pro — both 5★).
  `aggregateRating` is currently `5.0 / 2` to match visible content exactly.
  **⚠️ [you]:** if your GBP has more reviews, send me the real **average rating + total count** and
  I'll update `aggregateRating` to reflect the full GBP total (must match what's publicly visible).
  Note: self-hosted reviews rarely trigger star rich-snippets anymore, but the markup still
  strengthens entity/local understanding.
- [x] **P1 [code]** — **`FAQPage`** ✅ Added a visible, bilingual FAQ section (`#faq`, native
  `<details>`, no extra JS) with 6 buyer questions (cost, timeline, working outside Lebanon, SEO &
  support, tech stack, Arabic/English) + matching `FAQPage` JSON-LD. Linked in the footer; contact
  section renumbered to 05.
- [x] **P1 [code]** — **`BreadcrumbList`** ✅ on all four case-study pages (Home › Work › Case).
- [x] **P2 [code]** — ✅ `areaServed` widened from `"LB"` to Lebanon + Saudi Arabia + UAE (Country
  objects). Still confirm NAP (name/address/phone) in schema **exactly** matches the GBP listing (§7).
- [ ] **P2 [code]** — Validate everything in Google's Rich Results Test after each change.

---

## 7. Local SEO (primary channel — GBP is already active)

The map pack is where "local visibility" is won. GBP is set up and active with reviews — now
optimize and reinforce it.

- [ ] **P0 [you]** — **GBP optimization pass.** Primary category = *Website designer* or
  *Software company* (whichever matches intent); add secondary categories (Web/Internet marketing
  service, Marketing agency). Fill services with your priority offerings, add products/services
  with descriptions + prices-from if comfortable, write a keyword-aware business description.
- [ ] **P0 [you]** — **NAP consistency.** Business name, (service-area) location, and phone must be
  **identical** across GBP, the site's schema (`index.html`), the contact section, and any
  directory. Inconsistent NAP is the most common local-ranking killer.
- [ ] **P1 [you]** — **GBP as a service-area business.** If you have no walk-in office, set it as a
  service-area business covering Beirut/Lebanon (and note GCC in description). Keep the address
  hidden if it's a home base.
- [ ] **P1 [you]** — **Reviews engine.** You have several — keep them coming. Ask every closed
  client for a review with a keyword-friendly prompt ("mention the web development work we did").
  Reply to **every** review. Target +1–2/month.
- [ ] **P2 [you]** — **GBP Posts.** Post monthly (a shipped project, an offer) — cheap freshness
  signal and keeps the profile active.

---

## 8. Off-page (minimal, high-ROI only)

You chose minimal off-page, so we only do the moves with the best effort-to-return ratio — and one
of them is nearly free because **you build the sites**.

- [ ] **P0 [you+code]** — **"Site by kaprera" client backlinks.** Add a small, tasteful
  "website by kaprera" credit linking to https://kaprera.com in the footer of client sites you
  build/maintain (Agri Pro, Bayader where allowed, Lebanese Spotlight, future clients). These are
  relevant, contextual, dofollow-if-possible backlinks — the single best off-page lever for a build
  agency. Get client sign-off first.
- [ ] **P1 [you]** — **Core local citations (one-time).** List kaprera on a handful of quality
  Lebanon/MENA business directories + LinkedIn company page + Clutch/DesignRush/GoodFirms
  (agency-specific, they drive real leads). Keep NAP identical everywhere.
- [ ] **P2 [you]** — **Partnerships.** Any tools/hosts/clients that maintain "partners" or "made
  with" pages — request a listing. No cold outreach required.

---

## 9. Competitor benchmarking

Benchmark against **maxiphy** (your visual reference) and the **Beirut/Lebanon agency SERP
leaders**. For the top 5 target keywords, note who ranks and why.

- [ ] **P1 [you+code]** — For each priority keyword, record the top 3 competitors, their title
  tags, whether they have dedicated service/location pages, review counts, and schema. Copy what
  works (dedicated pages, review volume, FAQ schema); differentiate on your real results metrics
  and speed/performance angle.

| Keyword | Who ranks 1–3 | Their edge | Our gap → action |
|---|---|---|---|
| web development company beirut | | | |
| digital agency lebanon | | | |
| web design agency lebanon | | | |
| _(add rest)_ | | | |

---

## 10. Measurement & cadence

Both GSC and analytics are connected — use them.

- [ ] **P0 [you]** — Capture **baselines this week** for every KPI in §1 (screenshot GSC last-28-day
  clicks/impressions, GBP insights, current keyword positions).
- **Weekly (10 min):** GBP — reply to reviews, one post; check GSC for new queries/errors.
- **Monthly (60 min):** update the KPI table; review GSC Queries & Pages; re-rank the target
  keyword positions; adjust titles/copy where a page is stuck on page 2 (positions 11–20 = best ROI).
- **Quarterly:** re-run Lighthouse + Rich Results validation; revisit the bilingual decision (§2);
  refresh case studies with new client results.

---

## 11. Prioritized execution order (do this first)

**Sprint 1 — foundation & measurement (week 1–2)**
1. P0 [you] Baseline all KPIs; submit sitemap; request indexing. _(§10, §4)_
2. P0 [you] Decide bilingual approach A/B. _(§2)_
3. P0 [you] GBP optimization pass + NAP lock. _(§7)_
4. P0 [code] 1200×630 OG image. _(§4)_
5. P0 [code] `aggregateRating`/`Review` schema matching GBP. _(§6)_
6. P0 [code] Homepage keyword alignment (web dev + Beirut/Lebanon). _(§5)_

**Sprint 2 — depth & signals (week 3–5)**
7. P1 [code] Case studies get indexable URLs + schema. _(§5)_
8. P1 [code] FAQPage schema. _(§6)_
9. P1 [code] Image SEO + Core Web Vitals pass. _(§4)_
10. P1 [you+code] "Site by kaprera" client footer backlinks. _(§8)_
11. P1 [you] Core citations + Clutch/DesignRush. _(§8)_
12. P1 [you+code] Competitor benchmark table. _(§9)_

**Sprint 3 — expansion (week 6+)**
13. P1 [code] `/ar/` Arabic page + hreflang **(B only)**. _(§2, §5)_
14. P2 items as capacity allows; enter the monthly measurement rhythm. _(§10)_

---

### Notes
- Keep the cached-301 clean-URL scheme intact on every change (`netlify.toml`) — see project memory.
- Everything here fits the "lean, no blog, mostly on-site" constraint you set.
- When ready, tell me to start on the **[code]** P0 items and I'll implement them against the repo.
