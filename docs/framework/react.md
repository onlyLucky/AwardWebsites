# React 技术知识点文档

## 1. 框架介绍

React 是一个用于构建用户界面的 JavaScript 库，由 Facebook (现 Meta) 开发和维护。它的核心思想是：

- **组件化** - 将 UI 拆分为独立可复用的组件
- **声明式** - 描述 UI 应该是什么样子，而非如何实现
- **虚拟 DOM** - 通过虚拟 DOM 优化渲染性能
- **单向数据流** - 数据从父组件流向子组件
- **Hooks** - 让函数组件拥有状态和生命周期

## 2. 使用场景

### 适用场景
- **单页应用 (SPA)** - 复杂交互的现代 Web 应用
- **移动应用** - 通过 React Native 开发原生移动应用
- **渐进式 Web 应用 (PWA)** - 结合 Service Worker 的离线应用
- **企业级应用** - 大型、复杂的业务系统
- **内容管理系统** - 后台管理界面

### 不适用场景
- **简单静态网站** - 可以使用更简单的工具如 HTML/CSS/JS
- **需要极致性能的游戏** - 可能需要 Canvas/WebGL 原生实现
- **SEO 要求极高的内容网站** - 可能需要 SSR 框架如 Next.js

## 3. 快速入门

### 项目初始化

```bash
# 使用 Vite 创建 React 项目
npm create vite@latest my-react-app -- --template react

# 或使用 Create React App
npx create-react-app my-react-app
```

### 基本项目结构

```
my-react-app/
├── src/
│   ├── components/     # 组件
│   ├── pages/          # 页面
│   ├── hooks/          # 自定义 Hooks
│   ├── context/        # Context API
│   ├── utils/          # 工具函数
│   ├── App.js          # 根组件
│   └── main.js         # 入口文件
├── public/             # 静态资源
├── package.json        # 依赖配置
└── vite.config.js      # Vite 配置
```

### 运行项目

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 4. 核心知识点

### 4.1 组件基础

**函数组件**

```jsx
// src/components/Greeting.jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default Greeting;
```

**类组件** (传统方式)

```jsx
// src/components/Counter.jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
```

### 4.2 Hooks

**useState** - 状态管理

```jsx
// src/components/Counter.jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </div>
  );
}

export default Counter;
```

**useEffect** - 副作用

```jsx
// src/components/DataFetcher.jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 数据获取
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });

    // 清理函数
    return () => {
      // 清理资源
    };
  }, []); // 空依赖数组 = 只执行一次

  if (loading) return <p>Loading...</p>;
  return <div>{JSON.stringify(data)}</div>;
}

export default DataFetcher;
```

**useContext** - 上下文

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// src/components/ThemedButton.jsx
import { useTheme } from '../context/ThemeContext';

function ThemedButton() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      style={{ 
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      Toggle Theme
    </button>
  );
}
```

**useReducer** - 复杂状态管理

```jsx
// src/components/TodoList.jsx
import { useReducer } from 'react';

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo => 
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', text });
      setText('');
    }
  };

  return (
    <div>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 4.3 表单处理

**受控组件**

```jsx
// src/components/LoginForm.jsx
import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
```

**非受控组件**

```jsx
// src/components/FileUpload.jsx
import { useRef } from 'react';

function FileUpload() {
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    console.log('File selected:', file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        ref={fileInputRef}
      />
      <button type="submit">Upload</button>
    </form>
  );
}
```

## 5. 使用技巧

### 5.1 条件渲染

```jsx
// src/components/ConditionalRendering.jsx
function ConditionalRendering({ isLoggedIn, user }) {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <button>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please login</h1>
          <button>Login</button>
        </div>
      )}
    </div>
  );
}
```

### 5.2 列表渲染

```jsx
// src/components/ProductList.jsx
function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### 5.3 组件通信

**父传子 (props)**

```jsx
// Parent.jsx
function Parent() {
  const [message, setMessage] = useState('Hello from parent');
  return <Child message={message} onUpdate={setMessage} />;
}

// Child.jsx
function Child({ message, onUpdate }) {
  return (
    <div>
      <p>{message}</p>
      <button onClick={() => onUpdate('Updated message')}>
        Update Message
      </button>
    </div>
  );
}
```

**子传父 (回调函数)**

```jsx
// src/components/Child.jsx
function Child({ onDataChange }) {
  const handleChange = (e) => {
    onDataChange(e.target.value);
  };
  
  return <input onChange={handleChange} />;
}

// src/components/Parent.jsx
function Parent() {
  const [data, setData] = useState('');
  
  return (
    <div>
      <Child onDataChange={setData} />
      <p>Parent received: {data}</p>
    </div>
  );
}
```

### 5.4 性能优化

**memo** - 组件记忆

```jsx
// src/components/ExpensiveComponent.jsx
import { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  // 昂贵的计算
  console.log('ExpensiveComponent rendered');
  return <div>{data}</div>;
});

