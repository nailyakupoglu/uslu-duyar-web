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
import { certifications } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Sertifikalar",
  description:
    "Eren Tarım üretim sertifikaları: ISO 22000, HACCP, GLOBALG.A.P., Helal, Kosher ve organik belgeler. İhracat uyumlu kalite güvencesi.",
  path: "/uretim/sertifikalar"
});

export default function CertificatesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Üretim", href: "/uretim" }, { label: "Sertifikalar" }]} />
      <PageHero
        eyebrow="Sertifikalar"
        title="Belgelenmiş kalite güvencesi"
        description="Gıda güvenliği ve ihracat süreçlerini destekleyen sertifikalarımız, parti bazlı izlenebilirlikle birlikte çalışır."
      />

      <section className="container py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <RevealOnScroll key={cert} delay={index * 0.04}>
              <CertBadge name={cert} className="h-full" />
            </RevealOnScroll>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm leading-7 text-ink/55">
          Sertifika numaraları, geçerlilik tarihleri ve doğrulama PDF&apos;leri operatör onayı sonrası bu sayfaya
          eklenecektir. İhracat için talep edilen ek belgeler teklif aşamasında paylaşılır.
        </p>
      </section>
    </>
  );
}
