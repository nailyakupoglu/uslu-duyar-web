"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function ImageWithSkeleton({ className, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={cn("relative block overflow-hidden bg-primary-50", className)}>
      {!loaded ? <span className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary-50 via-white to-primary-50" /> : null}
      <Image
        alt={alt}
        className={cn("h-full w-full object-cover transition duration-700", loaded ? "opacity-100" : "opacity-0")}
        onLoadingComplete={() => setLoaded(true)}
        {...props}
      />
    </span>
  );
}
