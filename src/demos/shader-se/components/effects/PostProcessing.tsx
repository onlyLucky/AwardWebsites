import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  ChromaticAberration,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { usePagesStore } from '../../store/usePagesStore'

// 后处理效果配置
const POST_PROCESSING_CONFIG = {
  bloom: {
    threshold: 0.54,
    intensity: 2,
    luminanceSmoothing: 0.9,
  },
  noise: {
    premultiply: true,
    blendFunction: BlendFunction.ADD,
  },
  vignette: {
    offset: 0.3,
    darkness: 0.7,
  },
  chromaticAberration: {
    offset: new THREE.Vector2(0.001, 0.001),
  },
}

export function PostProcessing() {
  const chromaticAberrationRef = useRef<any>(null)
  const scrollProgress = usePagesStore((state) => state.scrollProgress)

  // 动态更新后处理参数
  useFrame(() => {
    if (chromaticAberrationRef.current) {
      // 根据滚动进度调整色差强度
      const intensity = 0.001 + scrollProgress * 0.002
      chromaticAberrationRef.current.offset.set(intensity, intensity)
    }
  })

  return (
    <EffectComposer>
      {/* 泛光效果 */}
      <Bloom
        intensity={POST_PROCESSING_CONFIG.bloom.intensity}
        luminanceThreshold={POST_PROCESSING_CONFIG.bloom.threshold}
        luminanceSmoothing={POST_PROCESSING_CONFIG.bloom.luminanceSmoothing}
        mipmapBlur
      />

      {/* 噪点效果 */}
      <Noise
        premultiply={POST_PROCESSING_CONFIG.noise.premultiply}
        blendFunction={POST_PROCESSING_CONFIG.noise.blendFunction}
      />

      {/* 暗角效果 */}
      <Vignette
        offset={POST_PROCESSING_CONFIG.vignette.offset}
        darkness={POST_PROCESSING_CONFIG.vignette.darkness}
      />

      {/* 色差效果 */}
      <ChromaticAberration
        ref={chromaticAberrationRef}
        offset={POST_PROCESSING_CONFIG.chromaticAberration.offset}
      />
    </EffectComposer>
  )
}
