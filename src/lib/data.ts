import {
  Award,
  Cherry,
  Citrus,
  Ship,
  Snowflake,
  Sun,
  Truck,
  Warehouse
} from "lucide-react";

export const siteConfig = {
  name: "Uslu Duyar",
  legalName: "Uslu Duyar Tarım Ürünleri Ltd. Şti.",
  slogan: "Aldatılan müşteri, kaybedilen bir servettir.",
  description:
    "1991'den bu yana Mersin, Adana ve Çukurova bölgesinde narenciye, kavun ve karpuz üretimi, ihracatı, toptan satışı ve market tedariği yapıyoruz. Tarladan markete güvenilir tedarik zinciri.",
  url: "https://usluduyar.evohaus.org",
  email: "info@usluduyar.com",
  phone: "+90 324 000 00 00",
  whatsapp: "+90 532 000 00 00",
  address: "Çukurova Bölgesi — Mersin / Adana, Türkiye",
  social: {
    instagram: "#",
    linkedin: "#",
    facebook: "#"
  }
} as const;

export const heroSlides = [
  {
    title: "Tarladan Markete, 1991'den Bu Yana Güven",
    eyebrow: "Mersin & Çukurova merkezli taze ürün tedariki",
    description:
      "Narenciye, kavun ve karpuzda kendi üretimimiz ve sözleşmeli üretici ağımızla; toptan, market ve ihracat kanallarına kesintisiz taze ürün.",
    image: "/images/hero/hero-1.svg",
    cta: "Ürünleri İncele",
    href: "/urunler"
  },
  {
    title: "Çukurova'nın Güneşinden Narenciye",
    eyebrow: "Portakal, mandalina, limon, greyfurt",
    description:
      "Hasat, boylama, soğuk zincir ve paketleme adımlarında izlenebilir kalite; ihracat standartlarına uygun sevkiyat.",
    image: "/images/hero/hero-2.svg",
    cta: "Narenciye Ürünleri",
    href: "/urunler?cat=narenciye"
  },
  {
    title: "Yaz Sezonunun Lezzeti: Kavun & Karpuz",
    eyebrow: "Kırkağaç, altınbaş kavun ve karpuz",
    description:
      "Tarlada seçim, doğru olgunlukta hasat ve hızlı sevkiyatla; market raflarına ve toptan alıcıya taze ulaşım.",
    image: "/images/hero/hero-3.svg",
    cta: "Kavun & Karpuz",
    href: "/urunler?cat=kavun"
  },
  {
    title: "Yurt İçi Toptan ve Yurt Dışı İhracat",
    eyebrow: "Mersin Limanı avantajı",
    description:
      "Market zincirleri ve toptan alıcılar için düzenli tedarik; ihracat operasyonlarında soğuk zincir ve evrak akışı.",
    image: "/images/hero/hero-4.svg",
    cta: "Lojistik Gücümüz",
    href: "/uretim/lojistik"
  }
];

export const categories = [
  {
    title: "Narenciye",
    slug: "narenciye",
    href: "/urunler?cat=narenciye",
    description: "Portakal, mandalina, limon ve greyfurt; Çukurova'nın bereketli narenciye hasadı.",
    image: "/images/categories/narenciye.svg",
    icon: Citrus
  },
  {
    title: "Kavun",
    slug: "kavun",
    href: "/urunler?cat=kavun",
    description: "Kırkağaç ve altınbaş kavun çeşitleri; doğru olgunlukta hasat, hızlı sevkiyat.",
    image: "/images/categories/kavun.svg",
    icon: Sun
  },
  {
    title: "Karpuz",
    slug: "karpuz",
    href: "/urunler?cat=karpuz",
    description: "Tarlada seçilmiş, ağırlık ve tatlılık dengesi korunmuş taze karpuz.",
    image: "/images/categories/karpuz.svg",
    icon: Cherry
  }
];

