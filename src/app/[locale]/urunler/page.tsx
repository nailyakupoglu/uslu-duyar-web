/**
 * /urunler — ürün listeleme sayfası (kategori sekmeli explorer).
 * Prop'lar: { searchParams: { cat?: string } } (homepage'ten gelen ?cat= ile ön-filtre).
 * Kullanım: tüm ürünleri ProductExplorer'a verir; breadcrumb + başlık + FAQ ile çerçeveler.
 */
import type { Metadata } from "next";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { ProductExplorer } from "@/components/product/product-explorer";
import { getProducts } from "@/lib/content";
import { isProductCategory } from "@/lib/data";
import { buildMetadataForLocale } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadataForLocale(locale, {
    title: locale === "en" ? "Products" : "Ürünler",
    description:
      locale === "en"
        ? "Uslu Duyar product catalogue: citrus, melon and watermelon with export specs, packaging and RFQ details."
        : "Uslu Duyar ürün kataloğu: narenciye, kavun ve karpuz için ihracat specs, ambalaj ve teklif detayları.",
    path: "/urunler"
  });
}

export default function ProductsPage({
  params: { locale },
  searchParams
}: {
  params: { locale: string };
  searchParams: { cat?: string };
}) {
  const cat = searchParams.cat;
  const initialCategory = cat && isProductCategory(cat) ? cat : "all";
  const products = getProducts(locale);

  return (
    <>
      <Breadcrumb items={[{ label: "Ürünler" }]} />

      <section className="container pb-10 pt-10">
        <SectionHeading
          eyebrow={locale === "en" ? "Product catalogue" : "Ürün kataloğu"}
          title={locale === "en" ? "Citrus, melon and watermelon with export specs." : "İhracat spec'leriyle narenciye, kavun ve karpuz."}
          description={
            locale === "en"
              ? "Every card carries the first details a buyer asks for: season, calibre/weight, cold-chain plan, MOQ and loading terms."
              : "Her kart alıcının ilk sorduğu bilgileri taşır: sezon, kalibre/ağırlık, soğuk zincir planı, MOQ ve yükleme şartları."
          }
        />
      </section>

      <section className="container pb-24">
        <ProductExplorer products={products} initialCategory={initialCategory} />
      </section>

      <section className="bg-primary-900 py-20 text-white">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow={locale === "en" ? "FAQ" : "Sıkça Sorulanlar"}
            title={locale === "en" ? "Order and export process" : "Sipariş ve ihracat süreçleri"}
            description={locale === "en" ? "Details are confirmed by product, packaging and shipping type during RFQ." : "Detaylar ürün, ambalaj ve sevkiyat tipine göre teklif aşamasında netleştirilir."}
            className="text-white [&_h2]:text-white [&_p]:text-white/70"
          />
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
