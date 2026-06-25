/**
 * /corporate — kurumsal hub sayfası (alt sayfalara köprü + tarihçe zaman çizelgesi).
 * Prop'lar: yok.
 * Kullanım: hakkımızda, kalite, vizyon-misyon, sürdürülebilirlik sayfalarına yönlendirir.
 */
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { corporateLinks, timeline } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Kurumsal",
  description:
    "Uslu Duyar kurumsal sayfaları: hakkımızda, kalite politikası, vizyon & misyon ve sürdürülebilirlik yaklaşımı.",
  path: "/corporate"
});

const descriptions: Record<string, string> = {
  "/corporate/hakkimizda": "1991'den bugüne Çukurova merkezli taze ürün hikâyemiz ve değerlerimiz.",
  "/corporate/kalite-politikasi": "Gıda güvenliği, izlenebilirlik ve sürekli iyileştirme taahhüdümüz.",
  "/corporate/vizyon-misyon": "Tarladan sofraya güveni büyüten uzun vadeli hedeflerimiz.",
  "/corporate/surdurulebilirlik": "Su, enerji ve tedarik zincirinde sorumlu üretim yaklaşımımız."
};

export default function CorporatePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Kurumsal" }]} />
      <PageHero
        eyebrow="Kurumsal"
        title="30 yıllık birikim, kurumsal disiplin"
        description="Aile işletmesinden entegre tarım markasına uzanan yolculuğumuzu, kalite ve sürdürülebilirlik ilkelerimizle birlikte sunuyoruz."
      />

      <section className="container grid gap-5 py-20 sm:grid-cols-2">
        {corporateLinks.map((link, index) => (
          <RevealOnScroll key={link.href} delay={index * 0.05}>
            <Link
              href={link.href}
              className="group flex h-full flex-col justify-between rounded-lg border border-primary-900/10 bg-white p-7 shadow-[0_18px_45px_rgba(14,14,14,0.06)] transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">{link.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink/65">{descriptions[link.href]}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                Detaylar
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </RevealOnScroll>
        ))}
      </section>

      <section className="bg-cream py-20">
        <div className="container">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-700">Tarihçe</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ink md:text-5xl">Yolculuğumuz</h2>
          <ol className="mt-12 grid gap-8 border-l-2 border-primary-700/15 pl-6 md:pl-8">
            {timeline.map((item, index) => (
              <RevealOnScroll key={item.year} delay={index * 0.05}>
                <li className="relative">
                  <span className="absolute -left-[34px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 ring-4 ring-cream md:-left-[42px]" />
                  <span className="font-mono text-sm font-semibold text-accent-700">{item.year}</span>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/65">{item.text}</p>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
