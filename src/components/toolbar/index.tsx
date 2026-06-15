import { useI18n } from '@/i18n'
import { useTheme } from '@/hooks/use-theme'
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
  const { locale, setLocale } = useI18n()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center gap-2 h-9">
      {/* Search (desktop only) */}
      {showSearch && onSearchChange && (
        <div className="hidden sm:block w-56">
          <SearchInput
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        </div>
      )}

      {/* Language toggle */}
      <button
        onClick={() => setLocale(locale === 'en' ? 'zh' : 'en')}
        className="flex items-center gap-1 px-2.5 h-9 rounded-md border border-border bg-background/80 backdrop-blur-sm text-xs font-medium hover:bg-accent transition-colors"
        aria-label="Toggle language"
      >
        <Languages className="h-3.5 w-3.5" />
        {locale === 'en' ? '中' : 'EN'}
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-9 h-9 rounded-md border border-border bg-background/80 backdrop-blur-sm hover:bg-accent transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="h-3.5 w-3.5" />
        ) : (
          <Sun className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  )
}

export default Toolbar
