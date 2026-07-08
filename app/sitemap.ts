import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-07-08"),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE_URL}/cases/bayader/image.jpg`,
        `${SITE_URL}/cases/lbspotlight/image.jpg`,
        `${SITE_URL}/cases/ana-arabia/image.jpg`,
        `${SITE_URL}/cases/agripro/image.jpg`,
      ],
    },
    {
      url: `${SITE_URL}/zeevora/`,
      lastModified: new Date("2026-06-28"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: new Date("2026-07-07"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date("2026-07-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
