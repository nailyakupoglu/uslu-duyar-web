// Curated visual assets — gerçek Uslu Duyar arşivinden üretilen premium kapakları rol bazlı sunar.
// Prop'lar: role/category/href/slug + locale; çıktı public path, mobile path ve localized alt metni.
// Kullanım: hero, kategori, ürün, üretim ve blog görsellerinde SVG fallback yerine sabit seçki.
import type { ProductCategory } from "@/lib/data";

export type VisualAssetRole =
  | "heroPrimary"
  | "heroCitrus"
  | "heroWatermelon"
  | "heroLogistics"
  | "heroRfq"
  | "categoryCitrus"
  | "categoryMelon"
  | "categoryWatermelon"
  | "productCitrusOne"
  | "productCitrusTwo"
  | "productCitrusThree"
  | "productCitrusFour"
  | "productMelonOne"
  | "productMelonTwo"
  | "productWatermelonOne"
  | "productWatermelonTwo"
  | "productionCertificates"
  | "productionFacility"
  | "productionCapacity"
  | "productionSeason"
  | "productionLogistics"
  | "blogCitrus"
  | "blogMelon"
  | "blogColdChain";

export type ResolvedVisualAsset = {
  src: string;
  mobileSrc?: string;
  alt: string;
  position: string;
  mobilePosition: string;
};

type VisualAsset = {
  src: string;
  mobileSrc?: string;
  alt: { tr: string; en: string };
  position?: string;
  mobilePosition?: string;
};

const C = "/media/curated";

const assets = {
  heroPrimary: {
    src: `${C}/hero/hero-primary-desktop.jpg`,
    mobileSrc: `${C}/hero/hero-primary-mobile.jpg`,
    alt: { tr: "Mandalina bahçesinde olgun ürünler", en: "Ripe mandarins in the orchard" },
    position: "52% 50%",
    mobilePosition: "48% 50%"
  },
  heroCitrus: {
    src: `${C}/hero/hero-citrus-desktop.jpg`,
    mobileSrc: `${C}/hero/hero-citrus-mobile.jpg`,
    alt: { tr: "Dalda olgun mandalina salkımları", en: "Ripe mandarin clusters on the branch" },
    position: "48% 48%",
    mobilePosition: "46% 50%"
  },
  heroWatermelon: {
    src: `${C}/hero/hero-watermelon-desktop.jpg`,
    mobileSrc: `${C}/hero/hero-watermelon-mobile.jpg`,
    alt: { tr: "Tarlada toplanmış karpuz yığını", en: "Harvested watermelons stacked in the field" },
    position: "52% 42%",
    mobilePosition: "52% 44%"
  },
  heroLogistics: {
    src: `${C}/hero/hero-logistics-desktop.jpg`,
    mobileSrc: `${C}/hero/hero-logistics-mobile.jpg`,
    alt: { tr: "Karpuz yüklü lojistik aracı", en: "Logistics truck loaded with watermelons" },
    position: "54% 45%",
    mobilePosition: "50% 46%"
  },
  heroRfq: {
    src: `${C}/hero/hero-rfq-desktop.jpg`,
    mobileSrc: `${C}/hero/hero-rfq-mobile.jpg`,
    alt: { tr: "Uslu Duyar tarladan sevkiyata operasyon görseli", en: "Uslu Duyar field-to-shipment operation visual" },
    position: "50% 50%",
    mobilePosition: "50% 50%"
  },
  categoryCitrus: {
    src: `${C}/category/citrus.jpg`,
    alt: { tr: "Mandalina bahçesi kategori görseli", en: "Mandarin orchard category image" },
    position: "50% 46%"
  },
  categoryMelon: {
    src: `${C}/category/melon.jpg`,
    alt: { tr: "Kavun ve karpuz reyonu kategori görseli", en: "Melon and watermelon display category image" },
    position: "50% 50%"
  },
  categoryWatermelon: {
    src: `${C}/category/watermelon.jpg`,
    alt: { tr: "Tarlada hasat edilmiş karpuzlar", en: "Harvested watermelons in the field" },
    position: "50% 46%"
  },
  productCitrusOne: {
    src: `${C}/product/citrus-1.jpg`,
    alt: { tr: "Dalda mandalina ve narenciye ürünü", en: "Mandarin and citrus product on the branch" },
    position: "50% 46%"
  },
  productCitrusTwo: {
    src: `${C}/product/citrus-2.jpg`,
    alt: { tr: "Olgun mandalina salkımı", en: "Ripe mandarin cluster" },
    position: "50% 45%"
  },
  productCitrusThree: {
    src: `${C}/product/citrus-3.jpg`,
    alt: { tr: "Parlak turuncu narenciye dalı", en: "Bright orange citrus branch" },
    position: "50% 46%"
  },
  productCitrusFour: {
    src: `${C}/product/citrus-4.jpg`,
    alt: { tr: "Hasat kasalarında limonlar", en: "Lemons in harvest crates" },
    position: "50% 48%"
  },
  productMelonOne: {
    src: `${C}/product/melon-1.jpg`,
    alt: { tr: "Kavun ve karpuz ürün vitrini", en: "Melon and watermelon product display" },
    position: "50% 50%"
  },
  productMelonTwo: {
    src: `${C}/product/melon-2.jpg`,
    alt: { tr: "Tarlada karpuz ve yazlık ürün hasadı", en: "Watermelon and summer produce harvest in the field" },
    position: "50% 48%"
  },
  productWatermelonOne: {
    src: `${C}/product/watermelon-1.jpg`,
    alt: { tr: "Tarlada çizgili karpuzlar", en: "Striped watermelons in the field" },
    position: "50% 46%"
  },
  productWatermelonTwo: {
    src: `${C}/product/watermelon-2.jpg`,
    alt: { tr: "Karpuz hasadı ve ürün seçimi", en: "Watermelon harvest and product selection" },
    position: "50% 48%"
  },
  productionCertificates: {
    src: `${C}/production/certificates.jpg`,
    alt: { tr: "Uslu Duyar operasyon ve marka görseli", en: "Uslu Duyar operation and brand visual" },
    position: "50% 50%"
  },
  productionFacility: {
    src: `${C}/production/facility.jpg`,
    alt: { tr: "Kavun ve karpuz paketleme vitrini", en: "Melon and watermelon packing display" },
    position: "50% 50%"
  },
  productionCapacity: {
    src: `${C}/production/capacity.jpg`,
    alt: { tr: "Hasat kasalarında limon kapasitesi", en: "Lemon capacity in harvest crates" },
    position: "50% 54%"
  },
  productionSeason: {
    src: `${C}/production/season.jpg`,
    alt: { tr: "Karpuz sezonu tedarik penceresi", en: "Watermelon season supply window" },
    position: "50% 46%"
  },
  productionLogistics: {
    src: `${C}/production/logistics.jpg`,
    alt: { tr: "Karpuz yüklü tır ve lojistik akışı", en: "Watermelon-loaded truck and logistics flow" },
    position: "50% 44%"
  },
  blogCitrus: {
    src: `${C}/blog/cukurova-narenciye-sezonu.jpg`,
    alt: { tr: "Çukurova narenciye sezonu", en: "Çukurova citrus season" },
    position: "50% 50%"
  },
  blogMelon: {
    src: `${C}/blog/kavun-karpuz-tazelik.jpg`,
    alt: { tr: "Kavun karpuz tazelik vitrini", en: "Melon and watermelon freshness display" },
    position: "50% 50%"
  },
  blogColdChain: {
    src: `${C}/blog/soguk-zincir-ve-ihracat.jpg`,
    alt: { tr: "Soğuk zincir ve ihracat lojistiği", en: "Cold-chain and export logistics" },
    position: "50% 45%"
  }
} satisfies Record<VisualAssetRole, VisualAsset>;

