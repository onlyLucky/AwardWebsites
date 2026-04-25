'use client';
import { useRef, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MouseContext } from './SpringMouse';

export function ComputerModel() {
  const ref = useRef<THREE.Group>(null);
  const mouse = useContext(MouseContext);

  useFrame(() => {
    if (ref.current && mouse) {
      // 鼠标视差效果
      ref.current.rotation.y = mouse.x * 0.05;
      ref.current.rotation.x = mouse.y * 0.03;
      
      // 微小悬浮动画
      ref.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {/* 电脑主体 */}
      <mesh>
        <boxGeometry args={[2, 1.5, 1.5]} />
        <meshStandardMaterial color="#c4b5a0" />
      </mesh>
      {/* 屏幕 */}
      <mesh position={[0, 0.3, 0.76]}>
        <planeGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#fffbe6" />
      </mesh>
      {/* 屏幕边框 */}
      <mesh position={[0, 0.3, 0.75]}>
        <boxGeometry args={[1.7, 1.1, 0.02]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
}