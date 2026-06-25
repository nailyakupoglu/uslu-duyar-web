/**
 * Global hata sınırı — render sırasında oluşan istemci hatalarını yakalar.
 * Prop'lar: { error: Error & { digest?: string }, reset: () => void }.
 * Kullanım: Next.js bir segment hata fırlattığında otomatik gösterir; "reset" tekrar dener.
 */
"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Üretimde hata izleme servisine gönderilebilir (Sentry vb.).
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-cream px-6">
      <div className="mx-auto max-w-lg text-center">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.3em] text-accent2-500">Hata</p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Beklenmeyen bir sorun oluştu
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Sayfa yüklenirken bir aksaklık yaşandı. Lütfen tekrar deneyin; sorun sürerse bizimle iletişime geçin.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" size="lg" onClick={reset} magnetic>
            Tekrar Dene
          </Button>
        </div>
      </div>
    </section>
  );
}
