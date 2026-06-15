import { useEffect, useRef, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
  rootMargin?: string
}

export function useInfiniteScroll({ hasMore, loading, onLoadMore, rootMargin = '100px' }: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasMore && !loading) {
        onLoadMore()
      }
    },
    [hasMore, loading, onLoadMore]
  )

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(handleIntersect, { rootMargin })
    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [handleIntersect, rootMargin])

  return { sentinelRef }
}
