import { render } from 'react-dom'
import { useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { useHelper, OrbitControls } from '@react-three/drei'
import '../styles.css'
import { folder, button, useControls } from 'leva'
import Point from '../point'
import * as literals from '../literals'
export default function CatmullRomCurve3() { //TODO ADD ability to add segments
  function copyComponent(Color, segment1, segment2, segment3) {
    console.log(`LineCurve2D: ${segment1} ${segment2} ${segment3}`)
    alert(literals.CatmullRomCurve({ Color, segment1, segment2, segment3 }))
  }
  const { Color, segment1, segment2, segment3, newSegment } = useControls({
    CatmullRomCurve3: folder({
      Color: {
        value: '#ff0000'
      },
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
    }, {collapsed: true}),
    'Copy Component': button(() => {
      copyComponent(Color, segment1, segment2, segment3)
    })
  })
  const meshRef = useRef()
  const geometryRef = useRef()
  const curves = [
    new THREE.Vector3(segment1[0], segment1[1], segment1.z),
    new THREE.Vector3(segment2[0], segment2[1], segment2.z),
    new THREE.Vector3(segment3[0], segment3[1], segment3.z)
  ]
  const curve = new THREE.CatmullRomCurve3(curves)
  const points = curve.getPoints(100)
  const [pointPosition, setPointPosition] = useState(() => new THREE.Vector3(segment1.z, segment1.z, segment1.z))
  useFrame(({ clock }) => {
    let point = points[Math.floor((clock.getElapsedTime() * 4) % 100)]
    let px = point.x
    let py = point.y
    let pz = point.z
    setPointPosition(() => new THREE.Vector3(px, py, pz))
  })
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color: Color })
  return (
    <>
      <mesh  ref={meshRef}>
        <line ref={geometryRef} geometry={geometry} material={material}></line>
      </mesh>
      <Point args={[0.05, 8]} position={pointPosition} />
    </>
  )
}
