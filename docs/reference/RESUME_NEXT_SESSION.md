# 🚀 CLAUDE CODE — OTURUM DEVAM DOSYASI
**Durum:** Session limit doldu (4pm TR yenileme). **HER ŞEY GÜVENDE.**  
**Sonraki oturumda Claude bu dosyayı okuyacak, kaldığı yerden devam edecek.**

---

## ✅ BİTEN İŞLER (TEKRAR YAPMA)

### Site Mimarisi — %100 TAMAM
- **74 src dosya**, **19 sayfa route**, **3 git commit**, **production build PASS** (28 route generate, 0 error)
- Tüm corporate, üretim, ürünler, blog, iletişim, kvkk, gizlilik, cerez-politikasi sayfaları yazıldı
- Tüm component mimarisi kuruldu (home, layout, motion, shared, ui, product)
- i18n (TR + EN) JSON dosyaları yazıldı
- SEO metadata + JSON-LD (Organization, Website) layout'ta
- Tailwind config: renk paleti (primary/accent/accent2/earth/cream/ink), font değişkenleri, custom keyframes
- next/font: Inter + Playfair Display + JetBrains Mono

### Build Testi ✅
- `pnpm build` başarılı, **sıfır hata sıfır uyarı**
- 28 route oluşturuldu (5 dynamic, 23 static/SSG)
- First Load JS shared: 87.2 kB (mükemmel)
- Dev server smoke test: ana sayfa + ürün detay + iletişim çalışıyor

### Codex Design Çıktısı — %100 TAMAM
- 20 dosya, 10.372 satır (DESIGN_SYSTEM.md + COMPONENTS.md + DECISIONS.md + 12 mockup HTML + eren-design.css + eren-prototype.js + PRESENTATION.html)
- Tüm CSS custom properties (renkler, gradientler, gölgeler, radius, font, spacing)
- Tasarım felsefesi: "Anatolian Harvest Modernism" — Playfair + Inter + JetBrains Mono, koyu yeşil + altın + Mersin kırmızısı + toprak kahve + krem
- Inter font-feature-settings: cv01, cv05, cv09, cv11, ss03, ss07 (talep edildiği gibi)

---

## ⏳ KALAN İŞLER (CLAUDE LIMIT YENİLENİNCE)

### 1. Codex Tasarımını Next.js'e Entegre Et (ÖNCELİKLİ)
Codex'un ürettiği `design/assets/eren-design.css` ve `design/mockups/*.html` dosyalarındaki **ek tasarım detayları** Claude'un Tailwind class'larına tam olarak yansımamış olabilir. Kontrol et:
- Hover efektleri
- Sınır animasyonları
- Belirli mikro-interaksiyonlar
- Decorative SVG patterns
- Özel section transitions

Önce `cd ~/Desktop/Projects/eren-tarim-brief && git log --oneline | head -10` ile Codex'un tam çıktısını gör.

### 2. Görsel Placeholder'lar (28 SVG)
`/public/images/placeholder/` altında 28 profesyonel SVG oluştur (hero×4, production×4, products×12, blog×4, details×4). Codex'un PHOTO_PIPELINE.md'sindeki 28 görsel için SVG placeholder tasarla (drone tarla, vals, biber, silo, TIR, vb.).

Her SVG:
- 1920×1080 veya 800×600 viewBox
- Mersin renk paleti
- Profesyonel his (gradient, subtle pattern, doku)
- Dosya adı PHOTO_PIPELINE.md'deki gibi (`drone-tarla-hasat.svg`, vb.)

### 3. Favicon + OG Image
- `public/favicon.svg` (logo)
- `public/favicon.ico`
- `public/apple-touch-icon.png` (180×180)
- `public/images/og/og-default.png` (1200×630)
- `src/app/icon.tsx` (Next.js dynamic icon)

### 4. README.md + DOCS
- `README.md`: kurulum, geliştirme, build, deploy, env değişkenleri
- `DOCS/content-update.md`: operatör rehberi (ürün ekleme, blog yazma, sertifika güncelleme)

### 5. Dockerfile + docker-compose.yml (opsiyonel, Coolify kullanacak)
```dockerfile
# Multi-stage Next.js standalone build
FROM node:22-alpine AS deps
# ... deps install
FROM node:22-alpine AS builder
# ... next build
FROM node:22-alpine AS runner
# ... standalone output
```

### 6. Lighthouse Audit + Final QA
- Chrome DevTools Lighthouse → 95+ her sayfa
- Mobile + Desktop
- CLS, LCP, INP kontrol
- prefers-reduced-motion doğrula
- Klavye navigasyonu test et
- Screen reader testi (VoiceOver)

