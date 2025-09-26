import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    thumbnail: z.string().optional(),
    // Nouveau : configuration de la grille
    gridSize: z.enum(['small', 'medium', 'large', 'tall', 'wide', 'featured']).default('medium'),
    // Ou plus précis :
    gridSpan: z.object({
      cols: z.number().default(6), // Sur 18 colonnes
      rows: z.number().default(6)  // Nombre de rangées
    }).optional(),
    
    couleur: z.string().default('#3085a3'),
  })
});

export const collections = {
  projects
};