---
title: "Projet avec tous les composants"
description: "Un projet qui utilise des composants personnalisés"
date: "2024-01-25"
thumbnail: "/src/assets/projets/showroom-cofely/Cofely-Dashboard.jpg"
categories: ["Design", "Web"]
couleur: "#487961ff"
gridSize: "feat"  # "square",  "portrait",  "landscape",  "wide",  "tall",  "feat",  "mini",
# gridSpan:
#   cols: 10
#   rows: 8
hero: "/src/assets/projets/hero-saint-gobain-illustration-tatziki.jpg"

objectifs:
  - "Moderniser l'identité visuelle de la marque"
  - "Améliorer l'expérience utilisateur sur mobile"
  - "Augmenter le taux de conversion de 25%"
  - "Intégrer un système de design cohérent"

images:
  - src: "/src/assets/projets/areva/areva-extrait.jpg"
    alt: "Description"
    caption: "une légende associée à cette image"
   
  - src: "/src/assets/projets/areva/Areva-story-sketch.gif.jpg" # "type" absent → fallback "normal"

beforeAfter:
  before: "/src/assets/projets/saint-gobain/saint-gobain-illustration-tatziki-before-after-01.jpg"
  after: "/src/assets/projets/saint-gobain/saint-gobain-illustration-tatziki-before-after-02.jpg."

showSlider: true

links:
  - title: "Voir le site"
    url: "https://exemple.com"
    type: "external"
  - title: "Étude de cas complète"
    url: "/case-study/nom-projet"
    type: "internal"

componentsOrder:
  - hero
  - objectifs
  - beforeAfter
  - slider
  - content

---