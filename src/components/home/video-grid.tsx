"use client";

// VideoGrid — manifest'teki saha videolarını poster + lightbox (Dialog) ile gösterir.
// Prop: yok (getVideos() ile manifest'ten okur). Boşsa hiçbir şey render etmez.
// Kullanım: ana sayfa + üretim sayfalarında "sahadan kareler" bölümü.
import Image from "next/image";
import { Play } from "lucide-react";
import { useLocale } from "next-intl";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { SectionHeading } from "@/components/shared/section-heading";
import { getVideos, mediaText } from "@/lib/manifest-reader";

const videos = getVideos(6);

export function VideoGrid() {
  const locale = useLocale();
  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-ink text-white">
      <div className="container">
        <SectionHeading
          eyebrow={locale === "en" ? "From the Field" : "Sahadan"}
          title={locale === "en" ? "Scenes from the Field" : "Tarladan kareler"}
          description={locale === "en" ? "Short clips from our citrus and watermelon fields, from harvest to shipment." : "Hasattan sevkiyata; narenciye ve karpuz sahalarımızdan kısa görüntüler."}
          align="center"
          className="[&_h2]:text-white [&_p]:text-white/70"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Dialog key={video.id}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="group relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-white/5"
                  aria-label={locale === "en" ? `Play video: ${mediaText(video, locale)}` : `${mediaText(video, locale)} videosunu oynat`}
                >
                  <Image
                    src={video.thumb}
                    alt={mediaText(video, locale, "alt")}
                    fill
                    quality={82}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-lg transition group-hover:scale-110">
                    <Play className="h-6 w-6 translate-x-0.5" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-medium text-white/85">
                    {mediaText(video, locale)}
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl border-none bg-ink p-2">
                <DialogTitle className="sr-only">{mediaText(video, locale)}</DialogTitle>
                <video
                  src={video.src}
                  poster={video.thumb}
                  controls
                  autoPlay
                  playsInline
                  className="w-full rounded-md"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
