// ===== Header 组件 =====
// 对应源码 #site-header
// 包含 Logo、版本选择器、导航菜单、移动端菜单按钮
// 响应式：< 1200px 显示汉堡按钮，>= 1200px 显示导航菜单
// 首页：header 背景透明，底部边框透明

'use client'

import { useState, useEffect, useCallback } from 'react'
import SponsorButton from '../web-components/sponsor-button'

// Logo 图片路径
const LOGO_URL = new URL('@/assets/animejs/images/anime-js-logo-v4.svg', import.meta.url).href

// 桌面端断点（源码使用 1199px 作为移动端最大宽度）
const MOBILE_MAX_BREAKPOINT = 1199

interface HeaderProps {
  /** 是否为首页模式（首页 header 背景透明） */
  isHome?: boolean
}

export default function Header({ isHome = true }: HeaderProps) {
  const [menuActive, setMenuActive] = useState(false)

  // 监听窗口大小变化，切换到桌面端时自动关闭移动菜单
  const handleResize = useCallback(() => {
    if (window.innerWidth > MOBILE_MAX_BREAKPOINT) {
      setMenuActive(false)
    }
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  // 切换菜单状态
  const toggleMenu = () => setMenuActive((v) => !v)

  // 首页模式下 header 背景透明，非首页模式下有背景色
  const headerBg = isHome ? 'transparent' : 'var(--hex-bg-1)'
  // 首页模式下底部边框透明
  const borderBottom = isHome ? '1px solid transparent' : '1px solid var(--hex-bg-4)'

  return (
    <header
      id='site-header'
      className='sticky top-0 z-[105] px-[var(--margin-s)] bg-transparent max-w-[1500px] w-full flex flex-wrap min-[1200px]:z-[2] min-[1200px]:px-[var(--margin-m)]'
      style={{ backgroundColor: headerBg }}
    >
      <div
        id='site-header-content'
        className='static z-[2] flex justify-between items-center w-full border-b border-transparent min-[1200px]:border-b-transparent'
        style={{ height: 'var(--site-header-height)', borderBottom: borderBottom }}
      >
        {/* Logo 区域 */}
        <h1 className='flex items-center w-[calc(100%-2.5rem)] z-[1] min-[1200px]:w-[13rem]' style={{ height: 'var(--site-header-height)' }}>
          <a href='/' className='flex items-center h-full'>
            <img src={LOGO_URL} alt='anime.js logo v4' width='580' height='118' className='h-5 w-auto min-[1200px]:h-6' />
            <span className='hidden'>Anime.js | JavaScript Animation Engine</span>
          </a>
        </h1>

        {/* 导航菜单 - is-active 放在 site-menu 上（与源码一致），使用全局类名供 body:has() 选择器匹配 */}
        <nav
          id='site-menu'
          className={`fixed z-[1] top-0 right-0 min-h-dvh bg-[var(--hex-bg-1)] transition-transform duration-300 overflow-scroll min-[1200px]:overflow-visible min-[1200px]:relative min-[1200px]:min-h-auto min-[1200px]:pt-0 min-[1200px]:pb-0 min-[1200px]:bg-transparent min-[1200px]:translate-x-0 min-[1200px]:transition-none min-[1200px]:flex min-[1200px]:flex-row min-[1200px]:justify-end min-[1200px]:items-center`}
          style={{ transform: window.innerWidth < 1200 ? (menuActive ? 'translateX(0)' : 'translateX(100%)') : undefined, paddingTop: 'var(--site-header-height)', paddingBottom: 'calc(var(--site-header-height) + var(--margin-m))' }}
        >
          <ul className='flex shrink-0 flex-col justify-center items-stretch list-none h-full gap-0 min-[1200px]:flex-row min-[1200px]:justify-start min-[1200px]:items-center min-[1200px]:h-auto'>
            {/* Docs */}
            <li className='flex items-center h-auto px-[var(--margin-s)] pl-[var(--margin-xxs)] min-[1200px]:h-full min-[1200px]:pl-0 min-[1200px]:pr-0'>
              <a
                className='main-nav-link relative flex items-center px-[var(--margin-xs)] no-underline h-auto min-[1200px]:h-full min-[1200px]:text-inherit min-[1200px]:leading-none'
                style={{ color: 'var(--hex-fg-3)', fontSize: 'var(--text-s)', lineHeight: '2em' }}
                data-id='docs'
                href='documentation.html'
                title='Documentation'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5 mr-[var(--margin-xs)] min-[1200px]:mr-[-0.25em] min-[1200px]:ml-[-0.25em]'>
                  <g id='sidebar' fill='none' fillRule='evenodd'>
                    <path id='rectangle' fill='#FFFFFF' fillRule='nonzero' d='M16.167 6.125H7.833A3.375 3.375 0 0 0 4.458 9.5v5a3.375 3.375 0 0 0 3.375 3.375h8.334a3.375 3.375 0 0 0 3.375-3.375v-5a3.375 3.375 0 0 0-3.375-3.375zm-8.334 1.75h8.334c.897 0 1.625.728 1.625 1.625v5c0 .897-.728 1.625-1.625 1.625H7.833A1.625 1.625 0 0 1 6.208 14.5v-5c0-.897.728-1.625 1.625-1.625z' />
                    <polyline id='Path-42' stroke='#FFFFFF' strokeWidth='1.75' points='9.5 7.75 9.5 12 9.5 16.25' />
                  </g>
                </svg>
                <span className='whitespace-pre overflow-hidden text-ellipsis inline-block'>Docs</span>
              </a>
            </li>
            {/* Easings */}
            <li className='flex items-center h-auto px-[var(--margin-s)] pl-[var(--margin-xxs)] min-[1200px]:h-full min-[1200px]:pl-0 min-[1200px]:pr-0'>
              <a
                className='main-nav-link relative flex items-center px-[var(--margin-xs)] no-underline h-auto min-[1200px]:h-full min-[1200px]:text-inherit min-[1200px]:leading-none'
                style={{ color: 'var(--hex-fg-3)', fontSize: 'var(--text-s)', lineHeight: '2em' }}
                href='easing-editor.html'
                title='Easing functions editor'
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' className='w-5 h-5 mr-[var(--margin-xs)] min-[1200px]:mr-[-0.25em] min-[1200px]:ml-[-0.25em]'>
                  <path fill='none' stroke='currentColor' strokeWidth='1.75' d='M4.5,17 C14.5967876,17 8.37571813,7 19.5,7' />
                </svg>
                <span className='whitespace-pre overflow-hidden text-ellipsis inline-block'>Easings</span>
              </a>
            </li>
            {/* Learn */}
            <li className='flex items-center h-auto px-[var(--margin-s)] pl-[var(--margin-xxs)] min-[1200px]:h-full min-[1200px]:pl-0 min-[1200px]:pr-0'>
              <a
                className='main-nav-link relative flex items-center px-[var(--margin-xs)] no-underline h-auto min-[1200px]:h-full min-[1200px]:text-inherit min-[1200px]:leading-none'
                style={{ color: 'var(--hex-fg-3)', fontSize: 'var(--text-s)', lineHeight: '2em' }}
                href='learn.html'
                title='Learn'
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' className='w-5 h-5 mr-[var(--margin-xs)] min-[1200px]:mr-[-0.25em] min-[1200px]:ml-[-0.25em]'>
                  <g fill='none'>
                    <path fill='currentColor' d='M16.1666667,6.125 L7.83333333,6.125 C5.9693723,6.125 4.45833333,7.63603897 4.45833333,9.5 L4.45833333,14.5 C4.45833333,16.363961 5.9693723,17.875 7.83333333,17.875 L16.1666667,17.875 C18.0306277,17.875 19.5416667,16.363961 19.5416667,14.5 L19.5416667,9.5 C19.5416667,7.63603897 18.0306277,6.125 16.1666667,6.125 Z M7.83333333,7.875 L16.1666667,7.875 C17.0641294,7.875 17.7916667,8.60253728 17.7916667,9.5 L17.7916667,14.5 C17.7916667,15.3974627 17.0641294,16.125 16.1666667,16.125 L7.83333333,16.125 C6.93587061,16.125 6.20833333,15.3974627 6.20833333,14.5 L6.20833333,9.5 C6.20833333,8.60253728 6.93587061,7.875 7.83333333,7.875 Z' />
                    <path fill='currentColor' fillRule='evenodd' d='M10,10.0706309 L10,13.9294941 C10,14.2445758 10.2554242,14.5 10.5705059,14.5 C10.6590742,14.5 10.7464261,14.479379 10.8256439,14.4397701 L14.6845071,12.5103385 C14.9663248,12.3694297 15.0805539,12.0267421 14.9396451,11.7449245 C14.8844409,11.634516 14.7949156,11.5449908 14.6845071,11.4897865 L10.8256439,9.56035488 C10.5438263,9.41944606 10.2011387,9.53367523 10.0602299,9.81549288 C10.033824,9.86830478 10.0158571,9.92473182 10.0068132,9.9827243 L10,10.0706309 Z' />
                  </g>
                </svg>
                <span className='whitespace-pre overflow-hidden text-ellipsis inline-block'>Learn</span>
              </a>
            </li>
            {/* Examples (retractable - icon only on desktop) */}
            <li className='flex items-center h-auto px-[var(--margin-s)] pl-[var(--margin-xxs)] min-[1200px]:h-full min-[1200px]:pl-0 min-[1200px]:pr-0'>
              <a
                className='main-nav-link relative flex items-center px-[var(--margin-xs)] no-underline h-auto min-[1200px]:h-full min-[1200px]:text-inherit min-[1200px]:leading-none'
                style={{ color: 'var(--hex-fg-3)', fontSize: 'var(--text-s)', lineHeight: '2em' }}
                href='https://codepen.io/collection/Poerqa?cursor=eyJwYWdlIjoxfQ==/'
                target='_blank'
                title='CodePen'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5 mr-[var(--margin-xs)] min-[1200px]:mr-[-0.25em] min-[1200px]:ml-[-0.25em]'>
                  <g id='codepen' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
                    <path id='Shape' stroke='#FFFFFF' strokeWidth='1.75' d='M5 14.355L12 19l7-4.645v-4.71L12 5 5 9.645v4.71zm14 0l-7-4.71-7 4.71m0-4.71l7 4.646 7-4.646M12 5v4.645m0 4.71V19' />
                  </g>
                </svg>
                <span className='whitespace-pre overflow-hidden text-ellipsis inline-block min-[1200px]:hidden'>Examples</span>
              </a>
            </li>
            {/* GitHub (retractable - icon only on desktop) */}
            <li className='flex items-center h-auto px-[var(--margin-s)] pl-[var(--margin-xxs)] min-[1200px]:h-full min-[1200px]:pl-0 min-[1200px]:pr-0'>
              <a
                className='main-nav-link relative flex items-center px-[var(--margin-xs)] no-underline h-auto min-[1200px]:h-full min-[1200px]:text-inherit min-[1200px]:leading-none'
                style={{ color: 'var(--hex-fg-3)', fontSize: 'var(--text-s)', lineHeight: '2em' }}
                href='https://github.com/juliangarnier/anime'
                target='_blank'
                title='GitHub'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5 mr-[var(--margin-xs)] min-[1200px]:mr-[-0.25em] min-[1200px]:ml-[-0.25em]'>
                  <g fill='none' fillRule='evenodd'>
                    <path fill='currentColor' d='M12.007 4C7.579 4 4 7.606 4 12.066a8.06 8.06 0 0 0 5.475 7.652c.397.08.543-.173.543-.387 0-.187-.013-.828-.013-1.496-2.227.481-2.691-.961-2.691-.961-.358-.935-.888-1.175-.888-1.175-.73-.495.053-.495.053-.495.808.054 1.233.828 1.233.828.715 1.229 1.869.882 2.333.668.066-.52.278-.881.504-1.082-1.777-.187-3.646-.881-3.646-3.98 0-.88.318-1.602.822-2.163-.08-.2-.358-1.028.08-2.136 0 0 .676-.214 2.2.828a7.698 7.698 0 0 1 2.002-.268 7.7 7.7 0 0 1 2.001.268c1.525-1.042 2.2-.828 2.2-.828.438 1.108.16 1.936.08 2.136.517.561.822 1.282.822 2.164 0 3.098-1.869 3.779-3.659 3.98.292.253.544.734.544 1.495 0 1.082-.013 1.95-.013 2.217 0 .214.146.467.543.387A8.06 8.06 0 0 0 20 12.066C20.013 7.606 16.42 4 12.007 4z' />
                  </g>
                </svg>
                <span className='whitespace-pre overflow-hidden text-ellipsis inline-block min-[1200px]:hidden'>GitHub</span>
              </a>
            </li>
            {/* Sponsor - 带有特殊背景效果 */}
            <li className='flex items-center h-auto pl-[var(--margin-xxs)] pr-[var(--margin-s)] min-[1200px]:h-full min-[1200px]:pl-[var(--margin-xs)] min-[1200px]:pr-0'>
              <SponsorButton>
                <a
                  className='main-nav-link relative flex items-center px-[var(--margin-xs)] no-underline h-auto min-[1200px]:h-full min-[1200px]:text-inherit min-[1200px]:leading-none min-[1200px]:pl-[var(--margin-xxs)] min-[1200px]:pr-[var(--margin-xxs)]'
                  style={{ color: 'var(--hex-red-1)', fontSize: 'var(--text-s)', lineHeight: '1.5em', marginTop: '0.125em' }}
                  href='https://github.com/sponsors/juliangarnier'
                  target='_blank'
                  title='Sponsor Julian Garnier on GitHub'
                >
                  {/* 桌面端赞助按钮背景 */}
                  <span className='sponsor-link-bg hidden min-[1200px]:block' />
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-5 h-5 mr-[var(--margin-xs)] min-[1200px]:mr-1'>
                    <g fill='none' fillRule='evenodd'>
                      <path fill='currentColor' fillRule='nonzero' d='M12 18.445a.778.778 0 0 1-.34-.078C11.39 18.235 5 15.077 5 9.889a3.889 3.889 0 0 1 6.638-2.75L12 7.5l.362-.361A3.889 3.889 0 0 1 19 9.889c0 5.17-6.387 8.344-6.66 8.478a.778.778 0 0 1-.34.078z' />
                    </g>
                  </svg>
                  <span style={{ zIndex: 1 }}>Sponsor</span>
                </a>
              </SponsorButton>
            </li>
          </ul>
        </nav>

        {/* 移动端菜单按钮 - 对应源码 #toggle-site-menu.ui-input.trigger-pane */}
        <button
          id='toggle-site-menu'
          className='flex justify-center items-center absolute z-[9999] top-0 right-0 h-full bg-transparent border-none shadow-none outline-none cursor-pointer min-[1200px]:hidden'
          style={{ width: 'var(--site-header-height)', maxHeight: 'var(--site-header-height)', padding: '0 var(--margin-xxxs)', color: 'var(--hex-fg-3)' }}
          title='Toggle site menu'
          onClick={toggleMenu}
          aria-expanded={menuActive}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-6 h-6 mt-0'>
            <g id='menu' fill='none' fillRule='evenodd'>
              <rect id='Rectangle' width='16' height='1.75' x='4' y='8' fill='currentColor' />
              <rect id='Rectangle-Copy' width='16' height='1.75' x='4' y='14' fill='currentColor' />
            </g>
          </svg>
        </button>
      </div>
    </header>
  )
}
