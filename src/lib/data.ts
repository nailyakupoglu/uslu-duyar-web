import {
  Award,
  Factory,
  Leaf,
  PackageCheck,
  Ship,
  Sprout,
  Truck,
  Wheat
} from "lucide-react";

export const siteConfig = {
  name: "Eren Tarım",
  legalName: "Eren Tarım Gıda Sanayi ve Ticaret A.Ş.",
  slogan: "Tarladan Sofraya, Mersin'den Dünyaya",
  description:
    "Mersin merkezli Eren Tarım; değirmen ürünleri, biber-baharat, salça, silaj ve yem çözümlerinde iç piyasa ve ihracata üretim yapar.",
  url: "https://erentarim.com",
  email: "info@erentarim.com",
  phone: "+90 324 000 00 00",
  whatsapp: "+90 532 000 00 00",
  address: "Mersin Organize Sanayi Bölgesi, Mersin / Türkiye",
  social: {
    instagram: "#",
    linkedin: "#",
    facebook: "#"
  }
} as const;

export const heroSlides = [
  {
    title: "Tarladan Sofraya, 30 Yıllık Güven",
    eyebrow: "Mersin merkezli entegre tarım üretimi",
    description:
      "Sözleşmeli üretim ağından modern tesise uzanan kontrollü tedarik zinciriyle un, biber, baharat ve silaj ürünleri.",
    image: "/images/hero/hero-1.svg",
    cta: "Ürünleri İncele",
    href: "/urunler"
  },
  {
    title: "Modern Değirmen Teknolojisi",
    eyebrow: "Un, yem ve tahıl işleme",
    description:
      "Valsli öğütme, silo yönetimi, parti takibi ve hijyen protokolleriyle endüstriyel kalite standardı.",
    image: "/images/hero/hero-2.svg",
    cta: "Değirmen Ürünleri",
    href: "/urunler?cat=degirmen"
  },
  {
    title: "Geleneksel Lezzet, Endüstriyel Hijyen",
    eyebrow: "Biber, baharat ve salça",
    description:
      "Kurutma, öğütme, eleme ve paketleme adımlarında izlenebilir üretim ve parti bazlı kalite kontrol.",
    image: "/images/hero/hero-3.svg",
    cta: "Biber & Baharat",
    href: "/urunler?cat=biber"
  },
  {
    title: "62 Ülkeye İhracat, Kapıda Teslim",
    eyebrow: "Mersin Limanı avantajı",
    description:
      "FOB, CFR ve CIF operasyonlarına uygun lojistik planlama; iç piyasada hızlı ve düzenli sevkiyat.",
    image: "/images/hero/hero-4.svg",
    cta: "Lojistik Gücümüz",
    href: "/uretim/lojistik"
  }
];

export const categories = [
  {
    title: "Değirmen Unları",
    slug: "degirmen",
    href: "/urunler?cat=degirmen",
    description: "Buğday unu, mısır unu, arpa unu ve yem hammaddeleri.",
    image: "/images/categories/degirmen.svg",
    icon: Wheat
  },
  {
    title: "Biber & Baharat",
    slug: "biber",
    href: "/urunler?cat=biber",
    description: "Toz biber, pul biber, isot, salça ve özel baharat karışımları.",
    image: "/images/categories/biber.svg",
    icon: Leaf
  },
  {
    title: "Silaj & Yem",
    slug: "silaj",
    href: "/urunler?cat=silaj",
    description: "Mısır, yonca ve buğday silajı; çiftliklere düzenli yem çözümleri.",
    image: "/images/categories/silaj.svg",
    icon: Sprout
  }
];

