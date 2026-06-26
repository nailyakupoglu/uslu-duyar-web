import {
  Award,
  CalendarDays,
  Cherry,
  Citrus,
  Ship,
  Snowflake,
  Sun,
  Truck,
  Warehouse
} from "lucide-react";
import type { I18nText } from "@/lib/utils";

export const siteConfig = {
  name: "Uslu Duyar",
  legalName: "Uslu Duyar Tarım Ürünleri Ltd. Şti.",
  slogan: {
    tr: "Aldatılan müşteri, kaybedilen bir servettir.",
    en: "A deceived customer is a fortune lost."
  } satisfies I18nText,
  description: {
    tr: "1991'den bu yana Mersin, Adana ve Çukurova bölgesinde narenciye, kavun ve karpuz üretimi, ihracatı, toptan satışı ve market tedariği yapıyoruz. Tarladan markete güvenilir tedarik zinciri.",
    en: "Since 1991, we have grown, exported, and wholesaled citrus, melon, and watermelon across the Mersin, Adana, and Çukurova region, supplying retail chains. A reliable farm-to-market supply chain."
  } satisfies I18nText,
  url: "https://usluduyar.evohaus.org",
  email: "info@usluduyar.com",
  phone: "+90 324 000 00 00",
  whatsapp: "+90 532 000 00 00",
  address: "Çukurova Bölgesi — Mersin / Adana, Türkiye",
  legal: {
    mersisNo: null,
    taxOffice: null,
    taxNo: null,
    exporterUnion: null
  },
  social: {
    instagram: "#",
    linkedin: "#",
    facebook: "#"
  }
} as const;

export type HeroSlide = {
  title: I18nText;
  eyebrow: I18nText;
  description: I18nText;
  image: string;
  cta: I18nText;
  href: string;
};

export const heroSlides: HeroSlide[] = [
  {
    title: { tr: "Tarladan Markete, 1991'den Bu Yana Güven", en: "Farm to Market, Trusted Since 1991" },
    eyebrow: { tr: "Mersin & Çukurova merkezli taze ürün tedariki", en: "Fresh produce supply from Mersin & Çukurova" },
    description: {
      tr: "Narenciye, kavun ve karpuzda kendi üretimimiz ve sözleşmeli üretici ağımızla; toptan, market ve ihracat kanallarına kesintisiz taze ürün.",
      en: "Citrus, melon, and watermelon from our own production and contracted growers; uninterrupted fresh supply to wholesale, retail, and export channels."
    },
    image: "/images/hero/hero-1.svg",
    cta: { tr: "Ürünleri İncele", en: "Explore Products" },
    href: "/urunler"
  },
  {
    title: { tr: "Çukurova'nın Güneşinden Narenciye", en: "Citrus from the Çukurova Sun" },
    eyebrow: { tr: "Portakal, mandalina, limon, greyfurt", en: "Orange, mandarin, lemon, grapefruit" },
    description: {
      tr: "Hasat, boylama, soğuk zincir ve paketleme adımlarında izlenebilir kalite; ihracat standartlarına uygun sevkiyat.",
      en: "Traceable quality across harvest, grading, cold chain, and packing; shipments compliant with export standards."
    },
    image: "/images/hero/hero-2.svg",
    cta: { tr: "Narenciye Ürünleri", en: "Citrus Products" },
    href: "/urunler?cat=narenciye"
  },
  {
    title: { tr: "Yaz Sezonunun Lezzeti: Kavun & Karpuz", en: "Taste of Summer: Melon & Watermelon" },
    eyebrow: { tr: "Kırkağaç, altınbaş kavun ve karpuz", en: "Kırkağaç, altınbaş melon and watermelon" },
    description: {
      tr: "Tarlada seçim, doğru olgunlukta hasat ve hızlı sevkiyatla; market raflarına ve toptan alıcıya taze ulaşım.",
      en: "Field selection, harvest at the right ripeness, and fast shipping; fresh delivery to retail shelves and wholesale buyers."
    },
    image: "/images/hero/hero-3.svg",
    cta: { tr: "Kavun & Karpuz", en: "Melon & Watermelon" },
    href: "/urunler?cat=kavun"
  },
  {
    title: { tr: "Yurt İçi Toptan ve Yurt Dışı İhracat", en: "Domestic Wholesale and Export" },
    eyebrow: { tr: "Mersin Limanı avantajı", en: "The Port of Mersin advantage" },
    description: {
      tr: "Market zincirleri ve toptan alıcılar için düzenli tedarik; ihracat operasyonlarında soğuk zincir ve evrak akışı.",
      en: "Steady supply for retail chains and wholesale buyers; cold chain and documentation flow for export operations."
    },
    image: "/images/hero/hero-4.svg",
    cta: { tr: "Lojistik Gücümüz", en: "Our Logistics" },
    href: "/uretim/lojistik"
  },
  {
    title: { tr: "Teklif Dosyası Hazır Bir Tedarik Zinciri", en: "A Supply Chain Ready for RFQ Files" },
    eyebrow: { tr: "Kalibre, Brix, Incoterm, liman ve sezon tek akışta", en: "Calibre, Brix, Incoterm, port and season in one flow" },
    description: {
      tr: "Alıcıya sadece ürün fotoğrafı değil; parti bazlı yükleme penceresi, soğuk zincir planı ve ihracat bilgisiyle dönüş yapan premium B2B tedarik yaklaşımı.",
      en: "A premium B2B supply approach that responds with lot-based loading windows, cold-chain plan and export data — not only product photos."
    },
    image: "/images/hero/hero-4.svg",
    cta: { tr: "Teklif Talebi Gönder", en: "Send RFQ" },
    href: "/iletisim"
  }
];

