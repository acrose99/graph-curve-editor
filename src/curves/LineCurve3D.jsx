import { render } from 'react-dom'
import { useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { useHelper, OrbitControls } from '@react-three/drei'
import '../styles.css'
import { folder, button, useControls } from 'leva'
import Point from '../point'
export default function LineCurve3D() {
  const { v1, v2, z } = useControls({
    LineCurve3D: folder({
      v1: {
        value: 0,
        step: 0.5
      }, // start point of the curve
      v2: {
        value: 1,
        step: 0.5
      }, // end point of the curve
      z: {
        value: 0,
        step: 0.5
      } // z position of the curve
    })
  })
  const ref = useRef()
  const curve = new THREE.LineCurve3(new THREE.Vector3(v1, v2, z))
  let points = curve.getPoints(100)
  // console.log(points)
  const [pointPosition, setPointPosition] = useState(() => new THREE.Vector3(v1, v2, z))
  useFrame(({ clock }) => {
    let point = points[Math.floor((clock.getElapsedTime() * 4) % 100)]
    let px = point.x
    let py = point.y
    let pz = point.z
    setPointPosition(() => new THREE.Vector3(px, py, pz))
  })
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color: 'black' })
  return (
    <>
      <mesh ref={ref}>
        <line geometry={geometry} material={material}></line>
        <axesHelper scale={20} position={[-10, -10, 0]} /> {/* <-- TODO: Adjust based on position */}
      </mesh>
      <Point args={[.05, 8]} position={pointPosition} />
      <OrbitControls />
    </>
  )
}