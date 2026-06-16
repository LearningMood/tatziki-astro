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
}

// Patterns de disposition (groupes de 1-3 images)
const DEFAULT_PATTERNS: LayoutItem[][] = [
  // Pattern A : 2 images côte à côte
  [
    { col: 3, span: 12, top: "8vw", parallax: -150 },
    { col: 16, span: 10, top: "12vw", parallax: -200 },
  ],
  // image unique centrée
  [
    { col: 8, span: 12, top: "4vw", parallax: -150 },
  ],
  [
    { col: 3, span: 8, top: "4vw", parallax: -150 },
    { col: 12, span: 12, top: "12vw", parallax: -200 },
  ],
  // Pattern B : 3 images en escalier
  [
    { col: 2, span: 10, top: "2vw", parallax: -120 },
    { col: 13, span: 7, top: "10vw", parallax: -180 },
    { col: 21, span: 7, top: "6vw", parallax: -10 },
  ],
  // Pattern C : 1 grande image centrée
  [
    { col: 4, span: 16, top: "4vw", parallax: -160 },
    { col: 19, span: 9, top: "22vw", parallax: -20 },
  ],
  // Pattern D : 2 images décalées
  [
    { col: 1, span: 10, top: "8vw", parallax: -180 },
    { col: 12, span: 14, top: "2vw", parallax: -130 },
  ],
  // Pattern E : 3 images variées
  [
    { col: 2, span: 7, top: "2vw", parallax: -140 },
    { col: 10, span: 10, top: "12vw", parallax: -200 },
    { col: 21, span: 7, top: "5vw", parallax: -160 },
  ],
  // Pattern F : 1 image large à gauche
  [
    { col: 1, span: 16, top: "4vw", parallax: -170 },
    { col: 19, span: 8, top: "14vw", parallax: -120 },
  ],
  // Pattern G : 4 images 
  [
    { col: 7, span: 3, top: "2vw", parallax: -80 },
    { col: 11, span: 3, top: "2vw", parallax: -90 },
    { col: 15, span: 3, top: "2vw", parallax: -100 },
    { col: 19, span: 3, top: "2vw", parallax: -90 },
    { col: 23, span: 3, top: "2vw", parallax: -80 }
  ]
];

/**
 * Génère des groupes par défaut à partir du nombre de médias disponibles
 */
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
    
    // Ajouter le groupe d'images
    groups.push(pattern.slice(0, imagesInPattern));
    remainingImages -= imagesInPattern;
    patternIndex++;

    // Insérer un before/after après le 2e groupe
    if (groups.length === 2 && beforeAfterInserted < beforeAfterCount) {
      groups.push([{ type: "before-after" }]);
      beforeAfterInserted++;
    }

    // Insérer le slider après le 4e groupe
    if (groups.length === 5 && sliderCount > 0 && !sliderInserted) {
      groups.push([{ type: "slider" }]);
      sliderInserted = true;
    }

    // Insérer d'autres before/after espacés
    if (groups.length % 4 === 0 && beforeAfterInserted < beforeAfterCount) {
      groups.push([{ type: "before-after" }]);
      beforeAfterInserted++;
    }
  }

  // Ajouter les before/after restants à la fin
  while (beforeAfterInserted < beforeAfterCount) {
    groups.push([{ type: "before-after"}]);
    beforeAfterInserted++;
  }

  // Ajouter le slider s'il n'a pas été inséré
  if (sliderCount > 0 && !sliderInserted) {
    groups.push([{ type: "slider" }]);
  }

  return groups;
}

/**
 * Compte les images dans un groupe (éléments sans type)
 */
export function countImagesInGroup(group: GroupItem[]): number {
  if (!group || !Array.isArray(group)) return 0;
  return group.filter(item => !item.type).length;
}

/**
 * Retourne les groupes à utiliser : frontmatter ou auto-générés
 */
export function getProjectGroups(
  frontmatterGroups: GroupItem[][] | undefined,
  imageCount: number,
  beforeAfterCount: number = 0,
  sliderCount: number = 0
): GroupItem[][] {
  // Si défini dans le frontmatter, l'utiliser
  if (frontmatterGroups && frontmatterGroups.length > 0) {
    return frontmatterGroups;
  }
  
  // Sinon, générer automatiquement
  return generateDefaultGroups(imageCount, beforeAfterCount, sliderCount);
}