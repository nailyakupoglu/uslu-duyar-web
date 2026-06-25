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
import { isProductCategory, products } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Ürünler",
  description:
    "Eren Tarım ürün kataloğu: değirmen unları, biber & baharat, salça ve silaj-yem çözümleri. Ambalaj, sertifika ve teklif detayları.",
  path: "/urunler"
});

export default function ProductsPage({ searchParams }: { searchParams: { cat?: string } }) {
  const cat = searchParams.cat;
  const initialCategory = cat && isProductCategory(cat) ? cat : "all";

  return (
    <>
      <Breadcrumb items={[{ label: "Ürünler" }]} />

      <section className="container pb-10 pt-10">
        <SectionHeading
          eyebrow="Ürün Kataloğu"
          title="Tek üretim zincirinde un, baharat ve yem"
          description="Değirmen, biber-baharat ve silaj dikeylerinin tamamını parti bazlı izlenebilirlik ve ihracat uyumlu ambalajlarla sunuyoruz."
        />
      </section>

      <section className="container pb-24">
        <ProductExplorer products={products} initialCategory={initialCategory} />
      </section>

      <section className="bg-primary-900 py-20 text-white">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Sıkça Sorulanlar"
            title="Sipariş ve ihracat süreçleri"
            description="Detaylar ürün, ambalaj ve sevkiyat tipine göre teklif aşamasında netleştirilir."
            className="text-white [&_h2]:text-white [&_p]:text-white/70"
          />
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
