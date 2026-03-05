import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import './Loading.less'

function Loading() {
  const [isLoading, setIsLoading] = useState(true)
  const [animationPlayed, setAnimationPlayed] = useState(false)
  const spinnerRef = useRef(null)
  const circlesRef = useRef([])

  useEffect(() => {
    console.log("useEffect1")
    const timer1 = setTimeout(() => {
      setAnimationPlayed(true)
    }, 2000)

    const timer2 = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  useEffect(() => {
    console.log("useEffect2")
    if (!spinnerRef.current || !animationPlayed) return

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

    /* circlesRef.current.forEach((circle, index) => {
      tl.to(circle, {
        y: -30,
        scale: 1.3,
        duration: 0.5,
        ease: 'power2.inOut',
        delay: index * 0.2
      })
    }) */

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
  }, [animationPlayed])

  if (!isLoading) return null

  return (
    <div className="loading-overlay">
      <div ref={spinnerRef} className={`loading-spinner ${animationPlayed ? 'animate' : ''}`}>
        {/* 三个圆点，用于实现跳动动画效果 */}
        <div ref={(el) => (circlesRef.current[0] = el)} className="loading-circle"></div>
        <div ref={(el) => (circlesRef.current[1] = el)} className="loading-circle"></div>
        <div ref={(el) => (circlesRef.current[2] = el)} className="loading-circle"></div>
      </div>
    </div>
  )
}

export default Loading
