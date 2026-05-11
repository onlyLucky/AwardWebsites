# Next.js 技术知识点文档

## 1. 技术介绍

Next.js 是一个基于 React 的全栈框架，由 Vercel 开发和维护。它提供了一套完整的解决方案，从开发到部署，使构建现代化的 Web 应用变得更加简单。

### 核心特性

- **服务器端渲染 (SSR)** - 提高首屏加载速度和 SEO
- **静态站点生成 (SSG)** - 预渲染页面，提供最佳性能
- **增量静态再生 (ISR)** - 结合静态和动态内容的优势
- **App Router** - 基于 React Server Components 的新路由系统
- **API 路由** - 内置后端 API 功能，无需额外的服务器
- **自动代码分割** - 优化加载性能，减少初始包大小
- **热模块替换** - 开发时实时更新，提升开发体验
- **图片优化** - 自动优化图片，支持 WebP、AVIF 等格式
- **字体优化** - 自动优化字体加载，减少布局偏移
- **国际化支持** - 内置 i18n 功能

### 适用场景

- **企业网站** - 需要良好 SEO 和性能的官方网站
- **电商网站** - 产品页面需要快速加载和良好的用户体验
- **内容网站** - 博客、新闻、文档等需要 SEO 的网站
- **SaaS 应用** - 需要 SSR 和 API 路由的复杂应用
- **单页应用** - 复杂交互的现代 Web 应用

## 2. 快速入门

### 环境搭建

首先，确保你已经安装了 Node.js (推荐 v18+) 和 npm。

### 项目初始化

使用 `create-next-app` 命令创建一个新的 Next.js 项目：

```bash
# 创建新项目
npx create-next-app@latest my-next-app

# 选择配置
# ✔ Would you like to use TypeScript? Yes
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use Tailwind CSS? Yes
# ✔ Would you like to use `src/` directory? No
# ✔ Would you like to use App Router? Yes
# ✔ Would you like to customize the default import alias? No
```

### 项目结构

创建完成后，你会看到以下项目结构：

```
my-next-app/
├── app/           # App Router 页面和布局
│   ├── layout.tsx  # 根布局
│   ├── page.tsx    # 首页
│   └── api/        # API 路由
├── public/         # 静态资源
├── components/     # 组件
├── lib/            # 工具函数
├── package.json    # 依赖配置
├── next.config.js  # 框架配置
├── tsconfig.json   # TypeScript 配置
└── tailwind.config.js  # Tailwind CSS 配置
```

### 运行项目

```bash
# 进入项目目录
cd my-next-app

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

开发服务器启动后，你可以在浏览器中访问 `http://localhost:3000` 查看你的应用。

### 第一个页面

让我们创建一个简单的页面来了解 Next.js 的基本结构：

```tsx
// app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Next.js!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Get started by editing <code className="bg-gray-200 px-2 py-1 rounded">app/page.tsx</code>
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Click me
        </button>
      </div>
    </div>
  );
}
```

## 3. 基础使用

### App Router 基础

App Router 是 Next.js 13+ 引入的新路由系统，基于 React Server Components。它使用文件系统作为路由结构。

#### 路由结构

```
app/
├── layout.tsx        # 根布局
├── page.tsx          # 首页
├── about/            # /about 路由
│   └── page.tsx      # /about 页面
├── blog/             # /blog 路由
│   ├── layout.tsx    # 博客布局
│   ├── page.tsx      # /blog 列表页
│   └── [slug]/       # 动态路由
│       └── page.tsx  # /blog/{slug} 详情页
└── api/              # API 路由
    └── hello/        # /api/hello 路由
        └── route.ts  # API 处理函数
```

#### 布局组件

布局组件定义了页面的通用结构，如导航栏、页脚等。

```tsx
// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">My Next.js App</h1>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="/" className="text-gray-600 hover:text-gray-900">Home</a></li>
                <li><a href="/about" className="text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="/blog" className="text-gray-600 hover:text-gray-900">Blog</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 border-t mt-12">
          <div className="container mx-auto px-4 py-8 text-center text-gray-600">
            © 2024 My Next.js App
          </div>
        </footer>
      </body>
    </html>
  );
}
```

