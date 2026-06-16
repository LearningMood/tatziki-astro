import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';


// Schéma d'un item dans un groupe
const groupItemSchema = z.object({
  // Position dans la grille (pour images, vidéos, textes)
  col: z.number().optional(),
  span: z.number().optional(),
  top: z.string().optional(),
  parallax: z.number().optional(),
  zIndex: z.number().optional(),
  mobileWidth: z.string().optional(),
  styled: z.boolean().optional(),

  // Type de l'élément (si absent = image)
  type: z.enum(["video", "blockquote", "caption", "before-after", "slider"]).optional(),

  // Vidéo
  src: z.string().optional(),
  aspectRatio: z.string().optional(),
  controls: z.boolean().optional(),
  muted: z.boolean().optional(),
  loop: z.boolean().optional(),
  autoplay: z.boolean().optional(),

  // Texte (blockquote, caption)
  content: z.string().optional(),
  author: z.string().optional(),

  // Before/After
  width: z.enum(["50", "65", "75", "85", "100"]).optional(),

  // Slider
  maxHeight: z.string().optional(),
  maxWidth: z.string().optional(),
  name: z.string().optional(),
  labelAvant: z.string().optional(),
  labelApres: z.string().optional(),
});

const projets = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projets", generateId: ({ entry }) => entry.replace(/\.mdx?$/, '') }),
  schema: z.object({
    // Infos de base
    title: z.string(),
    description: z.string().optional(),
    date: z.number().optional(),
    competences: z.array(z.string()).optional(), // IDs vers la collection competences
    technologies: z.array(z.string()).optional(),

    category: z.string().optional(),
    client: z.string().optional(),

    // Médias
    folder: z.string().optional(),
    thumbnail_alt: z.string().optional(),
    ratio: z.string().optional(),
    color: z.string().optional(),
    featured: z.boolean().optional(),
    actif: z.boolean().default(true),


    // NOUVELLE STRUCTURE : Chaque groupe = une rangée où les éléments peuvent se superposer
    groups: z.array(
      z.array(groupItemSchema)
    ).optional(),


    // Positions des blocs spéciaux (ancienne méthode)
    beforeAfterPosition: z.number().optional(),
    beforeAfterWidth: z.enum(["50", "65", "75", "85", "100"]).optional(),
    sliderPosition: z.number().optional(),
    sliderSpeed: z.enum(["slow", "normal", "fast"]).optional(),

    // Vidéos (ancienne méthode)
    videos: z.array(
      z.object({
        src: z.string(),
        afterImage: z.number(),
        col: z.number(),
        span: z.number(),
        controls: z.boolean().optional(),
        top: z.string().optional(),
        aspectRatio: z.string().optional(),
      })
    ).optional(),

    // Blockquotes (ancienne méthode)
    blockquotes: z.array(
      z.object({
        content: z.string(),
        afterImage: z.number(),
        col: z.number(),
        span: z.number(),
        top: z.string(),
      })
    ).optional(),

  }),
});

const competences = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,json}", base: "./src/content/competences" }),
  schema: z.object({
    label: z.string(),
    icon: z.string().optional(),
    infos: z.string().optional(),
    category: z.string(),
  }),
});

const technologies = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,json}", base: "./src/content/technologies" }),
  schema: z.object({
    label: z.string(),
    icon: z.string().optional(),
    category: z.string(),
  }),
});

export const collections = { projets, competences, technologies };