export default ExpensiveComponent;
```

**useMemo** - 值记忆

```jsx
// src/components/Calculation.jsx
import { useMemo } from 'react';

function Calculation({ numbers }) {
  const total = useMemo(() => {
    console.log('Calculating total...');
    return numbers.reduce((sum, num) => sum + num, 0);
  }, [numbers]);
  
  return <p>Total: {total}</p>;
}
```

**useCallback** - 函数记忆

```jsx
// src/components/Button.jsx
import { useCallback } from 'react';

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// src/components/Parent.jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);
  
  return (
    <div>
      <Button onClick={handleClick}>Click me</Button>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## 6. 常见问题

### 6.1 状态管理问题

**问题**：组件状态更新不生效
**解决方案**：使用函数式更新，确保状态更新基于最新值

```jsx
// 错误
setCount(count + 1);

// 正确
setCount(prevCount => prevCount + 1);
```

**问题**：深层状态更新
**解决方案**：使用展开运算符或 Immer 库

```jsx
// 展开运算符
setUser(prev => ({
  ...prev,
  address: {
    ...prev.address,
    city: 'New York'
  }
}));
```

### 6.2 渲染问题

**问题**：组件重复渲染
**解决方案**：使用 memo, useMemo, useCallback 优化

**问题**：无限渲染循环
**解决方案**：检查 useEffect 依赖数组，避免在 effect 中修改依赖项

### 6.3 生命周期问题

**问题**：组件卸载后状态更新
**解决方案**：使用 cleanup 函数和 AbortController

```jsx
useEffect(() => {
  const controller = new AbortController();
  
  fetch('https://api.example.com/data', {
    signal: controller.signal
  })
    .then(res => res.json())
    .then(data => setData(data));
  
  return () => controller.abort();
}, []);
```

## 7. 性能优化

### 7.1 渲染优化

- **避免内联对象**：将样式对象移到组件外部
- **避免内联函数**：使用 useCallback
- **合理使用 memo**：只对昂贵组件使用
- **优化依赖数组**：确保 useEffect 依赖正确

### 7.2 状态管理优化

- **状态提升**：将状态提升到需要的最高层级
- **局部状态**：只在必要时使用全局状态
- **批量更新**：React 18 会自动批量更新

### 7.3 代码分割

**动态导入**

```jsx
// src/components/LazyComponent.jsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function LazyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 7.4 网络优化

- **数据缓存**：使用 SWR 或 React Query
- **分页加载**：大数据列表使用分页
- **图片优化**：使用适当尺寸和格式

## 8. 应用场景示例

### 8.1 电子商务应用

```jsx
// src/components/ProductCard.jsx
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

// src/components/ShoppingCart.jsx
function ShoppingCart({ items, onRemoveItem }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
              <button onClick={() => onRemoveItem(item.id)}>Remove</button>
            </div>
          ))}
          <div className="total">Total: ${total}</div>
        </>
      )}
    </div>
  );
}
```

### 8.2 社交媒体应用

```jsx
// src/components/Post.jsx
function Post({ post, onLike, onComment }) {
  return (
    <div className="post">
      <div className="post-header">
        <img src={post.author.avatar} alt={post.author.name} />
        <h4>{post.author.name}</h4>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post" />}
      </div>
      <div className="post-actions">
        <button onClick={() => onLike(post.id)}>
          {post.liked ? 'Liked' : 'Like'} ({post.likes})
        </button>
        <button onClick={() => onComment(post.id)}>Comment</button>
      </div>
    </div>
  );
}

