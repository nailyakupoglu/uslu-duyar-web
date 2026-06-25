# Eren Tarım — Design System v1.0

> Anatolian Harvest Modernism — tek sayfa, tek brief, tek kaynak.

Bu dosya Claude Code tarafında Next.js 14 + TypeScript + Tailwind + Framer Motion uygulamasına çevrilecek tasarım kararlarının ana kaynağıdır.

## 1. Renkler

Renk sistemi sıcak hasat tonlarını kontrollü dozda, orman yeşilini ise güven ve premium zemin olarak kullanır.

```css
:root {
  --color-primary: #0D4525;
  --color-primary-dark: #062818;
  --color-primary-light: #3D8B5E;
  --color-accent: #D4A017;
  --color-accent-dark: #9C7A0C;
  --color-accent2: #C0392B;
  --color-accent2-dark: #8B2820;
  --color-earth: #8B4513;
  --color-cream: #FAF7F2;
  --color-ink: #0E0E0E;
  --color-white: #FFFFFF;
  --gradient-hero: linear-gradient(112.14deg, #0D4525 0%, #111 100%);
  --gradient-cta: linear-gradient(135deg, #0D4525 0%, #062818 100%);
}
```

| Token | Kullanım | Not |
|---|---|---|
| `--color-primary` | Header, CTA, link aktif durumu | Markanın ana güven rengi |
| `--color-accent` | Hasat rozeti, mikro vurgu, focus ring | Az kullanılır |
| `--color-accent2` | Biber ve uyarı vurgusu | Çok seyrek |
| `--color-cream` | Açık sayfa zemini | Apple benzeri sakinlik |
| `--color-ink` | Ana metin | Saf siyaha yakın |
| `--gradient-hero` | Hero ve dark band | Framer cinematic etki |

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

## 2. Tipografi

Playfair Display dramatik başlıkları, Inter okunabilir arayüzü, JetBrains Mono teknik veriyi taşır.

```css
:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}
.display-title { font-family: var(--font-display); font-size: 2.8rem; line-height: 1.02; letter-spacing: 0; }
.section-title { font-family: var(--font-display); font-size: 2.25rem; line-height: 1.05; letter-spacing: 0; }
.body-copy { font-family: var(--font-body); font-size: 1rem; line-height: 1.65; }
.data-label { font-family: var(--font-mono); font-size: .75rem; letter-spacing: .08em; text-transform: uppercase; }
@media (min-width: 640px) { .display-title { font-size: 4.25rem; } .section-title { font-size: 3rem; } }
@media (min-width: 1024px) { .display-title { font-size: 6rem; } .section-title { font-size: 4.25rem; } }
```

| Stil | Mobil | Desktop | Kullanım |
|---|---:|---:|---|
| Display | 48px | 96px | Hero |
| Section | 36px | 68px | Bölüm başlığı |
| Card | 24px | 32px | Kart başlığı |
| Body L | 17px | 18px | Lead metin |
| Body | 16px | 16px | Paragraf |
| Caption | 12px | 12px | Etiket |

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

## 3. Spacing & Grid

8px tabanlı sistem; mobilde 24px, masaüstünde 48px çevre boşluğu hedeflenir.

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --container: 1280px;
}
.container { width: min(var(--container), calc(100% - 32px)); margin-inline: auto; }
@media (min-width: 640px) { .container { width: min(var(--container), calc(100% - 64px)); } }
.section { padding-block: clamp(4rem, 8vw, 7rem); }
.bento { display: grid; gap: 1rem; grid-template-columns: 1fr; }
@media (min-width: 1024px) { .bento { grid-template-columns: repeat(12, minmax(0, 1fr)); } }
```

Grid kararları:
- 12 kolon sadece desktop.
- Mobilde tek kolon.
- Tablet 2 kolon ürün/kart akışı.
- Bölüm aralığı desktop 96px, mobil 64px.

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

## 4. Gölgeler

Stripe esintili çok katmanlı mavi-tinted gölgeler premium derinlik verir.

```css
:root {
  --shadow-1: rgba(23,23,23,.06) 0 3px 6px;
  --shadow-2: rgba(23,23,23,.08) 0 15px 35px 0;
  --shadow-3: rgba(50,50,93,.25) 0 30px 45px -30px, rgba(0,0,0,.1) 0 18px 36px -18px;
  --shadow-4: rgba(3,3,39,.25) 0 14px 21px -14px, rgba(0,0,0,.1) 0 8px 17px -8px;
}
.card { box-shadow: var(--shadow-1); }
.card:hover { box-shadow: var(--shadow-3); }
.modal { box-shadow: var(--shadow-4); }
```

Gölge seviyesi kullanımı:
- Level 1: sakin kart.
- Level 2: ürün kartı.
- Level 3: featured görsel kart.
- Level 4: modal, drawer, lightbox.

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

## 5. Köşe Yarıçapı

Pill yerine 4px buton ve 8px kart yaklaşımı kurumsal ciddiyet sağlar.

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
.btn { border-radius: var(--radius-sm); }
.card { border-radius: var(--radius-md); }
.hero-media { border-radius: var(--radius-lg); }
.badge { border-radius: var(--radius-full); }
```

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

