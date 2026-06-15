import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'

interface MouseContextType {
  x: number
  y: number
  getMouseOffset: () => { x: number; y: number }
}

const MouseContext = createContext<MouseContextType>({
  x: 0.5,
  y: 0.5,
  getMouseOffset: () => ({ x: 0, y: 0 }),
})

export const useMouse = () => useContext(MouseContext)

interface MouseProviderProps {
  children: ReactNode
}

export function MouseProvider({ children }: MouseProviderProps) {
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const mouseTarget = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 归一化到 0-1 范围
      mouseTarget.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    // GSAP 缓动实现平滑鼠标跟随
    const updateSmoothMouse = () => {
      gsap.to(smoothMouseRef.current, {
        x: mouseTarget.current.x,
        y: mouseTarget.current.y,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true,
      })
      mouseRef.current = { ...smoothMouseRef.current }
    }

    // 使用 GSAP ticker 更新
    gsap.ticker.add(updateSmoothMouse)

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      gsap.ticker.remove(updateSmoothMouse)
    }
  }, [])

  const getMouseOffset = () => ({
    x: (smoothMouseRef.current.x - 0.5) * 2, // -1 到 1
    y: (smoothMouseRef.current.y - 0.5) * 2,
  })

  return (
    <MouseContext.Provider value={{
      x: mouseRef.current.x,
      y: mouseRef.current.y,
      getMouseOffset,
    }}>
      {children}
    </MouseContext.Provider>
  )
}
