import { z } from 'astro:content';

export const imageElementSchema = z.object({
    type: z.literal('image'),
    src: z.string(),
    alt: z.string().default(''),
    gridColumn: z.string().default('1 / span 14'),
    //   layout: z.enum(['full', 'half', 'text-left', 'text-right']).default('half'),
});

export const objectivesElementSchema = z.object({
    type: z.literal('objectives'),
    gridColumn: z.string().default('1 / span 5'),
    items: z.array(z.string()),
    parallax: z.number().default(0.8),
});

export const beforeAfterElementSchema = z.object({
    type: z.literal('before-after'),
    gridColumn: z.string().default('1 / span 12'),
    beforeSrc: z.string(),
    afterSrc: z.string(),
    label: z.string().optional(),
})

export const textElementSchema = z.object({
    type: z.literal('text'),
    gridColumn: z.string().default('1 / span 6'),
    parallax: z.number().default(0),
    content: z.string(), // Markdown ou texte
})

