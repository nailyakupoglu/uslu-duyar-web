/**
 * /blog/[slug] — blog yazısı detay sayfası.
 * Prop'lar: { params: { locale, slug } }.
 * Kullanım: statik üretilir; Article JSON-LD, kapak görseli ve slug'a özel locale içerik gövdesi.
 */
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { blogPosts } from "@/lib/data";
import { getBlogPostsL } from "@/lib/content";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { buildMetadataForLocale } from "@/lib/seo/metadata";
import { getBlogCover } from "@/lib/visual-assets";

type Params = { locale: string; slug: string };

type ArticleBody = { intro: string; sections: { heading: string; paragraphs: string[] }[] };

// Slug bazlı yazı gövdeleri (anlamlı içerik — placeholder değil), her dil için ayrı.
const bodies: Record<string, { tr: ArticleBody; en: ArticleBody }> = {
  "cukurova-narenciye-sezonu": {
    tr: {
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
    en: {
      intro:
        "Çukurova is one of Türkiye's most fertile basins for citrus production. In this article we look at the harvest periods, grading processes and export-preparation steps for oranges, mandarins and lemons.",
      sections: [
        {
          heading: "Harvest Periods and Ripeness",
          paragraphs: [
            "The citrus harvest spreads across a broad calendar from autumn to spring, depending on species and variety. The region's temperate climate offers favourable conditions for ripening the fruit's natural sugar and acid balance.",
            "Picked at the right ripeness, oranges, mandarins and lemons retain the colour, peel and juiciness valued in both the domestic market and export. Harvesting too early or too late directly affects shelf life and appearance."
          ]
        },
        {
          heading: "Grading and Export Preparation",
          paragraphs: [
            "After harvest, the fruit is graded by size and quality; this process forms batches that match the calibre and packaging standard the buyer requests.",
            "Traceable production records the origin and selection criteria of every batch. This builds a strong basis of trust for retail chains and overseas buyers."
          ]
        }
      ]
    }
  },
  "kavun-karpuz-tazelik": {
    tr: {
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
    en: {
      intro:
        "Freshness in melon and watermelon is the result of post-harvest flow as much as the right timing in the field. We have gathered the keys to preserving freshness — from harvesting at the right ripeness to in-field selection, fast shipping and the supermarket shelf.",
      sections: [
        {
          heading: "Harvesting at the Right Ripeness",
          paragraphs: [
            "The flavour of melon and watermelon is tightly tied to the moment of ripeness in the field. In Kırkağaç and Altınbaş melons, aroma and texture reach their peak with a well-timed harvest.",
            "Pre-selection in the field removes unripe or damaged produce, keeping the batch consistent; this delivers a steady quality to the buyer."
          ]
        },
        {
          heading: "Fast Shipping and Shelf Life",
          paragraphs: [
            "Keeping the time from harvest to shipping short is decisive in preserving freshness. A fast harvest-to-packing flow ensures the produce reaches the supermarket shelf in its freshest state.",
            "Grading and careful packing reduce damage that can occur during transport. A regular shipping schedule supports product continuity for wholesale and retail buyers."
          ]
        }
      ]
    }
  },
  "soguk-zincir-ve-ihracat": {
    tr: {
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
    },
    en: {
      intro:
        "In fresh-produce export, the cold chain is the guarantee of quality that crosses borders. In this article we look at the Port of Mersin advantage, cold storage and the role of cold-chain transport in fresh-produce export.",
      sections: [
        {
          heading: "Cold Storage and Continuity of the Chain",
          paragraphs: [
            "Storing produce at the right temperature after harvest is the first step in preserving freshness and shelf life. Cold storage keeps citrus and summer fruits in ideal conditions until shipment.",
            "It is critical that the chain runs without interruption — from storage to vehicle, and from vehicle to port. Keeping the temperature stable ensures the produce reaches its target market fresh."
          ]
        },
        {
          heading: "Port of Mersin and the Export Advantage",
          paragraphs: [
            "The Port of Mersin provides time and cost advantages in reaching the Middle East, European and North African markets with fresh produce. Proximity to the production basin simplifies cold-chain logistics.",
            "Planning suited to delivery terms such as FOB, CFR and CIF, together with the flow of documents, forms a seamless shipping chain and increases predictability for the exporter."
          ]
        }
      ]
    }
  }
};

export function generateStaticParams(): { slug: string }[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getBlogPostsL(params.locale).find((item) => item.slug === params.slug);
  if (!post) {
    return { title: params.locale === "en" ? "Post not found" : "Yazı bulunamadı" };
  }
  return buildMetadataForLocale(params.locale, {
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: getBlogCover(post.slug, params.locale).src,
    type: "article"
  });
}

export default function BlogPostPage({ params }: { params: Params }) {
  const { locale, slug } = params;
  const post = getBlogPostsL(locale).find((item) => item.slug === slug);
  if (!post) {
    notFound();
  }
  const body = bodies[post.slug]?.[locale === "en" ? "en" : "tr"];
  const cover = getBlogCover(post.slug, locale);
  const dateFormatter = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

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
            {post.readingMinutes} {locale === "en" ? "min read" : "dk okuma"}
          </span>
          <span className="text-ink/45">{dateFormatter.format(new Date(post.date))}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">{post.title}</h1>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg shadow-[0_24px_50px_-28px_rgba(50,50,93,0.35)]">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            priority
            quality={90}
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            style={{ objectPosition: cover.position }}
          />
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
          <ArrowLeft className="h-4 w-4" /> {locale === "en" ? "All posts" : "Tüm yazılar"}
        </Link>
      </article>
    </>
  );
}
