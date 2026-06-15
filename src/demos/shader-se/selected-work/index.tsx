import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './style.module.css'

gsap.registerPlugin(ScrollTrigger)

// 项目数据
const projects = [
  {
    id: 1,
    title: 'eHealth Arena',
    subtitle: 'Digital Health Platform',
    description: 'An interactive 3D experience for a healthcare innovation hub.',
  },
  {
    id: 2,
    title: 'Select Concept',
    subtitle: 'Creative Agency',
    description: 'A bold visual identity and immersive web experience.',
  },
  {
    id: 3,
    title: 'Gamily',
    subtitle: 'Gaming Platform',
    description: 'Next-gen gaming interface with real-time 3D rendering.',
  },
  {
    id: 4,
    title: 'Alamance Foods',
    subtitle: 'Food & Beverage',
    description: 'Interactive product showcase with WebGL-powered visuals.',
  },
  {
    id: 5,
    title: 'Norrkopings Symfoniorkester',
    subtitle: 'Orchestra',
    description: 'A symphonic digital experience with audio-reactive visuals.',
  },
  {
    id: 6,
    title: 'Glasbolaget',
    subtitle: 'Glass Manufacturer',
    description: 'Premium glass products showcased through interactive 3D.',
  },
]

function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

    // 卡片入场动画 - 使用 CSS Modules 类名
    const cards = gridRef.current?.querySelectorAll(`.${styles.projectCard}`)
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            end: 'top 30%',
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
    <section ref={sectionRef} className={styles.selectedWork}>
      <div className={styles.sectionContainer}>
        <h2 ref={titleRef} className={styles.sectionTitle}>
          Selected Work
        </h2>

        <div ref={gridRef} className={styles.projectsGrid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.projectCard}>
              <div className={styles.projectThumbnail}>
                {/* 占位符 - 实际使用时替换为项目图片 */}
                <div className={styles.thumbnailPlaceholder}>
                  <span>{project.title.charAt(0)}</span>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectSubtitle}>{project.subtitle}</p>
                <p className={styles.projectDescription}>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SelectedWork
