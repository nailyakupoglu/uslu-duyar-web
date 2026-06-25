"use client";

// Header — açık (krem/beyaz) yapışkan üst bar + erişilebilir mega menü.
// Prop'lar: yok (locale + pathname kendi içinde çözülür).
// Kullanım: layout.tsx içinde tek örnek; mega menü hover köprüsü + tıklama + Esc + ARIA ile çalışır.
import { Link, usePathname } from "@/i18n/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { getCategoriesL, getCorporateLinksL, getProductionLinksL } from "@/lib/content";
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
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 120], [88, 70]);
  const bgOpacity = useTransform(scrollY, [0, 120], [0.86, 0.98]);
  const backgroundColor = useTransform(bgOpacity, (value) => `rgba(250, 247, 242, ${value})`);
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
        "fixed inset-x-0 top-0 z-50 border-b text-ink backdrop-blur-xl transition-shadow",
        scrolled ? "border-line-soft shadow-[0_10px_30px_rgba(14,14,14,0.07)]" : "border-transparent"
      )}
      style={{
        height: reduceMotion ? 76 : height,
        backgroundColor: reduceMotion ? "rgba(250, 247, 242, 0.98)" : backgroundColor
      }}
      onMouseLeave={scheduleClose}
    >
      <div className="container flex h-full items-center justify-between gap-4">
        <Link href="/" className="group inline-flex items-center" aria-label={locale === "en" ? "Uslu Duyar home" : "Uslu Duyar ana sayfa"}>
          <Logo variant="dark" />
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
                    "rounded-full px-3.5 py-2 text-sm font-semibold text-ink/70 transition hover:bg-primary-50 hover:text-primary-700",
                    active && "bg-primary-50 text-primary-700"
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
                    className="-ml-1 rounded-full p-1 text-ink/45 transition hover:text-primary-700"
                  >
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180 text-primary-700")} />
                  </button>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button asChild variant="accent" size="sm" magnetic>
            <Link href="/iletisim">
              <Phone className="h-4 w-4" />
              {locale === "en" ? "Get a Quote" : "Teklif Al"}
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-700 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? (locale === "en" ? "Close menu" : "Menüyü kapat") : locale === "en" ? "Open menu" : "Menüyü aç"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mega && activeChildren ? (
          <motion.div
            className="hidden border-t border-line-soft bg-white text-ink shadow-[0_30px_60px_rgba(14,14,14,0.12)] lg:block"
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
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-700">{mega}</p>
                <p className="mt-3 max-w-md text-sm leading-7 text-ink/65">
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
                    className="rounded-lg border border-line-soft bg-cream p-4 transition hover:-translate-y-1 hover:border-primary-500/30 hover:bg-primary-50"
                  >
                    <span className="font-semibold text-ink">{child.title}</span>
                    {"description" in child && typeof child.description === "string" ? (
                      <span className="mt-2 block text-xs leading-5 text-ink/55">{child.description}</span>
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
            className="border-t border-line-soft bg-white px-4 pb-6 pt-3 text-ink shadow-[0_30px_60px_rgba(14,14,14,0.12)] lg:hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-ink hover:bg-primary-50 hover:text-primary-700"
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <LanguageSwitcher />
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
