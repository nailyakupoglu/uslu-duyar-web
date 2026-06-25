"use client";

import { Globe2 } from "lucide-react";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// Aktif yolda kalarak locale değiştiren pill butonu.
// Prop'lar: { className } — pill konteynerine ek sınıflar.
// Kullanım: <LanguageSwitcher /> — header (desktop + mobil sheet) içinde.
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: "tr" | "en") => router.replace(pathname, { locale: next });

  return (
    <div
      className={cn(
        "inline-flex h-10 items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 text-xs font-semibold text-current backdrop-blur",
        className
      )}
    >
      <Globe2 className="mr-1 h-4 w-4" aria-hidden />
      <button
        type="button"
        onClick={() => switchTo("tr")}
        aria-label="Türkçe"
        aria-current={locale === "tr" ? "true" : undefined}
        className={cn(
          "rounded-full px-2 py-1 transition hover:opacity-100",
          locale === "tr" ? "font-bold opacity-100" : "opacity-50"
        )}
      >
        TR
      </button>
      <span className="text-current/35" aria-hidden>
        /
      </span>
      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-label="English"
        aria-current={locale === "en" ? "true" : undefined}
        className={cn(
          "rounded-full px-2 py-1 transition hover:opacity-100",
          locale === "en" ? "font-bold opacity-100" : "opacity-50"
        )}
      >
        EN
      </button>
    </div>
  );
}
