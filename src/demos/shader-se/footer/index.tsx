import styles from './style.module.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.shaderFooter}>
      <div className={styles.footerContainer}>
        {/* 团队照片 */}
        <div className={styles.footerImage}>
          <img
            src="/src/assets/images/shader-se/footer.webp"
            alt="Shader Team"
          />
        </div>

        {/* 版权信息 */}
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="2" />
              <line x1="5" y1="20" x2="55" y2="20" stroke="currentColor" strokeWidth="2" />
              <line x1="5" y1="28" x2="55" y2="28" stroke="currentColor" strokeWidth="2" />
              <line x1="5" y1="36" x2="55" y2="36" stroke="currentColor" strokeWidth="2" />
              <line x1="10" y1="44" x2="50" y2="44" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <p className={styles.copyright}>
            &copy; {currentYear} Shader Development Studio AB. All Rights Reserved.
          </p>

          <div className={styles.footerLinks}>
            <a
              href="/accessibility"
              target="_blank"
              rel="noopener noreferrer"
            >
              Accessibility Statement
            </a>
          </div>
        </div>

        {/* 证书 */}
        <div className={styles.footerCertificate}>
          <img
            src="/src/assets/images/shader-se/copyright_footer.png"
            alt="Certificate"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
