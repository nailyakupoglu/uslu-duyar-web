/**
 * Select — native select üzerine markalı, erişilebilir form yüzeyi.
 * Prop'lar: standart select attribute'leri + className.
 * Kullanım: RFQ formunda ürün, Incoterm ve buyer type alanları.
 */
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-11 rounded-md border border-line-soft bg-white px-3 text-sm text-ink shadow-sm transition focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = "Select";

export { Select };