export type Category = {
  title: I18nText;
  slug: string;
  href: string;
  description: I18nText;
  image: string;
  icon: typeof Citrus;
};

export const categories: Category[] = [
  {
    title: { tr: "Narenciye", en: "Citrus" },
    slug: "narenciye",
    href: "/urunler?cat=narenciye",
    description: {
      tr: "Portakal, mandalina, limon ve greyfurt; Çukurova'nın bereketli narenciye hasadı.",
      en: "Orange, mandarin, lemon, and grapefruit; the bountiful citrus harvest of Çukurova."
    },
    image: "/images/categories/narenciye.svg",
    icon: Citrus
  },
  {
    title: { tr: "Kavun", en: "Melon" },
    slug: "kavun",
    href: "/urunler?cat=kavun",
    description: {
      tr: "Kırkağaç ve altınbaş kavun çeşitleri; doğru olgunlukta hasat, hızlı sevkiyat.",
      en: "Kırkağaç and altınbaş melon varieties; harvested at the right ripeness, shipped fast."
    },
    image: "/images/categories/kavun.svg",
    icon: Sun
  },
  {
    title: { tr: "Karpuz", en: "Watermelon" },
    slug: "karpuz",
    href: "/urunler?cat=karpuz",
    description: {
      tr: "Tarlada seçilmiş, ağırlık ve tatlılık dengesi korunmuş taze karpuz.",
      en: "Field-selected fresh watermelon with a balance of weight and sweetness."
    },
    image: "/images/categories/karpuz.svg",
    icon: Cherry
  }
];

export type ProductionHighlight = {
  title: I18nText;
  href: string;
  description: I18nText;
  image: string;
  icon: typeof Award;
};

export const productionHighlights: ProductionHighlight[] = [
  {
    title: { tr: "Sertifikalar", en: "Certifications" },
    href: "/uretim/sertifikalar",
    description: {
      tr: "Gıda güvenliği, izlenebilirlik ve ihracat uygunluğuna yönelik belgeler (operatör dosyalarıyla güncellenecek).",
      en: "Documents for food safety, traceability, and export compliance (to be updated with operator files)."
    },
    image: "/images/production/sertifikalar.svg",
    icon: Award
  },
  {
    title: { tr: "Tesis & Paketleme", en: "Facility & Packing" },
    href: "/uretim/tesis",
    description: {
      tr: "Boylama, ayıklama, paketleme ve depolama alanları tek akışta; fason paketleme desteği.",
      en: "Grading, sorting, packing, and storage in a single flow; contract packing support."
    },
    image: "/images/production/tesis.svg",
    icon: Warehouse
  },
  {
    title: { tr: "Soğuk Zincir & Kapasite", en: "Cold Chain & Capacity" },
    href: "/uretim/kapasite",
    description: {
      tr: "Soğuk hava deposu ve sezon boyu kesintisiz tedarik; izlenebilir parti yönetimi.",
      en: "Cold storage and season-long uninterrupted supply; traceable batch management."
    },
    image: "/images/production/kapasite.svg",
    icon: Snowflake
  },
  {
    title: { tr: "Sezon Takvimi", en: "Season Calendar" },
    href: "/uretim/sezon-takvimi",
    description: {
      tr: "Narenciye, kavun ve karpuz için ay-ay tedarik penceresi ve yükleme planı.",
      en: "Month-by-month supply windows and loading plan for citrus, melon, and watermelon."
    },
    image: "/images/production/kapasite.svg",
    icon: CalendarDays
  },
  {
    title: { tr: "Lojistik", en: "Logistics" },
    href: "/uretim/lojistik",
    description: {
      tr: "Mersin Limanı bağlantısı, soğuk zincir nakliye ve ihracat evrak akışı.",
      en: "Port of Mersin connection, cold chain transport, and export documentation flow."
    },
    image: "/images/production/lojistik.svg",
    icon: Truck
  }
];

export type ProductCategory = "narenciye" | "kavun" | "karpuz";

export type Spec = { label: I18nText; value: I18nText };
export type ExportSpec = {
  varieties: I18nText;
  seasonMonths: number[];
  caliber: I18nText;
  brix: I18nText;
  packaging: I18nText;
  moq: I18nText;
  containerLoad: I18nText;
  coldChain: I18nText;
  shelfLife: I18nText;
  hsCode: string;
  incoterms: string[];
  loadingPort: I18nText;
  note: I18nText;
};

export type Product = {
  slug: string;
  category: ProductCategory;
  title: I18nText;
  shortDescription: I18nText;
  description: I18nText;
  image: string;
  gallery: string[];
  packageOptions: I18nText[];
  certificates: I18nText[];
  exportSpecs: ExportSpec;
  specs: Spec[];
  tags: string[];
};

export type SeasonWindow = {
  category: ProductCategory;
  title: I18nText;
  months: number[];
  peakMonths: number[];
  note: I18nText;
};

const DEFAULT_INCOTERMS = ["FOB", "CFR", "CIF"] as const;

const PKG = {
  koli: { tr: "Koli", en: "Box" },
  palet: { tr: "Palet", en: "Pallet" },
  dokme: { tr: "Dökme (toptan)", en: "Bulk (wholesale)" },
  sozlesmeli: { tr: "Sözleşmeli sevkiyat", en: "Contract shipment" }
} satisfies Record<string, I18nText>;

