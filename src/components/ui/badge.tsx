/**
 * Badge — export/spec durumlarını küçük, semantik etiketler halinde gösterir.
 * Prop'lar: variant ("trust" | "cold" | "harvest" | "steel" | "outline"), standart span attribute'leri.
 * Kullanım: spec sheet, sezon takvimi ve güven bloklarında küçük durum etiketleri.
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold leading-none",
  {
    variants: {
      variant: {
        trust: "bg-trust-50 text-trust-700",
        cold: "bg-cold-50 text-cold-700",
        harvest: "bg-harvest-50 text-harvest-700",
        steel: "bg-port-50 text-port-700",
        outline: "border border-line-soft bg-white text-ink/68"
      }
    },
    defaultVariants: {
      variant: "outline"
    }
  }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
