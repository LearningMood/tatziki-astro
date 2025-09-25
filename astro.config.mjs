import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    mdx(),
    react()
],
image: {
    // Formats de sortie (WebP + format original en fallback)
    formats: ['webp', 'jpg'],
    // Qualité par défaut (85 est un bon compromis)
    quality: 85,
    // Largeurs responsives générées automatiquement
    widths: [400, 800, 1200, 1600, 2000],
    // Tailles pour les images de grille
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});