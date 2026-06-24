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
      <div ref={containerRef} className='flex items-center gap-2'>
        {/* Search icon button */}
        <button
          onClick={() => setExpanded(true)}
          className={`border-border hover:bg-accent rounded-md border p-2 transition-all ${
            expanded ? 'pointer-events-none scale-90 opacity-0' : 'scale-100 opacity-100'
          }`}
          aria-label='Search'
        >
          <Search className='h-4 w-4' />
        </button>

        {/* Expandable search input */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expanded ? 'w-64 opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <div className='relative'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
            <input
              ref={inputRef}
              type='text'
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className='border-border bg-background placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border py-2 pr-9 pl-9 text-sm focus:ring-2 focus:outline-none'
            />
            {value && (
              <button
                onClick={() => onChange('')}
                className='hover:bg-accent absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-0.5 transition-colors'
              >
                <X className='text-muted-foreground h-3.5 w-3.5' />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Default: always visible input
  return (
    <div className='relative'>
      <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='border-border bg-background placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border py-2.5 pr-9 pl-9 text-sm transition-shadow focus:ring-2 focus:outline-none'
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className='hover:bg-accent absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-0.5 transition-colors'
        >
          <X className='text-muted-foreground h-3.5 w-3.5' />
        </button>
      )}
    </div>
  )
}

export default SearchInput
