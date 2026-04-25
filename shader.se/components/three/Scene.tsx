'use client';
// 暂时移除后处理以简化依赖
import { ComputerModel } from './ComputerModel';
import { SpringMouseProvider } from './SpringMouse';

interface SceneProps {
  isLoaded: boolean;
}

export function Scene({ isLoaded }: SceneProps) {
  return (
    <SpringMouseProvider>
      {/* 环境光 */}
      <ambientLight intensity={0.2} />
      {/* 主光源（从屏幕发出） */}
      <pointLight position={[0, 0, 2]} intensity={2} color="#fffbe6" distance={10} />

      {/* 3D 模型 */}
      {isLoaded && <ComputerModel />}

      {/* 体积雾 */}
      <fogExp2 attach="fog" args={['#000000', 0.08]} />
    </SpringMouseProvider>
  );
}