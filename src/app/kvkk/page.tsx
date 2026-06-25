/**
 * /kvkk — KVKK aydınlatma metni.
 * Prop'lar: yok.
 * Kullanım: LegalLayout ile veri sorumlusu, işleme amaçları ve haklar.
 */
import type { Metadata } from "next";

import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "KVKK Aydınlatma Metni",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Eren Tarım aydınlatma metni.",
  path: "/kvkk"
});

export default function KvkkPage() {
  return (
    <LegalLayout
      title="KVKK Aydınlatma Metni"
      updated="24 Haziran 2026"
      intro="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin işlenmesine ilişkin bilgilendirme."
      sections={[
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
      ]}
    />
  );
}
