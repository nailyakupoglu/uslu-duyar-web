# Eren Tarım — Component Library

Bu kütüphane HTML mockup dosyalarında kullanılan bileşenlerin Next.js dönüşümü için referansıdır.

## Header

**Amaç:** Sticky logo, nav, dil switcher ve CTA alanı.

**Kullanım yeri:** 01-12 tüm mockup dosyaları

**HTML örneği:**

```html
<section class="component component--header" aria-labelledby="header-title">
  <h2 id="header-title">Header</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Sticky logo, nav, dil switcher ve CTA alanı.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## Footer

**Amaç:** 4 sütunlu gradient alt bilgi.

**Kullanım yeri:** 01-12 tüm mockup dosyaları

**HTML örneği:**

```html
<section class="component component--footer" aria-labelledby="footer-title">
  <h2 id="footer-title">Footer</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>4 sütunlu gradient alt bilgi.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## MegaMenu

**Amaç:** Ürün ve kurumsal başlıklar için desktop açılır yapı.

**Kullanım yeri:** 01-home, 10-urunler

**HTML örneği:**

```html
<section class="component component--megamenu" aria-labelledby="megamenu-title">
  <h2 id="megamenu-title">MegaMenu</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Ürün ve kurumsal başlıklar için desktop açılır yapı.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## MobileDrawer

**Amaç:** Hamburger ile açılan mobil gezinme paneli.

**Kullanım yeri:** 01-12 tüm mockup dosyaları

**HTML örneği:**

```html
<section class="component component--mobiledrawer" aria-labelledby="mobiledrawer-title">
  <h2 id="mobiledrawer-title">MobileDrawer</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Hamburger ile açılan mobil gezinme paneli.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## HeroSlider

**Amaç:** 4 slaytlı cinematic hero alanı.

**Kullanım yeri:** 01-home ve iç sayfalar

**HTML örneği:**

```html
<section class="component component--heroslider" aria-labelledby="heroslider-title">
  <h2 id="heroslider-title">HeroSlider</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>4 slaytlı cinematic hero alanı.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## CategoryMegaGrid

**Amaç:** Değirmen, biber ve silaj dikeyleri.

**Kullanım yeri:** 01-home

**HTML örneği:**

```html
<section class="component component--categorymegagrid" aria-labelledby="categorymegagrid-title">
  <h2 id="categorymegagrid-title">CategoryMegaGrid</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Değirmen, biber ve silaj dikeyleri.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## ProductionQuad

**Amaç:** Sertifika, tesis, kapasite, lojistik dörtlüsü.

**Kullanım yeri:** 01-home, 07-tesis

**HTML örneği:**

```html
<section class="component component--productionquad" aria-labelledby="productionquad-title">
  <h2 id="productionquad-title">ProductionQuad</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Sertifika, tesis, kapasite, lojistik dörtlüsü.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## ProductShowcase

**Amaç:** Ürün kartlarından oluşan responsive grid.

**Kullanım yeri:** 01-home, 10-urunler

**HTML örneği:**

```html
<section class="component component--productshowcase" aria-labelledby="productshowcase-title">
  <h2 id="productshowcase-title">ProductShowcase</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Ürün kartlarından oluşan responsive grid.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## ProductCard

**Amaç:** Fotoğraf, kategori, açıklama ve detay CTA.

**Kullanım yeri:** 01-home, 10-urunler, 11-urun-detay

**HTML örneği:**

```html
<section class="component component--productcard" aria-labelledby="productcard-title">
  <h2 id="productcard-title">ProductCard</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Fotoğraf, kategori, açıklama ve detay CTA.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## CertBadge

**Amaç:** Lightbox açan sertifika rozeti.

**Kullanım yeri:** 03-kalite, 06-sertifikalar

**HTML örneği:**

```html
<section class="component component--certbadge" aria-labelledby="certbadge-title">
  <h2 id="certbadge-title">CertBadge</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Lightbox açan sertifika rozeti.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## StatCounter

**Amaç:** IntersectionObserver ile count-up metrik.

**Kullanım yeri:** 01-home, 07-tesis

**HTML örneği:**

```html
<section class="component component--statcounter" aria-labelledby="statcounter-title">
  <h2 id="statcounter-title">StatCounter</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>IntersectionObserver ile count-up metrik.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## Timeline

**Amaç:** Yıl, başlık ve açıklama akışı.

**Kullanım yeri:** 02-hakkimizda, 04-vizyon-misyon

**HTML örneği:**

```html
<section class="component component--timeline" aria-labelledby="timeline-title">
  <h2 id="timeline-title">Timeline</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Yıl, başlık ve açıklama akışı.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## Testimonial

**Amaç:** Müşteri yorumu kartı için placeholder yapı.

**Kullanım yeri:** Sunumda opsiyonel

**HTML örneği:**

```html
<section class="component component--testimonial" aria-labelledby="testimonial-title">
  <h2 id="testimonial-title">Testimonial</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Müşteri yorumu kartı için placeholder yapı.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## BlogTeaser

**Amaç:** Saha notu kartı.

**Kullanım yeri:** 01-home

**HTML örneği:**

```html
<section class="component component--blogteaser" aria-labelledby="blogteaser-title">
  <h2 id="blogteaser-title">BlogTeaser</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Saha notu kartı.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## CtaBanner

