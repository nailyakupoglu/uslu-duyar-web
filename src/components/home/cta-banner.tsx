import { Link } from "@/i18n/navigation";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { phoneHref, rfqWhatsappMessage, whatsappHref } from "@/lib/contact-channels";

export async function CtaBanner() {
  const locale = await getLocale();
  const phone = phoneHref();
  const whatsapp = whatsappHref(rfqWhatsappMessage(locale, "CTA"));
  return (
    <section className="field-grid bg-cream py-24 md:py-32">
      <div className="container">
        <div className="route-rule relative isolate overflow-hidden rounded-lg bg-hero-gradient p-8 text-white shadow-[0_40px_100px_-38px_rgba(6,21,12,.72)] md:p-14 lg:p-16">
          <div className="harvest-grid pointer-events-none absolute inset-0 -z-10 opacity-30" />
          <span className="pointer-events-none absolute -right-28 -top-36 -z-10 h-[420px] w-[420px] rounded-full border border-accent-500/25" aria-hidden="true">
            <span className="absolute inset-[22%] rounded-full border border-white/12" />
          </span>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-harvest-500">{locale === "en" ? "Wholesale & export" : "Toptan ve ihracat"}</p>
              <h2 className="display-tight mt-5 font-display text-[clamp(3rem,6vw,6.4rem)] font-medium leading-[0.88]">{locale === "en" ? "Request a quote and let's define the product range together." : "Teklif isteyin, ürün grubunu birlikte netleştirelim."}</h2>
              <p className="mt-5 max-w-2xl text-white/70">{locale === "en" ? "Share the product, packaging, delivery terms and destination country, and we'll build a quick preliminary quote flow." : "Ürün, ambalaj, teslim şekli ve hedef ülke bilgisiyle hızlı bir ön teklif akışı oluşturulur."}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild variant="accent" size="xl" magnetic>
                <Link href="/iletisim">
                  <Mail className="h-5 w-5" />
                  {locale === "en" ? "Send Form" : "Form Gönder"}
                </Link>
              </Button>
              {phone ? (
                <Button asChild variant="outline" size="xl">
                  <a href={phone}>
                    <Phone className="h-5 w-5" />
                    {locale === "en" ? "Phone" : "Telefon"}
                  </a>
                </Button>
              ) : null}
              {whatsapp ? (
                <Button asChild variant="ghost" size="xl">
                  <a href={whatsapp} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
