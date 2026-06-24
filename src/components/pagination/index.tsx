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
    <nav className='flex items-center justify-center gap-1.5' aria-label='Pagination'>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className='border-border bg-background hover:bg-accent flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50'
      >
        <ChevronLeft className='h-3.5 w-3.5' />
        <span className='hidden sm:inline'>{prevLabel}</span>
      </button>

      {getVisiblePages().map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className='text-muted-foreground px-1.5'>
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`min-w-[32px] rounded-md px-2 py-1.5 text-sm transition-colors ${
              p === page ? 'bg-primary text-primary-foreground' : 'border-border hover:bg-accent border'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className='border-border bg-background hover:bg-accent flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50'
      >
        <span className='hidden sm:inline'>{nextLabel}</span>
        <ChevronRight className='h-3.5 w-3.5' />
      </button>
    </nav>
  )
}

export default Pagination
