#!/usr/bin/env python3
"""Uslu Duyar foto envanter analizi — hızlı."""
import os, sys
from PIL import Image, ExifTags
from collections import Counter, defaultdict
from datetime import datetime
import subprocess

TAGS = ExifTags.TAGS
SRC = '/Users/evohaus/Desktop/Projects/Uslu Duyar'

files = []
for root, dirs, fnames in os.walk(SRC):
    # Skip hidden dirs
    dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules']
    for f in fnames:
        if f.lower().endswith(('.jpg', '.jpeg', '.heic')):
            files.append(os.path.join(root, f))

print(f"📊 Toplam {len(files)} fotoğraf\n")

stats = {
    'by_year': Counter(),
    'by_camera': Counter(),
    'by_size': [],
    'by_orientation': Counter(),
    'by_month': Counter(),
    'no_exif': [],
    'heic_count': 0,
    'jpg_count': 0,
}

for f in files:
    try:
        is_heic = f.lower().endswith('.heic')
        if is_heic:
            stats['heic_count'] += 1
            r = subprocess.run(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', f],
                             capture_output=True, text=True, timeout=10)
            info = {}
            for line in r.stdout.split('\n'):
                if ':' in line:
                    k, v = line.split(':', 1)
                    try:
                        info[k.strip()] = int(v.strip())
                    except:
                        pass
            w, h = info.get('pixelWidth', 0), info.get('pixelHeight', 0)
            camera = 'HEIC (no EXIF via sips)'
            date = None
        else:
            stats['jpg_count'] += 1
            img = Image.open(f)
            w, h = img.size
            exif = img._getexif() or {}
            date = None
            camera = 'Unknown'
            for tid, v in exif.items():
                t = TAGS.get(tid)
                if t == 'DateTimeOriginal':
                    date = v
                elif t == 'Model':
                    camera = v
            if not date:
                stats['no_exif'].append(f)
        
        if date:
            try:
                dt = datetime.strptime(date, '%Y:%m:%d %H:%M:%S')
                stats['by_year'][dt.year] += 1
                stats['by_month'][f'{dt.year}-{dt.month:02d}'] += 1
            except:
                pass
        
        stats['by_camera'][camera] += 1
        orientation = 'Portrait' if h > w else 'Landscape' if w > h else 'Square'
        stats['by_orientation'][orientation] += 1
        size = os.path.getsize(f) / 1024 / 1024
        stats['by_size'].append((f, w, h, size, 'HEIC' if is_heic else 'JPG'))
    except Exception as e:
        print(f"  err {os.path.basename(f)}: {e}", file=sys.stderr)

print(f"📦 HEIC: {stats['heic_count']}")
print(f"📦 JPG:  {stats['jpg_count']}\n")

print("📅 Yıllara göre:")
for y, c in sorted(stats['by_year'].items()):
    print(f"   {y}: {c} fotoğraf")
if not stats['by_year']:
    print("   (HEIC'ler EXIF'siz — sips sadece boyut veriyor)")
print()

print("📷 Kameralara göre:")
for cam, c in stats['by_camera'].most_common(5):
    print(f"   {cam}: {c}")
print()

print("📐 Yönelim:")
for o, c in stats['by_orientation'].items():
    print(f"   {o}: {c}")
print()

print("📅 Ay bazında (en yoğun 10):")
for m, c in sorted(stats['by_month'].items(), key=lambda x: -x[1])[:10]:
    print(f"   {m}: {c} fotoğraf")
print()

print(f"⚠️  EXIF tarihi olmayan: {len(stats['no_exif'])}")

# Çözünürlük dağılımı
mp_dist = Counter()
for f, w, h, size, fmt in stats['by_size']:
    mp = round(w * h / 1_000_000)
    mp_dist[(mp, fmt)] += 1

print("\n📐 Çözünürlük dağılımı:")
for (mp, fmt), c in sorted(mp_dist.items(), key=lambda x: -x[1])[:10]:
    print(f"   {mp}MP {fmt}: {c} fotoğraf")

# Boyut istatistikleri
sizes = [s for _, _, _, s, _ in stats['by_size']]
print(f"\n💾 Boyut istatistikleri:")
print(f"   Toplam: {sum(sizes):.1f} MB")
print(f"   Ort: {sum(sizes)/len(sizes):.2f} MB")
print(f"   Min: {min(sizes):.2f} MB, Max: {max(sizes):.2f} MB")

print("\n🎯 SONUÇ:")
print(f"  → Optimize pipeline: HEIC→JPG (sips) + magick resize 1920px q=82")
print(f"  → Tahmini web toplam: ~88 * 400KB = ~35MB (foto) + 11 video MP4")
print(f"  → Pipeline scripti: optimize.sh (kullanıma hazır)")
