"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { categories, corporateLinks, productionLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Kurumsal", href: "/corporate", children: corporateLinks },
  { title: "Üretim", href: "/uretim", children: productionLinks },
  { title: "Ürünler", href: "/urunler", children: categories },
  { title: "Blog", href: "/blog" },
  { title: "İletişim", href: "/iletisim" }
];

export function Header() {
  const pathname = usePathname();
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
        <Link href="/" className="group inline-flex items-center gap-3" aria-label="Eren Tarım ana sayfa">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-primary-700 shadow-lg transition group-hover:rotate-3">
            ET
          </span>
          <span>
            <span className="block font-display text-2xl font-semibold leading-none">Eren Tarım</span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/58">Mersin</span>
          </span>
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
                  Değirmen, biber-baharat ve silaj operasyonlarını tek izlenebilir üretim zincirinde sunan Mersin merkezli yapı.
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
