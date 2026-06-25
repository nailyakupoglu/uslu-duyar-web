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
  "cukurova-narenciye-sezonu": {
    intro:
      "Çukurova, Türkiye'nin narenciye üretiminde öne çıkan bereketli havzalarından biridir. Bu yazıda portakal, mandalina ve limonun hasat dönemlerini, boylama süreçlerini ve ihracata hazırlık adımlarını ele alıyoruz.",
    sections: [
      {
        heading: "Hasat Dönemleri ve Olgunluk",
        paragraphs: [
          "Narenciye hasadı, türe ve çeşide göre sonbahardan ilkbahara uzanan geniş bir takvime yayılır. Bölgenin ılıman iklimi, meyvenin doğal şeker ve asit dengesini olgunlaştırmak için elverişli koşullar sunar.",
          "Doğru olgunlukta toplanan portakal, mandalina ve limon hem iç piyasada hem ihracatta aranan renk, kabuk ve sululuk değerlerini korur. Erken ya da geç hasat, raf ömrünü ve görünümü doğrudan etkiler."
        ]
      },
      {
        heading: "Boylama ve İhracata Hazırlık",
        paragraphs: [
          "Hasat sonrası meyveler boyutlarına ve kalitelerine göre boylanır; bu süreç, alıcının talep ettiği kalibre ve ambalaj standardına uygun partiler oluşturur.",
          "İzlenebilir üretim, her partinin menşeini ve seçim kriterlerini kayıt altına alır. Bu da market zincirleri ve yurt dışı alıcılar için güçlü bir güven temeli oluşturur."
        ]
      }
    ]
  },
  "kavun-karpuz-tazelik": {
    intro:
      "Kavun ve karpuzda tazelik, tarladaki doğru zamanlama kadar hasat sonrası akışın da bir sonucudur. Doğru olgunlukta hasattan tarlada seçime, hızlı sevkiyattan market rafına kadar tazeliği korumanın püf noktalarını derledik.",
    sections: [
      {
        heading: "Doğru Olgunlukta Hasat",
        paragraphs: [
          "Kavun ve karpuzun lezzeti, tarladaki olgunluk anına sıkı sıkıya bağlıdır. Kırkağaç ve altınbaş kavunda aroma ve doku, doğru zamanlanmış hasatla en üst seviyeye ulaşır.",
          "Tarlada yapılan ön seçim, olgunlaşmamış ya da zedelenmiş ürünü ayıklayarak partinin tutarlılığını korur; bu da alıcıya istikrarlı bir kalite sunar."
        ]
      },
      {
        heading: "Hızlı Sevkiyat ve Raf Ömrü",
        paragraphs: [
          "Hasattan sevkiyata geçen sürenin kısa tutulması, tazeliğin korunmasında belirleyicidir. Hızlı toplama-paketleme akışı, ürünün market rafına en taze hâliyle ulaşmasını sağlar.",
          "Boylama ve dikkatli paketleme, taşıma sırasında oluşabilecek zedelenmeyi azaltır. Düzenli sevkiyat planı, toptan ve perakende alıcılar için ürün sürekliliğini destekler."
        ]
      }
    ]
  },
  "soguk-zincir-ve-ihracat": {
    intro:
      "Taze ürün ihracatında soğuk zincir, kalitenin sınırları aşan teminatıdır. Bu yazıda Mersin Limanı avantajını, soğuk hava deposunu ve soğuk zincir nakliyenin taze ürün ihracatındaki rolünü ele alıyoruz.",
    sections: [
      {
        heading: "Soğuk Hava Deposu ve Zincirin Sürekliliği",
        paragraphs: [
          "Hasat sonrası ürünün uygun sıcaklıkta depolanması, tazeliğin ve raf ömrünün korunmasında ilk adımdır. Soğuk hava deposu, narenciye ve yaz meyvelerini sevkiyata kadar ideal koşullarda tutar.",
          "Depodan araca, araçtan limana kadar zincirin kesintisiz işlemesi kritiktir. Sıcaklığın istikrarlı tutulması, ürünün hedef pazara taze ulaşmasını güvence altına alır."
        ]
      },
      {
        heading: "Mersin Limanı ve İhracat Avantajı",
        paragraphs: [
          "Mersin Limanı, taze ürünlerin Orta Doğu, Avrupa ve Kuzey Afrika pazarlarına ulaşmasında zaman ve maliyet avantajı sağlar. Üretim havzasına yakınlık, soğuk zincir lojistiğini sadeleştirir.",
          "FOB, CFR ve CIF gibi teslim şekillerine uygun planlama, evrak akışıyla birlikte sorunsuz bir sevkiyat zinciri oluşturur ve ihracatçı için öngörülebilirliği artırır."
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
