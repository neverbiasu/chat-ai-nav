# 布局系统技术文档

## 1. 模块概述

布局系统是 Chat-AI-Nav 项目的基础架构，提供了统一的页面布局和容器组件。该系统基于 Next.js 13+ App Router 架构，结合 TailwindCSS 实现了灵活且一致的页面布局方案。

### 1.1 组件构成

布局系统主要包含以下组件：

- **RootLayout**：应用根布局，提供全局结构和主题支持
- **Container**：内容容器，控制宽度和间距
- **Grid**：栅格系统，包含 Row 和 Col 组件
- **Spacing**：间距管理组件
- **ThemeProvider**：主题提供者，支持深色/浅色模式切换

## 2. 技术实现

### 2.1 根布局

根布局组件（RootLayout）是应用的顶层布局，负责整体页面结构和主题集成：

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 将 navConfig 中的 icon 类型(ElementType)转换为实际的ReactNode元素
  const typedNavConfig = navConfig.map((item) => {
    const processedItem: any = {
      ...item,
      icon: item.icon ? createElement(item.icon) : null
    }

    if (item.children) {
      processedItem.children = item.children.map((child: ConfigNavItem) => ({
        ...child,
        icon: child.icon ? createElement(child.icon) : null
      }))
    }

    return processedItem
  })

  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ThemeProvider>
          <Navbar navItems={typedNavConfig} />
          <Container maxWidth="lg" padding="px-4 py-0" className="min-h-screen pt-16">
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2.2 容器组件

Container 组件提供了统一的内容容器，支持最大宽度、内边距、外边距和背景设置：

```typescript
const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = 'px-6',
  margin = 'mx-auto',
  background = 'bg-white dark:bg-gray-900',
  className = '',
}) => {
  // 根据设计文档定义的最大宽度值
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-3xl',
    lg: 'max-w-[1200px]',
    xl: 'max-w-7xl',
    full: 'max-w-full',
    none: '',
  };

  return (
    <div
      className={`${maxWidth !== 'none' ? maxWidthClasses[maxWidth] : ''} ${padding} ${margin} ${background} ${className}`}
    >
      {children}
    </div>
  );
};
```

### 2.3 主题提供者

ThemeProvider 组件是一个客户端组件，负责提供主题切换功能：

```typescript
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
```

## 3. 接口定义

### 3.1 ContainerProps 接口

```typescript
interface ContainerProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
  padding?: string;
  margin?: string;
  background?: string;
  className?: string;
}
```

### 3.2 ThemeProviderProps 接口

```typescript
interface ThemeProviderProps {
  children: ReactNode
}
```

### 3.3 间距系统

```typescript
type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'none';
```

## 4. 使用示例

### 4.1 基本布局

```typescript
import Container from '@/components/layout/Container'

export default function Page() {
  return (
    <Container maxWidth="lg" padding="px-6 py-8">
      <h1>页面内容</h1>
      <p>这是一个使用容器组件的示例</p>
    </Container>
  )
}
```

### 4.2 栅格布局

```typescript
import { Row, Col } from '@/components/layout/Grid'

<Row gutter="md" justify="between">
  <Col span={8}>
    <div>左侧内容</div>
  </Col>
  <Col span={16}>
    <div>右侧内容</div>
  </Col>
</Row>
```

### 4.3 间距管理

```typescript
import Spacing, { Divider } from '@/components/layout/Spacing'

<Spacing size="lg" direction="vertical">
  <div>第一个元素</div>
  <Divider />
  <div>第二个元素</div>
</Spacing>
```

## 5. 实现细节

### 5.1 服务器组件与客户端组件分离

根据 Next.js 13+ 的最佳实践，布局系统将服务器组件和客户端组件进行了明确分离：

- **服务器组件**：RootLayout, Container, Grid, Spacing
- **客户端组件**：ThemeProvider, Navbar

### 5.2 响应式设计

布局系统基于 TailwindCSS 的响应式类实现了自适应设计：

```typescript
// 容器组件的响应式最大宽度
const maxWidthClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-3xl',
  lg: 'max-w-[1200px]',
  xl: 'max-w-7xl',
  full: 'max-w-full',
  none: '',
};
```

### 5.3 主题适配

所有布局组件都支持深色/浅色主题切换：

```typescript
// 容器组件的背景色支持主题切换
background = 'bg-white dark:bg-gray-900'
```

## 6. 注意事项

1. **服务器组件限制**：服务器组件不能使用 React hooks 或浏览器 API。

2. **客户端组件标记**：需要使用客户端功能的组件必须添加 'use client' 指令。

3. **组件类型转换**：在服务器组件中处理客户端组件类型时，需要使用 createElement 函数进行转换。

4. **水合警告抑制**：使用 suppressHydrationWarning 属性避免主题切换时的水合警告。

## 7. 后续优化建议

1. **类型安全性**：减少 any 类型的使用，增强类型检查。

2. **性能优化**：考虑组件懒加载和代码分割。

3. **可访问性**：增强键盘导航和屏幕阅读器支持。

4. **动态布局**：支持基于用户偏好的动态布局调整。
