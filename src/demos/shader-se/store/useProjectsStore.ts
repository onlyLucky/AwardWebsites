import { create } from 'zustand'

// 项目数据类型
export interface Project {
  uid: string
  title: string
  subtitle: string
  description: string
  site_link: string
  collaborator?: string
  thumbnail: string
  brightness?: number
  contrast?: number
}

interface ProjectsState {
  // 项目列表
  projects: Project[]
  // 当前项目索引
  currentIndex: number
  // 是否正在拖拽
  isDragging: boolean
  // 拖拽偏移量
  dragOffset: number
  // 是否悬停在拖拽区域
  isHoveringDragArea: boolean

  // Actions
  setProjects: (projects: Project[]) => void
  setCurrentIndex: (index: number) => void
  nextProject: () => void
  prevProject: () => void
  setIsDragging: (dragging: boolean) => void
  setDragOffset: (offset: number) => void
  setIsHoveringDragArea: (hovering: boolean) => void
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  currentIndex: 0,
  isDragging: false,
  dragOffset: 0,
  isHoveringDragArea: false,

  setProjects: (projects: Project[]) => set({ projects }),

  setCurrentIndex: (index: number) => {
    const { projects } = get()
    const clampedIndex = Math.max(0, Math.min(projects.length - 1, index))
    set({ currentIndex: clampedIndex })
  },

  nextProject: () => {
    const { currentIndex, projects } = get()
    const nextIndex = (currentIndex + 1) % projects.length
    set({ currentIndex: nextIndex })
  },

  prevProject: () => {
    const { currentIndex, projects } = get()
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length
    set({ currentIndex: prevIndex })
  },

  setIsDragging: (dragging: boolean) => set({ isDragging: dragging }),
  setDragOffset: (offset: number) => set({ dragOffset: offset }),
  setIsHoveringDragArea: (hovering: boolean) => set({ isHoveringDragArea: hovering }),
}))
