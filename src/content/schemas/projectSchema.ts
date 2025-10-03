import { z } from 'astro:content';
import { imageElementSchema, objectivesElementSchema, textElementSchema, beforeAfterElementSchema } from './elements';

export const projectSchema = z.object({
    title: z.string(),
    description: z.string().optional().default(''),
    date: z.coerce.date(),
    categories: z.array(z.string()),
    tags: z.array(z.string()).optional(),
    clients: z.array(z.string()).optional(),

    //  Si à la une de la home (bandeau + ordre)
    featured: z.boolean().optional().default(false),
    featuredOrder: z.number().min(1).max(8).optional(),

    slug: z.string().optional(),
    projectFolder: z.string().optional(),

    thumbnail: z.string().optional(), // Image sur la home
    thumbnail_alt: z.string().optional().default(''),
    hero: z.string().optional(), // Image hero en haut de la page projet

    couleur: z.string().optional(),

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

    rows: z.array(z.object({
        elements: z.array(z.union([
            imageElementSchema,
            objectivesElementSchema,
            beforeAfterElementSchema,
            textElementSchema,
        ])),
    })).optional(),

    slider: z.array(z.string()).optional(),
    content: z.string().optional(),
});