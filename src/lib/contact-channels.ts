/**
 * Contact channel helpers — placeholder telefon/WhatsApp değerlerini güvenli şekilde ayıklar.
 * Prop'lar: phone/whatsapp stringleri ve opsiyonel mesaj bağlamı.
 * Kullanım: Header/Footer/CTA/WhatsApp FAB canlı olmayan numarayı linke çevirmesin.
 */
import { siteConfig } from "@/lib/data";

const PLACEHOLDER_DIGITS = new Set(["903240000000", "905320000000", ""]);

export function cleanPhone(value: string): string {
  return value.replace(/\D/g, "");
}

export function isUsablePhone(value: string): boolean {
  const digits = cleanPhone(value);
  return digits.length >= 10 && !PLACEHOLDER_DIGITS.has(digits);
}

export function phoneHref(): string | null {
  return isUsablePhone(siteConfig.phone) ? `tel:${siteConfig.phone.replace(/\s/g, "")}` : null;
}

export function whatsappHref(message?: string): string | null {
  if (!isUsablePhone(siteConfig.whatsapp)) {
    return null;
  }
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${cleanPhone(siteConfig.whatsapp)}${text}`;
}

export function rfqWhatsappMessage(locale: string, context?: string): string {
  const isEn = locale === "en";
  return isEn
    ? `Hello Uslu Duyar, I would like to request a B2B export quote.${context ? ` Context: ${context}.` : ""} Please share product, quantity, Incoterm and loading details.`
    : `Merhaba Uslu Duyar, B2B ihracat teklif talebi oluşturmak istiyorum.${context ? ` Bağlam: ${context}.` : ""} Ürün, miktar, Incoterm ve yükleme detaylarını paylaşmak isterim.`;
}
