// / ===== HELPER POUR DÉTERMINER LE RATIO des images de la homes (mansory)=====

export function calculateRatio(width, height) {
  const ratio = width / height;
  
  if (ratio > 1.3) return 'landscape';  // Plus large que 4:3
  if (ratio < 0.77) return 'portrait';  // Plus vertical que 3:4
  return 'square';  // Entre les deux
}