### 7. Operator Verilerini Entegre Et
Müşteri `02_operator_sorulacak_bilgiler.md` dosyasını doldurup gönderince:
- `src/lib/data.ts` → siteConfig güncelle (gerçek unvan, slogan, telefon, e-posta)
- `src/content/products/{degirmen,biber,silaj}/*.json` → gerçek ürün verileri
- `src/content/blog/*.mdx` → müşteri içeriği
- Sertifika PDF'leri → `public/certs/`
- Logo (PNG/SVG) → `public/logos/`
- Tüm placeholder görseller müşteri fotoğraflarıyla değiştir

### 8. GitHub Private Repo + Coolify Deploy
- `gh repo create eren-tarim-web --private --org evohaus`
- `git remote add origin git@github.com:evohaus/eren-tarim-web.git`
- `git push -u origin main`
- Coolify resource oluştur: VPS 31.97.176.234, nixpacks build, env değişkenleri
- Domain: `erentarim.com.tr` (müşteri alan adı netleşince)

---

## 📂 DOSYA YAPISI REFERANSI

```
~/Desktop/Projects/
├── eren-tarim/                      ← CANLI KOD (74 dosya, git init, 3 commit)
│   ├── CLAUDE.md                    ← Otomatik yüklenen master brief
│   ├── src/                         ← 74 dosya: app/, components/, lib/, i18n/, styles/
│   ├── package.json                 ← Tüm bağımlılıklar (framer-motion, embla, next-intl, recharts, resend, react-hook-form, zod)
│   ├── tailwind.config.ts           ← Renk paleti (primary/accent/accent2/earth/cream/ink)
│   ├── next.config.mjs              ← next-intl + image domains
│   └── tsconfig.json                ← strict
│
└── eren-tarim-brief/                ← BRIEF PAKETİ (20 dosya, 10K satır)
    ├── 00_README.md
    ├── 01_bennyfruit_analiz.md
    ├── 02_operator_sorulacak_bilgiler.md
    ├── 03_CLAUDE_CODE_MEGA_PROMPT.md
    ├── design/
    │   ├── DESIGN_PHILOSOPHY.md     ← Anatolian Harvest Modernism
    │   ├── DESIGN_SYSTEM.md         ← Codex çıktısı (renkler, tipografi, components)
    │   ├── COMPONENTS.md            ← Codex çıktısı (bileşen kütüphanesi)
    │   ├── DECISIONS.md             ← Tasarım kararları
    │   ├── PHOTO_PIPELINE.md        ← 28 fotoğraf spec + Midjourney prompt
    │   ├── PRESENTATION.html        ← Müşteri sunumu
    │   ├── assets/
    │   │   ├── eren-design.css      ← 1291 satır (CSS custom properties + stiller)
    │   │   └── eren-prototype.js    ← 254 satır (slider, hotspot, marquee)
    │   └── mockups/                 ← 12 HTML mockup (525-699 satır her biri)
    ├── codex/
    │   └── CODEX_DESIGN_PROMPT.md   ← Codex worker prompt
    └── RESUME_NEXT_SESSION.md       ← BU DOSYA
```

---

## 🔄 OTURUM DEVAM PROTOKOLÜ

**Claude limit yenilenince şu adımları izle:**

1. `pwd` ile `~/Desktop/Projects/eren-tarim/` olduğunu doğrula
2. `git status && git log --oneline | head -10` — branch temiz mi kontrol et
3. `pnpm install` (gerekirse)
4. **Bu dosyayı oku**: `cat ~/Desktop/Projects/eren-tarim-brief/RESUME_NEXT_SESSION.md`
5. **Yukarıdaki "⏳ KALAN İŞLER" listesinden başla** — 1'den 8'e sırayla
6. Her büyük özellik sonrası commit at
7. Bittiğinde final rapor ver

---

## 🚨 KRİTİK HATIRLATMALAR

- **ASLA** `docker compose down` yapma
- **ASLA** mevcut dosyaları sil, sadece ekle/değiştir
- **ASLA** `npm` kullanma, `pnpm` kullan
- **HER zaman** `git commit -m "feat: ..."` veya `fix: ...` veya `chore: ...`
- **Placeholder içerik** operatörden cevap gelene kadar kalsın
- **Türkçe placeholder** her zaman anlamlı ("1993'ten bu yana Mersin'de...")
- **Lighthouse 95+** her sayfada hedef
- **MUTLAKA** mobile-first responsive test et
- **MUTLAKA** accessibility: ARIA, semantic, keyboard

---

**Hadi devam et! 🚀**
