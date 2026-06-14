import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight hover:opacity-70 transition-opacity"
        >
          {!isHome && <ArrowLeft className="h-4 w-4" />}
          {!isHome && <span>Back</span>}
        </Link>

        <Link
          to="/"
          className="text-sm font-bold tracking-tight hover:opacity-70 transition-opacity"
        >
          Award Websites
        </Link>
      </div>
    </header>
  )
}

export default Header
