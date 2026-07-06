// ─────────────────────────────────────────────
//  MUD STUDIO — Contenu du site
//  Tous les textes affichés sont centralisés ici.
//  Modifier une valeur ici suffit à la répercuter partout.
// ─────────────────────────────────────────────

export const siteData = {
  // ── Identité ─────────────────────────────────────────────────
  brand: {
    name: 'Mud Studio',
    location: 'Montreuil · 93',
    tagline: 'Sérigraphie / DTF / Flex',
    address: {
      street: '32 rue de Barbès',
      city: '93100 Montreuil',
    },
    email: 'contact@mud-studio.fr',
    instagramUrl: '#',
    hours: ['Lun – Sam', 'Sur rendez-vous'],
  },

  // ── Navigation ───────────────────────────────────────────────
  nav: [
    { label: "L'espace", href: '/espace' },
    { label: "L'atelier", href: '/atelier' },
    { label: 'Marginal Mouvement', href: '/marginal-mouvement' },
    { label: 'Maison Bizness', href: '/maison-bizness' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: "L'équipe", href: '/equipe' },
    { label: 'Contact', href: '#contact' },
  ],

  // ── Hero (home) ──────────────────────────────────────────────
  hero: {
    eyebrow: 'Montreuil · 93',
    headlineLines: ['Un espace', "d'exposition,", 'un atelier textile'],
    subheading:
      "Mud Studio accueille expositions, pop-up stores et séances photo dans un espace de 20 m², et fabrique en petites séries pour des marques indépendantes dans son atelier de sérigraphie, DTF et flex.",
    ctaPrimary: { label: "Découvrir l'espace", href: '/espace' },
    ctaSecondary: { label: "Voir l'atelier", href: '/atelier' },
    meta: {
      left: 'Sérigraphie / DTF / Flex',
      right: '32 rue de Barbès',
    },
  },

  // ── L'espace ─────────────────────────────────────────────────
  espace: {
    href: '/espace',
    eyebrow: "L'espace — 20 m²",
    title: 'Expositions, pop-up, séances photo',
    description:
      "Un lieu brut et modulable, pensé pour accueillir des formats variés : expositions photo, pop-up stores, événements ponctuels, ou encore location à d'autres professionnels (tatoueurs, praticiens) lors des jours creux.",
    ctaLabel: "Réserver l'espace",
    ctaHref: '#contact',
    pricing: [
      { label: 'Demi-journée', price: '80 – 150 €' },
      { label: 'Journée complète', price: '150 – 250 €' },
      { label: 'Soirée événementielle', price: '200 – 400 €' },
    ],
  },

  // ── L'atelier ────────────────────────────────────────────────
  atelier: {
    href: '/atelier',
    eyebrow: "L'atelier",
    title: 'Sérigraphie, DTF, flex',
    tagSoon: 'Broderie bientôt',
    description:
      "Nous produisons en petites séries pour des marques indépendantes et des particuliers. Chaque commande fait l'objet d'un échange direct avant fabrication — pas de minimum imposé qui n'a pas de sens pour vous.",
    techniques: [
      { name: 'Sérigraphie', price: '8 – 9 € / pièce · série ~100', soon: false },
      { name: 'DTF', price: '3 – 6 € / pièce · 1 à 50 unités', soon: false },
      { name: 'Flex / flocage', price: '2,50 – 5 € / pièce', soon: false },
      { name: 'Broderie', price: '4 – 6 € / pièce · à venir', soon: true },
    ],
  },

  // ── Marques résidentes ───────────────────────────────────────
  marginalMouvement: {
    href: '/marginal-mouvement',
    eyebrow: 'Marque résidente',
    brandMark: 'Marginal Mouvement',
    title: 'Streetwear, fabriqué sur place',
    description:
      "Marginal Mouvement est une marque de streetwear qui fabrique une partie de ses collections directement dans l'atelier Mud Studio.",
    role: "Résidente de l'atelier depuis l'ouverture",
    tone: 'marginal' as const,
  },

  maisonBizness: {
    href: '/maison-bizness',
    eyebrow: 'Marque résidente',
    brandMark: 'Maison Bizness',
    title: 'Streetwear, fabriqué sur place',
    description:
      "Maison Bizness est une marque de streetwear qui fabrique une partie de ses collections directement dans l'atelier Mud Studio.",
    role: "Résidente de l'atelier depuis l'ouverture",
    tone: 'bizness' as const,
  },

  // ── Portfolio (ex "Créatif") ─────────────────────────────────
  portfolio: {
    href: '/portfolio',
    eyebrow: 'Portfolio',
    title: 'Nos réalisations',
    description:
      "Une sélection de projets menés pour des marques indépendantes : identité visuelle, sérigraphie, DTF, flex et accompagnement créatif. Cette page arrive bientôt.",
    emptyStateLabel: 'Portfolio en préparation — revenez prochainement.',
  },

  // ── L'équipe ─────────────────────────────────────────────────
  equipe: {
    href: '/equipe',
    eyebrow: "L'équipe",
    title: 'Trois fondateurs, trois savoir-faire',
    members: [
      {
        number: '01',
        name: 'Thomas Kanthack',
        role: 'Président · Sérigraphie & Web',
        description:
          'Sérigraphie et flocage depuis le lycée. Développeur web, codéveloppeur de KNIT, plateforme dédiée aux marques indépendantes.',
      },
      {
        number: '02',
        name: 'Ludo Harlay',
        role: 'Événementiel & Espace',
        description:
          "Formation en 3D. En charge de l'espace exposition et de la programmation des événements.",
      },
      {
        number: '03',
        name: 'Victor Cohen',
        role: 'Atelier & Commandes',
        description:
          "Organise régulièrement des pop-up stores pour la Fashion Week de Paris. En charge de l'atelier et du suivi des commandes.",
      },
    ],
  },

  // ── Footer / Contact ─────────────────────────────────────────
  footer: {
    eyebrow: 'Contact',
    title: 'Un projet, une question, une location d’espace ?',
    bottom: {
      left: 'Mud Studio — Montreuil',
      right: 'Sérigraphie · DTF · Flex',
    },
  },

  // ── Newsletter (popup + footer) ──────────────────────────────
  newsletter: {
    title: 'Mud Studio',
    subtitle: 'Restez informés de nos actualités',
    emailPlaceholder: 'votre@email.com',
    submitLabel: "S'inscrire",
    submitPendingLabel: 'Inscription…',
    submitSuccessLabel: 'Inscrit ✓',
    popup: {
      delaySeconds: 10,
      dismissedStorageKey: 'mud-newsletter-popup-dismissed',
      closeLabel: 'Fermer',
    },
  },
}

export type SiteData = typeof siteData
