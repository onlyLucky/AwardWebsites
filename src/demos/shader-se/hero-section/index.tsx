import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ComputerScene from './computer-scene'
import styles from './style.module.css'

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 入场动画
    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.3'
      )

    // 滚动指示器呼吸动画
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      {/* 3D 场景背景 */}
      <div className={styles.hero3dContainer}>
        <ComputerScene />
      </div>

      {/* 内容层 */}
      <div className={styles.heroContent}>
        <h1 ref={titleRef} className={styles.heroTitle}>
          A Creative Development Studio,{' '}
          <span className={styles.highlight}>Plugged into the Future</span>
        </h1>
        <p ref={subtitleRef} className={styles.heroSubtitle}>
          We craft interactive digital experiences that push the boundaries of what's possible on the web.
        </p>
      </div>

      {/* 滚动指示器 */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <p>Scroll to Inspect Our Closed Deals</p>
        <svg
          className={styles.scrollArrow}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
