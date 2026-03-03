import { useCounter } from '../context/useCounter'
import './Counter.less'

function Counter() {
  const { state, dispatch } = useCounter()

  return (
    <div className="counter-container">
      <h1>计数器示例</h1>
      <div className="count-display">当前计数: {state.value}</div>
      <div className="button-group">
        <button className="btn" onClick={() => dispatch({ type: 'increment' })}>
          +
        </button>
        <button className="btn" onClick={() => dispatch({ type: 'decrement' })}>
          -
        </button>
        <button
          className="btn"
          onClick={() => dispatch({ type: 'incrementByAmount', payload: 5 })}
        >
          +5
        </button>
      </div>
      <div className="back-link">
        <a href="/" className="back-button">
          返回首页
        </a>
      </div>
    </div>
  )
}

export default Counter
