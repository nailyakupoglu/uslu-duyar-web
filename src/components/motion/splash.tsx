"use client";

// Splash — ilk yüklemede ~1.3s marka açılışı.
// sessionStorage ile tek sefer gösterilir; prefers-reduced-motion'da atlanır.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Logo } from "@/components/shared/logo";

export function Splash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem("ud-splash")) {
      return;
    }
    setShow(true);
    sessionStorage.setItem("ud-splash", "1");
    const timer = setTimeout(() => setShow(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <Logo className="w-[min(480px,82vw)] shadow-[0_24px_70px_rgba(0,0,0,0.38)]" priority />
            <span className="spec-mono text-white/55">Mersin / Cukurova</span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
