# React Three Fiber 技术知识点文档

## 1. 技术介绍

React Three Fiber (R3F) 是 Three.js 的 React 渲染器，它将 Three.js 的 3D 渲染能力与 React 的组件化、声明式编程模型相结合。

核心特性：
- **声明式 3D** - 使用 JSX 语法描述 3D 场景
- **React 集成** - 完全融入 React 生态系统
- **性能优化** - 自动批处理和优化渲染
- **组件化** - 可复用的 3D 组件
- **Hooks** - 专门的 3D 相关 Hooks

## 2. 使用场景

### 适用场景
- **交互式 3D 网站** - 产品展示、作品集、创意网站
- **数据可视化** - 3D 数据图表、科学可视化
- **Web 游戏** - 基于浏览器的 3D 游戏
- **虚拟现实 (VR)** - WebVR 应用
- **增强现实 (AR)** - WebAR 应用
- **教育培训** - 3D 教学内容

### 不适用场景
- **需要极致性能的 AAA 游戏** - 可能需要 WebGL 原生实现
- **简单 2D 网站** - 可以使用更简单的 Canvas 库
- **不支持 WebGL 的环境** - 需要降级方案

## 3. 快速入门

### 安装依赖

```bash
npm install three @react-three/fiber @react-three/drei
```

### 基本结构

```jsx
// src/App.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Box>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
```

### 运行项目

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build
```

## 4. 核心知识点

### 4.1 基础场景

**Canvas 组件**

```jsx
import { Canvas } from '@react-three/fiber';

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      {/* 场景内容 */}
    </Canvas>
  );
}
```

**灯光**

```jsx
<Canvas>
  {/* 环境光 */}
  <ambientLight intensity={0.5} />
  
  {/* 平行光 */}
  <directionalLight position={[0, 10, 0]} intensity={1} />
  
  {/* 点光源 */}
  <pointLight position={[10, 10, 10]} intensity={1} />
  
  {/* 聚光灯 */}
  <spotLight position={[0, 10, 0]} intensity={1} />
</Canvas>
```

**几何体**

```jsx
<Canvas>
  {/* 立方体 */}
  <mesh position={[-2, 0, 0]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="blue" />
  </mesh>
  
  {/* 球体 */}
  <mesh position={[0, 0, 0]}>
    <sphereGeometry args={[0.5, 32, 32]} />
    <meshStandardMaterial color="red" />
  </mesh>
  
  {/* 圆柱体 */}
  <mesh position={[2, 0, 0]}>
    <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
    <meshStandardMaterial color="green" />
  </mesh>
</Canvas>
```

### 4.2 自定义组件

**可复用 3D 组件**

```jsx
// src/components/Cube.jsx
function Cube({ position, color, size = 1 }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// 使用
<Canvas>
  <Cube position={[-1, 0, 0]} color="blue" size={1} />
  <Cube position={[1, 0, 0]} color="red" size={0.5} />
</Canvas>
```

**动画组件**

```jsx
// src/components/AnimatedSphere.jsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function AnimatedSphere() {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry />
      <meshStandardMaterial color="gold" />
    </mesh>
  );
}
```

### 4.3 相机控制

**OrbitControls**

```jsx
import { OrbitControls } from '@react-three/drei';

<Canvas>
  {/* 场景内容 */}
  <OrbitControls
    enableDamping={true}
    dampingFactor={0.05}
    enableZoom={true}
    enablePan={true}
  />
</Canvas>
```

**FirstPersonControls**

```jsx
import { FirstPersonControls } from '@react-three/drei';

<Canvas>
  {/* 场景内容 */}
  <FirstPersonControls
    speed={1}
    lookSpeed={0.05}
    constrainVertical={[0, Math.PI / 2]}
  />
</Canvas>
```

### 4.4 材质和纹理

**基础材质**

```jsx
// 标准材质
<meshStandardMaterial color="#ff0000" metalness={0.5} roughness={0.5} />

// 物理材质
<meshPhysicalMaterial 
  color="#ffffff" 
  metalness={1} 
  roughness={0} 
  clearcoat={1} 
/>

// 基础材质
<meshBasicMaterial color="#00ff00" wireframe={true} />
```

**纹理**

```jsx
import { useTexture } from '@react-three/drei';

function TexturedBox() {
  const textures = useTexture({
    map: '/textures/earth.jpg',
    normalMap: '/textures/earth-normal.jpg'
  });
  
  return (
    <mesh>
      <sphereGeometry />
      <meshStandardMaterial {...textures} />
    </mesh>
  );
}
```

### 4.5 加载 3D 模型

**GLTF 模型**

```jsx
import { useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/models/model.glb');
  return <primitive object={scene} />;
}

