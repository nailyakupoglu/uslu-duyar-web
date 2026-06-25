/**
 * /blog — blog listeleme sayfası.
 * Prop'lar: yok.
 * Kullanım: blogPosts'u kart ızgarasında listeler; her kart [slug] detayına gider.
 */
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Clock } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { getBlogPostsL } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return buildMetadata({
    title: "Blog",
    description:
      locale === "en"
        ? "Uslu Duyar blog: up-to-date content and production notes on citrus, melon, watermelon and Çukurova agriculture."
        : "Uslu Duyar blog: narenciye, kavun, karpuz ve Çukurova tarımı üzerine güncel içerikler ve üretim notları.",
    path: "/blog"
  });
}

export default function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  const blogPosts = getBlogPostsL(locale);
  const dateFormatter = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <>
      <Breadcrumb items={[{ label: "Blog" }]} />
      <PageHero
        eyebrow="Blog"
        title={locale === "en" ? "Notes from production, insights from the industry" : "Üretimden notlar, sektörden içgörüler"}
        description={
          locale === "en"
            ? "We share our experience and up-to-date knowledge on citrus, melon, watermelon and the fresh-produce trade."
            : "Narenciye, kavun, karpuz ve taze ürün ticareti üzerine deneyimlerimizi ve güncel bilgileri paylaşıyoruz."
        }
      />

      <section className="container py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <RevealOnScroll key={post.slug} delay={index * 0.05}>
              <article className="group h-full overflow-hidden rounded-2xl border border-primary-900/10 bg-white shadow-[0_18px_45px_rgba(14,14,14,0.06)] transition hover:-translate-y-1 hover:shadow-xl">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={`/images/blog/${post.slug}.svg`}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-accent-700">
                      <span>{post.category}</span>
                      <span className="inline-flex items-center gap-1 text-ink/45">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readingMinutes} {locale === "en" ? "min" : "dk"}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-semibold text-ink transition group-hover:text-primary-700">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink/65">{post.excerpt}</p>
                    <p className="mt-4 text-xs text-ink/45">{dateFormatter.format(new Date(post.date))}</p>
                  </div>
                </Link>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
