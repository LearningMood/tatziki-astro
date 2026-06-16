// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tatziki.fr',
  cacheDir: './.astro/cache',
  integrations: [mdx()],
  image: {
    // Service d'optimisation (Sharp par défaut)
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: 268402689, // ~16k x 16k max
      }
    },
    // Qualité par défaut
    quality: 80,
  },
  // Build optimisé
  build: {
    inlineStylesheets: 'auto',
    assetsPrefix: '/',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});