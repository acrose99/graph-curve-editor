interface CatmullRomCurveProps {
  Color: string
  segment1: Record<string, unknown>
  segment2: Record<string, unknown>
  segment3: Record<string, unknown>
}
const CatmullRomCurve = ({ Color, segment1, segment2, segment3 }: CatmullRomCurveProps): string => {
  console.log(`CatmullRomCurve: ${Color}, ${segment1}, ${segment2}, ${segment3}`)
  return `const curves = [
        new THREE.Vector3(${segment1[0]}, ${segment1[1]}, ${segment1.z}),
        new THREE.Vector3(${segment2[0]}, ${segment2[1]}, ${segment2.z}),
        new THREE.Vector3(${segment3[0]}, ${segment3[1]}, ${segment3.z}),
    ]
    const curve = new THREE.CatmullRomCurve3(curves)
    const ref = useRef()
    const points = curve.getPoints(100)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: ${Color} })
    const CatmullRomCurve = useMemo(
        () => (
        <>
            <mesh ref={ref}>
            <line geometry={geometry} material={material}></line>
            </mesh>
        </>
        ),
        [geometry, material]
    )
    /*
        Render or add the CatmullRomCurve to the scene
    */
    `
}
interface CubicBezierCurve2DProps {
  Color: string
  z: number
  Startpoint: Record<string, unknown>
  controlPoint1: Record<string, unknown>
  controlPoint2: Record<string, unknown>
  Endpoint: Record<string, unknown>
}
const CubicBezierCurve2D = ({ Color, Startpoint, controlPoint1, controlPoint2, Endpoint }: CubicBezierCurve2DProps): string => {
  return `const curve = new useMemo(
        () => new THREE.CubicBezierCurve3(
            new THREE.Vector2(${Startpoint.x}, ${Startpoint.y}, // v1
            new THREE.Vector2(${controlPoint1.x}, ${controlPoint1.y}), // v2
            new THREE.Vector2(${controlPoint2.x}, ${controlPoint2.y}), // v3
            new THREE.Vector2(${Endpoint.x}, ${Endpoint.y}), // v4
        ),
        [curve],
    )
    const ref = useRef()
    const points = curve.getPoints(100)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: ${Color} })
    /*
        Render or add the CubicBezierCurve2D to the scene
    */
    `
}
interface CubicBezierCurve3DProps {
  Color: string
  startPoint: Record<string, unknown>
  midPointA: Record<string, unknown>
  midPointB: Record<string, unknown>
  endPoint: Record<string, unknown>
}
const CubicBezierCurve3D = ({ Color, startPoint, midPointA, midPointB, endPoint }: CubicBezierCurve3DProps): string => {
  console.log(`CubicBezierCurve3D: ${Color}, ${startPoint}, ${midPointA}, ${midPointB}, ${endPoint}`)
  console.log(startPoint)
  return `const curve = new useMemo(
        () => new THREE.CubicBezierCurve3(
            new THREE.Vector3(${startPoint[0]}, ${startPoint[1]}, ${startPoint.z}), // v1
            new THREE.Vector3(${midPointA[0]}, ${midPointA[1]}, ${midPointA.z}), // v2
            new THREE.Vector3(${midPointB[0]}, ${midPointB[1]}, ${midPointB.z}), // v3
            new THREE.Vector3(${endPoint[0]}, ${endPoint[1]}, ${endPoint.z}), // v4
        ),
        [curve],
    )
    const ref = useRef()
    const points = curve.getPoints(100)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: ${Color} })
    /*
        Render or add the CubicBezierCurve3D to the scene
    */
    `
}
interface ellipseCurveProps {
  Color: string
  z: number
  ax: number
  ay: number
  xRadius: number
  yRadius: number
  aStartAngle: number
  aEndAngle: number
  aClockwise: boolean
  aRotation: number
}
const ellipseCurve = ({ Color, z, ax, ay, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation }: ellipseCurveProps): string => {
  console.log(`ellipseCurve: ${Color}, ${z}, ${ax}, ${ay}, ${xRadius}, ${yRadius}, ${aStartAngle}, ${aEndAngle}, ${aClockwise}, ${aRotation}`)
  return `const curve = new THREE.EllipseCurve(
        ${ax}, // ax
        ${ay}, // ay
        ${xRadius}, // xRadius
        ${yRadius}, // yRadius
        ${aStartAngle}, // aStartAngle
        ${aEndAngle}, // aEndAngle
        ${aClockwise}, // aClockwise
        ${aRotation} // aRotation
    )
    const ref = useRef()
    const points = curve.getPoints(100)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: ${Color} })
    const ellipseCurve = useMemo(
        () => (
        <>
            <mesh position={[0,0,${z}]} ref={ref}>
            <line geometry={geometry} material={material}></line>
            </mesh>
        </>
        ),
        [geometry, material]
    )
    /* 
        Render or add the ellipseCurve to the scene
    */ 
    `
}

