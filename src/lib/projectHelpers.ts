/**
 * Varie une couleur (hex ou rgb()) en HSL pour les placeholders
 */
export function varyColor(colorInput: string, index: number): string {
  let r: number, g: number, b: number;

  const rgbMatch = colorInput.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);
  if (rgbMatch) {
    r = parseInt(rgbMatch[1]) / 255;
    g = parseInt(rgbMatch[2]) / 255;
    b = parseInt(rgbMatch[3]) / 255;
  } else {
    const hex = colorInput.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16) / 255;
    g = parseInt(hex.substring(2, 4), 16) / 255;
    b = parseInt(hex.substring(4, 6), 16) / 255;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  const variations = [
    { s: -0.05, l: 0.03 },
    { s: 0.05, l: -0.02 },
    { s: -0.03, l: -0.04 },
    { s: 0.08, l: 0.05 },
  ];
  const v = variations[index % variations.length];
  
  const newS = Math.max(0, Math.min(1, s + v.s));
  const newL = Math.max(0, Math.min(1, l + v.l));

  return `hsl(${Math.round(h * 360)}, ${Math.round(newS * 100)}%, ${Math.round(newL * 100)}%)`;
}

/**
 * Compte les images avant un index donné
 */
export function getImageIndex(galleryBlocks: any[], currentIndex: number): number {
  return galleryBlocks
    .slice(0, currentIndex)
    .filter((b) => b.type === 'image').length;
}

/**
 * Trouve les éléments à afficher après une image
 */
export function findInsertionsAfterImage(
  imageIndex: number,
  videos: any[],
  blockquotes: any[],
  captions: any[]
) {
  return {
    video: videos.find((v) => v.afterImage === imageIndex),
    blockquote: blockquotes.find((b) => b.afterImage === imageIndex),
    caption: captions.find((c) => c.afterImage === imageIndex),
  };
}