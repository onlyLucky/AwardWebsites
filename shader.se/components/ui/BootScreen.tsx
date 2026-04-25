'use client';
import { useState, useEffect } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center
      bg-[#1a1040] transition-opacity duration-700 ${isFading ? 'opacity-0' : 'opacity-100'}`}>

      {/* CRT 扫描线叠加 */}
      <div className="absolute inset-0 pointer-events-none crt-scanlines" />

      {/* Logo */}
      <div className="mb-8 chromatic-text text-6xl font-bold tracking-wider text-white">
        SHADER
      </div>

      {/* 版本信息 */}
      <div className="text-white/60 text-sm mb-12 font-mono">
        Shader Development Studio / Version 1.02
      </div>

      {/* 进度条 */}
      <div className="flex gap-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`w-5 h-3 border border-white/30 transition-all duration-200
              ${i / 20 * 100 <= progress ? 'bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-white/10'}`}
          />
        ))}
      </div>

      {/* 版权信息 */}
      <div className="absolute bottom-8 text-white/40 text-xs font-mono">
        Copyright (c) Shader Sweden AB, 2026. / All Rights Reserved.
      </div>
    </div>
  );
}