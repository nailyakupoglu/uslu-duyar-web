"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { getCategoriesL } from "@/lib/content";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { getCategoryVisual } from "@/lib/visual-assets";
import type { ProductCategory } from "@/lib/data";

export function CategoryMegaGrid() {
  const locale = useLocale();
  const reduceMotion = useSafeReducedMotion();
  // Kategori metinleri locale'e göre çözülür, kapaklar manifest'teki gerçek foto (yoksa SVG yedek görsel).
  const cards = getCategoriesL(locale).map((category) => ({
    ...category,
    visual: getCategoryVisual(category.slug as ProductCategory, locale)
  }));
  return (
    <section className="section-padding bg-cream">
      <div className="container">
        <div className="grid gap-5 lg:grid-cols-3">
          {cards.map((category, index) => (
            <motion.article
              key={category.slug}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group relative min-h-[430px] overflow-hidden rounded-lg bg-ink text-white shadow-2xl"
            >
              <Link href={category.href} className="absolute inset-0 z-10" aria-label={`${category.title} kategorisini incele`} />
              <Image
                src={category.visual.src}
                alt={category.visual.alt}
                fill
                quality={90}
                sizes="(min-width: 1280px) 405px, (min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.08]"
                style={{ objectPosition: category.visual.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/24 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <category.icon className="mb-5 h-9 w-9 text-harvest-500" />
                <h2 className="font-display text-4xl font-semibold">{category.title}</h2>
                <p className="mt-3 max-w-sm text-sm leading-7 text-white/72">{category.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-harvest-500 opacity-0 transition group-hover:opacity-100">
                  {locale === "en" ? "Open Category" : "Kategoriye Git"} <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