#### 页面组件

页面组件定义了每个路由的内容。

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
      <p className="text-gray-600 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p className="text-gray-600">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  );
}
```

### 静态生成 (SSG)

静态生成是在构建时生成页面，提供最佳性能。

```tsx
// app/blog/page.tsx
// 静态生成的博客列表页
export default function BlogPage() {
  // 在构建时获取数据
  const posts = [
    { id: 1, title: 'First Post', slug: 'first-post' },
    { id: 2, title: 'Second Post', slug: 'second-post' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id}>
            <a 
              href={`/blog/${post.slug}`} 
              className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 服务器组件基础

React Server Components 允许你在服务器端渲染组件，减少客户端包大小。

```tsx
// app/blog/[slug]/page.tsx
// 服务器组件，在服务器端运行

interface Post {
  id: number;
  title: string;
  content: string;
}

// 模拟数据获取
async function getPost(slug: string): Promise<Post> {
  // 在实际应用中，这里会从数据库或 API 获取数据
  return {
    id: 1,
    title: 'First Post',
    content: 'This is the content of the first post.',
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  // 直接在服务器端获取数据
  const post = await getPost(params.slug);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>
      <div className="prose prose-lg text-gray-600">
        {post.content}
      </div>
    </div>
  );
}
```

### 客户端组件

对于需要交互的组件，你需要使用客户端组件。

```tsx
// app/components/Counter.tsx
// 客户端组件，在浏览器中运行
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center space-x-4">
      <button 
        onClick={() => setCount(count - 1)}
        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
      >
        -
      </button>
      <span className="text-xl font-semibold">{count}</span>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
}
```

### API 路由

Next.js 内置了 API 路由功能，允许你创建后端 API 端点。

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

## 4. 进阶使用

### Server Actions

Server Actions 允许你在客户端组件中调用服务器端函数，简化表单处理和数据操作。

```tsx
// app/actions.ts
'use server';

export async function submitForm(data: { name: string; email: string }) {
  // 服务器端验证和处理
  console.log('Form submitted:', data);
  
  // 模拟数据库操作
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, message: 'Form submitted successfully!' };
}

// app/page.tsx
'use client';

import { useState } from 'react';
import { submitForm } from './actions';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitForm({ name, email });
      setMessage(result.message);
    } catch (error) {
      setMessage('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Form</h1>
      
      {message && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
```

### 中间件

中间件允许你在请求到达页面或 API 路由之前运行代码，用于身份验证、重定向等。

```tsx
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 检查是否有认证令牌
  const token = request.cookies.get('auth-token')?.value;
  
  // 保护 /dashboard 路由
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // 重定向到登录页
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

### 路由组

路由组允许你组织路由而不影响 URL 结构。

```
app/
├── (auth)/          # 路由组，不影响 URL
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (dashboard)/     # 路由组，不影响 URL
│   ├── layout.tsx
│   ├── page.tsx
│   └── settings/
│       └── page.tsx
└── page.tsx
```

### 数据获取策略详解

#### 静态生成 (SSG)

```tsx
// app/blog/page.tsx
// 构建时生成，适合静态内容
export default function BlogPage() {
  const posts = [
    { id: 1, title: 'First Post' },
    { id: 2, title: 'Second Post' },
  ];
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

#### 服务器端渲染 (SSR)

```tsx
// app/blog/[slug]/page.tsx
// 每次请求时生成，适合动态内容
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`).then(res => res.json());
  
  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </div>
  );
}
```

#### 增量静态再生 (ISR)

```tsx
// app/blog/[slug]/page.tsx
// 构建时生成，然后定期再生，适合频繁更新的内容
export const revalidate = 60; // 每60秒再生一次

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`).then(res => res.json());
  
  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </div>
  );
}
```

#### 客户端渲染 (CSR)

