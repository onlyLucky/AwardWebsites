// ===== SponsorButton 自定义元素兼容组件 =====
// 对应源码 <sponsor-button> 自定义元素
// 包裹 sponsor 链接,提供统一的视觉表现

import type { ReactNode, CSSProperties } from 'react'

export interface SponsorButtonProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * React 组件形式的 SponsorButton
 * 用法: <SponsorButton><a ...>...</a></SponsorButton>
 */
export default function SponsorButton({ children, className = '', style }: SponsorButtonProps) {
  return (
    <sponsor-button class={className} style={style}>
      {children}
    </sponsor-button>
  )
}

// ===== 注册全局 custom element =====
// 确保 HTML 中已存在的 <sponsor-button> 节点能够正常工作
if (typeof window !== 'undefined' && !customElements.get('sponsor-button')) {
  class SponsorButtonElement extends HTMLElement {
    connectedCallback() {
      // 简单的容器元素,样式由 CSS 控制
      this.style.display = 'contents'
    }
  }
  customElements.define('sponsor-button', SponsorButtonElement)
}
