import { z } from 'astro:content';
import { imageElementSchema, objectivesElementSchema, textElementSchema, beforeAfterElementSchema } from './elements';

export const projectSchema = z.object({
    title: z.string(),
    description: z.string().optional().default(''),
    date: z.coerce.date(),
    categories: z.array(z.string()),
    competences: z.array(z.string()).optional(),
    clients: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),

    //  Si à la une de la home (bandeau + ordre)
    featured: z.boolean().optional().default(false),
    featuredOrder: z.number().min(1).max(8).optional(),

    slug: z.string().optional(),
    projectFolder: z.string().optional(),

    thumbnail: z.string().default('placeholder.jpg'), // Image sur la home
    thumbnail_alt: z.string().optional().default(''),
    hero: z.string().optional(), // Image hero en haut de la page projet

    couleur: z.string().optional(),

    gridSize: z.enum(["square", "portrait", "landscape", "wide", "miniWide", "tall", "feat", "mini"]).optional().default("landscape"),
    // gridSpanCols: z.number().optional().default(12),
    // gridSpanRows: z.number().optional().default(8),
    // gridCustom: z.string().optional(),

    rows: z.array(z.object({
        elements: z.array(z.union([
            imageElementSchema,
            objectivesElementSchema,
            beforeAfterElementSchema,
            textElementSchema,
        ])),
    })).optional(),

    // Liens optionnels
    links: z.array(z.object({
        title: z.string(),
        url: z.string().url(), // valide que c'est bien une URL
        type: z.enum(['external', 'internal']).default('external'),
    })).optional(),


    slider: z.array(z.string()).optional(),
    content: z.string().optional(),
});