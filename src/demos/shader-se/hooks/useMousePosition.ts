import { useEffect, useRef, useCallback } from 'react'

interface MousePosition {
  x: number
  y: number
  normalizedX: number // -1 to 1
  normalizedY: number // -1 to 1
}

export function useMousePosition() {
  const mouseRef = useRef<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  })

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event
    const { innerWidth, innerHeight } = window

    mouseRef.current = {
      x: clientX,
      y: clientY,
      normalizedX: (clientX / innerWidth) * 2 - 1,
      normalizedY: -(clientY / innerHeight) * 2 + 1,
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return mouseRef
}
