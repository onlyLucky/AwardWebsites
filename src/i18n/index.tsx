import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import en from './locales/en.json'
import zh from './locales/zh.json'

export type Locale = 'en' | 'zh'

const locales: Record<Locale, typeof en> = { en, zh }

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function getStoredLocale(): Locale {
  const stored = localStorage.getItem('locale')
  if (stored === 'en' || stored === 'zh') return stored
  // Detect browser language
  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith('zh') ? 'zh' : 'en'
}

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return path // Return key if path is invalid
    }
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === 'string' ? current : path
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale)

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }, [])

  const t = useCallback((key: string) => {
    return getNestedValue(locales[locale] as Record<string, unknown>, key)
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
