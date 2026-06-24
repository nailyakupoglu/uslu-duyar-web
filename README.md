# 🌾 Uslu Duyar — Kurumsal Web Sitesi

**Mersin, Türkiye → Dünya** — Taze meyve-sebze, tahıl, baharat ve silaj üreticisi.

## 🌐 Canlı

- **Domain:** https://usluduyar.evohaus.org
- **Hosting:** Coolify (VPS 31.97.176.234) + Traefik + Cloudflare Proxy
- **Build:** Nixpacks (auto-detected)

## 🛠 Stack

- **Framework:** Next.js 14 (App Router) + TypeScript strict
- **Styling:** Inline style + globals.css (CSS variables) — şu an minimal
- **Icons:** lucide-react
- **Output:** `standalone` (Docker-ready)
- **Optimize edilecek:** Framer Motion, Lenis, Embla, next-intl TR/EN (CLAUDE.md v2 prompt'a göre)

## 📁 Proje Yapısı

```
uslu-duyar-web/
├── src/app/
│   ├── layout.tsx           # Root layout (TR metadata, OG)
│   ├── page.tsx              # Ana sayfa (hero + stats + kategori + CTA + footer)
│   ├── globals.css           # Mersin renk paleti
│   ├── urunler/page.tsx      # 8 ürün kartı
│   └── iletisim/page.tsx     # İletişim kanalları
├── public/media/             # 88 foto optimize + 7 video + manifest.json
├── package.json
├── tsconfig.json
├── next.config.mjs           # standalone, port 3000
└── .gitignore
```

## 🚀 Deploy

Coolify otomatik webhook tetikler (`main` branch push'inde).

**Manuel deploy:**
```bash
cd ~/Desktop/Projects/uslu-duyar-web
git push origin main
```

**Coolify URL:** http://31.97.176.234:8000

## 📋 İçerik

- **Ana sayfa:** Hero + 4 stat (30+ yıl, 25+ ülke, 12K ton/yıl, 8 ürün hattı) + 3 kategori (Değirmencilik / Biber-Baharat / Silaj & Yem) + CTA + Footer
- **Ürünler:** 8 placeholder ürün (Buğday/Mısır/Arpa unu + Toz/Pul biber + Salça + Mısır/Yonca silajı)
- **İletişim:** Telefon, WhatsApp, e-posta, adres

## 🎨 Sonraki Faz (Claude Max yenilenince)

CLAUDE.md v2 prompt'undaki 13 fazlı plan:
1. Framer Motion + Lenis + Embla entegrasyonu
2. next-intl TR/EN çoklu dil
3. shadcn/ui + Tailwind v4
4. /corporate, /production, /blog sayfaları
5. Ürün detay sayfaları + galeri lightbox
6. Hero slider (video + Ken Burns)
7. Sertifikalar marquee + Stats counter
8. SEO metadata + JSON-LD + sitemap
9. Logo + Favicon + OG image
10. Lighthouse 95+
11. Docker + Coolify env
12. README + DOCS

## 📦 Asset Pipeline

88 foto (47 JPG + 40 HEIC + 1 PNG) → optimize pipeline:
- `~/Desktop/Projects/Uslu Duyar/optimize.sh` (çalıştır)
- HEIC → JPG (magick)
- 1920px q=82 interlaced (web)
- 480px q=78 (thumbnail)
- 11 video MOV → MP4 (ffmpeg)

Manifest: `public/media/manifest.json`

## 📞 İletişim (Placeholder)

- Telefon: +90 324 000 00 00
- WhatsApp: +90 532 000 00 00
- E-posta: info@usluduyar.com
- Adres: Mersin Organize Sanayi Bölgesi

_(Gerçek bilgiler operatörden sonra `src/lib/site.ts`'e taşınacak)_
