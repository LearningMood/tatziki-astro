import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(''), // parfois court ou absent
    date: z.coerce.date(),
    // thumbnail : chemin ou URL (local ou distant)
    thumbnail: z.string().optional(),
    thumbnail_alt: z.string().optional().default(''),
    // banner (hero) optionnel à voir si je garde ou fusuionne avec Thumbnail
    hero: z.string().optional(),

    // Couleur (hex) ; on garde string mais tu peux ajouter une regex si tu veux valider le hex
    couleur: z.string().optional().default('#d7f682ff'),

    // Catégories / tags
    categories: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),

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

    // Images : liste d'objets pour pouvoir stocker alt/caption facilement
    images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().optional(),
          caption: z.string().optional(),
        }),
      )
      .optional()
      .default([]),

    // Objectifs : tableau de string
    objectifs: z.array(z.string()).optional().default([]),

    // Before/After structuré
    beforeAfter: z
      .object({
        before: z.string(),
        after: z.string(),
        alt: z.string().optional(),
      })
      .optional(),

    // Slider : flag ou configuration légère
    showSlider: z.boolean().optional().default(false),

    // Lien externe optionnel
    links: z
  .array(
    z.object({
      title: z.string(),
      url: z.string(),
      type: z.enum(['external', 'internal']).default('external'),
    }),
  )
  .optional()
  .default([]),

    // Contrôle de l'ordre des composants rendus dans le template
    componentsOrder: z
      .array(
        z.enum(['hero', 'objectifs', 'beforeAfter', 'slider', 'content', 'externalLink']),
      )
      .optional()
      .default(['hero', 'content']),

    // Tu peux inclure un slug dans le frontmatter si tu veux forcer un slug particulier,
    // mais Astro crée un slug à partir du nom de fichier si tu ne le fournis pas.
    slug: z.string().optional(),
  }),
});

export const collections = {
  projects,
};
