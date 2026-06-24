// ===== Home 组件 =====
// 对应源码 #home
// 包含所有 section 组件
// 通过 IntersectionObserver 给 feature-section 切换 is-in-view class

import { useEffect } from 'react'
import styles from '@/demos/animejs/styles/animejs.module.css'
import IntroSection from './intro'
import ToolboxSection from './toolbox'
import FeaturesGallerySection from './features-gallery'
import ModulesSection from './modules'
import SponsorsSection from './sponsors'
import GetStartedSection from './get-started'

export default function Home() {
  useEffect(() => {
    // 监听所有 feature-section 进入视口
    if (typeof IntersectionObserver === 'undefined') return
    const featureSectionClass = styles['feature-section']
    const isInViewClass = styles['is-in-view']
    if (!featureSectionClass || !isInViewClass) return
    const targets = document.querySelectorAll<HTMLElement>(`.${featureSectionClass}`)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(isInViewClass)
          }
        })
      },
      { threshold: 0.3 }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <main id="home" className={styles['layout-container']}>
      <IntroSection />
      <ToolboxSection />
      <FeaturesGallerySection />
      <ModulesSection />
      <SponsorsSection />
      <GetStartedSection />
    </main>
  )
}
