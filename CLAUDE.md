# 🌾 USLU DUYAR — CLAUDE CODE BUILD PROMPT (MEGA-OPTİMİZE v2)
**Firma:** Uslu Duyar Tarım Ürünleri (Mersin, Türkiye)  
**Proje konumu:** `~/Desktop/Projects/uslu-duyar-web/`  
**Build:** Tek oturumda tamamla, otomatik build+test+commit, deployment-ready.

---

## 0. CONTEXT — OKUMADAN BAŞLAMA

### 0.1 Müşteri
- **Firma:** Uslu Duyar Tarım Ürünleri (Mersin, Türkiye)
- **Faaliyet:** Taze meyve-sebze + tahıl + baharat üretimi, iç piyasa + ihracat
- **Mevcut arşiv:** **88 foto (47 JPG + 40 HEIC + 1 PNG) + 11 video (10 MOV + 1 MP4)** = 99 dosya, 243 MB
  - Kaynak: `~/Desktop/Projects/Uslu Duyar/`
  - Tarih aralığı: 2019-2026 (6 yıllık arşiv), Ekim-Kasım yoğun (hasat mevsimi)
  - Kamera: 35 HEIC + 28 iPhone X + 7 iPhone 15 Pro + 12 unknown
  - 68 portrait + 19 landscape + 1 square

### 0.2 Referans: Bennyfruit + Skill Hibrit
- **Ana referans (yapısal):** https://www.bennyfruit.com/en — Canvas HTML, jQuery+Bootstrap, `#0D4525` yeşil + `#111` gradient, üretim 4'lüsü, full-screen slider, jquery.hotspot
- **Tasarım DNA karışımı:**
  - **Framer** — dark cinematic, ken burns, parallax, glassmorphism, extreme negative letter-spacing
  - **Apple** — full-bleed fotoğrafçılık, iki aşamalı light/dark section ritmi, serif + sans
  - **Stripe** — multi-layer mavi-tinted gölge, 4px köşe yarıçapı, light weight başlık
  - **Antigravity Design** — weightless, spatial depth, 3D CSS, GSAP

### 0.3 EVOHAUS Altyapısı
- **VPS:** 31.97.176.234 (Hostinger, Coolify + Traefik)
- **Container:** Coolify auto-deploy (nixpacks build, port 3000)
- **Domain:** `usluduyar.evohaus.org` (veya müşteri alan adı)
- **DB:** Self-hosted Supabase (supabase.evohaus.org), schema: `usluduyar`
- **Form:** Mevcut n8n webhook (nail.n8n.evohaus.org/webhook/...) → email + WhatsApp notify
- **GitHub:** Private repo `uslu-duyar-web` (evohaus org)
- **SSH:** `ssh -i ~/.ssh/id_ed25519_deploy root@31.97.176.234`
- **ASLA:** `docker compose down`, n8n/Coolify/Traefik'e dokunma, Evolution API logout

### 0.4 Önceki Brief Materyali (OKU)
- `~/Desktop/Projects/eren-tarim-brief/01_bennyfruit_analiz.md` — Bennyfruit tam analiz
- `~/Desktop/Projects/eren-tarim-brief/design/DESIGN_SYSTEM.md` (624 satır) — token'lar
- `~/Desktop/Projects/eren-tarim-brief/design/COMPONENTS.md` (976 satır) — bileşen kütüphanesi
- `~/Desktop/Projects/eren-tarim-brief/design/DECISIONS.md` — tasarım kararları
- `~/Desktop/Projects/eren-tarim-brief/design/PHOTO_PIPELINE.md` — Midjourney prompt (artık gerçek foto var)
- `~/Desktop/Projects/eren-tarim-brief/design/mockups/*.html` (12 sayfa)
- `~/Desktop/Projects/eren-tarim/` — Önceki **Eren Tarım** (değirmenci/biberci) build'i (74 src dosya, build PASS) — **referans olarak kullan, Uslu Duyar'a uyarla**

