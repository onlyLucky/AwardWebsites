import { createContext, useContext, useState } from 'react'

const LoadingContext = createContext()

function LoadingProvider({ children }) {
  const [visible, setVisible] = useState(true)

  const hideLoading = () => {
    setVisible(false)
  }

  return (
    <LoadingContext.Provider value={{ visible, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

export { LoadingProvider, useLoading }
