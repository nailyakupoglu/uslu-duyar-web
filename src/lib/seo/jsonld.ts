/**
 * JSON-LD yapısal veri üreticileri (schema.org).
 * Prop'lar: yok (siteConfig'ten besleniyor) / breadcrumb için { items }.
 * Kullanım: layout/sayfa <script type="application/ld+json"> içinde JSON.stringify ile gömülür.
 */
import { siteConfig } from "@/lib/data";

type JsonLd = Record<string, unknown>;

/** Organization şeması — firma kimliği, iletişim ve sosyal profiller. */
export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logos/logo.svg`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Mersin",
      addressCountry: "TR"
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin, siteConfig.social.facebook].filter(
      (value) => value && value !== "#"
    )
  };
}

/** WebSite şeması — site geneli arama eylemi tanımı. */
export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "tr-TR"
  };
}

/** BreadcrumbList şeması — sayfa kırılım yolu. */
export function breadcrumbJsonLd(items: { name: string; href: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`
    }))
  };
}

/** Product şeması — ürün detay sayfaları için. */
export function productJsonLd(input: {
  name: string;
  description: string;
  image: string;
  category: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: input.image.startsWith("http") ? input.image : `${siteConfig.url}${input.image}`,
    category: input.category,
    brand: {
      "@type": "Brand",
      name: siteConfig.name
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.legalName
    }
  };
}

/** Article şeması — blog yazıları için. */
export function articleJsonLd(input: {
  title: string;
  description: string;
  date: string;
  slug: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.date,
    url: `${siteConfig.url}/blog/${input.slug}`,
    author: {
      "@type": "Organization",
      name: siteConfig.legalName
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logos/logo.svg`
      }
    }
  };
}
