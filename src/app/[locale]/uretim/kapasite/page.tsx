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
    "Uslu Duyar üretim kapasitesi: soğuk hava deposu, parti bazlı izlenebilirlik ve sezon boyu kesintisiz taze ürün tedariki.",
  path: "/uretim/kapasite"
});

const capacities = [
  { title: "Sezonluk Tedarik", value: "Kesintisiz", text: "Narenciye, kavun ve karpuz sezonları boyunca planlı ve istikrarlı taze ürün tedariki." },
  { title: "Soğuk Hava Deposu", value: "—", text: "Tazeliği koruyan kontrollü soğuk hava deposu kapasitesi operatör verisiyle güncellenecektir." },
  { title: "Paketleme Hattı", value: "Kendi + Fason", text: "Kendi üretim ve fason paketleme hatlarıyla market ve ihracat hacimlerine esnek yanıt." },
  { title: "Parti Takibi", value: "İzlenebilir", text: "Her parti giriş-çıkış ve menşe bilgisiyle baştan sona izlenebilir tutulur." }
];

export default function CapacityPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Üretim", href: "/uretim" }, { label: "Kapasite" }]} />
      <PageHero
        eyebrow="Kapasite"
        title="Ölçeklenebilir, planlı tedarik"
        description="Talep dalgalanmalarını karşılayan soğuk hava deposu ve paketleme altyapısıyla sezon boyu istikrarlı tedarik."
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
