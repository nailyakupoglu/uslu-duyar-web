export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const i18nConfig = {
  enabled: process.env.NEXT_PUBLIC_I18N_ENABLED === "true",
  locales,
  defaultLocale
};
