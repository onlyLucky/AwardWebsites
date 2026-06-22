import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ===== 圆环组件 =====
// 创建一个旋转的彩色圆环
function Ring({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  // 创建圆环几何体
  // 参数说明：
  // - radius: 圆环半径，控制圆环大小
  // - tube: 管道半径，控制圆环粗细
  // - radialSegments: 径向分段数，控制圆环平滑度
  // - tubularSegments: 管道分段数，控制圆环精度
  const geometry = useMemo(() => {
    return new THREE.TorusGeometry(radius, 0.02, 16, 100)
  }, [radius])

  // 创建材质
  // - color: 圆环颜色
  // - emissive: 自发光颜色，增加视觉效果
  // - emissiveIntensity: 自发光强度
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
    })
  }, [color])

  // 动画循环
  useFrame((state) => {
    if (meshRef.current) {
      // 绕 Z 轴旋转
      meshRef.current.rotation.z = state.clock.elapsedTime * speed
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} />
  )
}

// ===== 虚线圆环组件 =====
// 创建一个虚线圆环，用于装饰效果
function DashedRing({ radius, color }: { radius: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  // 创建虚线材质
  // - dashSize: 虚线长度
  // - gapSize: 间隔长度
  // - scale: 缩放比例
  const material = useMemo(() => {
    const mat = new THREE.LineDashedMaterial({
      color: color,
      dashSize: 0.1,
      gapSize: 0.05,
      transparent: true,
      opacity: 0.6,
    })
    return mat
  }, [color])

  // 创建圆形路径
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = []
    const segments = 64
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      ))
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    geo.computeBoundingSphere()
    return geo
  }, [radius])

  // 动画：反向旋转
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = -state.clock.elapsedTime * 0.2
    }
  })

  return (
    <line ref={meshRef as any} geometry={geometry} material={material} />
  )
}

// ===== 粒子系统组件 =====
// 创建围绕圆环旋转的粒子效果
function Particles({ count = 50, radius = 1.2 }: { count?: number; radius?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  // 创建粒子位置数据
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // 在圆环上随机分布粒子
      const angle = (i / count) * Math.PI * 2
      const r = radius + (Math.random() - 0.5) * 0.1

      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = Math.sin(angle) * r
      pos[i * 3 + 2] = 0

      // 随机颜色（红色到橙色渐变）
      col[i * 3] = 1 // R
      col[i * 3 + 1] = 0.3 + Math.random() * 0.3 // G
      col[i * 3 + 2] = 0 // B
    }

    return { positions: pos, colors: col }
  }, [count, radius])

  // 动画：粒子沿圆环运动
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// ===== 中心形状组件 =====
// 创建中心的抽象形状
function CenterShape() {
  const meshRef = useRef<THREE.Mesh>(null)

  // 动画：缓慢旋转和缩放
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.scale.set(scale, scale, 1)
    }
  })

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[0.5, 6]} />
      <meshBasicMaterial
        color="#ff4b4b"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ===== Hero 3D 动画主组件 =====
export default function HeroAnimation() {
  return (
    <div className="animejs-hero__animation">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* 彩色圆环组 */}
        <Ring radius={1} color="#ff4b4b" speed={0.5} />
        <Ring radius={1.1} color="#ff7d36" speed={-0.3} />
        <Ring radius={1.2} color="#00ffaa" speed={0.2} />

        {/* 虚线装饰圆环 */}
        <DashedRing radius={0.9} color="#ffffff" />
        <DashedRing radius={1.3} color="#ffffff" />

        {/* 中心形状 */}
        <CenterShape />

        {/* 粒子效果 */}
        <Particles count={60} radius={1.15} />
      </Canvas>
    </div>
  )
}
