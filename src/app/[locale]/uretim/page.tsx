/**
 * /uretim — üretim hub sayfası (tesis, sertifika, kapasite, lojistik köprüleri).
 * Prop'lar: yok.
 * Kullanım: productionHighlights kartlarıyla alt üretim sayfalarına yönlendirir.
 */
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { StatsCounter } from "@/components/home/stats-counter";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { getProductionHighlightsL } from "@/lib/content";
import { getProductionCover } from "@/lib/manifest-reader";
import { buildMetadataForLocale } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadataForLocale(locale, {
    title: locale === "en" ? "Production" : "Üretim",
    description:
      locale === "en"
        ? "Uslu Duyar production infrastructure: facility, certificates, capacity and logistics. One traceable flow from harvest, grading, cold storage to cold-chain shipping."
        : "Uslu Duyar üretim altyapısı: tesis, sertifikalar, kapasite ve lojistik. Tek izlenebilir akışta hasat, boylama, soğuk hava deposu ve soğuk zincir sevkiyat.",
    path: "/uretim"
  });
}

export default function ProductionPage({ params: { locale } }: { params: { locale: string } }) {
  // Kapaklar manifest'teki gerçek operasyonel fotoğraflardan çözülür (yoksa SVG yedek).
  const productionHighlights = getProductionHighlightsL(locale).map((item) => ({
    ...item,
    image: getProductionCover(item.href, item.image)
  }));
  return (
    <>
      <Breadcrumb items={[{ label: locale === "en" ? "Production" : "Üretim" }]} />
      <PageHero
        eyebrow={locale === "en" ? "Production" : "Üretim"}
        title={locale === "en" ? "One flow from harvest to shipping" : "Hasattan sevkiyata tek akış"}
        description={
          locale === "en"
            ? "We manage facility, certification, capacity and logistics within a single traceable supply chain."
            : "Tesis, sertifikasyon, kapasite ve lojistik süreçlerini tek bir izlenebilir tedarik zincirinde yönetiyoruz."
        }
      />

      <section className="container grid gap-6 py-20 md:grid-cols-2">
        {productionHighlights.map((item, index) => (
          <RevealOnScroll key={item.href} delay={index * 0.05}>
            <Link
              href={item.href}
              className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-lg shadow-[0_24px_50px_-28px_rgba(50,50,93,0.4)]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                quality={90}
                sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/35 to-transparent" />
              <div className="relative z-10 p-7 text-white">
                <item.icon className="h-7 w-7 text-accent-700" />
                <h2 className="mt-3 font-display text-2xl font-semibold">{item.title}</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/75">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-700">
                  {locale === "en" ? "Explore" : "İncele"} <ArrowUpRight className="h-4 w-4" />
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
