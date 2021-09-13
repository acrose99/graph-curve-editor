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
export default function SplineCurve() { //TODO add a way to add points
  function copyComponent(Color, z, segment1, segment2, segment3) {
    alert(literals.splineCurve({Color, z, segment1, segment2, segment3}))
  }
  const { Color, z, segment1, segment2, segment3, newSegment } = useControls({
    SplineCurve: folder(
      {
        Color: {
          value: '#ff0000'
        },
        z: {
          value: 0
        },
        segment1: {
          0: -1,
          1: 1
        },
        segment2: {
          0: 0,
          1: 0
        },
        segment3: {
          0: 1,
          1: 1
        }
        // newSegment: {
        //   0: 5,
        //   1: 5
        // },
        // addSegment: button(() => {
        //   addCurve(new THREE.Vector2(newSegment[0], newSegment[1]))
        // })
      },
      { collapsed: true }
    ),
    'Copy Component': button(() => {
      copyComponent(Color, z, segment1, segment2, segment3)
    })
  })
  const meshRef = useRef()
  const geometryRef = useRef()
  const curves = [new THREE.Vector2(segment1[0], segment1[1]), new THREE.Vector2(segment2[0], segment2[1]), new THREE.Vector2(segment3[0], segment3[1])]
  function addCurve(curve) {
    curves.push(curve)
    geometryRef.points = curves
  }
  const curve = new THREE.SplineCurve(curves)
  const points = curve.getPoints(100)
  const [pointPosition, setPointPosition] = useState(() => new THREE.Vector3(segment1[0], segment1[1], z))
  useFrame(({ clock }) => {
    let point = points[Math.floor((clock.getElapsedTime() * 4) % 100)]
    let px = point.x
    let py = point.y
    setPointPosition(() => new THREE.Vector3(px, py, z))
  })
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color: Color })
  return (
    <>
      <mesh position={[0,0,z]} ref={meshRef}>
        <line ref={geometryRef} geometry={geometry} material={material}></line>
      </mesh>
      <Point args={[0.05, 8]} position={pointPosition} />
    </>
  )
}
