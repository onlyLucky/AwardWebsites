// ===== SponsorsList 自定义元素兼容组件 =====
// 对应源码 <sponsors-list path="..." size="..." boxed> 自定义元素
// 渲染 Platinum / Silver 等赞助商列表

import type { ReactNode } from 'react'
import styles from '@/demos/animejs/styles/animejs.module.css'

export interface SponsorsListProps {
  /** 路径标识：platinum-sponsors / silver-sponsors / gold-sponsors */
  path?: string
  /** 尺寸：large / small */
  size?: 'large' | 'small'
  /** 是否显示外框 */
  boxed?: boolean
  className?: string
}

// 占位赞助商数据
const PLACEHOLDER_SPONSORS: Record<string, Array<{ name: string; url: string }>> = {
  'platinum-sponsors': [
    { name: 'Sponsor', url: 'https://github.com/sponsors/juliangarnier' },
  ],
  'silver-sponsors': [
    { name: 'Silver Sponsor 1', url: 'https://github.com/sponsors/juliangarnier' },
    { name: 'Silver Sponsor 2', url: 'https://github.com/sponsors/juliangarnier' },
  ],
  'gold-sponsors': [
    { name: 'Gold Sponsor 1', url: 'https://github.com/sponsors/juliangarnier' },
  ],
}

/**
 * React 组件形式的 SponsorsList
 */
export default function SponsorsList({
  path = 'platinum-sponsors',
  size = 'large',
  boxed = false,
  className = '',
}: SponsorsListProps) {
  const sponsors = PLACEHOLDER_SPONSORS[path] || []
  const isSmall = size === 'small'

  const renderSponsor = (sponsor: { name: string; url: string }, index: number): ReactNode => {
    if (isSmall) {
      return (
        <li key={index} className={`sponsor-item ${styles['sponsor-item-small']}`}>
          <a href={sponsor.url} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
            {sponsor.name}
          </a>
        </li>
      )
    }
    return (
      <li key={index} className={`sponsor-item ${styles['sponsor-item-large']}`}>
        <a href={sponsor.url} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
          {sponsor.name}
        </a>
      </li>
    )
  }

  return (
    <sponsors-list
      path={path}
      size={size}
      boxed={boxed ? '' : undefined}
      class={className}
    >
      <ul className={`${styles['sponsors-list']} ${styles[`sponsors-list-${size}`]}${boxed ? ` ${styles['sponsors-list-boxed']}` : ''}`}>
        {sponsors.map(renderSponsor)}
      </ul>
    </sponsors-list>
  )
}

// ===== 注册全局 custom element =====
if (typeof window !== 'undefined' && !customElements.get('sponsors-list')) {
  class SponsorsListElement extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents'
    }
  }
  customElements.define('sponsors-list', SponsorsListElement)
}
