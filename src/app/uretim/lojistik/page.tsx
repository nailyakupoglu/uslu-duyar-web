/**
 * /uretim/lojistik — lojistik, ihracat ve sevkiyat altyapısı.
 * Prop'lar: yok.
 * Kullanım: üretim alt sayfası; lojistik avantajları + GlobalReachMap atıfı.
 */
import type { Metadata } from "next";
import { Anchor, FileCheck2, Ship, Truck } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { GlobalReachMap } from "@/components/home/global-reach-map";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Lojistik",
  description:
    "Eren Tarım lojistik gücü: Mersin Limanı bağlantısı, FOB/CFR/CIF ihracat operasyonları ve düzenli kara yolu sevkiyatı.",
  path: "/uretim/lojistik"
});

const advantages = [
  { icon: Anchor, title: "Mersin Limanı", text: "Tesise yakın liman bağlantısı, ihracat sevkiyatlarında zaman ve maliyet avantajı sağlar." },
  { icon: Ship, title: "İhracat Operasyonu", text: "FOB, CFR ve CIF teslim şekillerine uygun planlama ve konteyner organizasyonu." },
  { icon: Truck, title: "Kara Yolu Sevkiyatı", text: "İç piyasada düzenli, takip edilebilir kara yolu dağıtımı ve esnek teslim programı." },
  { icon: FileCheck2, title: "İhracat Evrakları", text: "Fatura, paket listesi, menşe ve sertifika evraklarının eksiksiz hazırlanması." }
];

export default function LogisticsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Üretim", href: "/uretim" }, { label: "Lojistik" }]} />
      <PageHero
        eyebrow="Lojistik"
        title="Limana yakın, dünyaya açık"
        description="Mersin Limanı avantajıyla iç piyasada hızlı, ihracatta planlı ve evrak süreçleri tam bir sevkiyat zinciri."
      />

      <section className="container py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {advantages.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index * 0.05}>
              <div className="flex h-full gap-5 rounded-lg border border-primary-900/10 bg-white p-7 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                  <item.icon className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-ink/65">{item.text}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <GlobalReachMap />
    </>
  );
}
