import { defineCollection, z } from 'astro:content';

const projetsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // === CHAMPS OBLIGATOIRES ===
    title: z.string(),
    description: z.string().optional().default(''), // parfois court ou absent
    date: z.coerce.date(),
    categories: z.array(z.string()),

    // === CHAMPS OPTIONNELS ===
    slug: z.string().optional(),
    projectFolder: z.string().optional(), // Nom du dossier d'images
    hero: z.string().optional(),
    thumbnail: z.string().optional(),
    thumbnail_alt: z.string().optional().default(''),
    tags: z.array(z.string()).optional(),
    couleur: z.string().optional(),

    // Grid : taille sémantique (utilisée par ton mapping -> mainPatterns)
    gridSize: z
      .enum(['square', 'portrait', 'landscape', 'wide', 'tall', 'feat', 'mini'])
      .optional()
      .default('landscape'),

    // Grid span explicite (si tu veux surdéfinir précisément cols/rows)
    gridSpan: z
      .object({
        cols: z.number().min(1).max(24).optional().default(6),
        rows: z.number().min(1).optional().default(6),
      })
      .optional(),
    
    // === IMAGES DE LA GRILLE ===
    // ✅ alt est optionnel avec valeur par défaut
    images: z.array(z.object({
      src: z.string(),
      alt: z.string().default(''), // ← Optionnel avec défaut
      cols: z.number().default(12),
      parallax: z.number().default(0)
    })).optional(),
    
    // === OBJECTIFS ===
    objectives: z.object({
      cols: z.number().default(6),
      parallax: z.number().default(0.8),
      items: z.array(z.string())
    }).optional(),
    
    // === BEFORE/AFTER ===
    // ✅ Accepte soit un objet unique, soit un array d'objets
    beforeAfter: z.union([
      // Un seul before/after
      z.object({
        before: z.string(),
        after: z.string(),
        label: z.string().optional()
      }),
      // Ou plusieurs before/after
      z.array(z.object({
        before: z.string(),
        after: z.string(),
        label: z.string().optional()
      }))
    ]).optional(),
    
    // === SLIDER ===
    slider: z.array(z.string()).optional(),
  })
});

export const collections = {
  projects: projetsCollection
};
