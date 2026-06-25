#!/usr/bin/env python3
"""Vision kategorilerini manifest'e işler + videolara poster frame üretir.

Girdi: categories.json (scratchpad'ten path arg), public/media/manifest.json
Çıktı: manifest.json güncellenir (category/caption/captionEn(null)/hero/quality);
videolar için public/media/videos/posters/<ad>.jpg poster üretilir, thumbnail atanır.
"""
import json
import os
import subprocess
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "media"))
MANIFEST = os.path.join(ROOT, "manifest.json")
VIDEO_OPT = os.path.join(ROOT, "videos", "optimized")
POSTERS = os.path.join(ROOT, "videos", "posters")


def main(cats_path):
    cats = {c["file"]: c for c in json.load(open(cats_path, encoding="utf-8"))}
    data = json.load(open(MANIFEST, encoding="utf-8"))
    os.makedirs(POSTERS, exist_ok=True)

    matched = 0
    for m in data["media"]:
        if m["type"] == "photo":
            c = cats.get(m["originalName"])
            if c:
                m["category"] = c["category"]
                m["caption"] = c["caption_tr"]
                m["hero"] = bool(c["hero"])
                m["quality"] = int(c.get("quality", 3))
                matched += 1
        elif m["type"] == "video":
            name = m["originalName"]
            base = os.path.splitext(name)[0]
            poster_rel = f"/videos/posters/{base}.jpg"
            poster_abs = os.path.join(POSTERS, f"{base}.jpg")
            if not os.path.exists(poster_abs):
                try:
                    subprocess.run(
                        ["ffmpeg", "-y", "-ss", "1", "-i", os.path.join(VIDEO_OPT, name),
                         "-frames:v", "1", "-vf", "scale=640:-1", poster_abs],
                        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=False,
                    )
                except Exception:
                    pass
            if os.path.exists(poster_abs):
                m["thumbnail"] = poster_rel
            m.setdefault("category", "saha")
            if not m.get("category"):
                m["category"] = "saha"
            m["caption"] = m.get("caption") or "Uslu Duyar saha görüntüsü"
            m["quality"] = m.get("quality", 3)

    json.dump(data, open(MANIFEST, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

    # Özet
    from collections import Counter
    cc = Counter(m.get("category") for m in data["media"] if m["type"] == "photo")
    heroes = sum(1 for m in data["media"] if m["type"] == "photo" and m.get("hero"))
    posters = len([f for f in os.listdir(POSTERS) if f.endswith(".jpg")])
    print("photo matched:", matched, "/ 88")
    print("kategori dağılımı:", dict(cc))
    print("hero foto:", heroes, "| video poster:", posters)


if __name__ == "__main__":
    main(sys.argv[1])
