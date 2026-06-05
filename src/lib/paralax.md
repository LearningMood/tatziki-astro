# top : décalage vertical statique
Appliqué comme margin-top en CSS. En vw (% de la largeur du viewport), donc il s'adapte à la taille de l'écran.

- top: "4vw"   →  pousse l'image 4vw vers le bas
- top: "27vw"  →  pousse l'image bien plus bas
- top: "-20vw" →  remonte l'image, peut chevaucher le groupe précédent

C'est ce qui crée la composition en escalier — les images du même groupe partent toutes du même point, mais top les disperse verticalement.

# parallax : décalage vertical au scroll
Le JS dans [slug].astro anime chaque élément qui a un data-parallax :


progress = 1 - (centre de l'élément dans le viewport) / hauteur viewport
targetY  = progress × amplitude
Quand l'élément arrive par le bas → progress proche de 0 → peu de déplacement
Quand il monte vers le haut → progress augmente → déplacement croissant

- parallax: -150  →  se déplace jusqu'à -150px vers le haut en scrollant
- parallax: -300  →  se déplace beaucoup plus vite (paraît "proche")
- parallax: 10    →  se déplace légèrement vers le bas (effet inverse, rare)

Les valeurs négatives font monter l'image au scroll → crée l'illusion de profondeur : les grandes images (souvent -150) bougent peu, les petits détails (-200, -300) bougent vite comme si ils étaient au premier plan.

Combiné : exemple de open-kitchen.md ligne 15–17

- { col: 3,  span: 18, top: "4vw",  parallax: -60  }   # grande image, bouge peu
- { col: 19, span: 4,  top: "27vw", parallax: -200 }   # petite image en bas à droite, bouge vite
- { type: "blockquote", col: 22, span: 5, top: "11vw" } # texte, pas de parallax
Résultat visuel au repos :


[  grande image (col 3, 18 spans)  ]
                            [texte]
                        [petite img]
Au scroll, la petite image remonte 3× plus vite que la grande → effet de profondeur.

## pourquoi utiliser vw comme unité, je veux dire pourquoi se baser sur une largeur d'écran pour préciser une position en hauteur d'écran ?
C'est une question de cohérence avec le reste du système.

Le raisonnement : dans cette mise en page, tout découle de la largeur.

Les colonnes de la grille = fractions de la largeur du viewport (1fr × 28)
La largeur d'une image = span × (100vw / 28) → exprimée implicitement en vw
La hauteur d'une image = sa largeur × son ratio — donc aussi en vw
Si une image fait span: 10 sur un écran de 1400px → ~500px de large → ~375px de haut (ratio 4/3).

Sur un écran de 700px → ~250px de large → ~188px de haut.

Le décalage top doit suivre cette logique pour rester proportionnel :


top: "12vw"  →  168px à 1400px,  84px à 700px  ✓ reste cohérent
top: "168px" →  168px à 1400px, 168px à 700px  ✗ trop grand sur mobile
top: "12vh"  →  dépend de la hauteur de l'écran, indépendant du layout  ✗
En résumé : les images ont une hauteur qui dépend de leur largeur (via l'aspect-ratio), et leur largeur est en vw. Utiliser vw pour top garantit que les décalages verticaux grandissent et rétrécissent exactement au même rythme que les images elles-mêmes. C'est le seul choix qui maintient la composition intacte à toutes les tailles d'écran.

vh serait logique si la hauteur de l'écran était le facteur structurant — mais ici ce n'est pas le cas, c'est la largeur.