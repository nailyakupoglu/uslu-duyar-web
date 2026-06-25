/**
 * robots.txt üreticisi (Next.js MetadataRoute).
 * Prop'lar: yok.
 * Kullanım: /robots.txt otomatik üretilir; arama motoru tarama kuralları ve sitemap işaretçisi.
 */
import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"]
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url
  };
}
