# 布局组件 (Layout)

## 组件概述

MainLayout 组件是应用的主要布局结构，包含顶部导航栏、中间内容区和底部页脚。该组件用于包装所有页面内容，提供统一的页面框架和结构。

## 功能特性

- 统一的页面结构和样式
- 自适应的内容区域
- 动态加载导航栏组件
- 支持深色/浅色主题

## 技术实现

### 核心依赖

- React 18+
- Next.js 14+
- Tailwind CSS (样式框架)

### 组件结构

```tsx
interface MainLayoutProps {
  children: React.ReactNode // 页面主要内容
}
```

主布局组件接收 `children` 作为主要内容，并将其嵌套在预定义的页面结构中。

### 关键实现细节

#### 1. 导航栏的动态加载

```tsx
const Navbar = dynamic(() => import('../navbar/Navbar'), {
  ssr: false,
  loading: () => (
    <div className="h-16 bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center">
        <div className="text-xl font-bold">ChatAI导航</div>
      </div>
    </div>
  )
})
```

使用 Next.js 的 `dynamic` 函数动态导入导航栏组件，并禁用其服务端渲染（`ssr: false`）。这有助于避免水合不匹配的问题，特别是当导航栏涉及客户端特定功能（如主题切换）时。同时，提供一个加载占位符，确保良好的用户体验。

#### 2. 灵活的布局结构

```tsx
<div className="flex flex-col min-h-screen">
  <Navbar navItems={navConfig} />
  <main className="flex-1">{children}</main>
  <footer className="bg-white dark:bg-gray-900 py-6 border-t border-gray-200 dark:border-gray-800">
    <div className="max-w-[1200px] mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
      <p>© {new Date().getFullYear()} ChatAI导航 - 发现最佳AI工具和资源</p>
    </div>
  </footer>
</div>
```

使用 Flexbox 创建垂直方向的布局，主内容区域通过 `flex-1` 自动填充可用空间。这确保了页脚始终位于页面底部，即使内容很少。

#### 3. 导航配置注入

布局组件直接将 `navConfig` 传递给 Navbar 组件，这种集中管理的方式简化了导航的配置和更新过程。

## 使用方法

在 Next.js 的 `app/layout.tsx` 文件中使用：

```tsx
import MainLayout from '@/components/layout/MainLayout'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## 最佳实践

1. **主题提供者包装**：在 MainLayout 外部使用 ThemeProvider，确保整个应用都能响应主题变化
2. **可访问性考虑**：使用语义化的 HTML5 标签（如 `main`, `footer`）增强可访问性
3. **响应式设计**：通过 Tailwind 的工具类实现响应式布局
4. **内容容器约束**：使用 `max-w-[1200px]` 和 `mx-auto` 限制内容宽度并居中

## 后续优化方向

1. 添加页面切换动画
2. 实现更多布局变体（如带侧边栏的布局）
3. 添加面包屑导航组件
4. 支持页面特定的布局定制
