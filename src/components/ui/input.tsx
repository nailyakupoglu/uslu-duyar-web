/**
 * Input — markaya uygun, erişilebilir metin/e-posta/telefon girişi.
 * Prop'lar: standart input attribute'leri + className.
 * Kullanım: <Input type="email" placeholder="..." /> (form alanları, QuoteModal).
 */
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md border border-line-soft bg-white px-3 py-2 text-sm text-ink shadow-sm transition placeholder:text-ink/40 focus-visible:border-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
