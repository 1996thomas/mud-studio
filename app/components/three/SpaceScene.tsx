'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import FisheyeEffect from './FisheyeEffect'

// Dimensions réelles du local (m) — les deux pièces sont côte à côte, même profondeur,
// séparées par un mur porteur avec une porte sur la gauche de l'atelier.
// x=0 est le mur extérieur gauche (atelier), x augmente vers la droite (salle d'expo, côté rue).
// z=0 est la façade rue, la profondeur augmente vers le fond du bâtiment.
const DEPTH = 5.5
const WALL_T = 0.2
const HEIGHT = 2.7

const WIDTH_ATELIER = 5.8 // ~32m² au calcul (51 - 19.25) / 5.5
const WIDTH_EXPO = 3.5 // 19.25m² — salle d'expo / pop store, façade rue

const X_DIVIDE = WIDTH_ATELIER
const X_EXPO_START = X_DIVIDE + WALL_T
const X_RIGHT = X_EXPO_START + WIDTH_EXPO

// Porte intérieure atelier <-> expo, sur le mur séparateur, côté rue (à gauche en entrant)
const DOOR_Z0 = 0.3
const DOOR_WIDTH = 1.0
const DOOR_Z1 = DOOR_Z0 + DOOR_WIDTH
const DOOR_HEIGHT = 2.1

// Façade rue : porte d'entrée à gauche (côté mur séparateur), vitrine (2 vitres) à droite
const ENTRY_DOOR_X0 = X_EXPO_START
const ENTRY_DOOR_WIDTH = 1.0
const ENTRY_DOOR_X1 = ENTRY_DOOR_X0 + ENTRY_DOOR_WIDTH
const MULLION_W = 0.1
const GLASS_X0 = ENTRY_DOOR_X1 + MULLION_W
const GLASS_WIDTH = 2.0
const GLASS_SPLIT = GLASS_X0 + GLASS_WIDTH / 2 // séparation entre les 2 vitres

const WALL_COLOR = '#eae6dd'
const FRAME_COLOR = '#7a4f35'

function Room() {
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
function Props() {
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

// Parcours caméra : un vrai traveling — hauteur d'œil fixe, jamais de visée oblique.
// La position bouge sur 2 axes (x, z) ; le cap (angle horizontal) reste constant
// pendant chaque ligne droite et ne tourne que ponctuellement (le virage vers la porte).
const ENTRY_X = (ENTRY_DOOR_X0 + ENTRY_DOOR_X1) / 2
const EYE_Y = 1

// Cap 0 = plein +Z (on rentre dans le bâtiment) ; -π/2 = plein -X (vers l'atelier)
const HEADING_STREET = 0
const HEADING_ATELIER = -Math.PI / 2

type Seg = {
  t0: number
  t1: number
  posA: THREE.Vector2 // (x, z) — la hauteur reste fixe (EYE_Y)
  posB: THREE.Vector2
  headingA: number
  headingB: number
}

const CAM_PATH: Seg[] = [
  // Rue -> à travers la porte d'entrée, tout droit
  {
    t0: 0.0,
    t1: 0.3,
    posA: new THREE.Vector2(ENTRY_X, -2.4),
    posB: new THREE.Vector2(ENTRY_X, 1.0),
    headingA: HEADING_STREET,
    headingB: HEADING_STREET,
  },
  // Virage vers la porte de l'atelier — on s'éloigne du mur pendant qu'on tourne,
  // pour ne jamais se retrouver à le fixer de très près
  {
    t0: 0.3,
    t1: 0.44,
    posA: new THREE.Vector2(ENTRY_X, 1.0),
    posB: new THREE.Vector2(8.0, 0.8),
    headingA: HEADING_STREET,
    headingB: HEADING_ATELIER,
  },
  // Ligne droite, plein axe, jusqu'à la porte de l'atelier et à travers
  {
    t0: 0.44,
    t1: 0.78,
    posA: new THREE.Vector2(8.0, 0.8),
    posB: new THREE.Vector2(5.3, 0.8),
    headingA: HEADING_ATELIER,
    headingB: HEADING_ATELIER,
  },
  // Ligne droite dans l'atelier, entre les deux tables
  {
    t0: 0.78,
    t1: 1.0,
    posA: new THREE.Vector2(5.3, 0.8),
    posB: new THREE.Vector2(3.0, 1.0),
    headingA: HEADING_ATELIER,
    headingB: HEADING_ATELIER,
  },
]

function sampleCamPath(progress: number, outPos: THREE.Vector3, outTarget: THREE.Vector3) {
  let i = 0
  while (i < CAM_PATH.length - 1 && progress > CAM_PATH[i].t1) i++
  const seg = CAM_PATH[i]
  const local = THREE.MathUtils.clamp((progress - seg.t0) / (seg.t1 - seg.t0), 0, 1)
  const eased = THREE.MathUtils.smootherstep(local, 0, 1)

  const x = THREE.MathUtils.lerp(seg.posA.x, seg.posB.x, eased)
  const z = THREE.MathUtils.lerp(seg.posA.y, seg.posB.y, eased)
  const heading = THREE.MathUtils.lerp(seg.headingA, seg.headingB, eased)

  outPos.set(x, EYE_Y, z)
  outTarget.set(x + Math.sin(heading), EYE_Y, z + Math.cos(heading))
}

function CameraRig({ progressRef }: { progressRef: React.RefObject<number> }) {
  const pos = useRef(new THREE.Vector3())
  const target = useRef(new THREE.Vector3())

  useFrame(({ camera }) => {
    sampleCamPath(progressRef.current, pos.current, target.current)
    camera.position.copy(pos.current)
    camera.lookAt(target.current)
  })

  return null
}

function Lights() {
  const atelierLight = useMemo(() => new THREE.Vector3(WIDTH_ATELIER / 2, HEIGHT - 0.2, DEPTH / 2), [])
  const expoLight = useMemo(
    () => new THREE.Vector3(X_EXPO_START + WIDTH_EXPO / 2, HEIGHT - 0.2, DEPTH / 2),
    []
  )

  return (
    <>
      <ambientLight intensity={0.7} color="#f3efe4" />
      <pointLight position={atelierLight} intensity={22} color="#caa27a" distance={9} decay={2} />
      <pointLight position={expoLight} intensity={16} color="#fff3e0" distance={7} decay={2} />
    </>
  )
}

export default function SpaceScene({ progressRef, isDesktop }: { progressRef: React.RefObject<number>; isDesktop: boolean }) {
  return (
    <Canvas camera={{ fov: isDesktop ? 75 : 85, near: 0.1, far: 50 }} dpr={[1, 1.75]}>
      <color attach="background" args={['#171310']} />
      <fog attach="fog" args={['#171310', 7, 20]} />
      <CameraRig progressRef={progressRef} />
      <Lights />
      <Room />
      <Props />
      <FisheyeEffect strength={0.50} />
    </Canvas>
  )
}