const CERT = {
  mense: { tr: "Menşe belgesi", en: "Certificate of origin" },
  izleme: { tr: "Parti izlenebilirlik", en: "Batch traceability" },
  soguk: { tr: "Soğuk zincir", en: "Cold chain" },
  globalgap: { tr: "GLOBALG.A.P dosyası hazırlanıyor", en: "GLOBALG.A.P file pending" },
  iso: { tr: "ISO 22000 dosyası hazırlanıyor", en: "ISO 22000 file pending" }
} satisfies Record<string, I18nText>;

export const monthLabels: { short: I18nText; long: I18nText }[] = [
  { short: { tr: "Oca", en: "Jan" }, long: { tr: "Ocak", en: "January" } },
  { short: { tr: "Şub", en: "Feb" }, long: { tr: "Şubat", en: "February" } },
  { short: { tr: "Mar", en: "Mar" }, long: { tr: "Mart", en: "March" } },
  { short: { tr: "Nis", en: "Apr" }, long: { tr: "Nisan", en: "April" } },
  { short: { tr: "May", en: "May" }, long: { tr: "Mayıs", en: "May" } },
  { short: { tr: "Haz", en: "Jun" }, long: { tr: "Haziran", en: "June" } },
  { short: { tr: "Tem", en: "Jul" }, long: { tr: "Temmuz", en: "July" } },
  { short: { tr: "Ağu", en: "Aug" }, long: { tr: "Ağustos", en: "August" } },
  { short: { tr: "Eyl", en: "Sep" }, long: { tr: "Eylül", en: "September" } },
  { short: { tr: "Eki", en: "Oct" }, long: { tr: "Ekim", en: "October" } },
  { short: { tr: "Kas", en: "Nov" }, long: { tr: "Kasım", en: "November" } },
  { short: { tr: "Ara", en: "Dec" }, long: { tr: "Aralık", en: "December" } }
];

export const seasonWindows: SeasonWindow[] = [
  {
    category: "narenciye",
    title: { tr: "Narenciye", en: "Citrus" },
    months: [1, 2, 3, 4, 5, 9, 10, 11, 12],
    peakMonths: [11, 12, 1, 2, 3],
    note: {
      tr: "Portakal, mandalina, limon ve greyfurt parti bazlı çeşitlere göre ayrılır.",
      en: "Orange, mandarin, lemon, and grapefruit are split by variety and harvest lot."
    }
  },
  {
    category: "kavun",
    title: { tr: "Kavun", en: "Melon" },
    months: [5, 6, 7, 8, 9],
    peakMonths: [6, 7, 8],
    note: {
      tr: "Kırkağaç ve altınbaş tipleri olgunluk ve ağırlık seçimine göre yüklenir.",
      en: "Kırkağaç and Altınbaş types are loaded by ripeness and weight selection."
    }
  },
  {
    category: "karpuz",
    title: { tr: "Karpuz", en: "Watermelon" },
    months: [4, 5, 6, 7, 8, 9],
    peakMonths: [5, 6, 7, 8],
    note: {
      tr: "Standart ve mini karpuz yüklemeleri ağırlık sınıfına göre ayrılır.",
      en: "Standard and mini watermelon loads are split by weight class."
    }
  }
];

