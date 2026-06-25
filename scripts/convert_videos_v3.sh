#!/bin/bash
SRC="/Users/evohaus/Desktop/Projects/Uslu Duyar"
DST="/Users/evohaus/Desktop/Projects/uslu-duyar-web/public/media/videos/optimized"
mkdir -p "$DST"

i=0
echo "🎬 MOV → MP4 v3 (HEVC-aware, width-even): $(date '+%H:%M:%S')"
while IFS= read -r -d '' f; do
  i=$((i+1))
  base=$(basename "$f")
  name="${base%.*}"
  out="$DST/${name}.mp4"
  if [ ! -s "$out" ]; then  # sadece yoksa veya 0 byte ise dönüştür
    ffmpeg -y -i "$f" \
      -c:v libx264 -preset slow -crf 22 \
      -vf "scale='trunc(iw*min(1280/iw,720/ih)/2)*2':'trunc(ih*min(1280/iw,720/ih)/2)*2',format=yuv420p" \
      -c:a aac -b:a 128k -movflags +faststart "$out" 2>/dev/null
  fi
  size=$(stat -f%z "$out" 2>/dev/null || echo 0)
  echo "[$i] $base → ${name}.mp4 ($((size/1024)) KB)"
done < <(find "$SRC" -type f -iname "*.mov" -print0)

# MP4 kopyala (zaten MP4 ise)
j=0
while IFS= read -r -d '' f; do
  j=$((j+1))
  base=$(basename "$f")
  out="$DST/${base}"
  if [ ! -f "$out" ]; then
    cp "$f" "$out"
  fi
done < <(find "$SRC" -type f -iname "*.mp4" -print0)

total=$((i + j))
echo ""
echo "✅ $i MOV + $j MP4 = $total video"
echo "📊 Toplam:"
du -sh "$DST"
ls "$DST" | wc -l
