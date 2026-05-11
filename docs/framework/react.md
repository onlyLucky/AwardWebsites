# React 技术知识点文档

## 1. 技术介绍

React 是一个用于构建用户界面的 JavaScript 库，由 Facebook (现 Meta) 开发和维护。它的核心思想是通过组件化和声明式编程来构建复杂的用户界面。

### 核心特性

- **组件化** - 将 UI 拆分为独立可复用的组件
- **声明式** - 描述 UI 应该是什么样子，而非如何实现
- **虚拟 DOM** - 通过虚拟 DOM 优化渲染性能
- **单向数据流** - 数据从父组件流向子组件
- **Hooks** - 让函数组件拥有状态和生命周期
- **JSX** - 一种类似 HTML 的语法扩展
- **可组合性** - 组件可以相互组合形成复杂界面
- **跨平台** - 可以用于 Web、移动设备和桌面应用

### 适用场景

- **单页应用 (SPA)** - 复杂交互的现代 Web 应用
- **移动应用** - 通过 React Native 开发原生移动应用
- **渐进式 Web 应用 (PWA)** - 结合 Service Worker 的离线应用
- **企业级应用** - 大型、复杂的业务系统
- **内容管理系统** - 后台管理界面
- **数据可视化** - 复杂的数据展示界面

## 2. 快速入门

### 环境搭建

首先，确保你已经安装了 Node.js (推荐 v18+) 和 npm。

### 项目初始化

使用 Vite 创建一个新的 React 项目：

```bash
# 创建新项目
npm create vite@latest my-react-app -- --template react

# 或使用 TypeScript
npm create vite@latest my-react-app -- --template react-ts
```

### 项目结构

创建完成后，你会看到以下项目结构：

```
my-react-app/
├── src/            # 源代码
│   ├── components/  # 组件
│   ├── App.jsx      # 根组件
│   ├── main.jsx     # 入口文件
│   └── index.css    # 全局样式
├── public/          # 静态资源
├── package.json     # 依赖配置
├── vite.config.js   # Vite 配置
└── index.html       # HTML 模板
```

### 运行项目

```bash
# 进入项目目录
cd my-react-app

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

开发服务器启动后，你可以在浏览器中访问 `http://localhost:5173` 查看你的应用。

### 第一个组件

让我们创建一个简单的组件来了解 React 的基本结构：

```jsx
// src/App.jsx
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Hello React!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  )
}

export default App
```

## 3. 基础使用

### JSX 语法

JSX 是一种 JavaScript 的语法扩展，看起来像模板语言，但它具有 JavaScript 的全部功能。

```jsx
// 基本 JSX
const element = <h1>Hello, world!</h1>;

// 嵌入表达式
const name = 'John';
const element = <h1>Hello, {name}!</h1>;

// 使用 JavaScript 表达式
const isLoggedIn = true;
const element = (
  <div>
    {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
  </div>
);

// 属性
const element = <img src="logo.png" alt="Logo" className="logo" />;

// 子元素
const element = (
  <div>
    <h1>Hello</h1>
    <p>Welcome to React</p>
  </div>
);
```

### 组件基础

React 组件可以是函数组件或类组件。现代 React 推荐使用函数组件。

#### 函数组件

```jsx
// src/components/Greeting.jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default Greeting;

// 使用
import Greeting from './components/Greeting';

function App() {
  return <Greeting name="John" />;
}
```

#### 类组件

```jsx
// src/components/ClassCounter.jsx
import React, { Component } from 'react';

class ClassCounter extends Component {
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

export default ClassCounter;
```

### Hooks 基础

Hooks 是 React 16.8 引入的新特性，让函数组件可以使用状态和其他 React 特性。

#### useState

`useState` 是最基本的 Hook，用于在函数组件中添加状态。

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
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

export default Counter;
```

#### useEffect

`useEffect` 用于处理副作用，如数据获取、订阅或手动更改 DOM。

```jsx
// src/components/DataFetcher.jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 数据获取
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // 清理函数
    return () => {
      // 清理资源，如取消订阅
    };
  }, []); // 空依赖数组 = 只执行一次

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div>
      <h2>Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataFetcher;
