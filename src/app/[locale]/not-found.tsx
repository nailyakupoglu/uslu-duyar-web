/**
 * 404 sayfası — bulunamayan route'lar için kurumsal, sakin hata ekranı.
 * Prop'lar: yok.
 * Kullanım: Next.js eşleşmeyen route'larda otomatik render eder.
 */
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const locale = await getLocale();
  const isEn = locale === "en";
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-primary-900 px-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,160,23,0.18),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-xl text-center">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.3em] text-accent-500">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
          {isEn ? "Page not found" : "Sayfa bulunamadı"}
        </h1>
        <p className="mt-4 text-base leading-7 text-white/70">
          {isEn
            ? "The page you are looking for may have been moved or removed. You can continue the journey from field to table on the home page."
            : "Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Tarladan sofraya yolculuğa ana sayfadan devam edebilirsiniz."}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="accent" size="lg" magnetic>
            <Link href="/">{isEn ? "Back to Home" : "Ana Sayfaya Dön"}</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/urunler">{isEn ? "Browse Products" : "Ürünleri İncele"}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
