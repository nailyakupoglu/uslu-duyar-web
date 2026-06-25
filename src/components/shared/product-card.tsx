"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
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
      className={cn("group relative h-full rounded-lg bg-white shadow-[0_18px_45px_rgba(14,14,14,0.08)]", className)}
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
      <Link href={href} className="block overflow-hidden rounded-lg" aria-label={`${product.title} ürününü incele`}>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={productImage(product)}
            alt={product.title}
            fill
            quality={90}
            sizes="(min-width: 1280px) 305px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.045]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-ink/12 to-transparent opacity-80" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-harvest-500">{product.category}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">{product.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/78">{product.shortDescription}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-left">
              <span className="rounded-md border border-white/12 bg-white/10 px-2.5 py-2 backdrop-blur">
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">
                  {isEn ? "MOQ" : "MOQ"}
                </span>
                <span className="mt-1 block truncate font-mono text-xs text-white/88">{product.exportSpecs.moq}</span>
              </span>
              <span className="rounded-md border border-white/12 bg-white/10 px-2.5 py-2 backdrop-blur">
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">
                  {isEn ? "Cold" : "Soğuk"}
                </span>
                <span className="mt-1 block truncate font-mono text-xs text-white/88">{product.exportSpecs.coldChain}</span>
              </span>
            </div>
            <Button asChild variant="accent" size="sm" className="mt-4 opacity-0 transition group-hover:opacity-100">
              <span>
                {isEn ? "View specs" : "Spec incele"} <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
