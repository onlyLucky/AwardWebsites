import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  // ===== 滚动进度指示器动画 =====
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 创建滚动进度动画
      // 当页面滚动时，进度条宽度从 0% 到 100%
      gsap.to(progressRef.current, {
        width: '100%', // 目标宽度 100%
        ease: 'none', // 线性进度，无缓动
        scrollTrigger: {
          trigger: document.documentElement, // 触发元素为整个页面
          start: 'top top', // 从页面顶部开始
          end: 'bottom bottom', // 到页面底部结束
          scrub: 0.3, // 平滑跟随滚动，延迟 0.3 秒
          onUpdate: (self) => {
            // self.progress 范围 0-1
            // 可以在这里添加其他同步逻辑
          },
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="animejs-scroll-progress">
      {/* 进度条容器 */}
      <div className="animejs-scroll-progress__track">
        {/* 进度条填充 */}
        <div
          ref={progressRef}
          className="animejs-scroll-progress__fill"
          style={{ width: '0%' }} // 初始宽度 0%
        />
      </div>
    </div>
  )
}