### 0.5 Skill'lerden Faydalan
- `popular-web-designs` (Stripe/Apple/Framer templates)
- `antigravity-design-expert` (weightless, spatial, glassmorphism)
- `frontend-design` (typography, color, motion)
- `canvas-design` (görsel hiyerarşi)
- `brand-guidelines` (Mersin/Tarım teması)
- `tailwind-design-system`
- `radix-ui-design-system`

---

## 1. TECH STACK — KESİN

```yaml
Framework: Next.js 15 (App Router) + TypeScript strict
Styling: Tailwind CSS v4 + CSS variables for tokens
UI primitives: shadcn/ui (Button, Accordion, Dialog, Sheet, NavigationMenu)
Animation: motion (Framer Motion v11)
Smooth scroll: lenis (@studio-freight/lenis)
Carousels: embla-carousel-react + embla-carousel-autoplay
Icons: lucide-react
i18n: next-intl (locales: tr default + en, /[locale]/ routing)
Forms: react-hook-form + zod
Images: next/image everywhere (placeholder="blur" blur-up)
Fonts: next/font — Playfair Display (display) + Inter (body) + JetBrains Mono
Maps: Google Maps embed iframe (lightweight)
Package manager: pnpm (ASLA npm)
Lint: ESLint + Prettier
```

---

## 2. RENK PALETİ (Uslu Duyar — Premium Sıcak)

```css
:root {
  /* Primary — Koyu Toprak Yeşili */
  --color-primary: #0D4525;
  --color-primary-dark: #062818;
  --color-primary-light: #3D8B5E;

  /* Accent — Hasat Altını (buğday, baharat) */
  --color-accent: #D4A017;
  --color-accent-dark: #9C7A0C;

  /* Accent2 — Mersin Kırmızısı (biber) */
  --color-accent2: #C0392B;
  --color-accent2-dark: #8B2820;

  /* Earth — Toprak Kahve */
  --color-earth: #8B4513;
  --color-earth-dark: #5C2D0E;

  /* Surface — Premium Krem */
  --color-cream: #FAF7F2;
  --color-surface: #F6F7F4;

  /* Ink — Koyu Metin */
  --color-ink: #0E0E0E;
  --color-muted: #6F756E;

  /* Line — İnce Çerçeveler */
  --color-line: rgba(13, 69, 37, 0.14);

  /* Gradient'ler */
  --gradient-hero: linear-gradient(112.14deg, #0D4525 0%, #111 100%);
  --gradient-cta: linear-gradient(135deg, #0D4525 0%, #062818 100%);
  --gradient-earth: linear-gradient(135deg, rgba(212, 160, 23, 0.24), rgba(192, 57, 43, 0.18));

  /* Gölgeler — Stripe-tarzı multi-layer */
  --shadow-1: rgba(23, 23, 23, 0.06) 0px 3px 6px;
  --shadow-2: rgba(23, 23, 23, 0.08) 0px 15px 35px 0px;
  --shadow-3: rgba(50, 50, 93, 0.25) 0px 30px 45px -30px,
              rgba(0, 0, 0, 0.1) 0px 18px 36px -18px;
  --shadow-4: rgba(3, 3, 39, 0.25) 0px 14px 21px -14px,
              rgba(0, 0, 0, 0.1) 0px 8px 17px -8px;

  /* Radius — Stripe-tarzı sıkı */
  --radius-sm: 4px;      /* buton */
  --radius-md: 8px;      /* kart */
  --radius-lg: 16px;     /* hero görsel */
  --radius-xl: 24px;     /* modal */
  --radius-full: 9999px; /* pill */

  /* Font ailesi */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing — 8px base */
  --space-1: 0.25rem; --space-2: 0.5rem; --space-4: 1rem;
  --space-6: 1.5rem; --space-8: 2rem; --space-12: 3rem;
  --space-16: 4rem; --space-24: 6rem; --container: 1280px;
}
```

