import { Suspense, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useScrollProgress } from './hooks/useScrollProgress'
import { usePagesStore } from './store/usePagesStore'

// 3D 场景组件
import { HeroScene } from './components/canvas/HeroScene'
import { ProjectsScene } from './components/canvas/ProjectsScene'
import { AboutUsScene } from './components/canvas/AboutUsScene'
import { ContactScene } from './components/canvas/ContactScene'
import { PostProcessing } from './components/effects/PostProcessing'

// HTML 内容层组件
import { HeroSection } from './components/sections/HeroSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'

// UI 组件
import { Navbar } from './components/ui/Navbar'
import LoadingScreen from './loading-screen'

// 样式
import './styles/shader-se.css'

// 3D 场景选择器
function SceneSelector() {
  const currentSection = usePagesStore((state) => state.currentSection)

  return (
    <>
      {currentSection === 'home' && <HeroScene />}
      {currentSection === 'selected-work' && <ProjectsScene />}
      {currentSection === 'about' && <AboutUsScene />}
      {currentSection === 'contact' && <ContactScene />}
      <PostProcessing />
    </>
  )
}

// 加载状态指示器（使用 R3F 的 Html 组件）
function Loader() {
  return (
    <Html center>
      <div
        style={{
          color: '#fff',
          fontSize: '1rem',
          opacity: 0.5,
          textAlign: 'center',
        }}
      >
        Loading 3D Scene...
      </div>
    </Html>
  )
}

export default function ShaderSeDemo() {
  const [isLoading, setIsLoading] = useState(true)

  // 初始化滚动系统
  useScrollProgress()

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <div className="shader-se-demo">
      {/* 加载画面 */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 导航栏 */}
      <Navbar />

      {/* 3D Canvas 背景 */}
      <div className="shader-se-canvas">
        <Canvas
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [0, 0, 5],
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          shadows
          dpr={[1, 2]}
        >
          <Suspense fallback={<Loader />}>
            <SceneSelector />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML 内容层 */}
      <div className="shader-se-content">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </div>
    </div>
  )
}
