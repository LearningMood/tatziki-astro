## 📁 Structure SIMPLIFIÉE (ce dont vous avez vraiment besoin)

styles/
├── _variables.scss       ← Toutes vos couleurs (SCSS)
├── _css-vars.scss        ← Version CSS custom properties
└── _mixins.scss          ← Vos mixins (optionnel)

.card {
  color: $indigo-500;           // Couleur directe
  background: $azul-100;        // Variation claire
  border: 1px solid $noir-800;  // Variation foncée
}
OU avec CSS variables :
scss.card {
  color: var(--indigo-500);
  background: var(--azul-100);
}
