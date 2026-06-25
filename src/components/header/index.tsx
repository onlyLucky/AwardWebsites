'use client'

import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Suspense } from 'react'
import Toolbar from '@/components/toolbar'
import { getDemoConfig } from '@/config/demos'

// 隐藏系统顶栏的 demo 路径列表（从配置读取）
function shouldShowToolbar(pathname: string): boolean {
  // 首页始终显示
  if (pathname === '/') return true

  // Demo 页面从配置读取
  const slug = pathname.replace('/demo/', '')
  if (slug && slug !== pathname) {
    return getDemoConfig(slug).showToolbar
  }

  return true
}

function HeaderContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const isHome = pathname === '/'
  const t = useTranslations()

  // 根据配置决定是否显示工具栏
  const showToolbar = shouldShowToolbar(pathname)

  // 如果不显示工具栏且是首页，返回 null
  if (!showToolbar && isHome) return null

  const searchQuery = searchParams.get('q') || ''

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      {/* Toolbar - 根据配置决定是否显示 */}
      {showToolbar && (
        <div className='fixed top-4 right-4 z-50'>
          <Toolbar
            showSearch={isHome}
            searchValue={searchQuery}
            onSearchChange={handleSearchChange}
            searchPlaceholder={t('home.search')}
          />
        </div>
      )}

      {/* Back button - only on demo pages with toolbar */}
      {!isHome && showToolbar && (
        <Link
          href='/'
          className='border-border bg-background/80 hover:bg-background/90 fixed top-4 left-4 z-50 flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-semibold tracking-tight backdrop-blur-sm transition-all hover:opacity-80'
        >
          <ArrowLeft className='h-4 w-4' />
          {t('header.back')}
        </Link>
      )}
    </>
  )
}

export default function Header() {
  return (
    <Suspense fallback={null}>
      <HeaderContent />
    </Suspense>
  )
}
