// function undepth(obj) {
//   obj.material.depthWrite = false
// }
import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { folder, button, useControls } from 'leva'

function DebugGrid() {
  const { rotateY } = useControls({ rotateY: { value: 0, step: 1 } })
  let grid = useRef(null)
  const set = useThree((state) => state.set)
  const get = useThree((state) => state.get)
  // let gridHelper = useThree((state) => state.scene.children[0])
  // console.log(gridHelper)
  // set(() => {gridHelper.rotation.x = Math.PI / 2})
  useEffect(() => {
    let gridHelper = get().scene.children[0]
    console.log(gridHelper)
    set(() => {
      gridHelper.rotation.x = Math.PI / 2
    })
  }, [])

  return (
    <group>
      <gridHelper ref={grid} args={[10, 10, '#17141F', '#060606']} />
      {/* <gridHelper ref={undepth} renderOrder={9001} color="red" args={[100, 100, '#fff', '#17141F']} scale={10} /> */}
    </group>
  )
}

export default DebugGrid
