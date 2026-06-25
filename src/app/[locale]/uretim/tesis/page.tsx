/**
 * /uretim/tesis — tesis ve üretim hattı akışı.
 * Prop'lar: yok.
 * Kullanım: üretim alt sayfası; proses adımları + görsel.
 */
import type { Metadata } from "next";
import Image from "next/image";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { buildMetadataForLocale } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadataForLocale(locale, {
    title: locale === "en" ? "Facility" : "Tesis",
    description:
      locale === "en"
        ? "Uslu Duyar packing facility: harvest intake, grading-selection, cold storage, contract packing and cold-chain shipping areas in a single flow."
        : "Uslu Duyar paketleme tesisi: hasat kabul, boylama-seçim, soğuk hava deposu, fason paketleme ve soğuk zincir sevkiyat alanları tek akışta.",
    path: "/uretim/tesis"
  });
}

const stepsByLocale = {
  tr: [
    { step: "01", title: "Hasat & Kabul", text: "Bahçeden gelen narenciye, kavun ve karpuz girişte örneklenir ve kalite kontrolünden geçirilir." },
    { step: "02", title: "Boylama & Seçim", text: "Ürünler boy, kalibre ve görünüm standartlarına göre ayrılarak titizlikle seçilir." },
    { step: "03", title: "Soğuk Hava Deposu", text: "Seçilen ürünler tazeliğini koruyacak kontrollü soğuk hava koşullarında bekletilir." },
    { step: "04", title: "Fason Paketleme", text: "Kendi üretim ve fason paketleme hatlarında market ve ihracat standartlarına uygun ambalajlanır." },
    { step: "05", title: "Soğuk Zincir", text: "Ambalajlı ürünler kesintisiz soğuk zincirle yükleme alanına aktarılır." },
    { step: "06", title: "Sevkiyat & İhracat", text: "Parti bazlı etiketlenen ürünler Mersin Limanı bağlantısıyla planlı sevkiyata çıkar." }
  ],
  en: [
    { step: "01", title: "Harvest & Intake", text: "Citrus, melon and watermelon arriving from the groves are sampled and put through quality control at intake." },
    { step: "02", title: "Grading & Selection", text: "Produce is sorted and carefully selected by size, calibre and appearance standards." },
    { step: "03", title: "Cold Storage", text: "Selected produce is held in controlled cold-storage conditions that preserve its freshness." },
    { step: "04", title: "Contract Packing", text: "On our own and contract packing lines, produce is packaged to retail and export standards." },
    { step: "05", title: "Cold Chain", text: "Packaged produce is moved to the loading area through an uninterrupted cold chain." },
    { step: "06", title: "Shipping & Export", text: "Batch-labelled produce moves to planned shipment via the Port of Mersin connection." }
  ]
} as const;

export default function FacilityPage({ params: { locale } }: { params: { locale: string } }) {
  const steps = locale === "en" ? stepsByLocale.en : stepsByLocale.tr;
  return (
    <>
      <Breadcrumb
        items={[
          { label: locale === "en" ? "Production" : "Üretim", href: "/uretim" },
          { label: locale === "en" ? "Facility" : "Tesis" }
        ]}
      />
      <PageHero
        eyebrow={locale === "en" ? "Facility" : "Tesis"}
        title={locale === "en" ? "The entire supply flow under one roof" : "Tek çatı altında bütün tedarik akışı"}
        description={
          locale === "en"
            ? "Every step from harvest to cold-chain shipping is planned with hygiene and traceability in mind."
            : "Hasattan soğuk zincir sevkiyata kadar tüm adımlar, hijyen ve izlenebilirlik gözetilerek planlanır."
        }
      />

      <section className="container py-16">
        <div className="relative aspect-[16/7] overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(50,50,93,0.35)]">
          <Image
            src="/images/production/tesis.svg"
            alt={locale === "en" ? "Uslu Duyar packing facility" : "Uslu Duyar paketleme tesisi"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="container pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((item, index) => (
            <RevealOnScroll key={item.step} delay={index * 0.04}>
              <div className="h-full rounded-lg border border-primary-900/10 bg-white p-7 shadow-sm">
                <span className="font-mono text-2xl font-semibold text-accent-700">{item.step}</span>
                <h2 className="mt-3 font-display text-xl font-semibold text-ink">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-ink/65">{item.text}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
