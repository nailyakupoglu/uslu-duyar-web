import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, Award, Truck, Wheat, Globe2, Sprout } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background: "var(--gradient-hero)",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "6rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <p
            style={{
              color: "var(--color-accent)",
              fontSize: "0.875rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Mersin · Türkiye · 1993'ten beri
          </p>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: "20ch",
              marginBottom: "1.5rem",
              fontFamily: "Georgia, serif",
            }}
          >
            Tarladan sofraya, Mersin'den dünyaya.
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              maxWidth: "60ch",
              opacity: 0.85,
              marginBottom: "2.5rem",
            }}
          >
            Taze meyve-sebze, tahıl, baharat ve silaj üretiminde 30 yıllık
            tecrübemizle iç piyasa ve 25+ ülkeye kaliteli tedarik sağlıyoruz.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/urunler"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--color-accent)",
                color: "var(--color-ink)",
                padding: "0.875rem 1.5rem",
                borderRadius: "4px",
                fontWeight: 600,
              }}
            >
              Ürünleri İncele <ArrowRight size={18} />
            </Link>
            <Link
              href="/iletisim"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "transparent",
                color: "white",
                padding: "0.875rem 1.5rem",
                borderRadius: "4px",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              Teklif İste
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          padding: "5rem 1.5rem",
          background: "var(--color-cream)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            { n: "30+", l: "Yıllık Tecrübe", icon: <Award size={28} /> },
            { n: "25+", l: "İhraç Ülkesi", icon: <Globe2 size={28} /> },
            { n: "12K", l: "Ton / Yıl Üretim", icon: <Wheat size={28} /> },
            { n: "8", l: "Ürün Hattı", icon: <Sprout size={28} /> },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                padding: "2rem",
                background: "white",
                border: "1px solid rgba(13,69,37,0.1)",
                borderRadius: 8,
              }}
            >
              <div style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>
                {s.icon}
              </div>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  fontFamily: "Georgia, serif",
                }}
              >
                {s.n}
              </div>
              <div style={{ color: "var(--color-ink)", opacity: 0.75 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "5rem 1.5rem", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              marginBottom: "1rem",
              fontFamily: "Georgia, serif",
              color: "var(--color-primary)",
            }}
          >
            Üretim Portföyümüz
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              maxWidth: "70ch",
              opacity: 0.75,
              marginBottom: "3rem",
            }}
          >
            Değirmencilik, biber-baharat ve silaj üretiminde uçtan uca kalite
            kontrolü ile hizmet veriyoruz.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              { t: "Değirmencilik", d: "Buğday unu, mısır unu, arpa unu ve yem hammaddeleri.", icon: <Wheat size={32} /> },
              { t: "Biber & Baharat", d: "Toz biber, pul biber, isot, salça ve özel baharat karışımları.", icon: <Sprout size={32} /> },
              { t: "Silaj & Yem", d: "Mısır silajı, yonca ve buğday silajı — çiftliklere düzenli teslim.", icon: <Truck size={32} /> },
            ].map((c) => (
              <div
                key={c.t}
                style={{
                  padding: "2.5rem 2rem",
                  border: "1px solid rgba(13,69,37,0.12)",
                  borderRadius: 12,
                  background: "var(--color-cream)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
              >
                <div style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>
                  {c.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--color-primary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {c.t}
                </h3>
                <p style={{ opacity: 0.75 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        style={{
          padding: "5rem 1.5rem",
          background: "var(--gradient-hero)",
          color: "white",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              marginBottom: "1rem",
              fontFamily: "Georgia, serif",
            }}
          >
            Toptan veya ihracat teklifi isteyin
          </h2>
          <p style={{ opacity: 0.85, marginBottom: "2rem" }}>
            İhtiyacınız olan ürün, tonaj ve teslim noktasını paylaşın —
            24 saat içinde fiyat teklifimizle dönelim.
          </p>
          <Link
            href="/iletisim"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-accent)",
              color: "var(--color-ink)",
              padding: "1rem 2rem",
              borderRadius: 4,
              fontWeight: 700,
            }}
          >
            Teklif Formu <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#0a0e0a",
          color: "white",
          padding: "4rem 1.5rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                fontFamily: "Georgia, serif",
              }}
            >
              Uslu Duyar
            </div>
            <p style={{ opacity: 0.75, fontSize: "0.875rem" }}>
              Mersin merkezli değirmencilik, biber-baharat ve silaj üreticisi.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              İletişim
            </h4>
            <ul style={{ listStyle: "none", display: "grid", gap: "0.5rem", fontSize: "0.875rem", opacity: 0.85 }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Phone size={14} /> +90 324 000 00 00
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Mail size={14} /> info@usluduyar.com
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <MapPin size={14} /> Mersin Organize Sanayi Bölgesi
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Üretim
            </h4>
            <ul style={{ listStyle: "none", display: "grid", gap: "0.5rem", fontSize: "0.875rem", opacity: 0.85 }}>
              <li>Değirmencilik</li>
              <li>Biber & Baharat</li>
              <li>Silaj & Yem</li>
            </ul>
          </div>
        </div>
        <div
          style={{
            maxWidth: 1280,
            margin: "3rem auto 0",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center",
            fontSize: "0.75rem",
            opacity: 0.6,
          }}
        >
          © 2026 Uslu Duyar Tarım Ürünleri · Tüm hakları saklıdır
        </div>
      </footer>
    </main>
  );
}
