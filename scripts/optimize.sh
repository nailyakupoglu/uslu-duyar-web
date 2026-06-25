#!/bin/bash
# Uslu Duyar — Fotoğraf + Video Optimizasyon Pipeline v2
# 88 foto (JPG + HEIC + PNG) + 11 video (MOV + MP4) → web-optimized
# Sonuç: ~/Desktop/Projects/uslu-duyar-web/public/media/

set -e
# Kaynak repo içine taşındı (gitignored _archive). Eski harici yol fallback olarak denenir.
SRC="/Users/evohaus/Desktop/Projects/uslu-duyar-web/_archive/Uslu Duyar"
[ -d "$SRC" ] || SRC="/Users/evohaus/Desktop/Projects/Uslu Duyar"
DST="/Users/evohaus/Desktop/Projects/uslu-duyar-web/public/media"

mkdir -p "$DST/photos/original"
mkdir -p "$DST/photos/optimized"
mkdir -p "$DST/photos/thumbnails"
mkdir -p "$DST/videos/optimized"

echo "════════════════════════════════════════"
echo "  USLU DUYAR ASSET PIPELINE v2"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "════════════════════════════════════════"

# ===== 1. HEIC → JPG + JPG kopyala =====
echo ""
echo "📸 Fotoğrafları normalize et (HEIC→JPG + JPG kopyala)..."
i=0
while IFS= read -r -d '' f; do
  i=$((i+1))
  base=$(basename "$f")
  name="${base%.*}"
  ext=$(echo "$base" | awk -F. '{print tolower($NF)}')
  out="$DST/photos/original/${name}.jpg"
  if [ "$ext" = "heic" ]; then
    magick "$f" -auto-orient -quality 92 "$out" 2>/dev/null
  else
    magick "$f" -auto-orient -quality 95 "$out" 2>/dev/null
  fi
  if [ -f "$out" ]; then
    size=$(stat -f%z "$out")
    echo "  [$i] $base → ${name}.jpg ($(($size/1024)) KB)"
  fi
done < <(find "$SRC" -type f \( -iname "*.heic" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)

echo ""
echo "✅ $i fotoğraf normalize edildi"
echo ""

# ===== 2. Web-optimized (2560px, q=90, progressive) =====
echo "🖼️  Web optimize (2560px max, q=90, progressive sRGB)..."
i=0
while IFS= read -r -d '' f; do
  i=$((i+1))
  base=$(basename "$f")
  out="$DST/photos/optimized/${base}"
  magick "$f" -resize "2560x2560>" -quality 90 -interlace Plane -sampling-factor 4:2:0 -strip "$out" 2>/dev/null
done < <(find "$DST/photos/original" -type f -iname "*.jpg" -print0)

# Optimize toplam boyut
opt_size=$(du -sh "$DST/photos/optimized" 2>/dev/null | awk '{print $1}')
echo "✅ $i web foto → $opt_size"
echo ""

# ===== 3. Thumbnails (640px, q=82) =====
echo "🔍 Thumbnails (640px, q=82)..."
i=0
while IFS= read -r -d '' f; do
  i=$((i+1))
  base=$(basename "$f")
  out="$DST/photos/thumbnails/${base}"
  magick "$f" -resize "640x640>" -quality 82 -interlace Plane -strip "$out" 2>/dev/null
done < <(find "$DST/photos/original" -type f -iname "*.jpg" -print0)

thumb_size=$(du -sh "$DST/photos/thumbnails" 2>/dev/null | awk '{print $1}')
echo "✅ $i thumbnail → $thumb_size"
echo ""

# ===== 4. MOV → MP4 (H.264 1080p, CRF 20, AAC, faststart) =====
echo "🎬 MOV → MP4 (H.264 ≤1080p, CRF 20, AAC 128k)..."
i=0
while IFS= read -r -d '' f; do
  i=$((i+1))
  base=$(basename "$f")
  name="${base%.*}"
  out="$DST/videos/optimized/${name}.mp4"
  ffmpeg -y -i "$f" -c:v libx264 -preset slow -crf 20 \
    -vf "scale='min(1920,iw)':-2" \
    -c:a aac -b:a 128k -movflags +faststart "$out" 2>/dev/null
  if [ -f "$out" ]; then
    size=$(stat -f%z "$out")
    echo "  [$i] $base → ${name}.mp4 ($(($size/1024)) KB)"
  fi
done < <(find "$SRC" -type f -iname "*.mov" -print0)

# MP4'leri kopyala (zaten optimize olabilir)
echo ""
echo "🎬 MP4'leri kopyala..."
j=0
while IFS= read -r -d '' f; do
  j=$((j+1))
  base=$(basename "$f")
  cp "$f" "$DST/videos/optimized/${base}"
done < <(find "$SRC" -type f -iname "*.mp4" -print0)

vid_total=$((i + j))
vid_size=$(du -sh "$DST/videos/optimized" 2>/dev/null | awk '{print $1}')
echo "✅ $vid_total video → $vid_size"
echo ""

# ===== 5. Manifest üret =====
echo "📋 Manifest oluştur..."

python3 << 'PYEOF'
import os, json, subprocess
from datetime import datetime

ROOT = '/Users/evohaus/Desktop/Projects/uslu-duyar-web/public/media'
manifest = {
    'generated': datetime.now().isoformat(),
    'source': '/Users/evohaus/Desktop/Projects/uslu-duyar-web/_archive/Uslu Duyar/',
    'total_photos': 0,
    'total_videos': 0,
    'media': []
}

# KÜRATÖRLÜĞÜ KORU: kategori/caption/alt/hero/quality elle düzenlenir; yeniden üretimde silinmemeli.
PRESERVE = ('category', 'caption', 'captionEn', 'alt', 'altEn', 'hero', 'quality', 'thumbnail')
prev = {}
try:
    with open(f'{ROOT}/manifest.json') as pf:
        for it in json.load(pf).get('media', []):
            prev[it.get('originalName')] = {k: it[k] for k in PRESERVE if k in it}
except FileNotFoundError:
    pass

# Fotoğraflar
photos = sorted(os.listdir(f'{ROOT}/photos/original'))
for i, name in enumerate(photos, 1):
    op = f'{ROOT}/photos/original/{name}'
    th = f'{ROOT}/photos/thumbnails/{name}'
    if not os.path.exists(th):
        continue
    # EXIF + boyut
    try:
        r = subprocess.run(['magick', 'identify', '-format', '%w|%h|%b', op],
                          capture_output=True, text=True, timeout=5)
        w, h, size = r.stdout.strip().split('|')
        width, height = int(w), int(h)
        size_kb = int(float(size.replace('K', '').replace('M', '000').replace('B', '')) or 0)
    except:
        width = height = size_kb = 0

    mid = f'photo-{i:03d}'
    entry = {
        'id': mid,
        'type': 'photo',
        'originalName': name,
        'optimized': f'/photos/optimized/{name}',
        'thumbnail': f'/photos/thumbnails/{name}',
        'width': width,
        'height': height,
        'sizeKb': size_kb,
        'category': None,  # ilk üretimde Claude tarafından doldurulur
        'caption': None,
    }
    entry.update(prev.get(name, {}))  # varsa küratörlüğü geri yükle
    manifest['media'].append(entry)
manifest['total_photos'] = len(photos)

# Videolar
videos = sorted([f for f in os.listdir(f'{ROOT}/videos/optimized') if f.endswith('.mp4')])
for i, name in enumerate(videos, 1):
    op = f'{ROOT}/videos/optimized/{name}'
    try:
        r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration:stream=width,height', '-of', 'default=noprint_wrappers=1', op],
                          capture_output=True, text=True, timeout=10)
        info = dict(line.split('=') for line in r.stdout.strip().split('\n') if '=' in line)
        width = int(info.get('width', 0))
        height = int(info.get('height', 0))
        duration = float(info.get('duration', 0))
    except:
        width = height = duration = 0
    size_kb = os.path.getsize(op) // 1024

    mid = f'video-{i:03d}'
    entry = {
        'id': mid,
        'type': 'video',
        'originalName': name,
        'optimized': f'/videos/optimized/{name}',
        'thumbnail': f'/videos/posters/{os.path.splitext(name)[0]}.jpg',
        'width': width,
        'height': height,
        'sizeKb': size_kb,
        'durationSec': round(duration, 1),
        'category': None,
        'caption': None,
    }
    entry.update(prev.get(name, {}))  # varsa küratörlüğü geri yükle
    manifest['media'].append(entry)
