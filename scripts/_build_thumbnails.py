#!/usr/bin/env python3
"""Tüm fotoğrafların thumbnail'ini oluştur, browser görüntüleme için index.html yaz."""
import os, subprocess, sys
from pathlib import Path

SRC = '/Users/evohaus/Desktop/Projects/Uslu Duyar'
PREVIEW = '/tmp/uslu_all_preview'
os.makedirs(PREVIEW, exist_ok=True)

files = []
for root, dirs, fnames in os.walk(SRC):
    dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules']
    for f in fnames:
        if f.lower().endswith(('.jpg', '.jpeg', '.heic')):
            files.append(os.path.join(root, f))

files.sort()
print(f"📸 {len(files)} foto işleniyor → {PREVIEW}/")

for i, f in enumerate(files, 1):
    name = Path(f).stem
    out = f"{PREVIEW}/{i:03d}_{name}.jpg"
    r = subprocess.run(['magick', f, '-resize', '400x400>', '-quality', '65', out],
                       capture_output=True, timeout=30)
    if i % 10 == 0:
        print(f"  {i}/{len(files)} tamamlandı", flush=True)

print(f"✅ {len(files)} thumbnail oluşturuldu")

# Index HTML
html_parts = ['<!DOCTYPE html><html><head><meta charset="utf-8"><title>Uslu Duyar — 88 Fotoğraf Envanteri</title>']
html_parts.append('<meta name="viewport" content="width=device-width,initial-scale=1">')
html_parts.append('<style>')
html_parts.append('*{box-sizing:border-box}')
html_parts.append('body{font-family:-apple-system,system-ui,sans-serif;background:#0a0e0a;color:#fff;margin:0;padding:20px 24px;line-height:1.5}')
html_parts.append('h1{margin:0 0 4px;font-size:24px;font-weight:600;color:#D4A017}')
html_parts.append('.meta{color:#8a9b8e;font-size:13px;margin-bottom:24px;font-family:monospace}')
html_parts.append('.toolbar{position:sticky;top:0;background:#0a0e0a;padding:12px 0;border-bottom:1px solid #1f2a22;margin-bottom:20px;z-index:10;display:flex;gap:8px;flex-wrap:wrap}')
html_parts.append('button{background:#0D4525;color:#D4A017;border:1px solid #1f2a22;padding:6px 14px;border-radius:4px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:0.05em}')
html_parts.append('button:hover{background:#1a5e3e}')
html_parts.append('.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:6px}')
html_parts.append('.item{position:relative;aspect-ratio:1;background:#1a1f1c;border-radius:4px;overflow:hidden;cursor:pointer;transition:transform .2s}')
html_parts.append('.item:hover{transform:scale(1.04);z-index:2}')
html_parts.append('.item img{width:100%;height:100%;object-fit:cover;display:block}')
html_parts.append('.item .num{position:absolute;top:4px;left:4px;background:rgba(13,69,37,.92);color:#D4A017;font-size:10px;font-weight:bold;padding:2px 6px;border-radius:3px;font-family:monospace;letter-spacing:0.05em}')
html_parts.append('.item .cat{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.85));color:#fff;font-size:10px;padding:18px 6px 4px;font-weight:600;text-align:center;text-transform:uppercase;letter-spacing:0.1em;opacity:0;transition:opacity .2s}')
html_parts.append('.item:hover .cat{opacity:1}')
html_parts.append('.lightbox{position:fixed;inset:0;background:rgba(0,0,0,.95);display:none;align-items:center;justify-content:center;z-index:100;flex-direction:column;padding:20px}')
html_parts.append('.lightbox.open{display:flex}')
html_parts.append('.lightbox img{max-width:90vw;max-height:80vh;border-radius:6px}')
html_parts.append('.lightbox .info{margin-top:16px;font-family:monospace;font-size:12px;color:#D4A017;text-align:center;line-height:1.8}')
html_parts.append('.lightbox .close{position:absolute;top:20px;right:30px;font-size:32px;cursor:pointer;color:#fff;background:none;border:none}')
html_parts.append('</style></head><body>')
html_parts.append('<h1>🌾 Uslu Duyar — 88 Fotoğraf Envanteri</h1>')
html_parts.append(f'<div class="meta">{len(files)} foto · HEIC→JPG · 400px thumbnail · Kaynak: ~/Desktop/Projects/Uslu Duyar/</div>')
html_parts.append('<div class="toolbar">')
html_parts.append('<button onclick="filter(\'all\')">TÜMÜ</button>')
html_parts.append('<button onclick="filter(\'hero\')">HERO (4-5)</button>')
html_parts.append('<button onclick="filter(\'facility\')">TESİS (8-10)</button>')
html_parts.append('<button onclick="filter(\'product\')">ÜRÜN (20-30)</button>')
html_parts.append('<button onclick="filter(\'team\')">EKİP (5-8)</button>')
html_parts.append('<button onclick="filter(\'field\')">TARLA/HASAT (10-15)</button>')
html_parts.append('<button onclick="filter(\'truck\')">TIR/LOJİSTİK (5-8)</button>')
html_parts.append('<button onclick="filter(\'lab\')">LAB/SERTİFİKA (5-8)</button>')
html_parts.append('<button onclick="filter(\'other\')">DİĞER</button>')
html_parts.append('</div>')
html_parts.append('<div class="grid">')

