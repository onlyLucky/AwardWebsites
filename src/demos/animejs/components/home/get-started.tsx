// ===== Get Started Section 组件 =====
// 对应源码 #get-started (开始使用)
// 包含标题、描述、文档链接列表

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

export default function GetStartedSection() {
  return (
    <section id='get-started' data-chapter='get-started' data-label='GET_STARTED'>
      {/* 章节间距 */}
      <div className='h-lvh pointer-events-none'></div>

      <section className='flex flex-col justify-center w-full h-lvh px-[var(--margin-s)]' style={{ color: 'var(--hex-fg-3)' }}>
        <div className='relative w-full h-lvh py-[var(--margin-s)] justify-center items-center text-center'>
          <div className='relative z-[1] flex flex-col justify-center items-center text-center'>
            <h2 style={{ fontSize: 'var(--text-xxxl)' }}>Start animating</h2>
            <p>Get started quickly with our in-depth documentation.</p>
          </div>
          <ul className='list-none p-0 m-0 grid grid-cols-2 gap-4'>
            <li>
              <a href='documentation/getting-started.html' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                <span className='inline-block w-2 h-2 rounded-full mr-2' style={{ backgroundColor: 'var(--hex-fg-4)' }}></span>
                Getting started
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href='documentation/timer.html' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                <span className='inline-block w-2 h-2 rounded-full mr-2' style={{ backgroundColor: 'var(--hex-fg-4)' }}></span>
                Timer
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href='documentation/animation.html' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                <span className='inline-block w-2 h-2 rounded-full mr-2' style={{ backgroundColor: 'var(--hex-fg-4)' }}></span>
                Animation
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href='documentation/timeline.html' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                <span className='inline-block w-2 h-2 rounded-full mr-2' style={{ backgroundColor: 'var(--hex-fg-4)' }}></span>
                Timeline
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href='documentation/animatable.html' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                <span className='inline-block w-2 h-2 rounded-full mr-2' style={{ backgroundColor: 'var(--hex-fg-4)' }}></span>
                Animatable
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href='documentation/draggable.html' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                <span className='inline-block w-2 h-2 rounded-full mr-2' style={{ backgroundColor: 'var(--hex-fg-4)' }}></span>
                Draggable
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href='documentation/scope.html' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                <span className='inline-block w-2 h-2 rounded-full mr-2' style={{ backgroundColor: 'var(--hex-fg-4)' }}></span>
                Scope
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href='documentation/events/onscroll.html' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                <span className='inline-block w-2 h-2 rounded-full mr-2' style={{ backgroundColor: 'var(--hex-fg-4)' }}></span>
                Scroll
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href='documentation/svg.html' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                <span className='inline-block w-2 h-2 rounded-full mr-2' style={{ backgroundColor: 'var(--hex-fg-4)' }}></span>
                SVG
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href='documentation/utilities.html' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                <span className='inline-block w-2 h-2 rounded-full mr-2' style={{ backgroundColor: 'var(--hex-fg-4)' }}></span>
                Utils
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href='documentation/easings.html' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                <span className='inline-block w-2 h-2 rounded-full mr-2' style={{ backgroundColor: 'var(--hex-fg-4)' }}></span>
                Easings
                <ArrowIcon />
              </a>
            </li>
            <li>
              <a href='documentation/web-animation-api.html' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                <span className='inline-block w-2 h-2 rounded-full mr-2' style={{ backgroundColor: 'var(--hex-fg-4)' }}></span>
                WAAPI
                <ArrowIcon />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </section>
  )
}
