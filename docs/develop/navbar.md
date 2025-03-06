# 导航栏组件 (Navbar)

## 组件概述

导航栏组件是整个应用的顶部导航系统，提供了统一的页面导航和功能入口，支持主题切换和移动端适配。该组件基于 React 和 Next.js 构建，使用了 Tailwind CSS 进行样式管理。

## 功能特性

- 响应式布局，自动适配桌面端和移动端
- 支持深色/浅色主题切换
- 支持子菜单的多级导航结构
- 根据当前路径自动高亮激活项
- 移动端折叠菜单支持

## 技术实现

### 核心依赖

- React 18+
- Next.js 14+
- next-themes (主题管理)
- Heroicons (图标库)
- Tailwind CSS (样式框架)

### 组件结构

```tsx
interface NavbarProps {
  navItems: NavItem[]  // 导航项配置
  className?: string   // 自定义样式类
}

interface NavItem {
  key: string          // 唯一标识符
  label: string        // 显示文本
  icon?: ElementType   // 图标组件
  path: string         // 链接路径
  children?: NavItem[] // 子导航项
}
```

### 状态管理

组件内部管理以下状态：

1. `activeKey`: 当前激活的导航项键值
2. `isMobile`: 当前是否为移动设备视图
3. `isCollapsed`: 移动端菜单是否收起
4. `mounted`: 客户端挂载状态标志

### 关键实现细节

#### 1. 客户端渲染保护

```tsx
// 添加客户端挂载状态
const [mounted, setMounted] = useState(false)

// 首先检查组件是否已在客户端挂载
useEffect(() => {
  setMounted(true)
}, [])
```

所有依赖于浏览器 API 的效果都应该检查 `mounted` 状态，以避免服务端渲染时的错误。

#### 2. 响应式布局检测

```tsx
useEffect(() => {
  if (!mounted) return;
  
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768)
  }

  // 初始化检测
  handleResize()

  // 添加窗口尺寸变化监听
  window.addEventListener('resize', handleResize)

  // 清理监听器
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [mounted])
```

组件使用 `resize` 事件监听器动态检测屏幕尺寸变化，并据此调整导航栏样式和行为。

#### 3. 导航项激活逻辑

```tsx
useEffect(() => {
  if (!mounted || !pathname) return;
  
  const activeItem =
    navItems.find((item) => item.path === pathname) ||
    navItems.find((item) => item.children?.some((child) => child.path === pathname))
  if (activeItem) {
    setActiveKey(activeItem.key)
  }
}, [pathname, navItems, mounted])
```

组件会根据当前路径自动查找匹配的导航项（包括子菜单项），并设置为激活状态。

#### 4. 主题切换功能

```tsx
const toggleTheme = () => {
  setTheme(theme === 'dark' ? 'light' : 'dark')
}
```

利用 `next-themes` 库提供的 `setTheme` 函数实现深色和浅色主题的切换。

## 使用方法

```tsx
import Navbar from '@/components/navbar/Navbar'
import navConfig from '@/components/navbar/navConfig'

// 在应用布局中使用
<Navbar navItems={navConfig} />
```

组件接受 `navItems` 数组作为主要输入，该数组定义了导航栏的结构和内容。

## 最佳实践

1. **导航配置分离**：将导航项配置放在单独的 `navConfig.ts` 文件中，便于维护和更新
2. **客户端渲染**：在布局组件中使用 `dynamic import` 加载导航组件，避免服务端渲染导致的水合错误
3. **链接处理**：使用 Next.js 的 `Link` 组件处理内部导航，确保客户端路由正常工作
4. **无障碍设计**：提供合适的 ARIA 属性，确保导航可访问性

## 后续优化方向

1. 增加导航项徽章显示功能
2. 支持更复杂的子菜单展开逻辑
3. 添加导航项权限控制机制
4. 实现更平滑的动画过渡效果
