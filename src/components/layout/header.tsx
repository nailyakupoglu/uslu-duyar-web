"use client";

// Header — koyu premium yapışkan üst bar + erişilebilir mega menü.
// Prop'lar: yok (locale + pathname kendi içinde çözülür).
// Kullanım: layout.tsx içinde tek örnek; mega menü hover köprüsü + tıklama + Esc + ARIA ile çalışır.
import { Link, usePathname } from "@/i18n/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { getCategoriesL, getCorporateLinksL, getProductionLinksL } from "@/lib/content";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const navItems = [
    { title: locale === "en" ? "Corporate" : "Kurumsal", href: "/corporate", children: getCorporateLinksL(locale) },
    { title: locale === "en" ? "Production" : "Üretim", href: "/uretim", children: getProductionLinksL(locale) },
    { title: locale === "en" ? "Products" : "Ürünler", href: "/urunler", children: getCategoriesL(locale) },
    { title: "Blog", href: "/blog" },
    { title: locale === "en" ? "Contact" : "İletişim", href: "/iletisim" }
  ];
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useSafeReducedMotion();
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 120], [92, 76]);
  const bgOpacity = useTransform(scrollY, [0, 120], [0.78, 0.96]);
  const backgroundColor = useTransform(bgOpacity, (value) => `rgba(10, 17, 12, ${value})`);
  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 12));

  // Mega menü köprüsü: tetikleyici ↔ panel arasında gezerken kapanmayı geciktir.
  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);
  const openMega = useCallback(
    (title: string | null) => {
      cancelClose();
      setMega(title);
    },
    [cancelClose]
  );
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMega(null), 140);
  }, [cancelClose]);

  // Esc ile kapat (klavye erişimi).
  useEffect(() => {
    if (!mega) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMega(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega]);

  const activeChildren = navItems.find((item) => item.title === mega)?.children;

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b text-white backdrop-blur-xl transition-shadow",
        scrolled ? "border-white/12 shadow-[0_18px_50px_rgba(0,0,0,0.28)]" : "border-white/8"
      )}
      style={{
        height: reduceMotion ? 76 : height,
        backgroundColor: reduceMotion ? "rgba(10, 17, 12, 0.96)" : backgroundColor
      }}
      onMouseLeave={scheduleClose}
    >
      <div className="container flex h-full items-center justify-between gap-4">
        <Link href="/" className="group inline-flex items-center" aria-label={locale === "en" ? "Uslu Duyar home" : "Uslu Duyar ana sayfa"}>
          <Logo className="w-[176px] shadow-[0_10px_30px_rgba(0,0,0,0.20)] sm:w-[230px]" priority />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label={locale === "en" ? "Main navigation" : "Ana navigasyon"}>
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const expanded = mega === item.title;
            return (
              <div key={item.title} className="relative flex items-center" onMouseEnter={() => openMega(item.children ? item.title : null)}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white",
                    active && "bg-white/12 text-white"
                  )}
                >
                  {item.title}
                </Link>
                {item.children ? (
                  <button
                    type="button"
                    onClick={() => (expanded ? setMega(null) : openMega(item.title))}
                    aria-haspopup="true"
                    aria-expanded={expanded}
                    aria-label={`${item.title} ${locale === "en" ? "menu" : "menüsü"}`}
                    className="-ml-1 rounded-full p-1 text-white/45 transition hover:text-harvest-500"
                  >
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180 text-harvest-500")} />
                  </button>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher tone="dark" />
          <Button asChild variant="accent" size="sm" magnetic>
            <Link href="/iletisim">
              <Phone className="h-4 w-4" />
              {locale === "en" ? "Get a Quote" : "Teklif Al"}
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/12 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? (locale === "en" ? "Close menu" : "Menüyü kapat") : locale === "en" ? "Open menu" : "Menüyü aç"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mega && activeChildren ? (
          <motion.div
            className="hidden border-t border-white/10 bg-ink/96 text-white shadow-[0_30px_80px_rgba(0,0,0,0.38)] lg:block"
            role="region"
            aria-label={mega}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container grid grid-cols-[0.8fr_1.2fr] gap-8 py-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-harvest-500">{mega}</p>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/62">
                  {locale === "en"
                    ? "A Mersin & Çukurova based operation delivering citrus, melon and watermelon from field to market — with harvest, cold chain and packaging unified in a single traceable supply chain."
                    : "Narenciye, kavun ve karpuzu tarladan markete; hasat, soğuk zincir ve paketlemeyle tek izlenebilir tedarik zincirinde sunan Mersin & Çukurova merkezli yapı."}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {activeChildren.map((child) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    onClick={() => setMega(null)}
                    className="rounded-lg border border-white/10 bg-white/[0.06] p-4 transition hover:-translate-y-1 hover:border-harvest-500/40 hover:bg-white/[0.10]"
                  >
                    <span className="font-semibold text-white">{child.title}</span>
                    {"description" in child && typeof child.description === "string" ? (
                      <span className="mt-2 block text-xs leading-5 text-white/55">{child.description}</span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="border-t border-white/10 bg-ink/97 px-4 pb-6 pt-3 text-white shadow-[0_30px_80px_rgba(0,0,0,0.38)] lg:hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-white/78 hover:bg-white/10 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <LanguageSwitcher tone="dark" />
              <Button asChild variant="accent" size="sm">
                <Link href="/iletisim" onClick={() => setOpen(false)}>
                  {locale === "en" ? "Get a Quote" : "Teklif Al"}
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
