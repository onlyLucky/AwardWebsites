# React Three Fiber 技术知识点文档

## 1. 技术介绍

### 1.1 什么是 React Three Fiber

React Three Fiber (R3F) 是一个高性能的 React 渲染器，用于 Three.js。它将 Three.js 的 3D 渲染能力与 React 的声明式组件化开发模式完美结合，让你可以用熟悉的 React 语法来构建复杂的 3D 场景。

### 1.2 核心特性

- **声明式 3D**：使用 JSX 语法描述 3D 场景，代码清晰易读
- **React 生态**：完全融入 React 生态系统，支持 Hooks、Context、状态管理等
- **性能优化**：自动批处理和优化渲染，确保高性能
- **组件化**：可复用的 3D 组件，便于维护和扩展
- **Hooks**：专门的 3D 相关 Hooks，简化开发
- **Drei**：配套的辅助库，提供大量常用组件
- **Postprocessing**：支持高级后处理效果

### 1.3 适用场景

- **交互式 3D 网站**：产品展示、作品集、创意网站
- **数据可视化**：3D 数据图表、科学可视化
- **Web 游戏**：基于浏览器的 3D 游戏
- **虚拟现实 (VR)**：WebVR 应用
- **增强现实 (AR)**：WebAR 应用
- **教育培训**：3D 教学内容
- **产品配置器**：3D 产品定制和预览

### 1.4 不适用场景

- **需要极致性能的 AAA 游戏**：可能需要原生 WebGL 或游戏引擎
- **简单 2D 网站**：可以使用更简单的 Canvas 库
- **不支持 WebGL 的环境**：需要降级方案

## 2. 快速入门

### 2.1 环境要求

- Node.js 16+ 
- 现代浏览器支持 WebGL 2.0
- 推荐使用 React 18+

### 2.2 安装依赖

```bash
# 使用 npm
npm install three @react-three/fiber @react-three/drei

# 使用 yarn
yarn add three @react-three/fiber @react-three/drei

# 使用 pnpm
pnpm add three @react-three/fiber @react-three/drei
```

### 2.3 项目结构建议

```
src/
├── components/
│   ├── Scene.jsx          # 主场景组件
│   ├── Model.jsx          # 3D 模型组件
│   ├── Lights.jsx         # 灯光组件
│   └── Controls.jsx       # 控制器组件
├── hooks/
│   ├── useAnimation.js    # 动画 Hook
│   └── useInteraction.js  # 交互 Hook
├── assets/
│   └── models/            # 3D 模型文件
└── App.jsx                # 根组件
```

### 2.4 第一个 3D 场景

让我们创建一个简单的 3D 场景，包含旋转的立方体和基本的交互功能。

```jsx
// src/App.jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'

function AnimatedBox() {
  return (
    <Box args={[1, 1, 1]} position={[0, 0, 0]}>
      <meshStandardMaterial color="hotpink" />
    </Box>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedBox />
      <OrbitControls />
    </>
  )
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  )
}

export default App
```

### 2.5 添加动画

让我们为立方体添加旋转动画：

```jsx
// src/components/AnimatedBox.jsx
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'

function AnimatedBox() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <Box ref={meshRef} args={[1, 1, 1]} position={[0, 0, 0]}>
      <meshStandardMaterial color="hotpink" />
    </Box>
  )
}

export default AnimatedBox
```

## 3. 基础使用

### 3.1 Canvas 组件

Canvas 是 React Three Fiber 的根组件，它创建 Three.js 场景并处理所有渲染逻辑。

```jsx
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <Canvas
      // 相机配置
      camera={{
        position: [0, 0, 5],    // 相机位置
        fov: 75,                 // 视野角度
        near: 0.1,               // 近裁剪面
        far: 1000                // 远裁剪面
      }}
      // WebGL 渲染器配置
      gl={{
        antialias: true,         // 抗锯齿
        toneMapping: 'ACESFilmicToneMapping',
        outputColorSpace: 'srgb'
      }}
      // 其他配置
      dpr={[1, 2]}              // 设备像素比范围
      shadows                  // 启用阴影
      className="canvas"        // CSS 类名
      style={{ background: '#111' }}
    >
      {/* 场景内容 */}
    </Canvas>
  )
}
```

### 3.2 灯光系统

Three.js 提供多种光源，每种都有不同的特性和用途。

