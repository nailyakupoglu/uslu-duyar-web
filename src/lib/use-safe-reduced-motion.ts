"use client";

// Hydration-safe reduced-motion helper — server ve ilk client render'ı aynı tutar.
// Prop yok; Framer'in media query sonucunu yalnızca mount sonrası devreye alır.
// Kullanım: motion bileşenlerinde useReducedMotion yerine bunu çağır.
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function useSafeReducedMotion(): boolean {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? Boolean(reduceMotion) : false;
}