export const productionHighlights = [
  {
    title: "Sertifikalar",
    href: "/uretim/sertifikalar",
    description: "Gıda güvenliği, izlenebilirlik ve ihracat uygunluğuna yönelik belgeler (operatör dosyalarıyla güncellenecek).",
    image: "/images/production/sertifikalar.svg",
    icon: Award
  },
  {
    title: "Tesis & Paketleme",
    href: "/uretim/tesis",
    description: "Boylama, ayıklama, paketleme ve depolama alanları tek akışta; fason paketleme desteği.",
    image: "/images/production/tesis.svg",
    icon: Warehouse
  },
  {
    title: "Soğuk Zincir & Kapasite",
    href: "/uretim/kapasite",
    description: "Soğuk hava deposu ve sezon boyu kesintisiz tedarik; izlenebilir parti yönetimi.",
    image: "/images/production/kapasite.svg",
    icon: Snowflake
  },
  {
    title: "Lojistik",
    href: "/uretim/lojistik",
    description: "Mersin Limanı bağlantısı, soğuk zincir nakliye ve ihracat evrak akışı.",
    image: "/images/production/lojistik.svg",
    icon: Truck
  }
];

export type ProductCategory = "narenciye" | "kavun" | "karpuz";

export type Product = {
  slug: string;
  category: ProductCategory;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  packageOptions: string[];
  certificates: string[];
  specs: Record<string, string>;
  tags: string[];
};

