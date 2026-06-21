import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { usePagesStore } from '../../store/usePagesStore'
import { useMousePosition } from '../../hooks/useMousePosition'

// 模型路径
const COMPUTER_MODEL = new URL('@/assets/shader-se/models/computer.glb', import.meta.url).href

// 预加载模型
useGLTF.preload(COMPUTER_MODEL)

export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useMousePosition()
  const scrollProgress = usePagesStore((state) => state.sectionProgress.home)

  // 加载 3D 模型
  const { scene: computerModel } = useGLTF(COMPUTER_MODEL)

  // 克隆模型以避免共享状态
  const computerClone = useMemo(() => {
    const clone = computerModel.clone(true)
    // 设置材质
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: 0x333333,
          metalness: 0.8,
          roughness: 0.2,
          clearcoat: 0.5,
          clearcoatRoughness: 0.3,
        })
      }
    })
    return clone
  }, [computerModel])

  // 动画循环
  useFrame((state) => {
    if (!groupRef.current) return

    const { normalizedX, normalizedY } = mouseRef.current

    // 鼠标跟随效果（平滑插值）
    const targetX = normalizedX * 0.5
    const targetY = normalizedY * 0.3

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX,
      0.05
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetY,
      0.05
    )

    // 滚动驱动动画
    const scrollOffset = scrollProgress * 2
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -scrollOffset,
      0.1
    )

    // 轻微浮动动画
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.02
  })

  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4488ff" />

      {/* 环境贴图 */}
      <Environment preset="city" />

      {/* 电脑模型 */}
      <group ref={groupRef} position={[0, 0, 0]} scale={1.5}>
        <primitive object={computerClone} />
      </group>

      {/* 粒子效果 */}
      <Particles />
    </>
  )
}

// 简单粒子系统
function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 500

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}
