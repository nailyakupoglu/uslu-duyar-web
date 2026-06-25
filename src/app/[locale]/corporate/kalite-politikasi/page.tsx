/**
 * /corporate/kalite-politikasi — kalite ve gıda güvenliği politikası.
 * Prop'lar: yok.
 * Kullanım: kurumsal alt sayfası; ilke listesi + sertifika atıfı.
 */
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { CheckCircle2 } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { CertBadge } from "@/components/shared/cert-badge";
import { getCertificationsL } from "@/lib/content";
import { buildMetadataForLocale } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadataForLocale(locale, {
    title: locale === "en" ? "Quality Policy" : "Kalite Politikası",
    description:
      locale === "en"
        ? "Uslu Duyar quality policy: food safety, traceability, hygiene protocols, and a commitment to continuous improvement."
        : "Uslu Duyar kalite politikası: gıda güvenliği, izlenebilirlik, hijyen protokolleri ve sürekli iyileştirme taahhüdü.",
    path: "/corporate/kalite-politikasi"
  });
}

export default function QualityPolicyPage({ params: { locale } }: { params: { locale: string } }) {
  const certifications = getCertificationsL(locale);

  const principles =
    locale === "en"
      ? [
          "We comply with the requirements of food safety management systems at every stage of production.",
          "We keep produce traceable on a batch basis, from intake to dispatch.",
          "We verify that products meet the required standards through regular laboratory analyses.",
          "We periodically review and update our hygiene and sanitation plans.",
          "We provide our staff with ongoing training on food safety and hygiene.",
          "We turn customer feedback into corrective and preventive actions."
        ]
      : [
          "Tüm üretim aşamalarında gıda güvenliği yönetim sistemlerinin gerekliliklerine uyarız.",
          "Hammaddeyi girişten sevkiyata kadar parti bazlı izlenebilir tutarız.",
          "Düzenli laboratuvar analizleriyle ürünlerin standartlara uygunluğunu doğrularız.",
          "Hijyen ve sanitasyon planlarını periyodik olarak gözden geçirir ve güncelleriz.",
          "Çalışanlarımıza gıda güvenliği ve hijyen konularında sürekli eğitim sağlarız.",
          "Müşteri geri bildirimlerini düzeltici ve önleyici faaliyetlere dönüştürürüz."
        ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: locale === "en" ? "Corporate" : "Kurumsal", href: "/corporate" },
          { label: locale === "en" ? "Quality Policy" : "Kalite Politikası" }
        ]}
      />
      <PageHero
        eyebrow={locale === "en" ? "Quality Policy" : "Kalite Politikası"}
        title={locale === "en" ? "Reliable food, every batch on record" : "Güvenilir gıda, kayıtlı her parti"}
        description={
          locale === "en"
            ? "For us, quality is not a single checkpoint but a discipline that runs through every stage of production."
            : "Kalite bizim için bir kontrol noktası değil, üretimin her aşamasına yayılan bir disiplindir."
        }
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

        <div className="rounded-lg bg-cream p-8">
          <h2 className="font-display text-2xl font-semibold text-ink">
            {locale === "en" ? "Certificates & Documents" : "Sertifika & Belgeler"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink/60">
            {locale === "en"
              ? "The official certificate documents below will be published with their validity dates and PDFs once the operator files arrive."
              : "Aşağıdaki belgeler operatör onayı sonrası geçerlilik tarihleri ve PDF'leriyle güncellenecektir."}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {certifications.map((cert) => (
              <CertBadge key={cert} name={cert} locale={locale} />
            ))}
          </div>
          <Link
            href="/uretim/sertifikalar"
            className="mt-6 inline-flex text-sm font-semibold text-primary-700 hover:underline"
          >
            {locale === "en" ? "View production certificates →" : "Üretim sertifikalarını gör →"}
          </Link>
        </div>
      </section>
    </>
  );
}
