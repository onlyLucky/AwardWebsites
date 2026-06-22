import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ===== 旋转方块组件 =====
// 用于 Intuitive API 特性的演示
function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff4b4b" />
    </mesh>
  )
}

// ===== 变换球体组件 =====
// 用于 Enhanced transforms 特性的演示
function TransformSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime
      // 沿圆形路径移动
      meshRef.current.position.x = Math.sin(t * 0.8) * 1.5
      meshRef.current.position.y = Math.cos(t * 0.8) * 1.5
      // 旋转
      meshRef.current.rotation.z = t
      // 缩放
      const scale = 0.5 + Math.sin(t * 2) * 0.2
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#ff7d36" />
    </mesh>
  )
}

// ===== 滚动波形组件 =====
// 用于 Scroll Observer 特性的演示
function ScrollWave() {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, count } = useMemo(() => {
    const count = 100
    const positions = new Float32Array(count * 3)
    return { positions, count }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      const t = state.clock.elapsedTime

      for (let i = 0; i < count; i++) {
        const x = (i / count - 0.5) * 4
        const y = Math.sin((i / count) * Math.PI * 4 + t * 2) * 0.5
        const z = Math.cos((i / count) * Math.PI * 4 + t * 2) * 0.3

        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
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
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#00ffaa" />
    </points>
  )
}

// ===== 网格点组件 =====
// 用于 Advanced staggering 特性的演示
function GridDots() {
  const groupRef = useRef<THREE.Group>(null)

  const dots = useMemo(() => {
    const result: { x: number; y: number; delay: number }[] = []
    const gridSize = 5
    const spacing = 0.4

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - gridSize / 2 + 0.5) * spacing
        const y = (j - gridSize / 2 + 0.5) * spacing
        const delay = Math.sqrt(Math.pow(i - gridSize / 2, 2) + Math.pow(j - gridSize / 2, 2)) * 0.3
        result.push({ x, y, delay })
      }
    }

    return result
  }, [])

  return (
    <group ref={groupRef}>
      {dots.map((dot, index) => (
        <DotItem key={index} x={dot.x} y={dot.y} delay={dot.delay} />
      ))}
    </group>
  )
}

// ===== 单个点组件 =====
function DotItem({ x, y, delay }: { x: number; y: number; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime
      const scale = 0.5 + Math.sin(t * 2 - delay) * 0.5
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <mesh ref={meshRef} position={[x, y, 0]}>
      <circleGeometry args={[0.08, 16]} />
      <meshBasicMaterial color="#f9f640" side={THREE.DoubleSide} />
    </mesh>
  )
}

// ===== SVG 路径组件 =====
// 用于 SVG toolset 特性的演示
function SVGPath() {
  const lineRef = useRef<THREE.Line>(null)

  const { geometry, totalPoints } = useMemo(() => {
    // 创建曲线路径
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-1.5, -0.5, 0),
      new THREE.Vector3(-0.5, 1, 0),
      new THREE.Vector3(0.5, -1, 0),
      new THREE.Vector3(1.5, 0.5, 0)
    )

    const points = curve.getPoints(50)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    return { geometry, totalPoints: 50 }
  }, [])

  useFrame((state) => {
    if (lineRef.current) {
      const t = state.clock.elapsedTime
      const progress = (Math.sin(t * 0.5) + 1) / 2
      const drawRange = Math.floor(progress * totalPoints)

      // 使用 geometry.setDrawRange 而不是 material.setDrawRange
      lineRef.current.geometry.setDrawRange(0, drawRange)
    }
  })

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#8dff55" />
    </line>
  )
}

// ===== 拖拽弹簧组件 =====
// 用于 Springs and draggable 特性的演示
function SpringBall() {
  const meshRef = useRef<THREE.Mesh>(null)
  const velocityRef = useRef({ x: 0, y: 0 })
  const positionRef = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime

      // 弹簧物理效果
      const stiffness = 0.03
      const damping = 0.95

      // 目标位置：圆形运动
      const targetX = Math.sin(t * 0.8) * 1.5
      const targetY = Math.cos(t * 0.8) * 1.5

      // 计算弹簧力
      const forceX = (targetX - positionRef.current.x) * stiffness
      const forceY = (targetY - positionRef.current.y) * stiffness

      // 应用阻尼
      velocityRef.current.x = (velocityRef.current.x + forceX) * damping
      velocityRef.current.y = (velocityRef.current.y + forceY) * damping

      // 更新位置
      positionRef.current.x += velocityRef.current.x
      positionRef.current.y += velocityRef.current.y

      meshRef.current.position.x = positionRef.current.x
      meshRef.current.position.y = positionRef.current.y
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="#26f2d5" />
    </mesh>
  )
}

// ===== 场景配置映射 =====
const sceneComponents: Record<string, React.ComponentType> = {
  intuitive: RotatingCube,
  composition: TransformSphere,
  scroll: ScrollWave,
  staggering: GridDots,
  svgUtils: SVGPath,
  draggable: SpringBall,
}

// ===== 特性 3D 场景组件 =====
interface FeatureSceneProps {
  sceneId: string
}

export default function FeatureScene({ sceneId }: FeatureSceneProps) {
  const SceneComponent = sceneComponents[sceneId]

  if (!SceneComponent) {
    return null
  }

  return (
    <div className="animejs-feature__scene">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <SceneComponent />
      </Canvas>
    </div>
  )
}
