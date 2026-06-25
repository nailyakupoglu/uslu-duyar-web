# 🍊 BENNYFRUIT.COM — SİTE ANALİZİ
**URL:** https://www.bennyfruit.com  
**Tarih:** 24 Haziran 2026  
**Amaç:** Mersinli değirmenci/biberci/Eren Tarım için üst-seviye kurumsal site için referans.

---

## 1. KİMLİK & KONUMLANDIRMA
- **Firma:** Benny Fruit S.P. Z.O.O. (Polonya, Radom)
- **Sektör:** Taze meyve-sebze ithalatçısı & distribütörü
- **Hedef Pazar:** AB süpermarket zincirleri
- **Ana Mesaj:** "12 ay boyunca Türkiye/İtalya/Yunanistan'dan taze tedarik"
- **Görsel Kimlik:** Koyu yeşil (#0D4525) + siyah (#111) gradient, beyaz metin, lüks/fresh hissi
- **Dil:** Çok dilli (varsayılan İngilizce `/en/`), responsive

---

## 2. TEKNİK YAPI
| Katman | Teknoloji |
|---|---|
| **Template** | **Canvas HTML Template** (techdijital / SemiColon) — jQuery + Bootstrap |
| **CSS** | bootstrap.css, swiper.css, animate.css, magnific-popup.css, font-icons.css, custom.css, dark.css |
| **JS** | jQuery 3, plugins.js, jquery.hotspot.js (ürün görseli üstü interaktif noktalar!), flatpickr (tarih seçici TR locale), functions.js |
| **Slider** | Swiper (full-screen hero, autoplay 24000ms, data-speed 450 parallax) |
| **Hotspot** | jquery.hotspot.js → ürün görselinin üstünde tıklanabilir noktalar (ürün hikayesi anlatımı) |
| **Layout** | Bootstrap 5 grid, "block-card-9", "gutter-40/20", "min-vh-50", "rounded-3" |
| **Font** | System + icon font (`icon-line-*`, `icon-angle-up` vb — LineIcons ailesi) |
| **Renkler** | `#0D4525` (koyu orman yeşili), `#111`, `#fff`, `rgba(13,69,37,0.6)` overlay |
| **Animasyonlar** | Swiper parallax, animate.css (fade/slide), smooth scroll, lazy load `data-bg` |
| **Geliştirici** | `techdijital` (footer'da imza var) |

---

## 3. SAYFA MİMARİSİ
```
/
├── / (home — slider + ürün vitrini + üretim 4'lüsü)
├── /products (ürün grid kartları)
│   ├── /products/vine-tomatoes
│   ├── /products/round-tomatoes
│   ├── /products/grapefruits
│   ├── /products/watermelons
│   ├── /products/black-figs
│   ├── /products/mandarins
│   ├── /products/lemons
│   └── /products/cucumbers
├── /corporate (about-cluster)
│   ├── /corporate/1/about-us
│   ├── /corporate/2/quality-policy
│   ├── /corporate/3/vision-mission
│   └── /corporate/4/sustainibility
├── /production
│   ├── /production/1/growing
│   ├── /production/5/certificates
│   ├── /production/6/warehouse
│   ├── /production/7/capacity
│   └── /production/8/logistics
└── /contact
```

---

## 4. ANA SAYFA BÖLÜMLERİ (yukarıdan aşağı)
1. **Top Bar** — `info@bennyfruit.com` + "Radom Poland" linki
2. **Header** — Logo (180px) + dil/ürün nav + telefon
3. **Hero Slider** — Full-screen video/image, gradient overlay, parallax
4. **Ürün Vitrini** — 8 ürün kartı (Vine Tomato, Round Tomato, Grapefruit, Watermelon, Black Figs, Mandarins, Lemons, Cucumbers) — her biri `logo.png` ile tek satır → **her ürün için profesyonel fotoğraf ŞART**
5. **Üretim 4'lüsü** — Büyük görsel kartlar (parallax/lazy-load):
   - **CERTIFICATES** (HACCP, GLOBALGAP/GRASP, BRC, IFS)
   - **WAREHOUSE** (Varşova 2.500 m², 3 soğuk oda 2-6°C, 500 m² ofis, 3.000 m² manevra, 2 ramp)
   - **CAPACITY** (5 soğuk depo, 2.000 ton)
   - **LOGISTICS** (refrigerated filo, gerçek zamanlı izleme, optimize rotalar)
6. **Footer** — Logo + iletişim + adres + şirket kodu + vergi no + sosyal (Instagram)

---

## 5. ÜRÜN DETAY SAYFASI
- Tek sütun, `single-product` → `product` → `row gutter-40`
- `col-lg-4 min-vh-50` grid kartlar, `grid-inner rounded-3`, `grid-image lazy` + `bg-overlay dark`
- `bg-overlay-content flex-column justify-content-between` → metin overlay'i
- **Hero görseli çok büyük (50vh minimum)** — her ürünün görsel kalitesi kritik

---

## 6. MERSİN DEĞİRMENCİ/BİBERCİ/EREN TARIM'A UYARLAMA HARİTASI

| Bennyfruit | Mersin Karşılığı (öneri) |
|---|---|
| 8 ürün (tomato/grapefruit/...) | Silaj mısır, buğday, arpa, kırmızı toz biber, biber salçası, pul biber, baharat karışımları, yem hammaddesi |
| Üretim 4'lüsü (Cert/Warehouse/Cap/Logistics) | Sertifikalar / Tesis / Kapasite / Lojistik + Tarladan Hasada görsel hikâye |
| Warehouse 2.500m² + 3 soğuk oda | Mersin tesis: silo kapasitesi, öğütme hattı, paketleme, depolama |
| Logistics — refrigerated filo | Mersin → liman → dünya pazarı + iç piyasa TIR/lojistik |
| Quality certifications | ISO 22000, Helal Sertifikası, Organik, HACCP, GLOBALG.A.P., USDA Organic |
| Vision/Mission/Sustainability | "Tarladan Sofraya" + sürdürülebilir tarım + karbon ayak izi |
| Tek dil İngilizce | TR + EN (opsiyonel AR/RU — Ortadoğu/Rusya pazarı için) |

---

## 7. NEYİ ÖRNEK ALMALI / NEYİ GEÇMELİ

### ✅ Alınacaklar (üst seviye öğeler)
- Full-screen hero slider (video loop)
- Parallax lazy-load görseller
- Ürün grid kartları (büyük, rounded, overlay metin)
- **jquery.hotspot.js** → ürün görselinde interaktif noktalar (BİBER HARİTASI gibi!)
- Sertifika galerisi (HACCP/ISO)
- Tesis bölümü (rakamlarla: m², ton, °C)
- Lojistik bölümü (refrigerated filo, gerçek zamanlı izleme)
- Footer koyu gradient (premium his)

### 🚀 Geçilecekler (modern stack)
- **jQuery → Next.js 14 + React 18** (daha hızlı, SEO üstün, server components)
- **Bootstrap → Tailwind CSS + shadcn/ui** (özel tasarım, küçük bundle)
- **Swiper → Embla Carousel** (React-native)
- **animate.css → Framer Motion** (gerçek fizik tabanlı animasyonlar)
- **Canvas HTML → Özel tema** (renk paleti Mersin'e özel)
- **jQuery Hotspot → React-Hotspot** (tıklanabilir tarla/tesis haritası)
- **Düz sayfa → CMS entegrasyonu** (Sanity veya Payload — müşteri kendi içeriğini girsin)

### 🎨 Renk paleti önerisi (Mersin için)
```
Ana:    #0D4525 (koyu orman yeşili — Bennyfruit ile aynı, güven/tarım)
Vurgu:  #D4A017 (altın — buğday, baharat)
Aksan:  #C0392B (kırmızı — kırmızı toz biber!)
Toprak: #8B4513 (toprak kahve)
Krem:   #FAF7F2 (premium açık arkaplan)
```

---

## 8. ÇIKARILACAK GÖRSEL LİSTESİ
Bennyfruit 7 ana görsel kullanıyor:
1. Hero slider 1: hasat
2. Hero slider 2: paketleme hattı
3. Hero slider 3: tır/yükleme
4. Certificates görseli
5. Warehouse görseli
6. Capacity görseli
7. Logistics görseli

→ **Mersin için en az 10 profesyonel fotoğraf çekilmeli** (drone tarla, silo, öğütme hattı, paketleme, laboratuvar, TIR, liman yükleme, ekip, ürün, logo).
