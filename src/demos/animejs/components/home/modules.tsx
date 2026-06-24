// ===== Modules Section 组件 =====
// 对应源码 #modules (模块可视化)
// 包含标题、描述、Bundle size 图表（动态生成）

import { modules, totalSize } from '@/demos/animejs/data/features'

// 用于 chart-bar 宽度的最大尺寸（KB）
const MAX_BAR_SIZE = 6.41

export default function ModulesSection() {
  return (
    <section
      id="modules"
      className="home-section-container home-section-light"
      data-chapter="modules"
      data-label="MODULES"
      data-enter-offset="+=10lvh"
      data-leave-offset="-=75lvh"
    >
      <section className="home-section fixed-section">
        <div className="home-section-content">
          <div className="home-section-text text-layout home-section-text-short">
            <h2 className="section-heading text-xxl">
              A lightweight{' '}
              <br />
              and modular API
            </h2>
            <p className="section-sub-heading">
              Keep your bundle size small by only importing the parts you need.
            </p>
          </div>
        </div>
      </section>

      {/* 章节间距 */}
      <div className="section-spacer"></div>
      <div className="section-spacer"></div>
      <div className="section-spacer"></div>
      <div className="section-spacer"></div>
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
