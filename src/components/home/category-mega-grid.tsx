"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Anchor, ArrowUpRight, CalendarRange, ScanLine } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { getCategoriesL } from "@/lib/content";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { getCategoryVisual } from "@/lib/visual-assets";
import type { ProductCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CategoryMegaGrid() {
  const locale = useLocale();
  const reduceMotion = useSafeReducedMotion();
  // Kategori metinleri locale'e göre çözülür, kapaklar manifest'teki gerçek foto (yoksa SVG yedek görsel).
  const cards = getCategoriesL(locale).map((category) => ({
    ...category,
    visual: getCategoryVisual(category.slug as ProductCategory, locale)
  }));
  const proofPoints = locale === "en"
    ? [
        { icon: CalendarRange, label: "Season-led supply", value: "12 month planning" },
        { icon: ScanLine, label: "Batch visibility", value: "Calibre · Brix · MOQ" },
        { icon: Anchor, label: "Port advantage", value: "Mersin logistics" }
      ]
    : [
        { icon: CalendarRange, label: "Sezon odaklı tedarik", value: "12 aylık planlama" },
        { icon: ScanLine, label: "Parti görünürlüğü", value: "Kalibre · Brix · MOQ" },
        { icon: Anchor, label: "Liman avantajı", value: "Mersin lojistiği" }
      ];
  return (
    <section className="field-grid relative bg-cream pb-24 pt-0 md:pb-32">
      <div className="container relative z-20 -mt-8 md:-mt-12">
        <div className="premium-card grid overflow-hidden border-white/70 bg-white/90 md:grid-cols-3">
          {proofPoints.map((item) => (
            <div key={item.label} className="flex items-center gap-4 border-b border-line-soft p-5 last:border-0 md:border-b-0 md:border-r md:last:border-r-0 md:p-6">
              <span className="flex h-11 w-8 shrink-0 items-center justify-start border-r border-line-soft text-primary-700">
                <item.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span>
                <span className="spec-mono block text-xs text-primary-700">{item.label}</span>
                <span className="mt-1 block text-sm font-semibold text-ink">{item.value}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="mb-10 mt-20 max-w-3xl md:mt-28">
          <p className="spec-mono text-xs text-primary-700">{locale === "en" ? "The harvest portfolio" : "Hasat portföyü"}</p>
          <h2 className="display-tight mt-4 font-display text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.9] text-ink">
            {locale === "en" ? "Three crops. One disciplined supply line." : "Üç ürün grubu. Tek disiplinli tedarik hattı."}
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {cards.map((category, index) => (
            <motion.article
              key={category.slug}
              initial={reduceMotion ? false : { opacity: 1, y: 30 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className={cn(
                "group relative min-h-[460px] overflow-hidden rounded-lg bg-ink text-white shadow-[0_30px_80px_-34px_rgba(6,21,12,.62)] lg:col-span-4",
                index === 0 && "lg:col-span-6 lg:min-h-[620px]",
                index > 0 && "lg:col-span-3 lg:min-h-[620px]"
              )}
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
              <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/18 to-transparent" />
              <span className="absolute left-6 top-6 rounded-full border border-white/20 bg-ink/20 px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.18em] text-white/72 backdrop-blur-md">
                0{index + 1}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                <category.icon className="mb-5 h-8 w-8 text-harvest-500" />
                <h3 className="display-tight font-display text-4xl font-medium md:text-5xl">{category.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-white/72">{category.description}</p>
                <span className="mt-6 inline-flex translate-y-2 items-center gap-2 text-sm font-bold text-harvest-500 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
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
