import { render } from 'react-dom'
import { useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { useHelper, OrbitControls } from '@react-three/drei'
import '../styles.css'
import { folder, button, useControls } from 'leva'
import Point from '../point'
export default function CatmullRomCurve3() {
  const { segment1, segment2, segment3, newSegment } = useControls({
    CatmullRomCurve3: folder({
      segment1: {
        0: -1,
        1: 1,
        z: 0
      },
      segment2: {
        0: 0,
        1: 0,
        z: 0
      },
      segment3: {
        0: 1,
        1: 1,
        z: 0
      }
    })
  })
  const meshRef = useRef()
  const geometryRef = useRef()
  const curves = [
    new THREE.Vector3(segment1[0], segment1[1], segment1.z),
    new THREE.Vector3(segment2[0], segment2[1], segment2.z),
    new THREE.Vector3(segment3[0], segment3[1], segment3.z)
  ]
  const curve = new THREE.SplineCurve(curves)
  const points = curve.getPoints(100)
  const [pointPosition, setPointPosition] = useState(() => new THREE.Vector3(segment1[0], segment1[1], 0))
  useFrame(({ clock }) => {
    let point = points[Math.floor((clock.getElapsedTime() * 4) % 100)]
    let px = point.x
    let py = point.y
    let pz = point.z
    setPointPosition(() => new THREE.Vector3(px, py, pz))
  })
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
  return (
    <>
      <mesh ref={meshRef}>
        <line ref={geometryRef} geometry={geometry} material={material}></line>
      </mesh>
      <Point args={[0.05, 8]} position={pointPosition} />
      <axesHelper scale={20} position={[-10, -10, 0]} /> {/* <-- TODO: Adjust based on position */}
    </>
  )
}
