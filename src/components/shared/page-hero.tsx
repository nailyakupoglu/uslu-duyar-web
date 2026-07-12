"use client";

// PageHero — iç sayfalara fotoğraf, rota çizgisi ve editoryal tipografiyle ortak marka açılışı verir.
// Prop'lar: eyebrow/title/description/align ve opsiyonel gerçek Uslu Duyar arşiv görseli.
// Kullanım: corporate, production, blog ve contact route'larında Breadcrumb'ın hemen ardından.
import Image from "next/image";
import { motion } from "framer-motion";

import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  image?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  align = "left",
  image = "/media/curated/hero/hero-primary-desktop.jpg"
}: PageHeroProps) {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section className="route-rule relative isolate min-h-[500px] overflow-hidden bg-ink text-white md:min-h-[580px]">
      <motion.div
        className="absolute inset-0 -z-30"
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={reduceMotion ? undefined : { scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={image} alt="" fill priority quality={88} sizes="100vw" className="object-cover" aria-hidden="true" />
      </motion.div>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(103deg,rgba(4,13,8,.94)_0%,rgba(6,21,12,.82)_46%,rgba(6,21,12,.34)_100%)]" />
      <div className="harvest-grid absolute inset-0 -z-10 opacity-35 [mask-image:linear-gradient(90deg,black,transparent_78%)]" />

      <motion.div
        className="absolute -right-28 top-1/2 -z-10 h-[430px] w-[430px] -translate-y-1/2 rounded-full border border-accent-500/28 md:right-[7%]"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <span className="absolute inset-[18%] rounded-full border border-white/15" />
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500 shadow-[0_0_0_9px_rgba(237,146,31,.12)]" />
      </motion.div>

      <div className={cn("container flex min-h-[500px] items-end pb-16 pt-20 md:min-h-[580px] md:pb-20", align === "center" && "justify-center text-center")}>
        <motion.div
          className={cn("relative max-w-4xl", align === "center" && "mx-auto")}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, x: -18 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={cn("mb-6 flex items-center gap-4", align === "center" && "justify-center")}
          >
            <span className="h-px w-12 bg-accent-500" />
            <p className="spec-mono text-xs text-accent-500">{eyebrow ?? "Uslu Duyar"}</p>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-white/62 sm:inline">Mersin · 36°48′N</span>
          </motion.div>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="display-tight font-display text-[clamp(3.35rem,8vw,7.4rem)] font-medium leading-[0.84] text-balance"
          >
            {title}
          </motion.h1>
          {description ? (
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={cn("mt-7 max-w-2xl text-base leading-8 text-white/72 md:text-xl md:leading-9", align === "center" && "mx-auto")}
            >
              {description}
            </motion.p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
