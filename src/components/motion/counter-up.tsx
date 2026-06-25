"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { formatNumber } from "@/lib/utils";

type CounterUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

export function CounterUp({ value, suffix = "", duration = 1600 }: CounterUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);
  const reduceMotion = useSafeReducedMotion();

  useEffect(() => {
    if (!inView) {
      return;
    }
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const frames = Math.max(1, Math.round(duration / 16));

    const tick = () => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / frames, 3);
      setDisplay(Math.round(value * Math.min(progress, 1)));
      if (frame < frames) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [duration, inView, reduceMotion, value]);

  return (
    <motion.span
      ref={ref}
      initial={reduceMotion ? false : { rotateX: 20 }}
      animate={!reduceMotion && inView ? { rotateX: 0 } : undefined}
    >
      {formatNumber(display)}
      {suffix}
    </motion.span>
  );
}
