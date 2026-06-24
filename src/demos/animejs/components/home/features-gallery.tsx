// ===== Features Gallery Section 组件 =====
// 对应源码 #features-gallery (特性展示区域)
// 包含 8 个子特性

import styles from '@/demos/animejs/styles/animejs.module.css'

// SVG 箭头图标组件
function ArrowIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={styles.icon}>
      <g fill='none' fillRule='evenodd'>
        <polygon
          fill='currentColor'
          fillRule='nonzero'
          points='17.737 11.987 12.5 17.225 11.263 15.987 14.388 12.862 6.5 12.862 6.5 11.112 14.388 11.112 11.263 7.987 12.5 6.75'
        />
      </g>
    </svg>
  )
}

export default function FeaturesGallerySection() {
  return (
    <section id='features-gallery' data-label='FEATURES'>
      {/* 特性 1: Intuitive API */}
      <section
        id='intuitive'
        className={`${styles['home-section']} ${styles['feature-section']} ${styles['text-layout']} ${styles['color-getting-started']}`}
        data-chapter='intuitive'
        data-demo='intuitive'
      >
        <div className={styles['home-section-content']}>
          <div className={styles['home-section-text']}>
            <div className={styles['home-section-text-heading']}>
              <h2>Intuitive API</h2>
              <p>Animate faster with an easy-to-use, yet powerful animation API.</p>
            </div>
            <ul className={styles['feature-links']}>
              <li>
                <a className='text-ui' href='documentation/animation/tween-parameters/composition.html'>
                  <ArrowIcon />
                  Per property parameters
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/animation/tween-parameters/composition.html'>
                  <ArrowIcon />
                  Flexible keyframes system
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/animation/tween-parameters/composition.html'>
                  <ArrowIcon />
                  Built-in easings
                </a>
              </li>
            </ul>
          </div>
          <div className={styles['feature-section-demo-wrapper']}>
            <div className={`${styles['feature-section-demo']} ${styles['fixed-section']}`}></div>
          </div>
        </div>
      </section>

      {/* 特性 2: Enhanced transforms */}
      <section
        id='composition'
        className={`${styles['home-section']} ${styles['feature-section']} ${styles['text-layout']} ${styles['color-animation']}`}
        data-chapter='composition'
        data-demo='composition'
      >
        <div className={styles['home-section-content']}>
          <div className={styles['home-section-text']}>
            <div className={styles['home-section-text-heading']}>
              <h2>Enhanced transforms</h2>
              <p>Smoothly blend individual CSS transform properties with a versatile composition API.</p>
            </div>
            <ul className={styles['feature-links']}>
              <li>
                <a className='text-ui' href='documentation/animation/animatable-properties/css-transforms.html'>
                  <ArrowIcon />
                  Individual CSS Transforms
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/animation/tween-value-types/function-based.html'>
                  <ArrowIcon />
                  Function based values
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/animation/tween-parameters/composition.html'>
                  <ArrowIcon />
                  Blend composition
                </a>
              </li>
            </ul>
          </div>
          <div className={styles['feature-section-demo-wrapper']}>
            <div className={`${styles['feature-section-demo']} ${styles['fixed-section']}`}></div>
          </div>
        </div>
      </section>

      {/* 特性 3: Scroll Observer */}
      <section
        id='scroll'
        className={`${styles['home-section']} ${styles['feature-section']} ${styles['text-layout']} ${styles['color-turquoise']}`}
        data-chapter='scroll'
        data-demo='scroll'
      >
        <div className={styles['home-section-content']}>
          <div className={styles['home-section-text']}>
            <div className={styles['home-section-text-heading']}>
              <h2>Scroll Observer</h2>
              <p>Synchronise and trigger animations on scroll with the Scroll Observer API.</p>
            </div>
            <ul className={styles['feature-links']}>
              <li>
                <a className='text-ui' href='documentation/events/onscroll/scrollobserver-synchronisation-modes.html'>
                  <ArrowIcon />
                  Multiple synchronisation modes
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/events/onscroll/scrollobserver-thresholds.html'>
                  <ArrowIcon />
                  Advanced thresholds
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/events/onscroll/scrollobserver-callbacks.html'>
                  <ArrowIcon />
                  Complete set of callbacks
                </a>
              </li>
            </ul>
          </div>
          <div className={styles['feature-section-demo-wrapper']}>
            <div className={`${styles['feature-section-demo']} ${styles['fixed-section']}`}></div>
          </div>
        </div>
      </section>

      {/* 特性 4: Advanced staggering */}
      <section
        id='staggering'
        className={`${styles['home-section']} ${styles['feature-section']} ${styles['text-layout']} ${styles['color-utils']}`}
        data-chapter='staggering'
        data-demo='staggering'
      >
        <div className={styles['home-section-content']}>
          <div className={styles['home-section-text']}>
            <div className={styles['home-section-text-heading']}>
              <h2>Advanced staggering</h2>
              <p>Create stunning effects in seconds with the built-in Stagger utility function.</p>
            </div>
            <ul className={styles['feature-links']}>
              <li>
                <a className='text-ui' href='https://animejs.com/documentation/stagger/time-staggering'>
                  <ArrowIcon />
                  Time staggering
                </a>
              </li>
              <li>
                <a className='text-ui' href='https://animejs.com/documentation/stagger/values-staggering'>
                  <ArrowIcon />
                  Values staggering
                </a>
              </li>
              <li>
                <a className='text-ui' href='https://animejs.com/documentation/stagger/timeline-positions-staggering'>
                  <ArrowIcon />
                  Timeline positions staggering
                </a>
              </li>
            </ul>
          </div>
          <div className={styles['feature-section-demo-wrapper']}>
            <div className={`${styles['feature-section-demo']} ${styles['fixed-section']}`}></div>
          </div>
        </div>
      </section>

      {/* 特性 5: SVG toolset */}
      <section
        id='svgUtils'
        className={`${styles['home-section']} ${styles['feature-section']} ${styles['text-layout']} ${styles['color-svg']}`}
        data-chapter='svgUtils'
        data-demo='svgUtils'
      >
        <div className={styles['home-section-content']}>
          <div className={styles['home-section-text']}>
            <div className={styles['home-section-text-heading']}>
              <h2>SVG toolset</h2>
              <p>Morph shapes, follow motion paths, and draw lines easily with the built-in SVG utilities.</p>
            </div>
            <ul className={styles['feature-links']}>
              <li>
                <a className='text-ui' href='documentation/svg/morphto.html'>
                  <ArrowIcon />
                  Shape morphing
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/svg/createdrawable.html'>
                  <ArrowIcon />
                  Line drawing
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/svg/createmotionpath.html'>
                  <ArrowIcon />
                  Motion path
                </a>
              </li>
            </ul>
          </div>
          <div className={styles['feature-section-demo-wrapper']}>
            <div className={`${styles['feature-section-demo']} ${styles['fixed-section']}`}></div>
          </div>
        </div>
      </section>

      {/* 特性 6: Springs and draggable */}
      <section
        id='draggable'
        className={`${styles['home-section']} ${styles['feature-section']} ${styles['text-layout']} ${styles['color-draggable']}`}
        data-chapter='draggable'
        data-demo='draggable'
      >
        <div className={styles['home-section-content']}>
          <div className={styles['home-section-text']}>
            <div className={styles['home-section-text-heading']}>
              <h2>Springs and draggable</h2>
              <p>Drag, snap, flick and throw HTML elements with the fully-featured Draggable API.</p>
            </div>
            <ul className={styles['feature-links']}>
              <li>
                <a className='text-ui' href='documentation/draggable/draggable-settings.html'>
                  <ArrowIcon />
                  Versatile settings
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/draggable/draggable-callbacks.html'>
                  <ArrowIcon />
                  Comprehensive callbacks
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/draggable/draggable-methods.html'>
                  <ArrowIcon />
                  Useful methods
                </a>
              </li>
            </ul>
          </div>
          <div className={styles['feature-section-demo-wrapper']}>
            <div className={`${styles['feature-section-demo']} ${styles['fixed-section']}`}>
              <div className='draggable-container'>
                <div className='draggable'></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特性 7: Runs like clockwork */}
      <section
        id='clockwork'
        className={`${styles['home-section']} ${styles['feature-section']} ${styles['text-layout']} ${styles['color-timeline']}`}
        data-chapter='clockwork'
        data-demo='clockwork'
      >
        <div className={styles['home-section-content']}>
          <div className={styles['home-section-text']}>
            <div className={styles['home-section-text-heading']}>
              <h2>
                Runs like <br />
                clockwork
              </h2>
              <p>Orchestrate animation sequences and keep callbacks in sync with the powerful Timeline API.</p>
            </div>
            <ul className={styles['feature-links']}>
              <li>
                <a className='text-ui' href='documentation/timeline/add-animations.html'>
                  <ArrowIcon />
                  Synchronise animations
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/timeline/time-position.html'>
                  <ArrowIcon />
                  Advanced time positions
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/timeline/timeline-playback-settings.html'>
                  <ArrowIcon />
                  Playback settings
                </a>
              </li>
            </ul>
          </div>
          <div className={styles['feature-section-demo-wrapper']}>
            <div className={`${styles['feature-section-demo']} ${styles['fixed-section']}`}></div>
          </div>
        </div>
      </section>

      {/* 特性 8: Responsive animations */}
      <section
        id='responsive'
        className={`${styles['home-section']} ${styles['feature-section']} ${styles['text-layout']} ${styles['color-green']}`}
        data-chapter='responsive'
        data-demo='responsive'
      >
        <div className={styles['home-section-content']}>
          <div className={styles['home-section-text']}>
            <div className={styles['home-section-text-heading']}>
              <h2>Responsive animations</h2>
              <p>Make animations respond to media queries easily with the Scope API.</p>
            </div>
            <ul className={styles['feature-links']}>
              <li>
                <a className='text-ui' href='documentation/scope/scope-parameters/mediaqueries.html'>
                  <ArrowIcon />
                  Media queries
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/scope/scope-parameters/root.html'>
                  <ArrowIcon />
                  Custom root element
                </a>
              </li>
              <li>
                <a className='text-ui' href='documentation/scope/register-method-function.html'>
                  <ArrowIcon />
                  Scopped methods
                </a>
              </li>
            </ul>
          </div>
          <div className={styles['feature-section-demo-wrapper']}>
            <div className={`${styles['feature-section-demo']} ${styles['fixed-section']}`}></div>
          </div>
        </div>
      </section>
    </section>
  )
}
