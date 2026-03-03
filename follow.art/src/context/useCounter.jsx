import { useContext } from 'react'
import CounterContext from './CounterContext.jsx'

function useCounter() {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider')
  }
  return context
}

export { useCounter }
