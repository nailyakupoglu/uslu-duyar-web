import { Link } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";
import { getLocale } from "next-intl/server";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export async function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const locale = await getLocale();
  return (
    <nav aria-label="Breadcrumb" className="container relative z-10 pt-28 text-sm text-ink/60">
      <ol className="inline-flex flex-wrap items-center gap-2 rounded-full border border-primary-900/10 bg-white/72 px-4 py-2.5 shadow-[0_14px_40px_-28px_rgba(6,21,12,.42)] backdrop-blur-xl">
        <li>
          <Link href="/" className="inline-flex items-center gap-2 hover:text-primary-700">
            <Home className="h-4 w-4" />
            {locale === "en" ? "Home" : "Ana Sayfa"}
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="inline-flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-ink/32" />
            {item.href ? (
              <Link href={item.href} className="hover:text-primary-700">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
