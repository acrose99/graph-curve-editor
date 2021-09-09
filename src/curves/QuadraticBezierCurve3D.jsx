import { render } from 'react-dom'
import { useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import * as meshline from 'threejs-meshline'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { useHelper, OrbitControls, QuadraticBezierLine } from '@react-three/drei'
import '../styles.css'
import { folder, button, useControls } from 'leva'
import Point from '../point'
export default function QuadraticBezierCurve() {
  const {startPoint, midPoint, endPoint } = useControls({
    QuadraticBezierCurve: folder({
      startPoint: {
        x: -1,
        y: 1,
        z: 0
      },
      midPoint: {
        x: 0,
        y: 0,
        z: 0
      },
      endPoint: {
        x: 1,
        y: 1,
        z: 0
      }
    })
  })
  let curve = useMemo(
    () => (
      <QuadraticBezierLine
        start={[startPoint.x, startPoint.y, startPoint.z]}
        mid={[midPoint.x, midPoint.y, midPoint.z]}
        end={[endPoint.x, endPoint.y, endPoint.z]}
        color="black"
      />
    ),
    [startPoint, midPoint, endPoint]
  )
  return <>{curve}</>
}
