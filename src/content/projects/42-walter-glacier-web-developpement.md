---
title: "Développement du site Glacier artisanal"
description: ""
date: "2022-07-22"
modified: "2025-06-25T12:53:50"
slug: "developpement-walter-glacier-fr"
projectFolder: "walter-glacier"
featured: true 
featuredOrder: 1  

categories:
  - "Démarche UX"
  - "Développement front-end"
  - "Direction artistique"
  - "Wedesign"
tags:
  - "DECATHLON"
  - "SUBEA"
  - "Illustrator"
  - "Photoshop"

couleur: "#cb2d91ff"

# === AFFICHAGE SUR LA HOME ===
thumbnail: "thumb-glacier.png"
thumbnail_alt: "Web developpement et identité visuelle du site Walter-glacier.fr"
gridSize: "wide"  #square",  "portrait",  "landscape",  "wide",  "tall",  "feat",  "mini",
# gridSpan:
#   cols: 10
#   rows: 8

# === PAGE PROJET ===
hero: "hero-walter-glacier.jpg"

# hero-walter-glacier.jpg
# glacier-01.jpg
# glacier-02.jpg
# glacier-03.jpg
# glacier-04.jpg
# glacier-05.jpg
# glacier-06.png
# glacier-07.jpg
# glacier-08.gif
# glacier-09.jpg
# glacier-10.jpg
# glacier-11.jpg
# glacier-12.jpg
# === RANGÉES INDÉPENDANTES ===
rows:
  
  # Rangée 1 : Deux images qui se chevauchent
  - elements:
      - type: "image"
        src: "glacier-01.jpg"
        alt: "Détail fond"
        gridColumn: "1 / span 6"
      
      - type: "image"
        src: "glacier-02.jpg"
        alt: "Détail premier plan"
        gridColumn: "7 / span 2"  # Chevauche la première (commence à col 6)
        parallax: -15 # au cas où

# Rangée 2 : Image pleine largeur
  - elements:
      - type: "image"
        src: "glacier-03.jpg"
        alt: "Introduction"
        gridColumn: "1 / span 14"
  
  # Rangée 3 : Bloc objectifs seul
  - elements:
      - type: "image"
        src: "glacier-04.jpg"
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


---
