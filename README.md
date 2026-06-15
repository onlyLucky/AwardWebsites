# Award Websites

精选的网站交互动画与视觉效果合集。每个 demo 重现了获奖网站的特定交互模式，仅限于学习和参考，不用于商业用途。

## 技术栈

- **React 19** + **TypeScript**
- **Vite 7** 构建工具
- **Tailwind CSS v4** 样式框架
- **shadcn/ui** 组件库
- **Lucide React** 图标库
- **Three.js** WebGL 3D 渲染
- **GSAP** 动画库
- **React Router DOM v7** 路由管理

## 项目结构

```
AwardWebsites/
├── index.html                    # HTML 入口
├── package.json                  # 项目配置
├── vite.config.ts                # Vite 配置
├── tsconfig.json                 # TypeScript 配置
├── components.json               # shadcn/ui 配置
├── public/
│   └── favicon-96x96.png         # 网站图标
├── src/
│   ├── main.tsx                  # 应用入口
│   ├── index.css                 # 全局样式 + 主题变量
│   ├── i18n/                     # 国际化
│   │   ├── index.tsx             # i18n 核心逻辑
│   │   └── locales/              # 翻译文件
│   │       ├── en.json           # 英文
│   │       └── zh.json           # 中文
│   ├── hooks/
│   │   └── use-theme.ts          # 主题切换 Hook
│   ├── lib/
│   │   └── utils.ts              # 工具函数
│   ├── components/
│   │   ├── header/               # 顶部导航
│   │   ├── toolbar/              # 工具栏（语言/主题切换）
│   │   └── ui/                   # shadcn/ui 组件
│   ├── pages/
│   │   ├── home/                 # 首页
│   │   └── demos/
│   │       └── follow-art/       # follow.art demo 页面
│   ├── demos/
│   │   └── follow-art/           # follow.art 专属组件
│   │       ├── hero-section/     # 英雄区域
│   │       └── webgl-cards/      # WebGL 3D 卡片
│   └── assets/
│       └── fonts/                # 字体文件
└── docs/                         # 项目文档
```

## 功能特性

### 中英文切换
- 支持中文/英文界面切换
- 自动检测浏览器语言偏好
- 用户选择保存到 localStorage

### 亮暗主题切换
- 支持亮色/暗色主题
- 自动检测系统主题偏好
- 用户选择保存到 localStorage
- 无闪烁主题初始化

### 响应式布局
- 移动端（<640px）优化
- 平板端（640-1024px）适配
- 桌面端（>1024px）展示

## Demo 列表

| Demo | 描述 | 技术 |
|------|------|------|
| [follow.art](./src/demos/follow-art/) | SVG 字母 scaleY 动画 + WebGL 3D 卡片效果 | SVG、WebGL、Three.js、鼠标交互 |

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

访问 http://localhost:5173/

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 添加新 Demo

1. 在 `src/demos/<demo-name>/` 创建 demo 专属组件
2. 在 `src/pages/demos/<demo-name>/` 创建页面组件
3. 在 `src/router/index.tsx` 添加路由
4. 在 `src/pages/home/index.tsx` 的 `demos` 数组中添加条目
5. 在 `src/i18n/locales/en.json` 和 `zh.json` 添加翻译

## 参考网站

- [follow.art](https://follow.art/) - 交互式英雄区域与 WebGL 3D 卡片效果

## 许可声明

本项目仅供学习和参考，不用于商业用途。所有 demo 的设计版权归原始网站所有。
