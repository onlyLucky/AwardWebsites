import { useEffect, useState } from 'react'
import './Loading.less'

function Loading() {
  const [visible, setVisible] = useState(true)
  const [animationPlayed, setAnimationPlayed] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPlayed(true)
    }, 2000)

    const timer2 = setTimeout(() => {
      setVisible(false)
    }, 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="loading-overlay">
      <div className={`loading-spinner ${animationPlayed ? 'animate' : ''}`}>
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
      </div>
    </div>
  )
}

export default Loading
