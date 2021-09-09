import { render } from 'react-dom'
import { useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { useHelper, OrbitControls } from '@react-three/drei'
import '../styles.css'
import { folder, button, useControls } from 'leva'
import Point from '../point'

export default function CubicBezierCurve() {
  const curve = useControls({
    'Curve Segments': folder({
      Startpoint: {
        x: -1,
        y: 1
      },
      'Control Point 1': {
        x: 0,
        y: 0
      },
      'Control Point 2': {
        x: 1,
        y: -1
      },
      Endpoint: {
        x: 1,
        y : 1
      }
    })
  })
  const ref = useRef()
  const curveCubic = useMemo(() => new THREE.CubicBezierCurve(new THREE.Vector2(curve['Startpoint'].x, curve['Startpoint'].y), new THREE.Vector2(curve['Control Point 1'].x, curve['Control Point 1'].y), new THREE.Vector2(curve['Control Point 2'].x, curve['Control Point 2'].y), new THREE.Vector2(curve['Endpoint'].x, curve['Endpoint'].y)), [curve])
  const points = curveCubic.getPoints(100)
  console.log(points)
  const [pointPosition, setPointPosition] = useState(() => new THREE.Vector3(curve['Startpoint'].x, curve['Startpoint'].y, 0))
  useFrame(({ clock }) => {
    let point = points[Math.floor((clock.getElapsedTime() * 4) % 100)]
    let px = point.x
    let py = point.y
    setPointPosition(() => new THREE.Vector3(px, py, 0))
  })
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color: 'black' })

  return (
    <>
      <mesh ref={ref}>
        <line geometry={geometry} material={material}></line>
      </mesh>
      <Point args={[.05, 8]} position={pointPosition} />
    </>
  )
}
