'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { Sun, Moon, Languages } from 'lucide-react'
import SearchInput from '@/components/search-input'

interface ToolbarProps {
  /** Show search input (desktop only) */
  showSearch?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
}

function Toolbar({ showSearch = false, searchValue = '', onSearchChange, searchPlaceholder }: ToolbarProps) {
  const { theme, setTheme } = useTheme()
  const t = useTranslations()

  const toggleLocale = () => {
    const currentLocale = localStorage.getItem('locale') || 'en'
    const newLocale = currentLocale === 'en' ? 'zh' : 'en'
    localStorage.setItem('locale', newLocale)
    // 刷新页面以应用新语言
    window.location.reload()
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // 获取当前语言
  const currentLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') || 'en' : 'en'

  return (
    <div className='flex h-9 items-center gap-2'>
      {/* Search (desktop only) */}
      {showSearch && onSearchChange && (
        <div className='hidden w-56 sm:block'>
          <SearchInput value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} />
        </div>
      )}

      {/* Language toggle */}
      <button
        onClick={toggleLocale}
        className='border-border bg-background/80 hover:bg-accent flex h-9 items-center gap-1 rounded-md border px-2.5 text-xs font-medium backdrop-blur-sm transition-colors'
        aria-label='Toggle language'
      >
        <Languages className='h-3.5 w-3.5' />
        {currentLocale === 'en' ? '中' : 'EN'}
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className='border-border bg-background/80 hover:bg-accent flex h-9 w-9 items-center justify-center rounded-md border backdrop-blur-sm transition-colors'
        aria-label='Toggle theme'
      >
        {theme === 'light' ? <Moon className='h-3.5 w-3.5' /> : <Sun className='h-3.5 w-3.5' />}
      </button>
    </div>
  )
}

export default Toolbar