interface lineCurve2DProps {
  Color: string
  z: number
  v1: number
  v2: number
}
const lineCurve2D = ({ Color, z, v1, v2 }: lineCurve2DProps): string => {
  console.log(`lineCurve2D: ${Color}, ${z}, ${v1}, ${v2}`)
  return `const curve = new THREE.LineCurve(
        ${v1}, // v1
        ${v2}, // v2
    )
    const ref = useRef()
    const points = curve.getPoints(100)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: ${Color} })
    const lineCurve2D = useMemo(
        () => (
        <>
            <mesh position={[0,0,${z}]} ref={ref}>
            <line geometry={geometry} material={material}></line>
            </mesh>
        </>
        ),
        [geometry, material]
    )
    /*
        Render or add the lineCurve2D to the scene
    */
    `
}
interface lineCurve3DProps {
    Color: string
    v1: number,
    v2: number,
    z: number
}
const lineCurve3D = ({ Color, v1, v2, z }: lineCurve3DProps): string => {
  return `const curve = new THREE.LineCurve3(
      new THREE.Vector3(${v2}, ${v2}, ${z}), // v1
    )
    const ref = useRef()
    const points = curve.getPoints(100)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: ${Color} })
    const lineCurve3D = useMemo(
        () => (
        <>
            <mesh position={[0,0,${z}]} ref={ref}>
            <line geometry={geometry} material={material}></line>
            </mesh>
        </>
        ),
        [geometry, material]
    )
    /*
        Render or add the lineCurve3D to the scene
    */
    `
}

interface quadraticBezierCurve2DProps {
  Color: string
  z: number
  startPoint: Record<string, unknown>
  midPoint: Record<string, unknown>
  endPoint: Record<string, unknown>
}
const quadraticBezierCurve2D = ({ Color, z, startPoint, midPoint, endPoint }: quadraticBezierCurve2DProps): string => {
    console.log(`quadraticBezierCurve2D: ${Color}, ${z}, ${startPoint}, ${midPoint}, ${endPoint}`)
    return `const curve = new THREE.QuadraticBezierCurve(
        new THREE.Vector2(${startPoint.x}, ${startPoint.y}), // v0
        new THREE.Vector2(${midPoint.x}, ${midPoint.y}), // v1
        new THREE.Vector2(${endPoint.x}, ${endPoint.y}), // v2
    )
    const ref = useRef()
    const points = curve.getPoints(100)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: ${Color} })
    const quadraticBezierCurve2D = useMemo(
        () => (
        <>
            <mesh position={[0,0,${z}]} ref={ref}>
            <line geometry={geometry} material={material}></line>
            </mesh>
        </>
        ),
        [geometry, material]
    )
    /*
        Render or add the quadraticBezierCurve2D to the scene
    */
    `   
}

interface quadraticBezierCurve3DProps {
  Color: string
  startPoint: Record<string, unknown>
  midPoint: Record<string, unknown>
  endPoint: Record<string, unknown>
}
const quadraticBezierCurve3D = ({ Color, startPoint, midPoint, endPoint }: quadraticBezierCurve3DProps): string => {
    console.log(`quadraticBezierCurve3D: ${Color}, ${startPoint}, ${midPoint}, ${endPoint}`)
    return `const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector2([${startPoint.x}], ${startPoint.y}), // v0
        new THREE.Vector2([${midPoint.x}], ${midPoint.y}), // v1
        new THREE.Vector2([${endPoint.x}], ${endPoint.y}), // v2
    )
    const ref = useRef()
    const points = curve.getPoints(100)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: ${Color} })
    const quadraticBezierCurve3D = useMemo(
        () => (
        <>
            <mesh position={[0,0,0]} ref={ref}>
            <line geometry={geometry} material={material}></line>
            </mesh>
        </>
        ),
        [geometry, material]
    )
    /*
        Render or add the quadraticBezierCurve3D to the scene
    */
    `
}
interface splineCurveProps {
    Color: string
    z: number
    segment1: Record<string, unknown>
    segment2: Record<string, unknown>
    segment3: Record<string, unknown>
}
const splineCurve = ({ Color, z, segment1, segment2, segment3 }: splineCurveProps): string => {
    console.log(`splineCurve: ${Color}, ${z}, ${segment1}, ${segment2}, ${segment3}`)
    return `const curves = [
        new THREE.vector2(${segment1[0]}, ${segment1[0]}), // v0
        new THREE.vector2(${segment1[1]}, ${segment1[1]}), // v1
        new THREE.vector2(${segment2[0]}, ${segment2[0]}), // v2
    ]
    const curve = new THREE.SplineCurve(curves)
    const ref = useRef()
    const points = curve.getPoints(100)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: ${Color} })
    const splineCurve = useMemo(
        () => (
        <>
            <mesh position={[0,0,${z}]} ref={ref}>
            <line geometry={geometry} material={material}></line>
            </mesh>
        </>
        ),
        [geometry, material]
    )
    /*
        Render or add the splineCurve to the scene
    */
    `
}
export { ellipseCurve, CatmullRomCurve, lineCurve2D, lineCurve3D, CubicBezierCurve2D, CubicBezierCurve3D, quadraticBezierCurve2D, quadraticBezierCurve3D, splineCurve }
