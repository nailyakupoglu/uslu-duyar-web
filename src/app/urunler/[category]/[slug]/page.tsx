/**
 * /urunler/[category]/[slug] — ürün detay sayfası.
 * Prop'lar: { params: { category, slug } }.
 * Kullanım: statik üretilir (generateStaticParams); galeri, özellik tablosu, ambalaj,
 * sertifikalar, Product JSON-LD ve QuoteModal içerir.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, PackageCheck, ShieldCheck, Tag } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { CertBadge } from "@/components/shared/cert-badge";
import { ProductCard } from "@/components/shared/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { QuoteModal } from "@/components/product/quote-modal";
import {
  categoryMeta,
  getProduct,
  getProductsByCategory,
  isProductCategory,
  products
} from "@/lib/data";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo/jsonld";
import { productGallery, productImage } from "@/lib/products-media";

type Params = { category: string; slug: string };

export function generateStaticParams(): Params[] {
  return products.map((product) => ({ category: product.category, slug: product.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isProductCategory(params.category)) {
    return { title: "Ürün bulunamadı" };
  }
  const product = getProduct(params.category, params.slug);
  if (!product) {
    return { title: "Ürün bulunamadı" };
  }
  return {
    title: product.title,
    description: product.shortDescription,
    alternates: { canonical: `/urunler/${product.category}/${product.slug}` },
    openGraph: {
      type: "website",
      title: product.title,
      description: product.shortDescription,
      images: [{ url: productImage(product), alt: product.title }]
    }
  };
}

export default function ProductDetailPage({ params }: { params: Params }) {
  if (!isProductCategory(params.category)) {
    notFound();
  }
  const product = getProduct(params.category, params.slug);
  if (!product) {
    notFound();
  }

  const meta = categoryMeta[product.category];
  const related = getProductsByCategory(product.category).filter((item) => item.slug !== product.slug);
  const specs = Object.entries(product.specs);
  const gallery = productGallery(product);
  const heroImage = gallery[0]?.src ?? product.image;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd({
              name: product.title,
              description: product.description,
              image: heroImage,
              category: meta.title
            })
          )
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Ürünler", href: "/urunler" },
              { name: meta.title, href: `/urunler?cat=${product.category}` },
              { name: product.title, href: `/urunler/${product.category}/${product.slug}` }
            ])
          )
        }}
      />

      <Breadcrumb
        items={[
          { label: "Ürünler", href: "/urunler" },
          { label: meta.title, href: `/urunler?cat=${product.category}` },
          { label: product.title }
        ]}
      />

      <section className="container grid gap-12 py-12 lg:grid-cols-2 lg:items-start">
        <ProductGallery images={gallery.map((g) => g.src)} alt={product.title} />

        <div className="lg:pt-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-accent-700">
            <Tag className="h-3.5 w-3.5" />
            {meta.title}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
            {product.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink/70">{product.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <QuoteModal productTitle={product.title} />
            <Link
              href="/iletisim"
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-primary-700/25 bg-white px-6 text-sm font-semibold text-primary-900 transition hover:bg-primary-50"
            >
              İletişime Geç
            </Link>
          </div>

          {/* Özellik tablosu */}
          {specs.length > 0 ? (
            <dl className="mt-9 grid gap-px overflow-hidden rounded-lg border border-primary-900/10 bg-primary-900/10 sm:grid-cols-2">
              {specs.map(([key, value]) => (
                <div key={key} className="bg-white p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50">{key}</dt>
                  <dd className="mt-1 font-mono text-sm text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {/* Ambalaj seçenekleri */}
          <div className="mt-8">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary-700">
              <PackageCheck className="h-4 w-4" /> Ambalaj Seçenekleri
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.packageOptions.map((option) => (
                <li
                  key={option}
                  className="rounded-md border border-primary-900/10 bg-white px-3 py-1.5 text-sm text-ink/75"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>

          {/* Sertifikalar */}
          {product.certificates.length > 0 ? (
            <div className="mt-8">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary-700">
                <ShieldCheck className="h-4 w-4" /> Sertifika & Belgeler
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {product.certificates.map((cert) => (
                  <CertBadge key={cert} name={cert} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* İlgili ürünler */}
      {related.length > 0 ? (
        <section className="bg-cream py-20">
          <div className="container">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-semibold text-ink">Aynı kategoriden</h2>
              <Link
                href={`/urunler?cat=${product.category}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline"
              >
                <ArrowLeft className="h-4 w-4 rotate-180" /> Tümünü gör
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
