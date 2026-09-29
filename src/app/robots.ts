import type { MetadataRoute } from "next";

const SITE_URL = process.env.SITE_URL ?? "https://foundhouse.tech";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/start/thanks", "/start/brainstorm"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
