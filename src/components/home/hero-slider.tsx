"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { getHeroSlidesL } from "@/lib/content";
import { getHeroes, getVideos, type MediaItem } from "@/lib/manifest-reader";

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
  const reduceMotion = useReducedMotion();
  // Hero metinleri locale'e göre çözülür, görseller manifest'teki gerçek hero fotoğraflarından (yetmezse SVG fallback).
  const photos = getHeroes(5);
  const videos = getVideos(2);
  const slides = getHeroSlidesL(locale).map((slide, index) => ({
    ...slide,
    media: pickHeroMedia(index, photos, videos, slide.image)
  }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6500, stopOnInteraction: false })]);
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
    <section className="relative min-h-screen overflow-hidden bg-cream text-ink">
      <div ref={emblaRef} className="h-screen overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div className="relative h-full min-w-0 flex-[0_0_100%]" key={slide.title}>
              <motion.div
                className="absolute inset-0"
                animate={!reduceMotion && selected === index ? { scale: [1, 1.08] } : { scale: 1 }}
                transition={{ duration: 12, ease: "linear" }}
              >
                {slide.media.type === "video" && !reduceMotion ? (
                  <video
                    className="h-full w-full object-cover"
                    src={slide.media.src}
                    poster={slide.media.thumb}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload={index === 0 ? "auto" : "metadata"}
                    aria-label={slide.title}
                  />
                ) : (
                  <Image
                    src={slide.media.type === "video" ? slide.media.thumb : slide.media.src}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    quality={90}
                    sizes="100vw"
                    className="object-cover"
                  />
                )}
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,160,23,0.18),transparent_30%)]" />
              <FloatingParticles />
              <div className="container relative z-10 flex h-full items-center pt-20">
                <div className="max-w-2xl rounded-2xl border border-white/50 bg-cream/85 p-8 shadow-[0_30px_70px_rgba(14,14,14,0.18)] backdrop-blur-md md:p-10">
                  <motion.p
                    custom={0}
                    variants={titleVariant}
                    initial="hidden"
                    animate={selected === index ? "visible" : "hidden"}
                    className="text-sm font-bold uppercase tracking-[0.24em] text-accent-700"
                  >
                    {slide.eyebrow}
                  </motion.p>
                  <h1 className="mt-5 font-display text-4xl font-semibold leading-none text-balance text-ink md:text-6xl lg:text-7xl">
                    {slide.title.split(" ").map((word, wordIndex) => (
                      <motion.span
                        key={`${word}-${wordIndex}`}
                        custom={wordIndex + 1}
                        variants={titleVariant}
                        initial="hidden"
                        animate={selected === index ? "visible" : "hidden"}
                        className="mr-3 inline-block"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>
                  <motion.p
                    custom={8}
                    variants={titleVariant}
                    initial="hidden"
                    animate={selected === index ? "visible" : "hidden"}
                    className="mt-7 max-w-xl text-lg leading-8 text-ink/70 md:text-xl"
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    custom={10}
                    variants={titleVariant}
                    initial="hidden"
                    animate={selected === index ? "visible" : "hidden"}
                    className="mt-9 flex flex-wrap gap-3"
                  >
                    <Button asChild size="xl" variant="accent" magnetic>
                      <Link href={slide.href}>
                        {slide.cta}
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="xl" variant="outline">
                      <Link href="/iletisim">{locale === "en" ? "Request a Quote" : "Teklif İste"}</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center text-white/72">
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
            className={`h-2 rounded-full transition-all ${selected === index ? "w-10 bg-accent-500" : "w-2 bg-white/50"}`}
            aria-label={locale === "en" ? `Go to slide ${index + 1}` : `${index + 1}. slayta git`}
          />
        ))}
      </div>
    </section>
  );
}

function pickHeroMedia(
  index: number,
  photos: MediaItem[],
  videos: MediaItem[],
  fallback: string
): Pick<MediaItem, "type" | "src" | "thumb"> {
  const video = index === 2 ? videos[0] : index === 4 ? videos[1] : undefined;
  if (video) {
    return { type: "video", src: video.src, thumb: video.thumb };
  }
  const photo = photos[index] ?? photos[0];
  return { type: "photo", src: photo?.src ?? fallback, thumb: photo?.thumb ?? fallback };
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {["left-[10%] top-[22%]", "left-[82%] top-[26%]", "left-[65%] top-[72%]", "left-[22%] top-[78%]"].map((position, index) => (
        <span
          key={position}
          className={`absolute ${position} h-2 w-10 rounded-full bg-accent-500/35 animate-float-seed`}
          style={{ animationDelay: `${index * 0.7}s` }}
        />
      ))}
    </div>
  );
}