```jsx
import React from 'react'

function Lights() {
  return (
    <>
      {/* 环境光：提供基础照明 */}
      <ambientLight intensity={0.5} color="white" />
      
      {/* 平行光：模拟太阳光 */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* 点光源：从一个点向四周发射光线 */}
      <pointLight
        position={[-5, 5, -5]}
        intensity={0.5}
        color="orange"
        distance={10}
        decay={2}
      />
      
      {/* 聚光灯：像手电筒一样的光源 */}
      <spotLight
        position={[5, 10, 5]}
        intensity={1}
        angle={0.3}
        penumbra={1}
        castShadow
      />
      
      {/* 半球光：天空和地面的渐变光照 */}
      <hemisphereLight
        groundColor="darkgreen"
        intensity={0.3}
      />
    </>
  )
}

export default Lights
```

### 3.3 基本几何体

Three.js 提供多种基本几何体，可以快速构建 3D 场景。

```jsx
import React from 'react'

function Geometries() {
  return (
    <group>
      {/* 立方体 */}
      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      
      {/* 球体 */}
      <mesh position={[-1, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      
      {/* 圆柱体 */}
      <mesh position={[1, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>
      
      {/* 圆锥体 */}
      <mesh position={[3, 0, 0]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      
      {/* 圆环 */}
      <mesh position={[0, 2, 0]}>
        <torusGeometry args={[0.5, 0.2, 16, 100]} />
        <meshStandardMaterial color="purple" />
      </mesh>
      
      {/* 二十面体 */}
      <mesh position={[0, -2, 0]}>
        <icosahedronGeometry args={[0.5]} />
        <meshStandardMaterial color="orange" wireframe={false} />
      </mesh>
    </group>
  )
}

export default Geometries
```

### 3.4 材质系统

材质决定了物体的外观，Three.js 提供多种材质类型。

```jsx
import React from 'react'

function Materials() {
  return (
    <group>
      {/* 基础材质：不受光照影响 */}
      <mesh position={[-2, 0, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshBasicMaterial color="red" wireframe={false} />
      </mesh>
      
      {/* 标准材质：受光照影响，支持金属度和粗糙度 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="blue"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      
      {/* 物理材质：更真实的材质模拟 */}
      <mesh position={[2, 0, 0]}>
        <torusKnotGeometry args={[0.4, 0.15, 128, 32]} />
        <meshPhysicalMaterial
          color="gold"
          metalness={1}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* 法线材质：显示法线方向 */}
      <mesh position={[-2, -2, 0]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshNormalMaterial />
      </mesh>
      
      {/* 线框材质 */}
      <mesh position={[0, -2, 0]}>
        <dodecahedronGeometry args={[0.5]} />
        <meshBasicMaterial color="green" wireframe={true} />
      </mesh>
      
      {/* 深度材质 */}
      <mesh position={[2, -2, 0]}>
        <octahedronGeometry args={[0.5]} />
        <meshDepthMaterial />
      </mesh>
    </group>
  )
}

export default Materials
```

### 3.5 相机控制

使用 Drei 的控制器组件可以轻松实现相机交互。

```jsx
import React from 'react'
import { OrbitControls, FirstPersonControls, FlyControls, TrackballControls } from '@react-three/drei'

function ControlsExample() {
  // OrbitControls：轨道控制器，适合产品展示
  // FirstPersonControls：第一人称控制器，适合游戏
  // FlyControls：飞行控制器
  // TrackballControls：轨迹球控制器
  
  return (
    <OrbitControls
      enableDamping={true}        // 启用阻尼效果
      dampingFactor={0.05}        // 阻尼系数
      enableZoom={true}          // 启用缩放
      enablePan={true}           // 启用平移
      minDistance={2}            // 最小距离
      maxDistance={20}           // 最大距离
      minPolarAngle={0}          // 最小极角
      maxPolarAngle={Math.PI}    // 最大极角
    />
  )
}

export default ControlsExample
```

### 3.6 使用 Drei 组件

Drei 是 React Three Fiber 的配套库，提供大量常用的辅助组件。

