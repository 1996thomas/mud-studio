// Dimensions réelles du local (m) — les deux pièces sont côte à côte, même profondeur,
// séparées par un mur porteur avec une porte sur la gauche de l'atelier.
// x=0 est le mur extérieur gauche (atelier), x augmente vers la droite (salle d'expo, côté rue).
// z=0 est la façade rue, la profondeur augmente vers le fond du bâtiment.
export const DEPTH = 5.5
export const WALL_T = 0.2
export const HEIGHT = 2.7

export const WIDTH_ATELIER = 5.8 // ~32m² au calcul (51 - 19.25) / 5.5
export const WIDTH_EXPO = 3.5 // 19.25m² — salle d'expo / pop store, façade rue

export const X_DIVIDE = WIDTH_ATELIER
export const X_EXPO_START = X_DIVIDE + WALL_T
export const X_RIGHT = X_EXPO_START + WIDTH_EXPO

// Porte intérieure atelier <-> expo, sur le mur séparateur, côté rue (à gauche en entrant)
export const DOOR_Z0 = 0.3
export const DOOR_WIDTH = 1.0
export const DOOR_Z1 = DOOR_Z0 + DOOR_WIDTH
export const DOOR_HEIGHT = 2.1

// Façade rue : porte d'entrée à gauche (côté mur séparateur), vitrine (2 vitres) à droite
export const ENTRY_DOOR_X0 = X_EXPO_START
export const ENTRY_DOOR_WIDTH = 1.0
export const ENTRY_DOOR_X1 = ENTRY_DOOR_X0 + ENTRY_DOOR_WIDTH
export const MULLION_W = 0.1
export const GLASS_X0 = ENTRY_DOOR_X1 + MULLION_W
export const GLASS_WIDTH = 2.0
export const GLASS_SPLIT = GLASS_X0 + GLASS_WIDTH / 2 // séparation entre les 2 vitres

export const WALL_COLOR = '#eae6dd'
export const FRAME_COLOR = '#7a4f35'

export const EYE_Y = 1.6