export const products: Product[] = [
  {
    slug: "portakal",
    category: "narenciye",
    title: { tr: "Portakal", en: "Orange" },
    shortDescription: {
      tr: "Washington ve Valencia tipi; sofralık ve sıkmalık çeşitler.",
      en: "Washington and Valencia types; table and juicing varieties."
    },
    description: {
      tr: "Çukurova bölgesinde yetişen portakal; boylama ve soğuk zincir adımlarıyla market ve ihracat kanallarına taze sevk edilir. Çeşit ve kalibre bilgisi operatör verisiyle güncellenecektir.",
      en: "Oranges grown in the Çukurova region; shipped fresh to retail and export channels through grading and cold chain. Variety and caliber details will be updated with operator data."
    },
    image: "/images/categories/narenciye.svg",
    gallery: ["/images/categories/narenciye.svg", "/images/hero/hero-2.svg"],
    packageOptions: [PKG.koli, PKG.palet, PKG.dokme],
    certificates: [CERT.mense, CERT.izleme, CERT.soguk, CERT.globalgap],
    exportSpecs: {
      varieties: "Washington Navel / Valencia",
      seasonMonths: [11, 12, 1, 2, 3, 4, 5],
      caliber: "56 / 64 / 72 / 80 / 88 count",
      brix: { tr: "11-13 Brix (parti analizine göre)", en: "11-13 Brix (by lot analysis)" },
      packaging: { tr: "15 kg teleskopik koli, paletli yükleme", en: "15 kg telescopic box, palletized loading" },
      moq: { tr: "5 ton deneme yükü / tam konteyner teklif", en: "5 t trial load / full-container quote" },
      containerLoad: { tr: "20-22 ton / 40ft reefer", en: "20-22 t / 40ft reefer" },
      coldChain: "4-8°C",
      shelfLife: { tr: "45-60 gün partiye göre", en: "45-60 days depending on lot" },
      hsCode: "0805.10",
      incoterms: [...DEFAULT_INCOTERMS],
      loadingPort: { tr: "Mersin Limanı", en: "Port of Mersin" },
      note: { tr: "Kalibre ve Brix değerleri hasat partisine göre teyit edilir.", en: "Calibre and Brix values are confirmed per harvest lot." }
    },
    specs: [
      { label: { tr: "Çeşit", en: "Variety" }, value: "Washington / Valencia" },
      { label: { tr: "Kalibre", en: "Caliber" }, value: "56 / 64 / 72 / 80 / 88" },
      { label: { tr: "Sezon", en: "Season" }, value: { tr: "Kasım-Mayıs", en: "November-May" } }
    ],
    tags: ["narenciye", "portakal", "ihracat"]
  },
  {
    slug: "mandalina",
    category: "narenciye",
    title: { tr: "Mandalina", en: "Mandarin" },
    shortDescription: {
      tr: "Satsuma ve klemantin; kolay soyulan, aromatik çeşitler.",
      en: "Satsuma and clementine; easy-peel, aromatic varieties."
    },
    description: {
      tr: "Mandalina; erken ve geç sezon çeşitleriyle uzun bir tedarik penceresi sunar. Hasat sonrası seçim ve paketleme ile taze ulaştırılır.",
      en: "Mandarins offer a long supply window with early and late-season varieties. Delivered fresh through post-harvest selection and packing."
    },
    image: "/images/categories/narenciye.svg",
    gallery: ["/images/categories/narenciye.svg"],
    packageOptions: [PKG.koli, PKG.palet, PKG.dokme],
    certificates: [CERT.mense, CERT.izleme, CERT.globalgap],
    exportSpecs: {
      varieties: { tr: "Satsuma / Klemantin", en: "Satsuma / Clementine" },
      seasonMonths: [9, 10, 11, 12, 1, 2],
      caliber: "1X / 1 / 2 / 3 / 4",
      brix: { tr: "10-12 Brix (parti analizine göre)", en: "10-12 Brix (by lot analysis)" },
      packaging: { tr: "10 kg açık kasa veya teleskopik koli", en: "10 kg open-top crate or telescopic box" },
      moq: { tr: "5 ton deneme yükü / karma konteyner", en: "5 t trial load / mixed container" },
      containerLoad: { tr: "19-21 ton / 40ft reefer", en: "19-21 t / 40ft reefer" },
      coldChain: "4-8°C",
      shelfLife: { tr: "30-45 gün partiye göre", en: "30-45 days depending on lot" },
      hsCode: "0805.21",
      incoterms: [...DEFAULT_INCOTERMS],
      loadingPort: { tr: "Mersin Limanı", en: "Port of Mersin" },
      note: { tr: "Kabuk rengi ve kolay soyulma partide kontrol edilir.", en: "Peel colour and easy-peel quality are checked by lot." }
    },
    specs: [
      { label: { tr: "Çeşit", en: "Variety" }, value: { tr: "Satsuma / Klemantin", en: "Satsuma / Clementine" } },
      { label: { tr: "Kalibre", en: "Caliber" }, value: "1X / 1 / 2 / 3 / 4" },
      { label: { tr: "Sezon", en: "Season" }, value: { tr: "Eylül-Şubat", en: "September-February" } }
    ],
    tags: ["narenciye", "mandalina"]
  },
  {
    slug: "limon",
    category: "narenciye",
    title: { tr: "Limon", en: "Lemon" },
    shortDescription: {
      tr: "Enterdonat ve Lamas; yüksek sululuk ve raf ömrü.",
      en: "Enterdonat and Lamas; high juiciness and shelf life."
    },
    description: {
      tr: "Limon; iç piyasa ve ihracat için uzun raf ömrü ve dayanıklılığıyla öne çıkar. Soğuk hava deposunda saklanarak sezon boyu tedarik edilir.",
      en: "Lemons stand out with long shelf life and durability for domestic and export markets. Stored in cold storage and supplied throughout the season."
    },
    image: "/images/categories/narenciye.svg",
    gallery: ["/images/categories/narenciye.svg"],
    packageOptions: [PKG.koli, PKG.palet, PKG.dokme],
    certificates: [CERT.mense, CERT.soguk, CERT.iso],
    exportSpecs: {
      varieties: { tr: "Enterdonat / Lamas", en: "Enterdonat / Lamas" },
      seasonMonths: [9, 10, 11, 12, 1, 2, 3, 4],
      caliber: "45 / 54 / 63 / 72 / 80 / 88",
      brix: { tr: "Asit/sululuk parti analizine göre", en: "Acidity/juice ratio by lot analysis" },
      packaging: { tr: "15 kg teleskopik koli, file opsiyonlu", en: "15 kg telescopic box, net bag option" },
      moq: { tr: "5 ton deneme yükü / tam konteyner teklif", en: "5 t trial load / full-container quote" },
      containerLoad: { tr: "20-22 ton / 40ft reefer", en: "20-22 t / 40ft reefer" },
      coldChain: "8-10°C",
      shelfLife: { tr: "60-90 gün depolama koşuluna göre", en: "60-90 days depending on storage conditions" },
      hsCode: "0805.50",
      incoterms: [...DEFAULT_INCOTERMS],
      loadingPort: { tr: "Mersin Limanı", en: "Port of Mersin" },
      note: { tr: "Depolama süresi ve mumlama talebe göre tekliflenir.", en: "Storage duration and waxing are quoted on request." }
    },
    specs: [
      { label: { tr: "Çeşit", en: "Variety" }, value: { tr: "Enterdonat / Lamas", en: "Enterdonat / Lamas" } },
      { label: { tr: "Kalibre", en: "Caliber" }, value: "45 / 54 / 63 / 72 / 80 / 88" },
      { label: { tr: "Sezon", en: "Season" }, value: { tr: "Eylül-Nisan", en: "September-April" } }
    ],
    tags: ["narenciye", "limon", "ihracat"]
  },
  {
    slug: "greyfurt",
    category: "narenciye",
    title: { tr: "Greyfurt", en: "Grapefruit" },
    shortDescription: {
      tr: "Star Ruby; canlı renk ve dengeli tat.",
      en: "Star Ruby; vivid color and balanced taste."
    },
    description: {
      tr: "Greyfurt; ihracat pazarlarında talep gören kırmızı etli çeşitleriyle hazırlanır. Boylama ve paketleme sonrası sevk edilir.",
      en: "Grapefruit is prepared with red-fleshed varieties in demand across export markets. Shipped after grading and packing."
    },
    image: "/images/categories/narenciye.svg",
    gallery: ["/images/categories/narenciye.svg"],
    packageOptions: [PKG.koli, PKG.palet],
    certificates: [CERT.mense, CERT.izleme, CERT.globalgap],
    exportSpecs: {
      varieties: "Star Ruby",
      seasonMonths: [11, 12, 1, 2, 3],
      caliber: "32 / 36 / 40 / 45 / 48 / 56",
      brix: { tr: "9-11 Brix (renk ve sululuk kontrolüyle)", en: "9-11 Brix (with colour and juice checks)" },
      packaging: { tr: "15 kg teleskopik koli", en: "15 kg telescopic box" },
      moq: { tr: "5 ton deneme yükü / karma konteyner", en: "5 t trial load / mixed container" },
      containerLoad: { tr: "20-22 ton / 40ft reefer", en: "20-22 t / 40ft reefer" },
      coldChain: "8-10°C",
      shelfLife: { tr: "45-60 gün partiye göre", en: "45-60 days depending on lot" },
      hsCode: "0805.40",
      incoterms: [...DEFAULT_INCOTERMS],
      loadingPort: { tr: "Mersin Limanı", en: "Port of Mersin" },
      note: { tr: "Kırmızı et rengi ve kabuk temizliği parti fotoğrafıyla paylaşılır.", en: "Red flesh colour and peel quality are shared with lot photos." }
    },
    specs: [
      { label: { tr: "Çeşit", en: "Variety" }, value: "Star Ruby" },
      { label: { tr: "Kalibre", en: "Caliber" }, value: "32 / 36 / 40 / 45 / 48 / 56" },
      { label: { tr: "Sezon", en: "Season" }, value: { tr: "Kasım-Mart", en: "November-March" } }
    ],
    tags: ["narenciye", "greyfurt", "ihracat"]
  },
  {
    slug: "kirkagac-kavun",
    category: "kavun",
    title: { tr: "Kırkağaç Kavunu", en: "Kırkağaç Melon" },
    shortDescription: {
      tr: "Yüksek aroma ve dayanıklı kabuk; nakliyeye uygun.",
      en: "High aroma and durable rind; suited for transport."
    },
    description: {
      tr: "Kırkağaç kavunu; doğru olgunlukta hasat edilip hızlı sevkiyatla market ve toptan alıcıya ulaştırılır. Ağırlık aralığı operatör verisiyle güncellenecektir.",
      en: "Kırkağaç melon is harvested at the right ripeness and delivered quickly to retail and wholesale buyers. Weight range will be updated with operator data."
    },
    image: "/images/categories/kavun.svg",
    gallery: ["/images/categories/kavun.svg", "/images/hero/hero-3.svg"],
    packageOptions: [PKG.koli, PKG.palet, PKG.dokme],
    certificates: [CERT.mense, CERT.izleme],
    exportSpecs: {
      varieties: { tr: "Kırkağaç", en: "Kırkağaç" },
      seasonMonths: [5, 6, 7, 8, 9],
      caliber: { tr: "1.5-3.5 kg/adet", en: "1.5-3.5 kg/piece" },
      brix: { tr: "10-13 Brix (olgunluk kontrolüyle)", en: "10-13 Brix (with ripeness check)" },
      packaging: { tr: "Dökme kasa, karton koli veya paletli yükleme", en: "Bulk crate, carton box, or palletized loading" },
      moq: { tr: "3 ton deneme yükü / sezon kontratı", en: "3 t trial load / seasonal contract" },
      containerLoad: { tr: "18-20 ton / 40ft reefer", en: "18-20 t / 40ft reefer" },
      coldChain: "7-10°C",
      shelfLife: { tr: "20-35 gün olgunluk sınıfına göre", en: "20-35 days depending on ripeness class" },
      hsCode: "0807.19",
      incoterms: [...DEFAULT_INCOTERMS],
      loadingPort: { tr: "Mersin Limanı", en: "Port of Mersin" },
      note: { tr: "Olgunluk sınıfı yükleme öncesi fotoğraf ve parti notuyla bildirilir.", en: "Ripeness class is shared with pre-loading photos and lot notes." }
    },
    specs: [
      { label: { tr: "Çeşit", en: "Variety" }, value: { tr: "Kırkağaç", en: "Kırkağaç" } },
      { label: { tr: "Ağırlık", en: "Weight" }, value: { tr: "1.5-3.5 kg/adet", en: "1.5-3.5 kg/piece" } },
      { label: { tr: "Sezon", en: "Season" }, value: { tr: "Mayıs-Eylül", en: "May-September" } }
    ],
    tags: ["kavun", "kırkağaç"]
  },
  {
    slug: "altinbas-kavun",
    category: "kavun",
    title: { tr: "Altınbaş Kavunu", en: "Altınbaş Melon" },
    shortDescription: {
      tr: "Tatlı ve sulu; iç piyasa ve market için popüler çeşit.",
      en: "Sweet and juicy; a popular variety for domestic and retail."
    },
    description: {
      tr: "Altınbaş kavunu; tatlılık ve sululuk dengesiyle öne çıkar. Tarlada seçim ve hızlı tedarikle tazeliği korunur.",
      en: "Altınbaş melon stands out with a balance of sweetness and juiciness. Its freshness is preserved through field selection and fast supply."
    },
    image: "/images/categories/kavun.svg",
    gallery: ["/images/categories/kavun.svg"],
    packageOptions: [PKG.koli, PKG.palet, PKG.dokme],
    certificates: [CERT.mense, CERT.izleme],
    exportSpecs: {
      varieties: { tr: "Altınbaş", en: "Altınbaş" },
      seasonMonths: [6, 7, 8, 9],
      caliber: { tr: "1.2-3 kg/adet", en: "1.2-3 kg/piece" },
      brix: { tr: "10-12 Brix (olgunluk kontrolüyle)", en: "10-12 Brix (with ripeness check)" },
      packaging: { tr: "Karton koli, dökme kasa veya palet", en: "Carton box, bulk crate, or pallet" },
      moq: { tr: "3 ton deneme yükü / sezon kontratı", en: "3 t trial load / seasonal contract" },
      containerLoad: { tr: "18-20 ton / 40ft reefer", en: "18-20 t / 40ft reefer" },
      coldChain: "7-10°C",
      shelfLife: { tr: "18-30 gün partiye göre", en: "18-30 days depending on lot" },
      hsCode: "0807.19",
      incoterms: [...DEFAULT_INCOTERMS],
      loadingPort: { tr: "Mersin Limanı", en: "Port of Mersin" },
      note: { tr: "Tatlılık ve kabuk dayanımı yükleme öncesi kontrol edilir.", en: "Sweetness and rind durability are checked before loading." }
    },
    specs: [
      { label: { tr: "Çeşit", en: "Variety" }, value: { tr: "Altınbaş", en: "Altınbaş" } },
      { label: { tr: "Ağırlık", en: "Weight" }, value: { tr: "1.2-3 kg/adet", en: "1.2-3 kg/piece" } },
      { label: { tr: "Sezon", en: "Season" }, value: { tr: "Haziran-Eylül", en: "June-September" } }
    ],
    tags: ["kavun", "altınbaş"]
  },
  {
    slug: "karpuz",
    category: "karpuz",
    title: { tr: "Karpuz", en: "Watermelon" },
    shortDescription: {
      tr: "Tarlada seçilmiş; tatlılık ve ağırlık dengesi.",
      en: "Field-selected; a balance of sweetness and weight."
    },
    description: {
      tr: "Karpuz; doğru olgunlukta hasat, ağırlık seçimi ve hızlı sevkiyatla market ve toptan alıcıya taze ulaştırılır. Çeşit ve kalibre bilgisi operatör verisiyle güncellenecektir.",
      en: "Watermelon is delivered fresh to retail and wholesale buyers through ripe harvest, weight selection, and fast shipping. Variety and caliber details will be updated with operator data."
    },
    image: "/images/categories/karpuz.svg",
    gallery: ["/images/categories/karpuz.svg", "/images/hero/hero-1.svg"],
    packageOptions: [PKG.dokme, PKG.palet, PKG.sozlesmeli],
    certificates: [CERT.mense, CERT.izleme],
    exportSpecs: {
      varieties: { tr: "Crimson / Kara karpuz", en: "Crimson / Dark watermelon" },
      seasonMonths: [4, 5, 6, 7, 8, 9],
      caliber: { tr: "6-12 kg/adet", en: "6-12 kg/piece" },
      brix: { tr: "10-12 Brix (kesim kontrolüyle)", en: "10-12 Brix (with cut-sample check)" },
      packaging: { tr: "Dökme kasa, palet veya file opsiyonlu", en: "Bulk crate, pallet, or net option" },
      moq: { tr: "5 ton deneme yükü / tam tır", en: "5 t trial load / full truck" },
      containerLoad: { tr: "21-24 ton / 40ft reefer", en: "21-24 t / 40ft reefer" },
      coldChain: "7-10°C",
      shelfLife: { tr: "18-28 gün olgunluk sınıfına göre", en: "18-28 days depending on ripeness class" },
      hsCode: "0807.11",
      incoterms: [...DEFAULT_INCOTERMS],
      loadingPort: { tr: "Mersin Limanı", en: "Port of Mersin" },
      note: { tr: "Ağırlık sınıfı ve kesim numunesi yükleme öncesi paylaşılır.", en: "Weight class and cut sample are shared before loading." }
    },
    specs: [
      { label: { tr: "Çeşit", en: "Variety" }, value: { tr: "Crimson / Kara karpuz", en: "Crimson / Dark watermelon" } },
      { label: { tr: "Ağırlık", en: "Weight" }, value: { tr: "6-12 kg/adet", en: "6-12 kg/piece" } },
      { label: { tr: "Sezon", en: "Season" }, value: { tr: "Nisan-Eylül", en: "April-September" } }
    ],
    tags: ["karpuz", "yaz"]
  },
  {
    slug: "mini-karpuz",
    category: "karpuz",
    title: { tr: "Mini Karpuz", en: "Mini Watermelon" },
    shortDescription: {
      tr: "Küçük kalibre; perakende ve market için uygun porsiyon.",
      en: "Small caliber; a portion suited for retail."
    },
    description: {
      tr: "Mini karpuz; market rafı ve küçük hane tüketimi için ideal kalibrede hazırlanır. Talebe göre paketleme yapılır.",
      en: "Mini watermelon is prepared in an ideal caliber for retail shelves and small households. Packed on demand."
    },
    image: "/images/categories/karpuz.svg",
    gallery: ["/images/categories/karpuz.svg"],
    packageOptions: [PKG.koli, PKG.palet],
    certificates: [CERT.mense, CERT.izleme],
    exportSpecs: {
      varieties: { tr: "Mini / personal size", en: "Mini / personal size" },
      seasonMonths: [5, 6, 7, 8, 9],
      caliber: { tr: "1.5-3 kg/adet", en: "1.5-3 kg/piece" },
      brix: { tr: "10-12 Brix (kesim kontrolüyle)", en: "10-12 Brix (with cut-sample check)" },
      packaging: { tr: "Karton koli veya market kasası", en: "Carton box or retail crate" },
      moq: { tr: "3 ton deneme yükü / perakende parti", en: "3 t trial load / retail lot" },
      containerLoad: { tr: "18-21 ton / 40ft reefer", en: "18-21 t / 40ft reefer" },
      coldChain: "7-10°C",
      shelfLife: { tr: "14-24 gün olgunluk sınıfına göre", en: "14-24 days depending on ripeness class" },
      hsCode: "0807.11",
      incoterms: [...DEFAULT_INCOTERMS],
      loadingPort: { tr: "Mersin Limanı", en: "Port of Mersin" },
      note: { tr: "Market raf standardı için adet/koli bilgisi talebe göre netleşir.", en: "Pieces per box for retail shelf standards are confirmed on request." }
    },
    specs: [
      { label: { tr: "Çeşit", en: "Variety" }, value: { tr: "Mini", en: "Mini" } },
      { label: { tr: "Ağırlık", en: "Weight" }, value: { tr: "1.5-3 kg/adet", en: "1.5-3 kg/piece" } },
      { label: { tr: "Sezon", en: "Season" }, value: { tr: "Mayıs-Eylül", en: "May-September" } }
    ],
    tags: ["karpuz", "market"]
  }
];