const categoryRoles = {
  narenciye: "categoryCitrus",
  kavun: "categoryMelon",
  karpuz: "categoryWatermelon"
} satisfies Record<ProductCategory, VisualAssetRole>;

const productRoles = {
  narenciye: ["productCitrusOne", "productCitrusTwo", "productCitrusThree", "productCitrusFour"],
  kavun: ["productMelonOne", "productMelonTwo"],
  karpuz: ["productWatermelonOne", "productWatermelonTwo"]
} satisfies Record<ProductCategory, VisualAssetRole[]>;

const productionRoles: Record<string, VisualAssetRole> = {
  "/uretim/sertifikalar": "productionCertificates",
  "/uretim/tesis": "productionFacility",
  "/uretim/kapasite": "productionCapacity",
  "/uretim/sezon-takvimi": "productionSeason",
  "/uretim/lojistik": "productionLogistics"
};

const blogRoles: Record<string, VisualAssetRole> = {
  "cukurova-narenciye-sezonu": "blogCitrus",
  "kavun-karpuz-tazelik": "blogMelon",
  "soguk-zincir-ve-ihracat": "blogColdChain"
};

export const heroVisualRoles: VisualAssetRole[] = [
  "heroPrimary",
  "heroCitrus",
  "heroWatermelon",
  "heroLogistics",
  "heroRfq"
];

export function getVisualAsset(role: VisualAssetRole, locale = "tr"): ResolvedVisualAsset {
  const asset: VisualAsset = assets[role];
  return {
    src: asset.src,
    mobileSrc: asset.mobileSrc,
    alt: locale === "en" ? asset.alt.en : asset.alt.tr,
    position: asset.position ?? "50% 50%",
    mobilePosition: asset.mobilePosition ?? asset.position ?? "50% 50%"
  };
}

export function getHeroVisuals(locale = "tr"): ResolvedVisualAsset[] {
  return heroVisualRoles.map((role) => getVisualAsset(role, locale));
}

export function getCategoryVisual(category: ProductCategory, locale = "tr"): ResolvedVisualAsset {
  return getVisualAsset(categoryRoles[category], locale);
}

export function getProductVisuals(category: ProductCategory, locale = "tr"): ResolvedVisualAsset[] {
  return productRoles[category].map((role) => getVisualAsset(role, locale));
}

export function getProductCover(category: ProductCategory, index = 0, locale = "tr"): ResolvedVisualAsset {
  const pool = getProductVisuals(category, locale);
  return pool[index % pool.length] ?? getCategoryVisual(category, locale);
}

export function getProductionVisual(href: string, locale = "tr"): ResolvedVisualAsset | null {
  const role = productionRoles[href];
  return role ? getVisualAsset(role, locale) : null;
}

export function getBlogCover(slug: string, locale = "tr"): ResolvedVisualAsset {
  const role = blogRoles[slug] ?? "blogCitrus";
  return getVisualAsset(role, locale);
}
