/**
 * ProductGallery — ana görsel + küçük resim (thumbnail) seçici, animasyonlu.
 * Prop'lar: { images: string[], alt: string }.
 * Kullanım: ürün detay sayfasında galeri; tek görselde sadece ana görseli gösterir.
 */
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const unique = Array.from(new Set(images));
  const [active, setActive] = useState(0);
  const current = unique[active] ?? unique[0];

  return (
    <div className="grid gap-4">
      <motion.div
        key={current}
        initial={{ opacity: 0.4, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-primary-900/10 bg-white shadow-[0_30px_60px_-30px_rgba(50,50,93,0.35)]"
      >
        <Image
          src={current}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </motion.div>

      {unique.length > 1 ? (
        <div className="flex gap-3" role="group" aria-label="Ürün görselleri">
          {unique.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${alt} görsel ${index + 1}`}
              aria-current={index === active}
              className={cn(
                "relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition",
                index === active ? "border-primary-700" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={image} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
