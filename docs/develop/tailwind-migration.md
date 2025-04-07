# 迁移到 Tailwind CSS - 简易指南

## 目录

- [为什么选择 Tailwind CSS](#为什么选择-tailwind-css)
- [我们做了什么改动](#我们做了什么改动)
- [如何使用 Tailwind CSS](#如何使用-tailwind-css)
  - [基本用法](#基本用法)
  - [条件样式](#条件样式)
  - [响应式设计](#响应式设计)
  - [深色模式](#深色模式)
- [最佳实践](#最佳实践)
- [CSS Modules 和 Tailwind CSS 对比](#css-modules-和-tailwind-css-对比)
- [进一步学习](#进一步学习)

## 为什么选择 Tailwind CSS

我们将项目从传统 CSS 和 CSS Modules 转换到了 Tailwind CSS，主要有这些好处：

1. **写代码更快** - 直接在 HTML/JSX 中添加类名，不用在多个文件间来回切换
2. **风格统一** - 所有组件使用同一套设计系统，保持一致的外观
3. **文件更小** - Tailwind 会自动删除未使用的 CSS，减小打包体积
4. **响应式更简单** - 使用 `sm:`、`md:`、`lg:` 这样的前缀轻松实现适配不同屏幕
5. **深色模式更容易** - 只需添加 `dark:` 前缀即可支持深色模式

![Tailwind CSS 工作流程](https://example.com/tailwind-workflow.png)

## 我们做了什么改动

### 已完成的改动

- ✅ 将 ChatAI 卡片组件从 CSS Modules 转换为 Tailwind 类名
- ✅ 导航栏和布局组件已使用 Tailwind CSS
- ✅ 删除了 `ChatAICard.module.css` 文件
- ✅ 简化了全局 CSS 文件
- ✅ 为图标组件添加了 Tailwind 类名

### 新增的配置

```javascript
// tailwind.config.js 主要改动
module.exports = {
  darkMode: 'class', // 使用类名控制深色模式
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#1890ff' // 主色调
          // ...其他色阶
        }
      }
      // 添加了动画效果
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
```

## 如何使用 Tailwind CSS

### 基本用法

通过类名直接应用样式：

```jsx
<!-- 旧方式 -->
<div className={styles.card}>标题</div>

<!-- 新方式 -->
<div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">标题</div>
```

> 💡 **提示**: 可以使用 VS Code 的 Tailwind CSS 插件获得类名自动完成功能

### 条件样式

根据状态添加不同样式：

```jsx
<button
  className={`
  px-4 py-2 rounded-md 
  ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}
`}
>
  点击我
</button>
```

### 响应式设计

不同屏幕尺寸下应用不同样式：

```jsx
<div
  className="
  w-full        <!-- 手机端占满宽度 -->
  md:w-1/2      <!-- 平板占一半宽度 -->
  lg:w-1/3      <!-- 桌面占三分之一宽度 -->
"
>
  卡片内容
</div>
```

📱 **响应式断点**:

| 前缀  | 最小宽度 | 典型设备     |
| ----- | -------- | ------------ |
| (无)  | 0px      | 手机（竖屏） |
| `sm:` | 640px    | 手机（横屏） |
| `md:` | 768px    | 平板         |
| `lg:` | 1024px   | 小桌面       |
| `xl:` | 1280px   | 大桌面       |

### 深色模式

轻松添加深色模式支持：

```jsx
<div
  className="
  bg-white text-black       <!-- 亮色模式 -->
  dark:bg-gray-800 dark:text-white  <!-- 深色模式 -->
"
>
  自动适应亮色/深色模式
</div>
```

## 最佳实践

1. **类名分组排序**

   ```jsx
   <div className="
     flex items-center           <!-- 布局 -->
     p-4 mb-2                    <!-- 间距 -->
     bg-white text-gray-800      <!-- 颜色 -->
     rounded-lg shadow-md        <!-- 边框/效果 -->
     hover:shadow-lg             <!-- 交互状态 -->
   ">
   ```

2. **使用 clsx/classnames 处理复杂条件**

   ```jsx
   import clsx from 'clsx';

   <div className={clsx(
     'px-4 py-2 rounded',
     isActive && 'bg-blue-500 text-white',
     isDisabled && 'opacity-50 cursor-not-allowed',
     size === 'large' ? 'text-lg' : 'text-sm'
   )}>
   ```

3. **提取常用组合为组件**

   当某个样式组合经常重复使用时，考虑创建专门的组件：

   ```jsx
   // 而不是重复使用一堆类名
   function Card({ children }) {
     return <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">{children}</div>
   }
   ```

## CSS Modules 和 Tailwind CSS 对比

下面是两种方案的简单对比：

| 特性       | CSS Modules          | Tailwind CSS           |
| ---------- | -------------------- | ---------------------- |
| 样式位置   | 单独的 CSS 文件      | 直接在 HTML/JSX 中     |
| 学习难度   | 低（普通 CSS）       | 中（需要学习类名）     |
| 开发速度   | 较慢（需要切换文件） | 快（直接在模板中修改） |
| 样式隔离   | 自动                 | 需要手动组织           |
| 文件大小   | 较大                 | 优化后更小             |
| 代码可读性 | 较好                 | 长类名可能降低可读性   |
| 团队协作   | 需要命名约定         | 标准化类名系统         |

## 进一步学习

- 📚 [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- 🔍 [Tailwind CSS 备忘表](https://nerdcave.com/tailwind-cheat-sheet)
- 🧩 [Tailwind UI 组件库](https://tailwindui.com/components)
- 🎨 [Tailwind CSS 颜色生成器](https://tailwindcolorgenerator.com/)

---

有疑问？请联系项目前端负责人或在团队 Slack 频道提问！
