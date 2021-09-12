import { render } from 'react-dom'
import { useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { useHelper, OrbitControls, CubicBezierLine } from '@react-three/drei'
import '../styles.css'
import { folder, button, useControls } from 'leva'
import Point from '../point'
function CubicBezierCurve3D() { //todo UNDO DREI 
  const {Color, startPoint, midPointA, midPointB, endPoint } = useControls({
    'Curve Segments': folder({
      Color: {
        value: '#ff0000'
      },
      startPoint: {
        0: -1,
        1: 1,
        z: 0
      },
      midPointA: {
        0: 0,
        1: 0,
        z: 0
      },
      midPointB: {
        0: 1,
        1: 1,
        z: 0
      },
      endPoint: {
        0: 1,
        1: 1,
        z: 0
      }
    })
  })
  const ref = useRef()
  const Curve = useMemo(
    () => (
      <CubicBezierLine
        start={[startPoint[0], startPoint[1], startPoint.z]}
        midA={[midPointA[0], midPointA[1], midPointA.z]}
        midB={[midPointB[0], midPointB[1], midPointB.z]}
        end={[endPoint[0], endPoint[1], endPoint.z]}
        color={Color}
        ref={ref}
      />
    ),
    [startPoint, midPointA, midPointB, endPoint, Color]
  )
  return (
    <>
      {Curve}
    </>
  )
}
export default CubicBezierCurve3D
