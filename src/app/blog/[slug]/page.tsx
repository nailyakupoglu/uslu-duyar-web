/**
 * /blog/[slug] — blog yazısı detay sayfası.
 * Prop'lar: { params: { slug } }.
 * Kullanım: statik üretilir; Article JSON-LD, kapak görseli ve slug'a özel içerik gövdesi.
 */
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { blogPosts } from "@/lib/data";
import { articleJsonLd } from "@/lib/seo/jsonld";

type Params = { slug: string };

// Slug bazlı yazı gövdeleri (anlamlı Türkçe içerik — placeholder değil lorem).
const bodies: Record<string, { intro: string; sections: { heading: string; paragraphs: string[] }[] }> = {
  "kirmizi-toz-biberin-tarihcesi": {
    intro:
      "Kırmızı toz biber, Anadolu mutfağının vazgeçilmez rengi ve aromasıdır. Bu yazıda biberin tarladan baharat rafına uzanan yolculuğunu ve modern üretimde değişen hijyen standartlarını ele alıyoruz.",
    sections: [
      {
        heading: "Anadolu'da Biberin Yolculuğu",
        paragraphs: [
          "Kırmızı biber, yüzyıllar içinde Akdeniz ve Güneydoğu mutfaklarının temel taşı hâline geldi. Bölgenin sıcak iklimi ve uzun güneşli günleri, biberin renk ve aroma yoğunluğunu doğal olarak artırır.",
          "Geleneksel üretimde biber güneşte kurutulur, taş değirmenlerde öğütülür ve elle paketlenirdi. Bu yöntem karakteristik lezzeti verirken, standardizasyon ve hijyen açısından sınırlıydı."
        ]
      },
      {
        heading: "Modern Hijyen Standartları",
        paragraphs: [
          "Bugün kurutma kontrollü ortamlarda yapılır; öğütme, eleme ve paketleme adımları gıda güvenliği protokolleriyle ayrıştırılır. Böylece renk, acılık ve nem değerleri parti bazında tutarlı hâle gelir.",
          "İzlenebilir üretim, her partinin menşeini ve analiz sonuçlarını kayıt altına alır. Bu da hem iç piyasada hem ihracatta güçlü bir güven temeli oluşturur."
        ]
      }
    ]
  },
  "silaj-yapiminin-puf-noktalari": {
    intro:
      "Kaliteli silaj, hayvan beslemede enerji ve verimin anahtarıdır. Doğru kuru madde oranından sıkıştırmaya, fermantasyondan sevkiyata kadar her aşamanın püf noktalarını derledik.",
    sections: [
      {
        heading: "Kuru Madde ve Hasat Zamanı",
        paragraphs: [
          "Silajın başarısı doğru hasat zamanıyla başlar. Bitkinin kuru madde oranı, fermantasyon kalitesini doğrudan etkiler; erken ya da geç hasat enerji değerini düşürebilir.",
          "Mısır silajında genellikle %30-35 kuru madde aralığı hedeflenir. Bu aralık, hem sıkıştırmayı kolaylaştırır hem de istenmeyen fermantasyonu sınırlar."
        ]
      },
      {
        heading: "Sıkıştırma ve Fermantasyon",
        paragraphs: [
          "Havasız (anaerobik) ortam, laktik asit fermantasyonu için kritiktir. İyi sıkıştırma, oksijeni dışarıda tutarak küflenme ve ısınma riskini azaltır.",
          "Düzenli analiz ve depolama takibi, silajın besin değerini koruduğunu doğrular. Çiftliklere düzenli sevkiyat planı, rasyon istikrarını destekler."
        ]
      }
    ]
  },
  "mersinin-tarim-gucu": {
    intro:
      "Mersin, bereketli üretim havzası ve güçlü liman altyapısıyla tarımsal ticaretin merkezlerinden biridir. Bu yazıda bölgenin üretimden ihracata uzanan avantajlarına bakıyoruz.",
    sections: [
      {
        heading: "Bereketli Üretim Havzası",
        paragraphs: [
          "Mersin ovaları, elverişli iklimi ve sulama altyapısıyla geniş bir ürün yelpazesine ev sahipliği yapar. Tahıldan baharata kadar pek çok ürün bölgede yetiştirilir ve işlenir.",
          "Sözleşmeli üretim modeli, bölge çiftçisiyle üretici arasında istikrarlı bir tedarik ilişkisi kurar; bu da kalite ve sürekliliği güçlendirir."
        ]
      },
      {
        heading: "Liman ve İhracat Avantajı",
        paragraphs: [
          "Mersin Limanı, ürünlerin Orta Doğu, Avrupa ve Kuzey Afrika pazarlarına ulaşmasında zaman ve maliyet avantajı sağlar. Tesise yakınlık, ihracat lojistiğini sadeleştirir.",
          "FOB, CFR ve CIF gibi teslim şekillerine uygun planlama, evrak akışıyla birlikte sorunsuz bir sevkiyat zinciri oluşturur."
        ]
      }
    ]
  }
};

export function generateStaticParams(): Params[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    return { title: "Yazı bulunamadı" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: `/images/blog/${post.slug}.svg`, alt: post.title }]
    }
  };
}

const dateFormatter = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPostPage({ params }: { params: Params }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    notFound();
  }
  const body = bodies[post.slug];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({ title: post.title, description: post.excerpt, date: post.date, slug: post.slug })
          )
        }}
      />

      <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <article className="container max-w-3xl py-12">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-accent-700">
          <span>{post.category}</span>
          <span className="inline-flex items-center gap-1 text-ink/45">
            <Clock className="h-3.5 w-3.5" />
            {post.readingMinutes} dk okuma
          </span>
          <span className="text-ink/45">{dateFormatter.format(new Date(post.date))}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">{post.title}</h1>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl shadow-[0_24px_50px_-28px_rgba(50,50,93,0.35)]">
          <Image src={`/images/blog/${post.slug}.svg`} alt={post.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>

        {body ? (
          <div className="mt-10 space-y-8">
            <p className="text-xl leading-9 text-ink/80">{body.intro}</p>
            {body.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-semibold text-primary-900">{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="mt-3 text-base leading-8 text-ink/72">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-lg leading-8 text-ink/72">{post.excerpt}</p>
        )}

        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
              #{tag}
            </span>
          ))}
        </div>

        <Link href="/blog" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Tüm yazılar
        </Link>
      </article>
    </>
  );
}
