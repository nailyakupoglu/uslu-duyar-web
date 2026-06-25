/**
 * /cerez-politikasi — çerez politikası.
 * Prop'lar: yok.
 * Kullanım: LegalLayout ile çerez türleri, amaçları ve yönetimi.
 */
import type { Metadata } from "next";

import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Çerez Politikası",
  description: "Uslu Duyar çerez politikası: kullanılan çerez türleri, amaçları ve tarayıcıdan yönetimi.",
  path: "/cerez-politikasi"
});

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Çerez Politikası"
      updated="24 Haziran 2026"
      intro="Bu politika, web sitemizde kullanılan çerezleri ve bu çerezleri nasıl yönetebileceğinizi açıklar."
      sections={[
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
      ]}
    />
  );
}
