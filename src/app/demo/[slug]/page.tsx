import DemoPageClient from './demo-page-client'

// 所有可用的 demo slug
const DEMO_SLUGS = ['follow-art', 'shader-se', 'animejs']

// 静态导出：生成所有 demo 页面
export function generateStaticParams() {
  return DEMO_SLUGS.map((slug) => ({ slug }))
}

interface DemoPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params
  return <DemoPageClient slug={slug} />
}
