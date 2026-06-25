/**
 * Sayfa bazlı Metadata üreticisi (Next.js Metadata API yardımcısı).
 * Prop'lar: { title, description, path?, image?, type? }.
 * Kullanım: her route'un generateMetadata/metadata export'unda buildMetadata(...) çağrılır.
 *
 * Locale-aware:
 *  - TR (default) → canonical: /path
 *  - EN → canonical: /en/path + alternates.languages { tr, en, x-default }
 *
 * İki versiyon:
 *  - buildMetadata() → sync, locale-default (TR canonical). Eski sayfalarla uyumlu.
 *  - buildMetadataForLocale(locale) → async, locale-aware. Yeni sayfalar bunu kullanmalı.
 */
import type { Metadata } from "next";

import { siteConfig } from "@/lib/data";

export type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

// Sync versiyon — TR default canonical. Eski route'lar için backward compatible.
export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/images/og/og-default.png",
  type = "website",
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        tr: path,
        en: `/en${path === "/" ? "" : path}`,
        "x-default": path,
      },
    },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: "tr_TR",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// Locale-aware async versiyon — yeni generateMetadata() sayfaları için.
export function buildMetadataForLocale(
  locale: string,
  input: PageMetaInput,
): Metadata {
  const isEn = locale === "en";
  const path = input.path ?? "/";
  const localizedPath = isEn ? `/en${path === "/" ? "" : path}` : path;
  const base = buildMetadata(input);
  return {
    ...base,
    alternates: {
      canonical: localizedPath,
      languages: {
        tr: path,
        en: `/en${path === "/" ? "" : path}`,
        "x-default": path,
      },
    },
    openGraph: {
      ...base.openGraph,
      url: `${siteConfig.url}${localizedPath}`,
      locale: isEn ? "en_US" : "tr_TR",
    },
  };
}
