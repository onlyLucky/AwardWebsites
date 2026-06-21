import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useProjectsStore } from '../../store/useProjectsStore'
import { projects } from '../../data/projects'

// 动画配置
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

export function ProjectsSection() {
  const currentIndex = useProjectsStore((state) => state.currentIndex)
  const setCurrentIndex = useProjectsStore((state) => state.setCurrentIndex)
  const nextProject = useProjectsStore((state) => state.nextProject)
  const prevProject = useProjectsStore((state) => state.prevProject)
  const isDragging = useProjectsStore((state) => state.isDragging)
  const setIsDragging = useProjectsStore((state) => state.setIsDragging)
  const dragStartX = useRef(0)

  // 初始化项目数据
  if (useProjectsStore.getState().projects.length === 0) {
    useProjectsStore.getState().setProjects(projects)
  }

  const currentProject = projects[currentIndex]

  // 拖拽处理
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragStartX.current = e.clientX
    setIsDragging(true)
  }, [setIsDragging])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return

    const dragDistance = e.clientX - dragStartX.current
    const threshold = 50

    if (dragDistance > threshold) {
      prevProject()
    } else if (dragDistance < -threshold) {
      nextProject()
    }

    setIsDragging(false)
  }, [isDragging, nextProject, prevProject, setIsDragging])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [setIsDragging])

  return (
    <section className="shader-se-section shader-se-projects" id="selected-work">
      <motion.div
        className="shader-se-projects__content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1200px',
          padding: '0 2rem',
        }}
      >
        <motion.div variants={itemVariants} style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            Selected Work
          </h2>
          <p
            style={{
              fontSize: '1.125rem',
              opacity: 0.7,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Explore our portfolio of award-winning digital experiences
          </p>
        </motion.div>

        {/* 项目轮播 */}
        <motion.div
          className="shader-se-projects__carousel"
          variants={itemVariants}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* 导航箭头 */}
          <button
            className="shader-se-projects__nav shader-se-projects__nav--prev"
            onClick={(e) => {
              e.stopPropagation()
              prevProject()
            }}
            aria-label="Previous project"
          >
            &#8592;
          </button>

          <button
            className="shader-se-projects__nav shader-se-projects__nav--next"
            onClick={(e) => {
              e.stopPropagation()
              nextProject()
            }}
            aria-label="Next project"
          >
            &#8594;
          </button>

          {/* 项目卡片 */}
          <motion.div
            className="shader-se-projects__card"
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="shader-se-projects__card-image"
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '4rem',
                  fontWeight: 700,
                  opacity: 0.1,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                }}
              >
                {currentProject.title.charAt(0)}
              </div>
            </div>

            <div className="shader-se-projects__card-overlay">
              <h3 className="shader-se-projects__card-title">{currentProject.title}</h3>
              <p className="shader-se-projects__card-subtitle">{currentProject.subtitle}</p>
            </div>
          </motion.div>

          {/* 项目指示器 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem',
            }}
          >
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: index === currentIndex ? '#fff' : 'rgba(255, 255, 255, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* 项目详情 */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: '3rem',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '3rem auto 0',
          }}
        >
          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              opacity: 0.7,
              marginBottom: '1.5rem',
            }}
          >
            {currentProject.description}
          </p>
          {currentProject.site_link && (
            <a
              href={currentProject.site_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
              }}
            >
              Visit Website
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
