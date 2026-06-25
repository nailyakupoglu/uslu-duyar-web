#!/usr/bin/env python3
"""manifest.json üret — tüm optimize edilmiş foto + video için metadata."""
import os, json, subprocess
from datetime import datetime

ROOT = '/Users/evohaus/Desktop/Projects/uslu-duyar-web/public/media'
SRC = '/Users/evohaus/Desktop/Projects/Uslu Duyar'

manifest = {
    'generated': datetime.now().isoformat(),
    'source': SRC,
    'total_photos': 0,
    'total_videos': 0,
    'media': []
}

# Fotoğraflar
photos_dir = f'{ROOT}/photos/original'
photos = sorted(os.listdir(photos_dir))
print(f"📸 {len(photos)} foto manifest'e ekleniyor...")

for i, name in enumerate(photos, 1):
    op = f'{photos_dir}/{name}'
    if not os.path.exists(op):
        continue
    # magick identify ile boyut
    try:
        r = subprocess.run(['magick', 'identify', '-format', '%w|%h|%b', op],
                          capture_output=True, text=True, timeout=10)
        parts = r.stdout.strip().split('|')
        width, height = int(parts[0]), int(parts[1])
        size_str = parts[2] if len(parts) > 2 else '0B'
        size_kb = int(float(size_str.replace('K', '').replace('M', '').replace('B', '')) or 0)
        if 'M' in size_str:
            size_kb = int(float(size_str.replace('M', '')) * 1024)
    except Exception as e:
        width = height = size_kb = 0

    mid = f'photo-{i:03d}'
    manifest['media'].append({
        'id': mid,
        'type': 'photo',
        'originalName': name,
        'optimized': f'/photos/optimized/{name}',
        'thumbnail': f'/photos/thumbnails/{name}',
        'width': width,
        'height': height,
        'sizeKb': size_kb,
        'category': None,
        'caption': None,
        'hero': False,
    })
manifest['total_photos'] = len(photos)

# Videolar
videos_dir = f'{ROOT}/videos/optimized'
if os.path.exists(videos_dir):
    videos = sorted([f for f in os.listdir(videos_dir) if f.endswith('.mp4')])
    print(f"🎬 {len(videos)} video manifest'e ekleniyor...")

    for i, name in enumerate(videos, 1):
        op = f'{videos_dir}/{name}'
        if not os.path.exists(op):
            continue
        # ffprobe
        try:
            r = subprocess.run(['ffprobe', '-v', 'error',
                               '-show_entries', 'format=duration:stream=width,height',
                               '-of', 'default=noprint_wrappers=1', op],
                              capture_output=True, text=True, timeout=15)
            info = {}
            for line in r.stdout.strip().split('\n'):
                if '=' in line:
                    k, v = line.split('=', 1)
                    info[k] = v
            width = int(info.get('width', 0))
            height = int(info.get('height', 0))
            duration = float(info.get('duration', 0))
        except:
            width = height = duration = 0
        size_kb = os.path.getsize(op) // 1024

        mid = f'video-{i:03d}'
        manifest['media'].append({
            'id': mid,
            'type': 'video',
            'originalName': name,
            'optimized': f'/videos/optimized/{name}',
            'width': width,
            'height': height,
            'sizeKb': size_kb,
            'durationSec': round(duration, 1),
            'category': None,
            'caption': None,
        })
    manifest['total_videos'] = len(videos)

# Kaydet
out = f'{ROOT}/manifest.json'
with open(out, 'w') as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)

print(f"\n✅ manifest.json → {out}")
print(f"   📸 {manifest['total_photos']} foto")
print(f"   🎬 {manifest['total_videos']} video")
print(f"   📦 {os.path.getsize(out):,} bytes")