manifest['total_videos'] = len(videos)

with open(f'{ROOT}/manifest.json', 'w') as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)

print(f"✅ manifest.json → {manifest['total_photos']} foto + {manifest['total_videos']} video")
PYEOF

# ===== 6. README =====
cat > "$DST/README.md" << 'EOF'
# Uslu Duyar — Media Asset Pipeline

**Kaynak:** `~/Desktop/Projects/Uslu Duyar/` (88 foto + 11 video)
**Hedef:** `~/Desktop/Projects/uslu-duyar-web/public/media/`
**Script:** `optimize.sh` (re-runnable, idempotent)

## Klasör yapısı

```
media/
├── photos/
│   ├── original/      # HEIC→JPG (q=92) + orijinal JPG kopyaları
│   ├── optimized/     # Web: 2560px max, q=90, progressive sRGB
│   └── thumbnails/    # Grid: 640px max, q=82
├── videos/
│   ├── optimized/     # MP4 H.264 ≤1080p, CRF 20, AAC 128k, faststart
│   └── posters/       # Video poster JPG'leri
├── manifest.json      # Tüm dosyaların metadata'sı
└── README.md
```

## Kullanım

`manifest.json` içindeki `optimized` path'leri `next/image`'de kullanılır:

```tsx
import { getMedia } from '@/lib/manifest';

const media = getMedia();
const heroSlide = media.find(m => m.category === 'hero' && m.type === 'photo');

<Image src={heroSlide.optimized} alt={heroSlide.caption} width={1920} height={1080} />
```

## Optimizasyon ayarları

- **JPG (web):** `magick -resize 2560x2560\> -quality 90 -interlace Plane -sampling-factor 4:2:0 -strip`
- **JPG (thumb):** `magick -resize 640x640\> -quality 82 -interlace Plane -strip`
- **MP4:** `ffmpeg libx264 -crf 20 -preset slow -vf "scale='min(1920,iw)':-2" -c:a aac -movflags +faststart`

## Yeniden çalıştırma

```bash
bash ~/Desktop/Projects/"Uslu Duyar"/optimize.sh
```

EOF

# ===== 7. Özet =====
TOTAL_PHOTOS=$(find "$DST/photos/original" -type f | wc -l | xargs)
TOTAL_VIDEOS=$(find "$DST/videos/optimized" -type f -name "*.mp4" | wc -l | xargs)
TOTAL_SIZE=$(du -sh "$DST" 2>/dev/null | awk '{print $1}')

echo ""
echo "════════════════════════════════════════"
echo "  ✅ PIPELINE TAMAMLANDI"
echo "════════════════════════════════════════"
echo ""
echo "  📸 $TOTAL_PHOTOS fotoğraf"
echo "  🎬 $TOTAL_VIDEOS video"
echo "  💾 Toplam: $TOTAL_SIZE"
echo ""
echo "  📂 $DST"
echo "  📋 $DST/manifest.json"
echo "  📖 $DST/README.md"
echo ""