/** Ürün kategorilerinin görünen başlık ve açıklamaları (listeleme + detay üst bilgisi). */
export const categoryMeta: Record<ProductCategory, { title: I18nText; description: I18nText }> = {
  narenciye: {
    title: { tr: "Narenciye", en: "Citrus" },
    description: {
      tr: "Portakal, mandalina, limon ve greyfurt; boylama, soğuk zincir ve izlenebilir paketleme.",
      en: "Orange, mandarin, lemon, and grapefruit; grading, cold chain, and traceable packing."
    }
  },
  kavun: {
    title: { tr: "Kavun", en: "Melon" },
    description: {
      tr: "Kırkağaç ve altınbaş kavun; doğru olgunlukta hasat ve hızlı sevkiyat.",
      en: "Kırkağaç and altınbaş melon; harvested at the right ripeness and shipped fast."
    }
  },
  karpuz: {
    title: { tr: "Karpuz", en: "Watermelon" },
    description: {
      tr: "Tarlada seçilmiş karpuz; market ve toptan kanalına taze tedarik.",
      en: "Field-selected watermelon; fresh supply to retail and wholesale channels."
    }
  }
};

/** Tüm kategori anahtarları (generateStaticParams için). */
export const productCategories = Object.keys(categoryMeta) as ProductCategory[];

