// ===== Modules Section 组件 =====
// 对应源码 #modules (模块可视化)
// 包含标题、描述、Bundle size 图表（动态生成）

import { modules, totalSize } from '@/demos/animejs/data/features'

// 用于 chart-bar 宽度的最大尺寸（KB）
const MAX_BAR_SIZE = 6.41

export default function ModulesSection() {
  return (
    <section
      id='modules'
      className='flex flex-col justify-center w-full h-lvh px-[var(--margin-s)] max-w-[var(--max-box-width)]'
      style={{ color: 'var(--hex-fg-3)' }}
      data-chapter='modules'
      data-label='MODULES'
      data-enter-offset='+=10lvh'
      data-leave-offset='-=75lvh'
    >
      <section className='flex flex-col justify-center w-full h-lvh px-[var(--margin-s)] opacity-[0.001] pointer-events-none fixed top-0 left-0'>
        <div className='relative w-full h-lvh py-[var(--margin-s)]'>
          <div className='relative z-[1] flex flex-col max-w-[var(--max-box-width)]'>
            <h2 className='font-bold leading-tight' style={{ fontSize: 'var(--text-xxl)' }}>
              A lightweight <br />
              and modular API
            </h2>
            <p className='font-semibold' style={{ color: 'var(--hex-fg-2)' }}>
              Keep your bundle size small by only importing the parts you need.
            </p>
          </div>
        </div>
      </section>

      {/* 章节间距 */}
      <div className='h-lvh pointer-events-none'></div>
      <div className='h-lvh pointer-events-none'></div>
      <div className='h-lvh pointer-events-none'></div>
      <div className='h-lvh pointer-events-none'></div>
    </section>
  )
}

// 导出计算函数供 sub-nav 使用
export function getModuleChartBars() {
  return modules.map((m) => ({
    name: m.name,
    size: m.size,
    width: (m.size / MAX_BAR_SIZE) * 100,
    color: m.color,
  }))
}

export function getModuleTotalSize() {
  return totalSize.toFixed(2)
}

export function getModulesList() {
  return modules
}
