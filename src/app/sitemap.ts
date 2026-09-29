import type { MetadataRoute } from "next";

const SITE_URL = process.env.SITE_URL ?? "https://foundhouse.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/start`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
