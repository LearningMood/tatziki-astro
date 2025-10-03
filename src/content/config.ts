import { defineCollection, z } from 'astro:content';
import { projectSchema } from './schemas/projectSchema';

const projectsCollection = defineCollection({
  type: 'content',
  schema: projectSchema, // il va tout contenir
});



export const collections = {
  projects: projectsCollection
};