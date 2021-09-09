import { render } from 'react-dom'
import { useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { useHelper, OrbitControls } from '@react-three/drei'
import './styles.css'
import { folder, button, useControls } from 'leva'
import CatmullRomCurve3 from './curves/CatmullRomCurve3'
import CubicBezierCurve from './curves/CubicBezierCurve'
import CubicBezierCurve3D from './curves/CubicBezierCurve3D'
import EllipseCurve from './curves/EllipseCurve'
import LineCurve2D from './curves/LineCurve2D'
import LineCurve3D from './curves/LineCurve3D'
import QuadraticBezierCurve from './curves/QuadraticBezierCurve'
import QuadraticBezierCurve3D from './curves/QuadraticBezierCurve3D'
import SplineCurve from './curves/SplineCurve'




//TOD Redo with DREI LINES 
function Curves() {
  //use leva toChange in order to save the state of the curve
  const curve = {
    options: {
      'Ellipse Curve': <EllipseCurve />,
      'Line Curve': <LineCurve2D />,
      'Line Curve 3D': <LineCurve3D />,
      'Spline Curve': <SplineCurve />,
      'Catmull Rom Curve 3D': <CatmullRomCurve3 />,
      'Cubic Bezier Curve': <CubicBezierCurve />,
      'Cubic Bezier Curve 3D': <CubicBezierCurve3D />,
      'Quadratic Bezier Curve': <QuadraticBezierCurve />,
      'Quadratic Bezier Curve 3D': <QuadraticBezierCurve3D />,
      None: null
    }
  }
  const [n, setN] = useState(1)
  const inputs = Array(n)
    .fill(0)
    .reduce((acc, _, i) => Object.assign(acc, { [`Curve${i}`]: curve }), {})
  // const values = useControls(inputs, [n])
  function changeN(n) {
    setN(n)
    console.log(n)
  }
  const { defaultCurve } = useControls({
    // addCurve: button(() => changeN((n) => n + 1)),
    defaultCurve: {
      options: {
        'Ellipse Curve': <EllipseCurve />,
        'Line Curve': <LineCurve2D />,
        'Line Curve 3D': <LineCurve3D />,
        'Spline Curve': <SplineCurve />,
        'Catmull Rom Curve 3D': <CatmullRomCurve3 />,
        'Cubic Bezier Curve': <CubicBezierCurve />,
        'Cubic Bezier Curve 3D': <CubicBezierCurve3D />,
        'Quadratic Bezier Curve': <QuadraticBezierCurve />,
        'Quadratic Bezier Curve 3D': <QuadraticBezierCurve3D />,
        None: null
      }
    }
    // Curve2: {
    //   options: {
    //     None: null,
    //     'Ellipse Curve': <EllipseCurve />,
    //     'Line Curve': <LineCurve2D />,
    //     'Line Curve 3D': <LineCurve3D />,
    //     'Spline Curve': <SplineCurve />
    //   }
    // }
  })
  // console.log(values.Curve0)
  // console.log(values)
  // for (let i = 0; i < values.length; i++) {
  //   console.log(values[`Curve${i}`])
  // }
  return (
    <>
      {defaultCurve}
      {/* {values.Curve0} */}
    </>
  )
}
function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Curves />
      <OrbitControls />
      <axesHelper scale={2} position={[1, -2, 0]} /> {/* <-- TODO: Adjust based on position */}
    </Canvas>
  )
}

render(<App />, document.querySelector('#root'))