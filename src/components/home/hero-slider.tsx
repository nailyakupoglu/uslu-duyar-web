"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { getHeroSlidesL } from "@/lib/content";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { getHeroVisuals, type ResolvedVisualAsset } from "@/lib/visual-assets";

const titleVariant = {
  hidden: { opacity: 0, y: 26 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }
  })
};

export function HeroSlider() {
  const locale = useLocale();
  const reduceMotion = useSafeReducedMotion();
  const visuals = getHeroVisuals(locale);
  const slides = getHeroSlidesL(locale).map((slide, index) => ({
    ...slide,
    visual: visuals[index] ?? visuals[0]
  }));
  const plugins = useMemo(
    () => (reduceMotion ? [] : [Autoplay({ delay: 6500, stopOnInteraction: false })]),
    [reduceMotion]
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setSelected(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative min-h-[calc(100svh-88px)] overflow-hidden bg-ink text-white md:min-h-[100svh]">
      <div ref={emblaRef} className="h-[calc(100svh-88px)] min-h-[620px] overflow-hidden md:h-[100svh]">
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div className="relative h-full min-w-0 flex-[0_0_100%]" key={slide.title}>
              <HeroImage visual={slide.visual} active={selected === index} priority={index === 0} reduceMotion={Boolean(reduceMotion)} />
              <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink/78 via-ink/38 to-ink/8" />
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink/48 via-transparent to-ink/34 md:from-ink/54 md:to-ink/10" />
              <div className="container relative z-10 flex h-full items-start pb-16 pt-14 sm:pt-16 md:items-center md:pb-16 md:pt-28">
                <div className="max-w-5xl">
                  <motion.p
                    custom={0}
                    variants={titleVariant}
                    initial="hidden"
                    animate="visible"
                    className="text-xs font-bold uppercase tracking-[0.28em] text-harvest-500 md:text-sm"
                  >
                    {slide.eyebrow}
                  </motion.p>
                  <h1
                    aria-label={slide.title}
                    className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[0.95] text-balance text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.38)] sm:text-5xl md:text-7xl lg:text-8xl"
                  >
                    {slide.title.split(" ").map((word, wordIndex, words) => (
                      <motion.span
                        key={`${word}-${wordIndex}`}
                        custom={wordIndex + 1}
                        variants={titleVariant}
                        initial="hidden"
                        animate="visible"
                        className="mr-3 inline-block"
                        aria-hidden="true"
                      >
                        {word}
                        {wordIndex < words.length - 1 ? " " : ""}
                      </motion.span>
                    ))}
                  </h1>
                  <motion.p
                    custom={8}
                    variants={titleVariant}
                    initial="hidden"
                    animate="visible"
                    className="mt-5 max-w-[20rem] text-base leading-7 text-white/80 sm:max-w-2xl md:mt-7 md:text-xl md:leading-8"
                  >
                    {slide.description}
                  </motion.p>
                  <ProcessRail locale={locale} active reduceMotion={Boolean(reduceMotion)} />
                  <motion.div
                    custom={10}
                    variants={titleVariant}
                    initial="hidden"
                    animate="visible"
                    className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-9"
                  >
                    <Button asChild size="xl" variant="accent" className="w-full justify-center sm:w-auto" magnetic>
                      <Link href={slide.href}>
                        {slide.cta}
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="xl" variant="export" className="w-full justify-center sm:w-auto">
                      <Link href="/iletisim">{locale === "en" ? "Request a Quote" : "Teklif İste"}</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 text-center text-white/72 md:block">
        <motion.div animate={reduceMotion ? undefined : { y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="inline-flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
          {locale === "en" ? "Scroll Down" : "Aşağı Kaydır"}
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 hidden gap-2 md:flex">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className="relative h-1.5 w-14 overflow-hidden rounded-full bg-white/35 transition"
            aria-label={locale === "en" ? `Go to slide ${index + 1}` : `${index + 1}. slayta git`}
          >
            {selected === index ? (
              <motion.span
                key={`${slide.title}-${selected}`}
                className="absolute inset-y-0 left-0 rounded-full bg-harvest-500"
                initial={{ width: reduceMotion ? "100%" : "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduceMotion ? 0 : 6.5, ease: "linear" }}
              />
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}

function HeroImage({
  visual,
  active,
  priority,
  reduceMotion
}: {
  visual: ResolvedVisualAsset;
  active: boolean;
  priority: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      animate={!reduceMotion && active ? { scale: [1, 1.055] } : { scale: 1 }}
      transition={{ duration: 12, ease: "linear" }}
    >
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        priority={priority}
        quality={92}
        unoptimized
        sizes="100vw"
        className="hidden object-cover md:block"
        style={{ objectPosition: visual.position }}
      />
      <Image
        src={visual.mobileSrc ?? visual.src}
        alt={visual.alt}
        fill
        priority={priority}
        quality={90}
        unoptimized
        sizes="100vw"
        className="object-cover md:hidden"
        style={{ objectPosition: visual.mobilePosition }}
      />
    </motion.div>
  );
}

function ProcessRail({ locale, active, reduceMotion }: { locale: string; active: boolean; reduceMotion: boolean }) {
  const steps =
    locale === "en"
      ? ["Harvest", "Grading", "Cold chain", "Port", "RFQ"]
      : ["Hasat", "Boylama", "Soğuk zincir", "Liman", "RFQ"];

  return (
    <motion.div
      className="mt-8 hidden max-w-3xl items-center gap-3 md:flex"
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.35 }}
    >
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-3">
          <span className="spec-mono text-[0.66rem] text-white/68">{step}</span>
          {index < steps.length - 1 ? (
            <motion.span
              className="block h-px w-10 bg-harvest-500/72"
              initial={{ scaleX: reduceMotion ? 1 : 0 }}
              animate={{ scaleX: active ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, delay: index * 0.08 + 0.5 }}
              style={{ transformOrigin: "left" }}
            />
          ) : null}
        </div>
      ))}
    </motion.div>
  );
}
