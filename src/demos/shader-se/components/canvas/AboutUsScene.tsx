import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { usePagesStore } from '../../store/usePagesStore'
import { useMousePosition } from '../../hooks/useMousePosition'

// 模型路径
const DESKBOX_MODEL = new URL('@/assets/shader-se/models/deskbox.glb', import.meta.url).href

// 预加载模型
useGLTF.preload(DESKBOX_MODEL)

export function AboutUsScene() {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useMousePosition()
  const scrollProgress = usePagesStore((state) => state.sectionProgress.about)

  // 加载 3D 模型
  const { scene: deskboxModel } = useGLTF(DESKBOX_MODEL)

  // 克隆模型
  const deskboxClone = useMemo(() => {
    const clone = deskboxModel.clone(true)
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: 0x8b4513,
          metalness: 0.1,
          roughness: 0.8,
          clearcoat: 0.3,
        })
      }
    })
    return clone
  }, [deskboxModel])

  // 动画循环
  useFrame((state) => {
    if (!groupRef.current) return

    const { normalizedX } = mouseRef.current

    // 鼠标跟随效果
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      normalizedX * 0.2,
      0.03
    )

    // 滚动驱动位置
    groupRef.current.position.z = scrollProgress * -2

    // 浮动动画
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02
  })

  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={0.8} castShadow />
      <pointLight position={[-3, 3, -2]} intensity={0.4} color="#ffaa44" />

      {/* 环境贴图 */}
      <Environment preset="apartment" />

      {/* 办公桌模型 */}
      <group ref={groupRef} position={[0, -0.5, 0]} scale={1.2}>
        <primitive object={deskboxClone} />
      </group>

      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </>
  )
}
