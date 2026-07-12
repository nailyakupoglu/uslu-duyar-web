"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
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
    visual: visuals[index] ?? visuals[0],
    videoSrc: index === 3 ? "/media/videos/optimized/ad36f331-0aad-48b4-a795-eeee5f7a4e20.MP4" : undefined
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
    <section className="route-rule relative min-h-[100svh] overflow-hidden bg-ink text-white">
      <div ref={emblaRef} className="h-[100svh] min-h-[680px] overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide, index) => {
            const active = selected === index;
            const HeadingTag = index === 0 ? "h1" : "h2";
            return (
            <div className="relative h-full min-w-0 flex-[0_0_100%]" key={slide.title} aria-hidden={!active} inert={!active}>
              <HeroMedia visual={slide.visual} videoSrc={slide.videoSrc} active={active} priority={index === 0} reduceMotion={Boolean(reduceMotion)} />
              <div className="absolute inset-0 z-[1] bg-[linear-gradient(100deg,rgba(4,13,8,.88)_0%,rgba(4,13,8,.54)_47%,rgba(4,13,8,.05)_100%)]" />
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink/64 via-transparent to-ink/30" />
              <div className="harvest-grid absolute inset-0 z-[2] opacity-20 [mask-image:linear-gradient(90deg,black,transparent_72%)]" />
              <div className="container relative z-10 flex h-full items-end pb-10 pt-28 md:items-center md:pb-20 md:pt-32">
                <div className="relative max-w-5xl border-l border-white/18 pl-5 md:pl-8">
                  <span className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-accent-500 shadow-[0_0_0_8px_rgba(237,146,31,.14)]" aria-hidden="true" />
                  <motion.p
                    custom={0}
                    variants={titleVariant}
                    initial={index === 0 ? false : "hidden"}
                    animate={active ? "visible" : "hidden"}
                    className="text-xs font-bold uppercase tracking-[0.28em] text-harvest-500 md:text-sm"
                  >
                    {slide.eyebrow}
                  </motion.p>
                  <HeadingTag
                    aria-label={slide.title}
                    className="display-tight mt-5 max-w-5xl font-display text-[clamp(2.9rem,14vw,4.25rem)] font-medium leading-[0.86] text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.38)] md:text-[clamp(4.8rem,8.1vw,8.2rem)] md:leading-[0.84]"
                  >
                    {slide.title.split(" ").map((word, wordIndex, words) => (
                      <motion.span
                        key={`${word}-${wordIndex}`}
                        custom={wordIndex + 1}
                        variants={titleVariant}
                        initial={index === 0 ? false : "hidden"}
                        animate={active ? "visible" : "hidden"}
                        className="mr-[0.2em] inline-block"
                        aria-hidden="true"
                      >
                        {word}
                        {wordIndex < words.length - 1 ? " " : ""}
                      </motion.span>
                    ))}
                  </HeadingTag>
                  <motion.p
                    custom={8}
                    variants={titleVariant}
                    initial={index === 0 ? false : "hidden"}
                    animate={active ? "visible" : "hidden"}
                    className="mt-5 max-w-[22rem] text-sm leading-6 text-white/82 sm:max-w-2xl md:mt-8 md:text-xl md:leading-9"
                  >
                    {slide.description}
                  </motion.p>
                  <ProcessRail locale={locale} active={active} reduceMotion={Boolean(reduceMotion)} />
                  <motion.div
                    custom={10}
                    variants={titleVariant}
                    initial={index === 0 ? false : "hidden"}
                    animate={active ? "visible" : "hidden"}
                    className="mt-6 flex flex-row gap-2.5 sm:flex-wrap md:mt-9 md:gap-3"
                  >
                    <Button asChild size="xl" variant="accent" className="min-w-0 flex-1 justify-center px-4 sm:flex-none sm:px-8">
                      <Link href={slide.href}>
                        {slide.cta}
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="xl" variant="export" className="min-w-0 flex-1 justify-center px-4 sm:flex-none sm:px-8">
                      <Link href="/iletisim">{locale === "en" ? "Request a Quote" : "Teklif İste"}</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 text-center text-white/72 md:block">
        <motion.div animate={reduceMotion ? undefined : { y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="inline-flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
          {locale === "en" ? "Scroll Down" : "Aşağı Kaydır"}
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 hidden gap-2 md:flex">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="mr-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink/20 text-white backdrop-blur-md transition hover:border-accent-500 hover:bg-accent-500 hover:text-ink"
          aria-label={locale === "en" ? "Previous slide" : "Önceki slayt"}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className="relative h-11 w-14 rounded-full transition"
            aria-label={locale === "en" ? `Go to slide ${index + 1}` : `${index + 1}. slayta git`}
          >
            {selected === index ? (
              <motion.span
                key={`${slide.title}-${selected}`}
                className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-harvest-500"
                initial={{ width: reduceMotion ? "100%" : "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduceMotion ? 0 : 6.5, ease: "linear" }}
              />
            ) : <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/35" />}
          </button>
        ))}
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="ml-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink/20 text-white backdrop-blur-md transition hover:border-accent-500 hover:bg-accent-500 hover:text-ink"
          aria-label={locale === "en" ? "Next slide" : "Sonraki slayt"}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function HeroMedia({
  visual,
  videoSrc,
  active,
  priority,
  reduceMotion
}: {
  visual: ResolvedVisualAsset;
  videoSrc?: string;
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
      {videoSrc && !reduceMotion && active ? (
        <video
          src={videoSrc}
          poster={visual.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="hidden h-full w-full object-cover md:block"
          aria-label={visual.alt}
        />
      ) : (
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          priority={priority}
          quality={92}
          sizes="100vw"
          className="hidden object-cover md:block"
          style={{ objectPosition: visual.position }}
        />
      )}
      <Image
        src={visual.mobileSrc ?? visual.src}
        alt={visual.alt}
        fill
        priority={priority}
        quality={90}
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
