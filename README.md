# Award Websites

精选的网站交互动画与视觉效果合集。每个 demo 重现了获奖网站的特定交互模式，仅限于学习和参考，不用于商业用途。

## 技术栈

- **Next.js 16**（App Router + Turbopack）
- **React 19** + **TypeScript**
- **Tailwind CSS v4** 样式框架
- **shadcn/ui** 组件库
- **Lucide React** 图标库
- **Three.js** WebGL 3D 渲染
- **GSAP** 动画库
- **Framer Motion** 动画库
- **Zustand** 状态管理
- **Next-Intl** 国际化
- **Next-Themes** 主题切换
- **Vitest** 测试框架
- **Prettier** 代码格式化

## 项目结构

```
AwardWebsites/
├── package.json                  # 项目配置
├── next.config.js                # Next.js 配置
├── tsconfig.json                 # TypeScript 配置
├── postcss.config.js             # PostCSS 配置（Tailwind v4）
├── tailwind.config.ts            # Tailwind CSS 配置
├── vitest.config.ts              # Vitest 测试配置
├── .prettierrc                   # Prettier 配置
├── components.json               # shadcn/ui 配置
├── public/
│   ├── favicon-96x96.png         # 网站图标
│   └── previews/                 # Demo 预览图
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # 根布局
│   │   ├── page.tsx              # 首页
│   │   ├── globals.css           # 全局样式
│   │   ├── not-found.tsx         # 404 页面
│   │   └── demo/
│   │       └── [slug]/
│   │           ├── page.tsx      # Demo 动态路由
│   │           └── layout.tsx    # Demo 布局
│   ├── components/               # 共享组件
│   │   ├── ui/                   # shadcn/ui 组件
│   │   ├── header/               # 顶部导航
│   │   ├── toolbar/              # 工具栏
│   │   ├── search-input/         # 搜索输入框
│   │   └── pagination/           # 分页组件
│   ├── demos/                    # Demo 专属组件
│   │   ├── follow-art/           # follow.art demo
│   │   ├── shader-se/            # shader.se demo
│   │   └── animejs/              # animejs demo
│   ├── hooks/                    # 自定义 Hooks
│   ├── lib/                      # 工具函数
│   ├── i18n/                     # 国际化翻译文件
│   ├── providers/                # 全局 Provider
│   ├── test/                     # 测试配置
│   ├── __tests__/                # 测试文件
│   └── assets/                   # 静态资源
│       ├── shader-se/
│       ├── follow-art/
│       └── animejs/
└── docs/                         # 项目文档
```

## 功能特性

### 中英文切换

- 支持中文/英文界面切换
- 自动检测浏览器语言偏好
- 用户选择保存到 localStorage
- 使用 next-intl 国际化方案

### 亮暗主题切换

- 支持亮色/暗色主题
- 自动检测系统主题偏好
- 用户选择保存到 localStorage
- 无闪烁主题初始化
- 使用 next-themes 主题方案

### 响应式布局

- 移动端（<640px）优化
- 平板端（640-1024px）适配
- 桌面端（>1024px）展示

## Demo 列表

| Demo | 描述 | 技术 |
|------|------|------|
| [follow.art](./src/demos/follow-art/) | SVG 字母 scaleY 动画 + WebGL 3D 卡片效果 | SVG、WebGL、Three.js、鼠标交互 |
| [shader.se](./src/demos/shader-se/) | 3D 模型渲染 + 滚动驱动动画 + 交互式项目展示 | Three.js、R3F、GSAP、后处理 |
| [animejs](./src/demos/animejs/) | 动画库官网复刻 + 滚动驱动动画 + 模块化架构 | GSAP、Framer Motion、Web Components |

## 安装和运行

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 http://localhost:3000/

### 构建生产版本

```bash
pnpm build
```

### 启动生产版本

```bash
pnpm start
```

### 运行测试

```bash
pnpm test           # 运行测试
pnpm test:ui        # 启动测试 UI
pnpm test:coverage  # 生成覆盖率报告
```

### 代码格式化

```bash
pnpm format         # 格式化代码
pnpm format:check   # 检查格式
```

## 添加新 Demo

1. 在 `src/demos/<demo-name>/` 创建 demo 专属组件（包含 `index.tsx` 导出）
2. 在 `src/app/demo/[slug]/page.tsx` 的 `DEMOS` 对象中添加条目
3. 在 `src/app/page.tsx` 的 `demos` 数组中添加首页卡片条目
4. 在 `src/i18n/locales/en.json` 和 `zh.json` 添加翻译

## 参考网站

- [follow.art](https://follow.art/) - 交互式英雄区域与 WebGL 3D 卡片效果
- [shader.se](https://shader.se/) - 创意开发工作室 3D 作品集
- [animejs.com](https://animejs.com/) - JavaScript 动画库官网

## 许可声明

本项目仅供学习和参考，不用于商业用途。所有 demo 的设计版权归原始网站所有。
