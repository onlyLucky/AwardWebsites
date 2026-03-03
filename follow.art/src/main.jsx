import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.less'
import { CounterProvider } from './context/CounterProvider'
import AppRouter from './router'
import Loading from './components/Loading'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CounterProvider>
      <>
        <Loading />
        <AppRouter />
      </>
    </CounterProvider>
  </StrictMode>,
)
