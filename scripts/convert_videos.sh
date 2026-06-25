#!/bin/bash
SRC="/Users/evohaus/Desktop/Projects/Uslu Duyar"
DST="/Users/evohaus/Desktop/Projects/uslu-duyar-web/public/media/videos/optimized"
mkdir -p "$DST"

i=0
echo "🎬 MOV → MP4 conversion başladı: $(date '+%H:%M:%S')"
while IFS= read -r -d '' f; do
  i=$((i+1))
  base=$(basename "$f")
  name="${base%.*}"
  out="$DST/${name}.mp4"
  if [ ! -f "$out" ]; then
    ffmpeg -y -i "$f" -c:v libx264 -preset slow -crf 22 \
      -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" \
      -c:a aac -b:a 128k -movflags +faststart "$out" 2>/dev/null
  fi
  size=$(stat -f%z "$out" 2>/dev/null || echo 0)
  echo "[$i] $base → ${name}.mp4 ($((size/1024)) KB)"
done < <(find "$SRC" -type f -iname "*.mov" -print0)

# MP4 kopyala
j=0
while IFS= read -r -d '' f; do
  j=$((j+1))
  base=$(basename "$f")
  out="$DST/${base}"
  [ ! -f "$out" ] && cp "$f" "$out"
done < <(find "$SRC" -type f -iname "*.mp4" -print0)

total=$((i + j))
echo ""
echo "✅ $i MOV + $j MP4 = $total video"
echo "📊 Toplam boyut:"
du -sh "$DST"
echo "Bitti: $(date '+%H:%M:%S')"
