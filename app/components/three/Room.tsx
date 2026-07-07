import {
  DEPTH,
  WALL_T,
  HEIGHT,
  WIDTH_ATELIER,
  WIDTH_EXPO,
  X_DIVIDE,
  X_EXPO_START,
  X_RIGHT,
  DOOR_Z0,
  DOOR_WIDTH,
  DOOR_Z1,
  DOOR_HEIGHT,
  ENTRY_DOOR_X0,
  ENTRY_DOOR_WIDTH,
  ENTRY_DOOR_X1,
  MULLION_W,
  GLASS_X0,
  GLASS_WIDTH,
  GLASS_SPLIT,
  WALL_COLOR,
  FRAME_COLOR,
} from './roomGeometry'

export function Room() {
  return (
    <group>
      {/* Sols */}
      <mesh rotation-x={-Math.PI / 2} position={[WIDTH_ATELIER / 2, 0, DEPTH / 2]}>
        <planeGeometry args={[WIDTH_ATELIER, DEPTH]} />
        <meshStandardMaterial color="#cfc9b8" />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[X_EXPO_START + WIDTH_EXPO / 2, 0, DEPTH / 2]}>
        <planeGeometry args={[WIDTH_EXPO, DEPTH]} />
        <meshStandardMaterial color="#dfdacb" />
      </mesh>
      {/* Trottoir devant la vitrine */}
      <mesh rotation-x={-Math.PI / 2} position={[X_EXPO_START + WIDTH_EXPO / 2, -0.01, -1.2]}>
        <planeGeometry args={[WIDTH_EXPO + 3, 2.4]} />
        <meshStandardMaterial color="#8f887a" />
      </mesh>

      {/* Mur extérieur gauche (atelier) */}
      <mesh position={[-WALL_T / 2, HEIGHT / 2, DEPTH / 2]}>
        <boxGeometry args={[WALL_T, HEIGHT, DEPTH]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      {/* Mur extérieur droit (expo) */}
      <mesh position={[X_RIGHT + WALL_T / 2, HEIGHT / 2, DEPTH / 2]}>
        <boxGeometry args={[WALL_T, HEIGHT, DEPTH]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      {/* Mur du fond */}
      <mesh position={[X_RIGHT / 2, HEIGHT / 2, DEPTH + WALL_T / 2]}>
        <boxGeometry args={[X_RIGHT + WALL_T * 2, HEIGHT, WALL_T]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>

      {/* Mur séparateur atelier / expo, avec porte côté rue */}
      <mesh position={[X_DIVIDE + WALL_T / 2, HEIGHT / 2, DOOR_Z0 / 2]}>
        <boxGeometry args={[WALL_T, HEIGHT, DOOR_Z0]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[X_DIVIDE + WALL_T / 2, HEIGHT / 2, (DOOR_Z1 + DEPTH) / 2]}>
        <boxGeometry args={[WALL_T, HEIGHT, DEPTH - DOOR_Z1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      <mesh position={[X_DIVIDE + WALL_T / 2, (DOOR_HEIGHT + HEIGHT) / 2, (DOOR_Z0 + DOOR_Z1) / 2]}>
        <boxGeometry args={[WALL_T, HEIGHT - DOOR_HEIGHT, DOOR_WIDTH]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      {/* Chambranle porte intérieure */}
      <mesh position={[X_DIVIDE + WALL_T / 2, DOOR_HEIGHT / 2, DOOR_Z0]}>
        <boxGeometry args={[WALL_T + 0.02, DOOR_HEIGHT, 0.06]} />
        <meshStandardMaterial color={FRAME_COLOR} />
      </mesh>
      <mesh position={[X_DIVIDE + WALL_T / 2, DOOR_HEIGHT / 2, DOOR_Z1]}>
        <boxGeometry args={[WALL_T + 0.02, DOOR_HEIGHT, 0.06]} />
        <meshStandardMaterial color={FRAME_COLOR} />
      </mesh>

      {/* Façade rue — atelier : mur plein (pas d'ouverture côté rue) */}
      <mesh position={[WIDTH_ATELIER / 2, HEIGHT / 2, -WALL_T / 2]}>
        <boxGeometry args={[WIDTH_ATELIER, HEIGHT, WALL_T]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>

      {/* Façade rue — expo : porte d'entrée (côté mur séparateur) + vitrine (2 vitres) */}
      {/* Linteau porte d'entrée */}
      <mesh position={[(ENTRY_DOOR_X0 + ENTRY_DOOR_X1) / 2, (DOOR_HEIGHT + HEIGHT) / 2, -WALL_T / 2]}>
        <boxGeometry args={[ENTRY_DOOR_WIDTH, HEIGHT - DOOR_HEIGHT, WALL_T]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      {/* Chambranle porte d'entrée */}
      <mesh position={[ENTRY_DOOR_X0, DOOR_HEIGHT / 2, -WALL_T / 2]}>
        <boxGeometry args={[0.06, DOOR_HEIGHT, WALL_T + 0.02]} />
        <meshStandardMaterial color={FRAME_COLOR} />
      </mesh>
      <mesh position={[ENTRY_DOOR_X1, DOOR_HEIGHT / 2, -WALL_T / 2]}>
        <boxGeometry args={[0.06, DOOR_HEIGHT, WALL_T + 0.02]} />
        <meshStandardMaterial color={FRAME_COLOR} />
      </mesh>
      {/* Trumeau entre porte et vitrine */}
      <mesh position={[ENTRY_DOOR_X1 + MULLION_W / 2, HEIGHT / 2, -WALL_T / 2]}>
        <boxGeometry args={[MULLION_W, HEIGHT, WALL_T]} />
        <meshStandardMaterial color={FRAME_COLOR} />
      </mesh>
      {/* Vitre 1 */}
      <mesh position={[(GLASS_X0 + GLASS_SPLIT) / 2, HEIGHT * 0.42, -WALL_T / 2]}>
        <boxGeometry args={[GLASS_SPLIT - GLASS_X0 - 0.03, HEIGHT * 0.78, WALL_T * 0.5]} />
        <meshStandardMaterial color="#bfe3e8" transparent opacity={0.35} metalness={0.1} roughness={0.05} />
      </mesh>
      {/* Vitre 2 */}
      <mesh position={[(GLASS_SPLIT + GLASS_X0 + GLASS_WIDTH) / 2 + 0.03, HEIGHT * 0.42, -WALL_T / 2]}>
        <boxGeometry args={[GLASS_X0 + GLASS_WIDTH - GLASS_SPLIT - 0.03, HEIGHT * 0.78, WALL_T * 0.5]} />
        <meshStandardMaterial color="#bfe3e8" transparent opacity={0.35} metalness={0.1} roughness={0.05} />
      </mesh>
      {/* Allège sous la vitrine */}
      <mesh position={[GLASS_X0 + GLASS_WIDTH / 2, HEIGHT * 0.03 / 2, -WALL_T / 2]}>
        <boxGeometry args={[GLASS_WIDTH, HEIGHT * 0.06, WALL_T]} />
        <meshStandardMaterial color={FRAME_COLOR} />
      </mesh>
      {/* Meneau central vitrine */}
      <mesh position={[GLASS_SPLIT, HEIGHT / 2, -WALL_T / 2]}>
        <boxGeometry args={[MULLION_W, HEIGHT, WALL_T]} />
        <meshStandardMaterial color={FRAME_COLOR} />
      </mesh>
      {/* Retour de mur entre la vitrine et le mur droit */}
      <mesh position={[(GLASS_X0 + GLASS_WIDTH + X_RIGHT) / 2, HEIGHT / 2, -WALL_T / 2]}>
        <boxGeometry args={[X_RIGHT - (GLASS_X0 + GLASS_WIDTH), HEIGHT, WALL_T]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
    </group>
  )
}

// Volumes très simples pour donner une échelle aux deux pièces — pas de vrai mobilier
export function Props() {
  return (
    <group>
      {/* Atelier — tables de sérigraphie */}
      <mesh position={[1.8, 0.38, 2.0]}>
        <boxGeometry args={[1.0, 0.76, 2.0]} />
        <meshStandardMaterial color="#4a443d" />
      </mesh>
      <mesh position={[4.0, 0.38, 3.6]}>
        <boxGeometry args={[1.0, 0.76, 2.2]} />
        <meshStandardMaterial color="#4a443d" />
      </mesh>

      {/* Salle d'expo — plinthe produit + présentoir mural */}
      <mesh position={[7.7, 0.3, 2.5]}>
        <boxGeometry args={[0.8, 0.6, 0.8]} />
        <meshStandardMaterial color="#7a4f35" />
      </mesh>
      <mesh position={[X_RIGHT - 0.15, 0.9, 3.6]}>
        <boxGeometry args={[0.06, 1.8, 1.2]} />
        <meshStandardMaterial color="#b23a1e" />
      </mesh>
    </group>
  )
}
