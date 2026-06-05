// Exemple 1 : Titre simple avec filet court à gauche
.titre-section {
  @include heading-underline(
    $size: 2.5rem,
    $color: $indigo-700,
    $filet-width: 60px,
    $filet-color: $azul-500
  );
}

// Exemple 2 : Titre avec filet centré et dotted
.titre-chapitre {
  @include heading-underline(
    $size: 1.8rem,
    $filet-width: 100px,
    $filet-style: dotted,
    $filet-centered: true,
    $filet-color: $pomme-400
  );
}

// Exemple 3 : Titre avec filet pleine largeur
.titre-hero {
  @include heading-underline(
    $size: 3rem,
    $weight: 900,
    $filet-width: 100%,
    $filet-height: 4px,
    $filet-color: $indigo-500
  );
}

// Exemple 4 : Titre sans filet
.titre-simple {
  @include heading-underline(
    $size: 1.5rem,
    $filet: false
  );
}

// Exemple 5 : Filet dashed, court, centré
.titre-article {
  @include heading-underline(
    $size: 2rem,
    $color: $noir-800,
    $filet-width: 80px,
    $filet-height: 2px,
    $filet-style: dashed,
    $filet-centered: true,
    $filet-color: $rose
  );
}