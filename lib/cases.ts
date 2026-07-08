import { bi, type Bi } from "./i18n";

export type CaseKey = "agripro" | "spotlight" | "ana" | "bayader";

export interface CaseStat {
  big: string;
  small: Bi;
}

export interface CaseStudy {
  key: CaseKey;
  name: string;
  url?: string;
  href?: string;
  /** class applied to the full-width hero background while this slide is active */
  heroBgClass: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    /** letterbox the slider thumbnail instead of cropping it (modal always covers) */
    contain?: boolean;
  };
  blurb: Bi;
  tags: readonly Bi[];
  challenge: Bi;
  solution: Bi;
  highlights: readonly Bi[];
  specs: ReadonlyArray<{ k: Bi; v: Bi }>;
  perf?: { stats: readonly CaseStat[]; note: Bi };
  results: readonly CaseStat[];
}

export const CASES: readonly CaseStudy[] = [
  {
    key: "agripro",
    name: "Agri Pro Services",
    heroBgClass: "hero-bg-agripro",
    image: {
      src: "/cases/agripro/image.webp",
      width: 1600,
      height: 941,
      alt: "Agri Pro Services pest control operations platform built by kaprera",
    },
    blurb: bi("A custom operations platform for a pest control company.", "منصة عمليات مخصّصة لشركة مكافحة آفات."),
    tags: [bi("ui/ux", "تصميم واجهات"), bi("web app", "تطبيق ويب")],
    challenge: bi(
      "Needed a complex, custom system to run their pest control operations — clients, visits, deals, pricing, and field reports — in one place.",
      "احتاجوا إلى نظام مخصّص ومعقّد لإدارة عمليات مكافحة الآفات — العملاء والزيارات والصفقات والتسعير وتقارير الميدان — في مكان واحد.",
    ),
    solution: bi(
      "Designed and built a role-based operations platform with a live dashboard, client and deal pipelines, pricing quotes, and visit, inspection, and risk-assessment reporting.",
      "صمّمنا وطوّرنا منصة عمليات قائمة على الأدوار مع لوحة تحكم حيّة، ومسارات للعملاء والصفقات، وعروض تسعير، وتقارير للزيارات والتفتيش وتقييم المخاطر.",
    ),
    highlights: [
      bi("Live operations dashboard with real-time stats", "لوحة تحكم حيّة للعمليات مع إحصاءات فورية"),
      bi("Client records and a deal pipeline with pricing quotes", "سجلات العملاء ومسار الصفقات مع عروض التسعير"),
      bi(
        "Visit scheduling with field, inspection, and risk-assessment reports",
        "جدولة الزيارات مع تقارير ميدانية وتقارير تفتيش وتقييم مخاطر",
      ),
      bi("Role-based access for admin, operator, and sysadmin", "صلاحيات وصول حسب الدور للمشرف والمشغّل ومدير النظام"),
    ],
    specs: [
      { k: bi("type", "النوع"), v: bi("internal operations platform", "منصة عمليات داخلية") },
      { k: bi("stack", "التقنيات"), v: bi("Next.js + Node.js", "Next.js + Node.js") },
      { k: bi("client", "العميل"), v: bi("pest control company", "شركة مكافحة آفات") },
      { k: bi("scope", "نطاق العمل"), v: bi("UI/UX + full-stack development", "تصميم واجهات وتطوير متكامل") },
    ],
    results: [
      { big: "1", small: bi("unified operations platform", "منصة عمليات موحّدة") },
      { big: "role-based", small: bi("admin, operator & sysadmin access", "صلاحيات للمشرف والمشغّل ومدير النظام") },
      { big: "real-time", small: bi("dashboard & reporting", "لوحة تحكم وتقارير فورية") },
    ],
  },
  {
    key: "spotlight",
    name: "Lebanese Spotlight",
    url: "lbspotlight.org",
    href: "https://lbspotlight.org",
    heroBgClass: "hero-bg-spotlight",
    image: {
      src: "/cases/lbspotlight/image.webp",
      width: 1600,
      height: 944,
      alt: "Lebanese Spotlight volunteer management platform built by kaprera",
      contain: true,
    },
    blurb: bi(
      "A platform to manage volunteers efficiently, end to end.",
      "منصة لإدارة المتطوعين بكفاءة من البداية إلى النهاية.",
    ),
    tags: [bi("ui/ux", "تصميم واجهات"), bi("web app", "تطبيق ويب")],
    challenge: bi("Needed a platform to manage volunteers efficiently.", "احتاجوا إلى منصة لإدارة المتطوعين بكفاءة."),
    solution: bi(
      "Full UI/UX with integrated backend workflow tools.",
      "تصميم واجهات متكامل مع أدوات سير عمل في الخلفية.",
    ),
    highlights: [
      bi("Volunteer onboarding and management workflows", "مسارات لضمّ المتطوعين وإدارتهم"),
      bi("Workshops & programs catalog with easy sign-up", "دليل لورش العمل والبرامج مع تسجيل سهل"),
      bi(
        "Impact section — 300+ active volunteers and a 10K youth outreach goal",
        "قسم الأثر — أكثر من 300 متطوع نشط وهدف للوصول إلى 10 آلاف شاب",
      ),
      bi("Community stories and testimonials", "قصص وشهادات من المجتمع"),
      bi("Safeguarding & policy documents built into the site", "سياسات الحماية والوثائق مدمجة في الموقع"),
    ],
    specs: [
      { k: bi("type", "النوع"), v: bi("NGO platform", "منصة منظمة غير حكومية") },
      { k: bi("stack", "التقنيات"), v: bi("Next.js + Node.js", "Next.js + Node.js") },
      { k: bi("client", "العميل"), v: bi("youth-led NGO — Beirut, Lebanon", "منظمة شبابية — بيروت، لبنان") },
      { k: bi("scope", "نطاق العمل"), v: bi("UI/UX + web app development", "تصميم واجهات وتطوير تطبيق ويب") },
    ],
    perf: {
      stats: [
        { big: "87/100", small: bi("Lighthouse performance", "أداء Lighthouse") },
        { big: "1.2s", small: bi("first contentful paint", "أول ظهور للمحتوى") },
        { big: "0ms", small: bi("total blocking time", "زمن الحجب الكلي") },
      ],
      note: bi(
        "measured with Google Lighthouse (desktop), july 2026",
        "قياس عبر Google Lighthouse (سطح المكتب)، تموز 2026",
      ),
    },
    results: [
      { big: "60%", small: bi("faster volunteer onboarding", "أسرع في ضمّ المتطوعين") },
      { big: "2×", small: bi("workflow efficiency", "كفاءة سير العمل") },
      { big: "+35%", small: bi("active volunteers", "متطوعون نشطون") },
    ],
  },
  {
    key: "ana",
    name: "Ana Arabia",
    url: "ana-arabia.com",
    href: "https://ana-arabia.com",
    heroBgClass: "hero-bg-ana",
    image: {
      src: "/cases/ana-arabia/image.webp",
      width: 1600,
      height: 942,
      alt: "Ana Arabia bilingual event landing page for Riyadh Season by kaprera",
    },
    blurb: bi(
      "An elegant, bilingual landing page for a Riyadh Season event.",
      "صفحة هبوط أنيقة وثنائية اللغة لفعالية ضمن موسم الرياض.",
    ),
    tags: [bi("ui/ux", "تصميم واجهات"), bi("web development", "تطوير ويب")],
    challenge: bi(
      "Launch a refined, fully bilingual (AR/EN) landing experience for a Riyadh Season event that reflects its premium identity.",
      "إطلاق صفحة هبوط أنيقة وثنائية اللغة (عربي/إنجليزي) بالكامل لفعالية ضمن موسم الرياض تعكس هويتها الفاخرة.",
    ),
    solution: bi(
      "Designed and built a fast, responsive landing page with a cinematic hero, seamless RTL/LTR support, and clear event details.",
      "صمّمنا وطوّرنا صفحة هبوط سريعة ومتجاوبة بواجهة بصرية مميزة ودعم سلس للاتجاهين وتفاصيل واضحة للفعالية.",
    ),
    highlights: [
      bi("Cinematic hero introducing the Riyadh Season event", "واجهة سينمائية تقدّم الفعالية ضمن موسم الرياض"),
      bi(
        "Full Arabic/English i18n with instant in-place language switching",
        "دعم كامل للعربية والإنجليزية مع تبديل فوري للغة في المكان نفسه",
      ),
      bi("Seamless RTL/LTR layout mirroring", "انعكاس سلس للتخطيط بين الاتجاهين RTL/LTR"),
      bi("Firebase hosting and analytics behind the scenes", "استضافة وتحليلات عبر Firebase في الخلفية"),
    ],
    specs: [
      { k: bi("type", "النوع"), v: bi("event landing page", "صفحة هبوط لفعالية") },
      { k: bi("stack", "التقنيات"), v: bi("Nuxt 3 + Firebase", "Nuxt 3 + Firebase") },
      { k: bi("languages", "اللغات"), v: bi("Arabic & English (RTL/LTR)", "العربية والإنجليزية (RTL/LTR)") },
      { k: bi("scope", "نطاق العمل"), v: bi("design & development", "تصميم وتطوير") },
    ],
    perf: {
      stats: [
        { big: "97/100", small: bi("Lighthouse performance", "أداء Lighthouse") },
        { big: "0.6s", small: bi("first contentful paint", "أول ظهور للمحتوى") },
        { big: "0.9s", small: bi("largest contentful paint", "أكبر ظهور للمحتوى") },
      ],
      note: bi(
        "measured with Google Lighthouse (desktop), july 2026",
        "قياس عبر Google Lighthouse (سطح المكتب)، تموز 2026",
      ),
    },
    results: [
      { big: "AR/EN", small: bi("full bilingual support", "دعم ثنائي اللغة كامل") },
      { big: "100%", small: bi("responsive across devices", "متجاوب على كل الأجهزة") },
      { big: "<1s", small: bi("hero load time", "زمن تحميل الواجهة") },
    ],
  },
  {
    key: "bayader",
    name: "Bayader Investments",
    url: "bayader.sa",
    href: "https://www.bayader.sa",
    heroBgClass: "hero-bg-bayader",
    image: {
      src: "/cases/bayader/image.webp",
      width: 1600,
      height: 943,
      alt: "Bayader Investments website designed and developed by kaprera",
    },
    blurb: bi(
      "A modern, UX-centered website for an investment firm.",
      "موقع عصري يركّز على تجربة المستخدم لشركة استثمار.",
    ),
    tags: [bi("ui/ux", "تصميم واجهات"), bi("web development", "تطوير ويب")],
    challenge: bi(
      "Needed a modern, UX-centered website to present their investment services and latest news professionally.",
      "احتاجوا إلى موقع عصري يركّز على تجربة المستخدم لعرض خدماتهم الاستثمارية وآخر الأخبار باحترافية.",
    ),
    solution: bi(
      "Delivered responsive UI/UX and high-performance web development.",
      "قدّمنا تصميم واجهات متجاوب وتطويرًا عالي الأداء للموقع.",
    ),
    highlights: [
      bi(
        "Investment portfolio pages covering equity, direct, and real-estate investments",
        "صفحات لمحفظة الاستثمارات تغطي استثمارات الأسهم والاستثمارات المباشرة والعقارية",
      ),
      bi("News & insights section for company and market updates", "قسم للأخبار والرؤى لمستجدات الشركة والسوق"),
      bi("Investor contact flow with an enquiry form", "مسار تواصل للمستثمرين مع نموذج استفسار"),
      bi(
        "Image-led corporate design, fully responsive across devices",
        "تصميم مؤسسي يعتمد على الصور ومتجاوب بالكامل على جميع الأجهزة",
      ),
    ],
    specs: [
      { k: bi("type", "النوع"), v: bi("corporate website", "موقع مؤسسي") },
      { k: bi("stack", "التقنيات"), v: bi("Next.js + Tailwind CSS", "Next.js + Tailwind CSS") },
      { k: bi("client", "العميل"), v: bi("investment firm — Saudi Arabia", "شركة استثمار — السعودية") },
      { k: bi("scope", "نطاق العمل"), v: bi("UI/UX design & web development", "تصميم واجهات وتطوير ويب") },
    ],
    perf: {
      stats: [
        { big: "83/100", small: bi("Lighthouse SEO", "SEO في Lighthouse") },
        { big: "1.5s", small: bi("first contentful paint", "أول ظهور للمحتوى") },
        { big: "0.02", small: bi("cumulative layout shift", "الانزياح التراكمي للتصميم") },
      ],
      note: bi(
        "measured with Google Lighthouse (desktop), july 2026",
        "قياس عبر Google Lighthouse (سطح المكتب)، تموز 2026",
      ),
    },
    results: [
      { big: "+55%", small: bi("faster load speed", "أسرع في التحميل") },
      { big: "+48%", small: bi("engagement", "تفاعل أعلى") },
      { big: "+32%", small: bi("SEO visibility", "ظهور في البحث") },
    ],
  },
];
