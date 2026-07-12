"use client";

// Header — sabit premium üst bar, kontrollü masaüstü popover ve mobil accordion navigasyonu.
// Prop'lar: yok; locale, aktif rota ve açık menü durumunu kendi içinde yönetir.
// Kullanım: locale layout içinde tek örnek; hover, focus, click-outside ve Escape destekler.
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { getCategoriesL, getCorporateLinksL, getProductionLinksL } from "@/lib/content";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [mega, setMega] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useSafeReducedMotion();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0.86, 0.98]);
  const backgroundColor = useTransform(bgOpacity, (value) => `rgba(8, 17, 11, ${value})`);

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 12));

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
    closeTimer.current = setTimeout(() => setMega(null), 110);
  }, [cancelClose]);

  useEffect(() => {
    setMega(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    if (!mega && !mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMega(null);
        setMobileOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMega(null);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mega, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <motion.header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-20 overflow-visible border-b text-white backdrop-blur-xl transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-white/12 shadow-[0_18px_50px_rgba(0,0,0,0.28)]" : "border-white/8"
      )}
      style={{ backgroundColor: reduceMotion ? "rgba(8, 17, 11, 0.98)" : backgroundColor }}
      onMouseLeave={scheduleClose}
    >
      <div className="container relative z-20 flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          className="group inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
          aria-label={locale === "en" ? "Uslu Duyar home" : "Uslu Duyar ana sayfa"}
        >
          <Logo variant="light" className="w-[158px] sm:w-[188px]" priority />
        </Link>

        <nav className="hidden h-full items-stretch gap-0.5 lg:flex" aria-label={locale === "en" ? "Main navigation" : "Ana navigasyon"}>
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const expanded = mega === item.title;
            const panelId = `mega-menu-${item.href.replaceAll("/", "-").replace(/^-/, "")}`;
            const menuCopy =
              item.href === "/corporate"
                ? locale === "en"
                  ? "Company principles, quality approach and long-term direction."
                  : "Şirket yapısı, kalite yaklaşımı ve uzun vadeli yönümüz."
                : item.href === "/uretim"
                  ? locale === "en"
                    ? "Follow the operation from harvest calendar to logistics."
                    : "Sezon takviminden lojistiğe operasyonun tamamını inceleyin."
                  : locale === "en"
                    ? "Explore fresh product groups and export specifications."
                    : "Taze ürün gruplarını ve ihracat özelliklerini keşfedin.";

            return (
              <div
                key={item.title}
                className="relative flex h-full items-center"
                onMouseEnter={() => openMega(item.children ? item.title : null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleClose();
                }}
              >
                <Link
                  href={item.href}
                  onFocus={() => item.children && openMega(item.title)}
                  className={cn(
                    "relative inline-flex min-h-11 items-center px-3 py-2 text-sm font-semibold text-white/68 transition-colors duration-200 hover:text-white",
                    active && "text-white"
                  )}
                >
                  {item.title}
                  <span
                    className={cn(
                      "absolute inset-x-3 bottom-0 h-0.5 origin-left scale-x-0 bg-accent-500 transition-transform duration-300",
                      (active || expanded) && "scale-x-100"
                    )}
                  />
                </Link>

                {item.children ? (
                  <button
                    type="button"
                    onClick={() => (expanded ? setMega(null) : openMega(item.title))}
                    aria-haspopup="menu"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    aria-label={`${item.title} ${locale === "en" ? "menu" : "menüsü"}`}
                    className="-ml-1 inline-flex h-11 w-8 items-center justify-center rounded-md text-white/48 transition-colors duration-200 hover:bg-white/8 hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                  >
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180 text-accent-500")} />
                  </button>
                ) : null}

                <AnimatePresence>
                  {expanded && item.children ? (
                    <div
                      className="absolute left-1/2 top-full z-30 w-[min(680px,calc(100vw-3rem))] -translate-x-1/2 pt-3"
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      <motion.div
                        id={panelId}
                        role="menu"
                        aria-label={item.title}
                        className="overflow-hidden rounded-xl border border-white/12 bg-[#09150d]/[0.99] shadow-[0_34px_90px_rgba(0,0,0,0.48)] ring-1 ring-black/20"
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
                        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.99 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="grid grid-cols-[0.72fr_1.28fr]">
                          <div className="border-r border-white/10 bg-white/[0.025] p-6">
                            <p className="spec-mono text-[0.66rem] text-accent-500">{item.title}</p>
                            <p className="mt-3 text-sm leading-6 text-white/64">{menuCopy}</p>
                            <Link
                              href={item.href}
                              role="menuitem"
                              onClick={() => setMega(null)}
                              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-accent-500"
                            >
                              {locale === "en" ? "View overview" : "Genel bakışı aç"}
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </div>
                          <div className="grid grid-cols-2 gap-px bg-white/10 p-px">
                            {item.children.map((child) => (
                              <Link
                                key={child.title}
                                href={child.href}
                                role="menuitem"
                                onClick={() => setMega(null)}
                                className="group/menu flex min-h-[78px] items-center justify-between gap-4 bg-[#0b1a11] px-5 py-4 text-sm font-semibold text-white/82 transition-[background-color,color] duration-200 hover:bg-[#10271a] hover:text-white focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500"
                              >
                                <span>{child.title}</span>
                                <ArrowUpRight className="h-4 w-4 shrink-0 text-accent-500 opacity-55 transition-[transform,opacity] duration-200 group-hover/menu:-translate-y-0.5 group-hover/menu:translate-x-0.5 group-hover/menu:opacity-100" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ) : null}
                </AnimatePresence>
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/12 bg-white/8 text-white transition-colors hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 lg:hidden"
          onClick={() => {
            setMobileOpen((value) => !value);
            setMega(null);
          }}
          aria-label={mobileOpen ? (locale === "en" ? "Close menu" : "Menüyü kapat") : locale === "en" ? "Open menu" : "Menüyü aç"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-navigation"
            className="absolute inset-x-0 top-full z-10 h-[calc(100svh-80px)] overflow-y-auto border-t border-white/10 bg-[radial-gradient(circle_at_88%_4%,rgba(237,146,31,.12),transparent_24%),linear-gradient(145deg,#09180f,#040b07)] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.5)] lg:hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 flex items-center gap-3 spec-mono text-[0.68rem] text-accent-500">
              <span className="h-px w-10 bg-accent-500" /> Mersin · Çukurova
            </div>
            <nav aria-label={locale === "en" ? "Mobile navigation" : "Mobil navigasyon"}>
              {navItems.map((item, index) => {
                const sectionOpen = mobileSection === item.title;
                const mobilePanelId = `mobile-section-${index}`;
                return (
                  <div key={item.title} className="border-b border-white/10">
                    <div className="flex min-h-[70px] items-center gap-2">
                      <Link
                        href={item.href}
                        className="flex min-h-11 flex-1 items-center font-display text-[2rem] font-medium leading-none text-white/90 transition-colors hover:text-accent-500"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.title}
                      </Link>
                      {item.children ? (
                        <button
                          type="button"
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-white/64 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                          onClick={() => setMobileSection(sectionOpen ? null : item.title)}
                          aria-expanded={sectionOpen}
                          aria-controls={mobilePanelId}
                          aria-label={`${item.title} ${locale === "en" ? "subpages" : "alt sayfaları"}`}
                        >
                          <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", sectionOpen && "rotate-180 text-accent-500")} />
                        </button>
                      ) : (
                        <span className="font-mono text-[0.6rem] tracking-[0.18em] text-white/30">0{index + 1}</span>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {sectionOpen && item.children ? (
                        <motion.div
                          id={mobilePanelId}
                          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                          transition={{ duration: 0.18 }}
                          className="grid gap-1 pb-5"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex min-h-11 items-center justify-between border-b border-white/[0.06] py-2 pl-3 text-sm font-medium text-white/66 transition-colors last:border-0 hover:text-white"
                            >
                              {child.title}
                              <ArrowUpRight className="h-4 w-4 text-accent-500/70" />
                            </Link>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="mt-6 grid grid-cols-[auto_1fr] items-center gap-3">
              <LanguageSwitcher tone="dark" />
              <Button asChild variant="accent" size="lg" className="w-full">
                <Link href="/iletisim" onClick={() => setMobileOpen(false)}>
                  <Phone className="h-4 w-4" />
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
