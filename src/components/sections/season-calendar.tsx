/**
 * SeasonCalendar — 12 ay x ürün grubu ihracat tedarik takvimi.
 * Prop'lar: { locale, compact? }.
 * Kullanım: ana sayfa preview ve /uretim/sezon-takvimi detay sayfası.
 */
"use client";

import { motion } from "framer-motion";

import { getSeasonWindowsL } from "@/lib/content";
import { monthLabels } from "@/lib/data";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { cn, pick } from "@/lib/utils";

type SeasonCalendarProps = {
  locale: string;
  compact?: boolean;
};

export function SeasonCalendar({ locale, compact = false }: SeasonCalendarProps) {
  const isEn = locale === "en";
  const reduceMotion = useSafeReducedMotion();
  const windows = getSeasonWindowsL(locale);

  return (
    <div className="overflow-hidden rounded-lg border border-line-soft bg-white shadow-[0_20px_60px_rgba(16,38,51,0.08)]">
      <div className="grid grid-cols-[minmax(120px,0.9fr)_repeat(12,minmax(32px,1fr))] border-b border-line-soft bg-port-900 text-white">
        <div className="p-3 spec-mono text-cold-50">{isEn ? "Product" : "Ürün"}</div>
        {monthLabels.map((month) => (
          <div key={pick(month.short, locale)} className="border-l border-white/10 p-3 text-center text-xs font-semibold">
            {pick(month.short, locale)}
          </div>
        ))}
      </div>
      {windows.map((window, rowIndex) => (
        <div
          key={window.category}
          className="grid grid-cols-[minmax(120px,0.9fr)_repeat(12,minmax(32px,1fr))] border-b border-line-soft last:border-b-0"
        >
          <div className="bg-surface-field p-3">
            <p className="font-semibold text-ink">{window.title}</p>
            {!compact ? <p className="mt-1 text-xs leading-5 text-ink/56">{window.note}</p> : null}
          </div>
          {monthLabels.map((month, index) => {
            const monthNumber = index + 1;
            const active = window.months.includes(monthNumber);
            const peak = window.peakMonths.includes(monthNumber);
            return (
              <div key={pick(month.short, locale)} className="flex items-center justify-center border-l border-line-soft bg-white p-2">
                <motion.span
                  className={cn(
                    "h-6 w-full rounded-sm border transition",
                    active ? "border-harvest-700 bg-harvest-500/70" : "border-transparent bg-ink/[0.035]",
                    peak && "border-primary-700 bg-primary-700"
                  )}
                  initial={reduceMotion ? false : { opacity: 1, scaleX: 0.35 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.28, delay: rowIndex * 0.06 + index * 0.012 }}
                  style={{ transformOrigin: "left" }}
                  title={`${window.title} ${pick(month.long, locale)}`}
                />
              </div>
            );
          })}
        </div>
      ))}
      <div className="flex flex-wrap gap-4 bg-cream px-4 py-3 text-xs text-ink/60">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-6 rounded-sm bg-harvest-500/70" /> {isEn ? "Available" : "Tedarik var"}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-6 rounded-sm bg-primary-700" /> {isEn ? "Peak window" : "Pik dönem"}
        </span>
      </div>
    </div>
  );
}
