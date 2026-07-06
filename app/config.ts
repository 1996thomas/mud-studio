
export const config = {
  page: {
    background: '#0a0a0a',
  },

  grid: {
    gradientColor: '#1C1C1C',
    cellBackground: '#1a1a1a',
    logoOpacity: 0.55,
    logoPadding: '1.25rem',
    rotation: -15,
    gap: 16,
    rowSpeed: 60,

    cols: {
      mobile: 2,
      tablet: 3,
      desktop: 5,
    },
  },

  grain: {
    opacity: 0.34,          // un peu moins présent
    grainAmount: 0.22,      // grain moins fin / moins agressif
    grainAnimated: true,

    color1: '#FBFBFB', // pôle couleur 1 du gradient 
    color2: '#0F0F0F',
    color3: '#0a0a0a',
    blendAngle: -9,
    blendSoftness: 0.09,    // transition un peu plus douce
    saturation: 0.55,       // un peu moins de tension visuelle
    contrast: 1.12,         // moins violent
    timeSpeed: 0.16,        // animation plus lente = moins de scintillement
    warpStrength: 0.65,     // déformation plus calme
    warpSpeed: 1.2,         // mouvement moins nerveux
  },
}
