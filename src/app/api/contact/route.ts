/**
 * POST /api/contact — iletişim/teklif formu gönderimi.
 * Girdi: ContactInput (zod ile doğrulanır). Çıktı: { ok: true } veya hata.
 * Davranış: N8N_CONTACT_WEBHOOK_URL varsa n8n'e POST eder (e-posta + WhatsApp bildirimi);
 *           yoksa sunucu log'una yazar (graceful).
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

  const webhook = process.env.N8N_CONTACT_WEBHOOK_URL;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "usluduyar-web",
          to,
          // === İletişim ===
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          company: data.company || "",
          // === B2B RFQ ===
          product: data.product || "",
          quantity: data.quantity || "",
          incoterm: data.incoterm || "",
          destinationPort: data.destinationPort || "",
          destinationCountry: data.destinationCountry || "",
          buyerType: data.buyerType || "",
          // === Mesaj ===
          subject: data.subject?.trim() || `Yeni teklif talebi — ${data.name}`,
          message: data.message,
          receivedAt: new Date().toISOString(),
        })
      });
      if (!res.ok) {
        console.error("[contact] n8n webhook non-ok", res.status);
        return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
      }
    } catch (error) {
      console.error("[contact] n8n webhook error", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } else {
    // Geliştirme/önizleme ortamı: webhook yokken sadece logla.
    console.info("[contact] (N8N_CONTACT_WEBHOOK_URL tanımsız) mesaj alındı:", {
      name: data.name,
      email: data.email,
      subject: data.subject
    });
  }

  return NextResponse.json({ ok: true });
}
