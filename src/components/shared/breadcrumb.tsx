import { Link } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";
import { useLocale } from "next-intl";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const locale = useLocale();
  const homeLabel = locale === "en" ? "Home" : "Ana Sayfa";
  return (
    <nav aria-label="Breadcrumb" className="container pt-[calc(var(--header-h)+2rem)] pb-4 text-sm text-ink/60">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="inline-flex items-center gap-2 hover:text-primary-700">
            <Home className="h-4 w-4" />
            {homeLabel}
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
