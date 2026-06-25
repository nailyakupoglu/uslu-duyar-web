// Ürün görsel çözümleyici — her ürüne kategorisinden ayrık bir gerçek foto atar.
// Foto yoksa (örn. kavun arşivde yok) data.ts'teki SVG yedek görsele düşer.
import { products } from "@/lib/data";
import type { ResolvedProduct } from "@/lib/content";
import { getByCategory, mediaText } from "@/lib/manifest-reader";

function indexInCategory(product: ResolvedProduct): number {
  return products
    .filter((p) => p.category === product.category)
    .findIndex((p) => p.slug === product.slug);
}

/** Ürün kartı için tek temsili görsel (kategori havuzundan sıraya göre ayrık seçim). */
export function productImage(product: ResolvedProduct): string {
  const pool = getByCategory(product.category);
  if (pool.length === 0) {
    return product.image;
  }
  const idx = Math.max(0, indexInCategory(product));
  return (pool[idx % pool.length] ?? pool[0]).src;
}

/** Detay galerisi görselleri ({src, alt}); foto yoksa data.ts gallery'sine düşer. */
export function productGallery(product: ResolvedProduct, locale = "tr"): { src: string; alt: string }[] {
  const pool = getByCategory(product.category, 8);
  if (pool.length === 0) {
    return [product.image, ...product.gallery].map((src) => ({ src, alt: product.title }));
  }
  const main = productImage(product);
  const ordered = [main, ...pool.map((m) => m.src).filter((s) => s !== main)];
  return Array.from(new Set(ordered))
    .slice(0, 6)
    .map((src) => {
      const found = pool.find((m) => m.src === src);
      return { src, alt: found ? mediaText(found, locale, "alt") : product.title };
    });
}
