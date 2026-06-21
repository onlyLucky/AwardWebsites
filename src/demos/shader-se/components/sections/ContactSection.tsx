import { motion } from 'framer-motion'

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

// 联系方式数据
const contactInfo = [
  {
    label: 'General Inquiries',
    value: 'hello@shader.se',
    href: 'mailto:hello@shader.se',
  },
  {
    label: 'New Business',
    value: 'ceo@shader.se',
    href: 'mailto:ceo@shader.se',
  },
  {
    label: 'Book a Call',
    value: 'cal.com/simon-hedlund',
    href: 'https://cal.com/simon-hedlund-kglzne',
  },
  {
    label: 'Address',
    value: 'Laxholmstorget 3, 602 21 Norrkoping, Sweden',
    href: null,
  },
]

// 社交链接数据
const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/shader-se',
    icon: 'in',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/shadersweden',
    icon: 'ig',
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/shadersweden',
    icon: 'X',
  },
]

export function ContactSection() {
  return (
    <section className="shader-se-section shader-se-contact" id="contact">
      <motion.div
        className="shader-se-contact__content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.h2 className="shader-se-contact__title" variants={itemVariants}>
          Get in Touch
        </motion.h2>

        <motion.div className="shader-se-contact__grid" variants={itemVariants}>
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              className="shader-se-contact__item"
              variants={itemVariants}
            >
              <div className="shader-se-contact__item-label">{item.label}</div>
              <div className="shader-se-contact__item-value">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="shader-se-contact__social" variants={itemVariants}>
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="shader-se-contact__social-link"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          style={{
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.875rem',
              opacity: 0.5,
              marginBottom: '1rem',
            }}
          >
            &copy; {new Date().getFullYear()} Shader Development Studio. All rights reserved.
          </p>
          <a
            href="/accessibility-statement"
            style={{
              fontSize: '0.75rem',
              color: '#fff',
              textDecoration: 'none',
              opacity: 0.4,
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            Accessibility Statement
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
