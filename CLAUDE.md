# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

优秀网站前端复刻学习项目，每个子项目独立运行，无根级 package.json。

**子项目：**
- `follow.art/` — [follow.art](https://follow.art/) 复刻，React 19 + Vite SPA
- `shader.se/` — shader.se 复刻，Next.js 14 App Router + TypeScript（部分实现）

## 常用命令

### follow.art（使用 pnpm）
```bash
cd follow.art
pnpm install        # 安装依赖
pnpm dev            # 开发服务器（Vite，含 --host）
pnpm build          # 生产构建
pnpm lint           # ESLint
```

### shader.se（使用 npm）
```bash
cd shader.se
npm install         # 安装依赖
npm run dev         # 开发服务器 http://localhost:3000
npm run build       # 生产构建
npm run lint        # next lint
```

**两个项目均未配置测试框架。**

## 依赖管理规则

- follow.art 使用 **pnpm**，shader.se 使用 **npm**
- 安装新依赖时遵循对应项目的包管理器，不要混用

## 架构说明

### follow.art
- React 19 SPA，Vite 构建，Less 样式
- 路由：React Router DOM 7，配置在 `src/router/`
- 状态管理：React Context + useReducer（`src/context/`），含 Counter、Loading、RouteGuard 三个 context
- 动画：GSAP，自定义 hooks 在 `src/hooks/`（useAfterRoute、useLoadingAnimation）
- 加载流程：RouteWrapper 组件配合 RouteGuard context 实现页面切换加载动画

### shader.se
- Next.js 14 App Router，TypeScript（strict: false，strictNullChecks: true）
- Tailwind CSS 自定义主题：主色 white、辅色 #c4b5a0、背景 black、字体 "Stix Two Text"
- 组件结构：`components/three/`（3D）、`components/ui/`（UI）、`components/providers/`（上下文）
- GLSL 着色器文件在 `shaders/` 目录
- **当前简化状态**：Three.js、Lenis、HLS.js/Mux 均已移除，使用 CSS 占位。完整实现见 `shader.se/README.md`

## 文档管理

- 子项目文档存放于 `docs/` 目录，命名规则：`<子项目文件夹名>.md`
- 框架参考文档在 `docs/framework/` 目录
- 新增/删除/重大变更子项目时，需同步更新 `docs/` 和根 `README.md`

## 工作方式

- 在对应子项目目录下执行所有命令（`cd follow.art` 或 `cd shader.se`）
- 修改 shader.se 时参考 `docs/shader-se-交互分析.md` 中的交互设计
- 修改 follow.art 时参考 `docs/follow.art.md` 中的项目文档
- 如果项目已有运行中的服务，预览即可，无需重复启动