```tsx
// app/components/Comments.tsx
// 客户端渲染，适合用户特定内容
'use client';

import { useState, useEffect } from 'react';

export function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`/api/comments?postId=${postId}`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      });
  }, [postId]);
  
  if (loading) return <div>Loading comments...</div>;
  
  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id}>{comment.content}</div>
      ))}
    </div>
  );
}
```

## 5. 实际应用

### 企业官网

**项目结构**：

```
app/
├── layout.tsx
├── page.tsx          # 首页
├── about/
│   └── page.tsx      # 关于我们
├── services/
│   └── page.tsx      # 服务
├── portfolio/
│   └── page.tsx      # 作品集
└── contact/
    └── page.tsx      # 联系我们
```

**首页示例**：

```tsx
// app/page.tsx
export default function Home() {
  return (
    <div>
      {/* Hero 区域 */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Creative Solutions for Your Business
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We help companies build amazing digital experiences that drive results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/services" 
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Our Services
            </a>
            <a 
              href="/contact" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* 服务区域 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Web Development</h3>
              <p className="text-gray-600">
                We build modern, responsive websites that deliver exceptional user experiences.
              </p>
            </div>
            {/* 更多服务卡片 */}
          </div>
        </div>
      </section>

      {/* 其他区域 */}
    </div>
  );
}
```

### 电商网站

**项目结构**：

```
app/
├── layout.tsx
├── page.tsx          # 首页
├── products/
│   ├── page.tsx      # 产品列表
│   └── [id]/
│       └── page.tsx  # 产品详情
├── cart/
│   └── page.tsx      # 购物车
└── checkout/
    └── page.tsx      # 结账
```

**产品详情页示例**：

```tsx
// app/products/[id]/page.tsx
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

async function getProduct(id: string): Promise<Product> {
  // 从 API 获取产品数据
  return {
    id,
    name: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    price: 299.99,
    images: [
      'https://example.com/headphones1.jpg',
      'https://example.com/headphones2.jpg',
    ],
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex-1">
              Add to Cart
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 博客系统

**项目结构**：

```
app/
├── layout.tsx
├── page.tsx          # 首页
├── blog/
│   ├── page.tsx      # 博客列表
│   └── [slug]/
│       └── page.tsx  # 博客详情
└── api/
    └── blog/
        └── route.ts  # 博客 API
```

**博客列表页示例**：

```tsx
// app/blog/page.tsx
interface Post {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
}

