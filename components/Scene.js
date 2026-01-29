'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Laptop } from './Laptop'
import { Suspense } from 'react'

export default function Scene({ currentSection }) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 50,
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
        />
        
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#22d3ee" />
        <pointLight position={[5, -5, 5]} intensity={0.3} color="#10b981" />
        
        {/* Laptop */}
        <Laptop section={currentSection} />
        
        {/* Shadows */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.5}
          scale={10}
          blur={1}
        />
        
        {/* Environment */}
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}