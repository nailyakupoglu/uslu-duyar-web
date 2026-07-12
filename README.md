# Uslu Duyar Kurumsal Web Sitesi

Uslu Duyar Tarım Ürünleri için hazırlanmış, gerçek saha arşivini kullanan iki dilli kurumsal web uygulaması. Narenciye, kavun ve karpuz ürün portföyünü; sezon, paketleme, soğuk zincir ve teklif bilgileriyle sunar.

## Özellikler

- Türkçe ve İngilizce locale routing (`/tr`, `/en`)
- Gerçek Uslu Duyar arşivinden 88 fotoğraf ve 11 optimize video
- Sinematik Embla hero, saha videosu, kontrollü Ken Burns ve azaltılmış hareket desteği
- Ürün filtreleme, ürün galerisi, teknik spec yüzeyi ve teklif modalı
- Kurumsal, üretim, sezon takvimi, lojistik, blog, iletişim ve yasal sayfalar
- React Hook Form + Zod iletişim/teklif doğrulaması
- Organization, Website, Product, Article ve Breadcrumb JSON-LD
- Sitemap, robots, canonical ve locale alternatifleri
- Next.js standalone Docker çıktısı

## Teknoloji

- Next.js App Router + TypeScript strict
- Tailwind CSS + CSS değişkenleri
- next-intl
- Framer Motion, Lenis, Embla Carousel
- Radix UI primitives
- React Hook Form + Zod
- pnpm

## Yerel geliştirme

```bash
pnpm install
pnpm dev
```

Uygulama `http://localhost:3000` adresinde çalışır ve varsayılan locale route’una yönlendirir.

## Kalite komutları

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Ortam değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayın. Gerçek değerleri repoya eklemeyin.

| Değişken | Amaç |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site adresi |
| `N8N_CONTACT_WEBHOOK_URL` | İletişim formu teslim endpoint’i |
| `NEXT_PUBLIC_GA_ID` | Opsiyonel analitik kimliği |

Telefon, WhatsApp ve kurumsal doğrulama bilgileri onaylanana kadar arayüz bu kanalları otomatik gizler. Ana içerik kaynağı `src/lib/data.ts`, medya eşlemesi `public/media/manifest.json` dosyasıdır.

## Medya

```text
public/media/
├── curated/                 # Hero, ürün, üretim ve blog için seçilmiş kapaklar
├── photos/optimized/        # 1920px web görselleri
├── photos/thumbnails/       # Grid ve önizleme görselleri
├── videos/optimized/        # H.264 web videoları
├── videos/posters/          # Video poster kareleri
└── manifest.json            # 99 medya kaydının metadata kaynağı
```

## Docker

```bash
docker build -t uslu-duyar-web .
docker run --rm -p 3000:3000 --env-file .env.local uslu-duyar-web
```

Production hedefi VPS 1 üzerinde Coolify + Traefik’tir. Güvenli servis güncellemesi dışında altyapı servislerine müdahale edilmez.

## Tasarım yönü

Uslu Duyar’a özel “Hasat Rotası” görsel yaklaşımı [tasarım manifestosunda](docs/design/USLU_DUYAR_VISUAL_PHILOSOPHY.md) tanımlıdır. Site başka bir tarım markasının görsel veya metinsel varlıklarını kullanmaz.
