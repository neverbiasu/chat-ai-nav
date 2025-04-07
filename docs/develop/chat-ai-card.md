# ChatAI 卡片组件

## 组件概述

ChatAICard 是展示 AI 工具基本信息的卡片组件，支持多种展示样式和交互功能。该组件设计为整个平台的基础展示单元，用于在各个页面中统一展示 AI 工具的基本信息。

## 功能特性

- 多种展示变体：标准卡片、简洁卡片、详情卡片
- 收藏功能，支持本地存储
- 外部链接跳转
- 图片加载错误处理
- 标签展示
- 热度展示（详情卡片）
- 响应式设计

## 技术实现

### 核心依赖

- React 18+
- Next.js 14+ (Image 组件)
- Tailwind CSS (样式框架)
- localStorage API (收藏功能)

### 组件接口

```tsx
export interface ChatAICardProps {
  id: string // AI工具唯一标识符
  name: string // AI工具名称
  logo_path: string // Logo图片路径
  desc: string // 简短描述
  tags: string[] // 标签数组
  url: string // 跳转链接
  company?: string // 公司名称（可选）
  hotness?: number // 热度值（可选）
  isFavorite?: boolean // 是否已收藏（可选）
  variant?: 'standard' | 'simple' | 'detailed' // 卡片变体
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void // 收藏状态变更回调
}
```

### 状态管理

组件内部管理以下状态：

1. `isFavorite`: 当前收藏状态
2. `imageError`: 图片加载是否出错

### 关键实现细节

#### 1. 收藏功能实现

```tsx
const handleFavoriteClick = (e: React.MouseEvent) => {
  e.stopPropagation()
  const newFavoriteState = !isFavorite
  setIsFavorite(newFavoriteState)

  if (onFavoriteToggle) {
    onFavoriteToggle(id, newFavoriteState)
  }

  // 保存收藏状态到本地存储
  const favorites = JSON.parse(localStorage.getItem('favorites') || '{}')
  if (newFavoriteState) {
    favorites[id] = true
  } else {
    delete favorites[id]
  }
  localStorage.setItem('favorites', JSON.stringify(favorites))
}
```

收藏功能使用 localStorage 持久化保存用户的收藏状态，同时通过回调函数允许父组件感知状态变化。

#### 2. 图片错误处理

```tsx
const handleImageError = () => {
  setImageError(true)
}

// 在渲染中使用
{
  !imageError ? (
    <Image
      src={logo_path}
      alt={`${name} logo`}
      width={50}
      height={50}
      className="w-full h-full object-contain"
      onError={handleImageError}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center font-bold text-xl text-blue-500 bg-blue-50 dark:bg-blue-900 dark:text-blue-300">
      {name.charAt(0)}
    </div>
  )
}
```

当图片加载失败时，组件会显示一个带有首字母的占位符，确保 UI 的完整性。

#### 3. 条件渲染不同变体

```tsx
const renderCardContent = () => {
  if (variant === 'simple') {
    // 简洁卡片渲染逻辑
    return (/* ... */);
  }

  // 标准和详情卡片共享的基础渲染逻辑
  return (/* ... */);
}
```

通过 `variant` 属性和条件渲染，组件能够适应不同的展示需求。

#### 4. 使用 Tailwind 实现响应式设计

```tsx
// 根据变体决定卡片高度类名
const getCardHeightClasses = () => {
  switch (variant) {
    case 'simple':
      return 'h-[120px] sm:h-[120px]'
    case 'detailed':
      return 'min-h-[200px] sm:min-h-[180px]'
    default:
      return 'min-h-[160px] sm:min-h-[140px]'
  }
}
```

使用 Tailwind 的响应式工具类和动态类名生成，实现不同屏幕尺寸下的最佳展示效果。

## 使用方法

### 基本用法

```tsx
import ChatAICard from '@/components/chat-ai-card/ChatAICard'

// 基础用法
<ChatAICard
  id="chatgpt"
  name="ChatGPT"
  logo_path="/images/chatgpt-logo.png"
  desc="OpenAI开发的大型语言模型，支持自然对话和内容创作"
  tags={["对话", "写作", "翻译"]}
  url="https://chat.openai.com"
/>

// 详情卡片变体
<ChatAICard
  id="gemini"
  name="Gemini"
  logo_path="/images/gemini-logo.png"
  desc="Google最新多模态AI模型，支持文本、图像、视频理解"
  tags={["多模态", "搜索", "分析"]}
  url="https://gemini.google.com"
  company="Google"
  hotness={94}
  variant="detailed"
  onFavoriteToggle={(id, isFav) => console.log(`${id} is now ${isFav ? 'favorited' : 'unfavorited'}`)}
/>
```

### 卡片演示页面

可以参考 `/app/card-demo/page.tsx` 中的完整演示实现，该页面展示了不同变体的卡片以及交互功能。

## 最佳实践

1. **图片优化**：使用 Next.js 的 Image 组件进行图片优化和加载
2. **错误处理**：为图片加载失败提供备用方案
3. **事件传播控制**：使用 `e.stopPropagation()` 防止事件冒泡导致的意外行为
4. **交互反馈**：为用户操作提供明确的视觉反馈
5. **数据持久化**：使用 localStorage 保存用户偏好，提升用户体验

## 主题适配

卡片组件通过 Tailwind 的深色模式类名实现了深色主题适配：

```tsx
<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">{/* 卡片内容 */}</div>
```

通过使用 `dark:` 前缀，组件能够在深色模式下自动切换到适合的颜色，与整个应用的主题系统保持一致。

## 响应式设计

组件使用 Tailwind 的响应式前缀（如 `sm:`、`md:`、`lg:`）确保在各种设备上的最佳展示效果。比如：

```tsx
<div className="min-h-[160px] sm:min-h-[140px] md:min-h-[160px]">{/* 卡片内容 */}</div>
```

这使得卡片能够根据屏幕尺寸自动调整其高度和布局。

## 后续优化方向

1. 添加卡片骨架屏加载状态
2. 实现卡片拖拽功能
3. 增强卡片的可访问性支持
4. 添加卡片分享功能
5. 实现更丰富的交互动画效果
