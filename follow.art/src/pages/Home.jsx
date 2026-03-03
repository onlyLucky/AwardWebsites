import { Link } from 'react-router-dom'
import './Home.less'

function Home() {
  return (
    <div className="home-container">
      <h1>欢迎来到 follow.art</h1>
      <p>这是一个前端仿写项目集合</p>
      <div className="nav-links">
        <Link to="/about" className="nav-link">
          关于我们
        </Link>
        <Link to="/counter" className="nav-link">
          计数器示例
        </Link>
      </div>
    </div>
  )
}

export default Home
