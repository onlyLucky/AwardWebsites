/// <reference types="vite/client" />

// animejs.com 自定义元素类型声明
declare namespace JSX {
  interface IntrinsicElements {
    'sponsors-list': {
      size?: string
      boxed?: boolean
      path?: string
      children?: React.ReactNode
    }
    'sponsor-button': {
      children?: React.ReactNode
    }
    'funding-level': {
      path?: string
      children?: React.ReactNode
    }
    'email-signup': {
      url?: string
      class?: string
      children?: React.ReactNode
    }
  }
}
