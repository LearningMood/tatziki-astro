import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ params }) => {
  const { folder } = params;
  
  const projects = await getCollection('projets');
  const project = projects.find(p => p.data.folder === folder);
  
  if (!project || !project.data.images) {
    return new Response(JSON.stringify([]), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Retourner les URLs des images
  const imageUrls = project.data.images.map(img => {
    // Convertir le chemin d'import en URL publique
    return `/src/assets/projets/${folder}/${img}`;
  });

  return new Response(JSON.stringify(imageUrls), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export async function getStaticPaths() {
  const projects = await getCollection('projets');
  return projects.map(project => ({
    params: { folder: project.data.folder }
  }));
}