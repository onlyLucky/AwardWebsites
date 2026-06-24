// ===== Modules Section 组件 =====
// 对应源码 #modules (模块可视化)
// 包含标题、描述、Bundle size 图表（动态生成）

import { modules, totalSize } from '@/demos/animejs/data/features'
import styles from '@/demos/animejs/styles/animejs.module.css'

// 用于 chart-bar 宽度的最大尺寸（KB）
const MAX_BAR_SIZE = 6.41

export default function ModulesSection() {
  return (
    <section
      id="modules"
      className={`home-section-container ${styles['home-section-light']}`}
      data-chapter="modules"
      data-label="MODULES"
      data-enter-offset="+=10lvh"
      data-leave-offset="-=75lvh"
    >
      <section className={`${styles['home-section']} ${styles['fixed-section']}`}>
        <div className={styles['home-section-content']}>
          <div className={`${styles['home-section-text']} ${styles['text-layout']} ${styles['home-section-text-short']}`}>
            <h2 className={`${styles['section-heading']} ${styles['text-xxl']}`}>
              A lightweight{' '}
              <br />
              and modular API
            </h2>
            <p className={styles['section-sub-heading']}>
              Keep your bundle size small by only importing the parts you need.
            </p>
          </div>
        </div>
      </section>

      {/* 章节间距 */}
      <div className={styles['section-spacer']}></div>
      <div className={styles['section-spacer']}></div>
      <div className={styles['section-spacer']}></div>
      <div className={styles['section-spacer']}></div>
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
