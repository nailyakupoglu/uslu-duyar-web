/**
 * QuoteModal — ürün detayında "Teklif Al" butonu + form diyaloğu.
 * Prop'lar: { productTitle: string, triggerLabel?: string, triggerClassName?: string }.
 * Kullanım: <QuoteModal productTitle="Washington Portakal" /> — ContactForm'u ön-dolu konu ile açar.
 */
"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { ContactForm } from "@/components/shared/contact-form";

type QuoteModalProps = {
  productTitle: string;
  triggerLabel?: string;
  triggerClassName?: string;
};

export function QuoteModal({ productTitle, triggerLabel = "Teklif Al", triggerClassName }: QuoteModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="lg" magnetic className={triggerClassName}>
          <FileText className="h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Teklif Talebi</DialogTitle>
          <DialogDescription>
            <strong className="text-primary-700">{productTitle}</strong> için ihtiyaçlarınızı paylaşın; ambalaj,
            miktar ve sevkiyat detaylarıyla birlikte hızlıca dönüş yapalım.
          </DialogDescription>
        </DialogHeader>
        <ContactForm
          compact
          defaultSubject={`Teklif Talebi — ${productTitle}`}
          onSuccess={() => {
            // Başarıdan sonra modalı kapatma; kullanıcı onay mesajını görsün.
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
