import { CONTACT, SITE_URL } from "./site";

const LOGO = `${SITE_URL}/branding/logos/kaprera-logo.png`;

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "kaprera",
  description: "kaprera is a digital agency in Beirut, Lebanon offering UI/UX design, web development, and SEO.",
  url: `${SITE_URL}/`,
  logo: LOGO,
  image: LOGO,
  email: CONTACT.email,
  telephone: "+9613816405",
  priceRange: "$$",
  areaServed: "LB",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beirut",
    addressCountry: "LB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.8938,
    longitude: 35.5018,
  },
  knowsLanguage: ["en", "ar"],
  sameAs: [CONTACT.instagram, CONTACT.whatsapp],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO" } },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital services",
    itemListElement: [
      { "@type": "OfferCatalog", name: "UI/UX Design" },
      { "@type": "OfferCatalog", name: "Web Development" },
      { "@type": "OfferCatalog", name: "SEO" },
    ],
  },
} as const;

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "kaprera",
  url: `${SITE_URL}/`,
  inLanguage: ["en", "ar"],
  publisher: { "@type": "Organization", name: "kaprera", logo: LOGO },
} as const;

export const workItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "kaprera selected work",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "CreativeWork",
        name: "Bayader Investments",
        url: "https://www.bayader.sa",
        image: `${SITE_URL}/cases/bayader/image.jpg`,
        creator: { "@type": "Organization", name: "kaprera" },
        about: "UI/UX design and high-performance web development.",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "CreativeWork",
        name: "Lebanese Spotlight",
        url: "https://lbspotlight.org",
        image: `${SITE_URL}/cases/lbspotlight/image.jpg`,
        creator: { "@type": "Organization", name: "kaprera" },
        about: "Volunteer management platform — UI/UX and backend workflow tools.",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "CreativeWork",
        name: "Ana Arabia",
        image: `${SITE_URL}/cases/ana-arabia/image.jpg`,
        creator: { "@type": "Organization", name: "kaprera" },
        about: "Bilingual event landing page for Riyadh Season.",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "CreativeWork",
        name: "Agri Pro Services",
        image: `${SITE_URL}/cases/agripro/image.jpg`,
        creator: { "@type": "Organization", name: "kaprera" },
        about: "Custom operations platform for pest control services — UI/UX and full-stack web app.",
      },
    },
  ],
} as const;
