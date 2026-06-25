/**
 * Label — form alanları için erişilebilir etiket.
 * Prop'lar: standart label attribute'leri (htmlFor) + className.
 * Kullanım: <Label htmlFor="email">E-posta</Label>.
 */
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-semibold text-ink", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
