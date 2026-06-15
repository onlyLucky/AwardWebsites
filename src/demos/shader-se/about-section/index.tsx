import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './style.module.css'

gsap.registerPlugin(ScrollTrigger)

function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

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

    // 内容淡入
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      }
    )

    // 图片淡入
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <h2 ref={titleRef} className={styles.aboutTitle}>
          Making Digital Storytelling{' '}
          <span className={styles.highlight}>More Playful, Powerful, and Alive</span>
        </h2>

        <div className={styles.aboutContent}>
          <div ref={contentRef} className={styles.aboutText}>
            <p>
              We are Shader, a creative development studio based in Norrkoping, Sweden.
              We specialize in crafting interactive digital experiences that push the
              boundaries of what's possible on the web.
            </p>
            <p>
              Our team combines expertise in 3D graphics, creative coding, and modern
              web technologies to create memorable digital experiences for brands worldwide.
            </p>

            {/* 客户 logo 云 */}
            <div className={styles.customersLogos}>
              <img
                src="/src/assets/images/shader-se/customers_logo_cloud.png"
                alt="Our Clients"
                className={styles.customersImage}
              />
            </div>
          </div>

          <div ref={imageRef} className={styles.aboutImage}>
            <img
              src="/src/assets/images/shader-se/team.webp"
              alt="Shader Team"
              className={styles.teamImage}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
