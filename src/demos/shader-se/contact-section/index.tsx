import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './style.module.css'

gsap.registerPlugin(ScrollTrigger)

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 标题入场动画
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      }
    )

    // 内容卡片入场动画 - 使用 CSS Modules 类名
    const cards = contentRef.current?.querySelectorAll(`.${styles.contactCard}`)
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <h2 ref={titleRef} className={styles.contactTitle}>
          Let's Create Something{' '}
          <span className={styles.highlight}>Extraordinary Together</span>
        </h2>

        <div ref={contentRef} className={styles.contactContent}>
          {/* 主要联系方式 */}
          <div className={`${styles.contactCard} ${styles.primary}`}>
            <h3>Get in Touch</h3>
            <a href="mailto:hello@shader.se" className={styles.contactEmail}>
              hello@shader.se
            </a>
            <p className={styles.contactBooking}>
              <a href="https://cal.com" target="_blank" rel="noopener noreferrer">
                Book a Meeting
              </a>
            </p>
          </div>

          {/* 地址 */}
          <div className={styles.contactCard}>
            <h3>Visit Us</h3>
            <address>
              Laxholmstorget 3<br />
              602 21 Norrkoping<br />
              Sweden
            </address>
          </div>

          {/* 社交链接 */}
          <div className={styles.contactCard}>
            <h3>Follow Us</h3>
            <div className={styles.socialLinks}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                X
              </a>
            </div>
          </div>

          {/* 商务合作 */}
          <div className={styles.contactCard}>
            <h3>New Business</h3>
            <a href="mailto:ceo@shader.se" className={styles.contactEmail}>
              ceo@shader.se
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
