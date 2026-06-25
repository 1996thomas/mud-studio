// ─────────────────────────────────────────────
//  MUD STUDIO — Visual Config
//  Toutes les variables visuelles de la Home
// ─────────────────────────────────────────────

export const config = {

  // ── Page ─────────────────────────────────────────────────────
  page: {
    background: '#0a0a0a',        // couleur de fond derrière tout
  },

  // ── Grid (layer 1) ───────────────────────────────────────────
  grid: {
    gradientColor: '#1C1C1C',     // centre du radial-gradient
    cellBackground: '#1a1a1a',    // fond de chaque cellule
    logoOpacity: 0.55,            // 0 = invisible, 1 = plein
    logoPadding: '1.25rem',       // espace entre logo et bord de cellule
    rotation: -15,                // inclinaison de la grille (degrés)
    gap: 16,                      // espacement entre cellules (px)
    rowSpeed: 60,                 // secondes pour un cycle complet (plus grand = plus lent)

    // Nombre de colonnes selon la taille d'écran
    cols: {
      mobile: 2,    // < 640px
      tablet: 3,    // 640px – 1023px
      desktop: 5,   // ≥ 1024px
    },
  },

  // ── Grainient (layer 2) ──────────────────────────────────────
  grain: {
    opacity: 0.45,            // présence du layer (0 = off, 1 = couvre tout)
    grainAmount: 0.35,        // intensité du grain  (0.05 subtil → 0.5 fort)
    grainAnimated: true,      // grain animé ou statique

    color1: '#FBFBFB',        // pôle couleur 1 du gradient
    color2: '#0F0F0F',        // pôle couleur 2 du gradient
    color3: '#0a0a0a',        // fond qui se fond avec la page

    blendAngle: -9,           // angle du dégradé (−180 → 180)
    blendSoftness: 0.05,      // douceur de la transition (0 = tranchée, 0.3 = douce)
    saturation: 0.7,          // 0 = noir et blanc, 1 = couleurs vives
    contrast: 1.3,            // 1 = neutre, 1.5 = fort
    timeSpeed: 0.25,          // vitesse du shader (0 = figé, 1 = rapide)
    warpStrength: 1.0,        // déformation du gradient
    warpSpeed: 2.0,           // vitesse de déformation
  },

}
