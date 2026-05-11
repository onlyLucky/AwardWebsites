import { useEffect, useState, useRef } from 'react'
import './index.less'

import star from '../../assets/images/loading/star.svg'
import flower from '../../assets/images/loading/flower.svg'
import vortex from '../../assets/images/loading/vortex.svg'
import smile from '../../assets/images/loading/smile.svg'
import loopArrow from '../../assets/images/loading/loop_arrow.svg'

const svgList = [star, flower, vortex, smile, loopArrow]
const FRAME_INTERVAL = 300

function Loading() {
  const [isLoading, setIsLoading] = useState(true)
  const [shouldClose, setShouldClose] = useState(false)
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0)
  const animationRef = useRef(null)
  const closeCheckRef = useRef(null)

  // 模拟加载完成信号
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldClose(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // SVG 帧动画循环
  useEffect(() => {
    animationRef.current = setInterval(() => {
      setCurrentSvgIndex(prev => (prev + 1) % svgList.length)
    }, FRAME_INTERVAL)

    return () => {
      if (animationRef.current) clearInterval(animationRef.current)
    }
  }, [])

  // 收到关闭信号后，等待动画播放完一轮再关闭
  useEffect(() => {
    if (!shouldClose) return

    const checkAndClose = () => {
      if (currentSvgIndex === svgList.length - 1) {
        setTimeout(() => {
          if (animationRef.current) clearInterval(animationRef.current)
          setIsLoading(false)
        }, FRAME_INTERVAL)
      } else {
        closeCheckRef.current = requestAnimationFrame(checkAndClose)
      }
    }

    closeCheckRef.current = requestAnimationFrame(checkAndClose)

    return () => {
      if (closeCheckRef.current) cancelAnimationFrame(closeCheckRef.current)
    }
  }, [shouldClose, currentSvgIndex])

  if (!isLoading) return null

  return (
    <div className="loading-overlay">
      <div className="loading-svg-container">
        <img src={svgList[currentSvgIndex]} alt="Loading" className="loading-svg" />
      </div>
    </div>
  )
}

export default Loading
