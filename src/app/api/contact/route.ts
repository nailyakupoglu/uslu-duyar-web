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

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const key = clientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

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
  const webhookSecret = process.env.N8N_CONTACT_WEBHOOK_SECRET;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

  if (webhook) {
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (webhookSecret) {
        headers["X-Webhook-Secret"] = webhookSecret;
      }
      const res = await fetch(webhook, {
        method: "POST",
        headers,
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