/** Belirli bir kategoriye ait ürünleri döndürür. */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

/** Kategori + slug ile tek ürünü döndürür (yoksa undefined). */
export function getProduct(category: ProductCategory, slug: string): Product | undefined {
  return products.find((product) => product.category === category && product.slug === slug);
}

/** Bir kategorinin geçerli ProductCategory olup olmadığını doğrular (route guard). */
export function isProductCategory(value: string): value is ProductCategory {
  return value in categoryMeta;
}

export type Stat = { value: number; suffix: I18nText; label: I18nText };

export const stats: Stat[] = [
  { value: 35, suffix: "+", label: { tr: "Yıl Tecrübe", en: "Years of Experience" } },
  { value: 3, suffix: "", label: { tr: "Ana Ürün Grubu", en: "Core Product Groups" } },
  { value: 12, suffix: { tr: " ay", en: " mo" }, label: { tr: "Sezon Boyu Tedarik", en: "Year-round Supply" } },
  { value: 1991, suffix: "", label: { tr: "Kuruluş Yılı", en: "Founded" } }
];

export const certifications: I18nText[] = [
  { tr: "GLOBALG.A.P dosyası", en: "GLOBALG.A.P file" },
  { tr: "GRASP sosyal uygunluk", en: "GRASP social compliance" },
  { tr: "ISO 22000 gıda güvenliği", en: "ISO 22000 food safety" },
  { tr: "BRCGS / IFS hazırlığı", en: "BRCGS / IFS readiness" },
  { tr: "SMETA / SEDEX hazırlığı", en: "SMETA / SEDEX readiness" },
  { tr: "Menşe ve parti izlenebilirlik", en: "Origin and batch traceability" }
];

