/**
 * /uretim/sertifikalar — kalite ve gıda güvenliği sertifikaları.
 * Prop'lar: yok.
 * Kullanım: üretim alt sayfası; sertifika ızgarası + açıklama.
 */
import type { Metadata } from "next";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { CertBadge } from "@/components/shared/cert-badge";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { getCertificationsL } from "@/lib/content";
import { buildMetadataForLocale } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadataForLocale(locale, {
    title: locale === "en" ? "Certificates" : "Sertifikalar",
    description:
      locale === "en"
        ? "Uslu Duyar quality assurance: food safety, traceability, export compliance, certificate of origin, cold chain and quality control. Official certificate documents will be published once operator files arrive."
        : "Uslu Duyar kalite güvencesi: gıda güvenliği, izlenebilirlik, ihracat uygunluğu, menşe belgesi, soğuk zincir ve kalite kontrol başlıkları. Resmi belgeler operatör dosyalarıyla yayınlanacaktır.",
    path: "/uretim/sertifikalar"
  });
}

export default function CertificatesPage({ params: { locale } }: { params: { locale: string } }) {
  const certifications = getCertificationsL(locale);
  return (
    <>
      <Breadcrumb
        items={[
          { label: locale === "en" ? "Production" : "Üretim", href: "/uretim" },
          { label: locale === "en" ? "Certificates" : "Sertifikalar" }
        ]}
      />
      <PageHero
        eyebrow={locale === "en" ? "Certificates" : "Sertifikalar"}
        title={locale === "en" ? "Documented quality assurance" : "Belgelenmiş kalite güvencesi"}
        description={
          locale === "en"
            ? "Our certificates supporting food safety and export processes work hand in hand with batch-level traceability."
            : "Gıda güvenliği ve ihracat süreçlerini destekleyen sertifikalarımız, parti bazlı izlenebilirlikle birlikte çalışır."
        }
      />

      <section className="container py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <RevealOnScroll key={cert} delay={index * 0.04}>
              <CertBadge name={cert} locale={locale} className="h-full" />
            </RevealOnScroll>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm leading-7 text-ink/55">
          {locale === "en"
            ? "Official certificate documents will be published once operator files arrive — certificate numbers, validity dates and verification PDFs will be added to this page. Additional documents requested for export are shared during the quotation stage."
            : "Sertifika numaraları, geçerlilik tarihleri ve doğrulama PDF'leri operatör onayı sonrası bu sayfaya eklenecektir. İhracat için talep edilen ek belgeler teklif aşamasında paylaşılır."}
        </p>
      </section>
    </>
  );
}
