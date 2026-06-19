## Résumé de l'architecture
```
lib/
├── projectImages.ts      → Charge et optimise les images
├── defaultLayout.ts      → Génère les layouts par défaut
└── projectHelpers.ts     → Utilitaires (varyColor, etc.)

components/projet/
├── ProjetGroup.astro     → Grille 28 colonnes
├── ProjetItem.astro      → Dispatch conditionnel
├── Image.astro
├── Video.astro
├── Blockquote.astro
├── Caption.astro
├── BeforeAfter.astro
└── HorizontalSlider.astro

pages/projets/
└── [slug].astro          → Orchestre le tout (très léger maintenant)



## Résumé du flux
```
1. SCAN
   Astro trouve tous les fichiers dans src/assets/projets/

2. FILTRAGE
   Pour chaque projet, on sépare :
   - thumb.jpg → vignette
   - hero.jpg → image hero
   - before-xxx.jpg + after-xxx.jpg → comparaison
   - slider-01.jpg, slider-02.jpg... → défilement horizontal
   - video-03-story.mp4 → vidéo à position 3
   - tout le reste → images normales

3. OPTIMISATION
   Chaque image → WebP + AVIF aux bonnes dimensions

4. ASSEMBLAGE
   galleryBlocks = [
     { type: 'image', ... },
     { type: 'image', ... },
     { type: 'video', ... },      ← inséré à position 3
     { type: 'image', ... },
     { type: 'before-after', ... }, ← inséré à position 5
     { type: 'image', ... },
     ...
   ]

5. RETOUR
   Le projet complet avec thumb, hero, galleryBlocks
```

## Convention de nommage des fichiers
```
src/assets/projets/mon-projet/
├── thumb.jpg                 → Vignette
├── hero.jpg                  → Hero
├── 01-intro.jpg              → Image normale (position 0)
├── 02-details.jpg            → Image normale (position 1)
├── video-02-story.mp4        → Vidéo insérée à position 2
├── video-02-story.webm       → Version WebM de la même vidéo
├── 03-mockup.jpg             → Image normale
├── before-logo.jpg           → Comparaison (beforeAfterPosition)
├── after-logo.jpg            → Comparaison
├── slider-01.jpg             → Slider (sliderPosition)
├── slider-02.jpg
└── slider-03.jpg