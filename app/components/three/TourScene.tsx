'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { Room, Props as RoomProps } from './Room'
import FisheyeEffect from './FisheyeEffect'
import { NODES, CONNECTIONS, POIS, type Poi } from './tourData'
import { EYE_Y, HEIGHT, DEPTH, WIDTH_ATELIER, X_EXPO_START, WIDTH_EXPO } from './roomGeometry'

type CamState = { x: number; z: number; yaw: number; pitch: number }

const DRAG_SENSITIVITY = 0.0035
const PITCH_LIMIT = 0.5

// Repère cliquable pour se déplacer d'un node à l'autre — disque au sol, façon Street View
function ConnectionMarker({ position, onClick }: { position: [number, number, number]; onClick: () => void }) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const pulse = 1 + Math.sin(clock.elapsedTime * 2.2) * 0.1
    ref.current.scale.setScalar((hovered ? 1.3 : 1) * pulse)
  })

  return (
    <mesh
      ref={ref}
      position={position}
      rotation-x={-Math.PI / 2}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <circleGeometry args={[0.32, 32]} />
      <meshBasicMaterial color="#b23a1e" transparent opacity={hovered ? 0.95 : 0.7} />
    </mesh>
  )
}

// Point d'intérêt cliquable — icône "œil", façon highlight jeu vidéo
function PoiMarker({
  position,
  active,
  onClick,
}: {
  position: [number, number, number]
  active: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const highlighted = hovered || active

  return (
    <Html position={position} center zIndexRange={[10, 0]}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        aria-label="Point d'intérêt"
        className="pointer-events-auto relative flex items-center justify-center rounded-full transition-transform duration-200"
        style={{
          width: 40,
          height: 40,
          transform: `scale(${highlighted ? 1.2 : 1})`,
          background: highlighted ? '#fff3e0' : 'rgba(122,79,53,0.88)',
          color: highlighted ? '#171310' : '#fff3e0',
          boxShadow: '0 0 0 2px rgba(255,255,255,0.2)',
        }}
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-full animate-ping"
          style={{ background: 'rgba(122,79,53,0.5)', animationDuration: '2.4s' }}
        />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative">
          <path
            d="M2 12C4 7 8 4.5 12 4.5S20 7 22 12C20 17 16 19.5 12 19.5S4 17 2 12Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="12" r="3.2" fill="currentColor" />
        </svg>
      </button>
    </Html>
  )
}

// Pilote la caméra : position/cap fixes par node, "regarder autour" au drag,
// transitions douces (GSAP) vers un node ou un point d'intérêt focus.
function CameraController({ currentNodeId, activePoi }: { currentNodeId: string; activePoi: Poi | null }) {
  const { camera, gl } = useThree()
  const startNode = NODES[currentNodeId]
  const camState = useRef<CamState>({
    x: startNode.position[0],
    z: startNode.position[2],
    yaw: startNode.yaw,
    pitch: startNode.pitch,
  })
  const isTransitioning = useRef(false)
  const lastNodeId = useRef(currentNodeId)
  const lastPoiId = useRef<string | null>(null)

  // Regarder autour de soi — drag souris/tactile, ignoré pendant une transition
  useEffect(() => {
    const dom = gl.domElement
    dom.style.touchAction = 'none'
    const drag = { active: false, lastX: 0, lastY: 0 }

    const onDown = (e: PointerEvent) => {
      drag.active = true
      drag.lastX = e.clientX
      drag.lastY = e.clientY
    }
    const onMove = (e: PointerEvent) => {
      if (!drag.active || isTransitioning.current) return
      const dx = e.clientX - drag.lastX
      const dy = e.clientY - drag.lastY
      drag.lastX = e.clientX
      drag.lastY = e.clientY
      camState.current.yaw += dx * DRAG_SENSITIVITY
      camState.current.pitch = THREE.MathUtils.clamp(
        camState.current.pitch + dy * DRAG_SENSITIVITY,
        -PITCH_LIMIT,
        PITCH_LIMIT
      )
    }
    const onUp = () => {
      drag.active = false
    }

    dom.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      dom.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [gl])

  // Changement de node -> traveling vers sa position + cap par défaut
  useEffect(() => {
    if (lastNodeId.current === currentNodeId) return
    lastNodeId.current = currentNodeId
    const node = NODES[currentNodeId]
    isTransitioning.current = true
    gsap.to(camState.current, {
      x: node.position[0],
      z: node.position[2],
      yaw: node.yaw,
      pitch: node.pitch,
      duration: 1.3,
      ease: 'power2.inOut',
      onComplete: () => {
        isTransitioning.current = false
      },
    })
  }, [currentNodeId])

  // Focus sur un point d'intérêt (léger zoom + recentrage) ou retour à la vue par défaut
  useEffect(() => {
    const poiId = activePoi?.id ?? null
    if (lastPoiId.current === poiId) return
    lastPoiId.current = poiId
    const node = NODES[currentNodeId]
    isTransitioning.current = true

    if (activePoi) {
      const current = new THREE.Vector3(camState.current.x, EYE_Y, camState.current.z)
      const anchor = new THREE.Vector3(...activePoi.anchor)
      const toAnchor = anchor.clone().sub(current)
      const yaw = Math.atan2(toAnchor.x, toAnchor.z)
      const horiz = Math.sqrt(toAnchor.x * toAnchor.x + toAnchor.z * toAnchor.z)
      const pitch = THREE.MathUtils.clamp(Math.atan2(anchor.y - EYE_Y, horiz), -PITCH_LIMIT, PITCH_LIMIT)
      const push = current.clone().lerp(anchor, 0.22)
      gsap.to(camState.current, {
        x: push.x,
        z: push.z,
        yaw,
        pitch,
        duration: 0.9,
        ease: 'power2.inOut',
        onComplete: () => {
          isTransitioning.current = false
        },
      })
    } else {
      // Dézoom uniquement — on ne réinitialise pas le cap, on annule juste le rapprochement
      gsap.to(camState.current, {
        x: node.position[0],
        z: node.position[2],
        duration: 0.9,
        ease: 'power2.inOut',
        onComplete: () => {
          isTransitioning.current = false
        },
      })
    }
  }, [activePoi, currentNodeId])

  useFrame(() => {
    camera.position.set(camState.current.x, EYE_Y, camState.current.z)
    const { yaw, pitch } = camState.current
    const dirX = Math.sin(yaw) * Math.cos(pitch)
    const dirY = Math.sin(pitch)
    const dirZ = Math.cos(yaw) * Math.cos(pitch)
    camera.lookAt(camera.position.x + dirX, camera.position.y + dirY, camera.position.z + dirZ)
  })

  return null
}

export default function TourScene({
  currentNodeId,
  activePoi,
  onNavigate,
  onFocusPoi,
}: {
  currentNodeId: string
  activePoi: Poi | null
  onNavigate: (nodeId: string) => void
  onFocusPoi: (poi: Poi | null) => void
}) {
  const connections = CONNECTIONS[currentNodeId] ?? []
  const pois = POIS.filter((p) => p.nodeId === currentNodeId)

  return (
    <Canvas camera={{ fov: 68, near: 0.1, far: 50 }} dpr={[1, 1.75]}>
      <color attach="background" args={['#171310']} />
      <fog attach="fog" args={['#171310', 7, 20]} />
      <CameraController currentNodeId={currentNodeId} activePoi={activePoi} />

      <ambientLight intensity={0.75} color="#f3efe4" />
      <pointLight
        position={[WIDTH_ATELIER / 2, HEIGHT - 0.2, DEPTH / 2]}
        intensity={22}
        color="#caa27a"
        distance={9}
        decay={2}
      />
      <pointLight
        position={[X_EXPO_START + WIDTH_EXPO / 2, HEIGHT - 0.2, DEPTH / 2]}
        intensity={16}
        color="#fff3e0"
        distance={7}
        decay={2}
      />

      <Room />
      <RoomProps />

      {connections.map((c) => (
        <ConnectionMarker key={c.toNodeId} position={c.anchor} onClick={() => onNavigate(c.toNodeId)} />
      ))}
      {pois.map((p) => (
        <PoiMarker
          key={p.id}
          position={p.anchor}
          active={activePoi?.id === p.id}
          onClick={() => onFocusPoi(activePoi?.id === p.id ? null : p)}
        />
      ))}

      <FisheyeEffect strength={0.18} />
    </Canvas>
  )
}
