import { useReducer } from 'react'
import CounterContext from './CounterContext.jsx'

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { value: state.value + 1 }
    case 'decrement':
      return { value: state.value - 1 }
    case 'incrementByAmount':
      return { value: state.value + action.payload }
    default:
      return state
  }
}

const initialState = { value: 0 }

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, initialState)

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  )
}

export { CounterProvider }
