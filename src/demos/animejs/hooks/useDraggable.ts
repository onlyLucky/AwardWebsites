// ===== useDraggable Hook =====
// 实现圆形可拖拽元素，松手后弹簧回弹效果
// 参考源码 anime.js createDraggable API

'use client'

import { useEffect, useRef, useCallback } from 'react'

interface DraggableOptions {
  containerSelector?: string
  stiffness?: number
  damping?: number
}

export function useDraggable(options: DraggableOptions = {}) {
  const {
    containerSelector = '.draggable-container',
    stiffness = 120,
    damping = 6,
  } = options

  const elementRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const velocityX = useRef(0)
  const velocityY = useRef(0)
  const lastX = useRef(0)
  const lastY = useRef(0)
  const lastTime = useRef(0)
  const animationFrame = useRef<number | null>(null)

  // 弹簧物理模拟
  const springAnimate = useCallback(
    (targetX: number, targetY: number) => {
      const element = elementRef.current
      if (!element) return

      const startTime = performance.now()
      const startXVal = currentX.current
      const startYVal = currentY.current
      const duration = 500 // 动画时长

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // 弹簧缓动函数
        const springEase = (t: number) => {
          const omega = Math.sqrt(stiffness)
          const zeta = damping / (2 * Math.sqrt(stiffness))
          if (zeta < 1) {
            // 欠阻尼
            const omegaD = omega * Math.sqrt(1 - zeta * zeta)
            return 1 - Math.exp(-zeta * omega * t) * (
              Math.cos(omegaD * t) + (zeta * omega / omegaD) * Math.sin(omegaD * t)
            )
          }
          // 临界阻尼或过阻尼
          return 1 - (1 + omega * t) * Math.exp(-omega * t)
        }

        const eased = springEase(progress)
        currentX.current = startXVal + (targetX - startXVal) * eased
        currentY.current = startYVal + (targetY - startYVal) * eased

        element.style.transform = `translate(${currentX.current}px, ${currentY.current}px) scale(${isDragging.current ? 0.8 : 1})`

        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(animate)
        }
      }

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      animationFrame.current = requestAnimationFrame(animate)
    },
    [stiffness, damping]
  )

  // 处理指针按下
  const handlePointerDown = useCallback(
    (e: PointerEvent) => {
      const element = elementRef.current
      if (!element) return

      isDragging.current = true
      startX.current = e.clientX - currentX.current
      startY.current = e.clientY - currentY.current
      lastX.current = e.clientX
      lastY.current = e.clientY
      lastTime.current = performance.now()
      velocityX.current = 0
      velocityY.current = 0

      element.style.cursor = 'grabbing'
      element.style.transform = `translate(${currentX.current}px, ${currentY.current}px) scale(0.8)`

      // 取消正在进行的弹簧动画
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
        animationFrame.current = null
      }

      element.setPointerCapture(e.pointerId)
    },
    []
  )

  // 处理指针移动
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current) return

      const element = elementRef.current
      if (!element) return

      const container = element.closest(containerSelector) as HTMLElement
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()

      // 计算新的位置
      let newX = e.clientX - startX.current
      let newY = e.clientY - startY.current

      // 限制在容器范围内（带摩擦力）
      const maxX = (containerRect.width - elementRect.width) / 2
      const maxY = (containerRect.height - elementRect.height) / 2

      const friction = 0.5
      if (Math.abs(newX) > maxX) {
        newX = maxX + (newX - maxX) * friction
      }
      if (Math.abs(newY) > maxY) {
        newY = maxY + (newY - maxY) * friction
      }

      // 计算速度
      const now = performance.now()
      const dt = now - lastTime.current
      if (dt > 0) {
        velocityX.current = (e.clientX - lastX.current) / dt
        velocityY.current = (e.clientY - lastY.current) / dt
      }
      lastX.current = e.clientX
      lastY.current = e.clientY
      lastTime.current = now

      currentX.current = newX
      currentY.current = newY

      element.style.transform = `translate(${newX}px, ${newY}px) scale(0.8)`
    },
    [containerSelector]
  )

  // 处理指针释放
  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current) return

      const element = elementRef.current
      if (!element) return

      isDragging.current = false
      element.style.cursor = 'grab'

      // 弹簧回弹到中心
      springAnimate(0, 0)
    },
    [springAnimate]
  )

  // 处理 hover 效果
  const handlePointerEnter = useCallback(() => {
    if (isDragging.current) return
    const element = elementRef.current
    if (!element) return

    element.style.transform = `translate(${currentX.current}px, ${currentY.current}px) scale(1.15)`
    element.style.transition = 'transform 0.35s ease-out'
  }, [])

  const handlePointerLeave = useCallback(() => {
    if (isDragging.current) return
    const element = elementRef.current
    if (!element) return

    element.style.transform = `translate(${currentX.current}px, ${currentY.current}px) scale(1)`
    element.style.transition = 'transform 0.35s ease-out'
  }, [])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('pointerdown', handlePointerDown)
    element.addEventListener('pointermove', handlePointerMove)
    element.addEventListener('pointerup', handlePointerUp)
    element.addEventListener('pointerenter', handlePointerEnter)
    element.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      element.removeEventListener('pointerdown', handlePointerDown)
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerup', handlePointerUp)
      element.removeEventListener('pointerenter', handlePointerEnter)
      element.removeEventListener('pointerleave', handlePointerLeave)
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [handlePointerDown, handlePointerMove, handlePointerUp, handlePointerEnter, handlePointerLeave])

  return elementRef
}
