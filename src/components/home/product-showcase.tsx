import { getLocale } from "next-intl/server";

import { ProductCard } from "@/components/shared/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getProducts } from "@/lib/content";

export async function ProductShowcase() {
  const locale = await getLocale();
  const items = getProducts(locale);

  return (
    <section className="section-padding bg-earth-50">
      <div className="container">
        <SectionHeading
          eyebrow={locale === "en" ? "Product portfolio" : "Ürün portföyü"}
          title={locale === "en" ? "Citrus, melon and watermelon as RFQ-ready product files." : "RFQ'ya hazır ürün dosyalarıyla narenciye, kavun ve karpuz."}
          description={locale === "en" ? "Each product starts with the practical details buyers need: season, calibre or weight, packaging, cold-chain range, MOQ and loading terms." : "Her ürün alıcının ihtiyaç duyduğu pratik bilgilerle başlar: sezon, kalibre veya ağırlık, ambalaj, soğuk zincir aralığı, MOQ ve yükleme şartları."}
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.slice(0, 8).map((product) => (
            <ProductCard key={`${product.category}-${product.slug}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