```jsx
import React from 'react'
import {
  Box,
  Sphere,
  Cylinder,
  Plane,
  Text,
  Stars,
  Environment,
  Float,
  OrbitControls,
  ContactShadows,
  Sparkles
} from '@react-three/drei'

function DreiExample() {
  return (
    <>
      {/* 基本几何体 */}
      <Box args={[1, 1, 1]} position={[-2, 0, 0]}>
        <meshStandardMaterial color="blue" />
      </Box>
      
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="red" />
      </Sphere>
      
      <Cylinder args={[0.5, 0.5, 1, 32]} position={[2, 0, 0]}>
        <meshStandardMaterial color="green" />
      </Sphere>
      
      {/* 平面 */}
      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <meshStandardMaterial color="gray" />
      </Plane>
      
      {/* 3D 文字 */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Hello R3F!
      </Text>
      
      {/* 星星背景 */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* 环境贴图 */}
      <Environment preset="city" />
      
      {/* 浮动动画 */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.3, 32, 32]} position={[0, 1, 0]}>
          <meshStandardMaterial color="yellow" />
        </Sphere>
      </Float>
      
      {/* 接触阴影 */}
      <ContactShadows
        resolution={1024}
        scale={10}
        blur={2}
        opacity={0.5}
        far={10}
        color="#000000"
      />
      
      {/* 火花效果 */}
      <Sparkles count={50} scale={10} size={4} speed={0.4} opacity={0.5} color="#ff00ff" />
      
      {/* 控制器 */}
      <OrbitControls />
    </>
  )
}

export default DreiExample
```

## 4. 进阶使用

### 4.1 自定义 3D 组件

创建可复用的 3D 组件是 React Three Fiber 的核心优势。

```jsx
// src/components/CustomBox.jsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const CustomBox = forwardRef(({ position, color, size = 1, animate = false, children }, ref) => {
  const meshRef = useRef()

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    rotate: () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.1
        meshRef.current.rotation.y += 0.1
      }
    },
    getPosition: () => meshRef.current?.position
  }))

  // 自动旋转动画
  useFrame((state, delta) => {
    if (animate && meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
      {children}
    </mesh>
  )
})

CustomBox.displayName = 'CustomBox'

export default CustomBox

// 使用示例
// src/App.jsx
import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import CustomBox from './components/CustomBox'

function App() {
  const boxRef = useRef()

  const handleClick = () => {
    if (boxRef.current) {
      boxRef.current.rotate()
    }
  }

  return (
    <>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <CustomBox
          ref={boxRef}
          position={[0, 0, 0]}
          color="hotpink"
          animate={true}
        />
        
        <OrbitControls />
      </Canvas>
      <button
        onClick={handleClick}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Rotate Box
      </button>
    </>
  )
}

export default App
```

### 4.2 纹理和贴图

使用纹理可以让 3D 对象更加真实和丰富。

```jsx
// src/components/TexturedObject.jsx
import React from 'react'
import { useTexture } from '@react-three/drei'

function TexturedObject() {
  // 加载纹理
  const [colorMap, normalMap, roughnessMap, aoMap] = useTexture([
    '/textures/color.jpg',
    '/textures/normal.jpg',
    '/textures/roughness.jpg',
    '/textures/ao.jpg'
  ])

  // 配置纹理
  [colorMap, normalMap, roughnessMap, aoMap].forEach(texture => {
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(1, 1)
    }
  })

  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        aoMap={aoMap}
        roughness={0.5}
        metalness={0.1}
      />
    </mesh>
  )
}

export default TexturedObject

// 使用程序化纹理
// src/components/ProceduralTexture.jsx
import React, { useMemo } from 'react'
import * as THREE from 'three'

function ProceduralTexture() {
  // 创建棋盘格纹理
  const texture = useMemo(() => {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const context = canvas.getContext('2d')
    
    const tileSize = 64
    for (let y = 0; y < size; y += tileSize) {
      for (let x = 0; x < size; x += tileSize) {
        context.fillStyle = (x + y) / tileSize % 2 === 0 ? '#333' : '#666'
        context.fillRect(x, y, tileSize, tileSize)
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
    return texture
  }, [])

  return (
    <mesh>
      <planeGeometry args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default ProceduralTexture
```

### 4.3 加载 3D 模型

使用 useGLTF Hook 加载 GLTF/GLB 模型。

