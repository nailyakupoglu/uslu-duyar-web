/**
 * /gizlilik — gizlilik politikası.
 * Prop'lar: yok.
 * Kullanım: LegalLayout ile veri toplama, kullanım, güvenlik ve iletişim.
 */
import type { Metadata } from "next";

import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadata({
    title: locale === "en" ? "Privacy Policy" : "Gizlilik Politikası",
    description:
      locale === "en"
        ? "Uslu Duyar privacy policy: the collection, use, and protection of personal data."
        : "Uslu Duyar gizlilik politikası: kişisel verilerin toplanması, kullanımı ve korunması.",
    path: "/gizlilik"
  });
}

export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === "en";

  return (
    <LegalLayout
      title={isEn ? "Privacy Policy" : "Gizlilik Politikası"}
      updated={isEn ? "24 June 2026" : "24 Haziran 2026"}
      intro={
        isEn
          ? "We care about the privacy of your data. This policy explains the information collected on our website and how it is used."
          : "Verilerinizin gizliliğine önem veriyoruz. Bu politika, web sitemizde toplanan bilgileri ve kullanım şeklini açıklar."
      }
      sections={
        isEn
          ? [
              {
                heading: "Information Collected",
                body: [
                  "We collect the information you submit through the contact form (name, e-mail, phone, message) and technical data relating to your use of the site."
                ]
              },
              {
                heading: "Use of Information",
                body: [
                  "The information collected is used to respond to your requests, improve service quality, and fulfil legal obligations.",
                  "Your information is not sold to third parties for marketing purposes without your consent."
                ]
              },
              {
                heading: "Data Security",
                body: [
                  "We apply appropriate technical and administrative measures to protect your data against unauthorised access. Data is transmitted over encrypted connections (HTTPS)."
                ]
              },
              {
                heading: "Third-Party Services",
                body: [
                  "Trusted service providers may be used for functions such as form submission and analytics. These providers process data only to the extent required by the service."
                ]
              },
              {
                heading: "Contact",
                body: [`For questions regarding our privacy policy, you can reach us at ${siteConfig.email}.`]
              }
            ]
          : [
              {
                heading: "Toplanan Bilgiler",
                body: [
                  "İletişim formu aracılığıyla tarafınızca gönderilen bilgileri (ad, e-posta, telefon, mesaj) ve site kullanımına dair teknik verileri toplarız."
                ]
              },
              {
                heading: "Bilgilerin Kullanımı",
                body: [
                  "Toplanan bilgiler; taleplerinize yanıt vermek, hizmet kalitesini artırmak ve yasal yükümlülükleri yerine getirmek için kullanılır.",
                  "Bilgileriniz, izniniz olmaksızın pazarlama amacıyla üçüncü taraflara satılmaz."
                ]
              },
              {
                heading: "Veri Güvenliği",
                body: [
                  "Verilerinizi yetkisiz erişime karşı korumak için uygun teknik ve idari tedbirleri uygularız. Veri aktarımı şifreli bağlantılar (HTTPS) üzerinden yapılır."
                ]
              },
              {
                heading: "Üçüncü Taraf Hizmetleri",
                body: [
                  "Form gönderimi ve analiz gibi işlevler için güvenilir hizmet sağlayıcıları kullanılabilir. Bu sağlayıcılar yalnızca hizmetin gerektirdiği ölçüde veri işler."
                ]
              },
              {
                heading: "İletişim",
                body: [`Gizlilik politikamıza ilişkin sorularınız için ${siteConfig.email} adresinden bize ulaşabilirsiniz.`]
              }
            ]
      }
    />
  );
}
