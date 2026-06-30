// ===== Footer 组件 =====
// 对应源码 #site-footer
// 包含赞助商、站点链接、社交链接、版权信息、邮件订阅

import SponsorButton from '../web-components/sponsor-button'

// Logo 图片路径
const LOGO_URL = new URL('@/assets/animejs/images/anime-js-logo-v4.svg', import.meta.url).href
// 赞助商占位图路径
const SPONSOR_PLACEHOLDER_URL = new URL(
  '@/assets/animejs/media/pages/sponsors/platinum-sponsors/973aa34310-1769187540/sponsor-placeholder.svg',
  import.meta.url
).href

// 通用箭头图标
function ArrowIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5'>
      <g fill='none' fillRule='evenodd'>
        <polygon fill='currentColor' fillRule='nonzero' points='17.737 11.987 12.5 17.225 11.263 15.987 14.388 12.862 6.5 12.862 6.5 11.112 14.388 11.112 11.263 7.987 12.5 6.75' />
      </g>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer id='site-footer' className='z-[2] px-[var(--margin-s)] pb-[var(--margin-s)] bg-[var(--hex-bg-1)] relative z-[1] flex flex-wrap flex-row w-full max-w-[1500px] animejs-md:px-[var(--margin-m)] animejs-md:pb-[var(--margin-m)]' style={{ containerType: 'inline-size' }} data-color='fg'>
      <div id='site-footer-content' className='relative z-[2] flex flex-col w-full border-t border-[var(--hex-bg-4)] pt-[var(--margin-s)]'>
        <div className='w-full flex flex-row flex-wrap justify-between gap-[var(--margin-m)] pb-[var(--margin-m)] animejs-md:flex-col animejs-md:gap-8'>
          {/* 赞助商区块 */}
          <div className='flex flex-col w-full gap-x-[var(--margin-m)] max-w-[300px]'>
            <strong className='text-sm font-bold mb-2' style={{ color: 'var(--hex-fg-2)' }}>Platinum sponsors</strong>
            <ul className='list-none p-0 m-0'>
              <li>
                <a
                  className='sponsor'
                  href='https://github.com/sponsors/juliangarnier'
                  target='_blank'
                  title='Become a sponsor'
                  data-url-params=''
                  data-url-params-docs=''
                >
                  <img src={SPONSOR_PLACEHOLDER_URL} alt='Become a sponsor' width='100' height='100' loading='lazy' />
                  <span>Become a sponsor</span>
                  <ArrowIcon />
                </a>
              </li>
              <li>
                <SponsorButton>
                  <a href='https://github.com/sponsors/juliangarnier' target='_blank'>
                    Become a sponsor
                    <ArrowIcon />
                  </a>
                </SponsorButton>
              </li>
            </ul>
          </div>

          {/* 链接区块 */}
          <div className='flex flex-col w-full gap-x-[var(--margin-m)] flex-row animejs-md:flex-col animejs-md:gap-8'>
            <div className='flex flex-col w-full gap-x-[var(--margin-m)]'>
              <strong className='text-sm font-bold mb-2' style={{ color: 'var(--hex-fg-2)' }}>Site</strong>
              <ul className='list-none p-0 m-0'>
                <li>
                  <a href='index.html' title='Documentation' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                    Home
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a href='documentation.html' title='Documentation' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                    Documentation
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a href='easing-editor.html' title='Easing functions editor' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                    Easings editor
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a href='learn.html' title='Learn' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                    Learn
                    <ArrowIcon />
                  </a>
                </li>
              </ul>
            </div>
            <div className='flex flex-col w-full gap-x-[var(--margin-m)]'>
              <strong className='text-sm font-bold mb-2' style={{ color: 'var(--hex-fg-2)' }}>Socials</strong>
              <ul className='list-none p-0 m-0'>
                <li>
                  <a target='_blank' href='https://x.com/juliangarnier' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                    X / Twitter
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a target='_blank' href='https://bsky.app/profile/animejs.com' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                    Bluesky
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a target='_blank' href='https://github.com/juliangarnier/anime' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                    GitHub
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a target='_blank' href='https://codepen.io/collection/Poerqa' className='flex justify-between items-center no-underline py-2' style={{ color: 'var(--hex-fg-2)' }}>
                    CodePen
                    <ArrowIcon />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 底部行 */}
        <div className='w-full flex flex-row flex-wrap justify-between gap-[var(--margin-m)] pb-[var(--margin-m)] animejs-md:flex-col animejs-md:gap-8'>
          <div className='flex flex-col w-full gap-x-[var(--margin-m)] gap-4 justify-end'>
            <div className='heading-logo flex items-center my-[var(--margin-xxxs)]'>
              <a href='/'>
                <img src={LOGO_URL} alt='anime.js logo v4' width='580' height='118' className='h-6 w-auto' />
                <span className='hidden'>Anime.js | JavaScript Animation Engine</span>
              </a>
            </div>
            <div className='text-xs' style={{ color: 'var(--hex-fg-4)' }}>
              &copy; 2026{' '}
              <a href='https://juliangarnier.com' target='_blank' className='no-underline'>
                Julian Garnier
              </a>
            </div>
          </div>

          {/* 邮件订阅区块 */}
          <div className='flex flex-col w-full gap-x-[var(--margin-m)]'>
            <strong className='text-sm font-bold mb-2' style={{ color: 'var(--hex-fg-2)' }}>Stay in the loop</strong>
            <div className='w-full relative'>
              <form>
                <div className='flex is-active'>
                  <input
                    className='flex-grow rounded-l-[var(--br-s)] text-base h-11'
                    style={{ padding: 'var(--margin-xs) var(--margin-xs)', backgroundColor: 'var(--hex-bg-4)', color: 'var(--hex-fg-1)' }}
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    required
                  />
                  <input
                    className='text-base rounded-r-[var(--br-s)] font-bold cursor-pointer'
                    style={{ padding: 'var(--margin-xxs) var(--margin-xs)', backgroundColor: 'var(--hex-fg-2)', color: 'var(--hex-bg-4)' }}
                    type='submit'
                    value='Subscribe'
                  />
                </div>
                <div className='hidden pointer-events-none opacity-0 z-[1] inset-0 rounded-[var(--br-s)] min-h-11' style={{ padding: 'var(--margin-xs) var(--margin-xs)', fontSize: 'var(--text-xs)' }}>
                  <p className='!text-[0.8125rem] !font-semibold !text-center'>Thanks! Check your inbox to confirm your subscription.</p>
                </div>
                <div className='hidden pointer-events-none opacity-0 z-[1] inset-0 rounded-[var(--br-s)] min-h-11' style={{ padding: 'var(--margin-xs) var(--margin-xs)', fontSize: 'var(--text-xs)' }}>
                  <p className='!text-[0.8125rem] !font-semibold !text-center'>
                    Something went wrong. Please try again later or email me directly at{' '}
                    <a href='mailto:julian@animejs.com'>julian@animejs.com</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
