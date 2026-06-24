'use client'

import { NextIntlClientProvider } from 'next-intl'
import { useEffect, useState } from 'react'

const FALLBACK_MESSAGES = {
  home: {
    collection: 'Collection',
    title: 'Award Websites',
    description: 'A curated collection of interesting website interactions.',
    search: 'Search demos...',
    noResults: 'No results found',
    loadMore: 'Load more',
    prev: 'Previous',
    next: 'Next',
    visitSite: 'Visit site',
    tags: {
      svg: 'SVG Animation',
      webgl: 'WebGL',
      threejs: 'Three.js',
      mouse: 'Mouse Interaction',
      gsap: 'GSAP Animation',
      animation: 'Animation',
      scroll: 'Scroll Animation',
    },
  },
  demos: {
    followArt: { title: 'follow.art', description: '' },
    shaderSe: { title: 'shader.se', description: '' },
    animejs: { title: 'Anime.js', description: '' },
  },
  header: { back: 'Back' },
}

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState('en')
  const [messages, setMessages] = useState<Record<string, unknown>>(FALLBACK_MESSAGES)

  useEffect(() => {
    const stored = localStorage.getItem('locale')
    const browserLang = navigator.language.toLowerCase()
    const detected = stored || (browserLang.startsWith('zh') ? 'zh' : 'en')
    setLocale(detected)

    import(`@/i18n/locales/${detected}.json`)
      .then((mod) => setMessages(mod.default))
      .catch(() => {})
  }, [])

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
