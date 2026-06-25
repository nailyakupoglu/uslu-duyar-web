"use client";

// SmoothScrollProvider — Lenis ile site geneli yumuşak kaydırma.
// Prop: { children? } (opsiyonel; mount-only da kullanılabilir). prefers-reduced-motion'da devre dışı.
// Kullanım: layout.tsx içinde bir kez mount edilir.
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      return;
    }
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
