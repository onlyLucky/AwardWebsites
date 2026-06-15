import { useState, useCallback } from 'react'
import LoadingScreen from '@/demos/shader-se/loading-screen'
import { ScrollProvider } from '@/demos/shader-se/shared/scroll-trigger'
import { MouseProvider } from '@/demos/shader-se/shared/mouse-provider'
import HeroSection from '@/demos/shader-se/hero-section'
import SelectedWork from '@/demos/shader-se/selected-work'
import AboutSection from '@/demos/shader-se/about-section'
import ContactSection from '@/demos/shader-se/contact-section'
import Footer from '@/demos/shader-se/footer'

function ShaderSeDemo() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 主要内容 */}
      {!isLoading && (
        <MouseProvider>
          <ScrollProvider>
            <main>
              <HeroSection />
              <SelectedWork />
              <AboutSection />
              <ContactSection />
              <Footer />
            </main>
          </ScrollProvider>
        </MouseProvider>
      )}
    </div>
  )
}

export default ShaderSeDemo
