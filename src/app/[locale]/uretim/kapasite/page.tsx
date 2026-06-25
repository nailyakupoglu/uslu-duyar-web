/**
 * /uretim/kapasite — üretim kapasitesi ve operasyon ölçeği.
 * Prop'lar: yok.
 * Kullanım: üretim alt sayfası; kapasite kartları + StatsCounter atıfı.
 */
import type { Metadata } from "next";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { StatsCounter } from "@/components/home/stats-counter";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { buildMetadataForLocale } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadataForLocale(locale, {
    title: locale === "en" ? "Capacity" : "Kapasite",
    description:
      locale === "en"
        ? "Uslu Duyar production capacity: cold storage, batch-level traceability and uninterrupted fresh-produce supply throughout the season."
        : "Uslu Duyar üretim kapasitesi: soğuk hava deposu, parti bazlı izlenebilirlik ve sezon boyu kesintisiz taze ürün tedariki.",
    path: "/uretim/kapasite"
  });
}

const capacitiesByLocale = {
  tr: [
    { title: "Sezonluk Tedarik", value: "Kesintisiz", text: "Narenciye, kavun ve karpuz sezonları boyunca planlı ve istikrarlı taze ürün tedariki." },
    { title: "Soğuk Hava Deposu", value: "—", text: "Tazeliği koruyan kontrollü soğuk hava deposu kapasitesi operatör verisiyle güncellenecektir." },
    { title: "Paketleme Hattı", value: "Kendi + Fason", text: "Kendi üretim ve fason paketleme hatlarıyla market ve ihracat hacimlerine esnek yanıt." },
    { title: "Parti Takibi", value: "İzlenebilir", text: "Her parti giriş-çıkış ve menşe bilgisiyle baştan sona izlenebilir tutulur." }
  ],
  en: [
    { title: "Seasonal Supply", value: "Uninterrupted", text: "Planned and steady fresh-produce supply throughout the citrus, melon and watermelon seasons." },
    { title: "Cold Storage", value: "—", text: "Controlled cold-storage capacity that preserves freshness will be updated with operator data." },
    { title: "Packing Line", value: "Own + Contract", text: "Flexible response to retail and export volumes with our own and contract packing lines." },
    { title: "Batch Tracking", value: "Traceable", text: "Every batch is kept traceable from start to finish with intake-output and origin data." }
  ]
} as const;

export default function CapacityPage({ params: { locale } }: { params: { locale: string } }) {
  const capacities = locale === "en" ? capacitiesByLocale.en : capacitiesByLocale.tr;
  return (
    <>
      <Breadcrumb
        items={[
          { label: locale === "en" ? "Production" : "Üretim", href: "/uretim" },
          { label: locale === "en" ? "Capacity" : "Kapasite" }
        ]}
      />
      <PageHero
        eyebrow={locale === "en" ? "Capacity" : "Kapasite"}
        title={locale === "en" ? "Scalable, planned supply" : "Ölçeklenebilir, planlı tedarik"}
        description={
          locale === "en"
            ? "Steady supply throughout the season with cold-storage and packing infrastructure that absorbs demand fluctuations."
            : "Talep dalgalanmalarını karşılayan soğuk hava deposu ve paketleme altyapısıyla sezon boyu istikrarlı tedarik."
        }
      />

      <section className="container py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {capacities.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index * 0.05}>
              <div className="h-full rounded-2xl border border-primary-900/10 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-ink/45">{item.title}</p>
                <p className="mt-3 font-display text-3xl font-semibold text-primary-900">{item.value}</p>
                <p className="mt-3 text-sm leading-7 text-ink/65">{item.text}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-7 text-ink/55">
          {locale === "en"
            ? "Capacity values reflect planning targets; exact figures will be updated once confirmed by the operator."
            : "Kapasite değerleri planlama hedeflerini yansıtır; kesin rakamlar operatör onayı sonrası güncellenecektir."}
        </p>
      </section>

      <StatsCounter />
    </>
  );
}