```jsx
// src/components/Model.jsx
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

function Model({ url, position = [0, 0, 0], scale = 1, animate = false }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef()

  // 克隆场景以避免多个实例冲突
  const clonedScene = useMemo(() => scene.clone(), [scene])

  useFrame((state, delta) => {
    if (animate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5
    }
  })

  // 遍历场景并优化材质
  useMemo(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.metalness = 0.1
          child.material.roughness = 0.5
        }
      }
    })
  }, [clonedScene])

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      position={position}
      scale={scale}
    />
  )
}

// 预加载模型
useGLTF.preload('/models/product.glb')

export default Model

// 使用示例
// src/App.jsx
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import Model from './components/Model'

function Loading() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="gray" wireframe />
    </mesh>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <Environment preset="city" />
      
      <Suspense fallback={<Loading />}>
        <Model
          url="/models/product.glb"
          position={[0, 0, 0]}
          scale={1}
          animate={true}
        />
      </Suspense>
      
      <ContactShadows
        resolution={1024}
        scale={10}
        blur={2}
        opacity={0.5}
        far={10}
      />
      
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={10}
      />
    </Canvas>
  )
}

export default App
```

### 4.4 后处理效果

使用 `@react-three/postprocessing` 实现高级后处理效果。

```jsx
// 先安装依赖
// npm install @react-three/postprocessing postprocessing

// src/components/PostProcessing.jsx
import React from 'react'
import { EffectComposer, Bloom, Noise, Vignette, DepthOfField } from '@react-three/postprocessing'

function PostProcessing() {
  return (
    <EffectComposer>
      {/* 深度场效果：模拟相机景深 */}
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={3}
        height={480}
      />
      
      {/* 光晕效果：让明亮区域发光 */}
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        height={300}
      />
      
      {/* 噪点效果：增加胶片感 */}
      <Noise opacity={0.02} />
      
      {/* 暗角效果：突出中心区域 */}
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  )
}

export default PostProcessing

// 使用示例
import { Canvas } from '@react-three/fiber'
import PostProcessing from './components/PostProcessing'

function App() {
  return (
    <Canvas>
      {/* 场景内容 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      
      {/* 一些发光物体 */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial
            color={`hsl(${Math.random() * 360}, 100%, 50%)`}
          />
        </mesh>
      ))}
      
      {/* 后处理 */}
      <PostProcessing />
    </Canvas>
  )
}
```

### 4.5 交互和事件处理

React Three Fiber 支持标准的 React 事件系统。

```jsx
// src/components/InteractiveObject.jsx
import React, { useState, useRef } from 'react'
import { useCursor, useHighlight, useHover } from '@react-three/drei'

function InteractiveObject({ children }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  // 鼠标悬停时改变光标
  useCursor(hovered)
  
  // 高亮效果
  const highlight = useHighlight(meshRef, hovered, {
    color: 'yellow',
    backlight: true,
    size: 1
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      scale={clicked ? [1.2, 1.2, 1.2] : [1, 1, 1]}
    >
      {children}
      {highlight}
    </mesh>
  )
}

export default InteractiveObject

// 拖拽功能
// src/components/Draggable.jsx
import React, { useRef } from 'react'
import { useDrag } from '@react-three/drei'

function Draggable({ children }) {
  const meshRef = useRef()
  const [, drag] = useDrag()

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => (e.stopPropagation(), (document.body.style.cursor = 'grab'))}
      onPointerOut={(e) => (e.stopPropagation(), (document.body.style.cursor = 'auto'))}
      {...drag()}
    >
      {children}
    </mesh>
  )
}

export default Draggable

// 使用示例
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import InteractiveObject from './components/InteractiveObject'
import Draggable from './components/Draggable'

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* 可交互对象 */}
      <InteractiveObject position={[-2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </InteractiveObject>
      
      {/* 可拖拽对象 */}
      <Draggable position={[2, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="red" />
      </Draggable>
      
      <OrbitControls />
    </Canvas>
  )
}
```

### 4.6 物理引擎集成

使用 @react-three/cannon 实现物理效果。

```jsx
// 安装依赖
// npm install @react-three/cannon cannon-es

// src/components/PhysicsExample.jsx
import React from 'react'
import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon'

function Floor() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1, 0],
    material: { friction: 0.5, restitution: 0.3 }
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  )
}

function Box({ position, color }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [1, 1, 1],
    material: { friction: 0.5, restitution: 0.3 }
  }))

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      onClick={() => api.applyImpulse([0, 5, 0], [0, 0, 0])}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Ball({ position, color }) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [0.5],
    material: { friction: 0.5, restitution: 0.7 }
  }))

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      onClick={() => api.applyImpulse([0, 5, 0], [0, 0, 0])}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function PhysicsExample() {
  return (
    <Physics gravity={[0, -9.81, 0]}>
      <Floor />
      <Box position={[-2, 2, 0]} color="blue" />
      <Box position={[0, 3, 0]} color="red" />
      <Box position={[2, 4, 0]} color="green" />
      <Ball position={[0, 6, 0]} color="yellow" />
    </Physics>
  )
}

export default PhysicsExample

// 使用示例
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import PhysicsExample from './components/PhysicsExample'

function App() {
  return (
    <Canvas camera={{ position: [0, 5, 10] }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <PhysicsExample />
      <OrbitControls />
    </Canvas>
  )
}
```

