#!/usr/bin/env python3
"""Uslu Duyar medya manifesti üretici.

- Fotoğrafları public/media/photos/optimized/ (servis edilen 1920px) üzerinden okur (PIL ile boyut).
- Videoları public/media/videos/optimized/ (.mp4 + .MP4) üzerinden okur (ffprobe ile boyut/süre).
- sizeKb = gerçek KB (bytes // 1024). Eski manifestteki category/caption/captionEn/hero alanlarını
  dosya adına göre KORUR (insan/vision etiketi re-run'da ezilmez).
"""
import json
import os
import subprocess
from datetime import datetime, timezone

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "media")
ROOT = os.path.abspath(ROOT)
PHOTO_OPT = os.path.join(ROOT, "photos", "optimized")
PHOTO_THUMB = os.path.join(ROOT, "photos", "thumbnails")
VIDEO_OPT = os.path.join(ROOT, "videos", "optimized")
MANIFEST = os.path.join(ROOT, "manifest.json")

from PIL import Image  # noqa: E402

PHOTO_EXT = (".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG")
VIDEO_EXT = (".mp4", ".MP4", ".mov", ".MOV")


def load_prev():
    """Önceki manifestteki etiketleri dosya adına göre haritalar."""
    prev = {}
    if os.path.exists(MANIFEST):
        try:
            data = json.load(open(MANIFEST, encoding="utf-8"))
            for m in data.get("media", []):
                key = os.path.basename(m.get("optimized", ""))
                if key:
                    prev[key] = m
        except Exception:
            pass
    return prev


def kb(path):
    return os.path.getsize(path) // 1024


def ffprobe_dims(path):
    try:
        out = subprocess.check_output(
            ["ffprobe", "-v", "error", "-select_streams", "v:0",
             "-show_entries", "stream=width,height", "-show_entries", "format=duration",
             "-of", "json", path],
            stderr=subprocess.DEVNULL,
        )
        j = json.loads(out)
        st = (j.get("streams") or [{}])[0]
        dur = float(j.get("format", {}).get("duration", 0) or 0)
        return int(st.get("width", 0) or 0), int(st.get("height", 0) or 0), round(dur, 1)
    except Exception:
        return 0, 0, 0.0


def main():
    prev = load_prev()
    media = []

    photos = sorted(f for f in os.listdir(PHOTO_OPT) if f.endswith(PHOTO_EXT))
    for i, name in enumerate(photos, 1):
        opt = os.path.join(PHOTO_OPT, name)
        try:
            with Image.open(opt) as im:
                w, h = im.size
        except Exception:
            w, h = 0, 0
        thumb_exists = os.path.exists(os.path.join(PHOTO_THUMB, name))
        p = prev.get(name, {})
        media.append({
            "id": f"photo-{i:03d}",
            "type": "photo",
            "originalName": name,
            "optimized": f"/photos/optimized/{name}",
            "thumbnail": f"/photos/thumbnails/{name}" if thumb_exists else f"/photos/optimized/{name}",
            "width": w,
            "height": h,
            "sizeKb": kb(opt),
            "category": p.get("category"),
            "caption": p.get("caption"),
            "captionEn": p.get("captionEn"),
            "hero": bool(p.get("hero", False)),
        })

    videos = sorted(f for f in os.listdir(VIDEO_OPT) if f.endswith(VIDEO_EXT))
    for i, name in enumerate(videos, 1):
        vid = os.path.join(VIDEO_OPT, name)
        w, h, dur = ffprobe_dims(vid)
        p = prev.get(name, {})
        media.append({
            "id": f"video-{i:03d}",
            "type": "video",
            "originalName": name,
            "optimized": f"/videos/optimized/{name}",
            "thumbnail": None,
            "width": w,
            "height": h,
            "sizeKb": kb(vid),
            "durationSec": dur,
            "category": p.get("category"),
            "caption": p.get("caption"),
            "captionEn": p.get("captionEn"),
            "hero": bool(p.get("hero", False)),
        })

    out = {
        "generated": datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds"),
        "source": "public/media (optimized)",
        "total_photos": len(photos),
        "total_videos": len(videos),
        "media": media,
    }
    json.dump(out, open(MANIFEST, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    n0 = sum(1 for m in media if m["width"] == 0)
    print(f"OK photos={len(photos)} videos={len(videos)} width0={n0}")


if __name__ == "__main__":
    main()
