// lib/defaultLayout.ts

export interface LayoutItem {
  col: number;
  span: number;
  top: string;
  parallax: number;
}

export interface GroupItem {
  col?: number;
  span?: number;
  top?: string;
  parallax?: number;
  type?: "video" | "blockquote" | "caption" | "before-after" | "slider";
  width?: string;
  name?: string;
  preset?: string;
  content?: string;
}

// ─────────────────────────────────────────────────────────────
// PRÉSETS NOMMÉS
// Utilisation dans le frontmatter :
//   - - { preset: "big-left" }
//   - - { preset: "big-left", content: "Texte blockquote..." }
// ─────────────────────────────────────────────────────────────

interface LayoutPreset {
  images: LayoutItem[];
  blockquote?: { col: number; span: number; top: string };
}

export const LAYOUT_PRESETS: Record<string, LayoutPreset> = {

  // Grosse image à gauche, petite à droite
  "big-left": {
    images: [
      { col: 2,  span: 14, top: "4vw",  parallax: -150 },
      { col: 17, span: 10, top: "14vw", parallax: -200 },
    ],
    blockquote: { col: 17, span: 9, top: "33vw" },
  },

  // Petite image à gauche, grosse à droite
  "big-right": {
    images: [
      { col: 5,  span: 10, top: "14vw", parallax: -200 },
      { col: 16, span: 13, top: "4vw",  parallax: -150 },
    ],
    blockquote: { col: 4, span: 9, top: "33vw" },
  },

  // 2 images de taille similaire
  "duo": {
    images: [
      { col: 3,  span: 12, top: "4vw",  parallax: -150 },
      { col: 16, span: 11, top: "10vw", parallax: -180 },
    ],
    blockquote: { col: 16, span: 10, top: "30vw" },
  },

  // 1 image large centrée
  "centered": {
    images: [
      { col: 7, span: 18, top: "4vw", parallax: -150 },
    ],
  },

  // 1 image très large, quasi pleine largeur
  "full": {
    images: [
      { col: 2, span: 24, top: "4vw", parallax: -130 },
    ],
  },

  // 3 images côte à côte en léger escalier
  "3-side": {
    images: [
      { col: 2,  span: 8, top: "4vw",  parallax: -120 },
      { col: 11, span: 8, top: "4vw", parallax: -160 },
      { col: 20, span: 8, top: "4vw",  parallax: -140 },
    ],
  },

  // 4 images côte à côte
  "4-side": {
    images: [
      { col: 1,  span: 6, top: "0vw",  parallax: -100 },
      { col: 8,  span: 6, top: "0vw", parallax: -130 },
      { col: 15, span: 6, top: "0vw",  parallax: -110 },
      { col: 22, span: 6, top: "0vw", parallax: -100 },
    ],
  },
  // 5 images côte à côte
  "5-side": {
    images: [
      { col: 2,  span: 5, top: "4vw",  parallax: -100 },
      { col: 6,  span: 5, top: "10vw", parallax: -130 },
      { col: 11, span: 5, top: "4vw",  parallax: -110 },
      { col: 15, span: 5, top: "10vw", parallax: -100 },
      { col: 19, span: 5, top: "12vw", parallax: -80 },
    ],
  },
  "6-side": {
    images: [
      { col: 2,  span: 4, top: "4vw",  parallax: -100 },
      { col: 5,  span: 4, top: "10vw", parallax: -130 },
      { col: 8, span: 4, top: "4vw",  parallax: -110 },
      { col: 11, span: 4, top: "10vw", parallax: -100 },
      { col: 14, span: 4, top: "12vw", parallax: -80 },
      { col: 18 , span: 4, top: "14vw", parallax: -40 },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// EXPANSION DES PRÉSETS
// Remplace { preset: "big-left", content: "..." }
// par les items complets du preset avant le rendu.
// Les groupes sans preset passent tels quels.
// ─────────────────────────────────────────────────────────────

export function expandPresets(groups: GroupItem[][]): GroupItem[][] {
  return groups.map(group => {
    if (group.length !== 1 || !group[0].preset) return group;

    const item = group[0];
    const preset = LAYOUT_PRESETS[item.preset!];

    if (!preset) {
      console.warn(`[defaultLayout] Preset inconnu : "${item.preset}"`);
      return group;
    }

    const expanded: GroupItem[] = [...preset.images];

    if (item.content && preset.blockquote) {
      expanded.push({
        type: "blockquote",
        content: item.content,
        col: preset.blockquote.col,
        span: preset.blockquote.span,
        top: preset.blockquote.top,
      });
    }

    return expanded;
  });
}

// ─────────────────────────────────────────────────────────────
// AUTO-GÉNÉRATION (fallback si aucun groups dans le frontmatter)
// ─────────────────────────────────────────────────────────────

const DEFAULT_PATTERNS: LayoutItem[][] = [
  [
    { col: 3, span: 12, top: "8vw", parallax: -150 },
    { col: 16, span: 10, top: "12vw", parallax: -200 },
  ],
  [
    { col: 8, span: 14, top: "4vw", parallax: -150 },
  ],
  [
    { col: 4, span: 8, top: "4vw", parallax: -150 },
    { col: 13, span: 11, top: "12vw", parallax: -200 },
  ],
  [
    { col: 8, span: 14, top: "4vw", parallax: -150 },
  ],
  [
    { col: 3, span: 8, top: "2vw", parallax: -120 },
    { col: 12, span: 8, top: "2vw", parallax: -180 },
    { col: 21, span: 8, top: "0vw", parallax: -10 },
  ],
  [
    { col: 4, span: 14, top: "4vw", parallax: -160 },
    { col: 17, span: 9, top: "16vw", parallax: -20 },
  ],
  [
    { col: 1, span: 10, top: "8vw", parallax: -180 },
    { col: 12, span: 14, top: "2vw", parallax: -130 },
  ],
  [
    { col: 2, span: 7, top: "2vw", parallax: -140 },
    { col: 10, span: 10, top: "12vw", parallax: -200 },
    { col: 21, span: 7, top: "5vw", parallax: -160 },
  ],
  [
    { col: 1, span: 16, top: "4vw", parallax: -170 },
    { col: 19, span: 8, top: "14vw", parallax: -120 },
  ],
  [
    { col: 7, span: 3, top: "2vw", parallax: -80 },
    { col: 11, span: 3, top: "2vw", parallax: -90 },
    { col: 15, span: 3, top: "2vw", parallax: -100 },
    { col: 19, span: 3, top: "2vw", parallax: -90 },
    { col: 23, span: 3, top: "2vw", parallax: -80 },
  ],
];

export function generateDefaultGroups(
  imageCount: number,
  beforeAfterCount: number = 0,
  sliderCount: number = 0
): GroupItem[][] {
  const groups: GroupItem[][] = [];
  let remainingImages = imageCount;
  let patternIndex = 0;
  let beforeAfterInserted = 0;
  let sliderInserted = false;

  while (remainingImages > 0) {
    const pattern = DEFAULT_PATTERNS[patternIndex % DEFAULT_PATTERNS.length];
    const imagesInPattern = Math.min(pattern.length, remainingImages);

    groups.push(pattern.slice(0, imagesInPattern));
    remainingImages -= imagesInPattern;
    patternIndex++;

    if (groups.length === 2 && beforeAfterInserted < beforeAfterCount) {
      groups.push([{ type: "before-after" }]);
      beforeAfterInserted++;
    }

    if (groups.length === 5 && sliderCount > 0 && !sliderInserted) {
      groups.push([{ type: "slider" }]);
      sliderInserted = true;
    }

    if (groups.length % 4 === 0 && beforeAfterInserted < beforeAfterCount) {
      groups.push([{ type: "before-after" }]);
      beforeAfterInserted++;
    }
  }

  while (beforeAfterInserted < beforeAfterCount) {
    groups.push([{ type: "before-after" }]);
    beforeAfterInserted++;
  }

  if (sliderCount > 0 && !sliderInserted) {
    groups.push([{ type: "slider" }]);
  }

  return groups;
}

export function countImagesInGroup(group: GroupItem[]): number {
  if (!group || !Array.isArray(group)) return 0;
  return group.filter(item => !item.type).length;
}

export function getProjectGroups(
  frontmatterGroups: GroupItem[][] | undefined,
  imageCount: number,
  beforeAfterCount: number = 0,
  sliderCount: number = 0
): GroupItem[][] {
  if (frontmatterGroups && frontmatterGroups.length > 0) {
    return expandPresets(frontmatterGroups);
  }
  return generateDefaultGroups(imageCount, beforeAfterCount, sliderCount);
}
