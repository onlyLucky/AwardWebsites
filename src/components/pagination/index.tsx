import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  prevLabel?: string
  nextLabel?: string
}

function Pagination({ page, totalPages, onPageChange, prevLabel, nextLabel }: PaginationProps) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const pages: (number | '...')[] = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (page > 3) pages.push('...')
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i)
      }
      if (page < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-border bg-background text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{prevLabel}</span>
      </button>

      {getVisiblePages().map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="px-1.5 text-muted-foreground">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`min-w-[32px] px-2 py-1.5 rounded-md text-sm transition-colors ${
              p === page
                ? 'bg-primary text-primary-foreground'
                : 'border border-border hover:bg-accent'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-border bg-background text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="hidden sm:inline">{nextLabel}</span>
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  )
}

export default Pagination
