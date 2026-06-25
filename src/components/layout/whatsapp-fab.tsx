"use client";

import { Link } from "@/i18n/navigation";
import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";

import { rfqWhatsappMessage, whatsappHref } from "@/lib/contact-channels";

export function WhatsAppFab() {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const href = whatsappHref(rfqWhatsappMessage(locale, "global floating button"));

  if (!href) {
    return null;
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl"
      aria-label="WhatsApp ile iletişime geç"
    >
      <motion.span className="absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" animate={reduceMotion ? undefined : { scale: [1, 1.35, 1], opacity: [0.35, 0.08, 0.35] }} transition={{ duration: 2.4, repeat: Infinity }} />
      <MessageCircle className="relative h-6 w-6" />
    </Link>
  );
}
