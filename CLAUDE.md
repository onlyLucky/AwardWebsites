# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

网站交互合集项目，收集和复刻有趣的网站交互效果、动画和视觉样式。首页为目录列表，每个 demo 有独立路由页面。

## 技术栈

- **Next.js 16**（App Router + Turbopack）
- **React 19** + **TypeScript**
- **Tailwind CSS v4** 样式（PostCSS 集成）
- **shadcn/ui** 组件库
- **Lucide React** 图标
- **GSAP** 动画
- **Framer Motion** 动画
- **Three.js** WebGL（部分 demo 需要）
- **Zustand** 状态管理
- **Next-Intl** 国际化
- **Next-Themes** 主题切换
- **Vitest** + **@testing-library/react** 测试
- **Prettier** 代码格式化

## 常用命令

```bash
pnpm install        # 安装依赖
pnpm dev            # 开发服务器（Next.js Turbopack）
pnpm build          # 生产构建（next build）
pnpm start          # 生产启动（next start）
pnpm lint           # ESLint
pnpm format         # Prettier 格式化
pnpm test           # Vitest 测试
pnpm test:ui        # Vitest UI 模式
```

## 项目结构

```
AwardWebsites/
├── package.json
├── next.config.js               # Next.js 配置
├── tsconfig.json                # TypeScript 配置
├── postcss.config.js            # PostCSS 配置（Tailwind v4）
├── tailwind.config.ts           # Tailwind CSS 配置
├── vitest.config.ts             # Vitest 测试配置
├── .prettierrc                  # Prettier 配置
├── components.json              # shadcn/ui 配置
├── public/
│   ├── favicon-96x96.png
│   └── previews/                # Demo 预览图
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # 根布局（字体、Provider）
│   │   ├── page.tsx             # 首页
│   │   ├── globals.css          # 全局样式（Tailwind + CSS 变量）
│   │   ├── not-found.tsx        # 404 页面
│   │   └── demo/
│   │       └── [slug]/
│   │           ├── page.tsx     # Demo 动态路由页面
│   │           └── layout.tsx   # Demo 布局
│   ├── components/              # 共享组件
│   │   ├── ui/                  # shadcn/ui 组件
│   │   ├── header/              # 全局 Header
│   │   ├── toolbar/             # 工具栏（搜索、语言、主题）
│   │   ├── search-input/        # 搜索输入框
│   │   └── pagination/          # 分页组件
│   ├── demos/                   # Demo 专属组件 + 样式
│   │   ├── follow-art/
│   │   ├── shader-se/
│   │   └── animejs/
│   ├── hooks/                   # 自定义 Hooks
│   │   ├── use-theme.ts
│   │   └── use-infinite-scroll.ts
│   ├── lib/                     # 工具函数
│   │   └── utils.ts             # cn() 工具函数
│   ├── i18n/                    # 国际化
│   │   └── locales/             # 翻译文件（en.json, zh.json）
│   ├── providers/               # 全局 Provider
│   │   ├── theme-provider.tsx   # 主题 Provider（next-themes）
│   │   └── intl-provider.tsx    # 国际化 Provider（next-intl）
│   ├── test/                    # 测试配置
│   │   └── setup.ts
│   ├── __tests__/               # 测试文件
│   └── assets/                  # 静态资源（按 demo 名称 + 资源类型组织）
│       ├── shader-se/
│       │   ├── models/          # 3D 模型（GLB）
│       │   ├── textures/        # 纹理图片
│       │   └── fonts/           # 字体文件
│       ├── follow-art/
│       │   └── fonts/
│       └── animejs/
│           ├── fonts/
│           ├── images/
│           └── media/
└── docs/                        # 项目文档
```

## 路由结构

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 目录列表，展示所有 demo |
| `/demo/follow-art` | FollowArtDemo | follow.art 交互复刻 |
| `/demo/shader-se` | ShaderSeDemo | shader.se 3D 作品集 |
| `/demo/animejs` | AnimejsDemo | animejs 动画库官网 |

## 添加新 Demo

1. 在 `src/demos/<demo-name>/` 创建 demo 专属组件（包含 `index.tsx` 导出）
2. 在 `src/app/demo/[slug]/page.tsx` 的 `DEMOS` 对象中添加条目
3. 在 `src/app/page.tsx` 的 `demos` 数组中添加首页卡片条目

### 资源组织规则

**所有 demo 静态资源必须存储在 `src/assets/` 目录下**，按 demo 网站名称和资源类型分类组织：

```
src/assets/<demo-name>/
├── models/          # 3D 模型文件（GLB, GLTF, OBJ）
├── textures/        # 纹理图片（PNG, JPG, WebP, AVIF）
├── fonts/           # 字体文件（WOFF2, JSON+PNG 位图字体）
├── videos/          # 视频文件（MP4, WebM）
└── icons/           # 图标文件（SVG）
```

**引用方式**（Next.js 项目）：

```typescript
// 3D 模型
const MODEL_URL = new URL('@/assets/<demo-name>/models/model.glb', import.meta.url).href

// 图片纹理
import textureUrl from '@/assets/<demo-name>/textures/texture.webp'
// 使用 textureUrl.src 获取 URL
```

**公开静态资源**：仅限网站图标、robots.txt 等全局文件放在 `public/` 目录

详细规则见 `.claude/rules/assets.md`

## 代码规范

- 使用 TypeScript strict 模式
- 样式使用 Tailwind CSS，demo 专属样式使用 CSS Module 或普通 CSS
- 组件使用函数式组件 + Hooks
- 路径别名：`@/` 指向 `src/`
- **代码注释使用中文**：所有代码注释、文档说明必须使用中文
- **Server Components**：默认使用 Server Components，需要客户端交互时添加 `'use client'`
- **Demo 组件**：所有 demo 组件必须标记为 `'use client'`（包含 Three.js、GSAP 等）

## 国际化

项目使用 `next-intl` 进行国际化：

- **翻译文件**：`src/i18n/locales/en.json` 和 `zh.json`
- **使用方式**：`const t = useTranslations()` 然后 `t('key')`
- **Provider**：`src/providers/intl-provider.tsx`

## 主题切换

项目使用 `next-themes` 进行主题切换：

- **使用方式**：`const { theme, setTheme } = useTheme()`
- **Provider**：`src/providers/theme-provider.tsx`
- **CSS 变量**：在 `src/app/globals.css` 中定义亮暗主题颜色

## 测试

项目使用 Vitest + @testing-library/react：

```bash
pnpm test           # 运行测试
pnpm test:ui        # 启动测试 UI
pnpm test:coverage  # 生成覆盖率报告
```

测试文件位于 `src/__tests__/` 目录。

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
