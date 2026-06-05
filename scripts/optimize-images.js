// Compresse les sources JPG/PNG/WebP en place pour alléger src/assets/ (Dropbox, disque).
// N'affecte PAS la qualité des images générées par Astro au build.
// Usage : node scripts/optimize-images.js [--dry-run]
import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

const SOURCE_DIR = 'src/assets/projets';
const MAX_WIDTH = 2400;
const QUALITY_JPG = 82;
const QUALITY_PNG = 80;
const QUALITY_WEBP = 82;
const SIZE_THRESHOLD = 100_000; // 100 Ko — en dessous, pas la peine

const DRY_RUN = process.argv.includes('--dry-run');

if (DRY_RUN) console.log('\n[dry-run] — aucun fichier ne sera modifié\n');

async function optimizeImages() {
  const images = await glob(`${SOURCE_DIR}/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}`);

  console.log(`${images.length} images trouvées dans ${SOURCE_DIR}\n`);

  let optimized = 0;
  let skipped = 0;
  let errors = 0;
  let totalSaved = 0;

  for (const imagePath of images) {
    const stats = fs.statSync(imagePath);

    if (stats.size < SIZE_THRESHOLD) {
      skipped++;
      continue;
    }

    try {
      const instance = sharp(imagePath);
      const metadata = await instance.metadata();
      const ext = path.extname(imagePath).toLowerCase();

      let pipeline = sharp(imagePath);
      if (metadata.width && metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }

      const tempPath = imagePath + '.tmp';

      if (!DRY_RUN) {
        if (ext === '.png') {
          await pipeline.png({ quality: QUALITY_PNG, compressionLevel: 9 }).toFile(tempPath);
        } else if (ext === '.webp') {
          await pipeline.webp({ quality: QUALITY_WEBP }).toFile(tempPath);
        } else {
          await pipeline.jpeg({ quality: QUALITY_JPG, mozjpeg: true }).toFile(tempPath);
        }

        const newStats = fs.statSync(tempPath);

        if (newStats.size >= stats.size) {
          // Pas de gain : on garde l'original
          fs.unlinkSync(tempPath);
          console.log(`  = ${path.basename(imagePath)} (${kb(stats.size)} Ko) — déjà optimal, ignoré`);
          skipped++;
          continue;
        }

        fs.unlinkSync(imagePath);
        fs.renameSync(tempPath, imagePath);

        const saved = stats.size - newStats.size;
        totalSaved += saved;
        console.log(`  ✓ ${path.basename(imagePath)} : ${kb(stats.size)} → ${kb(newStats.size)} Ko  (-${pct(saved, stats.size)}%)`);
      } else {
        console.log(`  ~ ${path.basename(imagePath)} : ${kb(stats.size)} Ko  [serait traité]`);
      }

      optimized++;
    } catch (err) {
      console.error(`  ✗ ${path.basename(imagePath)} : ${err.message}`);
      errors++;
    }
  }

  console.log(`\nRésumé`);
  console.log(`  Traitées : ${optimized}`);
  console.log(`  Ignorées : ${skipped}`);
  if (errors) console.log(`  Erreurs  : ${errors}`);
  if (!DRY_RUN && totalSaved > 0) {
    console.log(`  Gagné    : ${mb(totalSaved)} Mo`);
  }
  console.log('');
}

const kb  = (b) => Math.round(b / 1024);
const mb  = (b) => (b / 1024 / 1024).toFixed(1);
const pct = (saved, total) => Math.round((saved / total) * 100);

optimizeImages();
