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

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryMegaGrid />
      <ProductionQuad />
      <ProductShowcase />
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
