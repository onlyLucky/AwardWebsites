'use client'

import { Suspense, useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, MousePointerClick, Sparkles, ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import SearchInput from '@/components/search-input'
import Pagination from '@/components/pagination'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import PageTransition from '@/components/page-transition'

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
    icon: <MousePointerClick className='h-5 w-5' />,
  },
  {
    titleKey: 'demos.shaderSe.title',
    descKey: 'demos.shaderSe.description',
    tagKeys: ['home.tags.webgl', 'home.tags.threejs', 'home.tags.gsap'],
    path: '/demo/shader-se',
    url: 'https://shader.se',
    preview: '/previews/shader-se.svg',
    icon: <MousePointerClick className='h-5 w-5' />,
  },
  {
    titleKey: 'demos.animejs.title',
    descKey: 'demos.animejs.description',
    tagKeys: ['home.tags.animation', 'home.tags.gsap', 'home.tags.scroll'],
    path: '/demo/animejs',
    url: 'https://animejs.com',
    preview: '/previews/animejs.svg',
    icon: <MousePointerClick className='h-5 w-5' />,
  },
]

const PAGE_SIZE = 12

function HomeContent() {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
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
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='min-h-screen px-4 py-8 sm:px-6 sm:py-16 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-8 sm:mb-12'>
          <div className='mb-2 flex items-center gap-2 sm:mb-3'>
            <Sparkles className='text-muted-foreground h-4 w-4 sm:h-5 sm:w-5' />
            <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase sm:text-sm'>
              {t('home.collection')}
            </span>
          </div>
          <h1 className='mb-2 text-2xl font-bold tracking-tight sm:mb-3 sm:text-4xl'>{t('home.title')}</h1>
          <p className='text-muted-foreground max-w-3xl text-base leading-relaxed sm:text-lg'>
            {t('home.description')}
          </p>
        </div>

        {/* Mobile search (desktop uses toolbar search) */}
        <div className='mb-6 sm:hidden'>
          <SearchInput value={searchQuery} onChange={handleSearchChange} placeholder={t('home.search')} />
        </div>

        {/* Demo Grid */}
        {displayDemos.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
            {displayDemos.map((demo) => (
              <Card
                key={demo.path}
                className='group hover:border-foreground/20 overflow-hidden transition-all hover:shadow-lg'
              >
                {/* Mobile: horizontal layout */}
                {isMobile ? (
                  <div className='flex'>
                    {/* Preview - Left */}
                    <Link href={demo.path} className='block w-32 shrink-0'>
                      <div className='bg-muted h-full overflow-hidden'>
                        <img
                          src={demo.preview}
                          alt={t(demo.titleKey)}
                          className='h-full w-full object-cover transition-transform group-hover:scale-105'
                          loading='lazy'
                        />
                      </div>
                    </Link>

                    {/* Content - Right */}
                    <div className='flex flex-1 flex-col justify-between p-3'>
                      <div>
                        {/* Title as link to original site */}
                        <a
                          href={demo.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-primary decoration-primary/40 hover:decoration-primary mb-1 inline-flex items-center gap-1 text-sm leading-tight font-semibold underline underline-offset-2'
                        >
                          {t(demo.titleKey)}
                          <ExternalLink className='h-3 w-3 shrink-0' />
                        </a>
                        <p className='text-muted-foreground mb-2 line-clamp-2 text-xs leading-relaxed'>
                          {t(demo.descKey)}
                        </p>
                      </div>
                      <div className='flex flex-wrap gap-1'>
                        {demo.tagKeys.slice(0, 2).map((tagKey) => (
                          <Badge key={tagKey} variant='secondary' className='px-1.5 py-0 text-[10px] font-normal'>
                            {t(tagKey)}
                          </Badge>
                        ))}
                        {demo.tagKeys.length > 2 && (
                          <Badge variant='secondary' className='px-1.5 py-0 text-[10px] font-normal'>
                            +{demo.tagKeys.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Desktop: vertical layout */}
                    <Link href={demo.path} className='block'>
                      <div className='bg-muted aspect-video overflow-hidden'>
                        <img
                          src={demo.preview}
                          alt={t(demo.titleKey)}
                          className='h-full w-full object-cover transition-transform group-hover:scale-105'
                          loading='lazy'
                        />
                      </div>
                    </Link>

                    <div className='space-y-2 p-4'>
                      {/* Title row with icon and visit link */}
                      <div className='flex items-center justify-between'>
                        <Link href={demo.path} className='flex items-center gap-2'>
                          <div className='bg-muted flex h-7 w-7 items-center justify-center rounded-md border'>
                            {demo.icon}
                          </div>
                          <span className='text-sm font-semibold'>{t(demo.titleKey)}</span>
                          <ArrowUpRight className='text-muted-foreground h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                        </Link>
                        <a
                          href={demo.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs transition-colors'
                        >
                          <ExternalLink className='h-3 w-3' />
                          {t('home.visitSite')}
                        </a>
                      </div>

                      <p className='text-muted-foreground line-clamp-2 text-xs leading-relaxed'>{t(demo.descKey)}</p>

                      <div className='flex flex-wrap gap-1 pt-1'>
                        {demo.tagKeys.map((tagKey) => (
                          <Badge key={tagKey} variant='secondary' className='text-xs font-normal'>
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
          <div className='text-muted-foreground py-12 text-center sm:py-20'>
            <p>{t('home.noResults')}</p>
          </div>
        )}

        {/* Infinite Scroll Sentinel (mobile) */}
        {isMobile && hasMore && (
          <div ref={sentinelRef} className='py-8 text-center'>
            <button
              onClick={loadMore}
              className='border-border hover:bg-accent rounded-md border px-4 py-2 text-sm transition-colors'
            >
              {t('home.loadMore')}
            </button>
          </div>
        )}

        {/* Pagination (desktop) */}
        {!isMobile && totalPages > 1 && (
          <div className='mt-8 sm:mt-12'>
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

      {/* ICP 备案号 */}
      <footer className='fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80'>
        <div className='flex items-center justify-center py-3'>
          <a
            href='https://beian.miit.gov.cn/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-xs text-blue-600 underline underline-offset-2 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
          >
            {t('footer.icp')}
          </a>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className='min-h-screen flex items-center justify-center'>Loading...</div>}>
      <PageTransition>
        <HomeContent />
      </PageTransition>
    </Suspense>
  )
}
