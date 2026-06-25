'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import DemoWrapper from '@/components/demo-wrapper'
import PageTransition from '@/components/page-transition'

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

interface DemoPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function DemoPage({ params }: DemoPageProps) {
  const { slug } = use(params)

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
