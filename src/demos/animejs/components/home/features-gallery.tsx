// ===== Features Gallery Section 组件 =====
// 对应源码 #features-gallery (特性展示区域)
// 包含 8 个子特性

// SVG 箭头图标组件
function ArrowIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5'>
      <g fill='none' fillRule='evenodd'>
        <polygon fill='currentColor' fillRule='nonzero' points='17.737 11.987 12.5 17.225 11.263 15.987 14.388 12.862 6.5 12.862 6.5 11.112 14.388 11.112 11.263 7.987 12.5 6.75' />
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
        className='feature-section flex flex-col justify-center w-full h-lvh px-[var(--margin-s)] scroll-mt-[-45lvh] pointer-events-none'
        style={{ color: 'var(--hex-fg-3)' }}
        data-chapter='intuitive'
        data-demo='intuitive'
      >
        <div className='relative w-full h-lvh py-[var(--margin-s)] grid grid-cols-2 gap-16 items-center animejs-md:grid-cols-1'>
          <div className='relative z-[1] flex flex-col'>
            <div className='mb-[var(--margin-m)]' style={{ width: 'calc(100% - var(--margin-s) * 2)' }}>
              <h2 className='font-bold leading-[0.95em] tracking-[-0.0125em] mb-[0.365em]' style={{ fontSize: 'var(--text-xxl)' }}>Intuitive API</h2>
              <p className='font-semibold leading-[1.25em]' style={{ color: 'var(--hex-fg-2)', fontSize: 'var(--text-s)' }}>Animate faster with an easy-to-use, yet powerful animation API.</p>
            </div>
            <ul className='list-none p-0 m-0 hidden animejs-md:block relative w-full pt-[var(--margin-s)] pl-0'>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/animation/tween-parameters/composition.html'>
                  <ArrowIcon />
                  Per property parameters
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/animation/tween-parameters/composition.html'>
                  <ArrowIcon />
                  Flexible keyframes system
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/animation/tween-parameters/composition.html'>
                  <ArrowIcon />
                  Built-in easings
                </a>
              </li>
            </ul>
          </div>
          <div className='fixed top-0 left-0 w-full h-lvh'>
            <div className='opacity-[0.001] flex justify-center items-center flex-nowrap absolute z-[10] top-1/2 left-1/2 aspect-square w-[400px] h-auto -translate-x-1/2 -translate-y-1/2' style={{ color: 'var(--hex-fg-1)' }}></div>
          </div>
        </div>
      </section>

      {/* 特性 2: Enhanced transforms */}
      <section
        id='composition'
        className='feature-section flex flex-col justify-center w-full h-lvh px-[var(--margin-s)] scroll-mt-[-45lvh] pointer-events-none'
        style={{ color: 'var(--hex-fg-3)' }}
        data-chapter='composition'
        data-demo='composition'
      >
        <div className='relative w-full h-lvh py-[var(--margin-s)] grid grid-cols-2 gap-16 items-center animejs-md:grid-cols-1'>
          <div className='relative z-[1] flex flex-col'>
            <div className='mb-[var(--margin-m)]' style={{ width: 'calc(100% - var(--margin-s) * 2)' }}>
              <h2 className='font-bold leading-[0.95em] tracking-[-0.0125em] mb-[0.365em]' style={{ fontSize: 'var(--text-xxl)' }}>Enhanced transforms</h2>
              <p className='font-semibold leading-[1.25em]' style={{ color: 'var(--hex-fg-2)', fontSize: 'var(--text-s)' }}>Smoothly blend individual CSS transform properties with a versatile composition API.</p>
            </div>
            <ul className='list-none p-0 m-0 hidden animejs-md:block relative w-full pt-[var(--margin-s)] pl-0'>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/animation/animatable-properties/css-transforms.html'>
                  <ArrowIcon />
                  Individual CSS Transforms
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/animation/tween-value-types/function-based.html'>
                  <ArrowIcon />
                  Function based values
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/animation/tween-parameters/composition.html'>
                  <ArrowIcon />
                  Blend composition
                </a>
              </li>
            </ul>
          </div>
          <div className='fixed top-0 left-0 w-full h-lvh'>
            <div className='opacity-[0.001] flex justify-center items-center flex-nowrap absolute z-[10] top-1/2 left-1/2 aspect-square w-[400px] h-auto -translate-x-1/2 -translate-y-1/2' style={{ color: 'var(--hex-fg-1)' }}></div>
          </div>
        </div>
      </section>

      {/* 特性 3: Scroll Observer */}
      <section
        id='scroll'
        className='feature-section flex flex-col justify-center w-full h-lvh px-[var(--margin-s)] scroll-mt-[-45lvh] pointer-events-none'
        style={{ color: 'var(--hex-fg-3)' }}
        data-chapter='scroll'
        data-demo='scroll'
      >
        <div className='relative w-full h-lvh py-[var(--margin-s)] grid grid-cols-2 gap-16 items-center animejs-md:grid-cols-1'>
          <div className='relative z-[1] flex flex-col'>
            <div className='mb-[var(--margin-m)]' style={{ width: 'calc(100% - var(--margin-s) * 2)' }}>
              <h2 className='font-bold leading-[0.95em] tracking-[-0.0125em] mb-[0.365em]' style={{ fontSize: 'var(--text-xxl)' }}>Scroll Observer</h2>
              <p className='font-semibold leading-[1.25em]' style={{ color: 'var(--hex-fg-2)', fontSize: 'var(--text-s)' }}>Synchronise and trigger animations on scroll with the Scroll Observer API.</p>
            </div>
            <ul className='list-none p-0 m-0 hidden animejs-md:block relative w-full pt-[var(--margin-s)] pl-0'>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/events/onscroll/scrollobserver-synchronisation-modes.html'>
                  <ArrowIcon />
                  Multiple synchronisation modes
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/events/onscroll/scrollobserver-thresholds.html'>
                  <ArrowIcon />
                  Advanced thresholds
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/events/onscroll/scrollobserver-callbacks.html'>
                  <ArrowIcon />
                  Complete set of callbacks
                </a>
              </li>
            </ul>
          </div>
          <div className='fixed top-0 left-0 w-full h-lvh'>
            <div className='opacity-[0.001] flex justify-center items-center flex-nowrap absolute z-[10] top-1/2 left-1/2 aspect-square w-[400px] h-auto -translate-x-1/2 -translate-y-1/2' style={{ color: 'var(--hex-fg-1)' }}></div>
          </div>
        </div>
      </section>

      {/* 特性 4: Advanced staggering */}
      <section
        id='staggering'
        className='feature-section flex flex-col justify-center w-full h-lvh px-[var(--margin-s)] scroll-mt-[-45lvh] pointer-events-none'
        style={{ color: 'var(--hex-fg-3)' }}
        data-chapter='staggering'
        data-demo='staggering'
      >
        <div className='relative w-full h-lvh py-[var(--margin-s)] grid grid-cols-2 gap-16 items-center animejs-md:grid-cols-1'>
          <div className='relative z-[1] flex flex-col'>
            <div className='mb-[var(--margin-m)]' style={{ width: 'calc(100% - var(--margin-s) * 2)' }}>
              <h2 className='font-bold leading-[0.95em] tracking-[-0.0125em] mb-[0.365em]' style={{ fontSize: 'var(--text-xxl)' }}>Advanced staggering</h2>
              <p className='font-semibold leading-[1.25em]' style={{ color: 'var(--hex-fg-2)', fontSize: 'var(--text-s)' }}>Create stunning effects in seconds with the built-in Stagger utility function.</p>
            </div>
            <ul className='list-none p-0 m-0 hidden animejs-md:block relative w-full pt-[var(--margin-s)] pl-0'>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='https://animejs.com/documentation/stagger/time-staggering'>
                  <ArrowIcon />
                  Time staggering
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='https://animejs.com/documentation/stagger/values-staggering'>
                  <ArrowIcon />
                  Values staggering
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='https://animejs.com/documentation/stagger/timeline-positions-staggering'>
                  <ArrowIcon />
                  Timeline positions staggering
                </a>
              </li>
            </ul>
          </div>
          <div className='fixed top-0 left-0 w-full h-lvh'>
            <div className='opacity-[0.001] flex justify-center items-center flex-nowrap absolute z-[10] top-1/2 left-1/2 aspect-square w-[400px] h-auto -translate-x-1/2 -translate-y-1/2' style={{ color: 'var(--hex-fg-1)' }}></div>
          </div>
        </div>
      </section>

      {/* 特性 5: SVG toolset */}
      <section
        id='svgUtils'
        className='feature-section flex flex-col justify-center w-full h-lvh px-[var(--margin-s)] scroll-mt-[-45lvh] pointer-events-none'
        style={{ color: 'var(--hex-fg-3)' }}
        data-chapter='svgUtils'
        data-demo='svgUtils'
      >
        <div className='relative w-full h-lvh py-[var(--margin-s)] grid grid-cols-2 gap-16 items-center animejs-md:grid-cols-1'>
          <div className='relative z-[1] flex flex-col'>
            <div className='mb-[var(--margin-m)]' style={{ width: 'calc(100% - var(--margin-s) * 2)' }}>
              <h2 className='font-bold leading-[0.95em] tracking-[-0.0125em] mb-[0.365em]' style={{ fontSize: 'var(--text-xxl)' }}>SVG toolset</h2>
              <p className='font-semibold leading-[1.25em]' style={{ color: 'var(--hex-fg-2)', fontSize: 'var(--text-s)' }}>Morph shapes, follow motion paths, and draw lines easily with the built-in SVG utilities.</p>
            </div>
            <ul className='list-none p-0 m-0 hidden animejs-md:block relative w-full pt-[var(--margin-s)] pl-0'>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/svg/morphto.html'>
                  <ArrowIcon />
                  Shape morphing
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/svg/createdrawable.html'>
                  <ArrowIcon />
                  Line drawing
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/svg/createmotionpath.html'>
                  <ArrowIcon />
                  Motion path
                </a>
              </li>
            </ul>
          </div>
          <div className='fixed top-0 left-0 w-full h-lvh'>
            <div className='opacity-[0.001] flex justify-center items-center flex-nowrap absolute z-[10] top-1/2 left-1/2 aspect-square w-[400px] h-auto -translate-x-1/2 -translate-y-1/2' style={{ color: 'var(--hex-fg-1)' }}></div>
          </div>
        </div>
      </section>

      {/* 特性 6: Springs and draggable */}
      <section
        id='draggable'
        className='feature-section flex flex-col justify-center w-full h-lvh px-[var(--margin-s)] scroll-mt-[-45lvh] pointer-events-none'
        style={{ color: 'var(--hex-fg-3)' }}
        data-chapter='draggable'
        data-demo='draggable'
      >
        <div className='relative w-full h-lvh py-[var(--margin-s)] grid grid-cols-2 gap-16 items-center animejs-md:grid-cols-1'>
          <div className='relative z-[1] flex flex-col'>
            <div className='mb-[var(--margin-m)]' style={{ width: 'calc(100% - var(--margin-s) * 2)' }}>
              <h2 className='font-bold leading-[0.95em] tracking-[-0.0125em] mb-[0.365em]' style={{ fontSize: 'var(--text-xxl)' }}>Springs and draggable</h2>
              <p className='font-semibold leading-[1.25em]' style={{ color: 'var(--hex-fg-2)', fontSize: 'var(--text-s)' }}>Drag, snap, flick and throw HTML elements with the fully-featured Draggable API.</p>
            </div>
            <ul className='list-none p-0 m-0 hidden animejs-md:block relative w-full pt-[var(--margin-s)] pl-0'>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/draggable/draggable-settings.html'>
                  <ArrowIcon />
                  Versatile settings
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/draggable/draggable-callbacks.html'>
                  <ArrowIcon />
                  Comprehensive callbacks
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/draggable/draggable-methods.html'>
                  <ArrowIcon />
                  Useful methods
                </a>
              </li>
            </ul>
          </div>
          <div className='fixed top-0 left-0 w-full h-lvh'>
            <div className='opacity-[0.001] flex justify-center items-center flex-nowrap absolute z-[10] top-1/2 left-1/2 aspect-square w-[400px] h-auto -translate-x-1/2 -translate-y-1/2' style={{ color: 'var(--hex-fg-1)' }}>
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
        className='feature-section flex flex-col justify-center w-full h-lvh px-[var(--margin-s)] scroll-mt-[-45lvh] pointer-events-none'
        style={{ color: 'var(--hex-fg-3)' }}
        data-chapter='clockwork'
        data-demo='clockwork'
      >
        <div className='relative w-full h-lvh py-[var(--margin-s)] grid grid-cols-2 gap-16 items-center animejs-md:grid-cols-1'>
          <div className='relative z-[1] flex flex-col'>
            <div className='mb-[var(--margin-m)]' style={{ width: 'calc(100% - var(--margin-s) * 2)' }}>
              <h2 className='font-bold leading-[0.95em] tracking-[-0.0125em] mb-[0.365em]' style={{ fontSize: 'var(--text-xxl)' }}>
                Runs like <br />
                clockwork
              </h2>
              <p className='font-semibold leading-[1.25em]' style={{ color: 'var(--hex-fg-2)', fontSize: 'var(--text-s)' }}>Orchestrate animation sequences and keep callbacks in sync with the powerful Timeline API.</p>
            </div>
            <ul className='list-none p-0 m-0 hidden animejs-md:block relative w-full pt-[var(--margin-s)] pl-0'>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/timeline/add-animations.html'>
                  <ArrowIcon />
                  Synchronise animations
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/timeline/time-position.html'>
                  <ArrowIcon />
                  Advanced time positions
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/timeline/timeline-playback-settings.html'>
                  <ArrowIcon />
                  Playback settings
                </a>
              </li>
            </ul>
          </div>
          <div className='fixed top-0 left-0 w-full h-lvh'>
            <div className='opacity-[0.001] flex justify-center items-center flex-nowrap absolute z-[10] top-1/2 left-1/2 aspect-square w-[400px] h-auto -translate-x-1/2 -translate-y-1/2' style={{ color: 'var(--hex-fg-1)' }}></div>
          </div>
        </div>
      </section>

      {/* 特性 8: Responsive animations */}
      <section
        id='responsive'
        className='feature-section flex flex-col justify-center w-full h-lvh px-[var(--margin-s)] scroll-mt-[-45lvh] pointer-events-none'
        style={{ color: 'var(--hex-fg-3)' }}
        data-chapter='responsive'
        data-demo='responsive'
      >
        <div className='relative w-full h-lvh py-[var(--margin-s)] grid grid-cols-2 gap-16 items-center animejs-md:grid-cols-1'>
          <div className='relative z-[1] flex flex-col'>
            <div className='mb-[var(--margin-m)]' style={{ width: 'calc(100% - var(--margin-s) * 2)' }}>
              <h2 className='font-bold leading-[0.95em] tracking-[-0.0125em] mb-[0.365em]' style={{ fontSize: 'var(--text-xxl)' }}>Responsive animations</h2>
              <p className='font-semibold leading-[1.25em]' style={{ color: 'var(--hex-fg-2)', fontSize: 'var(--text-s)' }}>Make animations respond to media queries easily with the Scope API.</p>
            </div>
            <ul className='list-none p-0 m-0 hidden animejs-md:block relative w-full pt-[var(--margin-s)] pl-0'>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/scope/scope-parameters/mediaqueries.html'>
                  <ArrowIcon />
                  Media queries
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/scope/scope-parameters/root.html'>
                  <ArrowIcon />
                  Custom root element
                </a>
              </li>
              <li>
                <a className='flex justify-between items-center no-underline pl-7' style={{ fontSize: 'var(--text-s)', color: 'var(--hex-fg-3)' }} href='documentation/scope/register-method-function.html'>
                  <ArrowIcon />
                  Scopped methods
                </a>
              </li>
            </ul>
          </div>
          <div className='fixed top-0 left-0 w-full h-lvh'>
            <div className='opacity-[0.001] flex justify-center items-center flex-nowrap absolute z-[10] top-1/2 left-1/2 aspect-square w-[400px] h-auto -translate-x-1/2 -translate-y-1/2' style={{ color: 'var(--hex-fg-1)' }}></div>
          </div>
        </div>
      </section>
    </section>
  )
}
