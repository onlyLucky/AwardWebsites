import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { usePagesStore } from '../../store/usePagesStore'
import { useMousePosition } from '../../hooks/useMousePosition'

// 模型路径
const PHONES_MODEL = new URL('@/assets/shader-se/models/phones.glb', import.meta.url).href

// 预加载模型
useGLTF.preload(PHONES_MODEL)

export function ContactScene() {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useMousePosition()
  const scrollProgress = usePagesStore((state) => state.sectionProgress.contact)

  // 加载 3D 模型
  const { scene: phonesModel } = useGLTF(PHONES_MODEL)

  // 克隆模型
  const phonesClone = useMemo(() => {
    const clone = phonesModel.clone(true)
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: 0x222222,
          metalness: 0.9,
          roughness: 0.1,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
        })
      }
    })
    return clone
  }, [phonesModel])

  // 动画循环
  useFrame((state) => {
    if (!groupRef.current) return

    const { normalizedX } = mouseRef.current

    // 鼠标跟随效果
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      normalizedX * 0.25,
      0.04
    )

    // 滚动驱动旋转
    groupRef.current.rotation.x = scrollProgress * 0.3

    // 浮动动画
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08
  })

  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 2, -5]} intensity={0.6} color="#4488ff" />
      <pointLight position={[3, -1, 2]} intensity={0.3} color="#ff4488" />

      {/* 环境贴图 */}
      <Environment preset="night" />

      {/* 电话模型 */}
      <group ref={groupRef} position={[0, 0, 0]} scale={0.8}>
        <primitive object={phonesClone} />
      </group>

      {/* 网格地面 */}
      <gridHelper args={[20, 40, '#333333', '#222222']} position={[0, -2, 0]} />

      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>
    </>
  )
}
