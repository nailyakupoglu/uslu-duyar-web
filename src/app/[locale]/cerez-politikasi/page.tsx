/**
 * /cerez-politikasi — çerez politikası.
 * Prop'lar: yok.
 * Kullanım: LegalLayout ile çerez türleri, amaçları ve yönetimi.
 */
import type { Metadata } from "next";

import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadata({
    title: locale === "en" ? "Cookie Policy" : "Çerez Politikası",
    description:
      locale === "en"
        ? "Uslu Duyar cookie policy: the cookie types used, their purposes, and how to manage them from your browser."
        : "Uslu Duyar çerez politikası: kullanılan çerez türleri, amaçları ve tarayıcıdan yönetimi.",
    path: "/cerez-politikasi"
  });
}

export default function CookiePolicyPage({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === "en";

  return (
    <LegalLayout
      title={isEn ? "Cookie Policy" : "Çerez Politikası"}
      updated={isEn ? "24 June 2026" : "24 Haziran 2026"}
      intro={
        isEn
          ? "This policy explains the cookies used on our website and how you can manage them."
          : "Bu politika, web sitemizde kullanılan çerezleri ve bu çerezleri nasıl yönetebileceğinizi açıklar."
      }
      sections={
        isEn
          ? [
              {
                heading: "What Is a Cookie?",
                body: [
                  "Cookies are small text files that websites place in your browser. They help the site work properly and improve your experience."
                ]
              },
              {
                heading: "Types of Cookies We Use",
                body: [
                  "Essential cookies: Required for the core functions of the site and cannot be disabled.",
                  "Analytics cookies: Used to anonymously measure visitor behaviour and improve the site (only if you give consent)."
                ]
              },
              {
                heading: "Managing Cookies",
                body: [
                  "You can delete or block cookies from your browser settings. However, blocking essential cookies may cause some functions to stop working."
                ]
              },
              {
                heading: "Contact",
                body: [`For questions regarding our cookie policy, you can reach us at ${siteConfig.email}.`]
              }
            ]
          : [
              {
                heading: "Çerez Nedir?",
                body: [
                  "Çerezler, web sitelerinin tarayıcınıza yerleştirdiği küçük metin dosyalarıdır. Sitenin düzgün çalışmasını ve deneyiminizin iyileştirilmesini sağlarlar."
                ]
              },
              {
                heading: "Kullandığımız Çerez Türleri",
                body: [
                  "Zorunlu çerezler: Sitenin temel işlevleri için gereklidir ve kapatılamaz.",
                  "Analitik çerezler: Ziyaretçi davranışını anonim olarak ölçmek ve siteyi geliştirmek için kullanılır (yalnızca onay verirseniz)."
                ]
              },
              {
                heading: "Çerezlerin Yönetimi",
                body: [
                  "Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Ancak zorunlu çerezlerin engellenmesi bazı işlevlerin çalışmamasına neden olabilir."
                ]
              },
              {
                heading: "İletişim",
                body: [`Çerez politikamıza ilişkin sorularınız için ${siteConfig.email} adresinden bize ulaşabilirsiniz.`]
              }
            ]
      }
    />
  );
}
