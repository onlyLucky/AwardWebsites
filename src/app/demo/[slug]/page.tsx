'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

// 动态导入 Demo 组件，禁用 SSR
const DEMOS: Record<string, React.ComponentType> = {
  'follow-art': dynamic(() => import('@/demos/follow-art'), {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }),
  'shader-se': dynamic(() => import('@/demos/shader-se'), {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }),
  animejs: dynamic(() => import('@/demos/animejs'), {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }),
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

  // 获取 Demo 组件
  const DemoComponent = DEMOS[slug]

  return <DemoComponent />
}