// src/components/Feed.jsx
function Feed({ posts, onLike, onComment }) {
  return (
    <div className="feed">
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
          onLike={onLike}
          onComment={onComment}
        />
      ))}
    </div>
  );
}
```

### 8.3 仪表板应用

```jsx
// src/components/Dashboard.jsx
function Dashboard({ metrics }) {
  return (
    <div className="dashboard">
      <h1>Analytics Dashboard</h1>
      <div className="metrics-grid">
        <MetricCard title="Total Users" value={metrics.users} />
        <MetricCard title="Revenue" value={`$${metrics.revenue}`} />
        <MetricCard title="Conversions" value={`${metrics.conversion}%`} />
        <MetricCard title="Active Sessions" value={metrics.sessions} />
      </div>
      <Chart data={metrics.chartData} />
    </div>
  );
}

// src/components/MetricCard.jsx
function MetricCard({ title, value }) {
  return (
    <div className="metric-card">
      <h3>{title}</h3>
      <p className="metric-value">{value}</p>
    </div>
  );
}
```

### 8.4 内容管理系统

```jsx
// src/components/ContentEditor.jsx
function ContentEditor({ content, onChange, onSave }) {
  return (
    <div className="editor">
      <input
        type="text"
        placeholder="Title"
        value={content.title}
        onChange={(e) => onChange({ ...content, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={content.body}
        onChange={(e) => onChange({ ...content, body: e.target.value })}
      />
      <button onClick={onSave}>Save</button>
    </div>
  );
}

// src/components/ContentList.jsx
function ContentList({ items, onEdit, onDelete }) {
  return (
    <div className="content-list">
      {items.map(item => (
        <div key={item.id} className="content-item">
          <h3>{item.title}</h3>
          <p>{item.body.substring(0, 100)}...</p>
          <div className="actions">
            <button onClick={() => onEdit(item)}>Edit</button>
            <button onClick={() => onDelete(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## 9. 学习资源

- [React 官方文档](https://react.dev/docs)
- [React 学习路径](https://react.dev/learn)
- [MDN React 指南](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started)
- [React GitHub](https://github.com/facebook/react)
- [React 测试库](https://testing-library.com/docs/react-testing-library/intro/)

## 10. 最佳实践

### 10.1 代码组织

- **组件拆分**：将 UI 拆分为小的、可复用的组件
- **文件结构**：按功能或特性组织文件
- **命名规范**：使用 PascalCase 命名组件，camelCase 命名变量

### 10.2 状态管理

- **状态位置**：将状态放在需要它的最高层级
- **状态类型**：区分本地状态和全局状态
- **状态更新**：使用函数式更新避免竞态条件

### 10.3 性能

- **避免不必要的渲染**：使用 memo, useMemo, useCallback
- **代码分割**：使用动态导入减少初始包大小
- **网络请求**：使用 SWR 或 React Query 管理数据获取

### 10.4 可维护性

- **TypeScript**：使用 TypeScript 提高代码质量
- **ESLint**：使用 ESLint 确保代码风格一致
- **测试**：编写单元测试和集成测试
- **文档**：为组件和函数添加文档

## 总结

React 是一个强大的前端库，通过组件化、声明式编程和虚拟 DOM 等特性，使构建复杂的用户界面变得更加简单和高效。掌握 React 的核心概念和最佳实践，可以帮助你构建高性能、可维护的现代 Web 应用。关键是要理解组件的生命周期、状态管理的最佳方式，以及如何优化渲染性能。