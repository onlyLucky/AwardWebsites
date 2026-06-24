'use client'

import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Toolbar from '@/components/toolbar'

// 隐藏系统顶栏的 demo 路径列表
const HIDE_HEADER_ROUTES = ['/demo/animejs']

function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const isHome = pathname === '/'
  const isHidden = HIDE_HEADER_ROUTES.includes(pathname)
  const t = useTranslations()

  // 部分 demo 有自己的导航，隐藏系统顶栏
  if (isHidden) return null

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
      {/* Toolbar - always visible, fixed top-right */}
      <div className='fixed top-4 right-4 z-50'>
        <Toolbar
          showSearch={isHome}
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder={t('home.search')}
        />
      </div>

      {/* Back button - only on demo pages */}
      {!isHome && (
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

export default Header
