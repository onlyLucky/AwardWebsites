# 项目文档

## 项目简介

网站交互合集项目，收集和复刻有趣的网站交互效果、动画和视觉样式。

## 技术栈

- React 19 + TypeScript
- Vite 构建
- Tailwind CSS v4
- shadcn/ui 组件库
- Lucide React 图标
- GSAP 动画
- Three.js WebGL（部分 demo）
- React Router DOM v7

## 项目结构

```
src/
├── main.tsx                 # 应用入口
├── index.css                # Tailwind 入口 + 全局样式
├── lib/utils.ts             # shadcn/ui 工具函数
├── components/
│   ├── ui/                  # shadcn/ui 组件
│   └── header/              # 全局 Header
├── pages/
│   ├── home/                # 目录页
│   └── demos/
│       └── follow-art/      # follow.art demo 页面
├── router/index.tsx
└── demos/
    └── follow-art/          # demo 专属组件
        ├── hero-section/
        └── webgl-cards/
```

## 安装和运行

```bash
pnpm install        # 安装依赖
pnpm dev            # 开发服务器
pnpm build          # 生产构建
```

## Demo 列表

### follow.art

- 来源：https://follow.art/
- 交互效果：SVG 字母 scaleY 鼠标驱动动画 + WebGL 3D 卡片浮动视差
- 技术：SVG Path Animation, Three.js, Mouse Interaction
- 路由：`/demo/follow-art`

## 开发日志

### 2026-06-14

- 项目重构：从子项目结构改为统一的网站交互合集
- 技术栈升级：React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui
- 迁移 follow.art demo（JSX → TSX, Less → CSS）
- 删除 follow.art/ 和 shader.se/ 子目录
