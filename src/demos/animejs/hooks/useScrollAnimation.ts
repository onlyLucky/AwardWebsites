import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ===== 滚动动画 Hook =====
// 提供基于 GSAP ScrollTrigger 的滚动动画功能

interface UseScrollAnimationOptions {
  /** 触发位置，例如 'top 80%' */
  start?: string
  /** 结束位置，例如 'top 50%' */
  end?: string
  /** 是否平滑跟随滚动 */
  scrub?: boolean | number
  /** 进入时的动画 */
  onEnter?: () => void
  /** 离开时的动画 */
  onLeave?: () => void
}

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const elementRef = useRef<T>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const {
      start = 'top 80%',
      end = 'top 50%',
      scrub = false,
      onEnter,
      onLeave,
    } = options

    // 创建 ScrollTrigger 实例
    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      end,
      scrub,
      onEnter: () => {
        // 入场动画
        gsap.from(element, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
        onEnter?.()
      },
      onLeave: () => {
        onLeave?.()
      },
    })

    // 清理函数
    return () => {
      trigger.kill()
      animationRef.current?.kill()
    }
  }, [options.start, options.end, options.scrub])

  return elementRef
}

// ===== 滚动进度 Hook =====
// 返回当前滚动进度 (0-1)

export function useScrollProgress() {
  const progressRef = useRef(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current = maxScroll > 0 ? scrollY / maxScroll : 0
    }

    // 监听滚动事件
    window.addEventListener('scroll', updateProgress, { passive: true })

    // 初始化进度
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
    }
  }, [])

  return progressRef
}
