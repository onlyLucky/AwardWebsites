// ===== Sub Nav 组件 =====
// 对应源码 sub-nav
// 包含滚动进度条和代码片段展示
// 通过 IntersectionObserver 检测各 section 进入视口
// 通过 useScrollProgress Hook 同步滚动游标位置

import { useEffect, useRef, useState } from 'react'
import { useScrollProgress } from '@/demos/animejs/hooks/useScrollProgress'
import { getModuleTotalSize, getModulesList } from '@/demos/animejs/components/home/modules'
import FundingLevel from '../web-components/funding-level'
import { subNavStyles, modulesStyles, commonStyles } from '@/demos/animejs/styles'

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
  const progressCardRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [showProgress, setShowProgress] = useState(false)

  // 使用 IntersectionObserver 检测哪个 section 在视口中央
  useEffect(() => {
    const targets: Element[] = []
    FEATURE_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) targets.push(el)
    })
    const modulesEl = document.getElementById('modules')
    if (modulesEl) targets.push(modulesEl)
    const sponsorsEl = document.getElementById('sponsors')
    if (sponsorsEl) targets.push(sponsorsEl)

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
      // ghost 跟随
      if (ghostRef.current) {
        ghostRef.current.style.transform = `translateX(${progress * 100}%)`
      }
      // 进度卡片显示
      setShowProgress(progress > 0.02)
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

  const modules = getModulesList()
  const totalSize = getModuleTotalSize()

  return (
    <div className={subNavStyles['sub-nav']}>
      {/* 滚动进度条 */}
      <div
        ref={progressCardRef}
        className={subNavStyles['home-progress-card']}
        style={{ opacity: showProgress ? 1 : 0, pointerEvents: showProgress ? 'auto' : 'none' }}
      >
        <div className={subNavStyles['scroll-bar']}>
          <div ref={cursorRef} className={subNavStyles['scroll-cursor']} style={{ transform: 'translateX(0%)' }}></div>
          <div
            ref={ghostRef}
            className={`${subNavStyles['scroll-cursor-ghost']} ${subNavStyles['scroll-cursor']}`}
            style={{ transform: 'translateX(0%)' }}
          ></div>
        </div>
      </div>

      {/* 代码片段: 8 个特性 */}
      {FEATURE_IDS.map((id) => (
        <pre key={id} data-card={id} style={{ opacity: activeCard === id ? 1 : 0 }}>
          <code>{CODE_SNIPPETS[id]}</code>
        </pre>
      ))}

      {/* 模块可视化卡片 */}
      <div
        className={`${modulesStyles['modules-sizes']} ${subNavStyles['home-section-card']} ${commonStyles['text-layout']}`}
        data-card='modules'
        data-enter-offset='-=50lvh'
        data-leave-offset='-=150lvh'
        style={{ opacity: activeCard === 'modules' ? 1 : 0 }}
      >
        <div className={modulesStyles['box-heading']}>
          <h3>Bundle size</h3>
          <div className={modulesStyles['modules-bundle-size']}>
            <span className={modulesStyles['size']}>{totalSize}</span> KB
          </div>
        </div>
        <div className={`${modulesStyles['modules-sizes-chart']} ${modulesStyles['chart']}`}>
          {modules.map((m) => (
            <div
              key={m.name}
              data-size={m.size}
              className={`${modulesStyles['chart-bar']} module-${m.color} ${modulesStyles[`color-${m.color}`]}`}
              style={{ ['--data-size' as any]: (m.size / MAX_BAR_SIZE) * 100 }}
            ></div>
          ))}
        </div>
        <ul className={modulesStyles['modules-list']}>
          {modules.map((m) => (
            <li key={m.name}>
              <span className={`${modulesStyles['label-dot']} ${modulesStyles[`color-${m.color}`]}`}></span>
              {m.name} <span className={modulesStyles['size']}>{m.size} KB</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 赞助级别卡片 */}
      <div
        className={`${subNavStyles['funding-level-box']} ${subNavStyles['home-section-card']} ${commonStyles['text-layout']}`}
        data-card='sponsors'
        data-enter-offset='-=50lvh'
        data-leave-offset='-=50lvh'
        style={{ opacity: activeCard === 'sponsors' ? 1 : 0 }}
      >
        <FundingLevel path='github-sponsors' />
      </div>
    </div>
  )
}
