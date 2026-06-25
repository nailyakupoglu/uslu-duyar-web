/**
 * /corporate/hakkimizda — firma hikâyesi, değerler ve özet istatistikler.
 * Prop'lar: yok.
 * Kullanım: kurumsal alt sayfası; PageHero + içerik blokları + StatsCounter atıfı.
 */
import type { Metadata } from "next";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { getStatsL } from "@/lib/content";
import { buildMetadataForLocale } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadataForLocale(locale, {
    title: locale === "en" ? "About Us" : "Hakkımızda",
    description:
      locale === "en"
        ? "The story of Uslu Duyar — from fresh fruit and vegetable trade in Çukurova since 1991 to cold storage, packing, and export of citrus, melon, and watermelon."
        : "1991'den bu yana Çukurova'da taze meyve-sebze ticaretiyle başlayan, narenciye, kavun ve karpuzda soğuk hava deposu, paketleme ve ihracata uzanan Uslu Duyar'ın hikâyesi.",
    path: "/corporate/hakkimizda"
  });
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const stats = getStatsL(locale);

  const values = [
    {
      title: locale === "en" ? "Traceability" : "İzlenebilirlik",
      text:
        locale === "en"
          ? "Every stage of the produce, from field to packing, is recorded on a batch basis."
          : "Hammaddenin tarladan paketlemeye kadar her aşaması parti bazlı kayıt altına alınır."
    },
    {
      title: locale === "en" ? "Food Safety" : "Gıda Güvenliği",
      text:
        locale === "en"
          ? "Hygiene protocols and regular analyses ensure that every batch meets the required standards."
          : "Hijyen protokolleri ve düzenli analizler, her partinin standartlara uygunluğunu güvence altına alır."
    },
    {
      title: locale === "en" ? "Continuity" : "Süreklilik",
      text:
        locale === "en"
          ? "Our contract-farming network and cold storage capacity ensure uninterrupted supply throughout the season."
          : "Sözleşmeli üretim ağı ve soğuk hava deposu kapasitesi sayesinde sezon boyunca kesintisiz tedarik sağlanır."
    }
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: locale === "en" ? "Corporate" : "Kurumsal", href: "/corporate" },
          { label: locale === "en" ? "About Us" : "Hakkımızda" }
        ]}
      />
      <PageHero
        eyebrow={locale === "en" ? "About Us" : "Hakkımızda"}
        title={locale === "en" ? "From field to table, from Mersin to the world" : "Tarladan sofraya, Mersin'den dünyaya"}
        description={
          locale === "en"
            ? "We carried the meticulousness of a family business into a corporate production discipline."
            : "Bir aile işletmesinin titizliğini, kurumsal bir üretim disiplinine taşıdık."
        }
      />

      <section className="container grid gap-12 py-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
        <div className="space-y-6 text-lg leading-8 text-ink/75">
          {locale === "en" ? (
            <>
              <p>
                Uslu Duyar set out in 1991 with fresh fruit and vegetable trade in Çukurova. The relationship of trust
                built with the region&apos;s farmers in those early years gradually became the foundation of our own
                production and packing capacity.
              </p>
              <p>
                We gather citrus (orange, mandarin, lemon, grapefruit), melon, and watermelon harvested from the
                fertile orchards of the Mersin, Adana, and Çukurova plains through grading, cold chain, and packing
                processes, and supply them to wholesale buyers, retail chains, and export markets. Alongside our own
                production, we also expand our supply network with contract packing services.
              </p>
              <p>
                Our proximity to the Port of Mersin allows us to reach not only the domestic market but also the Middle
                East, Europe, and North Africa. Our goal is to be a reliable supply partner that brings fresh flavour
                together with cold chain discipline.
              </p>
            </>
          ) : (
            <>
              <p>
                Uslu Duyar, 1991 yılında Çukurova&apos;da taze meyve-sebze ticaretiyle yola çıktı. İlk
                yıllarda bölge çiftçisiyle kurulan güven ilişkisi, zamanla kendi üretim ve paketleme kapasitemizin
                temelini oluşturdu.
              </p>
              <p>
                Mersin, Adana ve Çukurova ovasının verimli bahçelerinden hasat edilen narenciye (portakal, mandalina,
                limon, greyfurt), kavun ve karpuzu; boylama, soğuk zincir ve paketleme süreçlerinde toplayarak toptan
                alıcılara, market zincirlerine ve ihracata sunuyoruz. Kendi üretimimizin yanı sıra fason paketleme
                hizmetiyle de tedarik ağımızı genişletiyoruz.
              </p>
              <p>
                Mersin Limanı&apos;na yakınlığımız, ürünlerimizi iç piyasanın yanı sıra Orta Doğu, Avrupa ve Kuzey
                Afrika pazarlarına da ulaştırmamızı sağlıyor. Hedefimiz, taze lezzeti soğuk zincir disipliniyle
                buluşturan güvenilir bir tedarik ortağı olmak.
              </p>
            </>
          )}
        </div>

        <aside className="grid gap-4 rounded-lg bg-primary-900 p-8 text-white">
          {stats.map((stat) => (
            <div key={stat.label} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
              <p className="font-display text-3xl font-semibold text-accent-700">
                {new Intl.NumberFormat("tr-TR").format(stat.value)}
                {stat.suffix}
              </p>
              <p className="mt-1 text-sm text-white/65">{stat.label}</p>
            </div>
          ))}
        </aside>
      </section>

      <section className="bg-cream py-20">
        <div className="container">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            {locale === "en" ? "Our Values" : "Değerlerimiz"}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <RevealOnScroll key={value.title} delay={index * 0.05}>
                <div className="h-full rounded-lg border border-primary-900/10 bg-white p-7 shadow-sm">
                  <h3 className="font-display text-xl font-semibold text-primary-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/65">{value.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
