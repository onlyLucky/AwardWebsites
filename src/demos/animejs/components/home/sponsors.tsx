// ===== Sponsors Section 组件 =====
// 对应源码 #sponsors (赞助商)
// 包含标题、描述、赞助商列表

import SponsorsList from '../web-components/sponsors-list'

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

export default function SponsorsSection() {
  return (
    <section
      id='sponsors'
      className='flex flex-col justify-center w-full h-lvh px-[var(--margin-s)]'
      style={{ color: 'var(--hex-fg-3)' }}
      data-chapter='sponsors'
      data-label='SPONSORS'
    >
      <div className='relative w-full h-lvh py-[var(--margin-s)]'>
        <div className='relative z-[1] flex flex-col'>
          <h2>Our sponsors</h2>
          <p>Anime.js is 100% free and is only made possible with the help of our sponsors.</p>
          {/* Platinum 赞助商列表 */}
          <div className='w-full'>
            <SponsorsList size='large' boxed path='platinum-sponsors' />
          </div>
          {/* Silver 赞助商列表 */}
          <div className='w-full'>
            <SponsorsList size='small' boxed path='silver-sponsors' />
          </div>
          <ul className='list-none p-0 m-0'>
            <li>
              <a className='flex justify-between items-center no-underline' style={{ color: 'var(--hex-fg-3)' }} href='https://github.com/sponsors/juliangarnier' target='_blank'>
                <ArrowIcon />
                Become a sponsor
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 章节间距 */}
      <div className='h-lvh pointer-events-none'></div>
      <div className='h-lvh pointer-events-none'></div>
    </section>
  )
}
