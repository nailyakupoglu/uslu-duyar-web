/**
 * /corporate/surdurulebilirlik — sürdürülebilirlik yaklaşımı ve odak alanları.
 * Prop'lar: yok.
 * Kullanım: kurumsal alt sayfası; odak alanı kartları + taahhüt metni.
 */
import type { Metadata } from "next";
import { Droplets, Leaf, Recycle, Zap } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Sürdürülebilirlik",
  description:
    "Eren Tarım sürdürülebilirlik yaklaşımı: su ve enerji verimliliği, atık yönetimi ve sorumlu tedarik zinciri.",
  path: "/corporate/surdurulebilirlik"
});

const focusAreas = [
  { icon: Droplets, title: "Su Yönetimi", text: "Yıkama ve işleme hatlarında su tüketimini izler, geri kazanım fırsatlarını değerlendiririz." },
  { icon: Zap, title: "Enerji Verimliliği", text: "Öğütme ve kurutma proseslerinde enerji verimli ekipman ve planlamayı önceliklendiririz." },
  { icon: Recycle, title: "Atık & Ambalaj", text: "Üretim atıklarını ayrıştırır, yan ürünleri yem zincirinde değerlendirme hedefiyle çalışırız." },
  { icon: Leaf, title: "Sorumlu Tedarik", text: "Sözleşmeli üretim ağıyla bölgesel çiftçiyi destekler, kısa tedarik zinciri kurarız." }
];

export default function SustainabilityPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Kurumsal", href: "/corporate" }, { label: "Sürdürülebilirlik" }]} />
      <PageHero
        eyebrow="Sürdürülebilirlik"
        title="Bereketi gelecek nesillere taşımak"
        description="Üretkenliği, doğal kaynakların sorumlu kullanımıyla dengelemeyi bir öncelik olarak görüyoruz."
      />

      <section className="container py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {focusAreas.map((area, index) => (
            <RevealOnScroll key={area.title} delay={index * 0.05}>
              <div className="flex h-full gap-5 rounded-lg border border-primary-900/10 bg-white p-7 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                  <area.icon className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">{area.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">{area.text}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="bg-primary-900 py-20 text-white">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Taahhüdümüz</h2>
          <p className="mt-5 text-lg leading-8 text-white/75">
            Sürdürülebilirliği bir pazarlama söylemi değil, üretim kararlarımızın bir parçası olarak ele alıyoruz.
            Ölçülebilir hedefler ve düzenli raporlama yaklaşımımız, operatör ve paydaş geri bildirimleriyle birlikte
            önümüzdeki dönemde detaylandırılacaktır.
          </p>
        </div>
      </section>
    </>
  );
}
