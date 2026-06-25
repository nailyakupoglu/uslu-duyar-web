/**
 * /corporate/vizyon-misyon — vizyon, misyon ve temel ilkeler.
 * Prop'lar: yok.
 * Kullanım: kurumsal alt sayfası; iki sütun vizyon/misyon + ilke kartları.
 */
import type { Metadata } from "next";
import { Compass, Target } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { buildMetadataForLocale } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadataForLocale(locale, {
    title: locale === "en" ? "Vision & Mission" : "Vizyon & Misyon",
    description:
      locale === "en"
        ? "Uslu Duyar's vision and mission: a traceable and sustainable production philosophy that grows trust from field to table."
        : "Uslu Duyar vizyon ve misyonu: tarladan sofraya güveni büyüten, izlenebilir ve sürdürülebilir bir üretim anlayışı.",
    path: "/corporate/vizyon-misyon"
  });
}

export default function VisionMissionPage({ params: { locale } }: { params: { locale: string } }) {
  const pillars =
    locale === "en"
      ? [
          { title: "Trust", text: "We build long-term, transparent partnerships in our customer and supplier relationships." },
          { title: "Quality", text: "We aim for consistent and traceable product quality that goes beyond standards." },
          { title: "Innovation", text: "We continuously renew our production lines for efficiency and food safety." }
        ]
      : [
          { title: "Güven", text: "Müşteri ve tedarikçi ilişkilerinde uzun vadeli, şeffaf bir ortaklık kurarız." },
          { title: "Kalite", text: "Standartların ötesinde, tutarlı ve izlenebilir bir ürün kalitesi hedefleriz." },
          { title: "İnovasyon", text: "Üretim hatlarımızı verimlilik ve gıda güvenliği için sürekli yeniliyoruz." }
        ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: locale === "en" ? "Corporate" : "Kurumsal", href: "/corporate" },
          { label: locale === "en" ? "Vision & Mission" : "Vizyon & Misyon" }
        ]}
      />
      <PageHero
        eyebrow={locale === "en" ? "Vision & Mission" : "Vizyon & Misyon"}
        title={locale === "en" ? "Today's production, tomorrow's trust" : "Bugünün üretimi, yarının güveni"}
        description={
          locale === "en"
            ? "We aim for growth built on long-term trust and quality rather than short-term volume."
            : "Kısa vadeli hacim yerine, uzun vadeli güven ve kalite üzerine kurulu bir büyüme hedefliyoruz."
        }
      />

      <section className="container grid gap-6 py-20 md:grid-cols-2">
        <div className="rounded-2xl bg-primary-900 p-9 text-white">
          <Compass className="h-9 w-9 text-accent-700" />
          <h2 className="mt-5 font-display text-3xl font-semibold">
            {locale === "en" ? "Our Vision" : "Vizyonumuz"}
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/75">
            {locale === "en"
              ? "To bring together produce grown in Anatolia's fertile soils with modern production technology and a traceable quality approach, and to become a trusted agriculture brand preferred in both domestic and export markets."
              : "Anadolu'nun bereketli topraklarından çıkan ürünleri, modern üretim teknolojisi ve izlenebilir kalite anlayışıyla buluşturarak; iç piyasada ve ihracatta tercih edilen, güvenilir bir tarım markası olmak."}
          </p>
        </div>
        <div className="rounded-2xl bg-cream p-9">
          <Target className="h-9 w-9 text-primary-700" />
          <h2 className="mt-5 font-display text-3xl font-semibold text-ink">
            {locale === "en" ? "Our Mission" : "Misyonumuz"}
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/75">
            {locale === "en"
              ? "To deliver consistent quality, on-time shipment, and a strong commercial partnership to our customers through cold-chain-ready, batch-traceable, and sustainable production and packing of citrus, melon, and watermelon."
              : "Narenciye, kavun ve karpuzda; soğuk zincire uygun, parti bazlı izlenebilir ve sürdürülebilir üretim ve paketleme yaparak müşterilerimize tutarlı kalite, zamanında sevkiyat ve güçlü bir ticari ortaklık sunmak."}
          </p>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="container">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            {locale === "en" ? "Our Core Principles" : "Temel İlkelerimiz"}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <RevealOnScroll key={pillar.title} delay={index * 0.05}>
                <div className="h-full rounded-lg border border-primary-900/10 bg-white p-7 shadow-sm">
                  <span className="font-mono text-sm font-semibold text-accent-700">0{index + 1}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-primary-900">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/65">{pillar.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
