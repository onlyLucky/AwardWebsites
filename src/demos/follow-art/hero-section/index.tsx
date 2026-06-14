import { useState, useRef, useEffect, useCallback } from 'react'
import WebGLCards from '../webgl-cards'
import './style.css'

interface Letter {
  char: string
  baseScaleY: number
}

const letters: Letter[] = [
  { char: 'F', baseScaleY: 0.719856 },
  { char: 'O', baseScaleY: 0.877945 },
  { char: 'L', baseScaleY: 0.78162 },
  { char: 'L', baseScaleY: 0.800007 },
  { char: 'O', baseScaleY: 0.679877 },
  { char: 'W', baseScaleY: 0.870604 },
  { char: '.', baseScaleY: 0.799787 },
  { char: 'A', baseScaleY: 0.881787 },
  { char: 'R', baseScaleY: 0.989695 },
  { char: 'T', baseScaleY: 0.800845 },
]

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouseX, setMouseX] = useState(50)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setMouseX(percentage)
    }

    const handleMouseLeave = () => {
      setMouseX(50)
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timer)
    }
  }, [])

  const calculateScaleY = useCallback(
    (letterIndex: number, baseScaleY: number) => {
      const totalLetters = letters.length
      const letterPosition = letterIndex / (totalLetters - 1)
      const mousePosition = mouseX / 100
      const distance = Math.abs(letterPosition - mousePosition)
      const scaleFactor = 1 - distance * 0.8
      const targetScaleY = baseScaleY + (1 - baseScaleY) * scaleFactor
      return Math.max(baseScaleY * 0.6, Math.min(1.0, targetScaleY))
    },
    [mouseX]
  )

  return (
    <section
      className={`hero-section ${isVisible ? 'intro--show' : ''}`}
      ref={containerRef}
    >
      {/* Title */}
      <div className="intro__title">
        <div className="title-children-wrapper">
          <svg
            className="intro__title is-hidden:sm-down svg-fix"
            width="1420"
            height="500"
            viewBox="0 0 1420 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Letter F */}
            <path
              data-char
              data-scale-y="0.719856"
              d="M1420 6V63.1629H1388.18V500H1333.45V63.1629H1301V6H1420Z"
              fill="white"
              style={{
                transform: `scaleY(${calculateScaleY(0, letters[0].baseScaleY)})`,
                transformOrigin: 'bottom',
              }}
            />
            {/* Letter O */}
            <path
              data-char
              data-scale-y="0.877945"
              d="M1157 500V6H1223.31C1266.67 6 1290.26 32.1114 1290.26 79.3943V165.491C1290.26 212.069 1272.41 237.474 1239.25 237.474H1235.43V245.943H1273.05L1296 500H1241.8L1223.95 280.523H1211.83V500H1157ZM1211.83 227.594H1223.31C1231.6 227.594 1236.06 219.831 1236.06 207.129V83.6286C1236.06 70.22 1231.6 63.1629 1223.31 63.1629H1211.83V227.594Z"
              fill="white"
              style={{
                transform: `scaleY(${calculateScaleY(1, letters[1].baseScaleY)})`,
                transformOrigin: 'bottom',
              }}
            />
            {/* Letter L */}
            <path
              data-char
              data-scale-y="0.78162"
              d="M1089.31 500L1082.33 337.686H1055.67L1048.69 500H996L1016.31 6H1122.32L1142 500H1089.31ZM1057.57 279.817H1080.43L1075.35 162.669L1074.08 61.7514H1063.92L1062.65 162.669L1057.57 279.817Z"
              fill="white"
              style={{
                transform: `scaleY(${calculateScaleY(2, letters[2].baseScaleY)})`,
                transformOrigin: 'bottom',
              }}
            />
            {/* Letter L */}
            <path
              data-char
              data-scale-y="0.800007"
              d="M929 81V6H984V81H929Z"
              fill="white"
              style={{
                transform: `scaleY(${calculateScaleY(3, letters[3].baseScaleY)})`,
                transformOrigin: 'bottom',
              }}
            />
            {/* Letter O */}
            <path
              data-char
              data-scale-y="0.679877"
              d="M676.188 500L659 6H714.384L720.113 334.863L721.387 442.837H730.299L732.209 334.863L743.668 6H821.332L833.428 334.863L834.701 442.837H843.613L844.887 334.863L850.616 6H906L889.448 500H798.415L788.866 171.137L787.593 63.1629H778.044L776.771 171.137L767.222 500H676.188Z"
              fill="white"
              style={{
                transform: `scaleY(${calculateScaleY(4, letters[4].baseScaleY)})`,
                transformOrigin: 'bottom',
              }}
            />
            {/* Letter W */}
            <path
              data-char
              data-scale-y="0.870604"
              d="M578 500C534.61 500 511 474.306 511 427.083V73.6111C511 25.6944 534.61 0 578 0C621.391 0 645 25.6944 645 73.6111V427.083C645 474.306 621.391 500 578 500ZM578 443.75C586.295 443.75 590.124 436.111 590.124 422.917V77.0833C590.124 63.8889 586.295 56.25 578 56.25C569.705 56.25 565.238 63.8889 565.238 77.0833V422.917C565.238 436.111 569.705 443.75 578 443.75Z"
              fill="white"
              style={{
                transform: `scaleY(${calculateScaleY(5, letters[5].baseScaleY)})`,
                transformOrigin: 'bottom',
              }}
            />
            {/* Dot */}
            <path
              data-char
              data-scale-y="0.799787"
              d="M450.043 442.837H499V500H396V6H450.043V442.837Z"
              fill="white"
              style={{
                transform: `scaleY(${calculateScaleY(6, letters[6].baseScaleY)})`,
                transformOrigin: 'bottom',
              }}
            />
            {/* Letter A */}
            <path
              data-char
              data-scale-y="0.881787"
              d="M335.043 442.837H384V500H281V6H335.043V442.837Z"
              fill="white"
              style={{
                transform: `scaleY(${calculateScaleY(7, letters[7].baseScaleY)})`,
                transformOrigin: 'bottom',
              }}
            />
            {/* Letter R */}
            <path
              data-char
              data-scale-y="0.989695"
              d="M191.5 500C148.433 500 125 474.306 125 427.083V73.6111C125 25.6944 148.433 0 191.5 0C234.567 0 258 25.6944 258 73.6111V427.083C258 474.306 234.567 500 191.5 500ZM191.5 443.75C199.733 443.75 203.533 436.111 203.533 422.917V77.0833C203.533 63.8889 199.733 56.25 191.5 56.25C183.267 56.25 178.833 63.8889 178.833 77.0833V422.917C178.833 436.111 183.267 443.75 191.5 443.75Z"
              fill="white"
              style={{
                transform: `scaleY(${calculateScaleY(8, letters[8].baseScaleY)})`,
                transformOrigin: 'bottom',
              }}
            />
            {/* Letter T */}
            <path
              data-char
              data-scale-y="0.800845"
              d="M109 63.1629H54.1813V219.126H102.626V276.289H54.1813V500H0V6H109V63.1629Z"
              fill="white"
              style={{
                transform: `scaleY(${calculateScaleY(9, letters[9].baseScaleY)})`,
                transformOrigin: 'bottom',
              }}
            />
          </svg>
        </div>
      </div>

      {/* Title decoration line */}
      <div className="intro__title-decoration">
        <svg
          className="img-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* WebGL 3D Cards */}
      <WebGLCards />

      {/* Footer tagline */}
      <div className="intro__footer">
        <div className="hero-tagline">
          <p>One Card.</p>
          <p>Share it. Be noticed. Be supported</p>
        </div>
        <a href="https://follow.art" target="_blank" rel="noopener noreferrer" className="hero-visit-btn">
          Visit follow.art
        </a>
      </div>
    </section>
  )
}

export default HeroSection