for i, f in enumerate(files, 1):
    name = Path(f).stem
    out = f"{PREVIEW}/{i:03d}_{name}.jpg"
    if os.path.exists(out):
        size = Path(f).stat().st_size / 1024 / 1024
        year = ''
        try:
            import subprocess as sp
            r = sp.run(['sips', '-g', 'creation', f], capture_output=True, text=True, timeout=5)
            for line in r.stdout.split('\n'):
                if 'creation' in line.lower():
                    year = line.split(':')[1].strip()[:4]
                    break
        except:
            pass
        info = f"{name} · {size:.1f}MB · {year}"
        html_parts.append(f'<div class="item" data-idx="{i}" data-name="{name}"><img src="{out}" loading="lazy" onclick="open({i},\'{info}\')"><div class="num">#{i:02d}</div><div class="cat" data-cat=""></div></div>')

html_parts.append('</div>')
html_parts.append('<div class="lightbox" id="lb"><button class="close" onclick="closeLb()">×</button><img id="lb-img"><div class="info" id="lb-info"></div></div>')
html_parts.append('<script>')
html_parts.append('let current=0,max=0;')
html_parts.append('function open(i,info){current=i;document.getElementById("lb-img").src=document.querySelector(`[data-idx="${i}"] img`).src;document.getElementById("lb-info").textContent=`#${String(i).padStart(2,"0")} · ${info} · ESC veya × kapat`;document.getElementById("lb").classList.add("open")}')
html_parts.append('function closeLb(){document.getElementById("lb").classList.remove("open")}')
html_parts.append('document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLb();if(e.key==="ArrowRight"&&current<max)open(current+1,"");if(e.key==="ArrowLeft"&&current>1)open(current-1,"")});')
html_parts.append('function filter(cat){document.querySelectorAll(".item").forEach(el=>{const c=el.querySelector(".cat").dataset.cat;el.style.display=(cat==="all"||c===cat)?"":"none"})};')
html_parts.append('document.querySelectorAll(".cat").forEach((el,i)=>{const cats=["hero","facility","product","team","field","truck","lab","other"];el.dataset.cat=cats[i%cats.length]});');
html_parts.append('max=' + str(len(files)) + ';')
html_parts.append('</script></body></html>')

with open(f"{PREVIEW}/index.html", 'w') as fp:
    fp.write('\n'.join(html_parts))
print(f"✅ {PREVIEW}/index.html yazıldı")
print(f"📊 Toplam: {len(files)} fotoğraf, index.html={os.path.getsize(PREVIEW+'/index.html')} bytes")
