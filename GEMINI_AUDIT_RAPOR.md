# 🔍 USLU DUYAR WEB SİTESİ — KAPSAMLI ANALİZ RAPORU
**Tarih:** 25 Haziran 2026
**Analist:** Claude (Opus 4.8) — `GEMINI_3_PRO_AUDIT_PROMPT.md` görev seti üzerinden
**Genel Skor:** **6.4 / 10**
**Yöntem:** Kanıt tabanlı. Gerçek kod tabanı (`uslu-duyar-web/`) 6 paralel denetimle taze okundu; brief varsayımlarına değil koda bakıldı. Tüm bulgular `dosya:satır` referanslı. Rakip/sektör analizi canlı web araştırmasıyla doğrulandı. Canlı site HTTP durumu, ölü paketler, canonical davranışı, manifest içeriği komutla teyit edildi.

> **BAĞLAM DÜZELTMESİ:** Prompt (24 Haziran) projeyi *"minimal starter, 3 sayfa, Claude limit doldu"* sanıyor. **Artık doğru değil.** 25 Haziran itibarıyla proje neredeyse tamam: **19 route × 2 locale = 38 sayfa**, **41 component**, tam bilingual (TR/EN), manifest + 88 foto + 8 video entegre, `pnpm typecheck` ve `pnpm lint` temiz. Bu rapor planı değil, **gerçek mevcut kodu** denetler. Ayrıca prompt "biber-baharat / değirmencilik / silaj" diyor; kod tabanı **narenciye + kavun + karpuza pivot etmiş** — analiz yeni ürün gerçeğine göre yapıldı. Prompt "Next.js 15" diyor, gerçek **Next.js 14.2.24**.

---

## 📊 YÖNETİCİ ÖZETİ

Proje teknik olarak beklentinin üzerinde bir temele oturuyor: Next.js 14 App Router, strict TypeScript (`src/` içinde sıfır `any`), tam i18n URL routing, self-hosted fontlar, JSON-LD, honeypot'lu form, lint+typecheck temiz. Mimari ve kod disiplini çoğu ajans çıktısından iyi. Ancak site **B2B ihracat satışı için değil, kurumsal vitrin için** kurulmuş: ürün sayfalarında ihracatçının para kazandıran alanları (Incoterms, MOQ, konteyner yükleme, kalibre/Brix, sezon takvimi, HS kodu) yok; teklif formu jenerik isim/e-posta/mesaj.

**En kritik 3 bulgu:** **(1) Canlı site şu an 503 dönüyor** (TR ve EN root, dünden beri) — son deploy başarısız/yarım, çıkış bloklu. **(2) EN sayfaları TR URL'ine canonical veriyor** (`metadata.ts:29`) — Google'a "EN, TR'nin kopyasıdır" sinyali; ihracat alıcısının aradığı İngilizce içerik indeksten düşebilir. **(3) Logo hâlâ "Eren Tarım", telefon/sertifika placeholder** — rebrand ve müşteri verisi yarım.

