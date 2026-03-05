import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRouteGuard } from '../context/RouteGuardContext'
import { useLoading } from '../context/LoadingContext'

function RouteWrapper({ children, beforeGuards = [], afterGuards = [] }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { executeBeforeGuards, executeAfterGuards } = useRouteGuard()
  const { hideLoading } = useLoading()

  useEffect(() => {
    // 执行前置守卫
    console.log("执行前置守卫")
    const runBeforeGuards = async () => {
      const allowed = await executeBeforeGuards(beforeGuards)
      if (!allowed) {
        // 如果前置守卫失败，重定向到首页
        navigate('/', { replace: true })
      }
    }

    runBeforeGuards()
  }, [location.pathname])

  useEffect(() => {
    console.log("执行后置处理")
    // 执行后置处理
    const runAfterGuards = async () => {
      await executeAfterGuards(afterGuards)
      // 页面加载完成后隐藏 loading
      hideLoading()
    }

    runAfterGuards()
  }, [location.pathname])

  return <>{children}</>
}

export default RouteWrapper
