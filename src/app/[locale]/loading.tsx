/**
 * Yükleme iskeleti — route geçişlerinde gösterilen sade bekleme ekranı.
 * Prop'lar: yok.
 * Kullanım: Next.js Suspense sınırı olarak segment yüklenirken otomatik render eder.
 */
import { getLocale } from "next-intl/server";

export default async function Loading() {
  const locale = await getLocale();
  const isEn = locale === "en";
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-cream" role="status" aria-live="polite">
      <span className="sr-only">{isEn ? "Loading content" : "İçerik yükleniyor"}</span>
      <span className="relative flex h-12 w-12">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500/40" />
        <span className="relative inline-flex h-12 w-12 rounded-full border-2 border-primary-700/30 border-t-primary-700" />
      </span>
    </div>
  );
}
