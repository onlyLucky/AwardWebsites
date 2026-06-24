import { motion } from 'framer-motion'
import { usePagesStore } from '../../store/usePagesStore'
import { ScrollIndicator } from '../ui/ScrollIndicator'

// 动画配置
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

export function HeroSection() {
  const isInitialAnimationDone = usePagesStore((state) => state.isInitialAnimationDone)

  return (
    <section className='shader-se-hero' id='home'>
      <motion.div
        className='shader-se-hero__content'
        variants={containerVariants}
        initial='hidden'
        animate={isInitialAnimationDone ? 'visible' : 'hidden'}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 2rem',
        }}
      >
        <motion.h1 className='shader-se-hero__title' variants={itemVariants}>
          A Creative Development Studio,
          <br />
          Plugged into the Future
        </motion.h1>

        <motion.p className='shader-se-hero__subtitle' variants={itemVariants}>
          We build immersive digital experiences that blend art, technology, and storytelling.
        </motion.p>

        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        >
          <a
            href='#selected-work'
            style={{
              padding: '0.875rem 2rem',
              background: '#fff',
              color: '#000',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'all 0.3s ease',
            }}
          >
            View Our Work
          </a>
          <a
            href='#contact'
            style={{
              padding: '0.875rem 2rem',
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'all 0.3s ease',
            }}
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
