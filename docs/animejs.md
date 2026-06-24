# animejs

## 项目简介

复刻 animejs.com 首页的交互效果和视觉样式，包含滚动驱动动画、特性展示、模块可视化等功能。

## 技术栈

- React 19 + TypeScript
- Vite 构建
- Tailwind CSS v4
- CSS Modules（demo 专属样式）
- Anime.js（动画库）

## 项目结构

```
src/
├── demos/
│   └── animejs/
│       ├── index.tsx                    # 根组件
│       ├── styles/
│       │   └── animejs.css              # 全局样式（CSS 变量、布局）
│       ├── hooks/
│       │   └── useScrollAnimation.ts    # 滚动动画 hook
│       ├── data/
│       │   └── features.ts             # 特性数据
│       └── components/
│           ├── header/
│           │   └── index.tsx           # Header 组件
│           ├── home/
│           │   ├── index.tsx           # Home 容器
│           │   ├── intro.tsx           # Intro Section
│           │   ├── toolbox.tsx         # Toolbox Section
│           │   ├── features-gallery.tsx # Features Gallery
│           │   ├── modules.tsx         # Modules Section
│           │   ├── sponsors.tsx        # Sponsors Section
│           │   └── get-started.tsx     # Get Started Section
│           ├── sub-nav/
│           │   └── index.tsx           # Sub Nav（滚动进度、代码片段）
│           ├── footer/
│           │   └── index.tsx           # Footer 组件
│           └── engine/
│               └── index.tsx           # 3D 引擎（Canvas）
└── pages/
    └── demos/
        └── animejs/
            └── index.tsx               # 页面组件
```

## 安装和运行

```bash
pnpm install        # 安装依赖
pnpm dev            # 开发服务器
pnpm build          # 生产构建
```

## 开发日志

### 2026-06-23

- 完成源码细分对比（排除 3D 引擎部分）
- 对比结果：HTML 结构、CSS 样式、响应式设计均 100% 还原
- 修复 3 个差异项：
  - D-01: Sponsors Section 使用 `<sponsors-list>` 自定义组件
  - D-02: Footer error message 添加邮箱链接
  - D-03: Header sponsor-button 使用 `<sponsor-button>` 包裹
- 详细对比报告：`.claude/documents/animejs-source-compare.md`

### 2026-06-22

- 初版复刻完成
- 实现所有 section 组件（Header、Intro、Toolbox、Features、Modules、Sponsors、GetStarted、SubNav、Footer）
- 实现 CSS 变量系统和响应式设计
- 排除 3D 引擎（Engine）部分
