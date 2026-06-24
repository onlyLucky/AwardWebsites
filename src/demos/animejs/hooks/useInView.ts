// ===== useInView Hook =====
// 使用 IntersectionObserver 监听元素进入视口
// 进入时给元素添加 is-in-view class

import { useEffect } from 'react'
import type { RefObject } from 'react'

export interface UseInViewOptions {
  /** 是否只触发一次，默认 false */
  once?: boolean
  /** 触发阈值，默认 0.5 */
  threshold?: number | number[]
  /** 根元素，默认 null（视口） */
  root?: Element | null
  /** root margin，默认 '0px' */
  rootMargin?: string
}

export function useInView<T extends HTMLElement>(
  ref: RefObject<T>,
  options: UseInViewOptions = {}
): void {
  const {
    once = false,
    threshold = 0.5,
    root = null,
    rootMargin = '0px',
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      // 降级：直接视为可见
      element.classList.add('is-in-view')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('is-in-view')
            if (once) observer.unobserve(element)
          } else if (!once) {
            element.classList.remove('is-in-view')
          }
        })
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, once, threshold, root, rootMargin])
}
