// ===== 自定义元素 JSX 类型声明 =====
// 为 <sponsor-button>、<sponsors-list>、<funding-level> 提供 TypeScript 类型支持

import 'react'
import type { CSSProperties, DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

interface CustomHTMLElementAttributes<T> extends HTMLAttributes<T> {
  /** 自定义元素直接使用 HTML class 属性 */
  class?: string
  children?: ReactNode
  [key: `data-${string}`]: string | number | boolean | undefined
  [key: `aria-${string}`]: string | number | boolean | undefined
}

type CustomElementBase = Omit<DetailedHTMLProps<CustomHTMLElementAttributes<HTMLElement>, HTMLElement>, 'style'> & {
  style?: CSSProperties
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'sponsor-button': CustomElementBase
      'sponsors-list': CustomElementBase & {
        /** 路径标识：platinum-sponsors / silver-sponsors / gold-sponsors */
        path?: string
        /** 尺寸：large / small */
        size?: 'large' | 'small'
        /** 是否显示外框 */
        boxed?: string
      }
      'funding-level': CustomElementBase & {
        /** 路径标识：github-sponsors */
        path?: string
      }
    }
  }
}

export {}
