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
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Kapasite",
  description:
    "Eren Tarım üretim kapasitesi: vardiyalı operasyon, silo depolama hacmi ve parti bazlı izlenebilir üretim hedefleri.",
  path: "/uretim/kapasite"
});

const capacities = [
  { title: "Yıllık Üretim Hedefi", value: "50.000 ton/yıl", text: "Değirmen, biber-baharat ve silaj dikeylerinin toplam hedef kapasitesi." },
  { title: "Vardiyalı Operasyon", value: "3 vardiya", text: "Sezon yoğunluğuna göre planlanan kesintisiz üretim takvimi." },
  { title: "Silo & Depolama", value: "Çoklu silo", text: "Hammadde ve bitmiş ürün için ayrı, kontrollü depolama alanları." },
  { title: "Parti Takibi", value: "%100 kayıt", text: "Her parti giriş-çıkış ve analiz bilgisiyle izlenebilir tutulur." }
];

export default function CapacityPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Üretim", href: "/uretim" }, { label: "Kapasite" }]} />
      <PageHero
        eyebrow="Kapasite"
        title="Ölçeklenebilir, planlı üretim"
        description="Talep dalgalanmalarını karşılayan vardiyalı operasyon ve depolama altyapısıyla istikrarlı tedarik."
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
          Kapasite değerleri planlama hedeflerini yansıtır; kesin rakamlar operatör onayı sonrası güncellenecektir.
        </p>
      </section>

      <StatsCounter />
    </>
  );
}