export const productionHighlights = [
  {
    title: "Sertifikalar",
    href: "/uretim/sertifikalar",
    description: "ISO 22000, HACCP, Helal ve ihracat odaklı kalite belgeleri.",
    image: "/images/production/sertifikalar.svg",
    icon: Award
  },
  {
    title: "Tesis",
    href: "/uretim/tesis",
    description: "Silo, öğütme, kurutma, paketleme ve depolama alanları tek akışta.",
    image: "/images/production/tesis.svg",
    icon: Factory
  },
  {
    title: "Kapasite",
    href: "/uretim/kapasite",
    description: "50.000 ton/yıl üretim hedefi, vardiyalı operasyon ve izlenebilir parti yönetimi.",
    image: "/images/production/kapasite.svg",
    icon: PackageCheck
  },
  {
    title: "Lojistik",
    href: "/uretim/lojistik",
    description: "Mersin Limanı bağlantısı, kara yolu sevkiyatı ve ihracat evrak akışı.",
    image: "/images/production/lojistik.svg",
    icon: Truck
  }
];

export type ProductCategory = "degirmen" | "biber" | "silaj";

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
    slug: "bugday-unu",
    category: "degirmen",
    title: "Buğday Unu",
    shortDescription: "Ekmeklik ve endüstriyel üretime uygun dengeli protein yapısı.",
    description:
      "Buğday unu; ekmek, pide, lavaş ve endüstriyel hamur ürünleri için farklı protein ve kül değerleriyle hazırlanır.",
    image: "/images/products/degirmen/bugday-unu.svg",
    gallery: ["/images/products/degirmen/bugday-unu.svg", "/images/categories/degirmen.svg"],
    packageOptions: ["25 kg kraft", "50 kg çuval", "1 ton bigbag", "Dökme"],
    certificates: ["ISO 22000", "HACCP", "Helal"],
    specs: { Protein: "%11-13", Nem: "Maks. %14,5", Menşei: "Türkiye" },
    tags: ["un", "ekmeklik", "ihracat"]
  },
  {
    slug: "misir-unu",
    category: "degirmen",
    title: "Mısır Unu",
    shortDescription: "Gıda ve yem uygulamaları için kontrollü granülasyon.",
    description:
      "Mısır unu; yem rasyonu, geleneksel mutfak ve endüstriyel karışımlar için parti bazlı öğütülür.",
    image: "/images/products/degirmen/misir-unu.svg",
    gallery: ["/images/products/degirmen/misir-unu.svg", "/images/categories/degirmen.svg"],
    packageOptions: ["10 kg", "25 kg", "50 kg", "Bigbag"],
    certificates: ["ISO 22000", "Helal"],
    specs: { Granülasyon: "İnce / orta", Nem: "Maks. %13", Kullanım: "Gıda / yem" },
    tags: ["mısır", "değirmen", "yem"]
  },
  {
    slug: "arpa-unu",
    category: "degirmen",
    title: "Arpa Unu",
    shortDescription: "Yem ve özel karışımlar için ekonomik tahıl girdisi.",
    description:
      "Arpa unu, yem rasyonları ve özel karışımlar için temizleme ve öğütme hatlarından geçirilerek hazırlanır.",
    image: "/images/products/degirmen/arpa-unu.svg",
    gallery: ["/images/products/degirmen/arpa-unu.svg"],
    packageOptions: ["25 kg", "50 kg", "Dökme"],
    certificates: ["HACCP"],
    specs: { Kullanım: "Yem", Ambalaj: "Çuval / dökme", Tedarik: "Sözleşmeli" },
    tags: ["arpa", "yem", "tahıl"]
  },
  {
    slug: "kirmizi-toz-biber",
    category: "biber",
    title: "Kırmızı Toz Biber",
    shortDescription: "Canlı renk, dengeli acılık ve yoğun aroma.",
    description:
      "Kırmızı toz biber; kurutma, seçme, öğütme ve eleme süreçlerinden sonra gıda güvenliği standardına uygun paketlenir.",
    image: "/images/products/biber/kirmizi-toz-biber.svg",
    gallery: ["/images/products/biber/kirmizi-toz-biber.svg", "/images/categories/biber.svg"],
    packageOptions: ["1 kg", "5 kg", "10 kg", "25 kg kraft"],
    certificates: ["ISO 22000", "HACCP", "Helal"],
    specs: { Acılık: "Tatlı / acı", Renk: "ASTA değeri placeholder", Nem: "Maks. %10" },
    tags: ["biber", "baharat", "ihracat"]
  },
  {
    slug: "pul-biber",
    category: "biber",
    title: "Pul Biber",
    shortDescription: "Kebap, horeca ve perakende kanalı için iri taneli form.",
    description:
      "Pul biber, seçilmiş kırmızı biberlerden farklı acılık seviyelerinde hazırlanır ve yağ/parlaklık dengesi korunur.",
    image: "/images/products/biber/pul-biber.svg",
    gallery: ["/images/products/biber/pul-biber.svg"],
    packageOptions: ["500 g", "1 kg", "5 kg", "10 kg"],
    certificates: ["HACCP", "Helal"],
    specs: { Form: "İri pul", Acılık: "Orta / acı", Kullanım: "HORECA" },
    tags: ["pul biber", "baharat", "horeca"]
  },
  {
    slug: "biber-salcasi",
    category: "biber",
    title: "Biber Salçası",
    shortDescription: "Tatlı ve acı seçenekli, endüstriyel doluma uygun salça.",
    description:
      "Biber salçası; hasat dönemi seçilen kapya biberlerden hazırlanır, teneke, kova ve varil seçenekleriyle sunulur.",
    image: "/images/products/biber/biber-salcasi.svg",
    gallery: ["/images/products/biber/biber-salcasi.svg"],
    packageOptions: ["720 g cam", "5 kg kova", "18 kg teneke", "220 kg varil"],
    certificates: ["ISO 22000", "Helal"],
    specs: { Brix: "Placeholder", Çeşit: "Tatlı / acı", Dolum: "Cam / teneke / varil" },
    tags: ["salça", "kapya", "ihracat"]
  },
  {
    slug: "misir-silaji",
    category: "silaj",
    title: "Mısır Silajı",
    shortDescription: "Büyükbaş çiftlikleri için yüksek enerji değerli kaba yem.",
    description:
      "Mısır silajı; doğru kuru madde oranı, sıkıştırma ve fermantasyon takibiyle çiftliklere düzenli sevk edilir.",
    image: "/images/products/silaj/misir-silaji.svg",
    gallery: ["/images/products/silaj/misir-silaji.svg"],
    packageOptions: ["Dökme", "Balya", "Sözleşmeli sevkiyat"],
    certificates: ["Parti analiz raporu"],
    specs: { "Kuru madde": "%30-35", Depolama: "Bunker / tünel", Müşteri: "Büyükbaş" },
    tags: ["silaj", "mısır", "çiftlik"]
  },
  {
    slug: "yonca-silaji",
    category: "silaj",
    title: "Yonca Silajı",
    shortDescription: "Protein odaklı rasyonlar için temiz ve dengeli yem girdisi.",
    description:
      "Yonca silajı, biçim dönemine göre ayrıştırılır ve besleme planına uygun sevkiyat programıyla sunulur.",
    image: "/images/products/silaj/yonca-silaji.svg",
    gallery: ["/images/products/silaj/yonca-silaji.svg"],
    packageOptions: ["Balya", "Dökme"],
    certificates: ["Parti analiz raporu"],
    specs: { Protein: "Placeholder", Biçim: "Döneme göre", Kullanım: "Süt çiftliği" },
    tags: ["yonca", "silaj", "protein"]
  },
  {
    slug: "bugday-silaji",
    category: "silaj",
    title: "Buğday Silajı",
    shortDescription: "Mevsimsel rasyon planlamasına uygun alternatif kaba yem.",
    description:
      "Buğday silajı, bölgesel çiftliklerin dönemsel kaba yem ihtiyacına göre planlanır ve analiz bilgisiyle teslim edilir.",
    image: "/images/products/silaj/bugday-silaji.svg",
    gallery: ["/images/products/silaj/bugday-silaji.svg"],
    packageOptions: ["Dökme", "Sözleşmeli"],
    certificates: ["Parti analiz raporu"],
    specs: { Sezon: "İlkbahar", Depolama: "Bunker", Sevkiyat: "Mersin ve çevre iller" },
    tags: ["buğday", "silaj", "yem"]
  }
];

