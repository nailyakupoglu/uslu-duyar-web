/**
 * HarvestToPortFlow — ana sayfada operasyon akışını premium süreç yüzeyi olarak gösterir.
 * Prop'lar: { locale }.
 * Kullanım: Home ritminde sezon takvimi sonrası; hasat → liman → RFQ zincirini açıklar.
 */
"use client";

import { Anchor, ClipboardCheck, PackageCheck, Snowflake, Sprout, Truck } from "lucide-react";
import { motion } from "framer-motion";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const steps = {
  tr: [
    { icon: Sprout, title: "Hasat", text: "Parti bazlı tarlada seçim ve olgunluk kontrolü." },
    { icon: ClipboardCheck, title: "Boylama", text: "Kalibre, Brix ve kalite notları teklif dosyasına işlenir." },
    { icon: PackageCheck, title: "Paketleme", text: "Koli, palet ve market standardı yükleme planı hazırlanır." },
    { icon: Snowflake, title: "Soğuk Zincir", text: "Ürün grubu için doğru sıcaklık aralığında sevkiyat." },
    { icon: Anchor, title: "Mersin Limanı", text: "FOB, CFR veya CIF akışına göre konteyner organizasyonu." },
    { icon: Truck, title: "Teslim", text: "Alıcıya lot bilgisi, evrak ve yükleme durumu ile dönüş." }
  ],
  en: [
    { icon: Sprout, title: "Harvest", text: "Lot-based field selection and ripeness control." },
    { icon: ClipboardCheck, title: "Grading", text: "Calibre, Brix and quality notes enter the quote file." },
    { icon: PackageCheck, title: "Packing", text: "Box, pallet and retail-standard loading plans are prepared." },
    { icon: Snowflake, title: "Cold Chain", text: "Shipment at the right temperature range for each product group." },
    { icon: Anchor, title: "Port of Mersin", text: "Container organisation based on FOB, CFR or CIF flow." },
    { icon: Truck, title: "Delivery", text: "Buyer receives lot data, documents and loading status." }
  ]
} as const;

export function HarvestToPortFlow({ locale }: { locale: string }) {
  const isEn = locale === "en";
  const items = isEn ? steps.en : steps.tr;
  const reduceMotion = useSafeReducedMotion();

  return (
    <section className="section-padding bg-export-radar text-white">
      <div className="container">
        <div className="max-w-3xl">
          <p className="spec-mono text-cold-50">{isEn ? "Harvest-to-port flow" : "Tarladan limana akış"}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">
            {isEn ? "A visible supply chain, not a vague promise." : "Belirsiz vaat değil, görünen tedarik zinciri."}
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/70">
            {isEn
              ? "Every RFQ is answered with the operational facts a buyer needs: lot, season, grading, loading term and cold-chain plan."
              : "Her teklif talebi; alıcının ihtiyaç duyduğu parti, sezon, boylama, yükleme şekli ve soğuk zincir planıyla yanıtlanır."}
          </p>
        </div>
        <div className="relative mt-12">
          <div className="absolute left-5 right-5 top-6 hidden h-px bg-white/12 md:block" />
          <motion.div
            className="absolute left-5 right-5 top-6 hidden h-px origin-left bg-cold-500 md:block"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index * 0.04}>
              <article className="relative h-full rounded-lg border border-white/12 bg-white/[0.075] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white/12 text-cold-50">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-white/38">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/62">{item.text}</p>
              </article>
            </RevealOnScroll>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
