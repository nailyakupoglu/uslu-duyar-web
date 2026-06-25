"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import { siteConfig } from "@/lib/data";

export function WhatsAppFab() {
  const number = siteConfig.whatsapp.replace(/\D/g, "");

  return (
    <Link
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl"
      aria-label="WhatsApp ile iletişime geç"
    >
      <motion.span className="absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0.08, 0.35] }} transition={{ duration: 2.4, repeat: Infinity }} />
      <MessageCircle className="relative h-6 w-6" />
    </Link>
  );
}
