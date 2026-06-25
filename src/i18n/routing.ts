// next-intl yönlendirme yapılandırması — tr varsayılan (prefix'siz), en /en altında.
// localePrefix "as-needed": TR URL'leri değişmez (/urunler), EN /en/urunler olur.
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed"
});

export type AppLocale = (typeof routing.locales)[number];