export const products: Product[] = [
  {
    slug: "portakal",
    category: "narenciye",
    title: "Portakal",
    shortDescription: "Washington ve Valencia tipi; sofralık ve sıkmalık çeşitler.",
    description:
      "Çukurova bölgesinde yetişen portakal; boylama ve soğuk zincir adımlarıyla market ve ihracat kanallarına taze sevk edilir. Çeşit ve kalibre bilgisi operatör verisiyle güncellenecektir.",
    image: "/images/categories/narenciye.svg",
    gallery: ["/images/categories/narenciye.svg", "/images/hero/hero-2.svg"],
    packageOptions: ["Koli", "Palet", "Dökme (toptan)"],
    certificates: ["Menşe belgesi", "Parti izlenebilirlik", "Soğuk zincir"],
    specs: { Çeşit: "Washington / Valencia", Kalibre: "Placeholder", Sezon: "Kış" },
    tags: ["narenciye", "portakal", "ihracat"]
  },
  {
    slug: "mandalina",
    category: "narenciye",
    title: "Mandalina",
    shortDescription: "Satsuma ve klemantin; kolay soyulan, aromatik çeşitler.",
    description:
      "Mandalina; erken ve geç sezon çeşitleriyle uzun bir tedarik penceresi sunar. Hasat sonrası seçim ve paketleme ile taze ulaştırılır.",
    image: "/images/categories/narenciye.svg",
    gallery: ["/images/categories/narenciye.svg"],
    packageOptions: ["Koli", "Palet", "Dökme (toptan)"],
    certificates: ["Menşe belgesi", "Parti izlenebilirlik"],
    specs: { Çeşit: "Satsuma / Klemantin", Kalibre: "Placeholder", Sezon: "Sonbahar – Kış" },
    tags: ["narenciye", "mandalina"]
  },
  {
    slug: "limon",
    category: "narenciye",
    title: "Limon",
    shortDescription: "Enterdonat ve Lamas; yüksek sululuk ve raf ömrü.",
    description:
      "Limon; iç piyasa ve ihracat için uzun raf ömrü ve dayanıklılığıyla öne çıkar. Soğuk hava deposunda saklanarak sezon boyu tedarik edilir.",
    image: "/images/categories/narenciye.svg",
    gallery: ["/images/categories/narenciye.svg"],
    packageOptions: ["Koli", "Palet", "Dökme (toptan)"],
    certificates: ["Menşe belgesi", "Soğuk zincir"],
    specs: { Çeşit: "Enterdonat / Lamas", Kalibre: "Placeholder", Sezon: "Sonbahar – İlkbahar" },
    tags: ["narenciye", "limon", "ihracat"]
  },
  {
    slug: "greyfurt",
    category: "narenciye",
    title: "Greyfurt",
    shortDescription: "Star Ruby; canlı renk ve dengeli tat.",
    description:
      "Greyfurt; ihracat pazarlarında talep gören kırmızı etli çeşitleriyle hazırlanır. Boylama ve paketleme sonrası sevk edilir.",
    image: "/images/categories/narenciye.svg",
    gallery: ["/images/categories/narenciye.svg"],
    packageOptions: ["Koli", "Palet"],
    certificates: ["Menşe belgesi", "Parti izlenebilirlik"],
    specs: { Çeşit: "Star Ruby", Kalibre: "Placeholder", Sezon: "Kış" },
    tags: ["narenciye", "greyfurt", "ihracat"]
  },
  {
    slug: "kirkagac-kavun",
    category: "kavun",
    title: "Kırkağaç Kavunu",
    shortDescription: "Yüksek aroma ve dayanıklı kabuk; nakliyeye uygun.",
    description:
      "Kırkağaç kavunu; doğru olgunlukta hasat edilip hızlı sevkiyatla market ve toptan alıcıya ulaştırılır. Ağırlık aralığı operatör verisiyle güncellenecektir.",
    image: "/images/categories/kavun.svg",
    gallery: ["/images/categories/kavun.svg", "/images/hero/hero-3.svg"],
    packageOptions: ["Koli", "Palet", "Dökme (toptan)"],
    certificates: ["Menşe belgesi", "Parti izlenebilirlik"],
    specs: { Çeşit: "Kırkağaç", Ağırlık: "Placeholder", Sezon: "Yaz" },
    tags: ["kavun", "kırkağaç"]
  },
  {
    slug: "altinbas-kavun",
    category: "kavun",
    title: "Altınbaş Kavunu",
    shortDescription: "Tatlı ve sulu; iç piyasa ve market için popüler çeşit.",
    description:
      "Altınbaş kavunu; tatlılık ve sululuk dengesiyle öne çıkar. Tarlada seçim ve hızlı tedarikle tazeliği korunur.",
    image: "/images/categories/kavun.svg",
    gallery: ["/images/categories/kavun.svg"],
    packageOptions: ["Koli", "Palet", "Dökme (toptan)"],
    certificates: ["Menşe belgesi"],
    specs: { Çeşit: "Altınbaş", Ağırlık: "Placeholder", Sezon: "Yaz" },
    tags: ["kavun", "altınbaş"]
  },
  {
    slug: "karpuz",
    category: "karpuz",
    title: "Karpuz",
    shortDescription: "Tarlada seçilmiş; tatlılık ve ağırlık dengesi.",
    description:
      "Karpuz; doğru olgunlukta hasat, ağırlık seçimi ve hızlı sevkiyatla market ve toptan alıcıya taze ulaştırılır. Çeşit ve kalibre bilgisi operatör verisiyle güncellenecektir.",
    image: "/images/categories/karpuz.svg",
    gallery: ["/images/categories/karpuz.svg", "/images/hero/hero-1.svg"],
    packageOptions: ["Dökme (toptan)", "Palet", "Sözleşmeli sevkiyat"],
    certificates: ["Menşe belgesi", "Parti izlenebilirlik"],
    specs: { Çeşit: "Crimson / Kara karpuz", Ağırlık: "Placeholder", Sezon: "Yaz" },
    tags: ["karpuz", "yaz"]
  },
  {
    slug: "mini-karpuz",
    category: "karpuz",
    title: "Mini Karpuz",
    shortDescription: "Küçük kalibre; perakende ve market için uygun porsiyon.",
    description:
      "Mini karpuz; market rafı ve küçük hane tüketimi için ideal kalibrede hazırlanır. Talebe göre paketleme yapılır.",
    image: "/images/categories/karpuz.svg",
    gallery: ["/images/categories/karpuz.svg"],
    packageOptions: ["Koli", "Palet"],
    certificates: ["Menşe belgesi"],
    specs: { Çeşit: "Mini", Ağırlık: "Placeholder", Sezon: "Yaz" },
    tags: ["karpuz", "market"]
  }
];

