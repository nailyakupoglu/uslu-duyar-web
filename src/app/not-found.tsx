/**
 * 404 sayfası — bulunamayan route'lar için kurumsal, sakin hata ekranı.
 * Prop'lar: yok.
 * Kullanım: Next.js eşleşmeyen route'larda otomatik render eder.
 */
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-primary-900 px-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,160,23,0.18),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-xl text-center">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.3em] text-accent-500">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">Sayfa bulunamadı</h1>
        <p className="mt-4 text-base leading-7 text-white/70">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Tarladan sofraya yolculuğa ana sayfadan devam edebilirsiniz.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="accent" size="lg" magnetic>
            <Link href="/">Ana Sayfaya Dön</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/urunler">Ürünleri İncele</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
