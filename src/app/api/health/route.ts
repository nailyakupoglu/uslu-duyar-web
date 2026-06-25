/**
 * GET /api/health — basit sağlık kontrolü (uptime/monitoring + Docker healthcheck).
 * Girdi: yok. Çıktı: { status: "ok", timestamp }.
 * Kullanım: load balancer / Coolify healthcheck endpoint'i.
 */
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
}
