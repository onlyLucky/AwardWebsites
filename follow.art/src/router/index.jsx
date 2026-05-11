import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/home'
import About from '../pages/about'
import Counter from '../pages/counter'
import RouteWrapper from '../components/route-wrapper'
import { useAfterRoute } from '../hooks/useAfterRoute'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <RouteWrapper 
              beforeGuards={[]}
              afterGuards={[]}
            >
              <Home />
            </RouteWrapper>
          } 
        />
        <Route 
          path="/about" 
          element={
            <RouteWrapper 
              beforeGuards={[]}
              afterGuards={[]}
            >
              <About />
            </RouteWrapper>
          } 
        />
        <Route 
          path="/counter" 
          element={
            <RouteWrapper 
              beforeGuards={[]}
              afterGuards={[]}
            >
              <Counter />
            </RouteWrapper>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