**Amaç:** Koyu gradient teklif çağrısı.

**Kullanım yeri:** 01-home

**HTML örneği:**

```html
<section class="component component--ctabanner" aria-labelledby="ctabanner-title">
  <h2 id="ctabanner-title">CtaBanner</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Koyu gradient teklif çağrısı.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## Button

**Amaç:** Primary, accent, outline, dark varyantları.

**Kullanım yeri:** Tüm sayfalar

**HTML örneği:**

```html
<section class="component component--button" aria-labelledby="button-title">
  <h2 id="button-title">Button</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Primary, accent, outline, dark varyantları.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## Input

**Amaç:** Tek satır form alanı.

**Kullanım yeri:** 12-iletisim

**HTML örneği:**

```html
<section class="component component--input" aria-labelledby="input-title">
  <h2 id="input-title">Input</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Tek satır form alanı.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## Textarea

**Amaç:** Mesaj form alanı.

**Kullanım yeri:** 12-iletisim

**HTML örneği:**

```html
<section class="component component--textarea" aria-labelledby="textarea-title">
  <h2 id="textarea-title">Textarea</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Mesaj form alanı.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## Select

**Amaç:** Ürün ve ülke seçimi için alan.

**Kullanım yeri:** 12-iletisim canlı sürüm

**HTML örneği:**

```html
<section class="component component--select" aria-labelledby="select-title">
  <h2 id="select-title">Select</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Ürün ve ülke seçimi için alan.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## Dialog

**Amaç:** Lightbox ve modal davranışı.

**Kullanım yeri:** 03-kalite, 06-sertifikalar

**HTML örneği:**

```html
<section class="component component--dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Dialog</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Lightbox ve modal davranışı.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## Tabs

**Amaç:** Ürün ve detay sekmeleri.

**Kullanım yeri:** 10-urunler, 11-urun-detay

**HTML örneği:**

```html
<section class="component component--tabs" aria-labelledby="tabs-title">
  <h2 id="tabs-title">Tabs</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Ürün ve detay sekmeleri.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## Accordion

**Amaç:** Sık sorulan soru listesi.

**Kullanım yeri:** 12-iletisim

**HTML örneği:**

```html
<section class="component component--accordion" aria-labelledby="accordion-title">
  <h2 id="accordion-title">Accordion</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Sık sorulan soru listesi.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## Tooltip

**Amaç:** İkon açıklamaları ve hotspot kısa notları.

**Kullanım yeri:** 11-urun-detay

**HTML örneği:**

```html
<section class="component component--tooltip" aria-labelledby="tooltip-title">
  <h2 id="tooltip-title">Tooltip</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>İkon açıklamaları ve hotspot kısa notları.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## WhatsAppFab

**Amaç:** Sağ alt hızlı iletişim butonu.

**Kullanım yeri:** Tüm sayfalar

**HTML örneği:**

```html
<section class="component component--whatsappfab" aria-labelledby="whatsappfab-title">
  <h2 id="whatsappfab-title">WhatsAppFab</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Sağ alt hızlı iletişim butonu.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## LanguageSwitcher

**Amaç:** TR / EN kısa switcher.

**Kullanım yeri:** Tüm sayfalar

**HTML örneği:**

```html
<section class="component component--languageswitcher" aria-labelledby="languageswitcher-title">
  <h2 id="languageswitcher-title">LanguageSwitcher</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>TR / EN kısa switcher.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## Breadcrumb

**Amaç:** İç sayfalarda konum göstergesi.

**Kullanım yeri:** Next.js dönüşümünde

**HTML örneği:**

```html
<section class="component component--breadcrumb" aria-labelledby="breadcrumb-title">
  <h2 id="breadcrumb-title">Breadcrumb</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>İç sayfalarda konum göstergesi.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

## FaqAccordion

**Amaç:** Keyboard erişimli soru-cevap.

**Kullanım yeri:** 12-iletisim

**HTML örneği:**

```html
<section class="component component--faqaccordion" aria-labelledby="faqaccordion-title">
  <h2 id="faqaccordion-title">FaqAccordion</h2>
  <div class="card">
    <div class="card__body">
      <span class="card__icon"><i data-lucide="wheat" aria-hidden="true"></i></span>
      <h3>Keyboard erişimli soru-cevap.</h3>
      <p>Bu örnek mockup sınıflarıyla çalışır ve Next.js componentine doğrudan ayrılabilir.</p>
    </div>
  </div>
</section>
```

**CSS gereksinimi:**

```css
.card { border: 1px solid var(--color-line); border-radius: var(--radius-md); background: rgba(255,255,255,.74); box-shadow: var(--shadow-1); }
.card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.card__icon { display:grid; width:44px; height:44px; place-items:center; border-radius:var(--radius-sm); background:rgba(13,69,37,.08); color:var(--color-primary); }
```

**Accessibility:**

- Bileşen başlığı `aria-labelledby` ile bağlanır.
- İkonlar dekoratifse `aria-hidden="true"` alır.
- Etkileşimli varyantlarda `button`, `aria-expanded`, `aria-controls` ve focus ring korunur.
- Keyboard ile tab sırası DOM sırasını takip eder.