## 5. 实际应用

### 5.1 产品展示器

创建一个专业的 3D 产品展示器，支持旋转、缩放、材质切换等功能。

```jsx
// src/components/ProductViewer.jsx
import React, { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Float, useTexture } from '@react-three/drei'

const MATERIALS = {
  gold: { color: '#ffd700', metalness: 1, roughness: 0.2 },
  silver: { color: '#c0c0c0', metalness: 1, roughness: 0.3 },
  black: { color: '#333333', metalness: 0.8, roughness: 0.4 },
  red: { color: '#ff4444', metalness: 0.5, roughness: 0.5 },
  blue: { color: '#4444ff', metalness: 0.5, roughness: 0.5 }
}

function Product({ material }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />
        <meshStandardMaterial {...material} />
      </mesh>
    </Float>
  )
}

function ProductViewer() {
  const [selectedMaterial, setSelectedMaterial] = useState('gold')

  return (
    <div className="product-viewer" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* 3D 场景 */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        className="product-canvas"
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <Environment preset="city" />
        
        <Product material={MATERIALS[selectedMaterial]} />
        
        <ContactShadows
          resolution={1024}
          scale={10}
          blur={2}
          opacity={0.5}
          far={5}
        />
        
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={10}
          enablePan={false}
        />
      </Canvas>

      {/* 材质选择器 */}
      <div className="material-selector" style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
      }}>
        {Object.entries(MATERIALS).map(([name, props]) => (
          <button
            key={name}
            onClick={() => setSelectedMaterial(name)}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: selectedMaterial === name ? '3px solid #333' : '2px solid #ddd',
              background: props.color,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* 标题 */}
      <h1 style={{
        position: 'absolute',
        top: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontSize: '2rem',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
      }}>
        3D 产品展示
      </h1>
    </div>
  )
}

export default ProductViewer
```

### 5.2 3D 数据可视化

创建一个交互式的 3D 数据可视化场景。

```jsx
// src/components/DataVisualization.jsx
import React, { useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Float } from '@react-three/drei'

// 生成示例数据
const generateData = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 10,
    y: Math.random() * 5,
    z: (Math.random() - 0.5) * 10,
    value: Math.random(),
    category: Math.floor(Math.random() * 3)
  }))
}

const COLORS = ['#ff6b6b', '#4ecdc4', '#ffe66d']

function DataPoint({ data, onHover }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const scale = 0.5 + data.value * 0.5

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.position.y = data.y + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <Float speed={2 + data.value} rotationIntensity={0.5} floatIntensity={0.2}>
      <mesh
        ref={meshRef}
        position={[data.x, data.y, data.z]}
        scale={hovered ? [scale * 1.5, scale * 1.5, scale * 1.5] : [scale, scale, scale]}
        onPointerOver={() => {
          setHovered(true)
          onHover(data)
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={COLORS[data.category]}
          emissive={hovered ? COLORS[data.category] : '#000'}
          emissiveIntensity={hovered ? 0.5 : 0}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </Float>
  )
}

function Grid() {
  return (
    <gridHelper
      args={[20, 20, '#444', '#222']}
      position={[0, -0.01, 0]}
    />
  )
}

function DataVisualization() {
  const [data, setData] = useState(() => generateData(50))
  const [hoveredData, setHoveredData] = useState(null)

  // 重新生成数据
  const regenerateData = () => {
    setData(generateData(50))
  }

  return (
    <div className="data-viz" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas camera={{ position: [10, 8, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#4ecdc4" />
        
        <Grid />
        
        {/* 数据点 */}
        {data.map((item) => (
          <DataPoint key={item.id} data={item} onHover={setHoveredData} />
        ))}
        
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={30}
        />
      </Canvas>

      {/* 控制面板 */}
      <div className="controls" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem' }}>数据可视化</h3>
        <button
          onClick={regenerateData}
          style={{
            background: '#4ecdc4',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          重新生成数据
        </button>
      </div>

      {/* 信息面板 */}
      {hoveredData && (
        <div className="info-panel" style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: COLORS[hoveredData.category] }}>
            数据点 #{hoveredData.id}
          </h4>
          <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
            值: {hoveredData.value.toFixed(3)}
          </p>
          <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
            类别: {hoveredData.category + 1}
          </p>
          <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
            位置: ({hoveredData.x.toFixed(2)}, {hoveredData.y.toFixed(2)}, {hoveredData.z.toFixed(2)})
          </p>
        </div>
      )}

      {/* 图例 */}
      <div className="legend" style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>图例</h4>
        {COLORS.map((color, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: color,
              marginRight: '10px'
            }} />
            <span>类别 {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DataVisualization
```

