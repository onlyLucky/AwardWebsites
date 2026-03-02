# follow.art

## 项目简介
follow.art 是一个前端仿写项目，参考原网站的设计和功能进行学习和实践。该项目使用 React + Vite 技术栈，旨在复现原网站的视觉效果和交互体验。

## 原参考网站
[https://follow.art/](https://follow.art/)

## 技术栈
- 框架：React 19.2.0
- 构建工具：Vite 7.3.1
- 包管理器：pnpm
- 代码规范：ESLint 9.39.1
- 其他依赖：
  - @vitejs/plugin-react 5.1.1
  - react-dom 19.2.0

## 项目结构
```
follow.art/
├── src/
│   ├── assets/
│   │   ├── fonts/           # 字体文件
│   │   │   ├── Hardbop-Bold.otf
│   │   │   └── HeadingNow-73Book.otf
│   │   └── react.svg        # React 图标
│   ├── App.jsx              # 主应用组件
│   ├── App.css              # 应用样式
│   ├── index.css            # 全局样式
│   └── main.jsx             # 应用入口文件
├── public/
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

## 开发日志

### 2026-03-02
- 初始化 follow.art 项目
- 使用 Vite + React 技术栈搭建项目
- 配置 ESLint 代码规范
- 添加自定义字体文件（Hardbop-Bold.otf、HeadingNow-73Book.otf）
- 完成基础项目结构搭建

## 注意事项
- 本项目仅用于学习和参考
- 不用于商业用途
- 遵循原网站的版权和许可协议
