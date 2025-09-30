// src/utils/imageLoader.js

/**
 * Charge toutes les images disponibles
 * À appeler dans chaque fichier .astro qui en a besoin
 */
export const allImages = import.meta.glob(
  '/src/assets/projects/**/*.{jpg,jpeg,png,webp,avif}'
);

/**
 * Résout une image depuis un projet - une seule image
 * @param {Object} project - L'objet projet d'Astro
 * @param {string} filename - Le nom du fichier image
 * @returns {Promise<ImageMetadata|null>}
 */
export async function getProjectImage(project, filename) {
  if (!filename) return null;
  
  // Utiliser projectFolder ou slug comme dossier
  const folder = project.data?.projectFolder || project.slug;
  const path = `/src/assets/projects/${folder}/${filename}`;
  
  const imageLoader = allImages[path];
  
  if (imageLoader) {
    try {
      const module = await imageLoader();
      return module.default;
    } catch (error) {
      console.error(`❌ Erreur chargement ${path}:`, error);
      return null;
    }
  }
  
  console.warn(`⚠️  Image non trouvée: ${path}`);
  return null;
}

/**
 * Charge plusieurs images d'un projet
 * @param {Object} project
 * @param {string[]} filenames
 * @returns {Promise<ImageMetadata[]>}
 */
export async function getProjectImages(project, filenames) {
  const images = await Promise.all(
    filenames.map(filename => getProjectImage(project, filename))
  );
  return images.filter(Boolean); // Enlève les null
}