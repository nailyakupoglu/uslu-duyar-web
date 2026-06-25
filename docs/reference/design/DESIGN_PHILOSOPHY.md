# Design Philosophy: **Anatolian Harvest Modernism**

> Mersinli bir değirmenci/biberci/silaj firması için; Bennyfruit'in görsel ritmini, Apple'ın fotoğrafçılığını, Framer'ın dark cinematic estetiğini ve Stripe'ın premium kurumsallığını **tek bir özgün hareket** olarak birleştiren tasarım felsefesi.

---

## Hareketin Adı

**Anatolian Harvest Modernism** — Anadolu'nun bereketli topraklarının modern endüstriyel mükemmellikle buluşması. Hasat edilen ürünün fabrikada dönüşen hikâyesini, 30 yıllık birikimin teknolojiyle evrimini, güneşin toprağı kavurduğu Mersin ovalarından dünya pazarına uzanan yolu **görsel** olarak anlatır.

---

## Felsefenin Özü (4-6 paragraf)

### 1. Toprağın Ağırlığı, Teknolojinin Hafifliği

Bu tasarım felsefesi iki karşıt kuvveti dengede tutar: **toprağın ağırlığı** ile **teknolojinin hafifliği**. Görsel hiyerarşide, yumuşak altın sarısı buğday tarlaları ve doygun kırmızı biber sergileri **ağır, yerçekimine bağlı, sabit** öğeler olarak yer alır — bunlar sayfanın altında, sabit, bir temel gibi dururlar. Üzerlerinde ise **hafif, yüzen, saydam cam** yüzeyler, ince yazılar, küçük rakamlar uçuşur — teknoloji bir sis gibi toprağın üstünden süzülür. Hiçbir tasarım öğesi sadece dekoratif değildir; her parça Mersin'den dünyaya akan ürünün bir aşamasını temsil eder. Tasarım, bu iki kuvveti **ayrı katmanlarda** ama **aynı sayfada** buluşturur.

### 2. Hasat Ritmi, Fabrika Hassasiyeti

Tasarımın temposu, hasat mevsiminin organik düzensizliği ile endüstriyel üretimin matematiksel kesinliği arasında sürekli geçiş yapar. Sayfa kaydırıldıkça, bir bölüm toprağın dokunsallığını (parallax, Ken Burns zoom, organik tipografi) sunarken, bir sonraki bölüm fabrika hassasiyetine (grid, tabular rakamlar, mavi gölge, 8px köşe yarıçapı) geçer. Bu ritim, tarımın kendi doğasını yansıtır: **hasat doğal, işleme hassas, sevkiyat dakik**. Tasarım, bu üç evrenin kesintisiz akışını sağlar.

### 3. Sıcak ve Soğuk Arasında

Sıcaklık, hiçbir zaman ham bir renk yığını olarak değil, **bir ölçüde** ortaya çıkar. Buğday altını (`#D4A017`) tek başına bir renk değil, bir karakterdir — sadece başlık vurgularında, "Hasat Zamanı" gibi özel anlarda, küçük dozlarda kullanılır. Mersin kırmızısı (`#C0392B`) biberin kendisi kadar görkemli, ama sadece ürün fotoğrafının etrafındaki ince çerçevelerde, "İhracat" rozetlerinde, vurgu noktalarında görünür. Geri kalan her yer **orman yeşili** (`#0D4525`) ve **krem** (`#FAF7F2`) üzerine kuruludur — sessiz, prestijli, gıda güvenliği çağrıştıran bir palet. Tasarım, **sıcağı kontrol ederek soğuğu güçlendirir**.

### 4. Usta Eli Değmiş Gibi

Her piksel, sanki tek bir zanaatkarın elinden çıkmış gibi **kusursuz işlenmiştir**. Tipografi ölçekleri tam sayı değerlerine oturur (56px değil 55.7px gibi duyarlı ayarlamalar); gölgeler **çift katmanlı** (uzak mavi gölge + yakın siyah gölge) hesaplanır; her butonun köşe yarıçapı, padding'i, hover transition'ı tutarlı bir 8px grid sistemine bağlıdır. Hiçbir şey "yeterince iyi" değildir — her detay **sayısız kez düzeltilmiş** gibi görünmelidir. Bir müşteri sahneye baktığında "Bu sitenin yapımına yüzlerce saat harcanmış" hissetmeli. Bu felsefe, "AI üretti" hissini tamamen reddeder; **ustaca zanaat** hissini zorlar.

### 5. Fotoğraf, Tasarımın Yarısıdır

Bu sitede metin minimaldir, fotoğraf **çoğunluktadır**. Her bölüm, **gerçek bir Mersin tarlasını, gerçek bir öğütme hattını, gerçek bir biber sergisini, gerçek bir TIR'ı** gösterir. Tasarım, fotoğrafları çerçevelemek için var — onları **küçültüp süslemez**, tam ekran gösterir, derinliklerini korur, kenarlarını yumuşatır ama özlerini bozmaz. Fotoğraf, markanın kendisidir; tipografi ve grafik, fotoğrafın hikâyesini **sessizce destekler**, asla onun önüne geçmez.

### 6. Zaman İçinde Yaşayan Bir Site

