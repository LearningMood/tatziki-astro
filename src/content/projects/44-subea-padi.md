---
# === INFORMATIONS GÉNÉRALES ===
title: "Projet SUBEA & PADI"
description: "SUBEA & PADI s'engage dans une démarche commune de récyclage et réduction des déchets. De nouvelles et stimulantes opportunités à présenter et mettre en avant..."
date: "2023-09-18"
slug: "projet-subea-padi-partenariat"
projectFolder: "subea-padi"
featured: true  # ← Projet à la une
featuredOrder: 1  # ← Ordre dans le carousel (optionnel)

categories:
  - "Direction artistique"
  - "Illustration"
tags:
  - "DECATHLON"
  - "SUBEA"
  - "Illustrator"
  - "Photoshop"

couleur: "#3085a3"

# === AFFICHAGE SUR LA HOME ===
thumbnail: "hero-subea-padi.jpg"
thumbnail_alt: "Projet SUBEA - PADI illustration extrait"
gridSize: "landscape"  #square",  "portrait",  "landscape",  "wide",  "tall",  "feat",  "mini",
# gridSpan:
#   cols: 10
#   rows: 8

# === PAGE PROJET ===
hero: "hero-subea-padi.jpg"


# === RANGÉES INDÉPENDANTES ===
rows:
  
  # Rangée 1 : Deux images qui se chevauchent
  - elements:
      - type: "image"
        src: "subea-padi-03.jpg"
        alt: "Détail fond"
        gridColumn: "1 / span 6"
      
      - type: "image"
        src: "subea-padi-04.jpg"
        alt: "Détail premier plan"
        gridColumn: "7 / span 2"  # Chevauche la première (commence à col 6)
        parallax: -15 # au cas où

# Rangée 2 : Image pleine largeur
  - elements:
      - type: "image"
        src: "hero-subea-padi.jpg"
        alt: "Introduction"
        gridColumn: "1 / span 14"
  
  # Rangée 3 : Bloc objectifs seul
  - elements:
      - type: "image"
        src: "subea-padi-04.jpg"
        alt: "Détail premier plan"
        gridColumn: "1 / span 9"  # Chevauche la première (commence à col 6)

      - type: "objectives"
        gridColumn: "10 / span 5"
        items:
          - "Objectif 1"
          - "Objectif 2"
          - "Objectif 3"
# Rangée 3 : Bloc objectifs seul
  - elements:
      - type: "before-after"
        beforeSrc: "subea-padi-10.jpg"
        afterSrc: "subea-padi-09.jpg"
        alt: "Petit détail"
        gridColumn: "3 / span 10"
        label: "Évolution du packaging"
  
  # Rangée 4 : Trois éléments (petit + grand + texte)
  - elements:     
      - type: "image"
        src: "hero-subea-padi.jpg"
        alt: "Une grande image"
        gridColumn: "1 / span 8"  # Chevauche le premier
      
      - type: "text"
        gridColumn: "5 / span 4"
        content: |
          ## Résultats
          
          Après 6 mois, le programme a permis de recycler plus de 15 000 combinaisons.

# === BEFORE/AFTER (optionnel) ===
beforeAfter:
  cols: 6
  rows: 2
  before: "subea-padi-01.webp"
  after: "subea-padi-02.webp"
  label: "Évolution du packaging"

# === SLIDER (optionnel) ===
slider:
  - "hero-subea-padi.jpg"


---
SUBEA et PADI s'engagent ensemble pour réduire les déchets plastiques dans les océans. Ce partenariat unique combine expertise technique et engagement environnemental.

Le projet vise à créer une économie circulaire pour les équipements de plongée, en récupérant les combinaisons usagées pour les transformer en nouveaux produits.
