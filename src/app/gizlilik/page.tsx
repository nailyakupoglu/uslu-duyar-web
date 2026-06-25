/**
 * /gizlilik — gizlilik politikası.
 * Prop'lar: yok.
 * Kullanım: LegalLayout ile veri toplama, kullanım, güvenlik ve iletişim.
 */
import type { Metadata } from "next";

import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Gizlilik Politikası",
  description: "Eren Tarım gizlilik politikası: kişisel verilerin toplanması, kullanımı ve korunması.",
  path: "/gizlilik"
});

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Gizlilik Politikası"
      updated="24 Haziran 2026"
      intro="Verilerinizin gizliliğine önem veriyoruz. Bu politika, web sitemizde toplanan bilgileri ve kullanım şeklini açıklar."
      sections={[
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
      ]}
    />
  );
}
