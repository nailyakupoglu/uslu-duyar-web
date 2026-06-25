/**
 * /uretim — üretim hub sayfası (tesis, sertifika, kapasite, lojistik köprüleri).
 * Prop'lar: yok.
 * Kullanım: productionHighlights kartlarıyla alt üretim sayfalarına yönlendirir.
 */
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { StatsCounter } from "@/components/home/stats-counter";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { productionHighlights } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Üretim",
  description:
    "Eren Tarım üretim altyapısı: tesis, sertifikalar, kapasite ve lojistik. Tek izlenebilir akışta silo, öğütme, kurutma ve sevkiyat.",
  path: "/uretim"
});

export default function ProductionPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Üretim" }]} />
      <PageHero
        eyebrow="Üretim"
        title="Silodan sevkiyata tek akış"
        description="Tesis, sertifikasyon, kapasite ve lojistik süreçlerini tek bir izlenebilir üretim zincirinde yönetiyoruz."
      />

      <section className="container grid gap-6 py-20 md:grid-cols-2">
        {productionHighlights.map((item, index) => (
          <RevealOnScroll key={item.href} delay={index * 0.05}>
            <Link
              href={item.href}
              className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl shadow-[0_24px_50px_-28px_rgba(50,50,93,0.4)]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/35 to-transparent" />
              <div className="relative z-10 p-7 text-white">
                <item.icon className="h-7 w-7 text-accent-500" />
                <h2 className="mt-3 font-display text-2xl font-semibold">{item.title}</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/75">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-500">
                  İncele <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </section>

      <StatsCounter />
    </>
  );
}
