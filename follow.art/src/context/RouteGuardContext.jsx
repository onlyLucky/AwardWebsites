import { useEffect, useState, createContext, useContext } from 'react'

const RouteGuardContext = createContext()

function RouteGuardProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const executeBeforeGuards = async (guards) => {
    setLoading(true)
    setError(null)

    try {
      for (const guard of guards) {
        const result = await guard()
        if (!result.allowed) {
          setError(result.error || '访问被拒绝')
          setLoading(false)
          return false
        }
      }
      return true
    } catch (err) {
      setError(err.message || '路由守卫执行失败')
      setLoading(false)
      return false
    }
  }

  const executeAfterGuards = async (guards) => {
    try {
      for (const guard of guards) {
        await guard()
      }
    } catch (err) {
      console.error('后置守卫执行失败:', err)
    }
  }

  return (
    <RouteGuardContext.Provider value={{ loading, error, executeBeforeGuards, executeAfterGuards }}>
      {children}
    </RouteGuardContext.Provider>
  )
}

function useRouteGuard() {
  const context = useContext(RouteGuardContext)
  if (!context) {
    throw new Error('useRouteGuard must be used within RouteGuardProvider')
  }
  return context
}

export { RouteGuardProvider, useRouteGuard }