### 5.3 交互式艺术场景

创建一个具有动态效果和用户交互的艺术场景。

```jsx
// src/components/InteractiveArt.jsx
import React, { useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float, Sparkles, Text } from '@react-three/drei'
import * as THREE from 'three'

const PARTICLE_COUNT = 1000

function ParticleSystem({ mousePosition }) {
  const meshRef = useRef()
  const particleRef = useRef()

  // 生成粒子位置
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  // 粒子颜色
  const particleColors = useMemo(() => {
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const hue = (i / PARTICLE_COUNT) * 360
      const color = new THREE.Color().setHSL(hue / 360, 1, 0.5)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return colors
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      // 旋转粒子系统
      meshRef.current.rotation.y += delta * 0.1
      meshRef.current.rotation.x += delta * 0.05
      
      // 鼠标交互
      if (particleRef.current) {
        const positions = particleRef.current.attributes.position.array
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3
          // 简单的鼠标吸引效果
          const dx = mousePosition.x * 10 - positions[i3]
          const dy = mousePosition.y * 10 - positions[i3 + 1]
          const dz = -positions[i3 + 2]
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
          
          if (distance < 5) {
            positions[i3] += dx * 0.01
            positions[i3 + 1] += dy * 0.01
            positions[i3 + 2] += dz * 0.01
          }
        }
        particleRef.current.attributes.position.needsUpdate = true
      }
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={particleRef}>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={particlePositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={particleColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  )
}

function CentralObject({ time }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.7
      meshRef.current.rotation.z += delta * 0.3
      
      // 缩放动画
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#ff6b6b"
        metalness={0.8}
        roughness={0.2}
        emissive="#ff6b6b"
        emissiveIntensity={0.3}
        wireframe={Math.sin(time * 2) > 0}
      />
    </mesh>
  )
}

function InteractiveArt() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(0)

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1
    })
  }

  return (
    <div
      className="interactive-art"
      style={{ width: '100vw', height: '100vh', background: '#0a0a0a' }}
      onMouseMove={handleMouseMove}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        {/* 背景光 */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b6b" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4ecdc4" />
        
        {/* 星星背景 */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* 粒子系统 */}
        <ParticleSystem mousePosition={mousePosition} />
        
        {/* 中央物体 */}
        <CentralObject time={time} />
        
        {/* 浮动文字 */}
        <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            移动鼠标来交互
          </Text>
        </Float>
        
        {/* 火花效果 */}
        <Sparkles count={100} scale={15} size={4} speed={0.5} opacity={0.6} color="#4ecdc4" />
        
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>

      {/* 装饰性 UI */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '200px',
          height: '200px',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }} />
      </div>
    </div>
  )
}

export default InteractiveArt
```

## 6. 常见问题

### 6.1 渲染问题

**问题：场景显示黑色，什么都看不到**

解决方案：
1. 检查是否添加了光源
2. 确认相机位置是否正确
3. 检查物体是否在相机视锥内
4. 查看浏览器控制台是否有错误

```jsx
// 确保添加基本的光照
<ambientLight intensity={0.5} />
<pointLight position={[10, 10, 10]} />

// 检查相机配置
<Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
  {/* ... */}
</Canvas>
```

**问题：材质看起来不正确**

解决方案：
1. 确保使用了合适的材质类型（meshStandardMaterial 需要光照）
2. 检查纹理是否正确加载
3. 确认材质属性设置正确

```jsx
// 使用环境贴图改善材质效果
import { Environment } from '@react-three/drei'
<Environment preset="city" />
```

**问题：模型加载失败**

解决方案：
1. 检查模型文件路径是否正确
2. 使用 Suspense 处理加载状态
3. 验证模型文件格式是否支持
4. 检查网络请求是否成功