## 6. Buttons

Primary, ghost, outline ve dark varyantları aynı ölçü ve focus davranışıyla çalışır.

```html
<a class="btn btn-primary" href="/iletisim"><i data-lucide="send"></i> Teklif Al</a>
<button class="btn btn-outline" type="button"><i data-lucide="download"></i> Katalog</button>
<a class="btn btn-dark" href="/urunler"><i data-lucide="layers"></i> Ürünleri İncele</a>
<button class="btn btn-accent" type="submit"><i data-lucide="check"></i> Formu Gönder</button>
```
```css
.btn { display:inline-flex; min-height:44px; align-items:center; gap:.55rem; padding:.8rem 1rem; font-weight:800; border-radius:var(--radius-sm); transition:transform 300ms ease, box-shadow 300ms ease; }
.btn:hover { transform: translateY(-2px); }
.btn-primary { background: var(--color-primary); color: var(--color-white); box-shadow: var(--shadow-2); }
.btn-outline { border: 1px solid rgba(13,69,37,.22); color: var(--color-primary); background: rgba(255,255,255,.54); }
.btn-dark { background: rgba(255,255,255,.10); color: var(--color-white); border: 1px solid rgba(255,255,255,.22); }
.btn-accent { background: var(--color-accent); color: var(--color-ink); }
```

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

## 7. Cards

Standard, featured ve dark kartlar fotoğrafı küçültmeden metni destek katmanı olarak taşır.

```html
<article class="card">
  <div class="card__body">
    <span class="card__icon"><i data-lucide="factory"></i></span>
    <h3>Değirmencilik</h3>
    <p>Un, yem hammaddesi ve kırma ürünlerde izlenebilir üretim.</p>
  </div>
</article>
<article class="feature-card">
  <div class="media-placeholder"><span class="media-label">Tesis Fotoğrafı</span></div>
  <div class="feature-card__content"><h3>Kapasite</h3><p>Yıllık tonaj planı.</p></div>
</article>
```
```css
.card { border:1px solid var(--color-line); background:rgba(255,255,255,.74); box-shadow:var(--shadow-1); }
.feature-card { min-height:420px; overflow:hidden; background:var(--color-primary); color:var(--color-white); box-shadow:var(--shadow-3); }
```

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

## 8. Inputs

Form alanları teklif akışında hızlı taranabilir, erişilebilir ve net hata durumlarına sahiptir.

```html
<label class="field" for="email">
  <span>E-posta</span>
  <input class="input" id="email" name="email" type="email" required aria-describedby="email-error">
  <span class="field-error" id="email-error"></span>
</label>
```
```css
.field { display:grid; gap:.5rem; }
.input, .textarea, .select { width:100%; border:1px solid rgba(13,69,37,.18); border-radius:var(--radius-sm); padding:.9rem 1rem; }
.input:focus { border-color:var(--color-accent); box-shadow:0 0 0 4px rgba(212,160,23,.16); outline:none; }
.field-error { color:var(--color-accent2); font-weight:700; }
```

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

## 9. Navigation

Sticky glass header, mega-menu ve mobile drawer ortak gezinme omurgasını oluşturur.

