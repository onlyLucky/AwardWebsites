import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.less'
import { CounterProvider } from './context/CounterProvider'
import AppRouter from './router'
import Loading from './components/Loading'

// 渲染根组件
createRoot(document.getElementById('root')).render(
  // 启用严格模式以检查潜在问题
  <StrictMode>
    {/* 提供全局计数器状态 */}
    <CounterProvider>
      <>
        {/* 全局加载组件 */}
        <Loading />
        {/* 应用路由 */}
        <AppRouter />
      </>
    </CounterProvider>
  </StrictMode>,
)
