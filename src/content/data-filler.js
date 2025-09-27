// ===== CONFIGURATION DES FILLERS =====
// src/data/fillers.js

export const fillerConfig = {
  // Patterns de tailles disponibles
  patterns: [
    { cols: 4, rows: 4 },
    { cols: 5, rows: 5 },
    { cols: 4, rows: 5 },
    { cols: 5, rows: 4 },
    { cols: 6, rows: 4 },
  ],
  
  // Définition des fillers
  items: [
    {
      id: 'quote-1',
      type: 'quote',
      content: 'La créativité\nc\'est l\'intelligence\nqui s\'amuse',
      author: 'Einstein',
      colors: {
        gradient: ['#f093fb', '#f5576c'],
        text: '#ffffff'
      }
    },
    {
      id: 'stat-projects',
      type: 'stat',
      number: '50+',
      label: 'Projets réalisés',
      colors: {
        gradient: ['#4facfe', '#00f2fe'],
        text: '#ffffff'
      }
    },
    {
      id: 'contact-cta',
      type: 'cta',
      text: 'Discutons de\nvotre projet',
      link: '/contact',
      icon: 'mail', // Nom de l'icône
      colors: {
        gradient: ['#667eea', '#764ba2'],
        text: '#ffffff',
        hover: ['#7c89f5', '#8a5bb8']
      }
    },
    {
      id: 'skill-design',
      type: 'skill',
      title: 'Design System',
      icon: 'design', // Référence à votre SVG
      link: '/competences#design',
      colors: {
        gradient: ['#43e97b', '#38f9d7'],
        text: '#ffffff'
      }
    },
    {
      id: 'social-linkedin',
      type: 'social',
      platform: 'LinkedIn',
      icon: 'linkedin',
      link: 'https://linkedin.com/in/votre-profil',
      external: true,
      colors: {
        gradient: ['#0077B5', '#0066a2'],
        text: '#ffffff'
      }
    },
    {
      id: 'availability',
      type: 'status',
      text: 'Disponible',
      subtext: 'Janvier 2025',
      icon: 'calendar',
      colors: {
        gradient: ['#11998e', '#38ef7d'],
        text: '#ffffff'
      }
    }
  ]
};

