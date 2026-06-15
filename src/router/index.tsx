import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nProvider } from '@/i18n'
import Header from '@/components/header'
import Home from '@/pages/home'
import FollowArtDemo from '@/pages/demos/follow-art'
import ShaderSeDemo from '@/pages/demos/shader-se'

function AppRouter() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo/follow-art" element={<FollowArtDemo />} />
            <Route path="/demo/shader-se" element={<ShaderSeDemo />} />
          </Routes>
        </main>
      </BrowserRouter>
    </I18nProvider>
  )
}

export default AppRouter
