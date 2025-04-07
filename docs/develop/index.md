# Chat-AI-Nav 项目框架文档

## 技术栈

### 前端

- **Next.js**: React框架，支持SSR和静态生成
- **TypeScript**: 类型安全的JavaScript超集
- **TailwindCSS**: 原子化CSS框架
- **next-themes**: 主题切换支持
- **next-i18next**: 国际化支持

### 后端

- **Express**: Node.js Web应用框架
- **MongoDB**: 文档型数据库
- **Mongoose**: MongoDB对象模型工具

## 目录结构

```
/
├── src/
│   ├── app/                 # Next.js 13+ App Router
│   │   ├── [locale]/        # 国际化路由
│   │   ├── api/            # API路由
│   │   └── layout.tsx      # 根布局
│   ├── components/         # React组件
│   │   ├── common/         # 通用组件
│   │   ├── layout/         # 布局组件
│   │   └── modules/        # 业务模块组件
│   ├── lib/               # 工具函数和配置
│   │   ├── db/            # 数据库配置
│   │   └── utils/         # 通用工具函数
│   ├── models/            # MongoDB模型
│   ├── types/             # TypeScript类型定义
│   └── styles/            # 全局样式
├── public/                # 静态资源
│   ├── images/           # 图片资源
│   └── locales/          # 国际化文件
└── config/               # 项目配置文件

```

## 开发规范

### 代码风格

- 使用ESLint和Prettier进行代码格式化
- 遵循TypeScript严格模式
- 组件采用函数式编程，使用React Hooks

### 命名规范

- 文件名：PascalCase用于组件，camelCase用于工具函数
- 组件名：使用PascalCase
- 变量和函数：使用camelCase
- 常量：使用UPPER_SNAKE_CASE

### Git提交规范

提交信息格式：

```
<type>(<scope>): <subject>

<body>
```

类型(type)：

- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

### API规范

- RESTful API设计
- 使用JWT进行身份验证
- 统一的错误处理和响应格式

### 数据库模型

```typescript
// Tool模型
interface Tool {
  id: string
  name: string
  description: string
  category: {
    level1: string
    level2?: string
    tags: string[]
  }
  icon: string
  url: string
  rating: number
  updateTime: Date
}

// User模型
interface User {
  id: string
  email: string
  username: string
  prefLanguage: string
  collections: string[]
  createdAt: Date
  updatedAt: Date
}
```

## 性能优化

### 前端优化

- 图片懒加载和优化
- 组件代码分割
- 静态页面生成(SSG)
- 缓存策略

### 后端优化

- 数据库索引优化
- API响应缓存
- 并发请求处理

## 部署流程

1. 构建步骤

```bash
# 安装依赖
npm install

# 构建前端
npm run build

# 启动服务
npm start
```

2. 环境变量配置

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=your_api_url
JWT_SECRET=your_jwt_secret
```

## 扩展性考虑

1. 模块化设计，便于功能扩展
2. 国际化支持架构
3. 主题系统可配置
4. API版本控制
5. 插件系统预留接口

## 测试策略

1. 单元测试：Jest
2. 组件测试：React Testing Library
3. E2E测试：Cypress
4. API测试：Supertest

## 监控和日志

1. 错误监控
2. 性能监控
3. 用户行为分析
4. 服务器状态监控

## 安全措施

1. XSS防护
2. CSRF防护
3. 数据加密
4. 请求限流
5. 输入验证
