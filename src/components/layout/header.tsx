"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import { useState } from "react";

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
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 120], [88, 70]);
  const bgOpacity = useTransform(scrollY, [0, 120], [0.14, 0.92]);
  const backgroundColor = useTransform(bgOpacity, (value) => `rgba(6, 40, 24, ${value})`);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 text-white backdrop-blur-xl"
      style={{
        height,
        backgroundColor
      }}
    >
      <div className="container flex h-full items-center justify-between gap-4">
        <Link href="/" className="group inline-flex items-center" aria-label="Uslu Duyar ana sayfa">
          <Logo variant="light" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana navigasyon">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <div key={item.title} className="relative" onMouseEnter={() => setMega(item.children ? item.title : null)}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold text-white/76 transition hover:bg-white/10 hover:text-white",
                    active && "bg-white/12 text-white"
                  )}
                >
                  {item.title}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button asChild variant="accent" size="sm" magnetic>
            <Link href="/iletisim">
              <Phone className="h-4 w-4" />
              Teklif Al
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mega ? (
          <motion.div
            layoutId="mega-menu"
            className="hidden border-t border-white/10 bg-primary-900/94 text-white shadow-2xl backdrop-blur-xl lg:block"
            onMouseLeave={() => setMega(null)}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container grid grid-cols-[0.8fr_1.2fr] gap-8 py-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-500">{mega}</p>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/65">
                  {locale === "en"
                    ? "A Mersin & Çukurova based operation delivering citrus, melon and watermelon from field to market — with harvest, cold chain and packaging unified in a single traceable supply chain."
                    : "Narenciye, kavun ve karpuzu tarladan markete; hasat, soğuk zincir ve paketlemeyle tek izlenebilir tedarik zincirinde sunan Mersin & Çukurova merkezli yapı."}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {navItems
                  .find((item) => item.title === mega)
                  ?.children?.map((child) => (
                    <Link
                      key={child.title}
                      href={child.href}
                      className="rounded-lg border border-white/10 bg-white/6 p-4 transition hover:-translate-y-1 hover:bg-white/12"
                    >
                      <span className="font-semibold">{child.title}</span>
                      {"description" in child && typeof child.description === "string" ? (
                        <span className="mt-2 block text-xs leading-5 text-white/58">{child.description}</span>
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
            className="border-t border-white/10 bg-primary-900/96 px-4 pb-6 pt-3 text-white shadow-2xl lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-white/10"
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
                  Teklif Al
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
