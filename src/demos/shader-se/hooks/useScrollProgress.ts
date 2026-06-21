import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import { useScrollStore } from '../store/useScrollStore'
import { usePagesStore } from '../store/usePagesStore'

// Lenis 滚动配置
const SCROLL_CONFIG = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false,
}

export function useScrollProgress() {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  const setLenis = useScrollStore((state) => state.setLenis)
  const setVelocity = useScrollStore((state) => state.setVelocity)
  const setDirection = useScrollStore((state) => state.setDirection)
  const setIsScrolling = useScrollStore((state) => state.setIsScrolling)
  const setScrollProgress = usePagesStore((state) => state.setScrollProgress)

  const handleScroll = useCallback(
    (lenis: Lenis) => {
      const { scroll, limit, velocity, direction, isScrolling } = lenis

      // 计算滚动进度 (0-1)
      const progress = limit > 0 ? scroll / limit : 0

      // 更新状态
      setScrollProgress(progress)
      setVelocity(velocity)
      setDirection(direction as 1 | -1)
      setIsScrolling(Boolean(isScrolling))
    },
    [setScrollProgress, setVelocity, setDirection, setIsScrolling]
  )

  useEffect(() => {
    // 初始化 Lenis
    const lenis = new Lenis({
      duration: SCROLL_CONFIG.duration,
      easing: SCROLL_CONFIG.easing,
      smoothWheel: SCROLL_CONFIG.smoothWheel,
      syncTouch: SCROLL_CONFIG.syncTouch,
    })

    lenisRef.current = lenis
    setLenis(lenis)

    // 监听滚动事件
    lenis.on('scroll', handleScroll)

    // RAF 循环
    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    // 清理
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      lenis.destroy()
      setLenis(null)
    }
  }, [setLenis, handleScroll])

  return lenisRef
}
