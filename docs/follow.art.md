# follow.art

## 项目简介
follow.art 是一个前端仿写项目，参考原网站的设计和功能进行学习和实践。该项目使用 React + Vite 技术栈，旨在复现原网站的视觉效果和交互体验。

## 原参考网站
[https://follow.art/](https://follow.art/)

## 技术栈
- 框架：React 19.2.0
- 构建工具：Vite 7.3.1
- 包管理器：pnpm
- 路由管理：React Router DOM 7.13.1
- 状态管理：React Context + useReducer
- 样式预处理：Less 4.5.1
- 代码规范：ESLint 9.39.1
- 其他依赖：
  - @vitejs/plugin-react 5.1.1
  - react-dom 19.2.0
  - @types/react 19.2.7
  - @types/react-dom 19.2.3

## 项目结构
```
follow.art/
├── src/
│   ├── assets/              # 静态资源
│   │   ├── fonts/           # 字体文件
│   │   │   ├── Hardbop-Bold.otf
│   │   │   └── HeadingNow-73Book.otf
│   │   └── react.svg        # React 图标
│   ├── components/          # 公共组件
│   │   ├── Loading.jsx      # 全局 loading 组件
│   │   └── Loading.less     # loading 样式
│   ├── context/             # 状态管理上下文
│   │   ├── CounterContext.jsx   # Counter Context
│   │   ├── CounterProvider.jsx  # Counter Provider
│   │   └── useCounter.jsx       # useCounter Hook
│   ├── pages/               # 页面组件
│   │   ├── Home.jsx         # 首页
│   │   ├── Home.less        # 首页样式
│   │   ├── About.jsx        # 关于页
│   │   ├── About.less       # 关于页样式
│   │   ├── Counter.jsx      # 计数器页
│   │   └── Counter.less     # 计数器页样式
│   ├── router/              # 路由配置
│   │   └── index.jsx        # 路由定义
│   ├── App.jsx              # 主应用组件
│   ├── App.less             # 应用样式
│   ├── index.less           # 全局样式
│   └── main.jsx             # 应用入口文件
├── public/                  # 公共资源
│   └── vite.svg             # Vite 图标
├── index.html               # HTML 入口文件
├── package.json             # 项目配置和依赖
├── pnpm-lock.yaml           # pnpm 锁定文件
├── vite.config.js           # Vite 配置文件
└── eslint.config.js         # ESLint 配置文件
```

## 安装和运行

### Node 版本要求
- Node.js >= 18.0.0

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```

### 构建生产版本
```bash
pnpm build
```

### 预览生产构建
```bash
pnpm preview
```

### 代码检查
```bash
pnpm lint
```

## 主要功能模块
- **全局 Loading 组件**：页面加载时显示 2 秒动画，动画播放完成后 2 秒再消失
- **路由管理**：使用 React Router DOM 实现多页面路由
  - 首页：项目介绍和导航
  - 关于页：技术栈和项目信息
  - 计数器页：使用 useReducer 状态管理的计数器示例
- **状态管理**：使用 React Context + useReducer 实现全局状态管理
- **样式预处理**：使用 Less 进行样式预处理，支持嵌套语法

## 开发日志

### 2026-03-03
- 将 Redux 状态管理更改为 useReducer
- 拆分 Context 和 Hook 文件以符合 React Fast Refresh 规则
- 将所有 CSS 文件转换为 LESS 格式
- 添加全局 loading 公共组件（2 秒动画 + 2 秒延迟隐藏）

### 2026-03-02
- 初始化 follow.art 项目
- 使用 Vite + React 技术栈搭建项目
- 配置 ESLint 代码规范
- 配置 Redux Toolkit 状态管理
- 配置 React Router 路由管理
- 配置 Less 样式预处理
- 添加自定义字体文件（Hardbop-Bold.otf、HeadingNow-73Book.otf）
- 完成基础项目结构搭建

## 注意事项
- 本项目仅用于学习和参考
- 不用于商业用途
- 遵循原网站的版权和许可协议
