import { Award } from "lucide-react";

import { cn } from "@/lib/utils";

type CertBadgeProps = {
  name: string;
  className?: string;
  locale?: string;
};

export function CertBadge({ name, className, locale = "tr" }: CertBadgeProps) {
  const isEn = locale === "en";
  return (
    <div
      className={cn(
        "group flex min-h-24 items-center gap-4 rounded-lg border border-primary-900/10 bg-white/78 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl",
        className
      )}
      title={isEn ? `${name} document status pending` : `${name} belge durumu beklemede`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
        <Award className="h-6 w-6" />
      </span>
      <span>
        <strong className="block text-sm text-ink">{name}</strong>
        <span className="text-xs leading-5 text-ink/58">
          {isEn ? "PDF, number and validity date will be published after operator confirmation." : "PDF, belge no ve geçerlilik tarihi operatör onayı sonrası yayınlanacak."}
        </span>
      </span>
    </div>
  );
}
