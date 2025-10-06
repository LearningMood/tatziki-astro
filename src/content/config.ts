import { defineCollection, z } from 'astro:content';
import { projectSchema } from '../schemas/projectSchema';

const projectsCollection = defineCollection({
  type: 'content',
  schema: projectSchema,
});

export const collections = {
  projects: projectsCollection
};