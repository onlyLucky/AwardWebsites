// ===== Animejs Demo 根组件 =====
// 对应源码 <div class="page">
// 包含 header、home、sub-nav、footer、engine

import { useEffect, useRef } from 'react'
import Home from './components/home'
import SubNav from './components/sub-nav'
import Footer from './components/footer'
import Engine from './components/engine'
import './styles/tailwind.css'
import './styles/components.css'

export default function AnimejsDemo() {
  const pageRef = useRef<HTMLDivElement>(null)

  // 页面加载后添加 is-ready 类，触发淡入动画
  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    // 使用 requestAnimationFrame 确保在下一帧添加类
    const raf = requestAnimationFrame(() => {
      page.classList.add('is-ready')
    })

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className='animejs-root'>
      <div
        ref={pageRef}
        className='flex flex-col justify-start items-center w-full min-h-dvh overflow-x-hidden opacity-0 transition-opacity duration-300 [&.is-ready]:opacity-100'
        style={{
          backgroundColor: 'var(--hex-bg-1)',
          color: 'var(--hex-fg-1)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {/* 1. 主内容区域 */}
        <Home />

        {/* 3. 滚动进度和代码片段 */}
        <SubNav />

        {/* 4. 页脚 */}
        <Footer />

        {/* 5. 3D 引擎 */}
        <Engine />
      </div>
    </div>
  )
}
