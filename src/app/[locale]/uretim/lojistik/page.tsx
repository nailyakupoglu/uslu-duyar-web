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
import { buildMetadataForLocale } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadataForLocale(locale, {
    title: locale === "en" ? "Logistics" : "Lojistik",
    description:
      locale === "en"
        ? "Uslu Duyar logistics strength: Port of Mersin connection, FOB/CFR/CIF export operations and regular cold-chain road shipping."
        : "Uslu Duyar lojistik gücü: Mersin Limanı bağlantısı, FOB/CFR/CIF ihracat operasyonları ve düzenli soğuk zincir kara yolu sevkiyatı.",
    path: "/uretim/lojistik"
  });
}

const advantagesByLocale = {
  tr: [
    { icon: Anchor, title: "Mersin Limanı", text: "Tesise yakın liman bağlantısı, ihracat sevkiyatlarında zaman ve maliyet avantajı sağlar." },
    { icon: Ship, title: "İhracat Operasyonu", text: "FOB, CFR ve CIF teslim şekillerine uygun planlama ve konteyner organizasyonu." },
    { icon: Truck, title: "Soğuk Zincir Sevkiyat", text: "Market zincirleri ve toptan alıcılara soğuk zincirle düzenli, takip edilebilir kara yolu dağıtımı." },
    { icon: FileCheck2, title: "İhracat Evrakları", text: "Fatura, paket listesi, menşe ve sertifika evraklarının eksiksiz hazırlanması." }
  ],
  en: [
    { icon: Anchor, title: "Port of Mersin", text: "A port connection close to the facility provides time and cost advantages on export shipments." },
    { icon: Ship, title: "Export Operations", text: "Planning and container organisation suited to FOB, CFR and CIF delivery terms." },
    { icon: Truck, title: "Cold-Chain Shipping", text: "Regular, trackable road distribution to retail chains and wholesale buyers via cold chain." },
    { icon: FileCheck2, title: "Export Documents", text: "Complete preparation of invoice, packing list, certificate of origin and certificate documents." }
  ]
} as const;

export default function LogisticsPage({ params: { locale } }: { params: { locale: string } }) {
  const advantages = locale === "en" ? advantagesByLocale.en : advantagesByLocale.tr;
  return (
    <>
      <Breadcrumb
        items={[
          { label: locale === "en" ? "Production" : "Üretim", href: "/uretim" },
          { label: locale === "en" ? "Logistics" : "Lojistik" }
        ]}
      />
      <PageHero
        eyebrow={locale === "en" ? "Logistics" : "Lojistik"}
        title={locale === "en" ? "Close to the port, open to the world" : "Limana yakın, dünyaya açık"}
        description={
          locale === "en"
            ? "A shipping chain that is fast in the domestic market, planned for export and complete on documentation, thanks to the Port of Mersin advantage."
            : "Mersin Limanı avantajıyla iç piyasada hızlı, ihracatta planlı ve evrak süreçleri tam bir sevkiyat zinciri."
        }
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
