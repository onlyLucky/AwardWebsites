import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  // 首页不显示 header
  if (isHome) return null

  return (
    <Link
      to="/"
      className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-background/80 backdrop-blur-sm text-sm font-semibold tracking-tight hover:bg-background/90 hover:opacity-80 transition-all"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Link>
  )
}

export default Header
