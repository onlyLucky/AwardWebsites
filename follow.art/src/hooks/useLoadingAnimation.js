import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function useLoadingAnimation() {
  const spinnerRef = useRef(null)
  const circlesRef = useRef([])

  useEffect(() => {
    if (!spinnerRef.current) return

    // 初始状态：圆点静止
    gsap.set(circlesRef.current, {
      scale: 1,
      y: 0
    })

    // 动画播放：圆点跳动
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0
    })

    circlesRef.current.forEach((circle, index) => {
      tl.to(circle, {
        y: -30,
        scale: 1.3,
        duration: 0.5,
        ease: 'power2.inOut',
        delay: index * 0.2
      })
    })

    circlesRef.current.forEach((circle, index) => {
      tl.to(circle, {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        delay: index * 0.2
      })
    })

    return () => {
      tl.kill()
    }
  }, [])

  return { spinnerRef, circlesRef }
}

export { useLoadingAnimation }
