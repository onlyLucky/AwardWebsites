/** Demo 配置 */

export interface DemoConfig {
  /** 是否在首页显示 */
  visible: boolean
  /** 是否显示 demo 顶部操作栏（返回、中英文、主题切换） */
  showToolbar: boolean
}

/** Demo 配置映射 */
export const demoConfig: Record<string, DemoConfig> = {
  'follow-art': {
    visible: true,
    showToolbar: true,
  },
  'shader-se': {
    visible: false,
    showToolbar: true,
  },
  'animejs': {
    visible: true,
    showToolbar: false,
  },
}

/** 获取 demo 配置 */
export function getDemoConfig(slug: string): DemoConfig {
  return demoConfig[slug] || { visible: false, showToolbar: true }
}