```jsx
import { Suspense } from 'react'

<Suspense fallback={<div>Loading...</div>}>
  <Model url="/models/model.glb" />
</Suspense>
```

### 6.2 性能问题

**问题：场景卡顿，帧率低**

解决方案：
1. 减少几何体面数
2. 使用实例化渲染
3. 优化材质和纹理
4. 启用阴影优化
5. 使用 LOD（细节层次）

```jsx
import { InstancedMesh } from '@react-three/drei'

// 使用实例化渲染
<InstancedMesh args={[geometry, material, 1000]}>
  {/* ... */}
</InstancedMesh>
```

**问题：内存使用高**

解决方案：
1. 及时释放不需要的资源
2. 使用纹理压缩
3. 优化模型文件大小
4. 使用纹理图集

### 6.3 交互问题

**问题：点击检测不工作**

解决方案：
1. 确保对象有几何体
2. 检查 raycaster 配置
3. 确认对象在相机视锥内
4. 检查事件冒泡

```jsx
// 正确处理事件
<mesh onClick={(e) => { e.stopPropagation(); /* ... */ }}>
  {/* ... */}
</mesh>
```

**问题：拖拽不流畅**

解决方案：
1. 优化拖拽逻辑
2. 减少不必要的渲染
3. 使用防抖和节流
4. 确保 useDrag Hook 正确使用

### 6.4 动画问题

**问题：动画不流畅**

解决方案：
1. 使用 useFrame Hook 正确计时
2. 避免在动画中创建新对象
3. 使用 lerp 进行平滑过渡
4. 优化动画复杂度

```jsx
useFrame((state, delta) => {
  // 使用 delta 时间确保动画速度一致
  meshRef.current.rotation.x += delta * speed
})
```

**问题：动画卡顿**

解决方案：
1. 检查是否有性能瓶颈
2. 使用 React.memo 优化组件
3. 避免不必要的重渲染
4. 使用 useMemo 和 useCallback

## 7. 性能优化

### 7.1 渲染优化

#### 实例化渲染

当需要渲染大量相同对象时，使用实例化渲染可以显著提高性能。

```jsx
import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function InstancedCubes({ count = 1000 }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // 生成随机位置
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20
      temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      particle.t += particle.speed
      particle.mx += (state.mouse.x * 5 - particle.mx) * 0.1
      particle.my += (state.mouse.y * 5 - particle.my) * 0.1
      
      dummy.position.set(
        particle.x + Math.cos(particle.t) * particle.factor * 0.01 + particle.mx,
        particle.y + Math.sin(particle.t) * particle.factor * 0.01 + particle.my,
        particle.z
      )
      dummy.rotation.set(particle.t, particle.t, particle.t)
      dummy.scale.setScalar(0.5 + Math.sin(particle.t) * 0.3)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} castShadow receiveShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#ff6b6b" />
    </instancedMesh>
  )
}

export default InstancedCubes
```

#### LOD（细节层次）

根据距离使用不同细节程度的模型。

```jsx
import React from 'react'
import { LOD } from '@react-three/drei'

function DetailedObject() {
  return (
    <LOD>
      {/* 高细节模型（近距离） */}
      <mesh distance={0}>
        <boxGeometry args={[1, 1, 1, 4, 4, 4]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      
      {/* 中等细节模型 */}
      <mesh distance={5}>
        <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      
      {/* 低细节模型（远距离） */}
      <mesh distance={10}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </LOD>
  )
}

export default DetailedObject
```

#### 阴影优化

合理配置阴影可以在质量和性能之间取得平衡。

```jsx
<Canvas shadows>
  {/* 使用较小的阴影贴图尺寸 */}
  <directionalLight
    position={[5, 5, 5]}
    intensity={1}
    castShadow
    shadow-mapSize-width={1024}
    shadow-mapSize-height={1024}
    shadow-camera-left={-10}
    shadow-camera-right={10}
    shadow-camera-top={10}
    shadow-camera-bottom={-10}
  />
  
  {/* 使用接触阴影代替真实阴影 */}
  import { ContactShadows } from '@react-three/drei'
  <ContactShadows
    resolution={1024}
    scale={10}
    blur={2}
    opacity={0.5}
    far={10}
  />
</Canvas>
```

### 7.2 资源优化

#### 纹理优化

