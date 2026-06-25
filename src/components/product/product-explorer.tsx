/**
 * ProductExplorer — kategori sekmeli, animasyonlu ürün ızgarası (istemci tarafı filtre).
 * Prop'lar: { products: ResolvedProduct[], initialCategory?: ProductCategory | "all" }.
 * Kullanım: /urunler sayfasında tüm ürünleri alır; sekme ile kategori filtreler.
 */
"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ProductCard } from "@/components/shared/product-card";
import { getCategoryMetaL, type ResolvedProduct } from "@/lib/content";
import { productCategories, type ProductCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

type Filter = ProductCategory | "all";

export function ProductExplorer({
  products,
  initialCategory = "all"
}: {
  products: ResolvedProduct[];
  initialCategory?: Filter;
}) {
  const locale = useLocale();
  const isEn = locale === "en";
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<Filter>(initialCategory);

  const filters: { key: Filter; label: string }[] = useMemo(
    () => [
      { key: "all", label: isEn ? "All" : "Tümü" },
      ...productCategories.map((category) => ({
        key: category,
        label: getCategoryMetaL(category, locale).title
      }))
    ],
    [locale, isEn]
  );

  const visible = useMemo(
    () => (active === "all" ? products : products.filter((product) => product.category === active)),
    [active, products]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={isEn ? "Product categories" : "Ürün kategorileri"}>
        {filters.map((filter) => {
          const isActive = filter.key === active;
          return (
            <button
              key={filter.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(filter.key)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition",
                isActive
                  ? "border-primary-700 bg-primary-700 text-white shadow-lg"
                  : "border-primary-900/15 bg-white/70 text-ink/70 hover:border-primary-500 hover:text-primary-700"
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((product) => (
            <motion.div
              key={`${product.category}-${product.slug}`}
              layout
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <p className="mt-10 rounded-lg bg-white/70 p-8 text-center text-ink/60">
          {isEn ? "No products have been added in this category yet." : "Bu kategoride henüz ürün eklenmedi."}
        </p>
      ) : null}
    </div>
  );
}
