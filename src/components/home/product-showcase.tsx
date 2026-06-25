import { ProductCard } from "@/components/shared/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { products } from "@/lib/data";

export function ProductShowcase() {
  return (
    <section className="section-padding bg-earth-50">
      <div className="container">
        <SectionHeading
          eyebrow="Ürün portföyü"
          title="Değirmen, biber-baharat ve silaj ürünleri tek vitrin altında."
          description="Ürün kartları operatör cevapları geldikçe gerçek teknik değerler, ambalaj seçenekleri ve sertifika PDF'leriyle güncellenecek."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={`${product.category}-${product.slug}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
