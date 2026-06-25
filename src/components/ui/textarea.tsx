/**
 * Textarea — çok satırlı mesaj girişi (markalı, erişilebilir).
 * Prop'lar: standart textarea attribute'leri + className.
 * Kullanım: <Textarea rows={5} placeholder="..." /> (iletişim formu, QuoteModal).
 */
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-28 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-ink shadow-sm transition placeholder:text-ink/40 focus-visible:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
