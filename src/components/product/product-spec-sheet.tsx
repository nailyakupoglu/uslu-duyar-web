/**
 * ProductSpecSheet — ürün detayındaki B2B ihracat cockpit paneli.
 * Prop'lar: { product, locale }.
 * Kullanım: Ürün detay sayfasında kalibre, Brix, MOQ, soğuk zincir ve Incoterm alanlarını gösterir.
 */
import { Anchor, Boxes, CalendarDays, FileDigit, PackageCheck, Snowflake, ThermometerSun } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { ResolvedProduct } from "@/lib/content";
import { monthLabels } from "@/lib/data";
import { pick } from "@/lib/utils";

type ProductSpecSheetProps = {
  product: ResolvedProduct;
  locale: string;
};

export function ProductSpecSheet({ product, locale }: ProductSpecSheetProps) {
  const isEn = locale === "en";
  const specs = product.exportSpecs;
  const months = specs.seasonMonths.map((month) => pick(monthLabels[month - 1].short, locale)).join(" / ");
  const rows = [
    { icon: CalendarDays, label: isEn ? "Season Window" : "Sezon Penceresi", value: months },
    { icon: ThermometerSun, label: isEn ? "Calibre / Weight" : "Kalibre / Ağırlık", value: specs.caliber },
    { icon: FileDigit, label: isEn ? "Brix / Quality" : "Brix / Kalite", value: specs.brix },
    { icon: PackageCheck, label: isEn ? "Packaging" : "Ambalaj", value: specs.packaging },
    { icon: Boxes, label: isEn ? "MOQ" : "MOQ", value: specs.moq },
    { icon: Snowflake, label: isEn ? "Cold Chain" : "Soğuk Zincir", value: specs.coldChain }
  ];

  return (
    <section className="export-panel overflow-hidden">
      <div className="border-b border-line-soft bg-port-900 px-5 py-4 text-white">
        <p className="spec-mono text-cold-50">{isEn ? "Export spec cockpit" : "İhracat spec cockpit"}</p>
        <h2 className="mt-2 text-2xl font-semibold">{product.title}</h2>
      </div>

      <dl className="grid sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="border-b border-line-soft bg-white/72 p-5 even:bg-surface-field/80 sm:border-r">
            <dt className="flex items-center gap-2 spec-mono text-ink/48">
              <row.icon className="h-4 w-4 text-port-700" />
              {row.label}
            </dt>
            <dd className="mt-2 text-sm font-semibold leading-6 text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-px bg-line-soft md:grid-cols-3">
        <div className="bg-white p-5">
          <p className="spec-mono text-ink/48">{isEn ? "40ft reefer load" : "40ft reefer yük"}</p>
          <p className="mt-2 font-mono text-lg font-semibold text-port-900">{specs.containerLoad}</p>
        </div>
        <div className="bg-white p-5">
          <p className="spec-mono text-ink/48">{isEn ? "Incoterms" : "Incoterms"}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {specs.incoterms.map((incoterm) => (
              <Badge key={incoterm} variant="steel">
                {incoterm}
              </Badge>
            ))}
          </div>
        </div>
        <div className="bg-white p-5">
          <p className="spec-mono text-ink/48">{isEn ? "HS code" : "HS kodu"}</p>
          <p className="mt-2 font-mono text-lg font-semibold text-port-900">{specs.hsCode}</p>
        </div>
      </div>

      <div className="grid gap-4 bg-surface-export p-5 md:grid-cols-[1fr_1.2fr]">
        <div className="rounded-md border border-line-soft bg-white p-4">
          <p className="flex items-center gap-2 spec-mono text-ink/48">
            <Anchor className="h-4 w-4 text-port-700" />
            {isEn ? "Loading port" : "Yükleme limanı"}
          </p>
          <p className="mt-2 text-sm font-semibold text-ink">{specs.loadingPort}</p>
        </div>
        <p className="rounded-md border border-line-soft bg-white p-4 text-sm leading-7 text-ink/68">
          {specs.note}
        </p>
      </div>
    </section>
  );
}