**Tailwind config (tailwind.config.ts) — colors:**
```ts
colors: {
  primary: { 50:'#F0F7F2', 500:'#3D8B5E', 700:'#0D4525', 900:'#062818' },
  accent:  { 50:'#FBF5E6', 500:'#D4A017', 700:'#9C7A0C' },
  accent2: { 50:'#FBE9E7', 500:'#C0392B', 700:'#8B2820' },
  earth:   { 50:'#F5EFE6', 500:'#8B4513', 700:'#5C2D0E' },
  cream:   '#FAF7F2',
  surface: '#F6F7F4',
  ink:     '#0E0E0E',
}
```

---

## 3. 88 FOTO + 11 VİDEO PIPELINE (ZORUNLU)

### 3.1 Kaynak → Hedef

**Script hazır:** `~/Desktop/Projects/Uslu Duyar/optimize.sh` — Claude bunu çalıştıracak.

```bash
bash ~/Desktop/Projects/"Uslu Duyar"/optimize.sh
```

**Hedef klasör:** `~/Desktop/Projects/uslu-duyar-web/public/media/`

```
public/media/
├── photos/
│   ├── original/      # HEIC→JPG dönüşmüş + orijinal JPG (87 dosya, ~120 MB)
│   ├── optimized/     # Web: 1920px max, q=82, interlaced (~30 MB)
│   └── thumbnails/    # Grid: 480px max, q=78 (~8 MB)
├── videos/
│   └── optimized/     # MP4 H.264 720p, AAC 128k, faststart (~50 MB)
├── manifest.json      # EXIF + kategori metadata
└── README.md
```

### 3.2 Pipeline Adımları

1. **HEIC → JPG:** `magick INPUT.HEIC -resize 1920x1920\> -quality 92 OUTPUT.jpg`
2. **JPG kopyala:** `cp` orijinal
3. **Web optimize:** `magick -resize 1920x1920\> -quality 82 -strip -interlace Plane`
4. **Thumbnail:** `magick -resize 480x480\> -quality 78 -strip`
5. **MOV → MP4:** `ffmpeg -i INPUT.MOV -c:v libx264 -preset slow -crf 22 -vf "scale=1280:720:force_original_aspect_ratio=decrease" -c:a aac -b:a 128k -movflags +faststart OUTPUT.mp4`
6. **MP4 kopyala** (zaten web-ready olabilir, kontrol et)
7. **manifest.json üret:** Her dosya için `{ id, original, optimized, thumbnail, width, height, sizeKb, date, category, caption }`

### 3.3 Kategorizasyon (Claude SEN YAP — fotoğraflara bakarak)

**Önce `file:///tmp/uslu_all_preview/index.html` browser'da aç, 87 fotoğrafı gör, kategorize et.**

88 fotoğrafı şu kategorilere dağıt (yaklaşık sayılarla):

| Kategori | Tahmini | Kullanım |
|---|---|---|
| **hero** | 5-7 | Hero slider (4-5 slide) — drone tarla, tesis drone, ürün close-up, hasat, ihracat |
| **facility** | 10-15 | Üretim 4'lüsü (Tesis, Kapasite, Lojistik kartları) |
| **product** | 25-30 | Ürün showcase (değirmencilik, biber-baharat, silaj ürünleri) |
| **team** | 5-8 | Hakkımızda (yönetim, ekip, ofis) |
| **field** | 10-15 | Tarla/hasat (drone, makine, ürün tarlada) |
| **truck** | 5-8 | Lojistik (TIR, nakliye, depolama, liman) |
| **lab** | 3-5 | Kalite kontrol / laboratuvar / sertifika |
| **other** | 5-10 | Diğer (logo, tabela, doküman) |

**Not:** 11 videonun **en büyük 1-2 tanesini hero'da loop** olarak kullan (autoplay muted), diğerlerini "saha hikayesi" bölümünde.

### 3.4 Manifest.json Şeması

