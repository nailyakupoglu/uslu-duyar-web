// Logo — Uslu Duyar marka kilidi: narenciye + karpuz işareti + "Uslu Duyar" kelime markası.
// Props: variant ("light" koyu zeminde beyaz "Duyar" / "dark" açık zeminde yeşil "Duyar"), showSubtitle, className.
// Kullanım: header & footer (light), açık zeminli sayfa başlıkları (dark).
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "light" | "dark";
  showSubtitle?: boolean;
  className?: string;
};

export function Logo({ variant = "dark", showSubtitle = true, className }: LogoProps) {
  const duyarColor = variant === "light" ? "text-white" : "text-primary-700";
  const subtitleColor = variant === "light" ? "text-white/60" : "text-ink/55";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:-rotate-6" />
      <span className="leading-none">
        <span className="block font-display text-[1.6rem] font-bold leading-none tracking-tight">
          <span className="text-accent">Uslu</span> <span className={duyarColor}>Duyar</span>
        </span>
        {showSubtitle && (
          <span
            className={cn(
              "mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.26em]",
              subtitleColor
            )}
          >
            Tarım Ürünleri
          </span>
        )}
      </span>
    </span>
  );
}

// LogoMark — narenciye (sol, turuncu) + karpuz (sağ, kırmızı/yeşil) dilimli dairesel işaret.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Uslu Duyar">
      <path d="M24 6 C27 -1 35 -1 39 3 C35 9 28 9 24 6 Z" fill="#43B14E" />
      <path d="M24 6 C21 0 14 0 10 3 C14 9 20 9 24 6 Z" fill="#2A5720" />
      <path d="M24 7 A17 17 0 0 0 24 41 Z" fill="#ED8120" />
      <path d="M24 11 A13 13 0 0 0 24 37 Z" fill="#F8B45E" />
      <g stroke="#ED8120" strokeWidth="1.4" opacity="0.7">
        <line x1="24" y1="24" x2="13" y2="17" />
        <line x1="24" y1="24" x2="11" y2="24" />
        <line x1="24" y1="24" x2="13" y2="31" />
      </g>
      <path d="M24 7 A17 17 0 0 1 24 41 Z" fill="#2A5720" />
      <path d="M24 10 A14 14 0 0 1 24 38 Z" fill="#E23B33" />
      <g fill="#1C1A12">
        <ellipse cx="31" cy="18" rx="1.1" ry="1.7" />
        <ellipse cx="34" cy="24" rx="1.1" ry="1.7" />
        <ellipse cx="31" cy="30" rx="1.1" ry="1.7" />
      </g>
    </svg>
  );
}
