# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

网站交互合集项目，收集和复刻有趣的网站交互效果、动画和视觉样式。首页为目录列表，每个 demo 有独立路由页面。

## 技术栈

- **React 19** + **TypeScript**
- **Vite** 构建
- **Tailwind CSS v4** 样式
- **shadcn/ui** 组件库
- **Lucide React** 图标
- **GSAP** 动画
- **Three.js** WebGL（部分 demo 需要）
- **React Router DOM v7** 路由

## 常用命令

```bash
pnpm install        # 安装依赖
pnpm dev            # 开发服务器（Vite，含 --host）
pnpm build          # 生产构建（tsc -b && vite build）
pnpm lint           # ESLint
```

## 项目结构

```
AwardWebsites/
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── components.json              # shadcn/ui 配置
├── public/
│   └── favicon-96x96.png
├── src/
│   ├── main.tsx                 # 应用入口
│   ├── index.css                # Tailwind 入口 + 全局样式
│   ├── vite-env.d.ts            # Vite 类型声明
│   ├── lib/
│   │   └── utils.ts             # shadcn/ui cn() 工具函数
│   ├── assets/                  # 公共资源
│   │   └── fonts/               # 字体文件（按 demo 名称组织）
│   │       └── follow-art/
│   ├── components/
│   │   ├── ui/                  # shadcn/ui 组件
│   │   └── header/              # 全局 Header
│   ├── pages/
│   │   ├── home/                # 目录页
│   │   └── demos/
│   │       └── follow-art/      # follow.art demo 页面
│   ├── router/
│   │   └── index.tsx
│   └── demos/                   # demo 专属组件 + 样式 + 资源
│       └── follow-art/
│           ├── hero-section/
│           └── webgl-cards/
│               └── images/      # 就近放置的图片资源
└── docs/
```

## 路由结构

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 目录列表，展示所有 demo |
| `/demo/follow-art` | FollowArtDemo | follow.art 交互复刻 |

## 添加新 Demo

1. 在 `src/demos/<demo-name>/` 创建 demo 专属组件
2. 在 `src/pages/demos/<demo-name>/` 创建页面组件
3. 在 `src/router/index.tsx` 添加路由
4. 在 `src/pages/home/index.tsx` 的 `demos` 数组中添加条目

### 资源组织规则

1. **公共资源**：放在 `src/assets/` 目录下，按类型和 demo 名称组织
   ```
   src/assets/fonts/<demo-name>/  # 字体文件
   src/assets/images/<demo-name>/ # 公共图片（如有）
   ```

2. **Demo 专属资源**：就近放在组件目录下
   ```
   src/demos/<demo-name>/<component>/images/  # 组件图片
   ```

3. **公开静态资源**：放在 `public/` 目录下
   ```
   public/favicon-96x96.png       # 网站图标
   public/robots.txt              # 爬虫配置
   ```

## 代码规范

- 使用 TypeScript strict 模式
- 样式使用 Tailwind CSS，demo 专属样式使用普通 CSS
- 组件使用函数式组件 + Hooks
- 路径别名：`@/` 指向 `src/`
- **代码注释使用中文**：所有代码注释、文档说明必须使用中文

## 文档管理

- 文档存放于 `docs/` 目录
- 框架参考文档在 `docs/framework/` 目录
- **项目记忆**：`.claude/memory/` 目录（可通过 git 同步）

## 工作流程规则

### 强制执行流程（每次任务前必须检查）

**执行任何任务前，必须按顺序检查：**

1. **读取规则文件**：`.claude/rules/workflow.md`
2. **检查项目初始化**：是否需要询问存储位置
3. **检查 Plan 模式**：是否需要制定计划并等待确认
4. **检查 Web 功能**：是否需要使用 playwright-cli
5. **检查产物路径**：确保所有输出存放在正确位置

### 项目初始化存储位置询问规则

**在新项目中首次工作时，必须询问用户选择文档存储位置：**

- **选项 1：项目文件夹**（`项目地址/.claude/memory/`）
  - 可通过 git 同步到其他设备
  - 便于团队协作
  - 包含：记忆、规则、计划等所有文档

- **选项 2：Claude Code 默认位置**（`~/.claude/projects/<project-path>/`）
  - 不污染项目目录
  - 适合私有配置
  - 无法通过 git 同步

**询问后，根据用户选择创建相应的目录结构。**

### 代码规范
- **禁止使用 emoji 图标**：所有代码和文档中不得使用 emoji
- 使用纯文本或 ASCII 字符代替

### Plan 模式规则
- 进入 Plan 模式时，**必须制定详细计划并等待用户确认后才能执行**
- 计划应包含：实现步骤、涉及文件、预期变更
- **计划文档必须保存到 `.claude/plans/` 目录**
- 即使计划简单，也必须等待用户明确确认
- **违规后果**：直接执行而不等待确认 = 违反规则

### 计划文档存储规则
- **存储位置**：`.claude/plans/` 目录
- **文件命名**：使用小写字母和连字符，例如 `shader-se-demo.md`、`css-modules-isolation.md`
- **文件格式**：Markdown 格式
- **文件内容**：包含实现步骤、涉及文件、预期变更、技术方案等完整信息

### 项目记忆存储规则
- **存储位置**：`.claude/memory/` 目录（可通过 git 同步到其他设备）
- **索引文件**：`MEMORY.md`（记录所有记忆文件）
- **文件命名**：使用小写字母和连字符，例如 `css-modules-convention.md`
- **文件格式**：Markdown 格式，包含 frontmatter 元数据

### Web 功能调用规则
- 需要调用 Web 功能时，**必须使用 playwright-cli skill**
- 所有中间产物按类型分组存放在 `.playwright-cli` 文件夹中
- 不同类型的输出放在同一个类型文件夹中
- **截图路径**：必须指定 `--filename=.playwright-cli/screenshots/<task-name>/xxx.png`
- **禁止**：将截图保存到项目根目录

### 产物组织结构
```
.playwright-cli/
├── logs/                     # 所有日志文件
├── snapshots/                # 所有快照文件
├── screenshots/              # 所有截图文件（按任务分组）
├── tasks/                    # 所有任务文件夹
└── shared/                   # 共享资源
```

详细规则见 `.claude/rules/workflow.md`