/** Ürün kategorilerinin görünen başlık ve açıklamaları (listeleme + detay üst bilgisi). */
export const categoryMeta: Record<ProductCategory, { title: string; description: string }> = {
  narenciye: {
    title: "Narenciye",
    description: "Portakal, mandalina, limon ve greyfurt; boylama, soğuk zincir ve izlenebilir paketleme."
  },
  kavun: {
    title: "Kavun",
    description: "Kırkağaç ve altınbaş kavun; doğru olgunlukta hasat ve hızlı sevkiyat."
  },
  karpuz: {
    title: "Karpuz",
    description: "Tarlada seçilmiş karpuz; market ve toptan kanalına taze tedarik."
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

export const stats = [
  { value: 35, suffix: "+", label: "Yıl Tecrübe" },
  { value: 3, suffix: "", label: "Ana Ürün Grubu" },
  { value: 12, suffix: " ay", label: "Sezon Boyu Tedarik" },
  { value: 1991, suffix: "", label: "Kuruluş Yılı" }
];

export const certifications = [
  "Gıda Güvenliği",
  "Soğuk Zincir",
  "İzlenebilir Üretim",
  "İhracat Uygunluğu",
  "Menşe Belgesi",
  "Kalite Kontrol"
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

export const blogPosts = [
  {
    slug: "cukurova-narenciye-sezonu",
    title: "Çukurova'da Narenciye Sezonu",
    excerpt:
      "Portakal, mandalina ve limonun hasat dönemleri, boylama süreçleri ve ihracata hazırlık adımları.",
    date: "2026-06-24",
    category: "Narenciye",
    tags: ["narenciye", "hasat", "ihracat"],
    readingMinutes: 4
  },
  {
    slug: "kavun-karpuz-tazelik",
    title: "Kavun ve Karpuzda Tazeliğin Sırrı",
    excerpt:
      "Doğru olgunlukta hasat, tarlada seçim ve hızlı sevkiyatla market rafına kadar tazeliği korumak.",
    date: "2026-06-24",
    category: "Yaz Meyveleri",
    tags: ["kavun", "karpuz", "tazelik"],
    readingMinutes: 5
  },
  {
    slug: "soguk-zincir-ve-ihracat",
    title: "Soğuk Zincir ve İhracat Lojistiği",
    excerpt:
      "Mersin Limanı avantajı, soğuk hava deposu ve soğuk zincir nakliyenin taze ürün ihracatındaki rolü.",
    date: "2026-06-24",
    category: "Lojistik",
    tags: ["lojistik", "soğuk zincir", "ihracat"],
    readingMinutes: 3
  }
];

export const corporateLinks = [
  { title: "Hakkımızda", href: "/corporate/hakkimizda" },
  { title: "Kalite Politikası", href: "/corporate/kalite-politikasi" },
  { title: "Vizyon & Misyon", href: "/corporate/vizyon-misyon" },
  { title: "Sürdürülebilirlik", href: "/corporate/surdurulebilirlik" }
];

export const productionLinks = [
  { title: "Sertifikalar", href: "/uretim/sertifikalar", icon: Award },
  { title: "Tesis & Paketleme", href: "/uretim/tesis", icon: Warehouse },
  { title: "Soğuk Zincir & Kapasite", href: "/uretim/kapasite", icon: Snowflake },
  { title: "Lojistik", href: "/uretim/lojistik", icon: Ship }
];

export const timeline = [
  { year: "1991", title: "Kuruluş", text: "İnsanlara daha iyi hizmet verme hedefiyle Çukurova bölgesinde taze ürün ticaretine başlandı." },
  { year: "2003", title: "Toptan & Hal Ağı", text: "Toptan alıcı ve hal ağı genişletilerek düzenli tedarik kapasitesi büyütüldü." },
  { year: "2012", title: "Soğuk Hava & Paketleme", text: "Soğuk hava deposu ve paketleme süreçleri ile tazelik ve raf ömrü güçlendirildi." },
  { year: "2018", title: "İhracat Operasyonu", text: "Mersin Limanı avantajıyla yurt dışı pazarlara ihracat operasyonları geliştirildi." },
  { year: "2026", title: "Entegre Taze Ürün Tedariki", text: "Narenciye, kavun ve karpuz dikeyleri üretim, toptan, market ve ihracat kanallarında tek marka altında toplandı." }
];
