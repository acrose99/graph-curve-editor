import { render } from 'react-dom'
import { useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { useHelper, OrbitControls } from '@react-three/drei'
import '../styles.css'
import { folder, button, useControls } from 'leva'
import Point from '../point'
export default function QuadraticBezierCurve3() {
  const {startPoint, midPoint, endPoint} = useControls({
    QuadraticBezierCurve: folder({
      startPoint: {
        x: -1,
        y: 1,
      },
      midPoint: {
        x: 0,
        y: 0,
      },
      endPoint: {
        x: 1,
        y: 1,
      }
    })
  })
  const ref = useRef()
  const curve = new THREE.QuadraticBezierCurve(new THREE.Vector2(startPoint.x, startPoint.y), new THREE.Vector2(midPoint.x, midPoint.y), new THREE.Vector2(endPoint.x, endPoint.y))
  const points = curve.getPoints(100)
  console.log(points)
  const [pointPosition, setPointPosition] = useState(() => new THREE.Vector3(startPoint.x, startPoint.y, 0))
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