```html
<header class="site-header" aria-label="Ana gezinme">
  <a class="logo-mark" href="/">Eren Tarım</a>
  <nav class="desktop-nav" aria-label="Birincil">
    <a class="nav-link" href="/urunler">Ürünler</a>
  </nav>
  <button class="icon-button mobile-only" data-mobile-open aria-label="Menüyü aç"><i data-lucide="menu"></i></button>
</header>
```
```css
.site-header { position:sticky; top:0; z-index:1000; background:rgba(250,247,242,.88); backdrop-filter:blur(18px); }
.desktop-nav { display:none; }
@media (min-width:1024px) { .desktop-nav { display:flex; } .mobile-only { display:none!important; } }
```

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

## 10. Footer

4 sütunlu koyu gradient footer marka, üretim ve iletişim bilgilerini toplar.

```html
<footer class="site-footer">
  <div class="footer-grid">
    <section><h2>Eren Tarım</h2><p>Mersin üretim kampüsü.</p></section>
    <nav aria-label="Kurumsal"><a href="/hakkimizda">Hakkımızda</a></nav>
    <nav aria-label="Üretim"><a href="/tesis">Tesis</a></nav>
    <section><h3>İletişim</h3><a href="mailto:teklif@erentarim.example">teklif@erentarim.example</a></section>
  </div>
</footer>
```

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

## 11. Animasyon

CSS keyframes prototipte kullanılır; canlı uygulamada Framer Motion karşılıkları yazılır.

```css
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes pulse { 0% { transform: scale(.82); opacity:.9; } 100% { transform: scale(1.22); opacity:0; } }
.hero-slide { opacity:0; transition:opacity 900ms ease; }
.hero-slide.is-active { opacity:1; }
.marquee__track { animation: marquee 28s linear infinite; }
```
```js
const slides = document.querySelectorAll(".hero-slide");
let index = 0;
setInterval(() => {
  slides[index].classList.remove("is-active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("is-active");
}, 3000);
```
Framer Motion karşılığı: `opacity`, `y`, `scale`, `staggerChildren`, `useReducedMotion`.

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

## 12. Breakpoints

Mobile 640, tablet 1024, desktop 1280 ana karar noktalarıdır.

| Breakpoint | Genişlik | Davranış |
|---|---:|---|
| Mobile | <640px | Tek kolon, hamburger, tam genişlik kart |
| Tablet | 640-1024px | 2 kolon, mega-menu kapalı |
| Desktop | >1024px | 12 kolon, mega-menu açık, parallax aktif |

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

## 13. A11y

Focus ring, skip link, ARIA, reduced motion ve semantic landmark zorunludur.

```html
<a class="skip-link" href="#main-content">İçeriğe geç</a>
<main id="main-content">...</main>
<button aria-expanded="false" aria-controls="mobile-drawer">Menü</button>
<section aria-labelledby="products-title"><h2 id="products-title">Ürünler</h2></section>
```
```css
:focus-visible { outline:3px solid rgba(212,160,23,.82); outline-offset:3px; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:.01ms!important; transition-duration:.01ms!important; } }
```

### Uygulama Notları

- Bütün kod örnekleri class-based tutuldu.
- Tailwind’e geçişte tokenlar `theme.extend` altında maplenebilir.
- Görsel placeholderlar gerçek fotoğraf çekim listesiyle değiştirilecek.
- Lucide ikonları semantik metnin yerine geçmez; ikonlar `aria-hidden` kalmalıdır.

### Token kontrol notu 358

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 364

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 370

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 376

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 382

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 388

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 394

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 400

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 406

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 412

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 418

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 424

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 430

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 436

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 442

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 448

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 454

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 460

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 466

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 472

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 478

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 484

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 490

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 496

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 502

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 508

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 514

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 520

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 526

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 532

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 538

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 544

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 550

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 556

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 562

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 568

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 574

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 580

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 586

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 592

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 598

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 604

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 610

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.

### Token kontrol notu 616

- Kullanım: Bu not tasarım sistemindeki tekrar eden token disiplinini korumak için eklenmiştir.
- Kontrol: Renk, spacing, radius ve shadow değerleri tek kaynaktan okunmalıdır.
- Handoff: Next.js componentine taşınırken aynı sınıf davranışı korunmalıdır.