```jsx
import { useTexture } from '@react-three/drei'

function OptimizedTextures() {
  const textures = useTexture([
    '/textures/color.jpg',
    '/textures/normal.jpg'
  ])
  
  // 配置纹理参数
  textures.forEach(texture => {
    texture.anisotropy = 8  // 各向异性过滤
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = true
  })
  
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={textures[0]} normalMap={textures[1]} />
    </mesh>
  )
}
```

#### 模型优化

1. 使用 glTF/GLB 格式
2. 压缩模型文件
3. 使用 Draco 压缩
4. 减少不必要的细节

### 7.3 代码优化

#### 组件优化

```jsx
import React, { memo, useMemo } from 'react'

// 使用 memo 防止不必要的重渲染
const OptimizedComponent = memo(({ data }) => {
  // 使用 useMemo 缓存计算结果
  const expensiveValue = useMemo(() => {
    return data.map(item => item * 2)
  }, [data])
  
  return (
    <mesh>
      {/* ... */}
    </mesh>
  )
})

OptimizedComponent.displayName = 'OptimizedComponent'

export default OptimizedComponent
```

#### useFrame 优化

```jsx
import { useFrame } from '@react-three/fiber'

function OptimizedAnimation() {
  useFrame((state, delta) => {
    // 只在需要时更新
    // 避免在 useFrame 中创建新对象
    // 使用 delta 时间确保动画速度一致
  })
  
  return <mesh />
}
```

## 8. 学习资源

### 8.1 官方资源

- **React Three Fiber 官方文档**：[https://docs.pmnd.rs/react-three-fiber](https://docs.pmnd.rs/react-three-fiber)
- **React Three Drei 文档**：[https://docs.pmnd.rs/react-three-drei](https://docs.pmnd.rs/react-three-drei)
- **Three.js 官方文档**：[https://threejs.org/docs/](https://threejs.org/docs/)
- **React Three Fiber GitHub**：[https://github.com/pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber)
- **Three.js 示例**：[https://threejs.org/examples/](https://threejs.org/examples/)

### 8.2 社区资源

- **Three.js Journey**：[https://threejs-journey.com/](https://threejs-journey.com/) - 付费课程，非常全面
- **YouTube 教程**：搜索 "React Three Fiber tutorial"
- **Discord 社区**：加入 PMND Discord 服务器
- **GitHub 示例项目**：查看优秀的 R3F 项目

### 8.3 推荐书籍

- 《Three.js Essentials》
- 《Learning Three.js: The JavaScript 3D Library for WebGL》

## 9. 最佳实践

### 9.1 代码组织

- **组件拆分**：将 3D 场景拆分为可复用组件
- **逻辑分离**：将业务逻辑与渲染逻辑分离
- **文件结构**：按功能组织 3D 相关文件
- **命名规范**：使用清晰一致的命名

### 9.2 性能

- **资源管理**：合理加载和释放资源
- **渲染优化**：使用实例化、LOD 等技术
- **代码优化**：避免不必要的计算和渲染
- **内存管理**：及时清理不需要的对象

### 9.3 可维护性

- **TypeScript**：使用 TypeScript 提高代码质量
- **文档**：为组件添加清晰的文档
- **测试**：编写单元测试
- **代码审查**：定期进行代码审查

### 9.4 兼容性

- **降级方案**：为不支持 WebGL 的环境提供降级方案
- **性能检测**：根据设备性能调整渲染质量
- **响应式**：适配不同屏幕尺寸

### 9.5 开发流程

1. **原型设计**：先快速搭建基础原型
2. **功能开发**：逐步添加功能
3. **性能优化**：在功能稳定后进行优化
4. **测试验证**：确保在不同设备上正常工作
5. **部署上线**：准备生产环境部署

## 10. 总结

React Three Fiber 为 Three.js 带来了 React 的声明式编程模型，使 3D 开发变得更加直观和组件化。通过合理使用其特性，可以构建各种复杂的 3D 应用，从简单的产品展示到复杂的交互式体验。

关键要点：
1. **理解 Three.js 基础**：掌握 Three.js 的核心概念是使用 R3F 的前提
2. **组件化思维**：将 3D 场景拆分为可复用的组件
3. **性能优化**：注意渲染性能，使用合适的优化技术
4. **用户体验**：确保 3D 场景流畅且易于交互
5. **持续学习**：3D 技术发展迅速，保持学习的心态

希望这份文档能够帮助你快速入门和掌握 React Three Fiber，开始你的 3D 开发之旅！
