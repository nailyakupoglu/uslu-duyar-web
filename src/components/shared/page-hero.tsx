/**
 * PageHero — iç sayfalar için koyu premium başlık bandı.
 * Prop'lar: { eyebrow?, title, description?, align? }.
 * Kullanım: kurumsal/üretim/blog/iletişim sayfalarının üst başlığı (Breadcrumb'tan sonra).
 */
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function PageHero({ eyebrow, title, description, align = "left" }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(212,160,23,0.16),transparent_46%),radial-gradient(circle_at_85%_15%,rgba(69,144,191,0.12),transparent_42%)]" />
      <div className={cn("container relative z-10 py-16 md:py-20", align === "center" && "text-center")}>
        {eyebrow ? (
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-harvest-500">{eyebrow}</p>
        ) : null}
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-balance md:text-6xl">{title}</h1>
        {description ? (
          <p className={cn("mt-5 max-w-2xl text-lg leading-8 text-white/68", align === "center" && "mx-auto")}>
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