Tasarım, **statik değil**, yaşayan bir organizmadır. Sayfa yüklendiğinde hero başlığı **karakter scramble** ile belirir; sayfa kaydırıldıkça görseller Ken Burns yavaş zoom yapar; rakamlar **count-up** ile 0'dan hedefe ulaşır; kartlar **stagger fade-up** ile domino gibi düşer; hover'da her buton **manyetik** olarak parmağınıza gelir; sertifika logoları **marquee** ile akar. Tasarım, kullanıcının dikkatini **asla kaybetmemek** için sürekli nefes alır, ama bunu yaparken **asla dikkat dağıtmaz**. Her animasyon bir amaca hizmet eder; hiçbiri süs değildir.

---

## Görsel Sisteme Çeviri

### Renk Paleti
```
Orman Yeşili (primary):   #0D4525  — güven, tarım, premium
Buğday Altını (accent):    #D4A017  — hasat, bereket (az kullanılır)
Biber Kırmızısı (accent2): #C0392B  — Mersin vurgusu (çok seyrek)
Toprak Kahve (earth):      #8B4513  — doğal kök
Krem (cream):              #FAF7F2  — açık arkaplan
Mürekkep (ink):            #0E0E0E  — koyu metin
Beyaz:                     #FFFFFF
```

### Tipografi Sistemi
- **Display (başlıklar):** `Playfair Display` — Anadolu'nun edebi geleneği, serif, dramatik
- **Body (gövde):** `Inter` — modern, nötr, okunaklı
- **Mono (kod/veri):** `JetBrains Mono` — teknik detaylar, sertifika numaraları
- **OpenType:** Inter için `cv01, cv05, cv09, cv11, ss03, ss07` aktif
- **Hierarchy:** Display 56-96px / Heading 32-48px / Body 16-18px / Caption 12-14px
- **Letter-spacing:** Display -2px (sıkı), Body normal, Caption +0.5px (gevşek)

### Layout Grid
- **Base:** 8px
- **Container:** max 1280px, padding 24px mobil / 48px desktop
- **Section gap:** 96px desktop / 64px mobil
- **Bento Grid:** 12-col, gap 16px

### Köşe Yarıçapı (Border Radius)
- Buton: 4px (Stripe gibi sıkı, pill değil)
- Kart: 8px
- Hero görsel: 16px
- Modal: 12px
- Sertifika rozeti: 50% (dairesel)

### Gölge Sistemi (Stil bileşimi)
```css
/* Level 1 — Subtle lift */
box-shadow: rgba(23, 23, 23, 0.06) 0px 3px 6px;

/* Level 2 — Standard card */
box-shadow: rgba(23, 23, 23, 0.08) 0px 15px 35px 0px;

/* Level 3 — Featured (Stripe tarzı mavi-tinted) */
box-shadow:
  rgba(50, 50, 93, 0.25) 0px 30px 45px -30px,
  rgba(0, 0, 0, 0.1) 0px 18px 36px -18px;

/* Level 4 — Modal */
box-shadow:
  rgba(3, 3, 39, 0.25) 0px 14px 21px -14px,
  rgba(0, 0, 0, 0.1) 0px 8px 17px -8px;
```

### Animasyon Felsefesi
- **Asla ani geçiş yok** — minimum 300ms ease-out
- **Stagger 0.1s** — grid yüklenirken domino etkisi
- **Parallax** — background yavaş, foreground hızlı
- **prefers-reduced-motion** → tüm animasyonlar kapanır
- **GPU offload** — `will-change: transform` only

---

## Üç Tasarım Sisteminin DNA Bileşimi

| Öğe | Kaynak | Neden |
|---|---|---|
| Dark cinematic hero (ken burns + parallax) | **Framer** | Ürün görseline sinematik ağırlık |
| Full-bleed ürün fotoğrafçılığı | **Apple** | Ürünü "sergi" gibi gösterir |
| Multi-layer mavi-tinted gölge | **Stripe** | Premium kurumsal derinlik |
| 4px köşe yarıçapı, sıkı grid | **Stripe** | Fintech ciddiyeti |
| Negative letter-spacing display | **Framer** | Spring-loaded başlık hissi |
| Glassmorphism + backdrop blur | **Framer** | Modern havada yüzme hissi |
| Iki aşamalı light/dark section ritmi | **Apple** | Sinematik geçişler |
| Serif display + sans body | **Apple + Stripe** | Ciddiyet + okunabilirlik |
| Üretim 4'lüsü (Bennyfruit) | **Bennyfruit** | 30+ yıllık meyve-sebze ihracat ritmi |
| Full-screen video hero | **Bennyfruit** | Ürünün kendisi satıyor |
| jquery.hotspot (ürün haritası) | **Bennyfruit** | Biber haritası interaktif noktalar |

---

## Anti-Prensipler (Yapılmayacaklar)

- ❌ Düz yeşil düz mavi düz kırmızı tonları — **her zaman degrade, gölge veya doku**
- ❌ Emoji ikon — **sadece lucide-react**
- ❌ Stok vektör çiftçi/buğday ikonu — **sadece fotoğraf**
- ❌ Çoklu parlak renk paleti — **tek ana renk (yeşil), iki vurgu (altın, kırmızı)**
- ❌ Klasik tarım sitesi görünümü (ahşap, hasır, elle yazılmış font) — **modern kurumsal**
- ❌ Pill butonlar (Stripe gibi 4px sıkı)
- ❌ Tailwind gradient-to-r buton — **düz renk + gölge**
- ❌ Animasyon için animasyon — **her biri amaca hizmet eder**
- ❌ "AI generated" hissi — **zanaatkar eli değmiş gibi**
- ❌ 12+ breakpoint — **3 yeterli (mobile 640, tablet 1024, desktop)**
