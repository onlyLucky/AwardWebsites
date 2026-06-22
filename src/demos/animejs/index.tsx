import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Hero from './components/hero'
import Features from './components/features'
import Modules from './components/modules'
import ScrollProgress from './components/ui/ScrollProgress'
import './styles/animejs.css'

// 注册 GSAP ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger)

export default function AnimejsDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  // ===== 初始化平滑滚动 =====
  useEffect(() => {
    // 创建 Lenis 实例，实现平滑滚动效果
    const lenis = new Lenis({
      duration: 1.2, // 动画持续时间，单位秒
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 缓动函数
      orientation: 'vertical', // 滚动方向
      gestureOrientation: 'vertical', // 手势方向
      smoothWheel: true, // 平滑滚轮
    })

    // 将 Lenis 与 GSAP ScrollTrigger 同步
    lenis.on('scroll', ScrollTrigger.update)

    // 使用 GSAP ticker 驱动 Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // 关闭 GSAP ticker 的滞后平滑，避免与 Lenis 冲突
    gsap.ticker.lagSmoothing(0)

    // 清理函数
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div ref={containerRef} className="animejs-demo">
      {/* 滚动进度指示器 */}
      <ScrollProgress />

      {/* Hero 区域 */}
      <Hero />

      {/* 特性展示区域 */}
      <Features />

      {/* 模块可视化区域 */}
      <Modules />
    </div>
  )
}
