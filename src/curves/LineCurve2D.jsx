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
  const { Color, z, v1, v2 } = useControls({
    LineCurve2D: folder({
      Color: {
        value: '#ff0000'
      },
      z : {
        value: 0,
        step: 1
      },
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
  const [pointPosition, setPointPosition] = useState(() => new THREE.Vector3(v1, v2, z))
  useFrame(({ clock }) => {
    let point = points[Math.floor((clock.getElapsedTime() * 4) % 100)]
    let px = point.x
    let py = point.y
    setPointPosition(new THREE.Vector3(px, py, z))
  })
  const points = curve.getPoints(100)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color: Color })
  const ref = useRef()
  return (
    <mesh>
      <lineLoop position={[0,0,z]} ref={ref} geometry={geometry} material={material}></lineLoop>
      <Point args={[0.05, 8]} position={pointPosition} />
    </mesh>
  )
}
