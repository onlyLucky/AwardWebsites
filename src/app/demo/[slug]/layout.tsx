import type { Metadata } from 'next'

interface DemoLayoutProps {
  children: React.ReactNode
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: DemoLayoutProps): Promise<Metadata> {
  const { slug } = await params

  const titles: Record<string, string> = {
    'follow-art': 'Follow Art Demo',
    'shader-se': 'Shader SE Demo',
    animejs: 'Anime.js Demo',
  }

  return {
    title: titles[slug] || 'Demo',
    description: `Interactive demo: ${slug}`,
  }
}

export default async function DemoLayout({ children, params }: DemoLayoutProps) {
  await params
  return <>{children}</>
}
