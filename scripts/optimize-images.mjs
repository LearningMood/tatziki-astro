// ===== SCRIPT D'OPTIMISATION EN BATCH (avant import) =====

import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';

const INPUT_DIR = './images-originales'; // Vos images WordPress
const OUTPUT_DIR = './src/assets/images';

// Configuration d'optimisation
const CONFIG = {
  jpeg: { quality: 85, progressive: true },
  png: { compressionLevel: 9 },
  webp: { quality: 85 },
  resize: {
    maxWidth: 2400, // Largeur max (pour les très grandes images)
    withoutEnlargement: true
  }
};

async function optimizeImage(inputPath, outputPath) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  console.log(`  Traitement: ${path.basename(inputPath)} (${metadata.width}x${metadata.height})`);
  
  // Ne pas agrandir les petites images
  const shouldResize = metadata.width > CONFIG.resize.maxWidth;
  
  let pipeline = image
    .rotate() // Auto-rotation selon EXIF
    .withMetadata(); // Garde les métadonnées importantes
  
  // Redimensionner si nécessaire
  if (shouldResize) {
    pipeline = pipeline.resize(CONFIG.resize.maxWidth, null, {
      withoutEnlargement: true,
      fit: 'inside'
    });
    console.log(`    → Redimensionnée à ${CONFIG.resize.maxWidth}px de large`);
  }
  
  // Optimiser selon le format
  const ext = path.extname(inputPath).toLowerCase();
  
  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg(CONFIG.jpeg);
  } else if (ext === '.png') {
    pipeline = pipeline.png(CONFIG.png);
  }
  
  // Sauvegarder l'optimisée
  await pipeline.toFile(outputPath);
  
  // Créer une version WebP
  const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  await sharp(inputPath)
    .resize(shouldResize ? CONFIG.resize.maxWidth : null, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp(CONFIG.webp)
    .toFile(webpPath);
  
  // Afficher les gains
  const originalSize = (await fs.stat(inputPath)).size;
  const optimizedSize = (await fs.stat(outputPath)).size;
  const webpSize = (await fs.stat(webpPath)).size;
  
  const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
  const webpSavings = ((1 - webpSize / originalSize) * 100).toFixed(1);
  
  console.log(`    ✅ Optimisé: -${savings}% | WebP: -${webpSavings}%`);
}

async function processProject(projectDir) {
  const projectName = path.basename(projectDir);
  console.log(`\n📁 Projet: ${projectName}`);
  
  const outputProjectDir = path.join(OUTPUT_DIR, projectName);
  await fs.ensureDir(outputProjectDir);
  
  const files = await fs.readdir(projectDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );
  
  for (const file of imageFiles) {
    const inputPath = path.join(projectDir, file);
    const outputPath = path.join(outputProjectDir, file);
    
    try {
      await optimizeImage(inputPath, outputPath);
    } catch (error) {
      console.error(`    ❌ Erreur avec ${file}:`, error.message);
    }
  }
}

async function main() {
  console.log('🚀 Optimisation des images\n');
  
  // Créer le dossier de sortie
  await fs.ensureDir(OUTPUT_DIR);
  
  // Lister tous les projets
  const projects = await fs.readdir(INPUT_DIR);
  const projectDirs = [];
  
  for (const item of projects) {
    const itemPath = path.join(INPUT_DIR, item);
    const stat = await fs.stat(itemPath);
    if (stat.isDirectory()) {
      projectDirs.push(itemPath);
    }
  }
  
  console.log(`📊 ${projectDirs.length} projets trouvés`);
  
  // Traiter chaque projet
  for (const projectDir of projectDirs) {
    await processProject(projectDir);
  }
  
  console.log('\n✨ Optimisation terminée!');
}

// Lancer: npm install sharp
// puis: node scripts/optimize-images.mjs
main().catch(console.error);
