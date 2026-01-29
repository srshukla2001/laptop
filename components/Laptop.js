'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Laptop({ section }) {
  const group = useRef()
  const { scene } = useGLTF('/models/laptop.glb')

  const targetPosition = useMemo(() => new THREE.Vector3(), [])
  const targetRotation = useMemo(() => new THREE.Euler(), [])

  const SPEED = 10

  useEffect(() => {
    if (!group.current || !scene) return

    group.current.clear()

    const cloned = scene.clone(true)

    cloned.scale.set(0.85, 0.85, 0.85)
    cloned.rotation.y = Math.PI

    cloned.traverse((o) => {
      o.frustumCulled = true
      o.matrixAutoUpdate = false
      o.updateMatrix()
    })

    group.current.add(cloned)
  }, [scene])

  useFrame((state, delta) => {
    if (!group.current) return

    let targetScale = 1

    switch (section) {
      case 0:
        targetPosition.set(2, -1.5, 0)
        targetRotation.set(0, Math.PI / 0.5, 0)
        targetScale = 1.2
        targetPosition.y += Math.sin(state.clock.elapsedTime) * 0.1
        break

      case 1:
        targetPosition.set(-3, -1.5, 0)
        targetRotation.set(0, Math.PI / 0.3, 0)
        targetScale = 1.3
        break

      case 2:
        targetPosition.set(-6, -1, -5)
        targetRotation.set(0, Math.PI, 0)
        targetScale = 1.5
        break
    }

    // position
    group.current.position.lerp(targetPosition, delta * SPEED)

    // rotation (tight, no lag)
    group.current.rotation.x += (targetRotation.x - group.current.rotation.x) * delta * SPEED
    group.current.rotation.y += (targetRotation.y - group.current.rotation.y) * delta * SPEED
    group.current.rotation.z += (targetRotation.z - group.current.rotation.z) * delta * SPEED

    // scale
    const s = group.current.scale.x
    group.current.scale.setScalar(
      THREE.MathUtils.lerp(s, targetScale, delta * SPEED)
    )
  })

  return <group ref={group} />
}

useGLTF.preload('/models/laptop.glb')
