# Next.js 最佳实践

## 避免水合错误 (Hydration Errors)

水合错误是当服务端渲染 (SSR) 的内容与客户端渲染的内容不匹配时发生的。这通常发生在以下情况：

1. 代码访问了仅客户端可用的 API（如 `window`、`document`、`localStorage` 等）
2. 组件根据客户端特定信息（如屏幕尺寸、主题设置等）渲染不同的内容
3. 使用了依赖于客户端状态的第三方库

### 解决方案

#### 1. 使用挂载检查模式

```tsx
function ClientSideComponent() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <Fallback />; // 显示占位符或骨架屏
  }
  
  // 正常渲染，可以安全访问客户端 API
  return <ActualComponent />;
}
```

#### 2. 条件渲染检查

```tsx
{typeof window !== 'undefined' && <ClientFeatureComponent />}
```

#### 3. 动态导入

使用 Next.js 的 `dynamic` 导入，并禁用 SSR：

```tsx
import dynamic from 'next/dynamic';

const ClientComponent = dynamic(() => import('../components/ClientComponent'), {
  ssr: false
});
```

#### 4. 使用 suppressHydrationWarning

对于无法避免差异的元素（如显示当前时间的组件），可以使用 `suppressHydrationWarning`：

```tsx
<div suppressHydrationWarning>
  当前时间: {new Date().toLocaleTimeString()}
</div>
```

**注意**：这只会抑制警告，而不会解决实际差异问题。仅应在极少数情况下使用。

## 数据获取最佳实践

### 使用服务器组件

Next.js App Router 允许默认使用 React 服务器组件，它们只在服务器上运行：

```tsx
// app/page.tsx (服务器组件)
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <main>{/* 使用数据渲染 */}</main>;
}
```

### 客户端数据获取

对于需要在客户端获取数据的情况，使用 React 的 `useEffect` 或 SWR/React Query 等库：

```tsx
'use client'

import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function ClientComponent() {
  const { data, error, isLoading } = useSWR('/api/data', fetcher);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  
  return <div>{/* 渲染数据 */}</div>;
}
```

## 构建高性能页面

### 图片优化

使用 Next.js 的 Image 组件来自动优化图像：

```tsx
import Image from 'next/image';

<Image
  src="/images/profile.jpg"
  width={300}
  height={300}
  alt="Profile"
  priority={isImportant}
  loading="lazy"
/>
```

### 字体优化

使用 Next.js 的内置字体优化：

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>;
}
```

## 错误处理与边界

在 App Router 中创建错误边界：

```tsx
// app/posts/[id]/error.tsx
'use client'

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以记录错误到错误报告服务
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>出现了错误！</h2>
      <button onClick={() => reset()}>
        尝试重新加载
      </button>
    </div>
  );
}
```

## 路由与导航

### 使用 Link 组件进行客户端导航

```tsx
import Link from 'next/link';

<Link href="/about" prefetch={false}>
  关于我们
</Link>
```

### 编程式导航

```tsx
'use client'

import { useRouter } from 'next/navigation';

export default function NavigateButton() {
  const router = useRouter();
  
  return (
    <button onClick={() => router.push('/dashboard')}>
      前往仪表盘
    </button>
  );
}
```

### 动态路由分段

