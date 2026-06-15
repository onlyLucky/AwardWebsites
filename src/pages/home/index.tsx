import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, MousePointerClick, Sparkles, ExternalLink } from 'lucide-react'
import { useI18n } from '@/i18n'
import SearchInput from '@/components/search-input'
import Pagination from '@/components/pagination'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'

interface DemoItem {
  titleKey: string
  descKey: string
  tagKeys: string[]
  path: string
  url: string
  preview: string
  icon: React.ReactNode
}

const demos: DemoItem[] = [
  {
    titleKey: 'demos.followArt.title',
    descKey: 'demos.followArt.description',
    tagKeys: ['home.tags.svg', 'home.tags.webgl', 'home.tags.threejs', 'home.tags.mouse'],
    path: '/demo/follow-art',
    url: 'https://follow.art',
    preview: '/previews/follow-art.svg',
    icon: <MousePointerClick className="h-5 w-5" />,
  },
  {
    titleKey: 'demos.shaderSe.title',
    descKey: 'demos.shaderSe.description',
    tagKeys: ['home.tags.webgl', 'home.tags.threejs', 'home.tags.gsap'],
    path: '/demo/shader-se',
    url: 'https://shader.se',
    preview: '/previews/shader-se.svg',
    icon: <MousePointerClick className="h-5 w-5" />,
  },
]

const PAGE_SIZE = 12

function Home() {
  const { t } = useI18n()
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(1)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [isMobile, setIsMobile] = useState(false)

  const searchQuery = searchParams.get('q') || ''

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Reset page/visibleCount on search change
  useEffect(() => {
    setPage(1)
    setVisibleCount(PAGE_SIZE)
  }, [searchQuery])

  // Filter demos
  const filteredDemos = useMemo(() => {
    if (!searchQuery.trim()) return demos
    const q = searchQuery.toLowerCase()
    return demos.filter((demo) => {
      const title = t(demo.titleKey).toLowerCase()
      const desc = t(demo.descKey).toLowerCase()
      const tags = demo.tagKeys.map((k) => t(k).toLowerCase())
      return title.includes(q) || desc.includes(q) || tags.some((tag) => tag.includes(q))
    })
  }, [searchQuery, t])

  // Pagination (desktop)
  const totalPages = Math.ceil(filteredDemos.length / PAGE_SIZE)
  const pagedDemos = filteredDemos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Infinite scroll (mobile)
  const mobileDemos = filteredDemos.slice(0, visibleCount)
  const hasMore = visibleCount < filteredDemos.length
  const loadMore = () => setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredDemos.length))

  const { sentinelRef } = useInfiniteScroll({
    hasMore: isMobile && hasMore,
    loading: false,
    onLoadMore: loadMore,
  })

  const displayDemos = isMobile ? mobileDemos : pagedDemos

  const handleSearchChange = (value: string) => {
    if (value) {
      setSearchParams({ q: value })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <span className="text-xs sm:text-sm text-muted-foreground font-medium tracking-wide uppercase">
              {t('home.collection')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2 sm:mb-3">
            {t('home.title')}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl">
            {t('home.description')}
          </p>
        </div>

        {/* Mobile search (desktop uses toolbar search) */}
        <div className="mb-6 sm:hidden">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t('home.search')}
          />
        </div>

        {/* Demo Grid */}
        {displayDemos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayDemos.map((demo) => (
              <Card key={demo.path} className="group transition-all hover:shadow-lg hover:border-foreground/20 overflow-hidden">
                {/* Mobile: horizontal layout */}
                {isMobile ? (
                  <div className="flex">
                    {/* Preview - Left */}
                    <Link to={demo.path} className="block w-32 shrink-0">
                      <div className="h-full overflow-hidden bg-muted">
                        <img
                          src={demo.preview}
                          alt={t(demo.titleKey)}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </Link>

                    {/* Content - Right */}
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        {/* Title as link to original site */}
                        <a
                          href={demo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold leading-tight text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary mb-1"
                        >
                          {t(demo.titleKey)}
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                          {t(demo.descKey)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {demo.tagKeys.slice(0, 2).map((tagKey) => (
                          <Badge key={tagKey} variant="secondary" className="font-normal text-[10px] px-1.5 py-0">
                            {t(tagKey)}
                          </Badge>
                        ))}
                        {demo.tagKeys.length > 2 && (
                          <Badge variant="secondary" className="font-normal text-[10px] px-1.5 py-0">
                            +{demo.tagKeys.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Desktop: vertical layout */}
                    <Link to={demo.path} className="block">
                      <div className="aspect-video overflow-hidden bg-muted">
                        <img
                          src={demo.preview}
                          alt={t(demo.titleKey)}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </Link>

                    <div className="p-4 space-y-2">
                      {/* Title row with icon and visit link */}
                      <div className="flex items-center justify-between">
                        <Link to={demo.path} className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-muted">
                            {demo.icon}
                          </div>
                          <span className="text-sm font-semibold">
                            {t(demo.titleKey)}
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <a
                          href={demo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {t('home.visitSite')}
                        </a>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {t(demo.descKey)}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {demo.tagKeys.map((tagKey) => (
                          <Badge key={tagKey} variant="secondary" className="font-normal text-xs">
                            {t(tagKey)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-20 text-muted-foreground">
            <p>{t('home.noResults')}</p>
          </div>
        )}

        {/* Infinite Scroll Sentinel (mobile) */}
        {isMobile && hasMore && (
          <div ref={sentinelRef} className="py-8 text-center">
            <button
              onClick={loadMore}
              className="px-4 py-2 rounded-md border border-border text-sm hover:bg-accent transition-colors"
            >
              {t('home.loadMore')}
            </button>
          </div>
        )}

        {/* Pagination (desktop) */}
        {!isMobile && totalPages > 1 && (
          <div className="mt-8 sm:mt-12">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              prevLabel={t('home.prev')}
              nextLabel={t('home.next')}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
