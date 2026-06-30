// ===== Toolbox Section 组件 =====
// 对应源码 #toolbox (工具箱介绍)
// 包含标题、描述、工具箱标签（左右切换显示）

import { useEffect, useRef, useState } from 'react'
import { toolboxLabelsLeft, toolboxLabelsRight } from '@/demos/animejs/data/features'

export default function ToolboxSection() {
  const [activeLeft, setActiveLeft] = useState(0)
  const [activeRight, setActiveRight] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<number | null>(null)

  // 滚动驱动切换左右工具名称
  useEffect(() => {
    const onScroll = () => {
      if (frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null
        const section = sectionRef.current
        if (!section) return
        const rect = section.getBoundingClientRect()
        const viewH = window.innerHeight
        if (rect.bottom < 0 || rect.top > viewH) return
        // 进度 0-1 (从进入视口到离开)
        const progress = Math.max(0, Math.min(1, 1 - (rect.top + rect.height) / (viewH + rect.height)))
        const leftIdx = Math.floor(progress * toolboxLabelsLeft.length) % toolboxLabelsLeft.length
        const rightIdx = Math.floor(progress * toolboxLabelsRight.length) % toolboxLabelsRight.length
        setActiveLeft(leftIdx)
        setActiveRight(rightIdx)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id='toolbox'
      className='flex flex-col justify-center w-full h-lvh px-[var(--margin-s)] max-w-[var(--max-box-width)]'
      style={{ color: 'var(--hex-fg-3)' }}
      data-chapter='toolbox'
      data-label='TOOLBOX'
      data-enter-offset='-=100lvh'
      data-leave-offset='-=10lvh'
    >
      <div className='flex flex-col justify-center w-full h-lvh px-[var(--margin-s)] opacity-[0.001] pointer-events-none fixed top-0 left-0'>
        <div className='relative w-full h-lvh py-[var(--margin-s)]'>
          <div className='relative z-[1] flex flex-col max-w-[var(--max-box-width)]'>
            <h2 className='font-bold leading-tight' style={{ fontSize: 'var(--text-xxl)' }}>
              The complete <br />
              animator's toolbox
            </h2>
            <p className='font-semibold' style={{ color: 'var(--hex-fg-2)' }}>
              Break free from browser limitations and animate anything on the web with a single API.
            </p>
          </div>
          <div className='mt-8 relative z-[1] flex flex-wrap flex-row w-full max-w-[1500px]'>
            <div className='flex justify-between gap-8'>
              <ul className='list-none p-0 m-0 flex-1 relative min-h-[1.5em] text-left'>
                {toolboxLabelsLeft.map((label, i) => (
                  <li
                    key={i}
                    className={`absolute top-0 left-0 pointer-events-none whitespace-nowrap transition-all duration-300 ${i === activeLeft ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                    style={{ fontSize: 'var(--text-l)', fontWeight: 700, color: 'var(--hex-bg-3)' }}
                  >
                    {label}
                  </li>
                ))}
              </ul>
              <ul className='list-none p-0 m-0 flex-1 relative min-h-[1.5em] text-right'>
                {toolboxLabelsRight.map((label, i) => (
                  <li
                    key={i}
                    className={`absolute top-0 right-0 pointer-events-none whitespace-nowrap transition-all duration-300 ${i === activeRight ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                    style={{ fontSize: 'var(--text-l)', fontWeight: 700, color: 'var(--hex-bg-3)' }}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 章节间距 */}
      <div className='h-lvh pointer-events-none'></div>
      <div className='h-lvh pointer-events-none'></div>
      <div className='h-lvh pointer-events-none'></div>
      <div className='h-lvh pointer-events-none'></div>
    </section>
  )
}
