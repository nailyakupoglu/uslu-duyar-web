# 🚀 CLAUDE CODE İÇİN MEGA PROMPT — MERSİN DEĞİRMENCİ/BİBERCİ/EREN TARIM
**Versiyon:** 1.0 — 24 Haziran 2026  
**Kaynak referans:** https://www.bennyfruit.com (tam analiz için `01_bennyfruit_analiz.md` oku)  
**Bilgi listesi:** `02_operator_sorulacak_bilgiler.md` (operatörden cevaplar gelecek, placeholder'lar kullan)

> Bu prompt **tek parça** olarak Claude Code'a yapıştırılacak (veya dosyadan `claude` komutuyla okutulacak).
> Claude Code aşağıdaki tüm adımları sırasıyla execute edecek, dosya yapısını kuracak, kodu yazacak, derleyecek, test edecek ve teslim edecek.

---

```markdown
# ROLE & CONTEXT
Sen kıdemli bir full-stack web geliştiricisin. Aşağıdaki gereksinimlere göre **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + shadcn/ui** ile **üst seviye, premium görünümlü, çok dilli, SEO uyumlu** bir kurumsal web sitesi kuracaksın. Referans site https://www.bennyfruit.com (Polonyalı meyve-sebze ihracatçısı) — yapı, hiyerarşi, sayfa bölümleri, görsel ağırlıklı anlatım, üretim 4'lüsü (Certificates/Warehouse/Capacity/Logistics), ürün grid'i, footer koyu gradient referans alınacak. **JQuery/Bootstrap KULLANMA** — modern React stack zorunlu.

Müşteri profili: Mersin merkezli, hem iç piyasa hem ihracat yapan, **değirmencilik (un, yem), bibercilik (toz biber, pul biber, isot, salça), baharat ve silaj** alanlarında faaliyet gösteren köklü bir Türk tarım firmasıdır. Bu üç dikey **ana sayfada 3 ayrı mega bölüm** olarak sunulacak.

# STACK — KESİN
- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript strict
- **Styling:** Tailwind CSS 3.4 + shadcn/ui + tailwindcss-animate
- **Animation:** Framer Motion 11 (parallax, fade-up, stagger, scroll-triggered)
- **Carousel:** Embla Carousel (React) — Swiper yok
- **Forms:** react-hook-form + zod
- **i18n:** next-intl (TR varsayılan, EN opsiyonel — kod yaz, aktif/pasif config'den)
- **Content:** MDX (blog için) — dosya tabanlı, CMS gerektirmez (ileride Sanity'ye taşınabilir yapı)
- **Icons:** lucide-react
- **Fonts:** next/font ile Inter (gövde) + Playfair Display (başlık) — Google Fonts
- **Image:** next/image + unjs/ipx optimizasyonu, AVIF/WebP otomatik
- **CMS:** Şimdilik MDX dosyaları; ileride Sanity için lib/cms/ adapter pattern'i yaz
- **Email:** Resend (form submission → info@erentanim.com)
- **Analytics:** GA4 + Plausible (env'den seçilebilir)
- **Lighthouse hedefi:** 95+ her kategoride (mobile + desktop)
- **Klasör yapısı:** src/ → app/, components/, content/, lib/, i18n/, styles/
- **Package manager:** pnpm (npm değil)

# RENK PALETİ (tailwind.config.ts)
- primary (yeşil): { 50:'#F0F7F2', 500:'#3D8B5E', 700:'#0D4525', 900:'#062818' }  ← Bennyfruit ana rengi
- accent (altın):  { 50:'#FBF5E6', 500:'#D4A017', 700:'#9C7A0C' }  ← buğday/baharat
- accent2 (kırmızı): { 50:'#FBE9E7', 500:'#C0392B', 700:'#8B2820' }  ← toz biber
- earth (toprak): { 50:'#F5EFE6', 500:'#8B4513', 700:'#5C2D0E' }
- cream: '#FAF7F2'  ← premium açık arkaplan
- ink: '#0E0E0E'   ← koyu metin
- Hero gradient: `linear-gradient(112.14deg, #0D4525 0%, #111 100%)`

# SAYFA MİMARİSİ
```
src/app/
├── layout.tsx              (root — header, footer, theme provider, fonts)
├── page.tsx                (ana sayfa)
├── [locale]/               (i18n aktifse)
├── corporate/
│   ├── page.tsx            (about cluster index)
│   ├── hakkimizda/page.tsx
│   ├── kalite-politikasi/page.tsx
│   ├── vizyon-misyon/page.tsx
│   └── surdurulebilirlik/page.tsx
├── uretim/
│   ├── page.tsx            (üretim 4'lüsü index — Sertifikalar / Tesis / Kapasite / Lojistik)
│   ├── sertifikalar/page.tsx
│   ├── tesis/page.tsx
│   ├── kapasite/page.tsx
│   └── lojistik/page.tsx
├── urunler/
│   ├── page.tsx            (ürün grid — 3 kategori: Değirmen, Biber/Baharat, Silaj)
│   ├── degirmen/[slug]/page.tsx    (ör. bugday-unu, misir-unu, arpa-unu)
│   ├── biber/[slug]/page.tsx       (ör. kirmizi-toz-biber, pul-biber, biber-salcasi)
│   └── silaj/[slug]/page.tsx       (ör. misir-silaji, yonca-silaji)
├── blog/
│   ├── page.tsx            (blog listesi — MDX)
│   └── [slug]/page.tsx
├── iletisim/page.tsx
├── kvkk/page.tsx
├── cerez-politikasi/page.tsx
├── gizlilik/page.tsx
└── api/
    ├── contact/route.ts    (POST → Resend)
    └── newsletter/route.ts
```

# COMPONENT KÜTÜPHANESİ (src/components/)
Her component Framer Motion + Tailwind ile yazılacak. Server Component varsayılan, "use client" sadece gerekli yerde.

## Layout
- `<Header>` — sticky, scroll'da shrink olur, mobil hamburger, mega-menu (3 kategori açılır)
- `<Footer>` — koyu gradient, 4 sütun (Logo+İletişim / Hızlı Linkler / Ürünler / Sosyal), alt kısım copyright + KVKK linkleri
- `<LanguageSwitcher>` — TR/EN toggle
- `<WhatsAppFab>` — sabit sağ-alt köşe WhatsApp butonu, animasyonlu pulse halo

## Home Sections (yukarıdan aşağı)
1. **HeroSlider** — Full-screen, Embla Carousel, 3-4 video/image slide:
   - Slide 1: Drone tarla (hasat) — başlık "Tarladan Sofraya, 30 Yıllık Güven"
   - Slide 2: Öğütme hattı (vals) — "Modern Değirmen Teknolojisi"
   - Slide 3: Biber kurutma sergisi — "Geleneksel Lezzet, Endüstriyel Hijyen"
   - Slide 4: TIR yükleme — "62 Ülkeye İhracat, Kapıda Teslim"
   - Animasyon: her slide'da başlık fade-up + yazı satır satır (stagger 0.05s)
   - Alt köşede "Aşağı kaydır" bounce ikonu
2. **CategoryMegaGrid** — 3 büyük kart yan yana (Değirmen / Biber-Baharat / Silaj). Hover'da parallax zoom, kart overlay metni fade. Tıklayınca /urunler?cat=...
3. **ProductionQuad** — Bennyfruit'ten ilham: 4 büyük parallax kart (Sertifikalar / Tesis / Kapasite / Lojistik). Her biri full-bleed görsel, koyu overlay, alt köşede başlık + kısa metin + "Detay →" link. Scroll'da `whileInView` ile fade-up
4. **ProductShowcase** — 8-12 ürün kartı (Tailwind grid-cols-4 → mobil 1). Kart yapısı: rounded-3 overflow-hidden, lazy image, hover'da zoom + overlay reveal ile "İncele" butonu
5. **StatsCounter** — 4 büyük rakam (count-up animasyon): "30+ Yıl Tecrübe / 62 Ülke / 50.000 ton/yıl / 250+ Çalışan"
6. **GlobalReachMap** — Dünya haritası SVG (react-simple-maps), Mersin'den ışın çizgileri ihracat noktalarına
7. **CertificationsStrip** — Logo carousel (sertifika rozetleri): ISO 22000, HACCP, GLOBALG.A.P., Helal, Kosher, Organik…
8. **Testimonials** — Müşteri logolu referans slider (opsiyonel, içerik gelene kadar placeholder)
9. **BlogTeasers** — Son 3 blog yazısı kartı (MDX'ten otomatik çekilir)
10. **CtaBanner** — "Toptan veya İhracat için teklif isteyin" — gradient arka plan, telefon + WhatsApp + e-posta butonları
11. **Footer** — yukarıda tanımlı

## Shared / Atoms
- `<Button>` — shadcn/ui extended (variants: primary, accent, ghost, outline; sizes: sm, md, lg, xl)
- `<SectionHeading>` — başlık + alt başlık + opsiyonel dekoratif yaprak/biber ikonu
- `<RevealOnScroll>` — Framer Motion `whileInView` wrapper
- `<CounterUp>` — rakam count-up animasyonu (intersection observer)
- `<ImageWithSkeleton>` — next/image + skeleton placeholder
- `<ProductCard>` — görsel + başlık + kısa açıklama + fiyat-istek butonu (placeholder)
- `<CertBadge>` — sertifika logosu + tooltip
- `<Breadcrumb>` — her alt sayfada üstte
- `<FaqAccordion>` — sıkça sorulanlar (ürün sayfalarında)

# ANİMASYONLAR — DETAYLI LİSTESİ (Framer Motion)
1. **Stagger fade-up:** başlık + alt başlık + açıklama satır satır 0.05s gecikme ile (container variants + children variants)
2. **Parallax scroll:** hero görselde `useScroll` + `useTransform` ile 0→-100px kayma
3. **Ken Burns:** hero slider aktif slide'ında image scale 1→1.08 12sn linear
4. **Magnetic button:** CTA butonlarında hover'da mouse'a doğru 6px çekilme (spring)
5. **Image reveal:** her section görselinde soldan sağa "perde açılması" (clip-path + useScroll)
6. **Count-up:** stats bölümünde 0→hedef 2sn ease-out, viewport'a girince tetiklenir
7. **Horizontal scroll:** mobil olmayan geniş ekranda product showcase yatay kaydırma (sticky scroll trick)
8. **Hover lift:** kartlarda hover `y: -8px shadow-2xl` spring
9. **Page transition:** sayfa geçişlerinde fade + 8px yukarı (AnimatePresence layout root)
10. **Scroll progress bar:** sayfa üstünde ince çizgi (scrollYProgress)
11. **Floating particles:** hero arka planında subtle biber tanesi / buğday başağı SVG parçacıkları (CSS animasyon)
12. **3D tilt on hover:** ürün kartlarında `useMotionValue` ile 3D rotateX/Y
13. **Sticky scroll sections:** hakkımızda sayfasında pinned görsel + scroll eden metin (apple-style)
14. **Marquee:** sertifika logoları `whileHover: pause` ile yatay akış
15. **Number flip:** istatistik kartlarında rakam değişimi flip animasyonu
16. **Text scramble:** hero başlığında sayfa yüklenirken karakter scramble
17. **Smooth scroll anchor:** nav linklerinde `scrollIntoView({ behavior: 'smooth' })`
18. **Reveal on enter:** `whileInView={{ opacity: 1, y: 0 }} once: true`
19. **Path draw:** SVG ikonlarda `pathLength` 0→1 animasyonu
20. **Layout shift:** mega-menu açılışında `layoutId` ile smooth geçiş

# HER SAYFA İÇİN İÇERİK ŞABLONU
Aşağıdaki placeholder'lar operatörden bilgi geldikçe değiştirilecek. Şimdilik dolu ve anlamlı Türkçe placeholder yaz:

## Ana Sayfa (page.tsx)
- SEO: title "Eren Tarım — Mersin'den Dünyaya Değirmen, Biber, Silaj", description 155 char, og:image 1200x630
- Hero: yukarıdaki 4 slide
- CategoryMegaGrid: 3 kategori (Değirmen Unları / Biber & Baharat / Silaj & Yem)
- ProductionQuad: Sertifikalar / Tesis / Kapasite / Lojistik
- ProductShowcase: 9 ürün kartı (3+3+3)
- StatsCounter: 4 rakam
- GlobalReachMap: placeholder (Türkiye haritası + 8 ihracat noktası işaretli)
- CertificationsStrip: 6 logo (placeholder PNG)
- BlogTeasers: 3 MDX
- CtaBanner

## Hakkımızda
- 1993'ten bugüne timeline (horizontal scroll, sticky year markers)
- Misyon/Vizyon 2 sütun
- Yönetim kurulu fotoğraf grid
- "Neden Biz?" 6 madde (Gıda Güvenliği / 30 Yıl Tecrübe / Modern Tesis / 62 Ülkeye İhracat / Sertifikalı Üretim / Sürdürülebilir Tarım)
- Sticky scroll: tarihçe (pinli fotoğraf + scroll eden metin)

## Kalite Politikası
- Sertifika rozetleri grid (PDF linkli)
- ISO 22000 / HACCP açıklama
- Laboratuvar görseli
- Son denetim tarihi (placeholder)

## Vizyon & Misyon
- 2 büyük kart, her biri icon + başlık + paragraf
- 5 yıllık stratejik hedefler timeline

## Sürdürülebilirlik
- Karbon ayak izi grafiği (recharts)
- Su tasarrufu, geri dönüşüm istatistikleri
- Yerel çiftçi destek programı

## Üretim — Sertifikalar
- Sertifika görsel galerisi (lightbox, magnific-popup yerine shadcn dialog)
- Her sertifika için: logo, başlık, verme kuruluşu, tarih, son geçerlilik

## Üretim — Tesis
- Rakamlarla: m², silo ton, vals sayısı, paketleme hattı kapasitesi
- Drone görseli + yerleşim planı (basit SVG)
- 360° sanal tur placeholder (iframe)

## Üretim — Kapasite
- Yıllık tonaj (recharts area chart, son 5 yıl)
- Ürün bazlı kırılım (pie chart)
- Vardiya / gün dilimi üretim

## Üretim — Lojistik
- Kendi araç filosu (placeholder JSON)
- Mersin Limanı'na uzaklık (Google Maps embed)
- İhraç rotaları harita
- Soğuk zincir açıklaması

## Ürünler
- 3 kategori sekmesi (Değirmen / Biber-Baharat / Silaj)
- Her kategori 4-6 ürün kartı
- Filtre: Tip, Ambalaj, Sertifika
- Sıralama: Popülerlik, Alfabetik, Yeni

### Ürün Detay Sayfası
- Sol: görsel galerisi (4-6 foto, thumb şerit)
- Sağ: başlık, kısa açıklama, ambalaj seçenekleri, "Teklif Al" butonu (modal → form)
- Alt: tab yapısı — Açıklama / Beslenme/Kalite / Sertifikalar / Lojistik / SSS
- "Benzer Ürünler" carousel
- **İNTERAKTİF BİBER HARİTASI:** ürün görselinde hotspot.js React port'u (React-Hotspot) ile 4-5 nokta: "Yetiştirme bölgesi", "Kurutma", "Öğütme", "Paketleme", "İhracat limanı" — tıklayınca popover

## Blog
- MDX içerik (placeholder 3 yazı: "Kırmızı Toz Biberin Tarihçesi", "Silaj Yapımının Püf Noktaları", "Mersin'in Tarım Gücü")
- Kategori + tag filtreleme
- Okuma süresi (MDX plugin)
- İlgili yazılar

## İletişim
- Google Maps embed (Mersin merkez)
- Form: ad, firma, e-posta, telefon, ülke, ürün ilgisi, mesaj → Resend
- Telefon, WhatsApp, e-posta: 3 büyük ikon kartı
- Çalışma saatleri
- Sosyal medya linkleri

# PERFORMANS & SEO
- **Server Components** varsayılan, "use client" sadece animasyonlu component'lerde
- **next/image** her yerde, priority=true sadece hero LCP
- **next/font** local cache, FOUT yok
- **Metadata API** ile her sayfada title, description, og:image, twitter card
- **JSON-LD:** Organization, LocalBusiness, Product (ürün sayfaları), Article (blog), BreadcrumbList
- **sitemap.ts** + **robots.ts** otomatik
- **OG image** her sayfada dinamik (next/og)
- **Lighthouse** 95+ mobile & desktop
- **Core Web Vitals:** LCP <2.5s, CLS <0.1, INP <200ms
- **Bundle size:** ana sayfa <150KB JS

# ERİŞİLEBİLİRLİK (a11y)
- WCAG 2.1 AA
- Semantic HTML (header/main/section/article/nav/footer)
- ARIA etiketleri (nav, dialog, tab)
- Focus trap modal'larda
- Klavye navigasyonu (Tab/Enter/Esc)
- prefers-reduced-motion → animasyonları kapat
- Alt text her görselde
- Skip-to-content link

# KVKK & YASAL
- Çerez banner'ı (ilk ziyarette, "Kabul Et" / "Ayarlar")
- KVKK aydınlatma metni (placeholder, operator gönderecek)
- Gizlilik Politikası
- Çerez Politikası
- Footer'da linkler

# DEPLOY
- **Hedef:** Coolify (VPS 31.97.176.234) + Docker
- **Domain:** evohaus altyapısı, sonradan değiştirilebilir
- **SSL:** Let's Encrypt otomatik (Traefik)
- **Environment:** NEXT_PUBLIC_SITE_URL, RESEND_API_KEY, CONTACT_EMAIL
- **Dockerfile** multi-stage (deps → builder → runner)
- **Standalone output:** output: 'standalone' next.config.js
- **Healthcheck:** /api/health endpoint

# DELIVERABLES (teslim edilecekler)
1. **GitHub repo** (private, evohaus org): `eren-tarim-web` veya müşteri adı
2. **Local çalışır demo** (`pnpm dev` ile)
3. **Production build** (`pnpm build && pnpm start`)
4. **Docker image** (Coolify'e push)
5. **README.md** — kurulum, deploy, env değişkenleri
6. **DOCS** — operatörün içerik güncelleme rehberi (MDX dosyaları nereye, görseller nereye)
7. **Staging URL** — canlı önizleme

# ÇALIŞMA PLANI (Claude Code adım adım execute edecek)
**NOT:** Plan modundayken her adımı dosyaya yaz, sonra uygula. TDD yaklaşımı: önce page.tsx placeholder, sonra component'ler, sonra içerik.

## Faz 1 — Proje Kurulumu (30 dk)
- [ ] pnpm create next-app@latest ile başla (TS + Tailwind + App Router + src/)
- [ ] shadcn/ui init (slate base color, CSS variables yes)
- [ ] tailwind.config.ts — yukarıdaki renk paleti
- [ ] next.config.ts — images.remotePatterns (placeholder CDN), output: standalone
- [ ] tsconfig strict: true
- [ ] eslint + prettier
- [ ] .env.example — tüm değişkenler placeholder
- [ ] GitHub repo oluştur, ilk commit
- [ ] klasör yapısını src/ altında kur

## Faz 2 — Tasarım Sistemi (1 saat)
- [ ] globals.css — CSS değişkenleri, font değişkenleri, base layer
- [ ] components/ui/button.tsx (shadcn extended)
- [ ] components/ui/card.tsx
- [ ] components/ui/input.tsx, textarea.tsx
- [ ] components/ui/dialog.tsx
- [ ] components/ui/tabs.tsx
- [ ] components/ui/accordion.tsx
- [ ] SectionHeading, RevealOnScroll, CounterUp, ImageWithSkeleton
- [ ] lib/utils.ts — cn helper
- [ ] lib/cms/adapter.ts — CMS abstraction

## Faz 3 — Layout (1 saat)
- [ ] Header (sticky, scroll shrink, mega-menu, mobil drawer)
- [ ] Footer (gradient, 4 sütun, sosyal, copyright)
- [ ] WhatsAppFab (pulse halo)
- [ ] LanguageSwitcher (next-intl)
- [ ] root layout.tsx — fonts, metadata, JSON-LD Organization

## Faz 4 — Ana Sayfa (3 saat)
- [ ] HeroSlider (Embla + Framer Motion + video)
- [ ] CategoryMegaGrid (3 kart, parallax)
- [ ] ProductionQuad (4 kart, sticky reveal)
- [ ] ProductShowcase (9 ürün)
- [ ] StatsCounter (count-up)
- [ ] GlobalReachMap (react-simple-maps)
- [ ] CertificationsStrip (marquee)
- [ ] BlogTeasers (MDX)
- [ ] CtaBanner (gradient + butonlar)
- [ ] page.tsx birleştir

## Faz 5 — Kurumsal Sayfalar (2 saat)
- [ ] /corporate layout
- [ ] /hakkimizda — timeline + sticky scroll
- [ ] /kalite-politikasi
- [ ] /vizyon-misyon
- [ ] /surdurulebilirlik — recharts

## Faz 6 — Üretim Sayfaları (2 saat)
- [ ] /uretim layout
- [ ] /sertifikalar — lightbox grid
- [ ] /tesis — drone + 360 placeholder
- [ ] /kapasite — recharts area + pie
- [ ] /lojistik — harita + filo

## Faz 7 — Ürünler (2.5 saat)
- [ ] /urunler — 3 sekme, filtre, sıralama
- [ ] /urunler/degirmen/[slug]
- [ ] /urunler/biber/[slug] — hotspot entegrasyonu
- [ ] /urunler/silaj/[slug]
- [ ] Teklif al modal → contact API
- [ ] generateStaticParams ile tüm ürünler pre-render

## Faz 8 — İçerik (1 saat)
- [ ] BlogTeasers + blog/[slug]
- [ ] 3 placeholder MDX
- [ ] FAQ (ürün sayfalarında)

## Faz 9 — İletişim & Form (1 saat)
- [ ] /iletisim — harita + form
- [ ] /api/contact — Resend entegrasyonu
- [ ] Form validasyonu (zod)
- [ ] Success/error state

## Faz 10 — SEO & Performans (1.5 saat)
- [ ] sitemap.ts, robots.ts
- [ ] Metadata her sayfada
- [ ] JSON-LD: Organization, LocalBusiness, Product, Article, Breadcrumb
- [ ] OG image generation (next/og)
- [ ] Lighthouse audit → 95+ her sayfa

## Faz 11 — Yasal (30 dk)
- [ ] /kvkk
- [ ] /gizlilik
- [ ] /cerez-politikasi
- [ ] Çerez banner (ilk ziyaret)

## Faz 12 — Erişilebilirlik (30 dk)
- [ ] Klavye testi (Tab, Enter, Esc)
- [ ] Screen reader testi (VoiceOver macOS)
- [ ] prefers-reduced-motion handling
- [ ] Skip-to-content link
- [ ] Focus ring kontrastı

## Faz 13 — Docker & Deploy (30 dk)
- [ ] Dockerfile (multi-stage)
- [ ] .dockerignore
- [ ] docker-compose.yml (sadece app, Coolify'e bırak)
- [ ] Coolify'da resource oluştur (env'i operatörle paylaş)
- [ ] Staging URL test

## Faz 14 — Dokümantasyon (30 dk)
- [ ] README.md (kurulum, deploy, env, scripts)
- [ ] DOCS/content-update.md (operatör rehberi)
- [ ] CHANGELOG.md
- [ ] LICENSE (özel mı? operatör karar verir)

## Faz 15 — Final QA (1 saat)
- [ ] Tüm sayfaları manual test (desktop + tablet + mobil)
- [ ] Lighthouse tüm sayfalarda 95+
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge
- [ ] Form submit test (Resend sandbox)
- [ ] 404 ve error.tsx sayfaları
- [ ] Loading skeleton'lar
- [ ] Favicon, OG image, apple-touch-icon

# BAŞLANGIÇ
Şu adımla başla:
1. `pwd` ile çalışma dizinini yazdır
2. Boş bir `~/Desktop/Projects/eren-tarim/` dizini oluştur
3. Yukarıdaki Faz 1'i uygula, her tool çağrısında ne yaptığını açıkla
4. Her fazda **dosya oluşturma → commit** döngüsü kur
5. Bittiğinde özet rapor ver: kaç dosya, kaç satır, hangi sayfalar aktif, Lighthouse skorları

# ÖNEMLİ KURALLAR
- **ASLA** jQuery, Bootstrap, Swiper, magnific-popup KULLANMA
- **ASLA** placeholder görsel için external link bırakma; SVG inline üret veya /public/placeholder/ altına koy
- **HER component** dosyasının başında 3 satır yorum: ne işe yarar, hangi prop'ları alır, hangi sayfada kullanılır
- **HER animasyon** Framer Motion ile, CSS transition sadece basit hover için
- **MUTLAKA** mobile-first responsive
- **MUTLAKA** typescript strict, "any" kullanma
- **MUTLAKA** a11y (semantic HTML + ARIA + keyboard)
- **KULLANICI (operatör) bilgiyi** `02_operator_sorulacak_bilgiler.md`'den çek; yoksa dolu anlamlı Türkçe placeholder yaz, dosyada TODO bırak
- **ÇIKTI her zaman**: tam kod, eksiksiz dosya, çalışır halde. "Bu kısmı siz yaparsınız" DEME
```

---

## 🚀 NASIL KULLANILIR

### Yöntem 1 — Direkt terminal
```bash
cd ~/Desktop/Projects/eren-tarim
# Bu dosyayı kopyala
claude --dangerously-bypass-approvals < 03_CLAUDE_CODE_MEGA_PROMPT.md
```

### Yöntem 2 — CLAUDE.md olarak kaydet
```bash
cp 03_CLAUDE_CODE_MEGA_PROMPT.md ~/Desktop/Projects/eren-tarim/CLAUDE.md
cd ~/Desktop/Projects/eren-tarim
claude  # CLAUDE.md otomatik yüklenir
```

### Yöntem 3 — Background worker
Hafıza + workflow kurallarına göre **Codex CLI paralel** de çalışabilir:
```bash
codex --dangerously-bypass "Bu promptu oku ve uygula: $(cat 03_CLAUDE_CODE_MEGA_PROMPT.md)"
```

### Yöntem 4 — Sliding window (parça parça)
Çok uzun olduğu için Claude Code context'i dolarsa `03_CLAUDE_CODE_MEGA_PROMPT_PART2.md` olarak bölebilirsin:
- **PART 1:** Stack, renkler, klasör yapısı, Faz 1-4
- **PART 2:** Komponentler, animasyonlar, Faz 5-9
- **PART 3:** SEO, performans, deploy, Faz 10-15

---

## ⚠️ KRİTİK HATIRLATMALAR

1. **Operatörden cevap gelmeden** Claude Code başlatılırsa, placeholder'lar dolu anlamlı Türkçe olacak (örn. "1993 yılında Mersin'de 50 m² atölyede kurulan firmamız..."). Bilgi gelince `lib/cms/*.mdx` dosyaları güncellenecek.
2. **Görseller placeholder** olacak — `/public/placeholder/` altında SVG kahraman görseller (tarla, değirmen, biber, silaj). Müşteri fotoğraf gönderince değiştirilecek.
3. **Renkler Bennyfruit** ile aynı temel yeşil — bu bilinçli: güven/tarım algısı. Ama Mersin'in kırmızı biber vurgusu eklendi.
4. **Premium his:** görsel kalitesi, tipografi (Playfair + Inter), boşluk, mikroanimasyon — bu üçü düşerse "üst seviye" olmaz.
5. **Bennyfruit referans** ama **kopyası değil** — modern stack + Mersin'in kendi hikâyesi.