```

#### useContext

`useContext` 用于访问 Context API 提供的数据。

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from 'react';

// 创建 Context
const ThemeContext = createContext();

// 自定义 Hook 方便使用
export function useTheme() {
  return useContext(ThemeContext);
}

// Provider 组件
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
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
        color: theme === 'light' ? '#333' : '#fff',
        border: `1px solid ${theme === 'light' ? '#ccc' : '#666'}`
      }}
    >
      Toggle Theme ({theme})
    </button>
  );
}

export default ThemedButton;

// src/App.jsx
import { ThemeProvider } from './context/ThemeContext';
import ThemedButton from './components/ThemedButton';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <h1>Theme Example</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}
```

### 组件通信

#### 父传子 (Props)

```jsx
// Parent.jsx
function Parent() {
  const [message, setMessage] = useState('Hello from parent');
  
  return (
    <div>
      <Child message={message} onUpdate={setMessage} />
      <p>Parent message: {message}</p>
    </div>
  );
}

// Child.jsx
function Child({ message, onUpdate }) {
  return (
    <div>
      <p>Child received: {message}</p>
      <button onClick={() => onUpdate('Updated by child')}>
        Update Message
      </button>
    </div>
  );
}
```

#### 子传父 (回调函数)

```jsx
// src/components/Child.jsx
function Child({ onDataChange }) {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onDataChange(newValue);
  };
  
  return (
    <input 
      type="text" 
      value={value} 
      onChange={handleChange} 
      placeholder="Enter something"
    />
  );
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

### 表单处理

#### 受控组件

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
    // 这里可以进行登录逻辑
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
```

## 4. 进阶使用

### 自定义 Hooks

自定义 Hooks 允许你重用状态逻辑。

```jsx
// src/hooks/useCounter.js
import { useState, useCallback } from 'react';

export function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount(prev => prev - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    increment,
    decrement,
    reset
  };
}

// 使用
import { useCounter } from './hooks/useCounter';

function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(0, 2);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### useReducer

`useReducer` 是 `useState` 的替代方案，适合处理复杂的状态逻辑。

```jsx
// src/components/TodoList.jsx
import { useReducer } from 'react';

// 初始状态
const initialState = {
  todos: [],
  inputValue: ''
};

