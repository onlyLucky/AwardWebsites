import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Counter from '../pages/Counter'
import RouteWrapper from '../components/RouteWrapper'
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
