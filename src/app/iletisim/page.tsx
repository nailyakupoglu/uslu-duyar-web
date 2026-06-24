import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "İletişim · Uslu Duyar",
};

export default function Iletisim() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary)", marginBottom: "2rem", fontWeight: 600 }}>
        <ArrowLeft size={16} /> Ana Sayfa
      </Link>
      <h1
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          color: "var(--color-primary)",
          marginBottom: "1.5rem",
        }}
      >
        İletişim
      </h1>
      <p style={{ fontSize: "1.125rem", opacity: 0.75, marginBottom: "2rem" }}>
        Teklif, fiyat sorusu veya iş birliği için aşağıdaki kanallardan bize ulaşın.
        24 saat içinde dönüş yapıyoruz.
      </p>

      <div style={{ display: "grid", gap: "1rem", marginBottom: "3rem" }}>
        {[
          { l: "Telefon", v: "+90 324 000 00 00" },
          { l: "WhatsApp", v: "+90 532 000 00 00" },
          { l: "E-posta", v: "info@usluduyar.com" },
          { l: "Adres", v: "Mersin Organize Sanayi Bölgesi, Mersin / Türkiye" },
        ].map((r) => (
          <div
            key={r.l}
            style={{
              padding: "1rem 1.25rem",
              background: "white",
              border: "1px solid rgba(13,69,37,0.12)",
              borderRadius: 8,
            }}
          >
            <div style={{ fontSize: "0.75rem", opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.1em" }}>{r.l}</div>
            <div style={{ fontWeight: 600, marginTop: "0.25rem" }}>{r.v}</div>
          </div>
        ))}
      </div>

      <p style={{ opacity: 0.75, fontSize: "0.875rem" }}>
        Detaylı teklif formu ve ürün kataloğu için yakında güncellenecek.
      </p>
    </main>
  );
}