/** Ürün kategorilerinin görünen başlık ve açıklamaları (listeleme + detay üst bilgisi). */
export const categoryMeta: Record<ProductCategory, { title: string; description: string }> = {
  degirmen: {
    title: "Değirmen Unları",
    description: "Buğday, mısır ve arpa unu ile yem hammaddeleri; parti bazlı öğütme ve hijyenik paketleme."
  },
  biber: {
    title: "Biber & Baharat",
    description: "Toz biber, pul biber ve salça; kurutma, öğütme, eleme ve dolum hatlarında izlenebilir üretim."
  },
  silaj: {
    title: "Silaj & Yem",
    description: "Mısır, yonca ve buğday silajı; çiftliklere analiz raporlu, düzenli sevkiyat."
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
  { value: 30, suffix: "+", label: "Yıl Tecrübe" },
  { value: 62, suffix: "", label: "Ülkeye İhracat" },
  { value: 50000, suffix: " ton/yıl", label: "Üretim Hedefi" },
  { value: 250, suffix: "+", label: "Çalışan ve Paydaş" }
];

export const certifications = ["ISO 22000", "HACCP", "GLOBALG.A.P.", "Helal", "Kosher", "Organik"];

export const exportPoints = [
  { city: "Mersin", x: 52, y: 52 },
  { city: "Rotterdam", x: 44, y: 32 },
  { city: "Hamburg", x: 47, y: 29 },
  { city: "Dubai", x: 62, y: 55 },
  { city: "Doha", x: 60, y: 56 },
  { city: "Riyad", x: 58, y: 58 },
  { city: "Bükreş", x: 51, y: 38 },
  { city: "Londra", x: 41, y: 30 },
  { city: "Bakü", x: 59, y: 44 }
];

export const blogPosts = [
  {
    slug: "kirmizi-toz-biberin-tarihcesi",
    title: "Kırmızı Toz Biberin Tarihçesi",
    excerpt:
      "Anadolu mutfağında kırmızı biberin yolculuğu, üretim bölgeleri ve modern hijyen standartları.",
    date: "2026-06-24",
    category: "Baharat",
    tags: ["biber", "baharat", "ihracat"],
    readingMinutes: 4
  },
  {
    slug: "silaj-yapiminin-puf-noktalari",
    title: "Silaj Yapımının Püf Noktaları",
    excerpt:
      "Doğru kuru madde oranı, sıkıştırma, fermantasyon ve çiftliklere düzenli sevkiyat planı.",
    date: "2026-06-24",
    category: "Silaj",
    tags: ["silaj", "yem", "çiftlik"],
    readingMinutes: 5
  },
  {
    slug: "mersinin-tarim-gucu",
    title: "Mersin'in Tarım Gücü",
    excerpt:
      "Mersin Limanı, bereketli üretim havzası ve ihracat altyapısıyla tarımsal ticaretin merkezinde.",
    date: "2026-06-24",
    category: "İhracat",
    tags: ["mersin", "lojistik", "tarım"],
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
  { title: "Tesis", href: "/uretim/tesis", icon: Factory },
  { title: "Kapasite", href: "/uretim/kapasite", icon: PackageCheck },
  { title: "Lojistik", href: "/uretim/lojistik", icon: Ship }
];

export const timeline = [
  { year: "1993", title: "Mersin'de İlk Üretim", text: "Aile işletmesi olarak tahıl ve yerel tarım ticaretiyle başlayan yolculuk." },
  { year: "2004", title: "Değirmen Yatırımı", text: "Öğütme ve paketleme hattı yenilenerek düzenli un üretimine geçildi." },
  { year: "2012", title: "Biber & Baharat Hattı", text: "Kurutma, öğütme ve eleme prosesleri gıda güvenliği protokolleriyle ayrıştırıldı." },
  { year: "2018", title: "İhracat Operasyonu", text: "Mersin Limanı avantajıyla Orta Doğu, Avrupa ve Kuzey Afrika pazarı güçlendirildi." },
  { year: "2026", title: "Entegre Tarım Markası", text: "Değirmen, biber-baharat, salça, silaj ve yem dikeyleri tek marka altında toplandı." }
];