// 预加载
function App() {
  return (
    <Canvas>
      <Suspense fallback={<div>Loading...</div>}>
        <Model />
      </Suspense>
    </Canvas>
  );
}
```

### 4.6 后处理

```jsx
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';

<Canvas>
  {/* 场景内容 */}
  <EffectComposer>
    <Bloom intensity={1} luminanceThreshold={0.8} />
    <Noise opacity={0.1} />
  </EffectComposer>
</Canvas>
```

## 5. 使用技巧

### 5.1 性能优化

**实例化渲染**

```jsx
import { InstancedMesh, useMatcapTexture } from '@react-three/drei';

function InstancedObjects() {
  const matcap = useMatcapTexture('https://threejs.org/examples/textures/matcaps/15.png');
  
  return (
    <InstancedMesh
      args={[new THREE.BoxGeometry(0.5, 0.5, 0.5), null, 100]}
      position={[0, 0, 0]}
    >
      <meshMatcapMaterial matcap={matcap} />
      <instancedBufferAttribute
        attach="attributes-position"
        args={[
          new Float32Array(
            Array.from({ length: 100 }, () => [
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]).flat()
          ),
          3
        ]}
      />
    </InstancedMesh>
  );
}
```

**LOD (Level of Detail)**

```jsx
import { LOD } from '@react-three/drei';

function LevelOfDetail() {
  return (
    <LOD>
      <mesh distance={0}>
        <boxGeometry args={[1, 1, 1, 32, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh distance={10}>
        <boxGeometry args={[1, 1, 1, 16, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh distance={20}>
        <boxGeometry args={[1, 1, 1, 8, 8, 8]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </LOD>
  );
}
```

### 5.2 交互

**鼠标交互**

```jsx
import { useCursor, useRaycaster } from '@react-three/drei';

function InteractiveObject() {
  const ref = useRef();
  const { hovered } = useRaycaster({ ref });
  useCursor(hovered ? 'pointer' : 'auto');
  
  return (
    <mesh 
      ref={ref}
      onClick={() => console.log('Clicked!')}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'blue'} />
    </mesh>
  );
}
```

**拖拽**

```jsx
import { useDrag } from '@react-three/drei';

function DraggableObject() {
  const ref = useRef();
  useDrag((args) => {
    ref.current.position.set(
      args.point.x,
      args.point.y,
      ref.current.position.z
    );
  }, { ref });
  
  return (
    <mesh ref={ref}>
      <sphereGeometry />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}
```

### 5.3 环境

**环境贴图**

```jsx
import { Environment } from '@react-three/drei';

<Canvas>
  <Environment files="/textures/environment.hdr" />
  {/* 场景内容 */}
</Canvas>
```

**天空盒**

```jsx
import { Sky } from '@react-three/drei';

<Canvas>
  <Sky
    distance={450000}
    sunPosition={[0, 1, 0]}
    turbidity={10}
    rayleigh={2}
    mieCoefficient={0.005}
  />
  {/* 场景内容 */}
</Canvas>
```

## 6. 常见问题

### 6.1 性能问题

**问题**：场景卡顿
**解决方案**：
- 使用实例化渲染
- 优化几何体细分
- 使用 LOD
- 减少灯光数量
- 优化材质

**问题**：内存占用高
**解决方案**：
- 合理加载模型
- 清理未使用的资源
- 使用纹理压缩

### 6.2 渲染问题

**问题**：材质不显示
**解决方案**：
- 检查灯光设置
- 确保材质类型正确
- 检查几何体是否正确

**问题**：模型加载失败
**解决方案**：
- 检查模型格式
- 确保文件路径正确
- 使用 Suspense 处理加载

### 6.3 交互问题

**问题**：点击检测不工作
**解决方案**：
- 确保对象有几何体
- 检查 raycaster 配置
- 确保对象在相机视锥内

**问题**：拖拽不流畅
**解决方案**：
- 优化拖拽逻辑
- 减少不必要的渲染
- 使用防抖

## 7. 性能优化

### 7.1 渲染优化

- **减少绘制调用**：使用合并几何体
- **使用实例化**：相同几何体的多个实例
- **LOD**：根据距离调整细节
- **剔除**：只渲染可见对象
- **材质共享**：重用材质

### 7.2 资源优化

- **纹理压缩**：使用 .basis 或 .ktx2 格式
- **模型优化**：使用 gltf-pipeline 等工具
- **懒加载**：按需加载资源
- **缓存**：合理缓存资源

### 7.3 代码优化

- **useFrame 优化**：避免在 useFrame 中进行昂贵计算
- **状态管理**：合理使用 React 状态
- **记忆化**：使用 useMemo 和 useCallback
- **代码分割**：动态导入 3D 组件

## 8. 应用场景示例

### 8.1 产品展示

```jsx
// src/components/ProductViewer.jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';

function ProductModel() {
  const { scene } = useGLTF('/models/product.glb');
  const modelRef = useRef();
  
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });
  
  return <primitive ref={modelRef} object={scene} />;
}

function ProductViewer() {
  return (
    <div className="product-viewer">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={<div>Loading product...</div>}>
          <ProductModel />
        </Suspense>
        <OrbitControls enableDamping={true} />
      </Canvas>
    </div>
  );
}
```

### 8.2 数据可视化

```jsx
// src/components/DataVisualization.jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

function BarChart({ data }) {
  return (
    <group>
      {data.map((value, index) => (
        <mesh key={index} position={[index - data.length / 2, value / 2, 0]}>
          <boxGeometry args={[0.8, value, 0.8]} />
          <meshStandardMaterial 
            color={`hsl(${index / data.length * 360}, 100%, 50%)`} 
          />
        </mesh>
      ))}
    </group>
  );
}

function DataVisualization() {
  const chartData = [1, 3, 2, 5, 4, 3, 6, 2, 4];
  
  return (
    <Canvas camera={{ position: [0, 3, 10] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <BarChart data={chartData} />
      <OrbitControls />
    </Canvas>
  );
}
```

### 8.3 交互式艺术

```jsx
// src/components/InteractiveArt.jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useCursor, useRaycaster } from '@react-three/drei';
import { useRef, useState } from 'react';

function InteractiveSphere() {
  const ref = useRef();
  const { hovered } = useRaycaster({ ref });
  const [color, setColor] = useState('blue');
  useCursor(hovered ? 'pointer' : 'auto');
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });
  
  return (
    <mesh 
      ref={ref}
      onClick={() => setColor(hovered ? 'hotpink' : 'blue')}
    >
      <sphereGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : color} />
    </mesh>
  );
}

function InteractiveArt() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <InteractiveSphere />
      <OrbitControls />
    </Canvas>
  );
}
```

### 8.4 游戏场景

```jsx
// src/components/GameScene.jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { FirstPersonControls, Sky } from '@react-three/drei';
import { useRef, useState } from 'react';

