"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { CertBadge } from "@/components/shared/cert-badge";
import { getCertificationsL } from "@/lib/content";

export function CertificationsStrip() {
  const locale = useLocale();
  const certifications = getCertificationsL(locale);
  const items = [...certifications, ...certifications];

  return (
    <section className="overflow-hidden bg-cream py-12">
      <div className="container mb-7 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-700">Kalite belgeleri</p>
          <h2 className="mt-2 font-display text-3xl font-semibold">Sertifika hazırlığı</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-ink/62">Logo ve PDF dosyaları gelene kadar rozetler placeholder olarak gösterilir.</p>
      </div>
      <motion.div className="flex w-max gap-4 px-4" whileHover={{ animationPlayState: "paused" }}>
        <div className="flex animate-marquee gap-4">
          {items.map((name, index) => (
            <CertBadge key={`${name}-${index}`} name={name} className="w-64 shrink-0" />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
