## Résumé des responsabilités

| Composant | Responsabilité |
|-----------|----------------|
| `[slug].astro` | Charge les données, boucle sur les groupes, script parallaxe |
| `ProjetGroup.astro` | Crée la grille 28 colonnes, distribue les images aux items |
| `ProjetItem.astro` | Dispatch conditionnel vers le bon composant |
| `ProjetImage.astro` | Affiche une image avec placeholder |
| `ProjetVideo.astro` | Affiche une vidéo |
| `ProjetBlockquote.astro` | Affiche un texte |
| `ProjetCaption.astro` | Affiche une citation avec auteur |
| `BeforeAfter.astro` | Comparaison avant/après |
| `HorizontalSlider.astro` | Défilement horizontal |

## Flux de données
```
[slug].astro
    │
    ├── images: [img0, img1, img2, img3, img4, ...]
    │
    └── groups: [
          [item, item],      ← groupe 0 consomme img0, img1
          [item, item, item], ← groupe 1 consomme img2, img3, img4
          [{ type: "slider" }],
        ]
    │
    ▼
ProjetGroup (groupe 0)
    │
    ├── images reçues: [img0, img1]
    │
    └── ProjetItem (item 0) → img0
        ProjetItem (item 1) → img1
    │
    ▼
ProjetGroup (groupe 1)
    │
    ├── images reçues: [img2, img3, img4]
    │
    └── ProjetItem (item 0) → img2
        ProjetItem (item 1) → img3
        ProjetItem (item 2) → img4