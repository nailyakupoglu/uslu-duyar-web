/**
 * /corporate/hakkimizda — firma hikâyesi, değerler ve özet istatistikler.
 * Prop'lar: yok.
 * Kullanım: kurumsal alt sayfası; PageHero + içerik blokları + StatsCounter atıfı.
 */
import type { Metadata } from "next";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { stats } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Hakkımızda",
  description:
    "1993'ten bu yana Mersin'de tahıl ticaretiyle başlayan, değirmen, biber-baharat ve silaj dikeylerinde entegre üretime ulaşan Eren Tarım'ın hikâyesi.",
  path: "/corporate/hakkimizda"
});

const values = [
  {
    title: "İzlenebilirlik",
    text: "Hammaddenin tarladan paketlemeye kadar her aşaması parti bazlı kayıt altına alınır."
  },
  {
    title: "Gıda Güvenliği",
    text: "Hijyen protokolleri ve düzenli analizler, her partinin standartlara uygunluğunu güvence altına alır."
  },
  {
    title: "Süreklilik",
    text: "Sözleşmeli üretim ağı ve silo kapasitesi sayesinde sezon boyunca kesintisiz tedarik sağlanır."
  }
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Kurumsal", href: "/corporate" }, { label: "Hakkımızda" }]} />
      <PageHero
        eyebrow="Hakkımızda"
        title="Tarladan sofraya, Mersin'den dünyaya"
        description="Bir aile işletmesinin titizliğini, kurumsal bir üretim disiplinine taşıdık."
      />

      <section className="container grid gap-12 py-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
        <div className="space-y-6 text-lg leading-8 text-ink/75">
          <p>
            Eren Tarım, 1993 yılında Mersin&apos;de tahıl ve yerel tarım ürünleri ticaretiyle yola çıktı. İlk
            yıllarda bölge çiftçisiyle kurulan güven ilişkisi, zamanla kendi üretim ve işleme kapasitemizin temelini
            oluşturdu.
          </p>
          <p>
            2004&apos;te değirmen yatırımıyla un üretimine, 2012&apos;de biber-baharat hattıyla salça ve baharat
            işlemeye, sonraki yıllarda ise silaj ve yem çözümlerine yöneldik. Bugün üç ana üretim dikeyini tek marka
            altında, ortak bir kalite anlayışıyla yönetiyoruz.
          </p>
          <p>
            Mersin Limanı&apos;na yakınlığımız, ürünlerimizi iç piyasanın yanı sıra Orta Doğu, Avrupa ve Kuzey Afrika
            pazarlarına da ulaştırmamızı sağlıyor. Hedefimiz, geleneksel lezzeti endüstriyel hijyenle buluşturan
            güvenilir bir tedarik ortağı olmak.
          </p>
        </div>

        <aside className="grid gap-4 rounded-2xl bg-primary-900 p-8 text-white">
          {stats.map((stat) => (
            <div key={stat.label} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
              <p className="font-display text-3xl font-semibold text-accent-500">
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
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">Değerlerimiz</h2>
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
