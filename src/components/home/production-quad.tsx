"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";

import { SectionHeading } from "@/components/shared/section-heading";
import { getProductionHighlightsL } from "@/lib/content";

export function ProductionQuad() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const productionHighlights = getProductionHighlightsL(locale);
  return (
    <section className="section-padding bg-primary-900 text-white">
      <div className="container">
        <SectionHeading
          eyebrow={locale === "en" ? "Production strength" : "Üretim gücü"}
          title={locale === "en" ? "From certification to season planning, every operation is visible." : "Sertifikadan sezon planına, her operasyon görünür."}
          description={locale === "en" ? "A clear corporate narrative connecting harvest, grading, cold chain, season windows and export logistics in one buyer-ready flow." : "Hasat, boylama, soğuk zincir, sezon penceresi ve ihracat lojistiğini alıcıya hazır tek akışta birleştiren net kurumsal anlatı."}
          className="text-white [&_h2]:text-white [&_p]:text-white/68"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {productionHighlights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 36 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group relative min-h-[360px] overflow-hidden rounded-lg"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-primary-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <item.icon className="mb-4 h-9 w-9 text-accent-500" />
                <h3 className="font-display text-4xl font-semibold">{item.title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-7 text-white/70">{item.description}</p>
                <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent-500">
                  {locale === "en" ? "Details" : "Detay"} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