async function getPosts(): Promise<Post[]> {
  // 从 API 获取博客文章
  return [
    {
      id: 1,
      title: 'Getting Started with Next.js 13',
      excerpt: 'Learn the basics of Next.js 13 and App Router.',
      slug: 'getting-started-with-nextjs-13',
      date: '2024-01-15',
      author: 'John Doe',
    },
    {
      id: 2,
      title: 'Building Responsive UIs with Tailwind CSS',
      excerpt: 'Create beautiful responsive interfaces with Tailwind CSS.',
      slug: 'building-responsive-uis-with-tailwind',
      date: '2024-01-10',
      author: 'Jane Smith',
    },
  ];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-12">Blog</h1>
      <div className="space-y-8">
        {posts.map(post => (
          <article key={post.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                <a href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </a>
              </h2>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>By {post.author}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
```

### SaaS 应用

**项目结构**：

```
app/
├── layout.tsx
├── page.tsx          # 首页
├── dashboard/
│   ├── layout.tsx    # 仪表板布局
│   ├── page.tsx      # 仪表板首页
│   ├── settings/
│   │   └── page.tsx  # 设置
│   └── analytics/
│       └── page.tsx  # 分析
├── api/
│   └── dashboard/
│       └── route.ts  # 仪表板 API
└── middleware.ts     # 认证中间件
```

**仪表板首页示例**：

```tsx
// app/dashboard/page.tsx
// 受保护的路由，需要认证

interface DashboardData {
  metrics: {
    users: number;
    revenue: number;
    conversions: number;
    sessions: number;
  };
}

async function getDashboardData(): Promise<DashboardData> {
  // 从 API 获取仪表板数据
  return {
    metrics: {
      users: 1234,
      revenue: 45678,
      conversions: 24,
      sessions: 567,
    },
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-1">Total Users</div>
          <div className="text-2xl font-bold text-gray-900">{data.metrics.users}</div>
          <div className="text-green-500 text-sm mt-1">+12% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-1">Revenue</div>
          <div className="text-2xl font-bold text-gray-900">${data.metrics.revenue.toLocaleString()}</div>
          <div className="text-green-500 text-sm mt-1">+8% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-1">Conversions</div>
          <div className="text-2xl font-bold text-gray-900">{data.metrics.conversions}%</div>
          <div className="text-red-500 text-sm mt-1">-3% from last month</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm font-medium text-gray-500 mb-1">Active Sessions</div>
          <div className="text-2xl font-bold text-gray-900">{data.metrics.sessions}</div>
          <div className="text-green-500 text-sm mt-1">+5% from last month</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        {/* 活动列表 */}
      </div>
    </div>
  );
}
```

## 6. 常见问题

### 路由问题

**问题**：页面刷新后 404
**解决方案**：
- 确保生产服务器配置正确，使用 `npm run start` 启动
- 对于 Nginx/Apache，配置重写规则将所有请求指向 `index.html`
- 检查路由文件是否存在于正确的位置

**问题**：动态路由参数获取
**解决方案**：
- 使用 `params` 对象获取路由参数
- 确保文件名使用 `[slug]` 格式
- 检查参数类型是否正确

**问题**：嵌套路由不工作
**解决方案**：
- 确保每个路由都有对应的 `page.tsx` 文件
- 检查目录结构是否正确
- 验证布局组件是否正确传递 `children`

### 数据获取问题

**问题**：客户端数据获取
**解决方案**：
- 使用 `useEffect` 钩子
- 考虑使用 SWR 或 React Query 进行数据管理
- 确保 API 端点正确配置

**问题**：服务器端数据获取失败
**解决方案**：
- 添加错误处理和重试机制
- 检查 API 端点是否可访问
- 验证环境变量是否正确设置

**问题**：ISR 不更新
**解决方案**：
- 检查 `revalidate` 配置是否正确
- 确保数据来源确实发生了变化
- 尝试手动触发重新生成

### 性能问题

**问题**：首屏加载慢
**解决方案**：
- 使用 SSG 或 ISR 预渲染页面
- 优化图片大小和格式
- 启用代码分割
- 减少初始包大小

**问题**：客户端包体积大
**解决方案**：
- 使用动态导入
- 优化依赖
- 移除未使用的代码
- 启用 tree shaking

**问题**：内存泄漏
**解决方案**：
- 清理 `useEffect` 中的订阅和事件监听器
- 确保组件卸载时取消异步操作
- 使用 `AbortController` 取消 fetch 请求

## 7. 性能优化

### 图片优化

Next.js 提供了内置的 `Image` 组件，自动优化图片：

```tsx
// app/page.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        priority // 首屏图片
        className="w-full h-auto"
      />
    </div>
  );
}
```

### 字体优化

Next.js 提供了内置的字体优化：

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### 代码分割

使用动态导入进行代码分割：

```tsx
// app/page.tsx
import { useState } from 'react';

export default function Home() {
  const [heavyComponent, setHeavyComponent] = useState<React.ReactNode>(null);

  const loadHeavyComponent = async () => {
    const { HeavyComponent } = await import('@/components/HeavyComponent');
    setHeavyComponent(<HeavyComponent />);
  };

  return (
    <div>
      <button onClick={loadHeavyComponent} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Load Heavy Component
      </button>
      {heavyComponent}
    </div>
  );
}
```

### 缓存策略

#### CDN 缓存

配置合理的缓存头：

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=10, stale-while-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

#### 静态资源缓存

使用版本控制的静态资源：

```tsx
// app/page.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* Next.js 自动处理版本控制 */}
      <Image src="/logo.png" alt="Logo" width={100} height={100} />
    </div>
  );
}
```

### 服务器优化

#### 边缘缓存

使用 Vercel 的边缘缓存：

```tsx
// app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { message: 'Hello from API' },
    {
      headers: {
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      },
    }
  );
}
```

## 8. 学习资源

### 官方资源

- **Next.js 官方文档** - [https://nextjs.org/docs](https://nextjs.org/docs)
- **Next.js 学习路径** - [https://nextjs.org/learn](https://nextjs.org/learn)
- **Vercel 示例** - [https://vercel.com/templates](https://vercel.com/templates)
- **Next.js GitHub** - [https://github.com/vercel/next.js](https://github.com/vercel/next.js)

### 社区资源

- **Next.js 示例** - [https://github.com/vercel/next.js/tree/canary/examples](https://github.com/vercel/next.js/tree/canary/examples)
- **Next.js 博客** - [https://nextjs.org/blog](https://nextjs.org/blog)
- **Next.js Discord** - [https://discord.gg/nextjs](https://discord.gg/nextjs)

### 课程和教程

- **Next.js 基础到高级** - [Udemy](https://www.udemy.com/course/nextjs-the-complete-guide/)
- **Next.js 官方教程** - [https://nextjs.org/learn/foundations/about-nextjs](https://nextjs.org/learn/foundations/about-nextjs)
- **freeCodeCamp Next.js 教程** - [https://www.freecodecamp.org/news/the-next-js-handbook/](https://www.freecodecamp.org/news/the-next-js-handbook/)

## 9. 版本迁移指南

### 从 Pages Router 迁移到 App Router

1. **创建 app 目录**
   - 在项目根目录创建 `app` 文件夹

2. **迁移布局**
   - 从 `_app.tsx` 和 `_document.tsx` 迁移到 `app/layout.tsx`

3. **迁移页面**
   - 将 `pages/` 中的页面迁移到 `app/` 目录
   - 为每个页面创建 `page.tsx` 文件

4. **迁移 API 路由**
   - 从 `pages/api/` 迁移到 `app/api/`
   - 将处理函数改为使用 `route.ts` 文件

5. **更新数据获取**
   - 使用 React Server Components 或 `fetch` API
   - 替换 `getStaticProps` 和 `getServerSideProps`

6. **更新导航**
   - 使用新的 `next/link` 语法

### 代码示例

**旧语法**：
```tsx
// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}
```

**新语法**：
```tsx
// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/about">About</Link>
    </div>
  );
}
```

## 10. 最佳实践

### 项目结构

- **组件组织** - 按功能或特性组织组件
- **API 路由** - 与页面路由保持一致的结构
- **工具函数** - 放在 `lib` 或 `utils` 目录
- **静态资源** - 放在 `public` 目录

### 代码质量

- **TypeScript** - 使用 TypeScript 提高代码质量
- **ESLint** - 配置 ESLint 确保代码风格一致
- **Prettier** - 自动格式化代码
- **Git Hooks** - 使用 Husky 进行提交前检查

### 性能

- **预渲染** - 对静态内容使用 SSG
- **增量再生** - 对动态内容使用 ISR
- **代码分割** - 使用动态导入减少初始包大小
- **图片优化** - 使用 `next/image` 组件
- **字体优化** - 使用 `next/font` 优化字体加载

### 安全

- **环境变量** - 使用 `.env.local` 存储敏感信息
- **API 路由** - 实现适当的认证和授权
- **输入验证** - 验证所有用户输入
- **CORS** - 配置适当的 CORS 策略

### 部署

- **Vercel** - 推荐的部署平台
- **CI/CD** - 设置持续集成和部署
- **监控** - 配置应用监控
- **日志** - 实现适当的日志记录

## 总结

Next.js 是一个强大的 React 框架，提供了从开发到部署的完整解决方案。通过合理使用其特性，可以构建高性能、SEO 友好的现代 Web 应用。关键是要理解其核心概念，如 App Router、React Server Components、数据获取策略等，并根据具体场景选择合适的技术方案。

增强后的文档提供了从入门到精通的完整学习路径，包含详细的代码示例和实际应用场景，希望能够帮助你快速掌握 Next.js 的核心知识和最佳实践。