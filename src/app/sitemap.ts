/**
 * sitemap.xml üreticisi (Next.js MetadataRoute).
 * Prop'lar: yok.
 * Kullanım: /sitemap.xml otomatik üretilir; statik sayfalar + ürün + blog route'larını listeler.
 */
import type { MetadataRoute } from "next";

import { blogPosts, products, siteConfig } from "@/lib/data";

const staticPaths = [
  "/",
  "/corporate",
  "/corporate/hakkimizda",
  "/corporate/kalite-politikasi",
  "/corporate/vizyon-misyon",
  "/corporate/surdurulebilirlik",
  "/uretim",
  "/uretim/sertifikalar",
  "/uretim/tesis",
  "/uretim/kapasite",
  "/uretim/lojistik",
  "/urunler",
  "/blog",
  "/iletisim",
  "/kvkk",
  "/gizlilik",
  "/cerez-politikasi"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteConfig.url}/urunler/${product.category}/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.5
  }));

  return [...staticEntries, ...productEntries, ...blogEntries];
}
