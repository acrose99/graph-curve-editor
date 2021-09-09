import { render } from 'react-dom'
import { useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { useHelper, OrbitControls } from '@react-three/drei'
import '../styles.css'
import { folder, button, useControls } from 'leva'
import Point from '../point'

export default function LineCurve2D() {
  const { v1, v2 } = useControls({
    LineCurve2D: folder({
      v1: {
        value: 0,
        step: 0.5
      }, // start point of the curve
      v2: {
        value: 1,
        step: 0.5
      } // end point of the curve
    })
  })
  const curve = new THREE.LineCurve(new THREE.Vector2(v1, v2))
  const [pointPosition, setPointPosition] = useState(() => new THREE.Vector3(v1, v2, 0))
  useFrame(({ clock }) => {
    setPointPosition((ref.current.position.x += 0.01 * clock.getDelta(1)), (ref.current.position.y -= 0.01 * clock.getDelta(1)), 0)
  })
  const points = curve.getPoints(50)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color: 'black' })
  const ref = useRef()
  return (
    <mesh>
      <line ref={ref} geometry={geometry} material={material}></line>
      <Point args={[.05, 8]} position={pointPosition}  />
    </mesh>
  )
}
