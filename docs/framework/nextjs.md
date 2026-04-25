# Next.js 技术知识点文档

## 1. 框架介绍

Next.js 是一个基于 React 的全栈框架，由 Vercel 开发和维护。它提供了端到端的解决方案，从开发到部署，为现代 Web 应用提供了最佳实践。

### 核心特性

- **服务器端渲染 (SSR)** - 提高首屏加载速度和 SEO 优化
- **静态站点生成 (SSG)** - 预渲染页面，提供最佳性能
- **增量静态再生 (ISR)** - 结合静态生成和动态内容的优势
- **App Router** - 基于 React Server Components 的新路由系统
- **API 路由** - 内置后端 API 功能，无需单独的后端服务器
- **自动代码分割** - 优化加载性能，只加载必要的代码
- **热模块替换** - 开发时实时更新，提升开发体验
- **图片优化** - 自动图片优化和响应式图片
- **字体优化** - 自动字体优化和预加载
- **国际化支持** - 内置 i18n 支持
- **中间件** - 全局路由中间件，处理认证、重定向等

### 版本演进

| 版本 | 主要特性 | 发布时间 |
|------|----------|----------|
| v13+ | App Router, React Server Components | 2022 |
| v12 | Middleware, Edge Functions | 2021 |
| v11 | Webpack 5, React 18 | 2021 |
| v10 | Image Component, ISR | 2020 |
| v9 | API Routes, Dynamic Routes | 2019 |

## 2. 架构设计

### 2.1 渲染策略

Next.js 提供了多种渲染策略，可根据不同的使用场景选择：

| 渲染策略 | 描述 | 适用场景 |
|----------|------|----------|
| **SSR** | 服务器端渲染，每次请求都在服务器生成 HTML | 动态内容，需要实时数据 |
| **SSG** | 静态站点生成，构建时生成 HTML | 静态内容，SEO 重要 |
| **ISR** | 增量静态再生，定期更新静态页面 | 半动态内容，平衡性能和实时性 |
| **CSR** | 客户端渲染，浏览器中生成 HTML | 高度交互的应用 |

### 2.2 项目结构

```
my-app/
├── app/           # App Router (Next.js 13+)
│   ├── layout.tsx  # 根布局
│   ├── page.tsx    # 首页
│   ├── about/      # /about 路由
│   │   └── page.tsx
│   ├── blog/       # /blog 路由
│   │   ├── page.tsx
│   │   └── [slug]/ # 动态路由
│   │       └── page.tsx
│   └── api/        # API 路由
│       └── hello/  # /api/hello
│           └── route.ts
├── pages/         # Pages Router (传统路由)
│   ├── index.tsx   # 首页
│   ├── about.tsx   # /about 页面
│   └── api/        # API 路由
│       └── hello.ts
├── public/         # 静态资源
├── components/     # 组件
├── lib/            # 工具函数
├── styles/         # 样式
├── package.json    # 依赖配置
├── next.config.js  # 框架配置
└── tsconfig.json   # TypeScript 配置
```

### 2.3 核心概念

**React Server Components**
- 默认在服务器端运行，无需客户端 JavaScript
- 减少客户端包大小
- 直接访问后端资源
- 支持 await 语法

**Client Components**
- 带 `'use client'` 指令
- 可以使用 useState, useEffect 等客户端 Hooks
- 可以访问浏览器 API
- 支持事件处理和用户交互

**Server Actions**
- 服务器端函数，可以从客户端调用
- 简化表单处理和数据提交
- 内置表单状态管理

## 3. 快速入门

### 3.1 项目初始化

**使用 create-next-app**

```bash
# 创建新项目
npx create-next-app@latest my-app

# 交互式配置
✔ Would you like to use TypeScript? Yes
✔ Would you like to use ESLint? Yes
✔ Would you like to use Tailwind CSS? Yes
✔ Would you like to use `src/` directory? No
✔ Would you like to use App Router? Yes
✔ Would you like to customize the default import alias? No
```

**手动安装**

```bash
# 初始化项目
npm init -y

# 安装依赖
npm install next@latest react@latest react-dom@latest

# 添加脚本
# package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 3.2 基本页面创建

**App Router 页面**

```tsx
// app/page.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Next.js</h1>
      <p className="text-lg mb-6">
        This is a sample Next.js application using App Router.
      </p>
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={120}
        height={40}
      />
    </div>
  );
}
```

**布局组件**

```tsx
// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Next.js App',
  description: 'A sample Next.js application',
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">My App</h1>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            © 2024 My App
          </div>
        </footer>
      </body>
    </html>
  );
}
```

### 3.3 运行项目

```bash
# 开发模式
npm run dev
# 访问 http://localhost:3000

# 构建生产版本
npm run build

# 启动生产服务器
npm start
# 访问 http://localhost:3000
```

## 4. 核心功能详解

### 4.1 路由系统

**App Router**

- **文件系统路由** - 基于目录结构自动生成路由
- **嵌套布局** - 支持嵌套的布局组件
- **路由组** - 使用括号组织路由，不影响 URL
- **动态路由** - 使用 `[id]` 或 `[...slug]` 语法
- **并行路由** - 同时渲染多个页面
- **拦截路由** - 处理模态框等场景

**动态路由示例**

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function PostPage({
  params,
}: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose">{post.content}</div>
    </div>
  );
}
```

**API 路由**

```tsx
// app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Hello from API',
    time: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({
    message: 'Received data',
    data: body,
  });
}
```

### 4.2 数据获取

**服务器端数据获取**

```tsx
// app/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users', {
    cache: 'force-cache', // 缓存策略
  });
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
}

export default async function Home() {
  const users = await getUsers();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user: any) => (
          <div key={user.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**缓存策略**

```tsx
// 静态缓存 (默认)
fetch('https://api.example.com/data', {
  cache: 'force-cache',
});

// 动态缓存 (每次请求)
fetch('https://api.example.com/data', {
  cache: 'no-store',
});

// 重新验证缓存
fetch('https://api.example.com/data', {
  next: { revalidate: 60 }, // 60秒后重新验证
});
```

**ISR 配置**

```tsx
// app/blog/page.tsx
export const revalidate = 60; // 每60秒重新生成

async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  // 渲染内容
}
```

### 4.3 优化特性

**图片优化**

```tsx
import Image from 'next/image';

// 基本用法