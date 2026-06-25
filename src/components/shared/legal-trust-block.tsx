/**
 * LegalTrustBlock — doğrulanabilir legal/trust alanlarını sahte veri üretmeden gösterir.
 * Prop'lar: { locale, compact? }.
 * Kullanım: footer, iletişim ve sertifika sayfalarında güven bloğu.
 */
import { FileCheck2, ShieldCheck } from "lucide-react";

import { siteConfig } from "@/lib/data";

export function LegalTrustBlock({ locale, compact = false }: { locale: string; compact?: boolean }) {
  const isEn = locale === "en";
  const legalRows = [
    { label: isEn ? "MERSIS" : "MERSİS", value: siteConfig.legal.mersisNo },
    { label: isEn ? "Tax Office" : "Vergi Dairesi", value: siteConfig.legal.taxOffice },
    { label: isEn ? "Tax No" : "Vergi No", value: siteConfig.legal.taxNo },
    { label: isEn ? "Exporter Union" : "İhracatçı Birliği", value: siteConfig.legal.exporterUnion }
  ];
  const hasAny = legalRows.some((row) => row.value);

  return (
    <aside className="rounded-lg border border-line-soft bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-trust-50 text-trust-700">
          {hasAny ? <ShieldCheck className="h-5 w-5" /> : <FileCheck2 className="h-5 w-5" />}
        </span>
        <div>
          <h3 className="font-semibold text-ink">{isEn ? "Legal trust file" : "Yasal güven dosyası"}</h3>
          <p className="mt-1 text-sm leading-6 text-ink/62">
            {hasAny
              ? isEn
                ? "Verified company fields are shown below."
                : "Doğrulanmış firma alanları aşağıda gösterilir."
              : isEn
                ? "Company registry, tax and exporter union fields will be published only after operator confirmation."
                : "MERSİS, vergi ve ihracatçı birliği alanları yalnızca operatör onayından sonra yayınlanacaktır."}
          </p>
        </div>
      </div>
      {!compact || hasAny ? (
        <dl className="mt-5 grid gap-2 sm:grid-cols-2">
          {legalRows.map((row) => (
            <div key={row.label} className="rounded-md border border-line-soft bg-surface-field px-3 py-2">
              <dt className="spec-mono text-ink/42">{row.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-ink/72">{row.value ?? (isEn ? "Pending" : "Beklemede")}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </aside>
  );
}
