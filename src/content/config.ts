import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    thumbnail: z.string().optional(),
    // Nouveau : configuration de la grille
    gridSize: z.enum(['square', 'portrait', 'landscape', 'wide', 'tall', 'feat', 'mini']).default('landscape'),
    // Ou plus précis :
    gridSpan: z.object({
      cols: z.number().default(6), // Sur 18 colonnes
      rows: z.number().default(6)  // Nombre de rangées
    }).optional(),

    // Nouveau : ratio de l'image pour adaptation automatique
    // imageRatio: z.enum(['landscape', 'portrait', 'square']).optional(),
    // // Ou plus précis
    // imageDimensions: z.object({
    //   width: z.number(),
    //   height: z.number()
    // }).optional(),
    
    couleur: z.string().default('#3085a3'),
    categories: z.array(z.string()).default([]),
  })
});

export const collections = {
  projects
};