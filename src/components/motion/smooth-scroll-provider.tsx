"use client";

// SmoothScrollProvider — Lenis ile site geneli yumuşak kaydırma.
// Prop: { children? } (opsiyonel; mount-only da kullanılabilir). prefers-reduced-motion'da devre dışı.
// Kullanım: layout.tsx içinde bir kez mount edilir.
import { useEffect } from "react";

export function SmoothScrollProvider({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      return;
    }
    let lenis: import("lenis").default | null = null;
    let raf = 0;
    let cancelled = false;

    const enable = async () => {
      if (lenis || cancelled) return;
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("wheel", enable, { once: true, passive: true });
    window.addEventListener("touchstart", enable, { once: true, passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("wheel", enable);
      window.removeEventListener("touchstart", enable);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
