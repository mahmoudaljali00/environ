'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere({ position, color, speed = 1, distort = 0.3 }: { 
  position: [number, number, number]
  color: string
  speed?: number
  distort?: number
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2 * speed
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function AnimatedTorus({ position, color, speed = 1 }: {
  position: [number, number, number]
  color: string
  speed?: number
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.4 * speed
      mesh.current.rotation.z = state.clock.elapsedTime * 0.2 * speed
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh ref={mesh} position={position}>
        <torusGeometry args={[0.8, 0.3, 16, 32]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.3}
          speed={speed}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  )
}

function AnimatedOctahedron({ position, color }: {
  position: [number, number, number]
  color: string
}) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.5
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3
    }
  })

  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <octahedronGeometry args={[0.7]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.95}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

function Scene({ primaryColor }: { primaryColor: string }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color={primaryColor} />
      
      <AnimatedSphere position={[-3, 1, -2]} color={primaryColor} speed={0.8} distort={0.4} />
      <AnimatedTorus position={[3, -1, -3]} color={primaryColor} speed={1.2} />
      <AnimatedOctahedron position={[0, 2, -4]} color={primaryColor} />
      <AnimatedSphere position={[4, 2, -5]} color={primaryColor} speed={0.5} distort={0.2} />
      <AnimatedTorus position={[-4, -2, -4]} color={primaryColor} speed={0.7} />
      
      <Environment preset="night" />
    </>
  )
}

interface Floating3DShapesProps {
  className?: string
  primaryColor?: string
}

export default function Floating3DShapes({ 
  className = '',
  primaryColor = '#009d8e'
}: Floating3DShapesProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene primaryColor={primaryColor} />
        </Suspense>
      </Canvas>
    </div>
  )
}
