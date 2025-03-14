# ChatAI 通用数据模型设计文档

## 1. 数据模型概述

为了确保平台上 AI 工具信息的一致性和可维护性，我们设计了一个统一的数据模型体系。该体系包含基础模型和扩展模型，支持从卡片展示到详情页面的全流程数据需求。

## 2. 模型层级结构

### 基础数据模型 (BaseChatAIModel)

基础模型包含所有组件共用的核心属性，是最小完整表示一个AI工具的数据集合。

| 属性      | 说明             | 是否必需 | 数据类型                        |
| --------- | ---------------- | -------- | ------------------------------- |
| id        | AI工具唯一标识符 | 是       | String                          |
| name      | AI工具名称       | 是       | String                          |
| logo_path | Logo图片路径     | 是       | String                          |
| desc      | 简短描述         | 是       | String                          |
| tags      | 标签数组         | 是       | Array<String>                   |
| ai_url    | AI工具官方链接   | 是       | String                          |
| company   | 开发公司信息     | 否       | {name: String, website: String} |

### 卡片数据模型 (CardChatAIModel)

卡片模型扩展自基础模型，添加卡片展示特有的属性。

| 属性       | 说明       | 是否必需 | 数据类型 |
| ---------- | ---------- | -------- | -------- |
| hotness    | 热度值     | 否       | Number   |
| isFavorite | 是否已收藏 | 否       | Boolean  |

### 详情数据模型 (DetailChatAIModel)

详情模型提供完整的AI工具信息，包含丰富的属性用于详细展示。

| 属性             | 说明           | 是否必需 | 数据类型                                                            |
| ---------------- | -------------- | -------- | ------------------------------------------------------------------- |
| full_description | 完整功能描述   | 是       | String                                                              |
| features         | 功能特点集合   | 是       | Object（作为tags的超集，包含更详细的功能描述）                      |
| screenshots      | 截图画廊       | 否       | Array<{url: String, caption: String}>                               |
| video_demo       | 演示视频链接   | 否       | String                                                              |
| company.founded  | 公司成立日期   | 否       | String                                                              |
| pricing          | 价格信息       | 否       | Array<{type: String, cost: {price: Number, currency_type: String}}> |
| release_date     | 发布日期       | 否       | Date                                                                |
| last_update      | 最近更新日期   | 否       | Date                                                                |
| rating           | 用户评分       | 否       | {score: Number, count: Number}                                      |
| reviews          | 用户评论       | 否       | Array<{user: String, date: Date, content: String, rating: Number}>  |
| alternatives     | 替代工具       | 否       | Array<{id: String, name: String, similarity: Number}>               |
| prompt_templates | 推荐提示词模板 | 否       | Array<{id: String, name: String, desc: String, content: String}>    |

## 3. 数据转换和处理

### 模型转换方法

```typescript
// TypeScript接口定义
interface BaseChatAIModel {
  id: string
  name: string
  logo_path: string
  desc: string
  tags: string[]
  ai_url: string
  company?: {
    name: string
    website?: string
  }
}

interface CardChatAIModel extends BaseChatAIModel {
  hotness?: number
  isFavorite?: boolean
}

interface DetailChatAIModel extends BaseChatAIModel {
  full_description: string
  features: Record<string, any>
  screenshots?: Array<{ url: string; caption: string }>
  video_demo?: string
  company: {
    name: string
    website?: string
    founded?: string
  }
  pricing?: Array<{
    type: string
    cost: {
      price: number
      currency_type: string
    }
  }>
  release_date?: Date
  last_update?: Date
  rating?: {
    score: number
    count: number
  }
  reviews?: Array<{
    user: string
    date: Date
    content: string
    rating: number
  }>
  alternatives?: Array<{
    id: string
    name: string
    similarity: number
  }>
  prompt_templates?: Array<{
    id: string
    name: string
    desc: string
    content: string
  }>
}

// 从详情模型转换为卡片模型
function toCardModel(detailModel: DetailChatAIModel): CardChatAIModel {
  return {
    id: detailModel.id,
    name: detailModel.name,
    logo_path: detailModel.logo_path,
    desc: detailModel.desc,
    tags: detailModel.tags,
    ai_url: detailModel.ai_url,
    company: {
      name: detailModel.company.name,
      website: detailModel.company.website
    },
    // 可选属性
    hotness: detailModel.rating?.score
  }
}
```

## 4. 最佳实践

### 数据获取策略

1. **预加载基础数据**：在列表页面加载时仅获取所有工具的基础数据模型
2. **按需加载详情数据**：当用户查看特定工具详情时才请求完整数据模型
3. **数据缓存**：将已获取的详情数据缓存到本地，避免重复请求

### 数据一致性保证

为确保卡片和详情展示的信息一致：

1. 使用相同的数据源
2. 维护统一的数据更新流程
3. 实现监听机制，当详情数据更新时同步更新卡片数据

### 数据扩展建议

当需要添加新属性时：

1. 先评估该属性是基础属性还是仅在特定组件中使用
2. 基础属性应添加到BaseChatAIModel中
3. 组件专属属性添加到相应的扩展模型中

## 5. 版本控制

数据模型应遵循语义化版本控制规范：

- **主版本**：不兼容的API修改（删除或重命名核心属性）
- **次版本**：向后兼容的功能性新增（新增可选属性）
- **修订版本**：向后兼容的问题修复（数据类型优化、描述更新）

当前数据模型版本：v1.0.0