function Player() {
  const ref = useRef();
  const [position, setPosition] = useState([0, 0, 0]);
  
  useFrame((state) => {
    // 简单的移动逻辑
    if (state.keys['ArrowUp']) {
      setPosition(prev => [prev[0], prev[1], prev[2] - 0.1]);
    }
    if (state.keys['ArrowDown']) {
      setPosition(prev => [prev[0], prev[1], prev[2] + 0.1]);
    }
    if (state.keys['ArrowLeft']) {
      setPosition(prev => [prev[0] - 0.1, prev[1], prev[2]]);
    }
    if (state.keys['ArrowRight']) {
      setPosition(prev => [prev[0] + 0.1, prev[1], prev[2]]);
    }
  });
  
  return (
    <group position={position} ref={ref}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
}

function GameScene() {
  return (
    <Canvas camera={{ position: [0, 1, 0] }}>
      <Sky />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      
      {/* 地面 */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#88aa88" />
      </mesh>
      
      {/* 障碍物 */}
      <mesh position={[2, 0, -5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      
      <Player />
      <FirstPersonControls />
    </Canvas>
  );
}
```

## 9. 学习资源

- [React Three Fiber 官方文档](https://docs.pmnd.rs/react-three-fiber)
- [React Three Drei 文档](https://docs.pmnd.rs/react-three-drei)
- [Three.js 官方文档](https://threejs.org/docs/)
- [React Three Fiber GitHub](https://github.com/pmndrs/react-three-fiber)
- [Three.js 示例](https://threejs.org/examples/)

## 10. 最佳实践

### 10.1 代码组织

- **组件拆分**：将 3D 场景拆分为可复用组件
- **逻辑分离**：将业务逻辑与渲染逻辑分离
- **文件结构**：按功能组织 3D 相关文件

### 10.2 性能

- **资源管理**：合理加载和释放资源
- **渲染优化**：使用实例化、LOD 等技术
- **代码优化**：避免不必要的计算和渲染

### 10.3 可维护性

- **TypeScript**：使用 TypeScript 提高代码质量
- **文档**：为组件添加清晰的文档
- **测试**：编写单元测试

### 10.4 兼容性

- **降级方案**：为不支持 WebGL 的环境提供降级方案
- **性能检测**：根据设备性能调整渲染质量
- **响应式**：适配不同屏幕尺寸

## 总结

React Three Fiber 为 Three.js 带来了 React 的声明式编程模型，使 3D 开发变得更加直观和组件化。通过合理使用其特性，可以构建各种复杂的 3D 应用，从简单的产品展示到复杂的交互式体验。关键是要理解 Three.js 的核心概念，同时充分利用 React 的组件化和状态管理能力，以及 React Three Fiber 提供的优化工具。