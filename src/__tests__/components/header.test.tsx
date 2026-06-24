import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from '@/components/header'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn() }),
}))

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}))

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />)
    expect(true).toBe(true)
  })
})
