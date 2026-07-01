// ===== Intro Section 组件 =====
// 对应源码 #intro (Hero 区域)
// 包含标题、副标题、npm 命令、Learn more 按钮
// 使用 GSAP 实现入场动画效果

'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SponsorsList from '../web-components/sponsors-list'

// "animate anything" 文字循环显示的选项
const ANIMATE_ANYTHING_OPTIONS = ['HTML', 'WebGL', 'CSS', 'Canvas 2D', 'SVG', 'anything']

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  const animateAnythingRef = useRef<HTMLSpanElement>(null)
  const animateAnythingDotRef = useRef<HTMLSpanElement>(null)
  const learnMoreIconsRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // ===== 标题逐字动画 =====
    // 将标题文字拆分为单独的字符 span
    const h2 = h2Ref.current
    let dotSpan: HTMLSpanElement | null = null
    if (h2) {
      h2.innerHTML = ''
      // 按行拆分
      const lines = ['All-in-one', 'animation', 'engine.']
      lines.forEach((line, lineIndex) => {
        const lineSpan = document.createElement('span')
        lineSpan.style.display = 'block'
        lineSpan.className = 'font-bold text-[var(--hex-fg-1)]'
        // 如果是最后一行，拆分出句点
        if (lineIndex === lines.length - 1) {
          const engineChars = line.slice(0, -1)
          const dotChar = line.slice(-1)
          engineChars.split('').forEach((char) => {
            const charSpan = document.createElement('span')
            charSpan.textContent = char
            charSpan.className = 'char'
            charSpan.style.display = 'inline-block'
            lineSpan.appendChild(charSpan)
          })
          dotSpan = document.createElement('span')
          dotSpan.className = 'animation-engine red-dot inline-block char'
          dotSpan.style.color = 'var(--hex-red-1)'
          dotSpan.textContent = dotChar
          lineSpan.appendChild(dotSpan)
        } else {
          line.split('').forEach((char) => {
            const charSpan = document.createElement('span')
            charSpan.textContent = char
            charSpan.className = 'char'
            charSpan.style.display = 'inline-block'
            lineSpan.appendChild(charSpan)
          })
        }
        h2.appendChild(lineSpan)
      })

      // 创建标题入场动画时间线
      const h2Chars = h2.querySelectorAll('.char')
      gsap.fromTo(
        h2Chars,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: 'power2.out',
          delay: 0.5,
        }
      )

      // 红色句点特殊动画：从白色变为红色
      if (dotSpan) {
        gsap.fromTo(
          dotSpan,
          { opacity: 0, x: '.25em', color: '#FFF' },
          {
            opacity: 1,
            x: '0em',
            color: 'var(--hex-red-1)',
            duration: 0.3,
            ease: 'power2.inOut',
            delay: 1.2,
          }
        )
      }
    }

    // ===== 副标题逐字动画 =====
    const p = pRef.current
    if (p) {
      // 保留 animate-anything-wrapper，只动画前面的文字
      const wrapper = p.querySelector('.animate-anything-wrapper')
      if (wrapper) {
        // 获取 wrapper 前面的文本内容
        let textBeforeWrapper = ''
        const childNodes = Array.from(p.childNodes)
        for (const node of childNodes) {
          if (node === wrapper) break
          if (node.nodeType === Node.TEXT_NODE) {
            textBeforeWrapper += node.textContent || ''
          }
        }

        // 拆分文本为单词（保留空格）
        const trimmedText = textBeforeWrapper.trimEnd()
        const words = trimmedText.split(' ')

        // 清除 wrapper 前面的文本节点
        for (const node of [...p.childNodes]) {
          if (node === wrapper) break
          if (node.nodeType === Node.TEXT_NODE) {
            node.remove()
          }
        }

        // 在 wrapper 前逐个插入单词 span（空格通过 CSS margin 实现）
        words.forEach((word, index) => {
          const wordSpan = document.createElement('span')
          wordSpan.textContent = word
          wordSpan.style.display = 'inline-block'
          if (index < words.length - 1) {
            wordSpan.style.marginRight = '0.3em'
          }
          p.insertBefore(wordSpan, wrapper)
        })

        // 创建副标题入场动画（只动画单词，不包括 wrapper）
        const pWords = p.querySelectorAll('span:not(.animate-anything-wrapper):not(.animate-anything):not(.animate-anything-dot)')
        gsap.fromTo(
          pWords,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.03,
            ease: 'power2.out',
            delay: 1.5,
          }
        )
      }
    }

    // ===== "animate anything" 文字循环动画 =====
    let currentIndex = 0
    let animationTimeline: gsap.core.Timeline | null = null

    const animateText = () => {
      if (!animateAnythingRef.current || !animateAnythingDotRef.current) return

      const textEl = animateAnythingRef.current
      const dotEl = animateAnythingDotRef.current
      const nextText = ANIMATE_ANYTHING_OPTIONS[currentIndex]

      // 拆分新文字为字符
      textEl.innerHTML = ''
      nextText.split('').forEach((char) => {
        const charSpan = document.createElement('span')
        charSpan.textContent = char
        charSpan.className = 'char'
        charSpan.style.display = 'inline-block'
        textEl.appendChild(charSpan)
      })

      const chars = textEl.querySelectorAll('.char')

      // 创建动画时间线
      animationTimeline = gsap.timeline({
        onComplete: () => {
          currentIndex = (currentIndex + 1) % ANIMATE_ANYTHING_OPTIONS.length
          // 延迟后播放下一个
          gsap.delayedCall(2, animateText)
        },
      })

      // 字符逐个显示
      animationTimeline.fromTo(
        chars,
        { opacity: 0, scaleX: 0, x: 10 },
        {
          opacity: 1,
          scaleX: 1,
          x: 0,
          duration: 0.15,
          stagger: 0.025,
          ease: 'power2.out',
        }
      )

      // 句点跟随动画
      animationTimeline.fromTo(
        dotEl,
        { x: -textEl.offsetWidth, scaleX: 8 },
        {
          x: 0,
          scaleX: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        0
      )

      // 保持显示一段时间后消失
      animationTimeline.to(
        chars,
        {
          opacity: 0,
          scaleX: 0,
          duration: 0.1,
          stagger: 0.025,
          ease: 'power2.in',
        },
        '+=1.5'
      )

      animationTimeline.to(
        dotEl,
        {
          x: -textEl.offsetWidth,
          scaleX: 4,
          duration: 0.2,
          ease: 'power2.in',
        },
        '<'
      )
    }

    // 延迟启动循环动画
    const startDelay = gsap.delayedCall(2.5, animateText)

    // ===== Learn more 箭头循环动画 =====
    if (learnMoreIconsRef.current) {
      const icons = learnMoreIconsRef.current.querySelectorAll('.icon')
      if (icons.length >= 1) {
        // 箭头循环上下移动
        gsap.to(icons[0], {
          y: '+=0.95em',
          ease: 'linear',
          duration: 1,
          repeat: -1,
          yoyo: true,
        })
      }
    }

    // 清理函数
    return () => {
      if (animationTimeline) {
        animationTimeline.kill()
      }
      startDelay.kill()
      gsap.killTweensOf(h2Ref.current?.querySelectorAll('.char') || [])
      gsap.killTweensOf(pRef.current?.querySelectorAll('span') || [])
      gsap.killTweensOf(learnMoreIconsRef.current?.querySelectorAll('.icon') || [])
    }
  }, [])

  return (
    <section ref={sectionRef} id='intro' className='w-full pt-[var(--site-header-height)]' data-chapter='intro' data-label='HEADING'>
      <div className='flex flex-col justify-center w-full h-lvh px-4 md:px-16 text-[var(--hex-fg-3)]'>
        <div className='relative w-full h-lvh py-4 md:py-16'>
          {/* 左侧文字内容 */}
          <div className='relative z-[1] flex flex-col w-full md:w-[432px] md:max-w-[432px] md:mb-16 md:items-start md:text-left'>
            <h2
              ref={h2Ref}
              className='text-[var(--hex-fg-1)] font-bold'
            >
              All-in-one <br />
              animation <br />
              engine<span className='animation-engine red-dot inline-block text-[var(--hex-red-1)]'>.</span>
            </h2>
            <p
              ref={pRef}
              className='text-l w-full font-semibold text-[var(--hex-fg-2)]'
            >
              A fast and flexible JavaScript library to animate{' '}
              <span className='animate-anything-wrapper relative inline-block'>
                <span ref={animateAnythingRef} className='animate-anything relative'>the web</span>
                <span ref={animateAnythingDotRef} className='animate-anything-dot'>.</span>
              </span>
            </p>
          </div>

          {/* 固定的行动按钮 */}
          <div className='fixed-container heading-links z-[1] will-change-transform'>
            <div className='relative z-[1] flex flex-wrap flex-row w-full max-w-[1500px] justify-between px-[var(--margin-s)] pb-[var(--margin-s)]'>
              <div className='ui-group flex items-center gap-4 justify-start p-0'>
                <pre className='npm-install inline-block m-0 mr-4'>
                  <code className='npm-install-code overflow-hidden relative block w-full h-12 leading-12 pr-11 bg-[rgb(47,46,45)] rounded-[2px] px-4 py-0 text-[rgb(180,177,175)] font-[var(--font-code)]'>
                    npm i animejs
                  </code>
                </pre>
                <button
                  ref={learnMoreIconsRef}
                  className='learn-more ui-input ui-button inline-flex items-center gap-2 h-12 px-4 bg-transparent border border-[rgb(98,93,91)] rounded-[4px] text-[rgb(147,144,142)] font-semibold cursor-pointer transition-all duration-200 hover:text-[var(--hex-fg-3)] hover:border-[var(--hex-fg-4)] font-[var(--font-body)]'
                >
                  Learn more
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='icon w-5 h-5'>
                    <g fill='none' fillRule='evenodd'>
                      <polygon fill='currentColor' fillRule='nonzero' points='12 18 17.237 12.763 16 11.525 12.875 14.651 12.875 6.763 11.125 6.763 11.125 14.651 8 11.525 6.763 12.763' />
                    </g>
                  </svg>
                </button>
              </div>
              <div className='heading-sponsors text-layout relative max-w-40 w-full h-12 text-[var(--hex-fg-3)]'>
                <span className='text-xxs'>Sponsored by</span>
                <SponsorsList path='platinum-sponsors' size='small' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 章节间距 */}
      <div className='section-spacer h-lvh pointer-events-none'></div>
      <div className='section-spacer h-lvh pointer-events-none'></div>
    </section>
  )
}
