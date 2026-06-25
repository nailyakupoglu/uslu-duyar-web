/**
 * /kvkk — KVKK aydınlatma metni.
 * Prop'lar: yok.
 * Kullanım: LegalLayout ile veri sorumlusu, işleme amaçları ve haklar.
 */
import type { Metadata } from "next";

import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/data";
import { buildMetadataForLocale } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadataForLocale(locale, {
    title: locale === "en" ? "Personal Data Protection (KVKK) Notice" : "KVKK Aydınlatma Metni",
    description:
      locale === "en"
        ? "Uslu Duyar privacy notice under Türkiye's Personal Data Protection Law No. 6698 (KVKK)."
        : "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Uslu Duyar aydınlatma metni.",
    path: "/kvkk"
  });
}

export default function KvkkPage({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === "en";

  return (
    <LegalLayout
      title={isEn ? "Personal Data Protection (KVKK) Notice" : "KVKK Aydınlatma Metni"}
      updated={isEn ? "24 June 2026" : "24 Haziran 2026"}
      intro={
        isEn
          ? "Information regarding the processing of your personal data under Türkiye's Personal Data Protection Law No. 6698 (KVKK)."
          : "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin bilgilendirme."
      }
      sections={
        isEn
          ? [
              {
                heading: "Data Controller",
                body: [
                  `${siteConfig.legalName} (the “Company”) acts as the data controller in the processing of your personal data.`,
                  `Contact: ${siteConfig.email} — ${siteConfig.address}`
                ]
              },
              {
                heading: "Personal Data Processed",
                body: [
                  "Data you submit through the contact form — such as your name, e-mail, phone, company name, and message content — is processed.",
                  "Technical data relating to your use of the website (via cookies) may be collected as described in our cookie policy."
                ]
              },
              {
                heading: "Purposes of Processing",
                body: [
                  "Your data is processed to respond to your requests and questions, to carry out quote processes, to enable commercial communication, and to fulfil legal obligations."
                ]
              },
              {
                heading: "Transfer of Data",
                body: [
                  "Your personal data may be shared, in compliance with applicable legislation, with authorised public institutions and service providers within the framework of legal obligations and service requirements."
                ]
              },
              {
                heading: "Your Rights",
                body: [
                  "Under Article 11 of the KVKK, you have the right to access your data, to request its correction or deletion, to object to its processing, and other rights.",
                  `You may submit your requests to ${siteConfig.email}.`
                ]
              }
            ]
          : [
              {
                heading: "Veri Sorumlusu",
                body: [
                  `${siteConfig.legalName} (“Şirket”), kişisel verilerinizin işlenmesinde veri sorumlusu sıfatıyla hareket eder.`,
                  `İletişim: ${siteConfig.email} — ${siteConfig.address}`
                ]
              },
              {
                heading: "İşlenen Kişisel Veriler",
                body: [
                  "İletişim formu aracılığıyla ad-soyad, e-posta, telefon, firma adı ve mesaj içeriği gibi tarafınızca iletilen veriler işlenir.",
                  "Web sitesi kullanımına ilişkin teknik veriler (çerezler aracılığıyla) çerez politikamızda belirtildiği şekilde toplanabilir."
                ]
              },
              {
                heading: "İşleme Amaçları",
                body: [
                  "Talep ve sorularınızın yanıtlanması, teklif süreçlerinin yürütülmesi, ticari iletişimin sağlanması ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla verileriniz işlenir."
                ]
              },
              {
                heading: "Verilerin Aktarımı",
                body: [
                  "Kişisel verileriniz, yasal yükümlülükler ve hizmet gereklilikleri çerçevesinde yetkili kamu kurumları ve hizmet sağlayıcılarla, mevzuata uygun şekilde paylaşılabilir."
                ]
              },
              {
                heading: "Haklarınız",
                body: [
                  "KVKK madde 11 kapsamında; verilerinize erişme, düzeltilmesini veya silinmesini isteme, işlenmesine itiraz etme ve diğer haklara sahipsiniz.",
                  `Taleplerinizi ${siteConfig.email} adresine iletebilirsiniz.`
                ]
              }
            ]
      }
    />
  );
}
