// ===== Intro Section 组件 =====
// 对应源码 #intro (Hero 区域)
// 包含标题、副标题、npm 命令、Learn more 按钮

import { layoutStyles, commonStyles, introStyles } from '@/demos/animejs/styles'
import SponsorsList from '../web-components/sponsors-list'

export default function IntroSection() {
  return (
    <section id='intro' className={introStyles['animejs-intro']} data-chapter='intro' data-label='HEADING'>
      <div className={`${commonStyles['home-section']} ${commonStyles['text-layout']}`}>
        <div className={commonStyles['home-section-content']}>
          {/* 左侧文字内容 */}
          <div className={`${commonStyles['home-section-text']} ${commonStyles['home-section-text-short']}`}>
            <h2>
              All-in-one <br />
              animation <br />
              engine
              <span className={`animation-engine ${introStyles['red-dot']}`}>.</span>
            </h2>
            <p>
              A fast and flexible JavaScript <br />
              library to animate{' '}
              <span className={introStyles['animate-anything-wrapper']}>
                <span className={introStyles['animate-anything']}>the web</span>
                <span className='animate-anything-dot'>.</span>
              </span>
            </p>
            <p></p>
          </div>

          {/* 固定的行动按钮 */}
          <div className={`fixed-container ${introStyles['heading-links']}`}>
            <div className={layoutStyles['layout-container']}>
              <div className={introStyles['ui-group']}>
                <pre className={introStyles['npm-install']}>
                  <code>npm i animejs</code>
                </pre>
                <button className={`${introStyles['learn-more']} ui-input ui-button`}>
                  Learn more
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={commonStyles.icon}>
                    <g fill='none' fillRule='evenodd'>
                      <polygon
                        fill='currentColor'
                        fillRule='nonzero'
                        points='12 18 17.237 12.763 16 11.525 12.875 14.651 12.875 6.763 11.125 6.763 11.125 14.651 8 11.525 6.763 12.763'
                      />
                    </g>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={commonStyles.icon}>
                    <g fill='none' fillRule='evenodd'>
                      <polygon
                        fill='currentColor'
                        fillRule='nonzero'
                        points='12 18 17.237 12.763 16 11.525 12.875 14.651 12.875 6.763 11.125 6.763 11.125 14.651 8 11.525 6.763 12.763'
                      />
                    </g>
                  </svg>
                </button>
              </div>
              <div className={`${introStyles['heading-sponsors']} ${commonStyles['text-layout']}`}>
                <span className='text-xxs'>Sponsored by</span>
                <SponsorsList path='platinum-sponsors' size='small' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 章节间距 */}
      <div className={layoutStyles['section-spacer']}></div>
      <div className={layoutStyles['section-spacer']}></div>
    </section>
  )
}
