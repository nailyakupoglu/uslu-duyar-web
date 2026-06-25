/**
 * ContactForm — react-hook-form + zod tabanlı teklif/iletişim formu.
 * Prop'lar: { defaultSubject?: string, compact?: boolean, onSuccess?: () => void }.
 * Kullanım: /iletisim sayfasında ve QuoteModal içinde; /api/contact'a POST eder.
 */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/contact";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  defaultSubject?: string;
  compact?: boolean;
  onSuccess?: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ defaultSubject = "", compact = false, onSuccess }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: defaultSubject, website: "" }
  });

  async function onSubmit(values: ContactInput) {
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        throw new Error("request_failed");
      }
      setStatus("success");
      reset({ subject: defaultSubject, website: "" });
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-primary-500/30 bg-primary-50 p-8 text-center" role="status">
        <CheckCircle2 className="h-10 w-10 text-primary-700" />
        <p className="font-display text-2xl font-semibold text-primary-900">Mesajınız alındı</p>
        <p className="max-w-sm text-sm leading-6 text-ink/68">
          Talebiniz ekibimize iletildi. En kısa sürede dönüş yapacağız.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Yeni Mesaj Gönder
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <div className="grid gap-1.5">
          <Label htmlFor="cf-name">Ad Soyad *</Label>
          <Input id="cf-name" autoComplete="name" aria-invalid={Boolean(errors.name)} {...register("name")} />
          {errors.name ? <span className="text-xs text-accent2-500">{errors.name.message}</span> : null}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="cf-email">E-posta *</Label>
          <Input id="cf-email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
          {errors.email ? <span className="text-xs text-accent2-500">{errors.email.message}</span> : null}
        </div>
      </div>

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <div className="grid gap-1.5">
          <Label htmlFor="cf-phone">Telefon</Label>
          <Input id="cf-phone" type="tel" autoComplete="tel" {...register("phone")} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="cf-company">Firma</Label>
          <Input id="cf-company" autoComplete="organization" {...register("company")} />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="cf-subject">Konu</Label>
        <Input id="cf-subject" {...register("subject")} />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="cf-message">Mesajınız *</Label>
        <Textarea id="cf-message" rows={compact ? 4 : 6} aria-invalid={Boolean(errors.message)} {...register("message")} />
        {errors.message ? <span className="text-xs text-accent2-500">{errors.message.message}</span> : null}
      </div>

      {/* Honeypot — ekran dışı, kullanıcılar görmez. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Web sitesi (boş bırakın)</label>
        <input id="cf-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status === "error" ? (
        <p className="rounded-md bg-accent2-50 px-3 py-2 text-sm text-accent2-700" role="alert">
          Mesaj gönderilemedi. Lütfen tekrar deneyin veya doğrudan telefonla ulaşın.
        </p>
      ) : null}

      <Button type="submit" variant="primary" size="lg" disabled={status === "submitting"} magnetic className="mt-1">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Gönderiliyor…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Gönder
          </>
        )}
      </Button>
      <p className="text-xs leading-5 text-ink/50">
        Formu göndererek verilerinizin{" "}
        <a href="/kvkk" className="underline hover:text-primary-700">
          KVKK Aydınlatma Metni
        </a>{" "}
        kapsamında işlenmesini kabul edersiniz.
      </p>
    </form>
  );
}