export const exportPoints = [
  { city: "Mersin", x: 56, y: 50 },
  { city: "Rotterdam", x: 47, y: 30 },
  { city: "Hamburg", x: 49, y: 28 },
  { city: "Bükreş", x: 53, y: 36 },
  { city: "Moskova", x: 58, y: 24 },
  { city: "Dubai", x: 64, y: 53 },
  { city: "Riyad", x: 60, y: 56 },
  { city: "Londra", x: 44, y: 29 }
];

export type BlogPost = {
  slug: string;
  title: I18nText;
  excerpt: I18nText;
  date: string;
  category: I18nText;
  tags: string[];
  readingMinutes: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "cukurova-narenciye-sezonu",
    title: { tr: "Çukurova'da Narenciye Sezonu", en: "Citrus Season in Çukurova" },
    excerpt: {
      tr: "Portakal, mandalina ve limonun hasat dönemleri, boylama süreçleri ve ihracata hazırlık adımları.",
      en: "Harvest periods of orange, mandarin, and lemon, grading processes, and export preparation steps."
    },
    date: "2026-06-24",
    category: { tr: "Narenciye", en: "Citrus" },
    tags: ["narenciye", "hasat", "ihracat"],
    readingMinutes: 4
  },
  {
    slug: "kavun-karpuz-tazelik",
    title: { tr: "Kavun ve Karpuzda Tazeliğin Sırrı", en: "The Secret to Fresh Melon and Watermelon" },
    excerpt: {
      tr: "Doğru olgunlukta hasat, tarlada seçim ve hızlı sevkiyatla market rafına kadar tazeliği korumak.",
      en: "Preserving freshness to the retail shelf through ripe harvest, field selection, and fast shipping."
    },
    date: "2026-06-24",
    category: { tr: "Yaz Meyveleri", en: "Summer Fruits" },
    tags: ["kavun", "karpuz", "tazelik"],
    readingMinutes: 5
  },
  {
    slug: "soguk-zincir-ve-ihracat",
    title: { tr: "Soğuk Zincir ve İhracat Lojistiği", en: "Cold Chain and Export Logistics" },
    excerpt: {
      tr: "Mersin Limanı avantajı, soğuk hava deposu ve soğuk zincir nakliyenin taze ürün ihracatındaki rolü.",
      en: "The role of the Port of Mersin advantage, cold storage, and cold chain transport in fresh produce export."
    },
    date: "2026-06-24",
    category: { tr: "Lojistik", en: "Logistics" },
    tags: ["lojistik", "soğuk zincir", "ihracat"],
    readingMinutes: 3
  }
];

