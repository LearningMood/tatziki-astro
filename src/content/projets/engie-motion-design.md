---
title: "Engie : motion design École Commerciale"
description: "Conception d'une vidéo animée de présentation des objectifs et enjeux de l'École Commerciale d'ENGIE Cofely. Du scénario au rendu final, structuration et synthèse des grandes étapes de la refonte à travers un univers visuel et sonore dynamique et engageant."
date: 2019
folder: "engie-motion"
competences: [motion-design, storyboarding, illustration]
technologies: [after-effects, illustrator]
client: "Engie"
color: "#3085a3"
ratio: "4/3"

groups:
#00 Story
  - - { col: 2, span: 10, top: "16vw", parallax: -60 }
    - { col: 13, span: 14, top: "6vw", parallax: -120  }
    - { type: "blockquote", content: "Story-borading et décomposition des différentes séquences de l'animation.", col: 6, span: 6, top: "6vw" }

  - - { type: "video", src: "engie-motion/engie-01", col: 10, span: 10, top: "0vw", aspectRatio: "80/45" }
    - { type: "blockquote", content: "Séquence introductive de l'animatique de présentation de l'École Commerciale", col: 13, span: 6, top: "33vw" }
    - { type: "video", src: "engie-motion/engie-02", col: 4, span: 10, top: "30vw", aspectRatio: "80/45" } # Mais une école, pourquoi (blanc)

    - { col: 19, span: 4, top: "26vw", parallax: -80 } # 01 blanc intro se former en petit
    - { col: 19, span: 4, top: "36vw", parallax: -110  } # 01 blanc intro se former en petit
    - { col: 19, span: 4, top: "46vw", parallax: -160  } # 01 blanc intro se former en petit

  - - { type: "video", src: "engie-motion/engie-03", col: 13, span: 10, top: "8vw", aspectRatio: "80/45" } # Mais une école, pourquoi (blanc)
    - { type: "blockquote", content: "Séquence introductive de l'animatique de présentation de l'École Commerciale", col: 13, span: 6, top: "33vw" }

    - { col: 7, span: 4, top: "20vw", parallax: -80 } # 02 bleu chiffres en petit
    - { col: 7, span: 4, top: "30vw", parallax: -110  } # 02 bleu chiffres en petit
    - { col: 7, span: 4, top: "40vw", parallax: -160  } # 02 bleu chiffres en petit

    - {  col: 20, span: 5,  top: "28vw", parallax: -60} # svg

  
  - - { type: "video", src: "engie-motion/engie-04", col: 4, span: 10, top: "6vw", aspectRatio: "80/45" } # Mais une école, pourquoi (blanc)
    - { col: 16, span: 10,  parallax: -60} # graphics
    

  #04 Et concrètement 1 + 2
  - - { col: 2, span: 12, top: "0vw", parallax: -60 }
    - { col: 16, span: 9, top: "4vw", parallax: -100 }
    - { col: 16, span: 9, top: "24vw", parallax: -140 }
    - { type: "video", src: "engie-motion/cas-usage", col: 12, span: 4, top: "17vw", aspectRatio: "12/10" }

    #Vidéo Cas d'usage
  - - { type: "video", src: "engie-motion/engie-05", col: 13, span: 13, top: "6vw", aspectRatio: "80/45" } # Mais une école, pourquoi (blanc)
    - { type: "blockquote", content: "Dernière partie de présentation du déploiement des formations (voir projet Engie École Managériale & Commerciale)", col: 6, span: 6, top: "16vw" }

  #Illustration cas d'usage
  - - { type: "slider" }

#Full
  - - { type: "video", src: "engie-motion/full", col: 10, span: 14, aspectRatio: "16/9", controls: true, loop: false, top: "8vw" }
---