**İlk 3 aksiyon:** (1) 503'ü çöz (Coolify deploy) + logo/favicon'u gerçek Uslu Duyar markasına çevir. (2) SEO uluslararası katmanını onar (locale-aware canonical + sitemap'e EN + hreflang + PNG OG). (3) Ürün veri modelini ve teklif formunu B2B ihracat alanlarıyla genişlet (RFQ: ürün/tonaj/Incoterm/liman/ülke).

---

## 🎯 GÖREV 1 — TEKNİK MİMARİ & CODE QUALITY
**Skor:** 7.5 / 10

### ✅ Güçlü Yönler
- **TypeScript strict gerçekten temiz.** `tsconfig.json:7` `"strict": true`; `grep ": any\|as any"` tüm `src/`'te **sıfır** sonuç. `pnpm typecheck` → exit 0, `pnpm lint` → 0 uyarı. `_archive` exclude edilmiş (`tsconfig.json:27`).
- **Form güvenliği iki katmanlı.** Zod şeması client+server paylaşımlı (`src/lib/contact.ts:8-21`), API'de tekrar doğrulanıp 422 dönüyor (`src/app/api/contact/route.ts:22-28`). Honeypot doğru: dolu ise bota sessizce `{ok:true}` (`route.ts:33-35`). Webhook hatasında graceful 502. Resend'den n8n'e geçiş tamam.
- **i18n routing temiz.** TR default prefix'siz, EN `/en` (`src/i18n/routing.ts:5-9`, `localePrefix: "as-needed"`). Middleware matcher `media`'yı locale rewrite'ından koruyor (`src/middleware.ts:10`).
- **Görsel pipeline disiplinli.** 11 component `next/image`, ham `<img>` **sıfır**. Hero'da `priority={index===0}` sadece LCP slide'ında (`hero-slider.tsx:65`). Fontlar self-hosted, `latin-ext` subset (Türkçe için kritik), `display:swap` (`layout.tsx:26-45`).
- **`output:"standalone"`** (`next.config.mjs:19`), `poweredByHeader:false`, `/api/health` healthcheck — container deploy için doğru.

### ❌ Zayıf Yönler / Riskler
- **🔴 API webhook'ta auth header + rate-limit yok.** `/api/contact` n8n'e secret'sız POST atıyor (`route.ts:42-55`) ve endpoint'te rate-limit yok. Her POST n8n→email+WhatsApp tetiklediğinden bildirim bombardımanı/abuse riski gerçek. → **Öneri:** `X-Webhook-Secret` (env'den) + IP-bazlı in-memory rate-limit (örn. 5/dk) veya Turnstile. Honeypot tek başına yeterli değil.
- **🟠 framer-motion `prefers-reduced-motion`'a uymuyor.** CSS kill-switch var (`globals.css:55-64`) ama yalnız CSS animasyonu durdurur. 14 component framer-motion kullanıyor, **hiçbirinde `useReducedMotion` yok**. JS transform'lar (Hero Ken Burns `scale:[1,1.08]` `hero-slider.tsx:58`, sonsuz scroll cue `:132`, `counter-up.tsx:27-36`, magnetik buton `button.tsx:45-50`) reduced-motion'da bile çalışıyor → kabul kriteri sapması. → **Öneri:** en az hero/counter-up/button'a `useReducedMotion()` guard.
- **🔴 Ölü bağımlılıklar (komutla teyit).** `package.json:35-37` `react-simple-maps`, `recharts`, `resend` → `grep -rn` ile `src/`'te **sıfır import** (`global-reach-map.tsx` custom SVG ile çiziyor, bu paketleri kullanmıyor). `recharts` tek başına ~500KB+. → **Öneri:** `pnpm remove react-simple-maps recharts resend`.
- **🟠 `images.remotePatterns: hostname:"**"`** (`next.config.mjs:22`) — her HTTPS host'a açık. Görseller zaten local; bu açık ayar image-optimizer'ı SSRF/proxy abuse'a açabilir (`/_next/image?url=...`). → **Öneri:** kaldır veya bilinen domain'lere daralt.
- **🟡 Kontrast notu.** Accent buton `accent-500 #F39A3E` + `text-ink` = **7.97:1 (AAA PASS)** — iyi. Ancak beyaz/krem zemin üzerinde `text-accent-500` = **2.21:1 (AA FAIL)**; `accent2 #E23B33`/beyaz=4.28:1, `primary #2E9E3A`/beyaz=3.46:1 yalnız büyük metinde AA. Küçük beyaz metinle bu renkleri kullanmaktan kaçın (detay Görev 3).

### 💡 Aksiyon Planı
1. **(Yüksek)** `/api/contact`'a webhook secret + rate-limit. `useReducedMotion()` guard (hero/counter-up/button).
2. **(Orta)** Ölü 3 paketi kaldır. `remotePatterns`'ı daralt/kaldır.
3. **(Düşük)** Kullanılmayan `cta-gradient` token'ı sil (`tailwind.config.ts:89`). Hero'ya video slide veya brief beklentisini güncelle.

---

## 🎯 GÖREV 2 — SAYFA YAPISI & İÇERİK
**Skor:** 5.5 / 10

### ✅ Güçlü Yönler
- **19 route'un tamamı mevcut ve gerçek içerikli** (placeholder değil): Home (11 section) + 4 kurumsal + 5 üretim + ürün grid/detay + iletişim + blog liste/detay + 3 yasal. Lorem ipsum **yok** (doğrulandı).
- **Bilgi mimarisi B2B mantığına uygun kümelenmiş:** `corporate` (güven) / `uretim` (yetkinlik) / `urunler` (katalog) / `iletisim` (dönüşüm).
- **Üretim akışı doğru** (`uretim/tesis/page.tsx:26-42`): Hasat→Boylama→Soğuk Hava→Paketleme→Soğuk Zincir→Sevkiyat. Lojistik sayfasında FOB/CFR/CIF ve ihracat evrak akışı **metin olarak** geçiyor (`uretim/lojistik/page.tsx:21,29`) — en güçlü B2B noktası.
- **Ürün veri modeli temiz ve genişlemeye uygun** (`data.ts:192-204`): slug/category/specs/gallery/packageOptions/certificates/tags. 8 ürün (4 narenciye + 2 kavun + 2 karpuz).

### ❌ Zayıf Yönler / Riskler
- **🔴 Ürün veri modeli B2B ihracat alanlarından yoksun.** İstenen 11 kritik alandan çoğu **modelde hiç yok**:

  | Alan | Durum | Kanıt |
  |---|---|---|
  | Çeşit (variety) | ✅ VAR | `data.ts:237` (Washington/Valencia) |
  | Sezon | ⚠️ KABA ("Kış"/"Yaz") | `data.ts:239,331` — ay bazlı değil |
  | Kalibre/grading | ❌ "Placeholder" | `data.ts:238,261,284,307` |
  | Ağırlık aralığı | ❌ "Placeholder" | `data.ts:330,353,376,399` |
  | **Incoterms** | ❌ Model alanı yok | yalnız lojistik metninde |
  | **MOQ** | ❌ Yok | model alanı yok |
  | **Konteyner yükleme (ton/40ft reefer)** | ❌ Yok | model alanı yok |
  | **Brix** | ❌ Yok | narenciye/kavun/karpuz için kritik metrik |
  | **Soğuk zincir °C** | ❌ Yok | anlatı var, spec yok |
  | **Raf ömrü** | ❌ Yok | limon metninde anılıyor (`:275`), spec yok |
  | **HS kodu** | ❌ Yok | ihracat dökümantasyonu için zorunlu |

- **🔴 Sertifika belgeleri yok.** `find public -name "*.pdf"` → **boş**; `public/certs/` mevcut değil. Sertifikalar jenerik etiket ("Gıda Güvenliği", "Soğuk Zincir") olarak listeleniyor (`data.ts:458-465`) — GLOBALG.A.P/ISO 22000/BRC/HACCP gibi isimli standart yok. Sayfa bunu itiraf ediyor: *"Resmi belgeler operatör dosyalarıyla yayınlanacaktır"* (`sertifikalar/page.tsx:57`).
- **🟠 siteConfig iletişim verileri placeholder.** `phone:"+90 324 000 00 00"`, `whatsapp:"+90 532 000 00 00"` (`data.ts:26-27`) — bu sahte numaralar canlı sitede `tel:`/`wa.me` linklerinde kullanılıyor. Sosyal linkler `"#"` (`data.ts:30-32`).
- **🟠 İletişim formunda Country + Product alanı yok** (`contact.ts:8-19`), Google Maps embed yok (`iletisim/page.tsx`) — CLAUDE.md 5.5'te şarttı.
- **🟡 Eksik B2B sayfalar:** Distribütör/bayi başvuru sayfası ve Case study/referans sayfası **yok** (route yok). Mevcut testimonial'lar jenerik/logosuz.

### 💡 Aksiyon Planı
1. **(Yüksek)** `Product` tipini genişlet: `variety`, `caliberRange`, `weightRange`, `brix`, `incoterms[]`, `moqKg`, `containerLoad`, `coldChainTemp`, `shelfLifeDays`, `hsCode`, `seasonMonths[]`. 8 üründeki "Placeholder" değerleri gerçek veriyle doldur. Sertifika PDF slotlarını kur, isimli standartları listele.
2. **(Orta)** siteConfig placeholder iletişimi düzelt. Forma Country+Product select ekle. İletişim'e Google Maps embed.
3. **(Düşük)** Distribütör başvuru + case study sayfası. Sezonu ay bazlı takvime çevir.

---

## 🎯 GÖREV 3 — UX/UI & DÖNÜŞÜM HUNİSİ
**Skor:** 5 / 10
**Senaryo:** Alman distribütör Mersin narenciye/karpuz arıyor, 5 ton FOB teklif istiyor.
**Click depth (teklife kaç tık):** **1 tık** (header "Get a Quote" → `/iletisim`) — ama ulaşılan form B2B değil.

### ✅ Güçlü Yönler
- **Düşük tık derinliği, çift CTA.** Header'da hem desktop (`header.tsx:66`) hem mobil sheet (`:147`) "Teklif Al" pill. Hero ghost CTA da 1 tıkta forma (`hero-slider.tsx:120-122`).
- **WhatsApp FAB gerçekten global** (`layout.tsx:175`, her sayfada). Dil değiştirici header'da, aktif yolu koruyor (`language-switcher.tsx:17`).
- **Ürün adı ön-dolduruluyor.** QuoteModal `defaultSubject` ile ürün adını konuya basıyor (`quote-modal.tsx:61`), webhook'a iletiyor (`route.ts:52`).
- **CTA buton kontrastı AAA** (accent+ink 7.97:1).

### ❌ Zayıf Yönler / Drop-off Noktaları
- **🔴 Form B2B RFQ için yapılandırılmamış** (en yüksek dönüşüm kaybı). Şemada yalnız `name/email/phone/company/subject/message/website` var (`contact.ts:8-21`). **Yok:** ürün/kategori seçimi, tonaj, teslim limanı, **Incoterm**, varış ülkesi, alıcı tipi. Distribütör "5 ton FOB Mersin → Hamburg" talebini **serbest metin `message`'a yazmak zorunda** → satış ekibi teklifi standardize edemez.
- **🔴 Sosyal kanıt sahte/placeholder.** `testimonials.tsx:24` literal "Logo 1/2/3" gri kutular, alıntılar anonim ("Procurement Manager, Retail Chain"). Sahte görünüm B2B'de **güveni azaltır**.
- **🟠 Düşük kontrastlı vurgu metni (AA FAIL).** `text-accent-500 #F39A3E` beyaz/krem üzerinde **2.21:1**; 15 dosyada (`product-card.tsx:53`, `[slug]/page.tsx:121`). Hero eyebrow `#12551C` üzerinde 4.06:1 — yine AA altı.
- **🟠 WhatsApp FAB ön-doldurulmuş mesaj yok** (`whatsapp-fab.tsx:14`, `?text=` yok) — açılınca boş ekran, ürün bağlamı kaybolur.
- **🟡 Başarı sonrası sonraki adım yok** (`contact-form.tsx:62-78`) — geri-dönüş süresi/katalog/WhatsApp yok; yüksek niyetli lead soğur. Ürün kartında doğrudan "Teklif İste" CTA yok (`product-card.tsx:56-60`, sadece "İncele").

### 💡 Aksiyon Planı (5 somut iyileştirme)
1. **(Yüksek)** Formu yapılandırılmış RFQ'ya çevir: product/category select + quantity+unit + incoterm select + destinationPort/Country + buyerType. QuoteModal'dan ürün bağlamını ön-doldur.
2. **(Yüksek)** Gerçek sosyal kanıt yerleştir ya da "Logo N" yerine "25+ ülke" + bayrak bandı gibi doğrulanabilir güven sinyali koy.
3. **(Orta)** Beyaz zemin `text-accent-500` → `text-accent-700 #B85E10` (≥4.5:1). WhatsApp FAB'a `?text=` bağlam mesajı.
4. **(Orta)** Sertifika logo strip'ini footer'a (her sayfa görünür güven).
5. **(Düşük)** Başarı ekranına sonraki adım; ürün kartına "Teklif İste" CTA (grid'den teklife 1 tık).

---

## 🎯 GÖREV 4 — SEO & ULUSLARARASI ERİŞİLEBİLİRLİK
**Skor:** 5.5 / 10

### ✅ Güçlü Yönler
- **JSON-LD çeşitliliği:** Organization + WebSite (global, `layout.tsx:151-159`), Product + BreadcrumbList (ürün detay, `urunler/[category]/[slug]/page.tsx:83-107`), Article (blog). `metadataBase` tanımlı (`layout.tsx:56`).
- **`generateMetadata` kapsamı geniş** (Home hariç tüm route'larda); ortak `buildMetadata` title/desc/OG/Twitter'ı tutarlı üretiyor (`metadata.ts:18`).
- **robots.ts doğru** (`/api/` disallow, sitemap+host, `robots.ts:10-19`). `googleBot max-image-preview:large` (`layout.tsx:108-117`).

### ❌ Zayıf Yönler / Riskler
- **🔴 EN sayfaları TR URL'ine canonical veriyor (duplicate-content bombası, komutla teyit).** `buildMetadata` canonical olarak ham `path` döner, `/en` öneki eklemez (`metadata.ts:29` → `alternates:{ canonical: path }`). `metadataBase=siteConfig.url` olduğundan `/en/corporate/hakkimizda`'nın canonical'ı TR URL'ine işaret eder → Google'a "EN'i indeksleme" sinyali. Aynı hata ürün (`[slug]/page.tsx:47`) ve blog'da (`blog/[slug]/page.tsx:163`). **En kritik SEO bulgusu.**
- **🔴 Sitemap'te HİÇ EN route yok + hreflang yok.** `sitemap.ts:33-52` yalnız TR URL üretiyor; `alternates.languages` hiç kullanılmamış → `/en/...` keşfedilemez, TR↔EN eşleşmesi kurulamaz. Sayfa düzeyinde hreflang de yok (yalnız home layout'unda ve o da alt sayfalara miras geçmiyor, `x-default` yok).
- **🟠 OG image SVG.** `og-default.svg` (`layout.tsx:92,103`, `metadata.ts:23`) + blog OG'leri `.svg`. **Facebook/LinkedIn/WhatsApp/X SVG render ETMEZ** — B2B'de LinkedIn paylaşımında önizleme boş çıkar. PNG/JPG 1200×630 gerekli.
- **🟠 Home'da `generateMetadata` yok** (`page.tsx`) — en güçlü SEO sayfası jenerik default başlık/açıklama miras alıyor. WebSite JSON-LD `inLanguage:"tr-TR"` sabit (`jsonld.ts:41`), EN'de bile TR bildiriyor.
- **🟠 258MB medya, CDN/LFS yok.** `original/` gitignore'da (✓), ama optimized+thumbnails+videos (~72MB) git'te + tüm görseller app origin'inden serviste (CDN/edge cache yok) → uluslararası ziyaretçi için yüksek TTFB/LCP riski.
- **🟡 Alt text görsel-spesifik değil** (Görev 5 ile örtüşür): manifest `caption` var ama component'ler alt'ı `category.title`/`product.title`/`slide.title`'dan türetiyor (`category-mega-grid.tsx:35` vb.) → narenciye fotosu için alt="Ürünler" gibi zayıf. Product JSON-LD'de `offers`/`availability` yok.

### 💡 Aksiyon Planı
1. **(Yüksek)** Canonical'ı locale-aware yap: EN için `/en${path}` + `alternates.languages:{tr,en,"x-default"}` (`metadata.ts:18-29`, ürün+blog). Sitemap'i EN route + hreflang ile yeniden yaz. OG'leri PNG'ye çevir (ideal: dinamik `opengraph-image.tsx`). Home'a `generateMetadata`.
2. **(Orta)** Medyayı Git LFS/CDN'e taşı + `remotePatterns` daralt. Alt'ları manifest caption'ından türet. JSON-LD `inLanguage`'ı locale'e bağla; Organization'a `areaServed`+`knowsLanguage`.
3. **(Düşük)** Product JSON-LD'ye `offers` (priceCurrency/InStock). `apple-touch-icon` + `icon.tsx`.

**İlk 10 keyword (B2B):** fresh citrus exporter Turkey / Türkiye narenciye ihracatçısı · Mersin orange supplier FOB Mersin port · Turkish mandarin wholesale export · watermelon exporter Turkey / karpuz ihracatı · Çukurova lemon grapefruit supplier · cold storage packing house citrus Turkey · melon export Turkey wholesale · Turkey fresh fruit B2B supplier · citrus FOB price Turkey · GLOBALG.A.P certified citrus exporter Turkey.
> Not: EN keyword'ler canonical+sitemap+hreflang+PNG-OG düzeltilmeden trafiğe dönüşmez.

---

## 🎯 GÖREV 5 — GÖRSEL ASSET & FOTOĞRAF
**Skor:** 6 / 10

### ✅ Güçlü Yönler
- **Optimizasyon yapılmış.** `optimized/` 37MB + `thumbnails/` 4MB + `videos/` 31MB (185MB ham arşivden); foto uzun kenar 1920px sınırlı, ort. 431KB. EXIF `-strip` ile temizlenmiş (KVKK iyi).
- **Manifest tipli ve dolu.** 96 entry'de `width/height/sizeKb/category/caption/hero/quality` **hiç null yok** (kategori 96/96 dolu). `manifest-reader.ts` tipli erişim sunuyor.
- **Video poster pipeline doğru** (`videos/posters/*.jpg`); ana sayfada autoplay yok, lightbox'ta lazy → iyi LCP kararı. `next/image` `sizes` 11/11 mevcut, priority sadece LCP'de.

### ❌ Zayıf Yönler / Riskler
- **🔴 `alt` field manifest'te HİÇ YOK (0/96), `captionEn` 96/96 NULL.** 88 fotonun anlamlı TR caption'ları alt olarak kullanılmıyor; EN sitesinde tüm görsel metinleri (video-grid alt/aria-label/görünür caption) **Türkçe kalıyor** (`video-grid.tsx:44,48,58`) → ihracat sitesinin asıl hedef kitlesi için a11y+SEO+dönüşüm kaybı.
- **🟠 İçerik profili B2B kurumsaldan çok kişisel arşiv.** 88 fotonun **85'i portrait, 3'ü landscape**; çoğu 1080×1920 telefon dikey. Hero/full-bleed bölümler yatay ister → iPhone dikey çekimler kötü kırpılır. Profesyonel/drone yok denecek kadar az.
- **🟠 Kategori dağılımı aşırı dengesiz.** Narenciye 68 (%77), karpuz 11, saha(video) 8, lojistik 7, **tesis 1, kurumsal 1**, **kavun 0** (CLAUDE.md istiyor ama hiç yok). Tesis/Hakkımızda sayfaları tek görselle taşınamaz.
- **🟡 En büyük video 14.8MB**, çözünürlükler düşük (404×720 tipik, 720p hedefe ulaşılmamış). Video sayım tutarsızlığı: manifest 8, diskte 7 mp4. `date` field 0/96 (CLAUDE.md şemasında zorunluydu).

### Kategori Dağılımı
| Kategori | Adet | Not |
|---|---|---|
| narenciye | 68 | %77 — aşırı baskın |
| karpuz | 11 | ikincil |
| saha (video) | 8 | hero'da kullanılmıyor |
| lojistik | 7 | zayıf ama var |
| tesis | 1 | kritik eksik |
| kurumsal | 1 | kritik eksik |
| **kavun** | **0** | istenen ama yok |
| TOPLAM | 96 | hero=true: 22 |

### 💡 Aksiyon Planı
1. **(Yüksek)** Manifest'e `alt`+`altEn` ekle, component'leri bağla. `captionEn` doldur, EN locale'de `locale==="en"?captionEn:caption`.
2. **(Orta)** Müşteriden yatay/drone/tesis/kavun çekimi iste; geçici en iyi 3 landscape'i hero'ya öncele. Ağır videoları yeniden encode et.
3. **(Düşük)** Video sayım tutarsızlığını gider; `date` field'ı geri ekle; `original/` `.dockerignore`'da olduğunu teyit et (git'te ignored ✓).

---

## 🎯 GÖREV 6 — SEKTÖR BAĞLAMI (B2B TARIM İHRACAT)
**Skor:** 4.5 / 10

### ✅ Güçlü Yönler
- **Doğru sektör anlatısı.** 6 adımlı proses akışı (`uretim/tesis`) rakip "Facilities" yapısıyla birebir. Mersin Limanı + FOB/CFR/CIF + ihracat evrak akışı doğru konumlanmış (`uretim/lojistik`). Çukurova gerçekten Türkiye limonunun %90'ı, greyfurtun %99'u → "Mersin'den ihracat" iddiası gerçek üretim merkezine dayanıyor.
- **Year-round tedarik hikayesi kanıtlanabilir:** narenciye (Ağu–May) + kavun/karpuz (Nis–Eyl) = takvim boşluğunu kapatır. İzlenebilirlik dili (parti takibi, menşe, soğuk zincir) AB alıcısının (CBI) aradığı dil. Bilingual veri modeli (`I18nText`) Arapça/Rusça eklemeye hazır.

### ❌ Zayıf Yönler / Riskler (rakip analizine dayalı)
- **🔴 Sertifika sayfası boş — alıcı için anında eleme.** AB için table-stakes (opsiyonel değil): **GLOBALG.A.P+GRASP, BRCGS/IFS (GFSI), SMETA/Sedex, ISO 22000**; Körfez için GSO 2055-2 Helal + SFDA. Hiçbiri adıyla yok. Rakipler tam doldurmuş (aşağıda).
- **🔴 Hiç kurumsal güven sinyali yok.** `siteConfig`'te Mersis no, vergi no, ticaret sicil no **yok** (CLAUDE.md `legal{}` öngörmüş, kodda tanımlanmamış). **AKİB / İhracatçı Birliği üyeliği yok. Fuar katılımı yok** (rakiplerin en güçlü güven sinyali).
- **🟠 Ölçek rakamları zayıf.** `stats` = 35 yıl / 3 ürün grubu / 12 ay. Rakipler somut: Eren "62 ülke, 25.000 ton/yıl, 23.150 m²"; Alanar "5 kıta, 8.000 ton, 6.700 dekar". İhracat ülke sayısı/ton/tesis m² yok.
- **🟠 Ayrı sezon takvimi sayfası yok.** Year-round iddiası var ama onu kanıtlayan ay-ay görsel takvim arayüzü yok (Eren/Köse modeli). Sürdürülebilirlik sayfası içerikçe zayıf (GRASP/SMETA hikayesi yok).

### 3 Rakip Özeti
1. **Eren/Fresh Anatolia** (Mersin, aynı şehir/ürün): 62 ülke/25.000 ton/23.150 m², sertifikalar adıyla (GlobalGAP, SMETA, SEDEX, BRC, ISO 22000), **Product Seasons takvimi**, **"Get Offer" RFQ**, 5 dilli. En yakın rakip, çıtayı koyan.
2. **Alanar Fruit** (Bursa, premium): 40M$+ yatırım, dikey entegrasyon hikayesi görünür (grower-packer-exporter), GlobalGAP+BRC+LEED rozet bandı, indirilebilir katalog.
3. **Köse Narenciye** (Mersin): değeri **ay-ay görsel Season Calendar** (Washington Navel Oca–Kas, Karpuz Nis–Eyl, Kavun Tem–Ara) — year-round kanıtının nasıl görselleştirileceğinin örneği.

### 5 Özgün USP (kanıtlanabilir, jenerik "kalite/X yıl" değil)
1. **"12 Ay Kesintisiz" — çift dikey takvim.** Narenciye + Kavun/Karpuz kombinasyonu ay-ay takvim sayfası. Sadece-narenciye rakipler bunu yapamaz → tek tedarikçiyle yıl boyu konteyner isteyen alıcı için farklılaştırıcı.
2. **Kendi bahçe + sözleşmeli üretici ağı** — izlenebilirlik (kendi bahçe) + hacim esnekliği (ağ). "Küçük partiden tam konteynere ölçeklenebilir tedarik".
3. **Mersin Limanına X km / hasattan konteynere Y saat** — yakınlığı somut zaman çizelgesiyle (soğuk zincir bütünlüğü = düşük fire).
4. **GFSI paketleme + GLOBALG.A.P bahçe = "AB rafına hazır dosya"** — ithalatçının due-diligence dosyası gün bir hazır (indirilebilir sertifika PDF + no/geçerlilik).
5. **Kalibre garantili koli** — varyete×kalibre×ambalaj matrisi (örn. "Portakal 56/64/72/88 count, 15kg koli, palet 80 koli"). Market zinciri raf standardı için somut farklılaştırıcı.

### 💡 Aksiyon Planı
1. **(Yüksek)** Placeholder iletişimi düzelt; sertifikaları adıyla listele (gelmeden bile "hedeflenen" olarak); `legal{}` bloğu (Mersis/vergi/AKİB) + footer; ürün kalibre/ağırlık placeholder'larını gerçek değerle doldur.
2. **(Orta)** Ayrı sezon takvimi sayfası; somut ölçek rakamları; ürün-bağlamlı RFQ; sertifika PDF altyapısı.
3. **(Düşük)** Fuar/kurumsal güven sayfası; Körfez (Helal/GSO + Arapça); sürdürülebilirlik içeriği; dikey entegrasyon hikayesi.

---

## 🚨 ACİL YAPILMASI GEREKENLER (Top 5)
1. **🔴 CANLI SİTE 503 DÖNÜYOR** (komutla teyit): `https://usluduyar.evohaus.org/` ve `/en` → HTTP 503. Son commit "standalone start script revert" (16:40) — deploy yarım/başarısız. **Çıkış bloklu.** Coolify build log + `node server.js` start path'i doğrula.
2. **🔴 LOGO HÂLÂ "EREN TARIM"** (komutla teyit): `public/images/logos/logo.svg` ve `logo-dark.svg` "Eren" içeriyor. Marka kimliği yanlış — gerçek Uslu Duyar logosuna çevir.
3. **🔴 EN SAYFALARI TR'YE CANONICAL VERİYOR** (`metadata.ts:29`) — duplicate-content sinyali, EN içerik indeksten düşebilir. Locale-aware canonical + sitemap EN + hreflang.
4. **🟠 Telefon/WhatsApp placeholder** (`+90 324 000 00 00`, `data.ts:26-27`) — gerçek numara olmadan teklif kanalı boşa düşer.
5. **🟠 Teklif formu B2B RFQ değil** (ürün/tonaj/Incoterm/liman yok) + webhook secret/rate-limit yok.

---

## 💎 BONUS: HIZLI KAZANIMLAR (1-2 saat)
- **Logo metnini değiştir** (SVG `<text>` + `aria-label`) — 10 dk, marka düzeltmesi.
- **Canonical'a `/en` öneki** + sitemap'e EN locale döngüsü — EN indekslemeyi anında açar.
- **Beyaz zemin `text-accent-500` → `text-accent-700 #B85E10`** (2.21:1 FAIL → AA PASS) — tek token.
- **Ölü 3 paketi kaldır** (`pnpm remove resend recharts react-simple-maps`).
- **Webhook'a `X-Webhook-Secret` header** (env) — 15 dk, abuse yüzeyi kapanır.
- **WhatsApp FAB'a `?text=` bağlam mesajı** + sertifika logo strip'ini footer'a.

---

## 📊 SKOR TABLOSU
| Kategori | Skor | Not |
|---|---|---|
| Teknik Mimari | 7.5/10 | Strict TS sıfır any, sağlam i18n; webhook auth + reduced-motion guard + ölü paket eksik |
| Sayfa Yapısı & İçerik | 5.5/10 | 19 route gerçek içerikli; B2B ürün alanları + sertifika PDF + iletişim placeholder |
| UX/UI & Dönüşüm | 5/10 | Tık derinliği düşük ama teklif formu B2B değil, sosyal kanıt sahte, kontrast AA-altı |
| SEO & Erişilebilirlik | 5.5/10 | JSON-LD zengin; EN canonical TR'ye gidiyor, sitemap EN yok, OG SVG, 258MB medya |
| Asset Pipeline | 6/10 | Pipeline tam; alt/captionEn 0, %85 dikey iPhone, kavun 0, dağılım dengesiz |
| Sektör Bağlamı | 4.5/10 | Çerçeve doğru; sertifika/legal/ölçek/sezon takvimi = kullanılmamış kazanma kaması |
| **TOPLAM** | **6.4/10** | Sağlam teknik temel; B2B ihracat satış katmanı, uluslararası SEO ve rebrand/deploy yarım |

---

### Kapanış Notu
Bu proje **kötü bir iş değil — teknik temeli çoğu ajans çıktısından iyi** (strict TS, temiz i18n, disiplinli görsel pipeline, lint/typecheck temiz). Sorun "yapılmamış" değil, **"yarım bırakılmış"**: deploy (503), rebrand (logo "Eren"), uluslararası SEO (EN canonical bug + sitemap), gerçek müşteri verisi (telefon/sertifika), ve **B2B ihracat satış katmanının hiç eklenmemiş olması** (RFQ formu, ürün spec sheet, sezon takvimi, legal güven bloğu).

**Önerilen sıra:** önce **Acil Top 5** (deploy + marka + canonical + iletişim + form) — çıkışı açan ve güvenilirliği kuran kalemler; sonra **B2B ihracat katmanı** (rakiplerin yarısının atladığı 4 kama: spec sheet + loadability + RFQ + ay-ay sezon takvimi + adıyla sertifika). Bu sırayla Uslu Duyar sektördeki çoğu Türk ihracatçı sitesini geçer.

> **Önceki rapora göre değişen:** Bu denetim, ilk versiyonda yer almayan **EN→TR canonical bug'ını** (en kritik SEO açığı) tespit etti ve sektör bağlamını (Görev 6) canlı rakip araştırmasıyla daha sert puanladı (4.5 vs 6) — sertifika+legal+ölçek eksiklerinin AB alıcısı için "anında eleme" ağırlığı netleşti. 503 ve logo "Eren" sorunları dünden beri **çözülmemiş** (komutla teyit).
