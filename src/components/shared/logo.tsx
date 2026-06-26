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

export function Logo({ className, priority = false }: LogoProps) {
  return (
    <span className={cn("inline-flex w-[220px] max-w-full overflow-hidden rounded-[3px] bg-white", className)}>
      <Image
        src="/images/logos/uslu-duyar-logo.png"
        alt="Uslu Duyar Tarım Ürünleri Ltd. Şti."
        width={1084}
        height={360}
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
    <span className={cn("inline-flex overflow-hidden rounded-[3px] bg-white", className)}>
      <Image
        src="/images/logos/uslu-duyar-logo.png"
        alt="Uslu Duyar"
        width={1084}
        height={360}
        className="h-auto w-full object-contain"
      />
    </span>
  );
}
