# 🌾 EREN TARIM WEB SİTESİ — BRİEF PAKETİ
**Tarih:** 24 Haziran 2026  
**Hedef:** Mersin'deki değirmenci / biberci / silaj firması için bennyfruit.com benzeri **üst seviye** kurumsal site  
**Müşteri:** Eren Tarım (veya benzer — netleşmedi)

---

## 📦 PAKET İÇERİĞİ

| # | Dosya | Açıklama |
|---|---|---|
| **00** | `00_README.md` | Bu dosya — yol haritası |
| **01** | `01_bennyfruit_analiz.md` | bennyfruit.com'un tam yapı/teknik/içerik analizi (6.6 KB) |
| **02** | `02_operator_sorulacak_bilgiler.md` | Operatörden (müşteriden) istenecek bilgi listesi (6.9 KB) |
| **03** | `03_CLAUDE_CODE_MEGA_PROMPT.md` | Claude Code'a yapıştırılacak **devasa prompt** — her animasyon, her component, her faz detaylı (21.9 KB) |

---

## 🚀 HIZLI BAŞLANGIÇ

### Adım 1 — Operatöre sor
`02_operator_sorulacak_bilgiler.md` dosyasını **müşteriye gönder** (PDF'ye çevir, WhatsApp'tan at, e-posta ile yolla). Öncelikli sorular (A, B, C, D, E, H, J bölümleri) **yanıtlanmadan** site iskeleti placeholder ile başlar ama temel içerik (ünvan, ürünler, sertifikalar, rakamlar) için bu bilgiler **ŞART**.

### Adım 2 — Claude Code'a promptu ver
```bash
mkdir -p ~/Desktop/Projects/eren-tarim
cp 03_CLAUDE_CODE_MEGA_PROMPT.md ~/Desktop/Projects/eren-tarim/CLAUDE.md
cd ~/Desktop/Projects/eren-tarim
claude
```
Claude Code otomatik `CLAUDE.md`'yi yükleyecek ve **15 faz / ~17 saatlik** işi adım adım yürütecek.

### Adım 3 — Background paralel worker (Codex)
Hafıza kuralına göre (HER proje Claude + Codex paralel):
```bash
# Terminal 2'de Codex'u arka planda başlat
codex --dangerously-bypass "$(cat 03_CLAUDE_CODE_MEGA_PROMPT.md)" &
```
İkisi paralel çalışırken `git log --oneline` ile senkronize kal, çakışma olursa merge.

### Adım 4 — Doğrula
- `pnpm dev` → http://localhost:3000
- `pnpm build && pnpm start` → prod build
- `docker build -t eren-tarim-web .`
- Coolify'da VPS 31.97.176.234'e push

---

## 📊 BENNYFRUIT vs YENİ SİTE — FARK TABLOSU

| Katman | Bennyfruit (referans) | Yeni Site (Eren Tarım) |
|---|---|---|
| Framework | Canvas HTML (jQuery + Bootstrap) | **Next.js 14 + TypeScript** |
| Animasyon | animate.css + Swiper | **Framer Motion + Embla** |
| Stil | Bootstrap utility class | **Tailwind + shadcn/ui** |
| Hotspot | jquery.hotspot.js | **react-hotspot (custom)** |
| CMS | Statik HTML | **MDX → Sanity'ye taşınabilir** |
| i18n | Manuel `/en/`, `/pl/` | **next-intl (TR + EN)** |
| Lighthouse | ~70 | **95+ hedef** |
| Animasyon sayısı | ~5 | **20+ detaylı** |
| Sayfa sayısı | 17 | **20+** |
| Dil desteği | 2 (EN/PL) | **3+ (TR/EN/AR)** |
| Deploy | Manuel FTP | **Docker + Coolify + Traefik** |
| SSL | Bilinmiyor | **Let's Encrypt otomatik** |

---

## 🎯 ANAHTAR KARARLAR (Operatör Onayı Lazım)

| Karar | Varsayılan | Alternatif |
|---|---|---|
| Domain | `erentanim.com.tr` | müşteri alan adı |
| Dil | TR + EN | + AR (Ortadoğu pazarı) |
| Hosting | Coolify VPS | başka |
| CMS | MDX dosya | Sanity / Strapi / Payload |
| Stok fotoğraf | Unsplash | Adobe Stock / özel çekim |
| Video | müşteri çekecek | stok loop |
| WhatsApp | aktif buton | sadece link |
| Çoklu dil | TR öncelikli | EN öncelikli (ihracat ağırlıklıysa) |
| Ödeme / E-ticaret | **yok** (sadece kurumsal + teklif formu) | ileride Shopify entegrasyonu |
| Blog | 3 placeholder MDX | müşteri içerik gönderecek |

---

## 📅 TAHMİNİ ZAMAN ÇİZELGESİ

| Hafta | Faz | İş |
|---|---|---|
| 1 | 1-4 | Proje kurulumu + tasarım sistemi + layout + ana sayfa |
| 2 | 5-7 | Kurumsal + üretim + ürünler sayfaları |
| 3 | 8-11 | İçerik + iletişim + SEO + yasal |
| 4 | 12-15 | Erişilebilirlik + Docker + doküman + final QA |
| 5 | - | Müşteri review + revizyon + lansman |

**Toplam:** ~4 hafta (1 geliştirici + Codex paralel)

---

## 🔗 İLGİLİ KAYNAKLAR

- **Bennyfruit analizi** → `01_bennyfruit_analiz.md`
- **Müşteri soruları** → `02_operator_sorulacak_bilgiler.md`
- **Claude Code prompt** → `03_CLAUDE_CODE_MEGA_PROMPT.md`
- **Canlı önizleme (referans):** https://www.bennyfruit.com/en
- **Coolify dashboard:** https://coolify.evohaus.org (VPS 31.97.176.234)
- **Hafıza workflow:** Hermes profile `default` → "evohaus-master-workflow" skill

---

## 💡 SONRAKI ADIM

**Müşteriyle toplantı yap, `02_operator_sorulacak_bilgiler.md`'yi gönder, 48 saat içinde A/B/C/D/E/H/J bölümleri dolu gelsin. Sonra Claude Code'u başlat.**
