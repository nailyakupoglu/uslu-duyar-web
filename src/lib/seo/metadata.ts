/**
 * Sayfa bazlı Metadata üreticisi (Next.js Metadata API yardımcısı).
 * Prop'lar: { title, description, path?, image?, type? }.
 * Kullanım: her route'un generateMetadata/metadata export'unda buildMetadata(...) çağrılır.
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

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/images/og/og-default.svg",
  type = "website"
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}
