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
    <section className="bg-cream pb-20">
      <div className="container">
        <div className="rounded-lg bg-hero-gradient p-8 text-white shadow-2xl md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-harvest-500">{locale === "en" ? "Wholesale & export" : "Toptan ve ihracat"}</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-6xl">{locale === "en" ? "Request a quote and let's define the product range together." : "Teklif isteyin, ürün grubunu birlikte netleştirelim."}</h2>
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
