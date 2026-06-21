import { create } from 'zustand'

// 页面 section 类型
export type SectionId = 'home' | 'selected-work' | 'about' | 'contact'

// Section 配置
export interface SectionConfig {
  id: SectionId
  label: string
  scrollProgress: [number, number] // [start, end] 滚动进度范围
}

// 默认 section 配置
export const SECTIONS: SectionConfig[] = [
  { id: 'home', label: 'Home', scrollProgress: [0, 0.33] },
  { id: 'selected-work', label: 'Selected Work', scrollProgress: [0.33, 0.66] },
  { id: 'about', label: 'About Us', scrollProgress: [0.66, 0.83] },
  { id: 'contact', label: 'Contact', scrollProgress: [0.83, 1] },
]

interface PagesState {
  // 当前页面索引
  currentIndex: number
  // 当前 section ID
  currentSection: SectionId
  // 全局滚动进度 (0-1)
  scrollProgress: number
  // 各 section 的局部进度 (0-1)
  sectionProgress: Record<SectionId, number>
  // 页面是否锁定
  isLocked: boolean
  // 加载状态
  isLoading: boolean
  // 初始动画是否完成
  isInitialAnimationDone: boolean

  // Actions
  setCurrentIndex: (index: number) => void
  setScrollProgress: (progress: number) => void
  setIsLocked: (locked: boolean) => void
  setIsLoading: (loading: boolean) => void
  setIsInitialAnimationDone: (done: boolean) => void
  scrollToSection: (sectionId: SectionId) => void
}

export const usePagesStore = create<PagesState>((set) => ({
  currentIndex: 0,
  currentSection: 'home',
  scrollProgress: 0,
  sectionProgress: {
    home: 0,
    'selected-work': 0,
    about: 0,
    contact: 0,
  },
  isLocked: false,
  isLoading: true,
  isInitialAnimationDone: false,

  setCurrentIndex: (index: number) => {
    const section = SECTIONS[index]
    if (section) {
      set({ currentIndex: index, currentSection: section.id })
    }
  },

  setScrollProgress: (progress: number) => {
    const clampedProgress = Math.max(0, Math.min(1, progress))

    // 计算当前所在的 section
    let currentSection: SectionId = 'home'
    let sectionLocalProgress = 0

    for (const section of SECTIONS) {
      if (clampedProgress >= section.scrollProgress[0] && clampedProgress < section.scrollProgress[1]) {
        currentSection = section.id
        // 计算 section 内的局部进度
        const [start, end] = section.scrollProgress
        sectionLocalProgress = (clampedProgress - start) / (end - start)
        break
      }
    }

    // 处理边界情况（progress = 1）
    if (clampedProgress >= 1) {
      const lastSection = SECTIONS[SECTIONS.length - 1]
      currentSection = lastSection.id
      sectionLocalProgress = 1
    }

    set((state) => ({
      scrollProgress: clampedProgress,
      currentSection,
      sectionProgress: {
        ...state.sectionProgress,
        [currentSection]: Math.max(0, Math.min(1, sectionLocalProgress)),
      },
    }))
  },

  setIsLocked: (locked: boolean) => set({ isLocked: locked }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setIsInitialAnimationDone: (done: boolean) => set({ isInitialAnimationDone: done }),

  scrollToSection: (sectionId: SectionId) => {
    const sectionIndex = SECTIONS.findIndex((s) => s.id === sectionId)
    if (sectionIndex >= 0) {
      set({ currentIndex: sectionIndex, currentSection: sectionId })
      // 实际滚动由 Lenis 处理
    }
  },
}))
