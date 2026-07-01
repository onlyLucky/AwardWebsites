// ===== Sub Nav 组件 =====
// 对应源码 sub-nav
// 包含滚动进度条和代码片段展示
// 通过 IntersectionObserver 检测各 section 进入视口
// 通过 useScrollProgress Hook 同步滚动游标位置

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useScrollProgress } from '@/demos/animejs/hooks/useScrollProgress'
import { getModuleTotalSize, getModulesList } from '@/demos/animejs/components/home/modules'

const FEATURE_IDS = [
  'intuitive',
  'composition',
  'scroll',
  'staggering',
  'svgUtils',
  'draggable',
  'clockwork',
  'responsive',
] as const

const CODE_SNIPPETS: Record<string, string> = {
  intuitive: `animate('.square', {
  rotate: 90,
  loop: true,
  ease: 'inOutExpo',
});`,
  composition: `animate('.shape', {
  x: random(-100, 100),
  y: random(-100, 100),
  rotate: random(-180, 180),
  duration: random(500, 1000),
  composition: 'blend',
});`,
  scroll: `animate(createDrawable('path'), {
  draw: ['0 0', '0 1', '1 1'],
  delay: stagger(40),
  ease: 'inOut(3)',
  autoplay: onScroll({ sync: true }),
});`,
  staggering: `const options = {
  grid: [13, 13],
  from: 'center',
};

createTimeline()
  .add('.dot', {
    scale: stagger([1.1, .75], options),
    ease: 'inOutQuad',
  }, stagger(200, options));`,
  svgUtils: `animate('.car', {
  ...createMotionPath('.circuit'),
});

animate(createDrawable('.circuit'), {
  draw: '0 1',
});

animate('.circuit-a', {
  d: morphTo('.circuit-b'),
});`,
  draggable: `createDraggable('.circle', {
  releaseEase: createSpring({
    stiffness: 120,
    damping: 6,
  })
});`,
  clockwork: `createTimeline()
  .add('.tick', {
    y: '-=6',
    duration: 50,
  }, stagger(10))
  .add('.ticker', {
    rotate: 360,
    duration: 1920,
  }, '<');`,
  responsive: `createScope({
  mediaQueries: {
    portrait: '(orientation: portrait)',
  }
})
.add(({ matches }) => {
  const isPortrait = matches.portrait;
  createTimeline().add('.circle', {
    y: isPortrait ? 0 : [-50, 50, -50],
    x: isPortrait ? [-50, 50, -50] : 0,
  }, stagger(100));
});`,
}

const MAX_BAR_SIZE = 6.41

export default function SubNav() {
  const scrollProgressRef = useScrollProgress()
  const cursorRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [showProgress, setShowProgress] = useState(false)
  const [scrollButtons, setScrollButtons] = useState<string[]>([])

  // 收集所有 data-chapter sections
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-chapter]')
    const ids: string[] = []
    sections.forEach((s) => {
      if (s.id) ids.push(s.id)
    })
    setScrollButtons(ids)
  }, [])

  // 使用 IntersectionObserver 检测哪个 section 在视口中央
  useEffect(() => {
    const targets: Element[] = []
    FEATURE_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) targets.push(el)
    })
    const modulesEl = document.getElementById('modules')
    if (modulesEl) targets.push(modulesEl)

    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id
            setActiveCard(id)
          }
        })
      },
      { threshold: 0, rootMargin: '-50% 0px -50% 0px' }
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  // 同步滚动游标位置
  useEffect(() => {
    let rafId: number | null = null
    const updateCursor = () => {
      rafId = null
      const progress = scrollProgressRef.current
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translateX(${progress * 100}%)`
      }
      if (ghostRef.current) {
        ghostRef.current.style.transform = `translateX(${progress * 100}%)`
      }
      // 进度卡片显示/隐藏（2%-98% 显示）
      setShowProgress(progress > 0.02 && progress < 0.98)
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(updateCursor)
    }

    // 立即更新一次
    updateCursor()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [scrollProgressRef])

  // 点击 scroll-button 跳转到对应 section
  const handleScrollButtonClick = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const modules = getModulesList()
  const totalSize = getModuleTotalSize()

  return (
    <div className='sub-nav'>
      {/* 滚动进度条 */}
      <div
        className='home-progress-card'
        style={{
          opacity: showProgress ? 1 : 0,
          transform: showProgress ? 'translateY(0)' : 'translateY(100%)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        {/* 滚动条背景 */}
        <div className='scroll-bar'>
          {/* 滚动按钮（每个 section 一个点） */}
          {scrollButtons.map((id, index) => (
            <a
              key={id}
              href={`#${id}`}
              className='scroll-button'
              onClick={(e) => {
                e.preventDefault()
                handleScrollButtonClick(id)
              }}
              style={{
                opacity: 0.5,
                width: `${100 / scrollButtons.length}%`,
              }}
            />
          ))}
          {/* 滚动游标 */}
          <div
            ref={cursorRef}
            className='scroll-cursor'
            style={{
              transform: 'translateX(0%)',
              willChange: 'transform',
            }}
          />
          {/* 幽灵游标 */}
          <div
            ref={ghostRef}
            className='scroll-cursor scroll-cursor-ghost'
            style={{
              transform: 'translateX(0%)',
              willChange: 'transform',
            }}
          />
        </div>
      </div>

      {/* 代码片段: 8 个特性 */}
      {FEATURE_IDS.map((id) => (
        <pre
          key={id}
          data-card={id}
          style={{
            opacity: activeCard === id ? 1 : 0,
            transform: activeCard === id ? 'translateY(0)' : 'translateY(120%)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          <code>{CODE_SNIPPETS[id]}</code>
        </pre>
      ))}

      {/* 模块可视化卡片 */}
      <div
        className='modules-sizes home-section-card text-layout'
        data-card='modules'
        data-enter-offset='-=50lvh'
        data-leave-offset='-=150lvh'
        style={{
          opacity: activeCard === 'modules' ? 1 : 0,
          transform: activeCard === 'modules' ? 'translateY(0)' : 'translateY(120%)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        <div className='box-heading'>
          <h3>Bundle size</h3>
          <div className='modules-bundle-size'>
            <span className='size'>{totalSize}</span> KB
          </div>
        </div>
        <div className='modules-sizes-chart chart'>
          {modules.map((m) => (
            <div
              key={m.name}
              data-size={m.size}
              className={`chart-bar module-${m.color} color-${m.color}`}
              style={{ width: `${(m.size / MAX_BAR_SIZE) * 100}%` }}
            />
          ))}
        </div>
        <ul className='modules-list'>
          {modules.map((m) => (
            <li key={m.name}>
              <span className={`label-dot color-${m.color}`} />
              {m.name} <span className='size'>{m.size} KB</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
