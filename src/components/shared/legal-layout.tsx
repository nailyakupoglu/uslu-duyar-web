/**
 * LegalLayout — yasal metin sayfaları için ortak okunabilir doküman düzeni.
 * Prop'lar: { title, updated, sections: { heading, body: string[] }[] }.
 * Kullanım: KVKK, gizlilik ve çerez politikası sayfaları aynı düzeni paylaşır.
 */
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";

export type LegalSection = { heading: string; body: string[] };

export function LegalLayout({
  title,
  updated,
  intro,
  sections
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Breadcrumb items={[{ label: title }]} />
      <PageHero eyebrow="Yasal" title={title} description={intro} />

      <article className="container max-w-3xl py-16">
        <p className="text-sm text-ink/45">Son güncelleme: {updated}</p>
        <div className="mt-8 space-y-10">
          {sections.map((section, index) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-semibold text-primary-900">
                <span className="mr-2 font-mono text-base text-accent-700">{index + 1}.</span>
                {section.heading}
              </h2>
              {section.body.map((paragraph, pIndex) => (
                <p key={pIndex} className="mt-3 text-base leading-8 text-ink/72">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
