import { render } from 'react-dom'
import { useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { useHelper, OrbitControls } from '@react-three/drei'
import '../styles.css'
import { folder, button, useControls } from 'leva'
import Point from '../point'
export default function EllipseCurve(props) {
  //TODO: Add notice about ArcCurve
  const { Color, z, ax, ay, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation } = useControls({
    EllipseCurve: folder({
      Color: {
        value: '#ff0000'
      },
      z: {
        value: 0
      },
      ax: {
        value: 0,
        step: 1
      }, // x position of the center of the circle
      ay: {
        value: 0,
        step: 1
      }, // y position of the center of the circle
      xRadius: {
        value: 1,
        step: 1
      }, // x radius of the circle
      yRadius: {
        value: 1,
        step: 1
      }, // y radius of the circle
      aStartAngle: {
        value: 0,
        step: Math.PI * 0.25
      }, // start angle of the curve in radians
      aEndAngle: {
        value: Math.PI * 2,
        step: Math.PI * 0.25
      }, // end angle of the curve in radians
      aClockwise: false, // whether the curve should be drawn clockwise
      aRotation: {
        value: 0,
        step: Math.PI * 0.25
      } // rotation angle of the curve in radians
    }, {collapsed: true })
  })
  const curve = new THREE.EllipseCurve(
    ax,
    ay, // ax, aY
    xRadius,
    yRadius, // xRadius, yRadius
    aStartAngle,
    aEndAngle, // aStartAngle, aEndAngle
    aClockwise, // aClockwise
    aRotation // aRotation
  )
  const ref = useRef()
  const points = curve.getPoints(100)
  const [pointPosition, setPointPosition] = useState(() => new THREE.Vector3(ax, ay, z))
  useFrame(({ clock }) => {
    let point = points[Math.floor((clock.getElapsedTime() * 4) % 100)]
    let px = point.x
    let py = point.y
    setPointPosition(() => new THREE.Vector3(px, py, z))
  })
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  // eslint-disable-next-line react/prop-types
  const material = new THREE.LineBasicMaterial({ color: Color })
  const ellipseCurve = useMemo(
    () => (
      <>
        <mesh position={[0,0,z]} ref={ref}>
          <line geometry={geometry} material={material}></line>
        </mesh>
      </>
    ),
    [geometry, material]
  )
  return (
    <>
      {ellipseCurve}
      <Point args={[.1, 8]} position={pointPosition} />
    </>
  )
}
