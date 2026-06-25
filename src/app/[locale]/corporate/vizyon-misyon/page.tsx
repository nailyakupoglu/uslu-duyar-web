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
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Vizyon & Misyon",
  description:
    "Uslu Duyar vizyon ve misyonu: tarladan sofraya güveni büyüten, izlenebilir ve sürdürülebilir bir üretim anlayışı.",
  path: "/corporate/vizyon-misyon"
});

const pillars = [
  { title: "Güven", text: "Müşteri ve tedarikçi ilişkilerinde uzun vadeli, şeffaf bir ortaklık kurarız." },
  { title: "Kalite", text: "Standartların ötesinde, tutarlı ve izlenebilir bir ürün kalitesi hedefleriz." },
  { title: "İnovasyon", text: "Üretim hatlarımızı verimlilik ve gıda güvenliği için sürekli yeniliyoruz." }
];

export default function VisionMissionPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Kurumsal", href: "/corporate" }, { label: "Vizyon & Misyon" }]} />
      <PageHero
        eyebrow="Vizyon & Misyon"
        title="Bugünün üretimi, yarının güveni"
        description="Kısa vadeli hacim yerine, uzun vadeli güven ve kalite üzerine kurulu bir büyüme hedefliyoruz."
      />

      <section className="container grid gap-6 py-20 md:grid-cols-2">
        <div className="rounded-2xl bg-primary-900 p-9 text-white">
          <Compass className="h-9 w-9 text-accent-500" />
          <h2 className="mt-5 font-display text-3xl font-semibold">Vizyonumuz</h2>
          <p className="mt-4 text-lg leading-8 text-white/75">
            Anadolu&apos;nun bereketli topraklarından çıkan ürünleri, modern üretim teknolojisi ve izlenebilir kalite
            anlayışıyla buluşturarak; iç piyasada ve ihracatta tercih edilen, güvenilir bir tarım markası olmak.
          </p>
        </div>
        <div className="rounded-2xl bg-cream p-9">
          <Target className="h-9 w-9 text-primary-700" />
          <h2 className="mt-5 font-display text-3xl font-semibold text-ink">Misyonumuz</h2>
          <p className="mt-4 text-lg leading-8 text-ink/75">
            Narenciye, kavun ve karpuzda; soğuk zincire uygun, parti bazlı izlenebilir ve sürdürülebilir üretim ve
            paketleme yaparak müşterilerimize tutarlı kalite, zamanında sevkiyat ve güçlü bir ticari ortaklık sunmak.
          </p>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="container">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">Temel İlkelerimiz</h2>
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