export type NavLink = { title: I18nText; href: string; icon?: typeof Award };

export const corporateLinks: NavLink[] = [
  { title: { tr: "Hakkımızda", en: "About Us" }, href: "/corporate/hakkimizda" },
  { title: { tr: "Kalite Politikası", en: "Quality Policy" }, href: "/corporate/kalite-politikasi" },
  { title: { tr: "Vizyon & Misyon", en: "Vision & Mission" }, href: "/corporate/vizyon-misyon" },
  { title: { tr: "Sürdürülebilirlik", en: "Sustainability" }, href: "/corporate/surdurulebilirlik" }
];

export const productionLinks: NavLink[] = [
  { title: { tr: "Sertifikalar", en: "Certifications" }, href: "/uretim/sertifikalar", icon: Award },
  { title: { tr: "Tesis & Paketleme", en: "Facility & Packing" }, href: "/uretim/tesis", icon: Warehouse },
  { title: { tr: "Soğuk Zincir & Kapasite", en: "Cold Chain & Capacity" }, href: "/uretim/kapasite", icon: Snowflake },
  { title: { tr: "Sezon Takvimi", en: "Season Calendar" }, href: "/uretim/sezon-takvimi", icon: CalendarDays },
  { title: { tr: "Lojistik", en: "Logistics" }, href: "/uretim/lojistik", icon: Ship }
];

export type TimelineItem = { year: string; title: I18nText; text: I18nText };

export const timeline: TimelineItem[] = [
  {
    year: "1991",
    title: { tr: "Kuruluş", en: "Founding" },
    text: {
      tr: "İnsanlara daha iyi hizmet verme hedefiyle Çukurova bölgesinde taze ürün ticaretine başlandı.",
      en: "Fresh produce trade began in the Çukurova region with the goal of serving people better."
    }
  },
  {
    year: "2003",
    title: { tr: "Toptan & Hal Ağı", en: "Wholesale & Market Network" },
    text: {
      tr: "Toptan alıcı ve hal ağı genişletilerek düzenli tedarik kapasitesi büyütüldü.",
      en: "Regular supply capacity grew as the wholesale buyer and produce-market network expanded."
    }
  },
  {
    year: "2012",
    title: { tr: "Soğuk Hava & Paketleme", en: "Cold Storage & Packing" },
    text: {
      tr: "Soğuk hava deposu ve paketleme süreçleri ile tazelik ve raf ömrü güçlendirildi.",
      en: "Freshness and shelf life were strengthened through cold storage and packing processes."
    }
  },
  {
    year: "2018",
    title: { tr: "İhracat Operasyonu", en: "Export Operations" },
    text: {
      tr: "Mersin Limanı avantajıyla yurt dışı pazarlara ihracat operasyonları geliştirildi.",
      en: "Export operations to international markets were developed with the Port of Mersin advantage."
    }
  },
  {
    year: "2026",
    title: { tr: "Entegre Taze Ürün Tedariki", en: "Integrated Fresh Produce Supply" },
    text: {
      tr: "Narenciye, kavun ve karpuz dikeyleri üretim, toptan, market ve ihracat kanallarında tek marka altında toplandı.",
      en: "Citrus, melon, and watermelon verticals were unified under one brand across production, wholesale, retail, and export channels."
    }
  }
];
