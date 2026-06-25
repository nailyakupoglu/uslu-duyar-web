// Medya manifesti okuyucu — public/media/manifest.json'u tipli erişimle sunar.
// Yollara /media prefix ekler (manifest yolları /photos.. , dosyalar /public/media/photos..).
// Kullanım: getHeroes(), getByCategory("narenciye"), getVideos(), getFacilityGallery(), getCategoryCover().
import manifestJson from "../../public/media/manifest.json";

const MEDIA_PREFIX = "/media";

export type MediaCategory =
  | "narenciye"
  | "kavun"
  | "karpuz"
  | "tarla"
  | "tesis"
  | "lojistik"
  | "kurumsal"
  | "saha"
  | "diger";

export type MediaItem = {
  id: string;
  type: "photo" | "video";
  src: string;
  thumb: string;
  width: number;
  height: number;
  caption: string;
  category: MediaCategory | null;
  hero: boolean;
  quality: number;
  durationSec?: number;
};

type RawItem = {
  id: string;
  type: string;
  originalName: string;
  optimized: string;
  thumbnail: string | null;
  width: number;
  height: number;
  sizeKb: number;
  category: string | null;
  caption: string | null;
  captionEn?: string | null;
  hero?: boolean;
  quality?: number;
  durationSec?: number;
};

const rawMedia = (manifestJson as unknown as { media: RawItem[] }).media;

function toItem(r: RawItem): MediaItem {
  const isVideo = r.type === "video";
  return {
    id: r.id,
    type: isVideo ? "video" : "photo",
    src: `${MEDIA_PREFIX}${r.optimized}`,
    thumb: `${MEDIA_PREFIX}${r.thumbnail ?? r.optimized}`,
    width: r.width || (isVideo ? 1280 : 1200),
    height: r.height || (isVideo ? 720 : 1600),
    caption: r.caption ?? "Uslu Duyar",
    category: (r.category as MediaCategory | null) ?? null,
    hero: Boolean(r.hero),
    quality: r.quality ?? 3,
    durationSec: r.durationSec
  };
}

const all = rawMedia.map(toItem);
const photos = all.filter((m) => m.type === "photo");
const videos = all.filter((m) => m.type === "video");

const byQuality = (a: MediaItem, b: MediaItem) => b.quality - a.quality;

/** Tüm fotoğraflar (kalite sıralı). */
export function getPhotos(): MediaItem[] {
  return photos.slice().sort(byQuality);
}

/** Bir kategorinin fotoğrafları (kalite sıralı, opsiyonel limit). */
export function getByCategory(category: MediaCategory, limit?: number): MediaItem[] {
  const list = photos.filter((m) => m.category === category).sort(byQuality);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Hero slider için geniş/kaliteli fotoğraflar (hero=true önceliği, yetmezse en kaliteliler). */
export function getHeroes(limit = 5): MediaItem[] {
  const flagged = photos.filter((m) => m.hero).sort(byQuality);
  const pool = flagged.length >= limit ? flagged : photos.slice().sort(byQuality);
  return pool.slice(0, limit);
}

/** Videolar (opsiyonel limit). */
export function getVideos(limit?: number): MediaItem[] {
  return typeof limit === "number" ? videos.slice(0, limit) : videos;
}

/** Ürün kategorisi temsili görselleri; foto yoksa boş döner (UI fallback kullanır). */
export function getProductImages(category: MediaCategory, limit = 6): MediaItem[] {
  return getByCategory(category, limit);
}

/** Tesis/paketleme + lojistik + kurumsal galerisi. */
export function getFacilityGallery(limit = 12): MediaItem[] {
  const cats: MediaCategory[] = ["tesis", "lojistik", "kurumsal", "tarla"];
  return photos
    .filter((m) => m.category !== null && cats.includes(m.category))
    .sort(byQuality)
    .slice(0, limit);
}

/** Bir kategori için en kaliteli görselin src'si; yoksa fallback (SVG placeholder). */
export function getCategoryCover(category: MediaCategory, fallback: string): string {
  const first = getByCategory(category, 1)[0];
  return first ? first.src : fallback;
}
