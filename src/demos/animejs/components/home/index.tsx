// ===== Home 组件 =====
// 对应源码 #home
// 包含所有 section 组件
// 通过 IntersectionObserver 给 feature-section 切换 is-in-view class
// 通过滚动驱动改变 body 背景色（浅色区域）

import { useEffect } from 'react'
import IntroSection from './intro'
import ToolboxSection from './toolbox'
import FeaturesGallerySection from './features-gallery'
import ModulesSection from './modules'
import SponsorsSection from './sponsors'
import GetStartedSection from './get-started'

export default function Home() {
  useEffect(() => {
    // 监听所有 feature-section 进入视口，控制 is-in-view 和 demo wrapper opacity
    if (typeof IntersectionObserver === 'undefined') return
    const targets = document.querySelectorAll<HTMLElement>('.feature-section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement
          const demoWrapper = section.querySelector<HTMLElement>('.feature-demo-wrapper')
          if (entry.isIntersecting) {
            section.classList.add('is-in-view')
            // 显示当前 section 的 demo 内容
            if (demoWrapper) {
              demoWrapper.style.opacity = '1'
              demoWrapper.style.pointerEvents = 'auto'
            }
          } else {
            // 离开视口时隐藏 demo 内容
            if (demoWrapper) {
              demoWrapper.style.opacity = '0'
              demoWrapper.style.pointerEvents = 'none'
            }
          }
        })
      },
      { threshold: 0.3 }
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  // 滚动驱动：fixed-section 的 opacity 切换 + body 背景色变化
  useEffect(() => {
    const allSections = document.querySelectorAll<HTMLElement>('[data-chapter]')
    const lightSections = document.querySelectorAll<HTMLElement>('.home-section-light')
    if (!allSections.length) return

    // 添加背景色过渡动画
    document.body.style.transition = 'background-color 0.25s ease-in-out'

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const scrollY = window.scrollY
        const viewH = window.innerHeight

        // 计算每个 section 的滚动进度，控制 fixed-section 的 opacity 和 z-index
        let activeSection: HTMLElement | null = null
        allSections.forEach((section) => {
          const fixedSection = section.querySelector<HTMLElement>('.fixed-section')
          if (!fixedSection) return
          const sectionTop = section.offsetTop
          const sectionH = section.offsetHeight
          // 计算 section 在视口中的位置进度
          // 当 section 顶部进入视口时开始显示，完全离开时隐藏
          const enterPoint = sectionTop - viewH
          const leavePoint = sectionTop + sectionH
          let opacity: number
          if (scrollY < enterPoint) {
            opacity = 0.001
          } else if (scrollY > leavePoint) {
            opacity = 0.001
          } else {
            // 在进入和离开之间，opacity 从 1 到 0
            const fadeIn = Math.min(1, (scrollY - enterPoint) / viewH)
            const fadeOut = Math.min(1, (leavePoint - scrollY) / viewH)
            opacity = Math.min(fadeIn, fadeOut)
            opacity = Math.max(0.001, opacity)
          }
          fixedSection.style.opacity = String(opacity)
          if (opacity > 0.5) {
            activeSection = section
          }
        })
        // 给活跃 section 的 fixed-section 最高 z-index
        allSections.forEach((section) => {
          const fixedSection = section.querySelector<HTMLElement>('.fixed-section')
          if (!fixedSection) return
          fixedSection.style.zIndex = section === activeSection ? '2' : '0'
        })

        // 隐藏 intro 区域的底部固定按钮（滚动超过 intro 后隐藏）
        const fixedContainer = document.querySelector<HTMLElement>('.fixed-container.heading-links')
        if (fixedContainer) {
          const introSection = document.getElementById('intro')
          if (introSection) {
            const introBottom = introSection.offsetTop + introSection.offsetHeight
            fixedContainer.style.opacity = scrollY > introBottom * 0.3 ? '0' : '1'
            fixedContainer.style.pointerEvents = scrollY > introBottom * 0.3 ? 'none' : 'auto'
          }
        }

        // body 背景色切换（仅当 fixed-section 可见时才切换）
        let isLight = false
        lightSections.forEach((section) => {
          const fixedSection = section.querySelector<HTMLElement>('.fixed-section')
          if (!fixedSection) return
          const opacity = parseFloat(fixedSection.style.opacity || '0')
          if (opacity > 0.3) {
            isLight = true
          }
        })
        if (isLight) {
          document.body.classList.add('is-light')
          document.body.style.backgroundColor = '#DAD5D0'
        } else {
          document.body.classList.remove('is-light')
          document.body.style.backgroundColor = '#252423'
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.body.classList.remove('is-light')
      document.body.style.backgroundColor = ''
      document.body.style.transition = ''
    }
  }, [])

  return (
    <main id='home' className='w-full flex-col relative z-[1] flex flex-wrap flex-row max-w-[1500px]'>
      <IntroSection />
      <ToolboxSection />
      <FeaturesGallerySection />
      <ModulesSection />
      <SponsorsSection />
      <GetStartedSection />
    </main>
  )
}
