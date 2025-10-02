---
title: "Affiche du Bal des Pompiers 2022"
description: ""
date: "2022-07-26"
slug: "affiche-bal-des-pompiers-2022"
projectFolder: "bal-pompiers"
featured: true 
featuredOrder: 1  

categories:
  - "Direction artistique"
tags:
  - "Sapeur-pompiers"
  - "Illustrator"
  - "Photoshop"

couleur: "#f2725bff"

# === AFFICHAGE SUR LA HOME ===
thumbnail: "bal-pompiers-01.jpg"
thumbnail_alt: "Affiche et communication du Bal des Pompiers 2022 Hendaye"
gridSize: "portrait"  # square",  "portrait",  "landscape",  "wide",  "tall",  "feat",  "mini",
# gridSpan:
#   cols: 4
#   rows: 8  

# === PAGE PROJET ===
hero: "hero-bal-pompiers.jpg"

# bal-pompiers-01.jpg
# bal-pompiers-02.jpg
# bal-pompiers-03.png
# bal-pompiers-04.jpg
# bal-pompiers-05.jpg
# bal-pompiers-06.jpg

# === RANGÉES INDÉPENDANTES ===
rows:
  
  # Rangée 1 : Deux images qui se chevauchent
  - elements:
      - type: "image"
        src: "bal-pompiers-01.jpg"
        alt: "Détail fond"
        gridColumn: "1 / span 6"
      
      - type: "image"
        src: "bal-pompiers-02.jpg"
        alt: "Détail premier plan"
        gridColumn: "7 / span 2"  # Chevauche la première (commence à col 6)
        parallax: -15 # au cas où

# Rangée 2 : Image pleine largeur
  - elements:
      - type: "image"
        src: "bal-pompiers-03.jpg"
        alt: "Introduction"
        gridColumn: "1 / span 14"
  
  # Rangée 3 : Bloc objectifs seul
  - elements:
      - type: "image"
        src: "bal-pompiers-04.jpg"
        alt: "Détail premier plan"
        gridColumn: "1 / span 9"  # Chevauche la première (commence à col 6)

      - type: "objectives"
        gridColumn: "10 / span 5"
        items:
          - "Objectif 1"
          - "Objectif 2"
          - "Objectif 3"
  
  # Rangée 4 : Trois éléments (petit + grand + texte)
  - elements:     
      - type: "image"
        src: "bal-pompiers-05.jpg"
        alt: "Une grande image"
        gridColumn: "1 / span 8"  # Chevauche le premier
  - elements:     
      - type: "image"
        src: "bal-pompiers-6.jpg"
        alt: "Une grande image"
        gridColumn: "1 / span 8"  # Chevauche le premier
      


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
---