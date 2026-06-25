/**
 * ContactForm — B2B RFQ (Request for Quote) formu.
 * Prop'lar: { defaultSubject?: string, compact?: boolean, onSuccess?: () => void }.
 * Kullanım: /iletisim sayfasında ve QuoteModal içinde; /api/contact'a POST eder.
 *
 * Alanlar (B2B):
 *  - İletişim: name, email, phone, company
 *  - RFQ: product, quantity (kg/ton), incoterm (FOB/CFR/CIF...), destination port/country, buyerType
 *  - Mesaj + honeypot
 */
"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getProducts } from "@/lib/content";
import { contactSchema, incoterms, buyerTypes, type ContactInput } from "@/lib/contact";
import { rfqWhatsappMessage, whatsappHref } from "@/lib/contact-channels";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  defaultSubject?: string;
  defaultProduct?: string;
  compact?: boolean;
  onSuccess?: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

// İngilizce label çevirileri (TR default, EN via useLocale)
const t = (isEn: boolean, tr: string, en: string) => (isEn ? en : tr);

const buyerTypeLabels: Record<(typeof buyerTypes)[number], { tr: string; en: string }> = {
  wholesaler: { tr: "Toptancı", en: "Wholesaler" },
  "retail-chain": { tr: "Market Zinciri", en: "Retail Chain" },
  horeca: { tr: "HORECA (Otel/Rest/Cafe)", en: "HORECA (Hotel/Rest/Cafe)" },
  importer: { tr: "İthalatçı", en: "Importer" },
  broker: { tr: "Broker / Aracı", en: "Broker / Agent" },
  other: { tr: "Diğer", en: "Other" },
};

