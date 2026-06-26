"use client";

import { motion, type MotionProps } from "framer-motion";

import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

type RevealOnScrollProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function RevealOnScroll({ children, className, delay = 0, ...props }: RevealOnScrollProps) {
  const reduceMotion = useSafeReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 1, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