```json
{
  "generated": "2026-06-24T16:30:00+03:00",
  "source": "~/Desktop/Projects/Uslu Duyar/",
  "total_photos": 87,
  "total_videos": 11,
  "categories": {
    "hero": ["photo-001.jpg", "photo-002.jpg", ...],
    "facility": [...],
    "product": [...],
    "team": [...],
    "field": [...],
    "truck": [...],
    "lab": [...],
    "other": [...]
  },
  "media": [
    {
      "id": "photo-001",
      "type": "photo",
      "originalName": "IMG_4265.jpg",
      "category": "hero",
      "caption": "Drone tarla hasat görünümü",
      "optimized": "/photos/optimized/photo-001.jpg",
      "thumbnail": "/photos/thumbnails/photo-001.jpg",
      "width": 4032,
      "height": 3024,
      "sizeKb": 4213,
      "date": "2023-07-21",
      "exif": { "make": "Apple", "model": "iPhone X" }
    }
  ]
}
```

---

## 4. SİTE HARİTASI

```
/                                 Home (hero slider + 10 section)
/corporate                        Hub
/corporate/about-us               Hakkımızda (timeline)
/corporate/quality-policy         Kalite Politikası
/corporate/vision-mission         Vizyon & Misyon
/corporate/sustainability         Sürdürülebilirlik
/products                         Grid (8-12 ürün, kategori filtre)
/products/[slug]                  Detay (galeri, specs, related)
/production                       Hub
/production/certificates          Sertifikalar (lightbox + download)
/production/warehouse             Depo/Tesis (galeri)
/production/capacity              Kapasite (animasyonlu sayaçlar)
/production/logistics             Lojistik (timeline + harita)
/contact                          Form (n8n webhook) + harita
/blog                             Blog listesi (MDX)
/blog/[slug]                      Blog detay
/kvkk, /gizlilik, /cerez-politikasi
```

---

## 5. SAYFA BİLEŞENLERİ

### 5.1 Global Layout
- **Header:** sticky, scroll shrink (>80px), mega-menu (Corporate/Products/Production dropdowns), TR/EN switcher, "Teklif Al" CTA pill, mobile Sheet menu
- **Footer:** dark (ink bg), 4 sütun (Logo+İletişim / Hızlı Linkler / Ürünler / Sosyal), copyright, "Designed by EVOHAUS" credit
- **SmoothScrollProvider** (Lenis), **ScrollProgressBar** (top, brand), **PageTransition** (AnimatePresence fade+slide), **Reveal** helper (whileInView stagger), **WhatsAppFloat** (env), **LanguageSwitcher**

