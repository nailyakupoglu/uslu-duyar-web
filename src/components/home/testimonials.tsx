const testimonials = [
  "Mersin liman bağlantısı narenciye ihracat akışını sadeleştiriyor.",
  "Kavun ve karpuzda boylama tutarlılığı market zinciri satın alma ekibimiz için kritik.",
  "Soğuk zincir sevkiyatında zamanlama ve tazelik raporu toptan operasyonumuzu rahatlatıyor."
];

export function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((quote, index) => (
            <figure key={quote} className="rounded-lg border border-primary-900/10 bg-cream p-6">
              <div className="mb-6 flex h-10 w-28 items-center justify-center rounded bg-white text-xs font-bold uppercase tracking-[0.16em] text-ink/35">
                Logo {index + 1}
              </div>
              <blockquote className="text-lg leading-8 text-ink/78">&ldquo;{quote}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-primary-700">Referans placeholder</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
