import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useI18n } from '@/i18n'
import Toolbar from '@/components/toolbar'

// 隐藏系统顶栏的 demo 路径列表
const HIDE_HEADER_ROUTES = ['/demo/animejs']

function Header() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isHome = location.pathname === '/'
  const isHidden = HIDE_HEADER_ROUTES.includes(location.pathname)
  const { t } = useI18n()

  // 部分 demo 有自己的导航，隐藏系统顶栏
  if (isHidden) return null

  const searchQuery = searchParams.get('q') || ''

  const handleSearchChange = (value: string) => {
    if (value) {
      setSearchParams({ q: value })
    } else {
      setSearchParams({})
    }
  }

  return (
    <>
      {/* Toolbar - always visible, fixed top-right */}
      <div className="fixed top-4 right-4 z-50">
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
          to="/"
          className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 h-9 rounded-lg border border-border bg-background/80 backdrop-blur-sm text-sm font-semibold tracking-tight hover:bg-background/90 hover:opacity-80 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('header.back')}
        </Link>
      )}
    </>
  )
}

export default Header
