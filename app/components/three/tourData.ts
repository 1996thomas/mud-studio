import { EYE_Y, X_DIVIDE, X_EXPO_START, ENTRY_DOOR_X0, ENTRY_DOOR_X1, GLASS_X0, GLASS_WIDTH } from './roomGeometry'

// Système de "visite" réutilisable, façon Street View :
// - des NODES (points d'arrêt où la caméra peut se poser et regarder autour d'elle)
// - des CONNECTIONS entre nodes (les repères "se déplacer" cliquables, façon flèches Street View)
// - des POIS (points d'intérêt à l'intérieur d'un node : la caméra s'y recentre et un texte s'affiche)
//
// Pour ajouter un nouveau point d'arrêt : ajouter un NODE + ses CONNECTIONS.
// Pour ajouter un point d'intérêt : ajouter une entrée dans POIS avec le nodeId concerné.

export type TourNode = {
  id: string
  position: [number, number, number]
  yaw: number // cap horizontal par défaut à l'arrivée (0 = plein +Z)
  pitch: number
}

export type Connection = {
  toNodeId: string
  anchor: [number, number, number]
  label: string
}

export type Poi = {
  id: string
  nodeId: string
  anchor: [number, number, number]
  title: string
  description: string
}

const ENTRY_X = (ENTRY_DOOR_X0 + ENTRY_DOOR_X1) / 2

export const NODES: Record<string, TourNode> = {
  street: { id: 'street', position: [ENTRY_X, EYE_Y, -2.4], yaw: 0, pitch: 0 },
  expo: { id: 'expo', position: [7.2, EYE_Y, 1.6], yaw: 0, pitch: 0 },
  atelier: { id: 'atelier', position: [3.0, EYE_Y, 1.0], yaw: 0, pitch: 0 },
}

export const CONNECTIONS: Record<string, Connection[]> = {
  street: [{ toNodeId: 'expo', anchor: [ENTRY_X, 0.02, 0.6], label: 'Entrer' }],
  expo: [
    { toNodeId: 'street', anchor: [ENTRY_X, 0.02, 0.35], label: 'Sortir' },
    { toNodeId: 'atelier', anchor: [X_EXPO_START + 0.3, 0.02, 0.8], label: "Vers l'atelier" },
  ],
  atelier: [{ toNodeId: 'expo', anchor: [X_DIVIDE - 0.5, 0.02, 0.8], label: "Vers la salle d'expo" }],
}

export const POIS: Poi[] = [
  {
    id: 'expo-glass',
    nodeId: 'expo',
    anchor: [GLASS_X0 + GLASS_WIDTH / 2, 1.5, -0.05],
    title: 'Vitrine sur rue',
    description:
      "La salle d'expo donne directement sur la rue avec une vitrine à deux vitres — un format idéal pour un pop-up store.",
  },
  {
    id: 'expo-wall',
    nodeId: 'expo',
    anchor: [X_EXPO_START + 0.05, 1.5, 2.5],
    title: "Mur vers l'atelier",
    description:
      "Ce mur sépare la salle d'expo de l'atelier de sérigraphie. Une porte permet de passer directement de l'un à l'autre.",
  },
  {
    id: 'expo-plinth',
    nodeId: 'expo',
    anchor: [7.7, 0.65, 2.5],
    title: 'Espace produit',
    description: 'Un plinthe central pour mettre en avant les pièces des marques résidentes.',
  },
  {
    id: 'atelier-tables',
    nodeId: 'atelier',
    anchor: [1.8, 0.8, 2.0],
    title: 'Tables de sérigraphie',
    description: "L'atelier accueille les tables d'impression — sérigraphie et DTF pour les marques résidentes.",
  },
]
