import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  /** Expandable mode: show icon button that expands to input */
  expandable?: boolean
}

function SearchInput({ value, onChange, placeholder, expandable = false }: SearchInputProps) {
  const [expanded, setExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto focus when expanded
  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [expanded])

  // Close on click outside (only in expandable mode)
  useEffect(() => {
    if (!expandable || !expanded) return

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (!value) setExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [expandable, expanded, value])

  // Handle escape key
  useEffect(() => {
    if (!expandable) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (value) {
          onChange('')
        } else {
          setExpanded(false)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [expandable, value, onChange])

  if (expandable) {
    return (
      <div ref={containerRef} className="flex items-center gap-2">
        {/* Search icon button */}
        <button
          onClick={() => setExpanded(true)}
          className={`p-2 rounded-md border border-border hover:bg-accent transition-all ${
            expanded ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
          }`}
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Expandable search input */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expanded ? 'w-64 opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-9 pr-9 py-2 rounded-md border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {value && (
              <button
                onClick={() => onChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-sm hover:bg-accent transition-colors"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Default: always visible input
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-sm hover:bg-accent transition-colors"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      )}
    </div>
  )
}

export default SearchInput
