# Script optimisation Image
Ce qui a changé dans le script :

Seuil 500 Ko → 100 Ko — traite beaucoup plus de fichiers
Support .webp sources — compresse les webp déjà présents dans vos assets
Protection contre les régressions — si le fichier recompressé est plus lourd que l'original (ça arrive avec les PNG déjà bien compressés), on garde l'original
--dry-run — node scripts/optimize-images.js --dry-run liste ce qui serait traité sans rien modifier. Utile pour vérifier avant de lancer pour de vrai.
Workflow en deux commandes :


node scripts/optimize-images.js --dry-run  # vérifier
node scripts/optimize-images.js            # appliquer
npm run build                              # Astro génère WebP 

# Astro Starter Kit: Minimal
```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


Schéma Zod (config.ts)Interface PropsQuandBuild time, validation des fichiers MDXCompile time, typage TypeScriptQuoiValide les données entrantes (vos fichiers content)Type les arguments du composantErreurBuild échoue si MDX invalideErreur IDE/compilation si mauvais props
En bref : Zod valide vos contenus MDX, Props type l'API de votre composant. Ils ne se chevauchent pas.




// INFOS
Différence layouts/ vs pages/
pages/ : Contient tes routes (URLs)

Chaque fichier devient une page accessible
pages/index.astro → /
pages/about.astro → /about
pages/projects/[slug].astro → /projects/mon-projet

layouts/ : Contient tes templates réutilisables

Des composants "enveloppes" pour structurer tes pages
Par exemple BaseLayout.astro qui contient <html>, <head>, <body>
Tu les importes dans tes pages avec <BaseLayout>...</BaseLayout>

// Anciens patterns

// Pattern de disposition (basé sur colonnes/24)
const layoutPatterns = {

    pinterest: [
        { cols: 6, rows: 1 }, // 1/4 largeur
        { cols: 6, rows: 1 }, // 1/4 largeur
        { cols: 12, rows: 1 }, // 1/2 largeur
        { cols: 8, rows: 1 }, // 1/3 largeur
        { cols: 8, rows: 1 }, // 1/3 largeur
        { cols: 8, rows: 1 }, // 1/3 largeur
        { cols: 18, rows: 1 }, // 3/4 largeur
        { cols: 6, rows: 1 }, // 1/4 largeur
    ],
    airbnb: [
        { cols: 12, rows: 2 }, // Large
        { cols: 6, rows: 1 }, // Carré
        { cols: 6, rows: 1 }, // Carré
        { cols: 6, rows: 1 }, // Carré
        { cols: 6, rows: 1 }, // Carré
    ],
    default: [
        { cols: 8, rows: 1 }, // 1/3
        { cols: 8, rows: 1 }, // 1/3
        { cols: 8, rows: 1 }, // 1/3
    ],
};