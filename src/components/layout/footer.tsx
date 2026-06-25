import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { categories, corporateLinks, productionLinks, siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-footer-gradient text-white">
      <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="group inline-flex items-center" aria-label="Uslu Duyar ana sayfa">
            <Logo variant="light" />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/68">{siteConfig.description}</p>
          <div className="mt-6 grid gap-3 text-sm text-white/75">
            <span className="inline-flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent-500" />
              {siteConfig.address}
            </span>
            <span className="inline-flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent-500" />
              {siteConfig.phone}
            </span>
            <span className="inline-flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent-500" />
              {siteConfig.email}
            </span>
          </div>
        </div>

        <FooterColumn title="Hızlı Linkler" links={[...corporateLinks, ...productionLinks]} />
        <FooterColumn title="Ürünler" links={categories.map((category) => ({ title: category.title, href: category.href }))} />

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white/55">Sosyal</h3>
          <div className="mt-5 flex gap-2">
            {[
              { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
              { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
              { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-accent-500 hover:text-ink"
              >
                <item.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-white/62">
            Sertifika ve yasal bilgiler placeholder olarak yerleştirildi; operatör dosyaları geldiğinde güncellenecek.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/kvkk" className="hover:text-white">KVKK</Link>
            <Link href="/gizlilik" className="hover:text-white">Gizlilik</Link>
            <Link href="/cerez-politikasi" className="hover:text-white">Çerez Politikası</Link>
            <a
              href="https://evohaus.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/45 hover:text-white"
            >
              Designed by EVOHAUS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { title: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white/55">{title}</h3>
      <ul className="mt-5 grid gap-3 text-sm text-white/72">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition hover:text-accent-500">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