// Reducer 函数
function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        inputValue: action.payload
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: state.inputValue,
          completed: false
        }],
        inputValue: ''
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => 
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={state.inputValue}
          onChange={(e) => dispatch({ type: 'SET_INPUT', payload: e.target.value })}
          placeholder="Add a todo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={() => dispatch({ type: 'ADD_TODO' })}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Todo
        </button>
      </div>
      <ul className="space-y-2">
        {state.todos.map(todo => (
          <li key={todo.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
              className="ml-auto bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```

### useCallback 和 useMemo

`useCallback` 和 `useMemo` 是 React 中用于性能优化的重要 Hooks，它们通过缓存函数和计算结果来避免不必要的重新渲染。

#### useCallback

**作用**：
- 缓存函数实例，避免每次渲染都创建新的函数引用
- 当函数作为 props 传递给子组件时，可以避免子组件的不必要重新渲染
- 当函数作为 `useEffect` 的依赖时，可以避免 effect 的频繁执行

**用法**：
```jsx
const memoizedCallback = useCallback(
  () => {
    // 函数逻辑
  },
  [dependencies] // 依赖数组
);
```

**使用场景**：
1. **传递给子组件的回调函数** - 特别是当子组件使用 `React.memo` 优化时
2. **作为 `useEffect` 的依赖** - 避免 effect 因函数引用变化而频繁执行
3. **事件处理函数** - 避免每次渲染都创建新的事件处理函数
4. **自定义 Hook 中的返回函数** - 确保返回的函数引用稳定

**示例**：
```jsx
// src/components/Parent.jsx
import { useState, useCallback } from 'react';
import Child from './Child';

function Parent() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello');

  // 缓存回调函数，只有当 message 变化时才重新创建
  const handleClick = useCallback((item) => {
    console.log('Item clicked:', item);
    setMessage(`Clicked: ${item.name}`);
  }, [message]);

  // 缓存事件处理函数，无依赖
  const handleReset = useCallback(() => {
    setCount(0);
    setMessage('Hello');
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Message: {message}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={handleReset}>Reset</button>
      <Child onItemClick={handleClick} />
    </div>
  );
}

// src/components/Child.jsx
import { memo } from 'react';

// 使用 memo 避免不必要的渲染
const Child = memo(({ onItemClick }) => {
  console.log('Child component rendered');
  
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];

  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

export default Child;
```

#### useMemo

**作用**：
- 缓存计算结果，避免每次渲染都重新计算
- 当计算结果作为 props 传递给子组件时，可以避免子组件的不必要重新渲染
- 优化昂贵的计算，提高组件性能

**用法**：
```jsx
const memoizedValue = useMemo(
  () => {
    // 计算逻辑
    return expensiveCalculation(dependencies);
  },
  [dependencies] // 依赖数组
);
```

**使用场景**：
1. **昂贵的计算** - 如复杂的数学计算、数据转换、排序等
2. **派生状态** - 从现有状态或 props 派生的值
3. **复杂对象的创建** - 避免每次渲染都创建新的对象
4. **作为子组件的 props** - 确保传递给子组件的值引用稳定

**示例**：
```jsx
// src/components/DataProcessor.jsx
import { useMemo } from 'react';

function DataProcessor({ data, filter, sortBy }) {
  // 缓存过滤和排序结果
  const processedData = useMemo(() => {
    console.log('Processing data...');
    
    // 过滤数据
    const filtered = data.filter(item => {
      if (!filter) return true;
      return item.name.toLowerCase().includes(filter.toLowerCase());
    });
    
    // 排序数据
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'value') {
        return a.value - b.value;
      }
      return 0;
    });
    
    return sorted;
  }, [data, filter, sortBy]); // 只有当依赖变化时才重新计算

  // 缓存计算结果
  const statistics = useMemo(() => {
    if (processedData.length === 0) {
      return { total: 0, average: 0 };
    }
    
    const total = processedData.reduce((sum, item) => sum + item.value, 0);
    const average = total / processedData.length;
    
    return { total, average };
  }, [processedData]);

  return (
    <div>
      <h3>Processed Data</h3>
      <p>Total items: {processedData.length}</p>
      <p>Total value: {statistics.total}</p>
      <p>Average value: {statistics.average.toFixed(2)}</p>
      
      <ul>
        {processedData.map(item => (
          <li key={item.id}>
            {item.name}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataProcessor;
```

#### 内部函数的使用

**在组件内部定义函数时**：
- 每次组件渲染都会创建新的函数实例
- 这会导致传递给子组件的函数引用每次都不同
- 可能会触发子组件的不必要重新渲染

**使用 useCallback 优化内部函数**：
```jsx
function MyComponent() {
  // 不推荐：每次渲染都创建新函数
  const handleClick = () => {
    console.log('Clicked');
  };

  // 推荐：缓存函数实例
  const handleClickMemoized = useCallback(() => {
    console.log('Clicked');
  }, []);

  return (
    <div>
      <button onClick={handleClickMemoized}>Click me</button>
    </div>
  );
}
```

#### 最佳实践

1. **不要过度使用** - 只在确实需要优化的地方使用
2. **正确设置依赖数组** - 确保依赖项完整且正确
3. **结合 React.memo 使用** - 获得最佳性能优化效果
4. **测量性能** - 使用 React DevTools 分析性能瓶颈
5. **考虑计算成本** - 对于简单计算，useMemo 可能反而会增加开销

#### 实际应用示例

```jsx
// 综合示例：结合 useCallback 和 useMemo
import { useState, useCallback, useMemo } from 'react';
import { memo } from 'react';

// 子组件：使用 memo 优化
const ListItem = memo(({ item, onItemClick }) => {
  console.log('ListItem rendered:', item.id);
  return (
    <li onClick={() => onItemClick(item)}>
      {item.name} - ${item.price}
    </li>
  );
});

function ShoppingList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apples', price: 1.99, category: 'Fruits' },
    { id: 2, name: 'Bananas', price: 0.99, category: 'Fruits' },
    { id: 3, name: 'Carrots', price: 0.49, category: 'Vegetables' },
    { id: 4, name: 'Potatoes', price: 0.79, category: 'Vegetables' }
  ]);
  
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  // 缓存过滤和排序逻辑
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, category, search]);

  // 缓存总计计算
  const total = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.price, 0);
  }, [filteredItems]);

  // 缓存回调函数
  const handleItemClick = useCallback((item) => {
    console.log('Item clicked:', item.name);
    // 可以添加到购物车等逻辑
  }, []);

  const handleAddItem = useCallback((newItem) => {
    setItems(prev => [...prev, newItem]);
  }, []);

  return (
    <div>
      <h1>Shopping List</h1>
      
      <div className="filters">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
        </select>
      </div>
      
      <ul>
        {filteredItems.map(item => (
          <ListItem key={item.id} item={item} onItemClick={handleItemClick} />
        ))}
      </ul>
      
      <p>Total: ${total.toFixed(2)}</p>
      
      <button onClick={() => handleAddItem({ 
        id: Date.now(), 
        name: 'New Item', 
        price: 1.00, 
        category: 'Other' 
      })}>
        Add Item
      </button>
    </div>
  );
}

export default ShoppingList;
```

### React 18 新特性

React 18 引入了许多新特性，提升了性能和开发体验。

#### 并发渲染

**自动批处理**：React 18 会自动批处理状态更新，无论它们来自何处（事件处理、定时器、Promise 等），都能合并到一次渲染中，减少渲染次数。

```jsx
// React 18 之前
function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello');

  function handleClick() {
    // 会触发两次渲染
    setCount(c => c + 1);
    setMessage('Updated');
  }

  return (
    <div>
      <p>Count: {count}</p>
      <p>Message: {message}</p>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

// React 18 中
function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello');

  function handleClick() {
    // 只会触发一次渲染
    setCount(c => c + 1);
    setMessage('Updated');
  }

  return (
    <div>
      <p>Count: {count}</p>
      <p>Message: {message}</p>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
```

#### startTransition

**作用**：标记非紧急更新为过渡更新，优先处理紧急更新（如用户输入），提高用户体验。

**使用场景**：
- 大型列表过滤或排序
- 复杂表单验证
- 页面切换动画

```jsx
import { useState, startTransition } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleSearch(e) {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // 标记为过渡更新
    startTransition(() => {
      // 模拟搜索
      const filteredResults = searchItems(newQuery);
      setResults(filteredResults);
    });
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### useId

**作用**：生成唯一的 ID，避免服务器端渲染和客户端渲染之间的不匹配。

**使用场景**：
- 表单输入字段
- 可访问性标签
- 唯一标识符

```jsx
import { useId } from 'react';

function FormComponent() {
  const id = useId();

  return (
    <div>
      <label htmlFor={`${id}-name`}>Name:</label>
      <input id={`${id}-name`} type="text" />
      
      <label htmlFor={`${id}-email`}>Email:</label>
      <input id={`${id}-email`} type="email" />
    </div>
  );
}
```

#### useSyncExternalStore

**作用**：订阅外部存储，确保在并发渲染中保持状态同步。

**使用场景**：
- 状态管理库
- 外部数据源
- 第三方状态

```jsx
import { useSyncExternalStore } from 'react';

function useCounterStore() {
  return useSyncExternalStore(
    // 订阅函数
    (callback) => {
      window.addEventListener('counterChange', callback);
      return () => window.removeEventListener('counterChange', callback);
    },
    // 获取快照
    () => window.counter,
    // 获取服务器快照（可选）
    () => initialCounter
  );
}

function Counter() {
  const count = useCounterStore();
  return <p>Count: {count}</p>;
}
```

#### useDeferredValue

**作用**：延迟处理非紧急值，优先更新紧急内容。

**使用场景**：
- 搜索结果
- 大型列表
- 复杂计算

```jsx
import { useState, useDeferredValue } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [results, setResults] = useState([]);

  // 当 deferredQuery 变化时更新结果
  useEffect(() => {
    const filteredResults = searchItems(deferredQuery);
    setResults(filteredResults);
  }, [deferredQuery]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 内部函数的详细使用

#### 内部函数的创建和优化

**问题**：在组件内部定义的函数会在每次渲染时重新创建，这可能导致：
- 子组件的不必要重新渲染
- `useEffect` 等 Hooks 的频繁执行
- 性能下降

**解决方案**：使用 `useCallback` 缓存函数，`useMemo` 缓存计算结果。

#### 内部函数的依赖管理

**正确设置依赖数组**：
- 包含函数中使用的所有外部变量
- 避免循环依赖
- 对于复杂依赖，考虑使用 `useReducer` 或状态提升

```jsx
// 错误：缺少依赖
const handleClick = useCallback(() => {
  console.log(message); // message 是外部变量
}, []); // 空依赖数组

// 正确：包含所有依赖
const handleClick = useCallback(() => {
  console.log(message);
}, [message]);
```

#### 内部函数的性能影响

**何时优化**：
1. 函数作为 props 传递给子组件
2. 函数作为 `useEffect` 的依赖
3. 函数在大型列表中使用
4. 函数执行昂贵操作

**何时不优化**：
1. 函数只在组件内部使用
2. 函数执行简单操作
3. 组件很少重新渲染

#### 内部函数的最佳实践

1. **将相关逻辑组织到自定义 Hooks 中**
2. **使用 `useCallback` 缓存回调函数**
3. **使用 `useMemo` 缓存计算结果**
4. **合理设置依赖数组**
5. **结合 `React.memo` 优化子组件**

### 错误边界

错误边界可以捕获子组件树中的 JavaScript 错误，防止整个应用崩溃。

```jsx
// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.toString()}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// 使用
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ComponentThatMightError />
    </ErrorBoundary>
  );
}
```

### Suspense 和 lazy 加载

`Suspense` 和 `lazy` 用于代码分割和延迟加载组件。

```jsx
// src/components/LazyComponent.jsx
import { lazy, Suspense } from 'react';

// 延迟加载 HeavyComponent
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function LazyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

export default LazyComponent;
```

## 5. 实际应用

### 电子商务应用

**项目结构**：

```
src/
├── components/
│   ├── ProductCard.jsx
│   ├── ShoppingCart.jsx
│   └── CheckoutForm.jsx
├── context/
│   └── CartContext.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── ProductPage.jsx
│   └── CartPage.jsx
├── App.jsx
└── main.jsx
```

**ProductCard 组件**：

```jsx
// src/components/ProductCard.jsx
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card border rounded-lg p-4 hover:shadow-md transition-shadow">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        <button 
          onClick={() => addToCart(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
```

**CartContext**：

```jsx
// src/context/CartContext.jsx
import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount: cart.reduce((count, item) => count + item.quantity, 0)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
```

### 社交媒体应用

**项目结构**：

```
src/
├── components/
│   ├── Post.jsx
│   ├── Comment.jsx
│   └── Feed.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── ProfilePage.jsx
│   └── PostPage.jsx
├── App.jsx
└── main.jsx
```

**Post 组件**：

```jsx
// src/components/Post.jsx
import { useState } from 'react';

function Post({ post, onLike, onComment }) {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(post.id, comment);
      setComment('');
    }
  };

  return (
    <div className="post border rounded-lg p-4 mb-4">
      <div className="flex items-center mb-4">
        <img 
          src={post.author.avatar} 
          alt={post.author.name} 
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h4 className="font-semibold">{post.author.name}</h4>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      </div>
      <div className="mb-4">
        <p>{post.content}</p>
        {post.image && (
          <img 
            src={post.image} 
            alt="Post image" 
            className="w-full mt-2 rounded"
          />
        )}
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <button 
          onClick={() => onLike(post.id)}
          className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{post.comments.length}</span>
        </button>
      </div>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <button 
          type="submit" 
          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>
      {post.comments.length > 0 && (
        <div className="mt-4 space-y-2">
          {post.comments.map(comment => (
            <div key={comment.id} className="flex">
              <img 
                src={comment.author.avatar} 
                alt={comment.author.name} 
                className="w-6 h-6 rounded-full mr-2"
              />
              <div className="bg-gray-100 p-2 rounded">
                <p className="text-sm font-semibold">{comment.author.name}</p>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
```

### 仪表板应用

**项目结构**：

```
src/
├── components/
│   ├── MetricCard.jsx
│   ├── Chart.jsx
│   └── Sidebar.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── DashboardPage.jsx
│   ├── AnalyticsPage.jsx
│   └── SettingsPage.jsx
├── App.jsx
└── main.jsx
```

**DashboardPage 组件**：

```jsx
// src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react';
import MetricCard from '../components/MetricCard';
import Chart from '../components/Chart';

function DashboardPage() {
  const [metrics, setMetrics] = useState({
    users: 1234,
    revenue: 45678,
    conversions: 24,
    sessions: 567
  });

  const [chartData, setChartData] = useState([10, 20, 15, 25, 30, 20, 35]);

  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard 
          title="Total Users" 
          value={metrics.users} 
          change={12} 
          changeType="positive"
        />
        <MetricCard 
          title="Revenue" 
          value={`$${metrics.revenue.toLocaleString()}`} 
          change={8} 
          changeType="positive"
        />
        <MetricCard 
          title="Conversions" 
          value={`${metrics.conversions}%`} 
          change={-3} 
          changeType="negative"
        />
        <MetricCard 
          title="Active Sessions" 
          value={metrics.sessions} 
          change={5} 
          changeType="positive"
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Traffic Overview</h2>
        <Chart data={chartData} />
      </div>
    </div>
  );
}

export default DashboardPage;
```

### 内容管理系统

**项目结构**：

```
src/
├── components/
│   ├── ContentList.jsx
│   ├── ContentEditor.jsx
│   └── Sidebar.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── DashboardPage.jsx
│   ├── ContentPage.jsx
│   └── SettingsPage.jsx
├── App.jsx
└── main.jsx
```

**ContentEditor 组件**：

```jsx
// src/components/ContentEditor.jsx
import { useState, useEffect } from 'react';

function ContentEditor({ content, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (content) {
      setTitle(content.title);
      setBody(content.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, body });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="body" className="block text-sm font-medium mb-1">
          Content
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ContentEditor;
```

## 6. 常见问题

### 状态管理问题

**问题**：组件状态更新不生效
**解决方案**：
- 使用函数式更新，确保状态更新基于最新值
- 检查是否在异步操作中正确更新状态
- 确保状态更新逻辑没有错误

```jsx
// 错误
setCount(count + 1);

// 正确
setCount(prevCount => prevCount + 1);
```

**问题**：深层状态更新
**解决方案**：
- 使用展开运算符或 Immer 库
- 确保正确处理嵌套对象的更新

```jsx
// 展开运算符
setUser(prev => ({
  ...prev,
  address: {
    ...prev.address,
    city: 'New York'
  }
}));

// Immer
import produce from 'immer';

setUser(produce(draft => {
  draft.address.city = 'New York';
}));
```

### 渲染问题

**问题**：组件重复渲染
**解决方案**：
- 使用 `React.memo` 包装组件
- 使用 `useCallback` 和 `useMemo` 优化
- 检查依赖数组是否正确

**问题**：无限渲染循环
**解决方案**：
- 检查 `useEffect` 依赖数组
- 避免在 effect 中修改依赖项
- 确保没有在渲染过程中修改状态

### 生命周期问题

**问题**：组件卸载后状态更新
**解决方案**：
- 使用 cleanup 函数
- 使用 `AbortController` 取消异步操作
- 检查组件是否已卸载

```jsx
useEffect(() => {
  const controller = new AbortController();
  let mounted = true;
  
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data', {
        signal: controller.signal
      });
      const data = await response.json();
      if (mounted) {
        setData(data);
      }
    } catch (error) {
      if (error.name !== 'AbortError' && mounted) {
        setError(error);
      }
    }
  };
  
  fetchData();
  
  return () => {
    mounted = false;
    controller.abort();
  };
}, []);
```

### 性能问题

**问题**：大型列表渲染慢
**解决方案**：
- 使用虚拟滚动（如 react-window）
- 实现分页
- 使用 `React.memo` 和 `useCallback`

**问题**：内存泄漏
**解决方案**：
- 清理 event listeners
- 取消 subscriptions
- 终止 async operations

## 7. 性能优化

### 渲染优化

#### React.memo

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

#### useMemo

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

export default Calculation;
```

#### useCallback

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

### 状态管理优化

#### 状态提升

```jsx
// 子组件不需要直接管理状态
function Child({ value, onChange }) {
  return (
    <input 
      type="text" 
      value={value} 
      onChange={onChange} 
    />
  );
}

// 父组件管理状态
function Parent() {
  const [value, setValue] = useState('');
  
  return (
    <Child 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  );
}
```

#### 局部状态

```jsx
// 只有组件内部需要的状态
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### 代码分割

#### 动态导入

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

export default LazyComponent;
```

#### 路由级代码分割

```jsx
// src/App.jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
```

### 网络优化

#### 数据缓存

```jsx
// 使用 SWR
import useSWR from 'swr';

function DataComponent() {
  const { data, error } = useSWR('https://api.example.com/data');
  
  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  
  return <div>{data}</div>;
}

// 使用 React Query
import { useQuery } from 'react-query';

function DataComponent() {
  const { data, error, isLoading } = useQuery('data', () => 
    fetch('https://api.example.com/data').then(res => res.json())
  );
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  
  return <div>{data}</div>;
}
```

#### 分页加载

```jsx
function PaginatedList() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const response = await fetch(`https://api.example.com/data?page=${page}`);
    const newData = await response.json();
    setData(prev => [...prev, ...newData]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <button onClick={loadMore} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}
```

## 8. 学习资源

### 官方资源

- **React 官方文档** - [https://react.dev/docs](https://react.dev/docs)
- **React 学习路径** - [https://react.dev/learn](https://react.dev/learn)
- **React GitHub** - [https://github.com/facebook/react](https://github.com/facebook/react)
- **React 测试库** - [https://testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)

### 社区资源

- **MDN React 指南** - [https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started)
- **React 教程** - [https://www.freecodecamp.org/learn/front-end-development-libraries/react](https://www.freecodecamp.org/learn/front-end-development-libraries/react)
- **React 状态管理** - [https://react.dev/learn/managing-state](https://react.dev/learn/managing-state)

### 课程和教程

- **React 基础到高级** - [Udemy](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
- **React 官方教程** - [https://react.dev/learn/tutorial-tic-tac-toe](https://react.dev/learn/tutorial-tic-tac-toe)
- **freeCodeCamp React 教程** - [https://www.freecodecamp.org/news/react-handbook/](https://www.freecodecamp.org/news/react-handbook/)

## 9. 最佳实践

### 代码组织

- **组件拆分** - 将 UI 拆分为小的、可复用的组件
- **文件结构** - 按功能或特性组织文件
- **命名规范** - 使用 PascalCase 命名组件，camelCase 命名变量
- **目录结构** - 合理组织项目目录

### 状态管理

- **状态位置** - 将状态放在需要它的最高层级
- **状态类型** - 区分本地状态和全局状态
- **状态更新** - 使用函数式更新避免竞态条件
- **状态库** - 选择合适的状态管理库

### 性能

- **避免不必要的渲染** - 使用 memo, useMemo, useCallback
- **代码分割** - 使用动态导入减少初始包大小
- **网络请求** - 使用 SWR 或 React Query 管理数据获取
- **图片优化** - 使用适当尺寸和格式

### 可维护性

- **TypeScript** - 使用 TypeScript 提高代码质量
- **ESLint** - 使用 ESLint 确保代码风格一致
- **测试** - 编写单元测试和集成测试
- **文档** - 为组件和函数添加文档

### 开发体验

- **编辑器配置** - 使用 VS Code 和相关插件
- **热重载** - 启用热模块替换
- **调试工具** - 使用 React DevTools
- **代码格式化** - 使用 Prettier

## 10. 总结

React 是一个强大的前端库，通过组件化、声明式编程和虚拟 DOM 等特性，使构建复杂的用户界面变得更加简单和高效。掌握 React 的核心概念和最佳实践，可以帮助你构建高性能、可维护的现代 Web 应用。

增强后的文档提供了从入门到精通的完整学习路径，包含详细的代码示例和实际应用场景，希望能够帮助你快速掌握 React 的核心知识和最佳实践。无论是构建简单的表单还是复杂的单页应用，React 都能为你提供强大的工具和灵活的开发体验。