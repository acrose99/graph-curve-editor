// function undepth(obj) {
//   obj.material.depthWrite = false
// }
import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { folder, button, useControls } from 'leva'

function AxesHelper() {
  const axesControls = useControls({
    'Axes Helper': folder(
      {
        'Axes Visible': true,
        'Axes Scale': 2,
        'Axes Position': [0, 0, .5]
      },
      { collapsed: true }
    )
  })
  let axes = useRef(null)
  return (
    <axesHelper
      ref={axes}
      visible={axesControls['Axes Visible']}
      scale={axesControls['Axes Scale']}
      position={axesControls['Axes Position']}
      name="AxesHelper"></axesHelper>
  )
}

export default AxesHelper
