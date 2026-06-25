import { getLocale } from "next-intl/server";

const testimonialsTr = [
  { quote: "Mersin liman bağlantısı narenciye ihracat akışını sadeleştiriyor.", role: "Satın Alma Müdürü, Market Zinciri" },
  { quote: "Kavun ve karpuzda boylama tutarlılığı market zinciri satın alma ekibimiz için kritik.", role: "Kategori Yöneticisi, Toptan Tedarikçi" },
  { quote: "Soğuk zincir sevkiyatında zamanlama ve tazelik raporu toptan operasyonumuzu rahatlatıyor.", role: "İhracat Sorumlusu, İhracatçı" }
];

const testimonialsEn = [
  { quote: "The Mersin port connection streamlines our citrus export flow.", role: "Procurement Manager, Retail Chain" },
  { quote: "Consistent sizing on melon and watermelon is critical for our retail chain buying team.", role: "Category Manager, Wholesale Supplier" },
  { quote: "Timing and freshness reports on cold-chain shipments ease our wholesale operation.", role: "Export Officer, Exporter" }
];

export async function Testimonials() {
  const locale = await getLocale();
  const testimonials = locale === "en" ? testimonialsEn : testimonialsTr;
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <figure key={item.quote} className="rounded-lg border border-primary-900/10 bg-cream p-6">
              <div className="mb-6 flex h-10 w-28 items-center justify-center rounded bg-white text-xs font-bold uppercase tracking-[0.16em] text-ink/35">
                Logo {index + 1}
              </div>
              <blockquote className="text-lg leading-8 text-ink/78">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-primary-700">{item.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
