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

// 链接数据
const LINKS = [
  { href: 'documentation/getting-started.html', label: 'Getting started' },
  { href: 'documentation/timer.html', label: 'Timer' },
  { href: 'documentation/animation.html', label: 'Animation' },
  { href: 'documentation/timeline.html', label: 'Timeline' },
  { href: 'documentation/animatable.html', label: 'Animatable' },
  { href: 'documentation/draggable.html', label: 'Draggable' },
  { href: 'documentation/scope.html', label: 'Scope' },
  { href: 'documentation/events/onscroll.html', label: 'Scroll' },
  { href: 'documentation/svg.html', label: 'SVG' },
  { href: 'documentation/utilities.html', label: 'Utils' },
  { href: 'documentation/easings.html', label: 'Easings' },
  { href: 'documentation/web-animation-api.html', label: 'WAAPI' },
]

export default function GetStartedSection() {
  return (
    <section id='get-started' data-chapter='get-started' data-label='GET_STARTED'>
      {/* 章节间距 */}
      <div className='h-lvh pointer-events-none'></div>

      <section className='home-section flex flex-col justify-center w-full h-lvh px-[var(--margin-s)]' style={{ color: 'var(--hex-fg-3)' }}>
        <div className='home-section-content home-section-centered flex flex-col justify-center items-center h-auto py-16 text-center'>
          <div className='home-section-text home-section-centered flex flex-col items-center text-center mb-10'>
            <h2 className='font-bold' style={{ fontSize: 'var(--text-xxxl)', color: 'var(--hex-fg-2)', lineHeight: '0.95em', marginBottom: '0.375em' }}>Start animating</h2>
            <p className='text-l font-semibold' style={{ color: 'var(--hex-fg-2)', lineHeight: '1.25em' }}>Get started quickly with our in-depth documentation.</p>
          </div>
          <ul className='links-list links-list-grid list-none p-0 m-0 flex flex-wrap justify-center' style={{ maxWidth: '720px', width: '720px', gap: '8px' }}>
            {LINKS.map((link) => (
              <li key={link.href} className='list-none' style={{ width: 'calc(50% - 4px)' }}>
                <a
                  href={link.href}
                  className='relative flex justify-between items-center no-underline'
                  style={{
                    padding: '8px 8px 8px 40px',
                    fontSize: '16px',
                    color: 'rgb(180, 177, 175)',
                    textDecoration: 'none',
                  }}
                >
                  <span
                    className='label-dot'
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '18px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--hex-red-1)',
                      color: 'var(--hex-red-1)',
                    }}
                  ></span>
                  {link.label}
                  <ArrowIcon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  )
}
