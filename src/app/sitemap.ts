/**
 * sitemap.xml üreticisi (Next.js MetadataRoute).
 * Prop'lar: yok.
 * Kullanım: /sitemap.xml otomatik üretilir; TR + EN route'larını hreflang ile listeler.
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
  "/cerez-politikasi",
];

// EN karşılığı varsa (örn. /kurumsal-hakkimizda yok, sadece /corporate/hakkimizda),
// her TR yol için EN yolunu döndürür. Yoksa null (no EN version).
function enPathFor(trPath: string): string | null {
  // TR'ye özel sayfalar (kvkk, gizlilik, cerez-politikasi) → EN karşılığı yok
  if (
    trPath === "/kvkk" ||
    trPath === "/gizlilik" ||
    trPath === "/cerez-politikasi"
  ) {
    return null;
  }
  return `/en${trPath === "/" ? "" : trPath}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Statik sayfalar: TR + EN ayrı entry + x-default
  for (const path of staticPaths) {
    entries.push({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: {
          tr: `${siteConfig.url}${path}`,
          ...(enPathFor(path)
            ? { en: `${siteConfig.url}${enPathFor(path)}` }
            : {}),
          "x-default": `${siteConfig.url}${path}`,
        },
      },
    });

    // EN entry (sadece karşılığı varsa)
    const en = enPathFor(path);
    if (en) {
      entries.push({
        url: `${siteConfig.url}${en}`,
        lastModified: now,
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : 0.7,
        alternates: {
          languages: {
            tr: `${siteConfig.url}${path}`,
            en: `${siteConfig.url}${en}`,
            "x-default": `${siteConfig.url}${path}`,
          },
        },
      });
    }
  }

  // Ürün sayfaları: TR + EN
  for (const product of products) {
    const trPath = `/urunler/${product.category}/${product.slug}`;
    const enPath = `/en/urunler/${product.category}/${product.slug}`;
    entries.push({
      url: `${siteConfig.url}${trPath}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          tr: `${siteConfig.url}${trPath}`,
          en: `${siteConfig.url}${enPath}`,
          "x-default": `${siteConfig.url}${trPath}`,
        },
      },
    });
    entries.push({
      url: `${siteConfig.url}${enPath}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          tr: `${siteConfig.url}${trPath}`,
          en: `${siteConfig.url}${enPath}`,
          "x-default": `${siteConfig.url}${trPath}`,
        },
      },
    });
  }

  // Blog: TR + EN
  for (const post of blogPosts) {
    const trPath = `/blog/${post.slug}`;
    const enPath = `/en/blog/${post.slug}`;
    entries.push({
      url: `${siteConfig.url}${trPath}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          tr: `${siteConfig.url}${trPath}`,
          en: `${siteConfig.url}${enPath}`,
          "x-default": `${siteConfig.url}${trPath}`,
        },
      },
    });
    entries.push({
      url: `${siteConfig.url}${enPath}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          tr: `${siteConfig.url}${trPath}`,
          en: `${siteConfig.url}${enPath}`,
          "x-default": `${siteConfig.url}${trPath}`,
        },
      },
    });
  }

  return entries;
}
