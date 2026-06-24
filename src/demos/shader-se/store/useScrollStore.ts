import { create } from 'zustand'
import type Lenis from 'lenis'

interface ScrollState {
  // Lenis 实例
  lenis: Lenis | null
  // 滚动速度
  velocity: number
  // 滚动方向 (1 = 向下, -1 = 向上)
  direction: 1 | -1
  // 是否正在滚动
  isScrolling: boolean
  // 滚动容器引用
  containerRef: HTMLElement | null

  // Actions
  setLenis: (lenis: Lenis | null) => void
  setVelocity: (velocity: number) => void
  setDirection: (direction: 1 | -1) => void
  setIsScrolling: (scrolling: boolean) => void
  setContainerRef: (ref: HTMLElement | null) => void
  scrollTo: (
    target: number | string,
    options?: { offset?: number; duration?: number; easing?: (t: number) => number }
  ) => void
}

export const useScrollStore = create<ScrollState>((set, get) => ({
  lenis: null,
  velocity: 0,
  direction: 1,
  isScrolling: false,
  containerRef: null,

  setLenis: (lenis: Lenis | null) => set({ lenis }),
  setVelocity: (velocity: number) => set({ velocity }),
  setDirection: (direction: 1 | -1) => set({ direction }),
  setIsScrolling: (scrolling: boolean) => set({ isScrolling: scrolling }),
  setContainerRef: (ref: HTMLElement | null) => set({ containerRef: ref }),

  scrollTo: (target, options) => {
    const { lenis } = get()
    if (lenis) {
      lenis.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration ?? 1.2,
        easing: options?.easing ?? ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      })
    }
  },
}))
