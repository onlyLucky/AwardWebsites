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
      id="toolbox"
      className="home-section-container home-section-light"
      data-chapter="toolbox"
      data-label="TOOLBOX"
      data-enter-offset="-=100lvh"
      data-leave-offset="-=10lvh"
    >
      <div className="home-section fixed-section">
        <div className="home-section-content">
          <div className="home-section-text text-layout home-section-text-short">
            <h2 className="section-heading text-xxl">
              The complete{' '}
              <br />
              animator's toolbox
            </h2>
            <p className="section-sub-heading">
              Break free from browser limitations and animate anything on the
              web with a single API.
            </p>
          </div>
          <div className="toolbox-labels-container layout-container">
            <div className="toolbox-labels">
              <ul className="toolbox-labels-left">
                {toolboxLabelsLeft.map((label, i) => (
                  <li
                    key={i}
                    className={`toolbox-label${i === activeLeft ? ' is-active' : ''}`}
                  >
                    {label}
                  </li>
                ))}
              </ul>
              <ul className="toolbox-labels-right">
                {toolboxLabelsRight.map((label, i) => (
                  <li
                    key={i}
                    className={`toolbox-label${i === activeRight ? ' is-active' : ''}`}
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
      <div className="section-spacer"></div>
      <div className="section-spacer"></div>
      <div className="section-spacer"></div>
      <div className="section-spacer"></div>
    </section>
  )
}
