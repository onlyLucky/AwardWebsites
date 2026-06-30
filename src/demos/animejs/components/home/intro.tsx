// ===== Intro Section 组件 =====
// 对应源码 #intro (Hero 区域)
// 包含标题、副标题、npm 命令、Learn more 按钮

import SponsorsList from '../web-components/sponsors-list'

export default function IntroSection() {
  return (
    <section id='intro' className='relative' data-chapter='intro' data-label='HEADING'>
      <div className='flex flex-col justify-center w-full h-lvh px-[var(--margin-s)]' style={{ color: 'var(--hex-fg-3)' }}>
        <div className='relative w-full h-lvh py-[var(--margin-s)]'>
          {/* 左侧文字内容 */}
          <div className='relative z-[1] flex flex-col max-w-[var(--max-box-width)]'>
            <h2 style={{ color: 'var(--hex-fg-1)', fontSize: 'var(--text-xxxxl)', lineHeight: '0.865em', letterSpacing: '-0.025em' }}>
              All-in-one <br />
              animation <br />
              engine
              <span className='inline-block' style={{ color: 'var(--hex-red-1)' }}>.</span>
            </h2>
            <p style={{ width: '100%', color: 'var(--hex-fg-2)', fontSize: 'var(--text-l)', fontWeight: 600, lineHeight: '1.25em' }}>
              A fast and flexible JavaScript <br />
              library to animate{' '}
              <span className='relative inline-block'>
                <span className='relative'>the web</span>
                <span className='animate-anything-dot'>.</span>
              </span>
            </p>
            <p></p>
          </div>

          {/* 固定的行动按钮 */}
          <div className='z-[1] will-change-transform'>
            <div className='relative z-[1] flex flex-wrap flex-row w-full max-w-[1500px] justify-between px-[var(--margin-s)] pb-[var(--margin-s)]'>
              <div className='flex items-center gap-4 justify-start p-0'>
                <pre className='inline-block m-0 mr-4 border border-white/10 rounded-lg px-6 py-3 text-sm' style={{ backgroundColor: 'var(--hex-bg-4)', fontFamily: 'var(--font-code)', color: 'var(--hex-fg-1)' }}>
                  <code className='overflow-hidden relative block w-full pr-11 h-12 leading-12'>npm i animejs</code>
                </pre>
                <button className='inline-flex items-center gap-2 bg-transparent border border-white/20 rounded-lg px-6 py-3 text-sm cursor-pointer transition-all duration-200 hover:bg-white/5 hover:border-white/30' style={{ fontFamily: 'var(--font-body)', color: 'var(--hex-fg-1)' }}>
                  Learn more
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5'>
                    <g fill='none' fillRule='evenodd'>
                      <polygon fill='currentColor' fillRule='nonzero' points='12 18 17.237 12.763 16 11.525 12.875 14.651 12.875 6.763 11.125 6.763 11.125 14.651 8 11.525 6.763 12.763' />
                    </g>
                  </svg>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5'>
                    <g fill='none' fillRule='evenodd'>
                      <polygon fill='currentColor' fillRule='nonzero' points='12 18 17.237 12.763 16 11.525 12.875 14.651 12.875 6.763 11.125 6.763 11.125 14.651 8 11.525 6.763 12.763' />
                    </g>
                  </svg>
                </button>
              </div>
              <div className='relative max-w-40 w-full h-12' style={{ color: 'var(--hex-fg-3)' }}>
                <span className='text-xxs'>Sponsored by</span>
                <SponsorsList path='platinum-sponsors' size='small' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 章节间距 */}
      <div className='h-lvh pointer-events-none'></div>
      <div className='h-lvh pointer-events-none'></div>
    </section>
  )
}
