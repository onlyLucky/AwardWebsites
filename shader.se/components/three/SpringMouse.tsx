'use client';
import { useRef, createContext, useContext, useCallback, ReactNode, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

interface MouseState {
  x: number;
  y: number;
}

export const MouseContext = createContext<MouseState | null>(null);

// 弹簧物理参数
const SPRING_CONFIG = {
  stiffness: 100,  // 刚度 - 回弹力度
  damping: 20,     // 阻尼 - 运动衰减
  mass: 1,         // 质量
};

interface SpringMouseProviderProps {
  children: ReactNode;
}

export function SpringMouseProvider({ children }: SpringMouseProviderProps) {
  const mouse = useRef<MouseState>({ x: 0, y: 0 });
  const current = useRef<MouseState>({ x: 0, y: 0 });
  const velocity = useRef<MouseState>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // 归一化鼠标坐标到 -1 ~ 1
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useFrame((_, delta) => {
    // 弹簧物理计算
    const { stiffness, damping, mass } = SPRING_CONFIG;

    ['x', 'y'].forEach(axis => {
      const force = (mouse.current[axis as keyof MouseState] - current.current[axis as keyof MouseState]) * stiffness;
      const dampingForce = -velocity.current[axis as keyof MouseState] * damping;
      const acceleration = (force + dampingForce) / mass;

      velocity.current[axis as keyof MouseState] += acceleration * delta;
      current.current[axis as keyof MouseState] += velocity.current[axis as keyof MouseState] * delta;
    });
  });

  // 在 document 上监听鼠标事件
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <MouseContext.Provider value={current.current}>
      {children}
    </MouseContext.Provider>
  );
}