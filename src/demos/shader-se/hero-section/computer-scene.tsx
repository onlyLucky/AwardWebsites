import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useMouse } from '../shared/mouse-provider'
import * as THREE from 'three'

// 使用 drei 的 useGLTF hook（自动处理 Draco 解码器）
function ComputerModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { getMouseOffset } = useMouse()

  // 使用 useGLTF 加载模型（drei 内置 Draco 支持）
  const { scene } = useGLTF('/models/shader-se/computer.glb')

  // 鼠标跟随动画
  useFrame(() => {
    if (groupRef.current) {
      const mouseOffset = getMouseOffset()
      // 缓慢的鼠标跟随旋转
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseOffset.x * 0.15,
        0.05
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseOffset.y * 0.08,
        0.05
      )
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

// 加载占位符
function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#333" wireframe />
    </mesh>
  )
}

function ComputerScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      {/* 光照 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 3, 2]} intensity={0.5} color="#4488ff" />

      {/* 3D 模型 */}
      <Suspense fallback={<Loader />}>
        <ComputerModel />
      </Suspense>
    </Canvas>
  )
}

export default ComputerScene
