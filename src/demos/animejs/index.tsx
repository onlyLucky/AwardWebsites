// ===== Animejs Demo 根组件 =====
// 对应源码 <div class="page">
// 包含 header、home、sub-nav、footer、engine

import { useEffect, useRef } from 'react'
import Header from './components/header'
import Home from './components/home'
import SubNav from './components/sub-nav'
import Footer from './components/footer'
import Engine from './components/engine'
import './styles/animejs.css'

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
    <div ref={pageRef} className="page">
      {/* 1. 顶部导航 */}
      <Header />

      {/* 2. 主内容区域 */}
      <Home />

      {/* 3. 滚动进度和代码片段 */}
      <SubNav />

      {/* 4. 页脚 */}
      <Footer />

      {/* 5. 3D 引擎 */}
      <Engine />
    </div>
  )
}
