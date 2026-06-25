import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// İki dilli metin: ya düz string (her iki dilde aynı) ya da { tr, en }.
export type I18nText = string | { tr: string; en: string };

// Aktif locale'e göre metni seçer; string ise olduğu gibi döner (kademeli çeviriye izin verir).
export function pick(value: I18nText, locale: string): string {
  if (typeof value === "string") {
    return value;
  }
  return locale === "en" ? value.en : value.tr;
}

export function absoluteUrl(path = "") {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://usluduyar.evohaus.org";
  return `${baseUrl}${path}`;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("tr-TR").format(value);
}

export function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
