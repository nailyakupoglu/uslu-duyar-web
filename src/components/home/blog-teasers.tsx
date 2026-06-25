import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

import { blogPosts } from "@/lib/data";

export function BlogTeasers() {
  return (
    <section className="section-padding bg-cream">
      <div className="container">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-700">Bilgi merkezi</p>
            <h2 className="mt-2 font-display text-4xl font-semibold">Son yazılar</h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-primary-700">
            Tüm Yazılar <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-lg bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent2-500">{post.category}</p>
              <h3 className="mt-4 font-display text-2xl font-semibold">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/64">{post.excerpt}</p>
              <p className="mt-5 text-xs font-semibold text-ink/45">{post.readingMinutes} dk okuma</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
