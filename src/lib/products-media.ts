// Ürün görsel çözümleyici — her ürüne kategorisinden ayrık, curated gerçek foto atar.
// SVG ürün fallback'leri görünür yüzeye çıkarılmadan önce arşiv fotoğraf seçkisi kullanılır.
import { products } from "@/lib/data";
import type { ResolvedProduct } from "@/lib/content";
import { getByCategory, mediaText } from "@/lib/manifest-reader";
import { getProductCover, getProductVisuals } from "@/lib/visual-assets";

function indexInCategory(product: ResolvedProduct): number {
  return products
    .filter((p) => p.category === product.category)
    .findIndex((p) => p.slug === product.slug);
}

/** Ürün kartı için tek temsili görsel (kategori havuzundan sıraya göre ayrık seçim). */
export function productImage(product: ResolvedProduct): string {
  const idx = Math.max(0, indexInCategory(product));
  return getProductCover(product.category, idx).src;
}

/** Detay galerisi görselleri ({src, alt}); curated seçki sonrası manifest havuzuyla genişler. */
export function productGallery(product: ResolvedProduct, locale = "tr"): { src: string; alt: string }[] {
  const curated = getProductVisuals(product.category, locale);
  const pool = getByCategory(product.category, 8);
  const main = productImage(product);
  const ordered = [
    main,
    ...curated.map((asset) => asset.src).filter((src) => src !== main),
    ...pool.map((m) => m.src).filter((src) => src !== main)
  ];
  return Array.from(new Set(ordered))
    .slice(0, 6)
    .map((src) => {
      const found = pool.find((m) => m.src === src);
      const curatedAsset = curated.find((asset) => asset.src === src);
      return { src, alt: curatedAsset?.alt ?? (found ? mediaText(found, locale, "alt") : product.title) };
    });
}
