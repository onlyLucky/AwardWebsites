import { Link } from 'react-router-dom'
import './About.less'

function About() {
  return (
    <div className="about-container">
      <h1>关于我们</h1>
      <p>这是一个使用 React + Redux + React Router + Less 构建的前端项目。</p>
      <div className="tech-stack">
        <h3>技术栈</h3>
        <ul>
          <li>React 19 - 前端框架</li>
          <li>Redux Toolkit - 状态管理</li>
          <li>React Router DOM - 路由管理</li>
          <li>Less - CSS 预处理器</li>
          <li>Vite - 构建工具</li>
        </ul>
      </div>
      <div className="back-link">
        <Link to="/" className="back-button">
          返回首页
        </Link>
      </div>
    </div>
  )
}

export default About
