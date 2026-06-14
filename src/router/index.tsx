import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '@/components/header'
import Home from '@/pages/home'
import FollowArtDemo from '@/pages/demos/follow-art'

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo/follow-art" element={<FollowArtDemo />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default AppRouter
