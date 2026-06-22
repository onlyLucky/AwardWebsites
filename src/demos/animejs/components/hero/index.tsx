import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroAnimation from './HeroAnimation'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const npmRef = useRef<HTMLPreElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  // ===== Hero 区域入场动画 =====
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 创建时间线，编排多个动画
      const tl = gsap.timeline({
        defaults: {
          duration: 0.8, // 默认动画时长，单位秒
          ease: 'power2.out', // 默认缓动函数，先快后慢
        },
      })

      // 1. 标题文字入场动画
      // 从下方 50px 处开始，同时淡入
      tl.from(titleRef.current, {
        y: 50, // 从下方 50px 处开始
        opacity: 0, // 从完全透明开始
        duration: 1, // 覆盖默认时长
      })

      // 2. 副标题淡入，相对于上一个动画结束前 0.4 秒开始
      tl.from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
        },
        '-=0.4'
      )

      // 3. npm 命令淡入
      tl.from(
        npmRef.current,
        {
          y: 20,
          opacity: 0,
        },
        '-=0.3'
      )

      // 4. 滚动提示动画（持续循环）
      tl.from(
        scrollHintRef.current,
        {
          opacity: 0,
        },
        '-=0.2'
      )

      // 滚动提示的持续动画
      gsap.to(scrollHintRef.current, {
        y: 10, // 向下移动 10px
        duration: 1.5, // 动画时长 1.5 秒
        repeat: -1, // 无限重复
        yoyo: true, // 往返播放
        ease: 'sine.inOut', // 正弦缓动，平滑往返
      })
    }, sectionRef)

    // 清理函数，组件卸载时恢复所有动画
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="animejs-hero">
      {/* 左侧内容区域 */}
      <div className="animejs-hero__content">
        {/* 主标题 */}
        <h1 ref={titleRef} className="animejs-hero__title">
          All-in-one{' '}
          <br />
          animation{' '}
          <br />
          engine
          <span className="animejs-hero__dot">.</span>
        </h1>

        {/* 副标题 */}
        <p ref={subtitleRef} className="animejs-hero__subtitle">
          A fast and flexible JavaScript{' '}
          <br />
          library to animate{' '}
          <span className="animejs-hero__highlight">anything</span>
          <span className="animejs-hero__dot">.</span>
        </p>

        {/* npm 安装命令和按钮组 */}
        <div ref={npmRef} className="animejs-hero__actions">
          <pre className="animejs-hero__npm">
            <code>npm i animejs</code>
          </pre>
          <button className="animejs-hero__learn-more">
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 右侧 3D 动画区域 */}
      <div className="animejs-hero__animation-wrapper">
        <HeroAnimation />
      </div>

      {/* 滚动提示 */}
      <div ref={scrollHintRef} className="animejs-hero__scroll-hint">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
