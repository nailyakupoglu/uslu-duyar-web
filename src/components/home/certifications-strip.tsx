"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { CertBadge } from "@/components/shared/cert-badge";
import { getCertificationsL } from "@/lib/content";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

export function CertificationsStrip() {
  const locale = useLocale();
  const reduceMotion = useSafeReducedMotion();
  const certifications = getCertificationsL(locale);
  const items = [...certifications, ...certifications];

  return (
    <section className="overflow-hidden bg-cream py-12">
      <div className="container mb-7 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-700">{locale === "en" ? "Quality certificates" : "Kalite belgeleri"}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">{locale === "en" ? "Documents clearly marked by status" : "Belgeler durumuyla açıkça işaretlenir"}</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-ink/62">{locale === "en" ? "No certificate number is invented. PDF, validity date and document number are published only after operator confirmation." : "Hiçbir sertifika numarası uydurulmaz. PDF, geçerlilik tarihi ve belge no yalnızca operatör onayı sonrası yayınlanır."}</p>
      </div>
      <motion.div className="flex w-max gap-4 px-4" whileHover={reduceMotion ? undefined : { animationPlayState: "paused" }}>
        <div className={reduceMotion ? "flex flex-wrap gap-4" : "flex animate-marquee gap-4"}>
          {items.map((name, index) => (
            <CertBadge key={`${name}-${index}`} name={name} locale={locale} className="w-64 shrink-0" />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
