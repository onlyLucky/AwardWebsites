import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { IntlProvider } from '@/providers/intl-provider'
import Header from '@/components/header'

export const metadata: Metadata = {
  title: 'Award Websites - Interactive Demos Collection',
  description: 'Collection of interesting website interactions and animations',
  icons: {
    icon: '/static/favicon-96x96.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* 防止闪烁的脚本 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <IntlProvider>
            <Header />
            {children}
          </IntlProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
