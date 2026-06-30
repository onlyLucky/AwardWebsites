'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import DemoWrapper from '@/components/demo-wrapper'
import PageTransition from '@/components/page-transition'

// 导入 animejs demo 样式（需要在客户端组件中导入，不能在动态加载的组件中）
import '@/demos/animejs/styles/tailwind.css'
import '@/demos/animejs/styles/components.css'

// Demo 名称映射
const DEMO_NAMES: Record<string, string> = {
  'follow-art': 'follow.art',
  'shader-se': 'shader.se',
  animejs: 'Anime.js',
}

// 动态导入 Demo 组件，禁用 SSR
const DEMOS: Record<string, React.ComponentType> = {
  'follow-art': dynamic(() => import('@/demos/follow-art'), { ssr: false }),
  'shader-se': dynamic(() => import('@/demos/shader-se'), { ssr: false }),
  animejs: dynamic(() => import('@/demos/animejs'), { ssr: false }),
}

interface DemoPageClientProps {
  slug: string
}

export default function DemoPageClient({ slug }: DemoPageClientProps) {
  // 检查 Demo 是否存在
  if (!DEMOS[slug]) {
    notFound()
  }

  // 获取 Demo 组件和名称
  const DemoComponent = DEMOS[slug]
  const demoName = DEMO_NAMES[slug] || slug

  return (
    <PageTransition>
      <DemoWrapper Component={DemoComponent} name={demoName} />
    </PageTransition>
  )
}
