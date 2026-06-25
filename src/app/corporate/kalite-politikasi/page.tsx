/**
 * /corporate/kalite-politikasi — kalite ve gıda güvenliği politikası.
 * Prop'lar: yok.
 * Kullanım: kurumsal alt sayfası; ilke listesi + sertifika atıfı.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { CertBadge } from "@/components/shared/cert-badge";
import { certifications } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Kalite Politikası",
  description:
    "Uslu Duyar kalite politikası: gıda güvenliği, izlenebilirlik, hijyen protokolleri ve sürekli iyileştirme taahhüdü.",
  path: "/corporate/kalite-politikasi"
});

const principles = [
  "Tüm üretim aşamalarında gıda güvenliği yönetim sistemlerinin gerekliliklerine uyarız.",
  "Hammaddeyi girişten sevkiyata kadar parti bazlı izlenebilir tutarız.",
  "Düzenli laboratuvar analizleriyle ürünlerin standartlara uygunluğunu doğrularız.",
  "Hijyen ve sanitasyon planlarını periyodik olarak gözden geçirir ve güncelleriz.",
  "Çalışanlarımıza gıda güvenliği ve hijyen konularında sürekli eğitim sağlarız.",
  "Müşteri geri bildirimlerini düzeltici ve önleyici faaliyetlere dönüştürürüz."
];

export default function QualityPolicyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Kurumsal", href: "/corporate" }, { label: "Kalite Politikası" }]} />
      <PageHero
        eyebrow="Kalite Politikası"
        title="Güvenilir gıda, kayıtlı her parti"
        description="Kalite bizim için bir kontrol noktası değil, üretimin her aşamasına yayılan bir disiplindir."
      />

      <section className="container grid gap-12 py-20 lg:grid-cols-2 lg:items-start">
        <ul className="space-y-5">
          {principles.map((principle) => (
            <li key={principle} className="flex gap-3 text-base leading-7 text-ink/75">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
              <span>{principle}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl bg-cream p-8">
          <h2 className="font-display text-2xl font-semibold text-ink">Sertifika & Belgeler</h2>
          <p className="mt-2 text-sm leading-6 text-ink/60">
            Aşağıdaki belgeler operatör onayı sonrası geçerlilik tarihleri ve PDF&apos;leriyle güncellenecektir.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {certifications.map((cert) => (
              <CertBadge key={cert} name={cert} />
            ))}
          </div>
          <Link
            href="/uretim/sertifikalar"
            className="mt-6 inline-flex text-sm font-semibold text-primary-700 hover:underline"
          >
            Üretim sertifikalarını gör →
          </Link>
        </div>
      </section>
    </>
  );
}
