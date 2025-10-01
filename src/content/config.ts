// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // === INFORMATIONS GÉNÉRALES (obligatoires) ===
    title: z.string(),
    description: z.string().optional().default(''),
    date: z.coerce.date(),
    categories: z.array(z.string()),

    // === IDENTIFIANTS ===
    slug: z.string().optional(),
    projectFolder: z.string().optional(), // Dossier des images (différent du slug)

    // === VISUELS POUR LA HOME (grille masonry) ===
    thumbnail: z.string().optional(), // Image de la carte sur la home
    thumbnail_alt: z.string().optional().default(''),
    couleur: z.string().optional(), // Couleur d'accentuation de la carte

    // Taille de la carte sur la home (converti en cols/rows par mainPatterns)
    gridSize: z
      .enum(['square', 'portrait', 'landscape', 'wide', 'tall', 'feat', 'mini'])
      .optional()
      .default('landscape'),

    // Si tu veux forcer des dimensions précises (override de gridSize)
    gridSpan: z
      .object({
        cols: z.number().min(1).max(24).optional(),
        rows: z.number().min(1).optional(),
      })
      .optional(),

    // === VISUELS POUR LA PAGE PROJET ===
    hero: z.string().optional(), // Image hero en haut de la page projet
    tags: z.array(z.string()).optional(),

    // === NOUVELLE STRUCTURE : RANGÉES ===
    rows: z.array(z.object({
      // Espacement vertical avant cette rangée (optionnel)

      // Éléments dans cette rangée (1 à 3)
      elements: z.array(z.union([
        // Type 1 : Image
        z.object({
          type: z.literal('image'),
          src: z.string(),
          alt: z.string().default(''),
          gridColumn: z.string().default('1 / span 14'),
        }),

        // Type 2 : Objectifs
        z.object({
          type: z.literal('objectives'),
          gridColumn: z.string().default('1 / span 5'),
          items: z.array(z.string()),
          parallax: z.number().default(0.8),
        }),

        // Type 3 : Bloc de texte libre
        z.object({
          type: z.literal('text'),
          gridColumn: z.string().default('1 / span 6'),
          parallax: z.number().default(0),
          content: z.string(), // Markdown ou texte
        }),

        // Type 4 : Before After
        z.object({
          type: z.literal('before-after'),
          gridColumn: z.string().default('1 / span 12'),
          beforeSrc: z.string(),
          afterSrc: z.string(),
          label: z.string().optional(),
        }),
      ])),
    })).optional(),

    // === ANCIENNES IMAGES (compatibilité - optionnel) ===
    // Utilisé si tu ne veux pas utiliser 'gallery'
    images: z.array(z.object({
      src: z.string(),
      alt: z.string().default(''),
      layout: z.enum(['full', 'half', 'text-left', 'text-right']).default('half'),
      cols: z.number().optional(),
    })).optional(),

    // === OBJECTIFS (ancien format - optionnel) ===
    // Utilisé si pas dans gallery
    objectives: z.object({
      cols: z.number().default(6),
      rows: z.number().default(6),
      parallax: z.number().default(0.8),
      items: z.array(z.string())
    }).optional(),

    // === BEFORE/AFTER ===
    beforeAfter: z.union([
      // Un seul before/after
      z.object({
        before: z.string(),
        after: z.string(),
        label: z.string().optional(),
        gridColumn: z.string().optional(), // Si tu veux le positionner dans gallery
        marginTop: z.number().optional(),
      }),
      // Plusieurs before/after
      z.array(z.object({
        before: z.string(),
        after: z.string(),
        label: z.string().optional(),
        gridColumn: z.string().optional(),
        marginTop: z.number().optional(),
      }))
    ]).optional(),

    // === SLIDER DE FIN ===
    slider: z.array(z.string()).optional(),
  })
});

export const collections = {
  projects: projectsCollection
};