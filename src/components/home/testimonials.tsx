import { getLocale } from "next-intl/server";
import { Anchor, CalendarDays, FileCheck2 } from "lucide-react";

const trustTr = [
  { icon: Anchor, label: "Mersin Limanı", text: "FOB, CFR ve CIF teklifleri için liman odaklı yükleme dili." },
  { icon: CalendarDays, label: "12 ay planlama", text: "Narenciye + kavun + karpuz sezonları tek takvimde okunur." },
  { icon: FileCheck2, label: "RFQ dosyası", text: "Kalibre, Brix, MOQ, Incoterm ve HS kodu ürün detayında görünür." }
];

const trustEn = [
  { icon: Anchor, label: "Port of Mersin", text: "Port-focused loading language for FOB, CFR and CIF quotes." },
  { icon: CalendarDays, label: "12-month planning", text: "Citrus + melon + watermelon windows are visible in one calendar." },
  { icon: FileCheck2, label: "RFQ file", text: "Calibre, Brix, MOQ, Incoterm and HS code are visible on product details." }
];

export async function Testimonials() {
  const locale = await getLocale();
  const items = locale === "en" ? trustEn : trustTr;
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="mb-8 max-w-2xl">
          <p className="spec-mono text-primary-700">{locale === "en" ? "Verified trust signals" : "Doğrulanabilir güven sinyalleri"}</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-ink">
            {locale === "en" ? "No fake logos. Only useful buyer signals." : "Sahte logo yok. Alıcıya yarayan sinyaller var."}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.label} className="rounded-lg border border-line-soft bg-cream p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-primary-700 shadow-sm">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink">{item.label}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/68">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
