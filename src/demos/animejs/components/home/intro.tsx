// ===== Intro Section 组件 =====
// 对应源码 #intro (Hero 区域)
// 包含标题、副标题、npm 命令、Learn more 按钮

import styles from '@/demos/animejs/styles/animejs.module.css'
import SponsorsList from '../web-components/sponsors-list'

export default function IntroSection() {
  return (
    <section id="intro" data-chapter="intro" data-label="HEADING">
      <div className={`${styles['home-section']} ${styles['text-layout']}`}>
        <div className={styles['home-section-content']}>
          {/* 左侧文字内容 */}
          <div className={`${styles['home-section-text']} ${styles['home-section-text-short']}`}>
            <h2>
              All-in-one{' '}
              <br />
              animation{' '}
              <br />
              engine
              <span className={`animation-engine ${styles['red-dot']}`}>.</span>
            </h2>
            <p>
              A fast and flexible JavaScript{' '}
              <br />
              library to animate{' '}
              <span className={styles['animate-anything-wrapper']}>
                <span className={styles['animate-anything']}>the web</span>
                <span className="animate-anything-dot">.</span>
              </span>
            </p>
            <p></p>
          </div>

          {/* 固定的行动按钮 */}
          <div className={`fixed-container ${styles['heading-links']}`}>
            <div className={styles['layout-container']}>
              <div className={styles['ui-group']}>
                <pre className={styles['npm-install']}>
                  <code>npm i animejs</code>
                </pre>
                <button className={`${styles['learn-more']} ui-input ui-button`}>
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}>
                    <g fill="none" fillRule="evenodd">
                      <polygon fill="currentColor" fillRule="nonzero" points="12 18 17.237 12.763 16 11.525 12.875 14.651 12.875 6.763 11.125 6.763 11.125 14.651 8 11.525 6.763 12.763" />
                    </g>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}>
                    <g fill="none" fillRule="evenodd">
                      <polygon fill="currentColor" fillRule="nonzero" points="12 18 17.237 12.763 16 11.525 12.875 14.651 12.875 6.763 11.125 6.763 11.125 14.651 8 11.525 6.763 12.763" />
                    </g>
                  </svg>
                </button>
              </div>
              <div className={`${styles['heading-sponsors']} ${styles['text-layout']}`}>
                <span className="text-xxs">Sponsored by</span>
                <SponsorsList path="platinum-sponsors" size="small" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 章节间距 */}
      <div className={styles['section-spacer']}></div>
      <div className={styles['section-spacer']}></div>
    </section>
  )
}
