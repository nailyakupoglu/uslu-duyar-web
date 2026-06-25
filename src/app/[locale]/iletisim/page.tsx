/**
 * /iletisim — iletişim bilgileri + form.
 * Prop'lar: yok.
 * Kullanım: ContactForm (/api/contact) + firma iletişim kanalları + WhatsApp/telefon.
 */
import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/shared/contact-form";
import { siteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadata({
    title: locale === "en" ? "Contact" : "İletişim",
    description:
      locale === "en"
        ? "Get in touch with Uslu Duyar: form, phone, e-mail, and WhatsApp channels for quote requests, export, and supply enquiries."
        : "Uslu Duyar ile iletişime geçin: teklif talebi, ihracat ve tedarik soruları için form, telefon, e-posta ve WhatsApp kanalları.",
    path: "/iletisim"
  });
}

const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`;

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <Breadcrumb items={[{ label: locale === "en" ? "Contact" : "İletişim" }]} />
      <PageHero
        eyebrow={locale === "en" ? "Contact" : "İletişim"}
        title={locale === "en" ? "We're here for your quotes and questions" : "Teklif ve sorularınız için buradayız"}
        description={
          locale === "en"
            ? "Reach out for any question about products, packaging, export, and supply processes; we will get back to you as soon as possible."
            : "Ürün, ambalaj, ihracat ve tedarik süreçlerine dair her soru için bize ulaşın; en kısa sürede dönüş yapalım."
        }
      />

      <section className="container grid gap-12 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-4">
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="flex items-start gap-4 rounded-lg border border-primary-900/10 bg-white p-5 transition hover:border-primary-500"
          >
            <Phone className="mt-0.5 h-5 w-5 text-primary-700" />
            <span>
              <span className="block text-sm font-semibold text-ink">{locale === "en" ? "Phone" : "Telefon"}</span>
              <span className="text-sm text-ink/65">{siteConfig.phone}</span>
            </span>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-start gap-4 rounded-lg border border-primary-900/10 bg-white p-5 transition hover:border-primary-500"
          >
            <Mail className="mt-0.5 h-5 w-5 text-primary-700" />
            <span>
              <span className="block text-sm font-semibold text-ink">{locale === "en" ? "E-mail" : "E-posta"}</span>
              <span className="text-sm text-ink/65">{siteConfig.email}</span>
            </span>
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-lg border border-primary-900/10 bg-white p-5 transition hover:border-primary-500"
          >
            <MessageCircle className="mt-0.5 h-5 w-5 text-primary-700" />
            <span>
              <span className="block text-sm font-semibold text-ink">WhatsApp</span>
              <span className="text-sm text-ink/65">{siteConfig.whatsapp}</span>
            </span>
          </a>
          <div className="flex items-start gap-4 rounded-lg border border-primary-900/10 bg-white p-5">
            <MapPin className="mt-0.5 h-5 w-5 text-primary-700" />
            <span>
              <span className="block text-sm font-semibold text-ink">{locale === "en" ? "Address" : "Adres"}</span>
              <span className="text-sm text-ink/65">{siteConfig.address}</span>
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-primary-900/10 bg-white p-7 shadow-[0_24px_50px_-30px_rgba(50,50,93,0.35)] md:p-9">
          <h2 className="font-display text-2xl font-semibold text-ink">
            {locale === "en" ? "Write to Us" : "Bize Yazın"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink/60">
            {locale === "en"
              ? "Fill out the form below; your request will be forwarded to the relevant team."
              : "Aşağıdaki formu doldurun; talebiniz ilgili ekibe iletilir."}
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
