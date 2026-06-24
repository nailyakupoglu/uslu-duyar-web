# Uslu Duyar — Media Asset Pipeline

**Kaynak:** `~/Desktop/Projects/Uslu Duyar/` (88 foto + 11 video)
**Hedef:** `~/Desktop/Projects/uslu-duyar-web/public/media/`
**Script:** `optimize.sh` (re-runnable, idempotent)

## Klasör yapısı

```
media/
├── photos/
│   ├── original/      # HEIC→JPG (q=92) + orijinal JPG kopyaları — 88 dosya, 185MB
│   ├── optimized/     # Web: 1920px max, q=82, interlaced — 88 dosya, 37MB
│   └── thumbnails/    # Grid: 480px max, q=78 — 88 dosya, 4MB
├── videos/
│   └── optimized/     # MP4 H.264 720p, AAC 128k, faststart — 3 başarılı
├── manifest.json      # Tüm dosyaların metadata'sı (EXIF, boyut, kategori)
└── README.md
```

## Optimize script

```bash
bash ~/Desktop/Projects/"Uslu Duyar"/optimize.sh
```

Script adımları:
1. **HEIC → JPG:** `magick INPUT.HEIC -auto-orient -quality 92 OUTPUT.jpg`
2. **JPG normalize:** `magick INPUT -auto-orient -quality 95 OUTPUT.jpg`
3. **Web optimize:** `magick -resize 1920x1920\> -quality 82 -strip -interlace Plane`
4. **Thumbnail:** `magick -resize 480x480\> -quality 78 -strip`
5. **MOV → MP4:** `ffmpeg -i INPUT.MOV -c:v libx264 -preset slow -crf 22 -vf "scale=1280:720:force_original_aspect_ratio=decrease" -c:a aac -b:a 128k -movflags +faststart`

## Manifest Kullanımı

`manifest.json` içindeki path'leri `next/image`'de:

```tsx
import manifest from '@/public/media/manifest.json';

const heroPhoto = manifest.media.find(
  m => m.type === 'photo' && m.id === 'photo-001'
);

<Image
  src={heroPhoto.optimized}
  alt={heroPhoto.caption ?? 'Uslu Duyar'}
  width={heroPhoto.width}
  height={heroPhoto.height}
/>
```

## Kategoriler (Claude tarafından doldurulacak)

| Kategori | ID Sayısı | Kullanım |
|---|---|---|
| hero | 4-5 | Hero slider (4-5 slide) |
| facility | 10-15 | Üretim 4'lüsü (Tesis/Kapasite/Lojistik/Sertifikalar) |
| product | 25-30 | Ürün showcase grid + detay sayfaları |
| team | 5-8 | Hakkımızda (yönetim, ekip, ofis) |
| field | 10-15 | Tarla/hasat görselleri (drone, makine) |
| truck | 5-8 | Lojistik (TIR, nakliye, depolama) |
| lab | 3-5 | Kalite kontrol / sertifika |
| other | 5-10 | Logo, tabela, doküman |

## Video Kullanımı

3 başarılı MP4 var:
- `94e834c9db3b4ac4803cd14f41eb5bd8.mp4` (127 KB — kısa klip)
- `IMG_1442.TRIM.mp4` (6.4 MB — orta uzunluk, hero loop için ideal)
- `ad36f331-0aad-48b4-a795-eeee5f7a4e20.MP4` (2.4 MB — orijinal MP4)

8 MOV dönüştürme başarısız (0 byte). Tekrar denenebilir veya kaynak MOV'lar kullanılabilir.

## Yeniden çalıştırma

```bash
bash ~/Desktop/Projects/"Uslu Duyar"/optimize.sh
python3 ~/Desktop/Projects/"Uslu Duyar"/_make_manifest.py
```

## Notlar

- Tüm fotoğraflar iPhone (X, 15 Pro) çekimi, 2020-2026 aralığında
- Çoğunluk Portrait (68/88), Ekim-Kasım yoğun (hasat mevsimi)
- EXIF orientation bilgisi korundu (auto-orient ile)
- Git LFS veya CDN önerilir (büyük dosyalar için), şimdilik lokal