### 5.2 Home Sections (10 bölüm)
1. **Hero Slider** — 100svh, Embla autoplay (6500ms), 4-5 slide (video + photo mix), Ken Burns zoom, dark gradient scrim, eyebrow + display headline (kelime kelime stagger), 2 CTA butonu (primary + ghost), slide progress bars + prev/next, bounce scroll cue
2. **Intro / Value Strip** — 3-4 icon feature (Freshness / Quality Certified / Global Logistics / Sustainable), reveal-up
3. **Featured Products** — 6-9 ürün kartı, staggered entrance, hover (image scale 1.05 + overlay + category slide-up + 3D tilt 4deg)
4. **Capacity Band** — full-bleed parallax, animasyonlu sayaçlar (örn "12,000 t/year", "8 product lines", "25+ countries"), count-up on in-view
5. **Production Quad** — 4 büyük parallax kart (Certificates/Warehouse/Capacity/Logistics), hover zoom + arrow nudge
6. **Certificates Marquee** — infinite horizontal auto-scroll, pause on hover, 6-8 logo
7. **Saha Hikayesi / Video Grid** — 11 videodan 3-4 öne çıkan, tıklanınca modal lightbox
8. **Stats Counter** — 4 büyük rakam (count-up), icon + label
9. **Blog Teasers** — son 3 yazı (MDX'ten otomatik)
10. **CTA Banner** — bold closing call + "Teklif Al" butonu, gradient bg

### 5.3 Products (Grid + Detail)
- **Grid:** kategori filter pills (Değirmencilik / Biber-Baharat / Silaj-Yem), Framer layout animation (reflow smoothly), 8-12 kart
- **Detail:** breadcrumb, sol galeri (Embla thumbs + main, click → zoom Dialog), sağ name+eyebrow+desc+spec accordion (Varieties, Season, Calibre, Packaging, Shelf life), "Bu Ürün İçin Teklif İste" sticky CTA (?product=slug), Related products carousel

### 5.4 Production
- **Certificates:** logo grid (lightbox PDF), download button
- **Warehouse:** masonry gallery, lightbox, kısa metin
- **Capacity:** big animasyonlu sayaçlar + bar visual (CSS animate width 0→X on view)
- **Logistics:** vertical/horizontal timeline (Harvest → Sorting → Packing → Cold Storage → Shipping), reveal sequentially + connecting line draw-in, fleet/reach, world map (animated pins)

### 5.5 Contact
- Sol: şirket bilgisi (adres, telefon, e-posta, çalışma saatleri, sosyal) + Google Maps embed
- Sağ: form (Name, Company, Email, Phone, Country, Product select, Message), RHF + Zod, animated labels, success/error states, POST → n8n webhook env

### 5.6 Corporate + Sustainability
- Hakkımızda: timeline (horizontal scroll, sticky year markers), yönetim kurulu grid, "Neden Biz" 6 madde
- Kalite Politikası: accordion + numbered principles
- Vizyon & Misyon: 2 büyük kart + 5 yıllık strateji timeline
- Sürdürülebilirlik: recharts carbon/water charts, yerel çiftçi destek programı

---

## 6. ANİMASYON SPESİFİKASYONU (TÜM UYGULA)

**Global:**
- Lenis smooth scroll (synced to Framer useScroll)
- Top scroll-progress bar (brand color)
- Sticky header shrink + bg swap on scroll
- Reveal pattern: y 24→0, opacity 0→1, stagger 0.08s
- Parallax hero/full-bleed (useTransform y/scale)
- Smooth page transitions (fade + slide)
- First-load splash (~1.2s, skippable)

**Hero:**
- Ken Burns slow zoom (scale 1→1.08, 12s linear)
- Headline word-by-word stagger (0.05s delay)
- Slide progress bars (animate width per duration)
- Bouncing scroll cue

**Cards:**
- Hover: image scale 1.05 + overlay + category slide-up + arrow nudge
- 3D tilt toward cursor (rotateX/Y 4-6deg)
- Staggered entrance

**Detail:**
- Gallery thumbnail crossfade
- Lightbox zoom/pan
- Spec accordion smooth height

**Stats:**
- Count-up on in-view (motion animate + useInView, format with thousands)
- Bar width 0→X

**Production:**
- Marquee infinite (pause on hover)
- Timeline sequential reveal + connecting line draw-in
- Map pins drop/pulse

**Micro:**
- Buttons: fill-sweep hover, arrow translate
- Links: underline left→right
- Images: blur-up load
- Form: focus ring animation, label float, success check-draw SVG
- Footer socials: hover lift

**prefers-reduced-motion:** Tüm transform/parallax/marquee KAPALI, sadece opacity fade.

---

## 7. RESPONSIVE

Mobile-first. Breakpoints: sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536.
Hero: 100svh (mobile-safe). Embla touch drag. Tap target ≥44px.
Grid: 1col mobile → 2 md → 3 lg → 4 xl. Nav: full-screen sheet.
Test: 360px, 768px, 1280px, 1920px.

---

## 8. PERFORMANCE / SEO / A11Y

**Lighthouse ≥90** (Perf/SEO/BP/A11y), CLS ≈ 0.
- `next/image` everywhere, `priority` hero only, `sizes` correct
- Per-route `generateMetadata` (title, desc, OG image, canonical, hreflang tr/en)
- `sitemap.ts` + `robots.ts`
- JSON-LD: Organization + Product (ürün detay) + Article (blog) + BreadcrumbList
- Semantic HTML, alt text, keyboard nav, visible focus, ARIA on accordion/dialog/carousel
- Self-host fonts (no layout shift)
- Code-split heavy bits

---

## 9. i18n (next-intl)

- Locales `tr` (default) + `en`, `/tr/...` ve `/en/...`
- UI strings: `messages/tr.json` + `messages/en.json`
- Content: `content/*.tr.ts` / `*.en.ts` (products, pages, site)
- LanguageSwitcher preserves path
- `<html lang>` per locale

---

## 10. DOSYA YAPISI

```
~/Desktop/Projects/uslu-duyar-web/
├── CLAUDE.md (bu dosya)
├── README.md
├── package.json + pnpm-lock.yaml + tsconfig.json
├── next.config.ts (output: 'standalone', images domains)
├── tailwind.config.ts + postcss.config.mjs
├── .env.example
├── Dockerfile (multi-stage node:20-alpine)
├── docker-compose.yml (Coolify için minimal)
├── middleware.ts (next-intl locale detection)
├── i18n.ts (next-intl config)
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx (Header, Footer, providers, metadata)
│   │   │   ├── page.tsx (Home)
│   │   │   ├── corporate/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── about-us/page.tsx
│   │   │   │   ├── quality-policy/page.tsx
│   │   │   │   ├── vision-mission/page.tsx
│   │   │   │   └── sustainability/page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── production/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── certificates/page.tsx
│   │   │   │   ├── warehouse/page.tsx
│   │   │   │   ├── capacity/page.tsx
│   │   │   │   └── logistics/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── kvkk/page.tsx
│   │   │   ├── gizlilik/page.tsx
│   │   │   └── cerez-politikasi/page.tsx
│   │   ├── api/
│   │   │   └── contact/route.ts (POST → n8n webhook)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── globals.css (tokens + Tailwind v4 @theme)
│   ├── components/
│   │   ├── layout/ (header, footer, mobile-menu, language-switcher, whatsapp-float)
│   │   ├── sections/ (hero-slider, intro-features, featured-products, capacity-band,
│   │   │             certificates-marquee, cta-banner, product-gallery, spec-accordion,
│   │   │             stats-counter, logistics-timeline, contact-form, page-hero,
│   │   │             video-grid, value-strip, production-quad)
│   │   ├── ui/ (shadcn restyled: button, accordion, dialog, sheet, navigation-menu, …)
│   │   ├── motion/ (smooth-scroll-provider, page-transition, reveal, scroll-progress,
│   │   │            count-up, tilt-card, splash, parallax)
│   │   └── shared/ (container, section-eyebrow, breadcrumb, image-with-skeleton)
│   ├── content/
│   │   ├── products.tr.ts / products.en.ts
│   │   ├── pages.tr.ts / pages.en.ts
│   │   ├── site.ts (company info, socials, stats, nav)
│   │   └── categories.tr.ts / categories.en.ts
│   ├── messages/ (tr.json, en.json)
│   ├── lib/ (utils.ts, motion-presets.ts, validators.ts, manifest-reader.ts)
│   ├── types/ (product.ts, page.ts, media.ts)
│   └── styles/ (globals.css)
└── public/
    ├── media/ (88 foto + 11 video, optimize.sh sonrası)
    │   ├── photos/{original,optimized,thumbnails}/
    │   ├── videos/optimized/
    │   ├── manifest.json
    │   └── README.md
    ├── logos/ (logo SVG/PNG, dark, light, favicon)
    ├── certs/ (sertifika PDF'leri - placeholder)
    └── og-default.png (1200x630)
```

---

## 11. CONTENT / PLACEHOLDER STRATEJİSİ

**`content/site.ts`** — tek edit noktası:
```ts
export const siteConfig = {
  name: 'Uslu Duyar',
  legalName: 'Uslu Duyar Tarım Ürünleri Ltd. Şti.',
  slogan: 'Mersin\'den Hasat, Dünyaya Lezzet',
  description: '...',
  url: 'https://usluduyar.evohaus.org',
  // Logo (SVG/PNG) → public/logos/
  address: 'Mersin Organize Sanayi Bölgesi, Mersin / Türkiye',
  phones: { main: '+90 324 000 00 00', whatsapp: '+90 532 000 00 00' },
  emails: { info: 'info@usluduyar.com', sales: 'satis@usluduyar.com' },
  socials: { instagram: '...', linkedin: '...', facebook: '...', youtube: '...' },
  stats: { yearsFounded: 30, countriesExport: 25, annualTons: 12000, productLines: 8 },
  legal: { companyCode: '...', vatCode: '...', mersisNo: '...' },
  nav: { corporate: [...], production: [...], products: [...] },
}
```

**`content/products.tr.ts` / `.en.ts`** — ürün verisi, manifest.json'dan görsel referansları.

**Placeholder İçerik:** Tüm metin anlamlı Türkçe (Lorem ipsum YASAK). Örnek: "1996'dan bu yana Mersin ovasında..."

---

## 12. ÇALIŞMA PLANI (Claude BU SIRAYLA YAP)

### Faz 0 — Setup (5 dk)
1. `pwd` → `~/Desktop/Projects/uslu-duyar-web/`
2. CLAUDE.md oku (bu dosya)
3. Önceki **Eren Tarım** build'ini kontrol: `ls ~/Desktop/Projects/eren-tarim/` (referans olarak kullanılacak)
4. Optimize.sh'i çalıştır: `bash ~/Desktop/Projects/"Uslu Duyar"/optimize.sh` (88 foto + 11 video pipeline)
5. pnpm create next-app: `pnpm create next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --use-pnpm`
6. Tüm deps kur (yukarıdaki stack)
7. İlk commit

### Faz 1 — Design System (15 dk)
- tailwind.config.ts (renkler, font değişkenleri, custom keyframes)
- globals.css (CSS variables, font import, base layer, prefers-reduced-motion)
- app/[locale]/layout.tsx (Inter + Playfair + JetBrains Mono, full metadata, JSON-LD, skip-to-content)
- components/ui/* (shadcn extended: button, accordion, dialog, sheet, navigation-menu, tabs)
- components/motion/* (SmoothScrollProvider, Reveal, ScrollProgress, PageTransition, CountUp, TiltCard, Splash)
- components/shared/* (Container, SectionEyebrow, ImageWithSkeleton, Breadcrumb)

### Faz 2 — Layout (10 dk)
- Header (sticky, scroll shrink, mega-menu, mobile Sheet, language switcher)
- Footer (gradient, 4 sütun)
- WhatsAppFloat, ScrollProgress

### Faz 3 — i18n + Middleware (5 dk)
- middleware.ts, i18n.ts, messages/tr.json + en.json
- content/site.ts, content/categories.tr/en.ts

### Faz 4 — Home Page (30 dk) ⭐ EN KRİTİK
- HeroSlider (video + photo, Ken Burns, stagger headline)
- IntroFeatures, FeaturedProducts, CapacityBand (parallax + count-up)
- ProductionQuad, CertificatesMarquee, VideoGrid
- StatsCounter, BlogTeasers, CtaBanner

### Faz 5 — Products (20 dk)
- /products (grid + filter pills + layout animation)
- /products/[slug] (gallery + specs + related + sticky CTA)
- 4 placeholder ürün kartı (değirmen unu, kırmızı toz biber, mısır silajı, biber salçası)

### Faz 6 — Production (20 dk)
- Hub + 4 sub-page (Certificates, Warehouse, Capacity, Logistics)
- Masonry gallery, animated stats bars, timeline

### Faz 7 — Corporate (15 dk)
- Hub + 4 sub-page (About, Quality, Vision, Sustainability)
- Timeline, accordion, charts

### Faz 8 — Blog + Contact + Legal (15 dk)
- /blog + /blog/[slug] (MDX, 3 placeholder yazı)
- /contact (form + map)
- /kvkk, /gizlilik, /cerez-politikasi

### Faz 9 — API + SEO + A11y (10 dk)
- /api/contact route (POST → n8n webhook)
- sitemap.ts, robots.ts
- JSON-LD (Organization + Product)
- generateMetadata per route
- prefers-reduced-motion pass, keyboard nav, ARIA

### Faz 10 — Logo + Favicon + OG (10 dk)
- SVG logo oluştur (Uslu Duyar marka) — Mersin renkleri, serif+modern
- favicon.svg + favicon.ico
- apple-touch-icon.png (180×180)
- og-default.png (1200×630)
- app/icon.tsx (Next.js dynamic)

### Faz 11 — Dockerfile + README (10 dk)
- Multi-stage Dockerfile (node:20-alpine, output: standalone)
- .dockerignore
- docker-compose.yml (minimal, Coolify'e bırak)
- README.md (kurulum, deploy, env)
- .env.example (NEXT_PUBLIC_*)

### Faz 12 — Final QA (10 dk)
- `pnpm build` PASS
- `pnpm dev` → http://localhost:3000 → ana sayfa + her route test
- Lighthouse 90+ (en az 1 sayfa)
- Görsel kontrol: 88 fotoğrafın manifest.json ile eşleşmesi

### Faz 13 — Git Commit + Summary (5 dk)
- Tüm değişiklikleri commit et
- Final rapor: dosya sayısı, satır sayısı, Lighthouse, build durumu

---

## 13. KABUL KRİTERLERİ

- [ ] Tüm route'lar tr/en render (no console error)
- [ ] 88 fotoğraf manifest.json'da, optimize edilmiş (1920px q=82), thumbnail (480px)
- [ ] 11 video MP4 (720p, faststart), 1-2 hero'da loop
- [ ] Hero slider (4-5 slide, video+photo mix) Ken Burns + word stagger
- [ ] Production quad (4 parallax kart), capacity band parallax
- [ ] Certificates marquee infinite scroll
- [ ] Stats count-up on in-view, capacity bars animate width
- [ ] Logistics timeline sequential reveal + line draw-in
- [ ] Product grid filter + detail gallery + lightbox + spec accordion
- [ ] Contact form RHF + Zod + POST n8n webhook + success/error states
- [ ] Lenis smooth scroll synced to Framer useScroll
- [ ] Splash screen first load (~1.2s, skippable)
- [ ] prefers-reduced-motion KAPALI: parallax/marquee/tilt
- [ ] Lighthouse 90+ Performance/SEO/BP/A11y
- [ ] Multi-language (tr/en) with next-intl
- [ ] Responsive 360/768/1280/1920
- [ ] Accessibility: semantic HTML, ARIA, keyboard, focus visible
- [ ] SEO: per-route metadata, sitemap, robots, JSON-LD, OG
- [ ] Docker: multi-stage build, port 3000
- [ ] Git: private repo, evohaus org
- [ ] Final: README + .env.example + CHANGELOG

---

## 14. KRİTİK KURALLAR

**ASLA:**
- jQuery, Bootstrap, Swiper, magnific-popup YAPMA
- Lorem ipsum placeholder YAPMA
- "any" type YAPMA
- `npm` kullanma (sadece pnpm)
- `docker compose down` YAPMA
- n8n/Coolify/Traefik'e DOKUNMA
- Tailwind default template görünümü YAPMA
- Stok görsel linki BIRAKMA

**HER ZAMAN:**
- Mobile-first responsive
- TypeScript strict, "any" yok
- Semantic HTML + ARIA + keyboard
- Her dosyada 3 satır yorum (amaç, prop'lar, kullanım)
- Framer Motion animasyon
- Lenis smooth scroll
- next/image priority (sadece hero LCP)
- prefers-reduced-motion kontrolü
- Anlamlı Türkçe placeholder
- Git commit her büyük adımda
- `git log --oneline` ile Codex kontrol (paralel worker varsa)

**Erişilebilirlik:**
- Skip-to-content link (layout.tsx)
- Focus visible (ring-2 ring-primary)
- ARIA labels (nav, dialog, accordion)
- Alt text her görselde
- Tab/Enter/Esc keyboard nav
- prefers-reduced-motion disable

---

## 15. BAŞLA

İlk adım:
```bash
cd ~/Desktop/Projects/uslu-duyar-web
pwd
ls ~/Desktop/Projects/eren-tarim/  # template kontrol
bash ~/Desktop/Projects/"Uslu Duyar"/optimize.sh  # 88 foto + 11 video pipeline
pnpm create next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --use-pnpm
```

Sonra Faz 1-13'ü sırayla execute et. Her fazda **çalışır kod**, **eksiksiz dosya**, **her component tam**. Bitince özet rapor.

**Hadi başla prof! 🚀**
