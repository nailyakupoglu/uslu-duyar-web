// Logo — müşterinin onayladığı suluboya Uslu Duyar marka kilidini kullanır.
// Props: className/priority; variant ve showSubtitle eski çağrılarla uyumluluk için korunur.
// Kullanım: header, footer ve splash içinde tek gerçek logo dosyasını gösterir.
import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "light" | "dark";
  showSubtitle?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({ className, priority = false, variant = "dark" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex w-[220px] max-w-full overflow-visible",
        variant === "light" && "drop-shadow-[0_8px_22px_rgba(0,0,0,.28)]",
        className
      )}
    >
      <Image
        src="/images/logos/uslu-duyar-logo-transparent.png"
        alt="Uslu Duyar Tarım Ürünleri Ltd. Şti."
        width={1000}
        height={329}
        priority={priority}
        sizes="(min-width: 1024px) 240px, 190px"
        className="h-auto w-full object-contain"
      />
    </span>
  );
}

// LogoMark — legacy çağrılar için gerçek logo dosyasını kompakt biçimde döndürür.
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex overflow-visible", className)}>
      <Image
        src="/images/logos/uslu-duyar-logo-transparent.png"
        alt="Uslu Duyar"
        width={1000}
        height={329}
        className="h-auto w-full object-contain"
      />
    </span>
  );
}
