import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { useMouse } from '../shared/mouse-provider'
import * as THREE from 'three'

// Draco 解码器路径
const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/'

function ComputerModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { getMouseOffset } = useMouse()

  // 加载 Draco 压缩的 GLB 模型
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath(DRACO_DECODER_PATH)

  const gltf = useLoader(GLTFLoader, '/src/demos/shader-se/models/computer.glb', (loader) => {
    loader.setDRACOLoader(dracoLoader)
  })

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
      <primitive object={gltf.scene} />
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
