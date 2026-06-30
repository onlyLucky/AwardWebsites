// ===== Engine 组件 =====
// 对应源码 #engine
// 3D 引擎区域，包含 Canvas、模型渲染等

import { Canvas } from '@react-three/fiber'

export default function Engine() {
  return (
    <div id='engine' className='fixed w-full h-lvh'>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {/* 3D 场景内容将在这里渲染 */}
      </Canvas>
    </div>
  )
}
