'use client';
import { ReactNode } from 'react';

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  // 简化版本，暂时不使用 Lenis 以确保项目能够运行
  return <>{children}</>;
}