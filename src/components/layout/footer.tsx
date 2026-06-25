import { Link } from "@/i18n/navigation";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { getLocale } from "next-intl/server";

import { Logo } from "@/components/shared/logo";
import { LegalTrustBlock } from "@/components/shared/legal-trust-block";
import { getCategoriesL, getCorporateLinksL, getProductionLinksL } from "@/lib/content";
import { phoneHref } from "@/lib/contact-channels";
import { siteConfig } from "@/lib/data";
import { pick } from "@/lib/utils";

export async function Footer() {
  const locale = await getLocale();
  const categories = getCategoriesL(locale);
  const corporateLinks = getCorporateLinksL(locale);
  const productionLinks = getProductionLinksL(locale);
  const phone = phoneHref();
  const socialLinks = [
    { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
    { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
    { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" }
  ].filter((item) => item.href && item.href !== "#");

  return (
    <footer className="bg-footer-gradient text-white">
      <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="group inline-flex items-center" aria-label="Uslu Duyar ana sayfa">
            <Logo variant="light" />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/68">{pick(siteConfig.description, locale)}</p>
          <div className="mt-6 grid gap-3 text-sm text-white/75">
            <span className="inline-flex items-center gap-3">
              <MapPin className="h-4 w-4 text-harvest-500" />
              {siteConfig.address}
            </span>
            {phone ? (
            <a href={phone} className="inline-flex items-center gap-3 transition hover:text-white">
              <Phone className="h-4 w-4 text-harvest-500" />
              {siteConfig.phone}
            </a>
            ) : null}
            <span className="inline-flex items-center gap-3">
              <Mail className="h-4 w-4 text-harvest-500" />
              {siteConfig.email}
            </span>
          </div>
          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/42 mb-2.5">
              {locale === "en" ? "Certificates (Pending)" : "Sertifikalar (Beklemede)"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {["GLOBALG.A.P", "ISO 22000", "HALAL / HELAL", "SMETA"].map((cert) => (
                <span key={cert} className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/72">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        <FooterColumn
          title={locale === "en" ? "Quick Links" : "Hızlı Linkler"}
          links={[...corporateLinks, ...productionLinks].map((link) => ({ title: link.title, href: link.href }))}
        />
        <FooterColumn
          title={locale === "en" ? "Products" : "Ürünler"}
          links={categories.map((category) => ({ title: category.title, href: category.href }))}
        />

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white/55">{locale === "en" ? "Social" : "Sosyal"}</h3>
          {socialLinks.length > 0 ? (
            <div className="mt-5 flex gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-accent-500 hover:text-ink"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-6 text-white/60">
              {locale === "en" ? "Social channels will be added after confirmation." : "Sosyal kanallar onay sonrası eklenecek."}
            </p>
          )}
          <div className="mt-6 text-ink">
            <LegalTrustBlock locale={locale} compact />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}.{" "}
            {locale === "en" ? "All rights reserved." : "Tüm hakları saklıdır."}
          </p>
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
            <Link href={link.href} className="transition hover:text-harvest-500">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
