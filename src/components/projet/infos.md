# ProjetGroup & ProjetItem — Fonctionnement

## Vue d'ensemble

```
[slug].astro
  └─ ProjetGroup (une rangée = un groupe = un .projet-grid)
       └─ ProjetItem (dispatcher conditionnel)
            ├─ Image
            ├─ Video
            ├─ Blockquote
            ├─ Caption
            ├─ BeforeAfter
            └─ HorizontalSlider
```

---

## Les groupes

Un **groupe** est un tableau d'items qui partagent la même grille CSS 28 colonnes.  
Chaque groupe produit un `<div class="projet-grid">` indépendant.

Les groupes peuvent venir de deux sources :

### 1. Auto-générés (`defaultLayout.ts`)
Si le `.md` ne définit pas de `groups`, `getProjectGroups()` applique des **patterns** prédéfinis (A–F) en rotation selon le nombre d'images.

| Pattern | Disposition |
|---------|-------------|
| A | 2 images côte à côte |
| B | 3 images en escalier |
| C | 1 grande + 1 petite décalée |
| D | 2 images décalées |
| E | 3 images variées |
| F | 1 large à gauche + 1 droite |

Les composants spéciaux (`before-after`, `slider`) sont insérés automatiquement à des positions fixes (après le 2e groupe, après le 4e groupe…).

### 2. Définis dans le frontmatter
Si `groups:` est présent dans le `.md`, il prend le dessus sur l'auto-génération.

```yaml
groups:
  - - col: 1       # groupe 1 → image 1
      span: 14
      top: "4vw"
      parallax: -150
    - col: 16      # groupe 1 → image 2
      span: 10
      top: "12vw"
      parallax: -200
  - - type: blockquote   # groupe 2 → texte seul
      col: 6
      span: 16
      top: "2vw"
      content: "Mon texte ici"
```

---

## ProjetGroup

Reçoit la liste d'items et le sous-tableau d'images qui lui correspond.

**Responsabilité clé** : distribuer les images aux bons items.  
Un compteur interne `imageOffset` avance pour chaque item sans `type` (= image).  
Les items avec `type` (blockquote, video…) ne consomment pas d'image.

```
items = [{ col:1, span:14 }, { type:"blockquote", col:6, span:16 }]
images = [img0]

→ item[0] → img0  (imageOffset 0→1)
→ item[1] → aucune image consommée
```

---

## ProjetItem

Dispatcher : lit `item.type` et rend le bon composant.

| `type` | Composant | Images consommées |
|--------|-----------|-------------------|
| *(absent)* | `Image` | 1 |
| `video` | `Video` | 0 |
| `blockquote` | `Blockquote` | 0 |
| `caption` | `Caption` | 0 |
| `before-after` | `BeforeAfter` | 0 (images séparées) |
| `slider` | `HorizontalSlider` | 0 (images séparées) |

---

## Propriétés disponibles par item

| Propriété | Type | Composants concernés | Description |
|-----------|------|----------------------|-------------|
| `col` | number | tous | Colonne de départ (1–28) |
| `span` | number | tous | Nombre de colonnes occupées |
| `top` | string | tous | Décalage vertical (`px`, `vw`, `%`) |
| `parallax` | number | Image | Amplitude du parallaxe (négatif = remonte) |
| `zIndex` | number | Image | Superposition (`z-index`) |
| `type` | string | — | Définit le type d'élément |
| `content` | string | Blockquote, Caption | Texte affiché |
| `author` | string | Caption | Signature sous le texte |
| `src` | string | Video | Chemin de la vidéo |
| `aspectRatio` | string | Video | Ratio forcé (`16/9`, `4/3`…) |
| `styled` | boolean | Image | Bord arrondi + ombre |
| `name` | string | BeforeAfter | Identifie la paire avant/après |
| `width` | string | BeforeAfter | Largeur en % du curseur initial |

---

## Positionnement CSS (grille 28 colonnes)

Chaque item se positionne via des custom properties injectées en inline style :

```css
--col-start: 3;        /* grid-column-start */
--col-span: 12;        /* grid-column: span 12 */
--margin-top: 4vw;     /* décalage vertical */
--z-index: 2;          /* optionnel, défaut: auto */
```

Sur **mobile**, tous les items passent en `grid-column: 1 / -1` et `margin-top` est uniforme (`space(6)`), annulant les valeurs du frontmatter.
