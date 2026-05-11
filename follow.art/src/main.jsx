import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.less'
import { CounterProvider } from './context/CounterProvider'
import { LoadingProvider } from './context/LoadingContext'
import { RouteGuardProvider } from './context/RouteGuardContext'
import AppRouter from './router'
import Loading from './components/loading'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <RouteGuardProvider>
        <CounterProvider>
          <>
            <Loading />
            <AppRouter />
          </>
        </CounterProvider>
      </RouteGuardProvider>
    </LoadingProvider>
  </StrictMode>,
)
