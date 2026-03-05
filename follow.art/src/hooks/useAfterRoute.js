import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 页面标题映射
const pageTitles = {
  '/': '首页 - follow.art',
  '/about': '关于我们 - follow.art',
  '/counter': '计数器示例 - follow.art'
}

// 滚动到页面顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 更新页面标题
const updatePageTitle = (pathname) => {
  const title = pageTitles[pathname] || 'follow.art'
  document.title = title
}

// 清理临时数据
const clearTempData = () => {
  // 清理 sessionStorage 中的临时数据
  const tempKeys = Object.keys(sessionStorage).filter(key => 
    key.startsWith('temp_')
  )
  tempKeys.forEach(key => {
    sessionStorage.removeItem(key)
  })
}

// 后置处理函数
const afterRouteHooks = {
  '/': [
    () => {
      scrollToTop()
      updatePageTitle('/')
      clearTempData()
    }
  ],
  '/about': [
    () => {
      scrollToTop()
      updatePageTitle('/about')
    }
  ],
  '/counter': [
    () => {
      scrollToTop()
      updatePageTitle('/counter')
    }
  ]
}

function useAfterRoute(pathname) {
  useEffect(() => {
    const hooks = afterRouteHooks[pathname] || afterRouteHooks['*']
    
    if (hooks) {
      hooks.forEach(hook => {
        try {
          hook()
        } catch (err) {
          console.error('后置处理执行失败:', err)
        }
      })
    }
  }, [pathname])
}

export { useAfterRoute, scrollToTop, updatePageTitle, clearTempData }
