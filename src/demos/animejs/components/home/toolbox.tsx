// ===== Toolbox Section 组件 =====
// 对应源码 #toolbox (工具箱介绍)
// 包含标题、描述、工具箱标签列表

import { useRef } from 'react'
import { toolboxLabelsLeft, toolboxLabelsRight } from '@/demos/animejs/data/features'

export default function ToolboxSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id='toolbox'
      className='home-section-container home-section-light relative w-full'
      data-chapter='toolbox'
      data-label='TOOLBOX'
      data-enter-offset='-=100lvh'
      data-leave-offset='-=10lvh'
    >
      <div className='home-section fixed-section w-full h-lvh px-4 md:px-16'>
        <div className='home-section-content w-full h-dvh max-h-[64rem] p-4 md:p-16'>
          <div className='home-section-text relative z-[1] flex flex-col w-full md:w-[432px] md:max-w-[432px] md:mb-16 md:items-start md:text-left'>
            <h2 className='text-xxl font-extrabold leading-[0.95em] mb-5 text-[var(--hex-bg-3)]'>
              The complete <br />
              animator's toolbox
            </h2>
            <p className='text-l font-semibold leading-[1.25em] text-[var(--hex-bg-4)]'>
              Break free from browser limitations and animate anything on the web with a single API.
            </p>
          </div>
          <div className='toolbox-labels-container layout-container absolute left-0 right-0 bottom-16 px-4 md:px-16'>
            <div className='toolbox-labels flex justify-between'>
              <ul className='toolbox-labels-left list-none p-0 m-0' style={{ fontSize: 'var(--text-s)', fontWeight: 700, color: 'var(--hex-bg-4)', lineHeight: '1.5em' }}>
                {toolboxLabelsLeft.map((label, i) => (
                  <li key={i}>{label}</li>
                ))}
              </ul>
              <ul className='toolbox-labels-right list-none p-0 m-0 text-right' style={{ fontSize: 'var(--text-s)', fontWeight: 700, color: 'var(--hex-bg-4)', lineHeight: '1.5em' }}>
                {toolboxLabelsRight.map((label, i) => (
                  <li key={i}>{label}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 章节间距 */}
      <div className='section-spacer h-lvh pointer-events-none'></div>
      <div className='section-spacer h-lvh pointer-events-none'></div>
      <div className='section-spacer h-lvh pointer-events-none'></div>
      <div className='section-spacer h-lvh pointer-events-none'></div>
    </section>
  )
}
