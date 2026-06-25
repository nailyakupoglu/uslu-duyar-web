// Locale-çözücü içerik katmanı — data.ts'teki {tr,en} alanları aktif locale'e göre düz string'e çevirir.
// Client component: const locale = useLocale(); Server component: const locale = await getLocale();
import {
  blogPosts,
  categories,
  categoryMeta,
  certifications,
  corporateLinks,
  heroSlides,
  productionHighlights,
  productionLinks,
  products,
  seasonWindows,
  stats,
  timeline,
  type ExportSpec,
  type Product,
  type ProductCategory
} from "@/lib/data";
import { pick } from "@/lib/utils";

export type ResolvedProduct = {
  slug: string;
  category: ProductCategory;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  packageOptions: string[];
  certificates: string[];
  exportSpecs: ResolvedExportSpec;
  specs: { label: string; value: string }[];
  tags: string[];
};

export type ResolvedExportSpec = Omit<
  ExportSpec,
  | "varieties"
  | "caliber"
  | "brix"
  | "packaging"
  | "moq"
  | "containerLoad"
  | "coldChain"
  | "shelfLife"
  | "loadingPort"
  | "note"
> & {
  varieties: string;
  caliber: string;
  brix: string;
  packaging: string;
  moq: string;
  containerLoad: string;
  coldChain: string;
  shelfLife: string;
  loadingPort: string;
  note: string;
};

export function resolveExportSpec(spec: ExportSpec, locale: string): ResolvedExportSpec {
  return {
    ...spec,
    varieties: pick(spec.varieties, locale),
    caliber: pick(spec.caliber, locale),
    brix: pick(spec.brix, locale),
    packaging: pick(spec.packaging, locale),
    moq: pick(spec.moq, locale),
    containerLoad: pick(spec.containerLoad, locale),
    coldChain: pick(spec.coldChain, locale),
    shelfLife: pick(spec.shelfLife, locale),
    loadingPort: pick(spec.loadingPort, locale),
    note: pick(spec.note, locale)
  };
}

export function resolveProduct(product: Product, locale: string): ResolvedProduct {
  return {
    slug: product.slug,
    category: product.category,
    image: product.image,
    gallery: product.gallery,
    tags: product.tags,
    title: pick(product.title, locale),
    shortDescription: pick(product.shortDescription, locale),
    description: pick(product.description, locale),
    packageOptions: product.packageOptions.map((o) => pick(o, locale)),
    certificates: product.certificates.map((c) => pick(c, locale)),
    exportSpecs: resolveExportSpec(product.exportSpecs, locale),
    specs: product.specs.map((s) => ({ label: pick(s.label, locale), value: pick(s.value, locale) }))
  };
}

export function getProducts(locale: string): ResolvedProduct[] {
  return products.map((p) => resolveProduct(p, locale));
}

export function getProductsByCategoryL(category: ProductCategory, locale: string): ResolvedProduct[] {
  return products.filter((p) => p.category === category).map((p) => resolveProduct(p, locale));
}

export function getProductL(category: ProductCategory, slug: string, locale: string): ResolvedProduct | undefined {
  const found = products.find((p) => p.category === category && p.slug === slug);
  return found ? resolveProduct(found, locale) : undefined;
}

export function getCategoriesL(locale: string) {
  return categories.map((c) => ({
    slug: c.slug,
    href: c.href,
    image: c.image,
    icon: c.icon,
    title: pick(c.title, locale),
    description: pick(c.description, locale)
  }));
}

export function getCategoryMetaL(category: ProductCategory, locale: string) {
  const m = categoryMeta[category];
  return { title: pick(m.title, locale), description: pick(m.description, locale) };
}

export function getProductionHighlightsL(locale: string) {
  return productionHighlights.map((p) => ({
    href: p.href,
    image: p.image,
    icon: p.icon,
    title: pick(p.title, locale),
    description: pick(p.description, locale)
  }));
}

export function getHeroSlidesL(locale: string) {
  return heroSlides.map((s) => ({
    image: s.image,
    href: s.href,
    title: pick(s.title, locale),
    eyebrow: pick(s.eyebrow, locale),
    description: pick(s.description, locale),
    cta: pick(s.cta, locale)
  }));
}

export function getStatsL(locale: string) {
  return stats.map((s) => ({ value: s.value, suffix: pick(s.suffix, locale), label: pick(s.label, locale) }));
}

export function getCertificationsL(locale: string): string[] {
  return certifications.map((c) => pick(c, locale));
}

export function getBlogPostsL(locale: string) {
  return blogPosts.map((p) => ({
    slug: p.slug,
    date: p.date,
    tags: p.tags,
    readingMinutes: p.readingMinutes,
    title: pick(p.title, locale),
    excerpt: pick(p.excerpt, locale),
    category: pick(p.category, locale)
  }));
}

export function getCorporateLinksL(locale: string) {
  return corporateLinks.map((l) => ({ href: l.href, icon: l.icon, title: pick(l.title, locale) }));
}

export function getProductionLinksL(locale: string) {
  return productionLinks.map((l) => ({ href: l.href, icon: l.icon, title: pick(l.title, locale) }));
}

export function getSeasonWindowsL(locale: string) {
  return seasonWindows.map((window) => ({
    category: window.category,
    title: pick(window.title, locale),
    months: window.months,
    peakMonths: window.peakMonths,
    note: pick(window.note, locale)
  }));
}

export function getTimelineL(locale: string) {
  return timeline.map((t) => ({ year: t.year, title: pick(t.title, locale), text: pick(t.text, locale) }));
}
