import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Feature } from '../../data/features'
import FeatureScene from './FeatureScene'

interface FeatureCardProps {
  feature: Feature
  index: number
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  // ===== 特性卡片滚动动画 =====
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 内容入场动画
      // 当卡片进入视口 80% 位置时开始动画
      gsap.from(contentRef.current, {
        y: 60, // 从下方 60px 处开始
        opacity: 0, // 从完全透明开始
        duration: 0.8, // 动画时长 0.8 秒
        ease: 'power2.out', // 先快后慢的缓动
        scrollTrigger: {
          trigger: cardRef.current, // 触发元素
          start: 'top 80%', // 当卡片顶部到达视口 80% 位置时开始
          end: 'top 50%', // 当卡片顶部到达视口 50% 位置时结束
          toggleActions: 'play none none reverse', // 进入时播放，离开时反向
        },
      })

      // 代码片段入场动画
      // 延迟 0.2 秒后开始，营造层次感
      gsap.from(codeRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2, // 延迟 0.2 秒
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 75%', // 稍微延迟触发
          end: 'top 45%',
          toggleActions: 'play none none reverse',
        },
      })

      // 3D 场景入场动画
      gsap.from(sceneRef.current, {
        x: 80, // 从右侧 80px 处开始
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      })
    }, cardRef)

    return () => ctx.revert()
  }, [])

  // 根据特性 ID 生成颜色类名
  const colorClass = `animejs-feature--${feature.color}`

  return (
    <article
      ref={cardRef}
      className={`animejs-feature ${colorClass}`}
      data-index={index}
    >
      {/* 左侧内容区域 */}
      <div className="animejs-feature__left">
        {/* 特性标题 */}
        <h3 className="animejs-feature__title">{feature.title}</h3>

        {/* 特性描述 */}
        <p className="animejs-feature__description">{feature.description}</p>

        {/* 代码片段区域 */}
        <div ref={codeRef} className="animejs-feature__code">
          <pre className="animejs-feature__pre">
            <code>{feature.code}</code>
          </pre>
        </div>
      </div>

      {/* 右侧 3D 场景区域 */}
      <div ref={sceneRef} className="animejs-feature__right">
        <FeatureScene sceneId={feature.id} />
      </div>
    </article>
  )
}
