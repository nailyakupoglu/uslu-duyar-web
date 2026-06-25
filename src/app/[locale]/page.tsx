/**
 * Ana sayfa — "Anatolian Harvest Modernism" anlatısını bölüm bölüm dizer.
 * Prop'lar: yok (server component, veriyi @/lib/data'dan alan alt bileşenleri kompoze eder).
 * Kullanım: "/" route'u; hero → kategoriler → üretim → ürün vitrini → istatistik →
 * küresel erişim → sertifikalar → referanslar → blog → CTA ritmini sağlar.
 */
import { HeroSlider } from "@/components/home/hero-slider";
import { CategoryMegaGrid } from "@/components/home/category-mega-grid";
import { ProductionQuad } from "@/components/home/production-quad";
import { ProductShowcase } from "@/components/home/product-showcase";
import { StatsCounter } from "@/components/home/stats-counter";
import { GlobalReachMap } from "@/components/home/global-reach-map";
import { VideoGrid } from "@/components/home/video-grid";
import { CertificationsStrip } from "@/components/home/certifications-strip";
import { Testimonials } from "@/components/home/testimonials";
import { BlogTeasers } from "@/components/home/blog-teasers";
import { CtaBanner } from "@/components/home/cta-banner";
import { HarvestToPortFlow } from "@/components/home/harvest-to-port-flow";
import { SeasonCalendar } from "@/components/sections/season-calendar";
import { SectionHeading } from "@/components/shared/section-heading";

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <HeroSlider />
      <CategoryMegaGrid />
      <ProductShowcase />
      <section className="section-padding bg-cream">
        <div className="container">
          <SectionHeading
            eyebrow={locale === "en" ? "Season planning" : "Sezon planlama"}
            title={locale === "en" ? "Know the loading window before the quote." : "Tekliften önce yükleme penceresini görün."}
            description={
              locale === "en"
                ? "A buyer can scan citrus, melon and watermelon availability by month before requesting a lot-specific offer."
                : "Alıcı, parti bazlı teklif istemeden önce narenciye, kavun ve karpuz uygunluğunu ay-ay tarayabilir."
            }
            align="center"
          />
          <div className="mt-10">
            <SeasonCalendar locale={locale} compact />
          </div>
        </div>
      </section>
      <HarvestToPortFlow locale={locale} />
      <ProductionQuad />
      <StatsCounter />
      <VideoGrid />
      <GlobalReachMap />
      <CertificationsStrip />
      <Testimonials />
      <BlogTeasers />
      <CtaBanner />
    </>
  );
}
