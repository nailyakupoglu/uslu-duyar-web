/**
 * POST /api/contact — iletişim/teklif formu gönderimi.
 * Girdi: ContactInput (zod ile doğrulanır). Çıktı: { ok: true } veya hata.
 * Davranış: RESEND_API_KEY varsa e-posta gönderir; yoksa sunucu log'una yazar (graceful).
 */
import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact";
import { siteConfig } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot dolu ise bot kabul et — sessizce başarı dön (botu uyarma).
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "web@erentarim.com";

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to,
        replyTo: data.email,
        subject: data.subject?.trim() || `Yeni iletişim mesajı — ${data.name}`,
        text: [
          `Ad Soyad: ${data.name}`,
          `E-posta: ${data.email}`,
          `Telefon: ${data.phone || "-"}`,
          `Firma: ${data.company || "-"}`,
          `Konu: ${data.subject || "-"}`,
          "",
          data.message
        ].join("\n")
      });
    } catch (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } else {
    // Geliştirme/önizleme ortamı: anahtar yokken sadece logla.
    console.info("[contact] (RESEND_API_KEY tanımsız) mesaj alındı:", {
      name: data.name,
      email: data.email,
      subject: data.subject
    });
  }

  return NextResponse.json({ ok: true });
}
