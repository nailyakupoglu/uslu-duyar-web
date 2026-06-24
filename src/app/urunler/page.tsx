import Link from "next/link";
import { ArrowLeft, Wheat, Sprout } from "lucide-react";

export const metadata = {
  title: "Ürünler · Uslu Duyar",
};

const products = [
  { cat: "Değirmencilik", name: "Buğday Unu", desc: "Ekmek, pide, lavaş ve endüstriyel hamur ürünleri için farklı protein/kül değerleriyle." },
  { cat: "Değirmencilik", name: "Mısır Unu", desc: "Doğal mısır unu, glutensiz karışımlar için ideal." },
  { cat: "Değirmencilik", name: "Arpa Unu", desc: "Yem hammaddesi ve geleneksel un karışımları için." },
  { cat: "Biber & Baharat", name: "Kırmızı Toz Biber", desc: "Mersin kırmızı biberi, güneşte kurutulmuş, taş değirmen öğütme." },
  { cat: "Biber & Baharat", name: "Pul Biber", desc: "İri öğütülmüş, kokusunu koruyan özel paketleme." },
  { cat: "Biber & Baharat", name: "Biber Salçası", desc: "Geleneksel yöntem, teneke ve kavanoz ambalaj seçenekleri." },
  { cat: "Silaj & Yem", name: "Mısır Silajı", desc: "Süt hayvancılığı için ideal, kontrollü fermantasyon." },
  { cat: "Silaj & Yem", name: "Yonca Silajı", desc: "Balya ve dökme seçenekleri, düzenli teslim." },
];

export default function Urunler() {
  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary)", marginBottom: "2rem", fontWeight: 600 }}>
        <ArrowLeft size={16} /> Ana Sayfa
      </Link>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "Georgia, serif", color: "var(--color-primary)", marginBottom: "1rem" }}>
        Ürün Portföyümüz
      </h1>
      <p style={{ fontSize: "1.125rem", opacity: 0.75, marginBottom: "3rem", maxWidth: "70ch" }}>
        Üç ana üretim hattımız: değirmencilik ürünleri, biber-baharat çeşitleri
        ve silaj-yem hammaddeleri. Toptan ve ihracat için teklif alın.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {products.map((p) => (
          <article key={p.name} style={{ padding: "1.75rem", background: "white", border: "1px solid rgba(13,69,37,0.12)", borderRadius: 8 }}>
            <div style={{ fontSize: "0.75rem", color: "var(--color-primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
              {p.cat}
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--color-ink)" }}>{p.name}</h2>
            <p style={{ opacity: 0.7, fontSize: "0.95rem" }}>{p.desc}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
