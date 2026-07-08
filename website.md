You are a senior front-end designer and developer. Build a complete, single-page
landing website for a digital agency called Kaprera. This is a redesign of the
old site (kaprera.com) using maxiphy.com as the visual/structural reference.

────────────────────────
OUTPUT FORMAT
────────────────────────
- Deliver ONE self-contained file: index.html with all CSS and JS inline
  (vanilla — no build step, no external frameworks). It must run by simply
  opening the file or dropping it on any static host (Vercel/Netlify/GitHub Pages).
- Fully responsive: mobile-first, looks great from 360px up to large desktop.
- Smooth scroll, subtle scroll-in animations, accessible (semantic HTML,
  alt text, keyboard-focusable, ESC closes modals).
- Single landing page only — NO multipage routing, no clutter. Clean and minimal.

────────────────────────
DESIGN SYSTEM
────────────────────────
Colors:
- Primary / accent: #008cc1 (kaprera blue) — used for links, buttons, hovers,
  active states, key highlights and the monospace accent marks.
- Base: white (#ffffff) backgrounds, black (#0a0a0a) text.
- Use blue sparingly and intentionally so it pops against a clean black/white base.
- Generous whitespace. Thin hairline borders (#e6e6e6) to separate sections.

Typography & tone (match maxiphy's feel):
- Lowercase styling for headings, nav and labels (e.g. "our work", "what we do").
- A clean geometric sans (Inter or similar from Google Fonts) for body/headings,
  plus a monospace (JetBrains Mono / IBM Plex Mono) for small accent labels,
  tags, and section numbers (e.g. "01 / who we are").
- Big, bold hero headline. Lots of breathing room. Confident, minimal, modern.

Motion:
- Sticky/translucent top nav that condenses on scroll.
- Cards lift slightly on hover. Fade/slide-up on scroll into view. Keep it tasteful.

────────────────────────
PAGE STRUCTURE (in order)
────────────────────────
1. NAV (sticky)
   - Left: "kaprera" wordmark (the "k" or a small ">_" mark in blue is a nice touch).
   - Right: anchor links — work · services · contact — plus a primary blue
     "let's talk" button that scrolls to contact.
   - Collapses to a clean hamburger/menu on mobile.

2. HERO (includes the case studies)
   - Large lowercase headline expressing the mission. Use this positioning:
     "stronger digital presence for startups & scaleups."
     Subline: "we design websites and brands that turn audiences into customers."
   - Two CTAs: primary blue "let's talk" + ghost "see our work".
   - A compact stats strip beneath the hero (animated count-up):
       • 200+ projects delivered
       • 150+ landing pages
       • 45+ brand guidelines
       • 50% avg. organic traffic increase
   - CASE STUDIES live right after the hero as the centrepiece:
       • A grid/row of image-led case-study cards (mockup image, project name,
         short blurb, small tag chips like "ui/ux", "web dev").
       • Clicking a card opens an in-page CARD/MODAL VIEW (overlay, not a new
         page) with the full case-study details. Backdrop dims, body scroll locks,
         ESC and an × button close it. Smooth open/close transition.

3. SERVICES
   - Section label "what we do".
   - Clean cards for the two core services:
       • UI/UX Design — user-centered interfaces that are intuitive and convert.
       • Web Development — fast, responsive, high-performance builds.
   - Optionally a thin "industries we serve" line: ICT & Technology · Education ·
     NGOs · Advisory · Management & IT Consultancy.

4. CONTACT US
   - Section label "let's build something".
   - Simple form: full name, email, message + a blue "send" button.
     On submit, compose a mailto: to hello@kaprera.com (placeholder) — no backend.
   - Beside the form: email, WhatsApp link, "Lebanon" location line.

5. FOOTER
   - kaprera wordmark + one-line tagline.
   - Quick anchor links (work, services, contact), social placeholders
     (LinkedIn, Instagram, WhatsApp), and "© 2026 kaprera. all rights reserved."

────────────────────────
CASE STUDY CONTENT (use exactly; card → modal detail)
────────────────────────
CASE 1 — Bayader  (www.bayader.sa)
  Tags: ui/ux · web development
  Challenge: Needed a modern, UX-centered website to present services professionally.
  Solution: Delivered responsive UI/UX and high-performance web development.
  Results: +55% faster load speed · +48% engagement · +32% SEO visibility.

CASE 2 — Lebanese Spotlight  (lbspotlight.org)
  Tags: ui/ux · web app
  Challenge: Needed a platform to manage volunteers efficiently.
  Solution: Full UI/UX with integrated backend workflow tools.
  Results: 60% faster volunteer onboarding · 2× workflow efficiency ·
           +35% active volunteers.

(For card mockup images, use clean placeholder image boxes / gradient
placeholders labelled with the project name — I'll swap in real screenshots later.)

────────────────────────
DO / DON'T
────────────────────────
DO: keep it minimal, fast, and elegant; prioritize whitespace and typography;
    make the case-study modal the interactive highlight.
DON'T: add extra pages, blogs, pricing tables, lorem-ipsum walls, heavy
    gradients, or stock-photo clutter. No marketing/SWOT copy on the page.

Build the full index.html now.