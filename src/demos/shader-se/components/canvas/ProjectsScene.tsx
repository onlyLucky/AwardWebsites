import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { usePagesStore } from '../../store/usePagesStore'
import { useMousePosition } from '../../hooks/useMousePosition'

// 模型路径
const TROPHY_MODEL = new URL('@/assets/shader-se/models/trophy2.glb', import.meta.url).href
const SHREDDER_MODEL = new URL('@/assets/shader-se/models/shredder.glb', import.meta.url).href

// 预加载模型
useGLTF.preload(TROPHY_MODEL)
useGLTF.preload(SHREDDER_MODEL)

export function ProjectsScene() {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useMousePosition()
  const scrollProgress = usePagesStore((state) => state.sectionProgress['selected-work'])

  // 加载 3D 模型
  const { scene: trophyModel } = useGLTF(TROPHY_MODEL)
  const { scene: shredderModel } = useGLTF(SHREDDER_MODEL)

  // 克隆模型
  const trophyClone = useMemo(() => {
    const clone = trophyModel.clone(true)
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: 0xffd700,
          metalness: 1,
          roughness: 0.2,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
        })
      }
    })
    return clone
  }, [trophyModel])

  const shredderClone = useMemo(() => {
    const clone = shredderModel.clone(true)
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x666666,
          metalness: 0.9,
          roughness: 0.3,
        })
      }
    })
    return clone
  }, [shredderModel])

  // 动画循环
  useFrame((state) => {
    if (!groupRef.current) return

    const { normalizedX } = mouseRef.current

    // 鼠标跟随效果
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      normalizedX * 0.3,
      0.05
    )

    // 滚动驱动旋转
    groupRef.current.rotation.z = scrollProgress * Math.PI * 0.1

    // 浮动动画
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })

  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <spotLight position={[-5, 10, 5]} intensity={0.8} angle={0.3} penumbra={0.5} color="#ff8844" />

      {/* 环境贴图 */}
      <Environment preset="studio" />

      {/* 场景组 */}
      <group ref={groupRef}>
        {/* 奖杯 */}
        <group position={[-2, 0, 0]} scale={0.8}>
          <primitive object={trophyClone} />
        </group>

        {/* 碎纸机 */}
        <group position={[2, -0.5, 0]} scale={0.6}>
          <primitive object={shredderClone} />
        </group>
      </group>

      {/* 地面反射 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>
    </>
  )
}
