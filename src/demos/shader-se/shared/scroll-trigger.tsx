import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger)

interface ScrollContextType {
  scrollProgress: number
}

const ScrollContext = createContext<ScrollContextType>({
  scrollProgress: 0,
})

export const useScroll = () => useContext(ScrollContext)

interface ScrollProviderProps {
  children: ReactNode
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const progressRef = useRef(0)

  useEffect(() => {
    // 创建全局滚动触发器
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress
      },
    })

    return () => {
      trigger.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollProgress: progressRef.current }}>
      {children}
    </ScrollContext.Provider>
  )
}

// 自定义 hook: 用于创建滚动驱动动画
export function useScrollAnimation(
  elementRef: React.RefObject<HTMLElement | null>,
  animation: gsap.TweenVars,
  trigger?: ScrollTrigger.Vars
) {
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const tween = gsap.fromTo(
      element,
      animation.from || {},
      {
        ...animation,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          ...trigger,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [elementRef, animation, trigger])
}

// 自定义 hook: 获取滚动进度值
export function useScrollProgress(
  elementRef: React.RefObject<HTMLElement | null>,
  options?: { start?: string; end?: string }
) {
  const progressRef = useRef(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: options?.start || 'top center',
      end: options?.end || 'bottom center',
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress
      },
    })

    return () => {
      trigger.kill()
    }
  }, [elementRef, options?.start, options?.end])

  return progressRef
}
