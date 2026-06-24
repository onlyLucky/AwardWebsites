// ===== FundingLevel 自定义元素兼容组件 =====
// 对应源码 <funding-level path="github-sponsors"> 自定义元素
// 渲染 GitHub sponsors 列表（占位）

export interface FundingLevelProps {
  /** 路径标识：github-sponsors */
  path?: string
  className?: string
}

// 占位 GitHub sponsors 数据
const PLACEHOLDER_FUNDING = [
  { name: 'GitHub Sponsor 1', url: 'https://github.com/sponsors/juliangarnier' },
  { name: 'GitHub Sponsor 2', url: 'https://github.com/sponsors/juliangarnier' },
  { name: 'GitHub Sponsor 3', url: 'https://github.com/sponsors/juliangarnier' },
]

/**
 * React 组件形式的 FundingLevel
 */
export default function FundingLevel({ path = 'github-sponsors', className = '' }: FundingLevelProps) {
  return (
    <funding-level path={path} class={className}>
      <ul className="funding-level-list">
        {PLACEHOLDER_FUNDING.map((sponsor, index) => (
          <li key={index} className="funding-level-item">
            <a href={sponsor.url} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
              {sponsor.name}
            </a>
          </li>
        ))}
      </ul>
    </funding-level>
  )
}

// ===== 注册全局 custom element =====
if (typeof window !== 'undefined' && !customElements.get('funding-level')) {
  class FundingLevelElement extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents'
    }
  }
  customElements.define('funding-level', FundingLevelElement)
}
