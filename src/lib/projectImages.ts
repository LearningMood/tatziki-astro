// projectImages.ts

import { getImage } from "astro:assets";
import type { CollectionEntry } from "astro:content";
import { hexToRgba } from "@/helpers/color";

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/projets/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
);

// SVG : importer comme ImageMetadata (Astro les gère)
const allSvgs = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/projets/**/*.svg",
  { eager: true }
);

// ============ TYPES ============

export interface OptimizedImage {
  webp: string;
  avif: string;
  webpSm?: string;
  avifSm?: string;
  width: number;
  height: number;
  isSvg?: false;
}

export interface SvgImage {
  src: string;
  isSvg: true;
}

export type ProjectImage = OptimizedImage | SvgImage;

export interface ProjectWithImages {
  id: string;
  data: CollectionEntry<"projets">["data"];
  thumb: OptimizedImage | null;
  hero: OptimizedImage | null;
  images: ProjectImage[];
  beforeAfterImages: {
    before: OptimizedImage;
    after: OptimizedImage;
    name: string;
  }[];
  sliderImages: OptimizedImage[];
  overlayColor: string;
}

// ============ CONFIG ============

const IMAGE_CONFIG = {
  thumb:      { width: 800,  quality: 75 },
  hero:       { width: 1920, quality: 75 },
  gallery:    { width: 1200, quality: 72 },
  gallery_sm: { width: 800,  quality: 70 },
  slider:     { width: 1600, quality: 78 },
} as const;

// ============ HELPERS ============

function getFileName(path: string): string {
  return path.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp|avif|svg)$/i, '') || '';
}

async function optimizeImage(
  src: ImageMetadata,
  config: { width: number; quality: number }
): Promise<OptimizedImage> {
  const [webp, avif] = await Promise.all([
    getImage({ src, width: config.width, format: "webp", quality: config.quality }),
    getImage({ src, width: config.width, format: "avif", quality: config.quality - 10 }),
  ]);

  return {
    webp: webp.src,
    avif: avif.src,
    width: webp.attributes.width as number,
    height: webp.attributes.height as number,
    isSvg: false,
  };
}

// ============ MAIN ============

export async function loadProjectImages(
  project: CollectionEntry<"projets">
): Promise<ProjectWithImages> {
  
  const folder = project.data.folder || project.id;
  const folderPath = `/projets/${folder}/`;

  // Filtres
  const isThumb = (path: string) => /thumb\.(jpg|jpeg|png|webp|avif)$/i.test(path);
  const isHero = (path: string) => /hero\.(jpg|jpeg|png|webp|avif)$/i.test(path);
  const isBefore = (path: string) => /before-/i.test(getFileName(path));
  const isAfter = (path: string) => /after-/i.test(getFileName(path));
  const isSlider = (path: string) => /slider-/i.test(getFileName(path));
  const isSpecial = (path: string) => 
    isThumb(path) || isHero(path) || isBefore(path) || isAfter(path) || isSlider(path);

  // Récupérer les fichiers du projet
const imageEntries = Object.entries(allImages).filter(([path]) => path.includes(folderPath));
const thumbEntry = imageEntries.find(([path]) => isThumb(path));
console.log(`[${project.id}] thumbEntry:`, thumbEntry?.[0] || 'NULL');

const svgEntries = Object.entries(allSvgs).filter(([path]) => path.includes(folderPath));

// DEBUG
// console.log('SVG entries:', svgEntries.map(([path, mod]) => ({
//   path,
//   mod,
//   src: mod.default?.src
// })));


  const heroEntry = imageEntries.find(([path]) => isHero(path));
  const beforeEntries = imageEntries.filter(([path]) => isBefore(path));
  const afterEntries = imageEntries.filter(([path]) => isAfter(path));
  const sliderEntries = imageEntries.filter(([path]) => isSlider(path)).sort((a, b) => a[0].localeCompare(b[0]));
  
  const normalImageEntries = imageEntries
    .filter(([path]) => !isSpecial(path))
    .sort((a, b) => a[0].localeCompare(b[0]));
  
  const normalSvgEntries = svgEntries
    .filter(([path]) => !isSpecial(path))
    .sort((a, b) => a[0].localeCompare(b[0]));

  
// Optimiser thumb et hero
const [thumb, hero] = await Promise.all([
  thumbEntry ? optimizeImage(thumbEntry[1].default, IMAGE_CONFIG.thumb) : null,
  heroEntry ? optimizeImage(heroEntry[1].default, IMAGE_CONFIG.hero) : null,
]);
// console.log(`[${project.slug}] thumb result:`, thumb);

  // Optimiser les images bitmap (deux tailles pour srcset)
  const bitmapImages = await Promise.all(
    normalImageEntries.map(async ([path, mod]): Promise<{ path: string; image: ProjectImage }> => {
      const [full, sm] = await Promise.all([
        optimizeImage(mod.default, IMAGE_CONFIG.gallery),
        optimizeImage(mod.default, IMAGE_CONFIG.gallery_sm),
      ]);
      return {
        path,
        image: { ...full, webpSm: sm.webp, avifSm: sm.avif },
      };
    })
  );

  // SVG : extraire le src depuis ImageMetadata
  const svgImages = normalSvgEntries.map(([path, mod]): { path: string; image: ProjectImage } => {
    const svgSrc = mod.default.src;
    // console.log('SVG processing:', path, '→', svgSrc);
    
    return {
      path,
      image: {
        src: svgSrc,
        isSvg: true,
      },
    };
  });

  // Combiner et trier par nom de fichier
  const allNormalEntries = [...bitmapImages, ...svgImages]
    .sort((a, b) => a.path.localeCompare(b.path));

  const images = allNormalEntries.map(entry => entry.image);

  // Slider (bitmap uniquement)
  const sliderImages = await Promise.all(
    sliderEntries.map(([_, mod]) => optimizeImage(mod.default, IMAGE_CONFIG.slider))
  );

  // Before/After
  const beforeAfterImages: ProjectWithImages['beforeAfterImages'] = [];
  
  for (const [beforePath, beforeMod] of beforeEntries) {
    const beforeName = getFileName(beforePath).replace(/^before-/i, '');
    const afterEntry = afterEntries.find(([afterPath]) =>
      getFileName(afterPath).replace(/^after-/i, '') === beforeName
    );

    if (afterEntry) {
      const [before, after] = await Promise.all([
        optimizeImage(beforeMod.default, IMAGE_CONFIG.gallery),
        optimizeImage(afterEntry[1].default, IMAGE_CONFIG.gallery),
      ]);
      beforeAfterImages.push({ before, after, name: beforeName });
    }
  }

  return {
    id: project.id,
    data: project.data,
    thumb,
    hero,
    images,
    beforeAfterImages,
    sliderImages,
    overlayColor: hexToRgba(project.data.color || "#000000", 0.6),
  };
}

export async function loadAllProjects(
  projects: CollectionEntry<"projets">[]
): Promise<ProjectWithImages[]> {
  return Promise.all(projects.map(loadProjectImages));
}