"use client";

import { Globe2 } from "lucide-react";

import { i18nConfig } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 text-xs font-semibold text-current backdrop-blur transition hover:bg-white/18",
        className
      )}
      aria-label="Dil seçimi"
      title={i18nConfig.enabled ? "TR / EN" : "İngilizce hazırlığı pasif"}
    >
      <Globe2 className="h-4 w-4" />
      <span>TR</span>
      <span className="text-current/35">/</span>
      <span className={i18nConfig.enabled ? "" : "opacity-45"}>EN</span>
    </button>
  );
}