export function ContactForm({ defaultSubject = "", defaultProduct = "", compact = false, onSuccess }: ContactFormProps) {
  const locale = useLocale();
  const isEn = locale === "en";
  const products = getProducts(locale);
  const whatsapp = whatsappHref(rfqWhatsappMessage(locale, defaultProduct || defaultSubject));
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: defaultSubject, product: defaultProduct, website: "" },
  });

  async function onSubmit(values: ContactInput) {
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("request_failed");
      }
      setStatus("success");
      reset({ subject: defaultSubject, product: defaultProduct, website: "" });
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-3 rounded-lg border border-primary-500/30 bg-primary-50 p-8 text-center"
        role="status"
      >
        <CheckCircle2 className="h-10 w-10 text-primary-700" />
        <p className="font-display text-2xl font-semibold text-primary-900">
          {isEn ? "Your RFQ has been received" : "Teklif talebiniz alındı"}
        </p>
        <p className="max-w-sm text-sm leading-6 text-ink/68">
          {isEn
            ? "Our export team will review your request and respond within 24 hours with pricing (FOB Mersin / CIF your-port), lead time and samples."
            : "İhracat ekibimiz talebinizi inceleyip 24 saat içinde fiyat (FOB Mersin / CIF limanınız), teslim süresi ve numune ile dönüş yapacak."}
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          {isEn ? "Send New Request" : "Yeni Talep Gönder"}
        </Button>
        {whatsapp ? (
          <Button asChild variant="steel" size="sm">
            <a href={whatsapp} target="_blank" rel="noreferrer">
              {isEn ? "Continue on WhatsApp" : "WhatsApp ile devam et"}
            </a>
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      {/* === İletişim (zorunlu) === */}
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <div className="grid gap-1.5">
          <Label htmlFor="cf-name">{t(isEn, "Ad Soyad *", "Full Name *")}</Label>
          <Input
            id="cf-name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          {errors.name ? <span className="text-xs text-accent2-500">{errors.name.message}</span> : null}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="cf-email">{t(isEn, "E-posta *", "Email *")}</Label>
          <Input
            id="cf-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email ? <span className="text-xs text-accent2-500">{errors.email.message}</span> : null}
        </div>
      </div>

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <div className="grid gap-1.5">
          <Label htmlFor="cf-phone">{t(isEn, "Telefon", "Phone")}</Label>
          <Input id="cf-phone" type="tel" autoComplete="tel" {...register("phone")} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="cf-company">{t(isEn, "Firma *", "Company *")}</Label>
          <Input
            id="cf-company"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            {...register("company")}
          />
          {errors.company ? (
            <span className="text-xs text-accent2-500">{errors.company.message}</span>
          ) : null}
        </div>
      </div>

      {/* === B2B RFQ === */}
      <fieldset className="grid gap-3 rounded-lg border border-line-soft bg-surface-export p-4">
        <legend className="px-1 spec-mono text-port-700">
          {t(isEn, "Teklif Detayları (B2B)", "Quote Details (B2B)")}
        </legend>

        <div className={cn("grid gap-3", !compact && "sm:grid-cols-2")}>
          <div className="grid gap-1.5">
            <Label htmlFor="cf-product">{t(isEn, "Ürün / Çeşit", "Product / Variety")}</Label>
            <Select
              id="cf-product"
              {...register("product")}
            >
              <option value="">{t(isEn, "Ürün seçiniz", "Select product")}</option>
              {products.map((product) => (
                <option key={`${product.category}-${product.slug}`} value={product.title}>
                  {product.title} — {product.exportSpecs.caliber}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="cf-quantity">{t(isEn, "Miktar (kg / ton)", "Quantity (kg / ton)")}</Label>
            <Input
              id="cf-quantity"
              placeholder={t(isEn, "örn. 5000 kg", "e.g. 5000 kg")}
              {...register("quantity")}
            />
          </div>
        </div>

        <div className={cn("grid gap-3", !compact && "sm:grid-cols-2")}>
          <div className="grid gap-1.5">
            <Label htmlFor="cf-incoterm">{t(isEn, "Incoterm", "Incoterm")}</Label>
            <Select
              id="cf-incoterm"
              {...register("incoterm")}
            >
              <option value="">{t(isEn, "Seçiniz", "Select")}</option>
              {incoterms.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="cf-buyerType">{t(isEn, "Alıcı Tipi", "Buyer Type")}</Label>
            <Select
              id="cf-buyerType"
              {...register("buyerType")}
            >
              <option value="">{t(isEn, "Seçiniz", "Select")}</option>
              {buyerTypes.map((b) => (
                <option key={b} value={b}>
                  {buyerTypeLabels[b][isEn ? "en" : "tr"]}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className={cn("grid gap-3", !compact && "sm:grid-cols-2")}>
          <div className="grid gap-1.5">
            <Label htmlFor="cf-destinationPort">
              {t(isEn, "Varış Limanı", "Destination Port")}
            </Label>
            <Input
              id="cf-destinationPort"
              placeholder={t(isEn, "örn. Hamburg", "e.g. Hamburg")}
              {...register("destinationPort")}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="cf-destinationCountry">
              {t(isEn, "Ülke", "Country")}
            </Label>
            <Input
              id="cf-destinationCountry"
              placeholder={t(isEn, "örn. Almanya", "e.g. Germany")}
              {...register("destinationCountry")}
            />
          </div>
        </div>
      </fieldset>

      {/* === Mesaj (zorunlu) === */}
      <div className="grid gap-1.5">
        <Label htmlFor="cf-subject">{t(isEn, "Konu", "Subject")}</Label>
        <Input id="cf-subject" {...register("subject")} />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="cf-message">{t(isEn, "Mesajınız *", "Message *")}</Label>
        <Textarea
          id="cf-message"
          rows={compact ? 4 : 6}
          aria-invalid={Boolean(errors.message)}
          placeholder={t(
            isEn,
            "Kalibre, Brix, hasat dönemi, ambalaj, ödeme vadesi gibi detayları paylaşın.",
            "Calibre, Brix, harvest window, packaging, payment terms — any details.",
          )}
          {...register("message")}
        />
        {errors.message ? (
          <span className="text-xs text-accent2-500">{errors.message.message}</span>
        ) : null}
      </div>

      {/* Honeypot — ekran dışı, kullanıcılar görmez. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">{t(isEn, "Website (leave blank)", "Web sitesi (boş bırakın)")}</label>
        <input id="cf-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status === "error" ? (
        <p className="rounded-md bg-accent2-50 px-3 py-2 text-sm text-accent2-700" role="alert">
          {t(
            isEn,
            "Mesaj gönderilemedi. Lütfen tekrar deneyin veya doğrudan telefonla ulaşın.",
            "Message could not be sent. Please try again or reach us directly by phone.",
          )}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "submitting"}
        magnetic
        className="mt-1"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {t(isEn, "Gönderiliyor…", "Sending…")}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> {t(isEn, "Teklif Talebi Gönder", "Send Quote Request")}
          </>
        )}
      </Button>
      <p className="text-xs leading-5 text-ink/50">
        {isEn ? (
          <>
            By submitting this form you agree to the processing of your data under the{" "}
            <a href="/kvkk" className="underline hover:text-primary-700">
              Privacy Notice
            </a>
            .
          </>
        ) : (
          <>
            Formu göndererek verilerinizin{" "}
            <a href="/kvkk" className="underline hover:text-primary-700">
              KVKK Aydınlatma Metni
            </a>{" "}
            kapsamında işlenmesini kabul edersiniz.
          </>
        )}
      </p>
    </form>
  );
}
