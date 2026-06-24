// ===== useScrollProgress Hook =====
// 使用 requestAnimationFrame 节流,同步 window.scrollY 滚动进度
// 返回 ref { current: 0-1 进度值 }

import { useEffect, useRef } from 'react'

export function useScrollProgress(): React.MutableRefObject<number> {
  const progressRef = useRef(0)

  useEffect(() => {
    let rafId: number | null = null
    let ticking = false

    const computeProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(computeProgress)
        ticking = true
      }
    }

    // 初始计算
    computeProgress()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return progressRef
}
