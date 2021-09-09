/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from'react'
import {useLoader, useFrame, useThree, Canvas} from '@react-three/fiber'
import { useHelper, useAspect, useProgress, useTexture  } from '@react-three/drei'
import { DoubleSide } from 'three'

function Point(props, ref) {
     return (
       // eslint-disable-next-line react/prop-types
       <>
         <mesh position={props.position}>
           <meshBasicMaterial attach="material" color="red" side={DoubleSide} />
           <circleGeometry attach="geometry" args={props.args} />
         </mesh>
       </>
     )
}

 export default Point