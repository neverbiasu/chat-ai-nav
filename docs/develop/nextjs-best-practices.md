# Next.js 最佳实践指南

## 目录

- [水合错误的解决方案](#水合错误的解决方案)
- [数据获取策略](#数据获取策略)
- [性能优化技巧](#性能优化技巧)
- [路由与导航](#路由与导航)
- [常见问题排查](#常见问题排查)

## 水合错误的解决方案

> 💡 **什么是水合错误？** 当服务端渲染的HTML与客户端JavaScript生成的内容不一致时，React就会报"Hydration"错误。

### 主要解决方法

#### 1. 使用挂载检查

这是最常用的解决方案，适用于大多数场景：

```jsx
function MyComponent() {
  // 1. 添加挂载状态
  const [mounted, setMounted] = useState(false);
  
  // 2. 组件挂载后更新状态
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 3. 未挂载时显示占位内容
  if (!mounted) {
    return <LoadingSkeleton />;  // 返回一个加载骨架屏
  }
  
  // 4. 挂载后正常渲染
  return (
    <div>
      当前时间: {new Date().toLocaleTimeString()}
      窗口宽度: {window.innerWidth}px
    </div>
  );
}
```

#### 2. 动态导入组件

适用于整个组件依赖客户端功能时：

```jsx
import dynamic from 'next/dynamic';

// 禁用组件的服务端渲染
const ClientOnlyComponent = dynamic(
  () => import('../components/ClientComponent'),
  { ssr: false } // 👈 关键设置
);

export default function Page() {
  return (
    <div>
      <h1>这部分在服务器渲染</h1>
      <ClientOnlyComponent />
    </div>
  );
}
```

#### 3. 安全访问客户端API

```jsx
// ✅ 正确: 总是检查window是否存在
const isBrowser = typeof window !== 'undefined';
const width = isBrowser ? window.innerWidth : undefined;

// ❌ 错误: 直接访问可能导致服务端错误
const width = window.innerWidth; 
```

## 数据获取策略

### 服务器组件获取数据

```jsx
// app/products/page.jsx - 服务器组件
export default async function ProductsPage() {
  // 直接使用async/await，不需要useState或useEffect
  const products = await fetch('https://api.example.com/products')
    .then(res => res.json());
  
  return (
    <div>
      <h1>产品列表</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 客户端组件获取数据

```jsx
'use client'

import { useState, useEffect } from 'react';

export default function ClientFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/data');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('加载失败', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  if (loading) return <div>加载中...</div>;
  
  return <div>{/* 渲染数据 */}</div>;
}
```

### 推荐的数据获取库

- **SWR**: 轻量级，适合小型项目
- **React Query**: 功能丰富，适合复杂项目
- **RTK Query**: 适合已使用Redux的项目

## 性能优化技巧

### 图片优化

使用Next.js内置的Image组件可以自动优化图片：

```jsx
import Image from 'next/image';

// 自动优化图片尺寸和格式
<Image 
  src="/large-image.jpg" 
  alt="优化后的图片"
  width={800} 
  height={600}
  loading="lazy" // 延迟加载非首屏图片
/>
```

### 路由预加载

默认情况下，Next.js会自动预加载视口内的`<Link>`组件。你可以根据需要调整这一行为：

```jsx
// 禁用特定链接的预加载
<Link href="/heavy-page" prefetch={false}>
  大型页面
</Link>
```

### 代码分割最佳实践

- 使用动态导入拆分大型组件
- 懒加载首屏外的复杂组件
- 根据路由或用户交互拆分代码包

## 路由与导航

### 基本路由导航

```jsx
import Link from 'next/link';

// 基本导航
<Link href="/about">关于我们</Link>

// 带查询参数
<Link href="/search?q=nextjs">搜索 Next.js</Link>

// 动态路由
<Link href={`/blog/${postId}`}>阅读文章</Link>
```

### 编程式导航

```jsx
'use client'

import { useRouter } from 'next/navigation';

export default function NavigationButtons() {
  const router = useRouter();
  
  return (
    <div>
      <button onClick={() => router.push('/dashboard')}>
        前往仪表盘
      </button>
      <button onClick={() => router.back()}>
        返回上一页
      </button>
      <button onClick={() => router.refresh()}>
        刷新当前页面
      </button>
    </div>
  )
}
```

## 常见问题排查

### 问题1: 页面闪烁（特别是暗模式切换时）

**原因**: 在页面加载时，主题状态可能会从默认值变为用户保存的偏好设置。

**解决方案**:

```jsx
function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  // 在挂载前隐藏内容，避免闪烁
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }
  
  return <div className="theme-ready">{children}</div>;
}
```

### 问题2: `localStorage is not defined` 错误

**原因**: 服务器上不存在localStorage对象。

**解决方案**: 添加客户端检查

```jsx
const savedItems = typeof window !== 'undefined' 
  ? localStorage.getItem('items') 
  : null;
```

### 问题3: 首次加载后组件样式或内容突变

**原因**: 服务器渲染的内容与客户端JavaScript计算的不一致。

**解决方案**: 确保首次渲染的状态与服务端一致，然后在useEffect中更新

```jsx
// 不在初始状态中使用客户端API
const [width, setWidth] = useState(0); // 初始值与SSR一致

useEffect(() => {
  // 客户端挂载后再更新状态
  setWidth(window.innerWidth);
  
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## 调试技巧

- 使用 React 开发者工具检查组件渲染
- 启用严格模式发现潜在问题：

```jsx
// next.config.js
module.exports = {
  reactStrictMode: true,
}
```

- 使用 Chrome DevTools 的 "Rendering" 标签页启用 "Paint flashing" 检测不必要的重绘

---

需要更多 Next.js 技术支持？请访问[官方文档](https://nextjs.org/docs)或在团队 Slack 频道提问。