/**
 * /uretim/sezon-takvimi — ay-ay tedarik penceresi ve ihracat planlama sayfası.
 * Prop'lar: { params: { locale } }.
 * Kullanım: 12 ay x ürün grubu grid ile alıcıya sezon uygunluğunu hızlı gösterir.
 */
import type { Metadata } from "next";
import { CalendarDays, FileText } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { SeasonCalendar } from "@/components/sections/season-calendar";
import { buildMetadataForLocale } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadataForLocale(locale, {
    title: locale === "en" ? "Season Calendar" : "Sezon Takvimi",
    description:
      locale === "en"
        ? "Month-by-month export supply calendar for Uslu Duyar citrus, melon and watermelon products."
        : "Uslu Duyar narenciye, kavun ve karpuz ürünleri için ay-ay ihracat tedarik takvimi.",
    path: "/uretim/sezon-takvimi"
  });
}

export default function SeasonCalendarPage({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === "en";

  return (
    <>
      <Breadcrumb
        items={[
          { label: isEn ? "Production" : "Üretim", href: "/uretim" },
          { label: isEn ? "Season Calendar" : "Sezon Takvimi" }
        ]}
      />
      <PageHero
        eyebrow={isEn ? "Season calendar" : "Sezon takvimi"}
        title={isEn ? "Plan your loads by month." : "Yüklemeyi aya göre planlayın."}
        description={
          isEn
            ? "Citrus, melon and watermelon windows are shown as indicative planning ranges. Exact availability is confirmed per lot and harvest week."
            : "Narenciye, kavun ve karpuz pencereleri planlama aralığı olarak gösterilir. Kesin uygunluk parti ve hasat haftasına göre teyit edilir."
        }
      />

      <section className="section-padding bg-cream">
        <div className="container">
          <SeasonCalendar locale={locale} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-line-soft bg-white p-6">
              <CalendarDays className="h-7 w-7 text-primary-700" />
              <h2 className="mt-4 text-xl font-semibold text-ink">
                {isEn ? "Indicative planning, lot-based confirmation" : "Planlama aralığı, parti bazlı teyit"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-ink/65">
                {isEn
                  ? "The calendar supports RFQ planning; final calibre, Brix, packaging and loading date are confirmed with the harvest lot."
                  : "Takvim teklif planlamasını destekler; nihai kalibre, Brix, ambalaj ve yükleme tarihi hasat partisiyle birlikte teyit edilir."}
              </p>
            </div>
            <div className="rounded-lg border border-line-soft bg-white p-6">
              <FileText className="h-7 w-7 text-port-700" />
              <h2 className="mt-4 text-xl font-semibold text-ink">
                {isEn ? "Use it with the RFQ form" : "RFQ formuyla birlikte kullanın"}
              </h2>
              <p className="mt-2 text-sm leading-7 text-ink/65">
                {isEn
                  ? "Send product, quantity, destination port and Incoterm together; the export team can then prepare a cleaner offer file."
                  : "Ürün, miktar, varış limanı ve Incoterm bilgisini birlikte gönderin; ihracat ekibi daha net bir teklif dosyası hazırlayabilir."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
