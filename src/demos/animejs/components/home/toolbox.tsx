// ===== Toolbox Section 组件 =====
// 对应源码 #toolbox (工具箱介绍)
// 包含标题、描述、工具箱标签（左右切换显示）

import { useEffect, useRef, useState } from 'react'
import { toolboxLabelsLeft, toolboxLabelsRight } from '@/demos/animejs/data/features'
import { layoutStyles, commonStyles, toolboxStyles } from '@/demos/animejs/styles'

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
      className={`home-section-container ${commonStyles['home-section-light']}`}
      data-chapter='toolbox'
      data-label='TOOLBOX'
      data-enter-offset='-=100lvh'
      data-leave-offset='-=10lvh'
    >
      <div className={`${commonStyles['home-section']} ${layoutStyles['fixed-section']}`}>
        <div className={commonStyles['home-section-content']}>
          <div
            className={`${commonStyles['home-section-text']} ${commonStyles['text-layout']} ${commonStyles['home-section-text-short']}`}
          >
            <h2 className={`${commonStyles['section-heading']} ${commonStyles['text-xxl']}`}>
              The complete <br />
              animator's toolbox
            </h2>
            <p className={commonStyles['section-sub-heading']}>
              Break free from browser limitations and animate anything on the web with a single API.
            </p>
          </div>
          <div className={`${toolboxStyles['toolbox-labels-container']} ${layoutStyles['layout-container']}`}>
            <div className={toolboxStyles['toolbox-labels']}>
              <ul className={toolboxStyles['toolbox-labels-left']}>
                {toolboxLabelsLeft.map((label, i) => (
                  <li
                    key={i}
                    className={`${toolboxStyles['toolbox-label']}${i === activeLeft ? ` ${toolboxStyles['is-active']}` : ''}`}
                  >
                    {label}
                  </li>
                ))}
              </ul>
              <ul className={toolboxStyles['toolbox-labels-right']}>
                {toolboxLabelsRight.map((label, i) => (
                  <li
                    key={i}
                    className={`${toolboxStyles['toolbox-label']}${i === activeRight ? ` ${toolboxStyles['is-active']}` : ''}`}
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
      <div className={layoutStyles['section-spacer']}></div>
      <div className={layoutStyles['section-spacer']}></div>
      <div className={layoutStyles['section-spacer']}></div>
      <div className={layoutStyles['section-spacer']}></div>
    </section>
  )
}
