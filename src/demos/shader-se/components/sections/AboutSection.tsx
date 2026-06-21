import { motion } from 'framer-motion'

// 动画配置
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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

export function AboutSection() {
  return (
    <section className="shader-se-section shader-se-about" id="about">
      <motion.div
        className="shader-se-about__content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.h2 className="shader-se-about__title" variants={itemVariants}>
          Making Digital Storytelling More Playful, Powerful, and Alive
        </motion.h2>

        <motion.p className="shader-se-about__description" variants={itemVariants}>
          Shader is a Swedish creative development studio specializing in interactive 3D and AI-powered web solutions.
          We blend cutting-edge technology with artistic vision to create immersive digital experiences that captivate
          and engage audiences.
        </motion.p>

        <motion.p className="shader-se-about__description" variants={itemVariants}>
          Our team of designers, 3D artists, copywriters, animators, and creative technologists work together to push
          the boundaries of what's possible on the web. From WebGL experiments to interactive product visualizations,
          mobile apps to AI-driven experiences, we bring ideas to life in ways that surprise and delight.
        </motion.p>

        <motion.div variants={itemVariants}>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
              marginTop: '3rem',
            }}
          >
            Our Services
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              textAlign: 'left',
            }}
          >
            {[
              {
                title: 'WebGL Experiments',
                description: 'Interactive 3D experiences that push the boundaries of web graphics.',
              },
              {
                title: 'Product Visualization',
                description: 'Immersive product showcases that let customers explore in detail.',
              },
              {
                title: 'Mobile Apps',
                description: 'Cross-platform applications with stunning visual interfaces.',
              },
              {
                title: 'AI Experiences',
                description: 'Intelligent, adaptive interfaces powered by machine learning.',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <h4
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                  }}
                >
                  {service.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    opacity: 0.7,
                  }}
                >
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} style={{ marginTop: '3rem' }}>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}
          >
            How We Work
          </h3>
          <p className="shader-se-about__description">
            We operate as a modular team, assembling the right expertise for each project. Our collaborative approach
            ensures that every aspect of your digital experience is crafted with care and precision. Whether you need a
            complete website, an interactive installation, or a standalone 3D component, we adapt to your needs.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <a
            href="https://cal.com/simon-hedlund-kglzne"
            target="_blank"
            rel="noopener noreferrer"
            className="shader-se-about__cta"
          >
            Book a Call Today
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
