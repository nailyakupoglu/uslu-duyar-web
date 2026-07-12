"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLocale } from "next-intl";

import type { ResolvedProduct } from "@/lib/content";
import { productImage } from "@/lib/products-media";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: ResolvedProduct;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const locale = useLocale();
  const isEn = locale === "en";
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [6, -6]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-6, 6]), { stiffness: 180, damping: 18 });
  const reduceMotion = useSafeReducedMotion();

  const href = `/urunler/${product.category}/${product.slug}`;

  return (
    <motion.article
      className={cn("surface-card group h-full", className)}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(event) => {
        if (reduceMotion) {
          return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      <Link href={href} className="relative z-10 flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-primary-900">
          <Image
            src={productImage(product)}
            alt={product.title}
            fill
            quality={90}
            sizes="(min-width: 1280px) 305px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.055]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/42 via-transparent to-transparent" />
          <p className="absolute left-4 top-4 rounded-full border border-white/20 bg-ink/58 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-white backdrop-blur-md">
            {product.category}
          </p>
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="display-tight font-display text-3xl font-medium leading-none text-ink">{product.title}</h3>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary-900/12 text-primary-700 transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-primary-900 group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 line-clamp-2 text-base leading-7 text-ink/68">{product.shortDescription}</p>
          <div className="mt-auto grid grid-cols-2 gap-3 border-t border-line-soft pt-5 text-left">
            <span>
              <span className="spec-mono block text-xs text-ink/60">MOQ</span>
              <span className="mt-1 block truncate text-xs font-semibold text-ink/74">{product.exportSpecs.moq}</span>
            </span>
            <span>
              <span className="spec-mono block text-xs text-ink/60">{isEn ? "Cold chain" : "Soğuk zincir"}</span>
              <span className="mt-1 block truncate text-xs font-semibold text-ink/74">{product.exportSpecs.coldChain}</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
