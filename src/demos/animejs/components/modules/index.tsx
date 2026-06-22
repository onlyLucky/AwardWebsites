import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { modules, totalSize } from '../../data/features'

export default function Modules() {
  const sectionRef = useRef<HTMLElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // ===== 模块可视化滚动动画 =====
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 图表柱状图入场动画
      // 每个柱子依次出现，营造波浪效果
      const bars = chartRef.current?.querySelectorAll('.animejs-modules__bar')
      if (bars) {
        gsap.from(bars, {
          scaleY: 0, // 从高度 0 开始
          opacity: 0, // 从完全透明开始
          duration: 0.6, // 动画时长 0.6 秒
          stagger: 0.1, // 每个柱子间隔 0.1 秒
          ease: 'power2.out', // 先快后慢
          transformOrigin: 'bottom', // 从底部开始伸展
          scrollTrigger: {
            trigger: sectionRef.current, // 触发元素
            start: 'top 70%', // 当区域顶部到达视口 70% 位置时开始
            toggleActions: 'play none none reverse',
          },
        })
      }

      // 模块列表入场动画
      const items = listRef.current?.querySelectorAll('li')
      if (items) {
        gsap.from(items, {
          x: -30, // 从左侧 30px 处开始
          opacity: 0,
          duration: 0.5,
          stagger: 0.05, // 每个项目间隔 0.05 秒
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // 计算最大模块大小，用于柱状图高度归一化
  const maxSize = Math.max(...modules.map((m) => m.size))

  return (
    <section ref={sectionRef} className="animejs-modules">
      <div className="animejs-modules__content">
        {/* 标题区域 */}
        <div className="animejs-modules__header">
          <h2 className="animejs-modules__title">
            A lightweight{' '}
            <br />
            and modular API
          </h2>
          <p className="animejs-modules__subtitle">
            Keep your bundle size small by only importing the parts you need.
          </p>
        </div>

        {/* Bundle size 卡片 */}
        <div className="animejs-modules__card">
          {/* 卡片标题 */}
          <div className="animejs-modules__card-header">
            <h3>Bundle size</h3>
            <div className="animejs-modules__total">
              <span className="animejs-modules__size">{totalSize.toFixed(2)}</span>{' '}
              KB
            </div>
          </div>

          {/* 柱状图 */}
          <div ref={chartRef} className="animejs-modules__chart">
            {modules.map((mod) => (
              <div
                key={mod.name}
                className={`animejs-modules__bar animejs-modules__bar--${mod.color}`}
                style={{
                  // 高度归一化：最大模块占 100%，其他按比例缩放
                  height: `${(mod.size / maxSize) * 100}%`,
                }}
                title={`${mod.name}: ${mod.size.toFixed(2)} KB`}
              />
            ))}
          </div>

          {/* 模块列表 */}
          <ul ref={listRef} className="animejs-modules__list">
            {modules.map((mod) => (
              <li key={mod.name} className="animejs-modules__item">
                <span
                  className={`animejs-modules__dot animejs-modules__dot--${mod.color}`}
                />
                <span className="animejs-modules__name">{mod.name}</span>
                <span className="animejs-modules__value">
                  {mod.size.toFixed(2)} KB
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
