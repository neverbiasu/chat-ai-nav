# 提示词卡片组件开发文档

## 模块概述

提示词卡片组件（PromptCard）是展示提示词模板的基础UI组件，用于在提示词工坊和控制台中统一呈现提示词模板信息。

## 接口定义

### 核心类型

```typescript
// 提示词模板类型
interface PromptTemplate {
  id: string;                   // 唯一标识符
  name: string;                 // 名称
  logo_path: string;            // 图标路径
  content: string;              // 提示词内容
  desc: string;                 // 简短描述
  tags: string[];               // 标签数组
  placeholder_pos?: PlaceholderPosition[]; // 占位符位置
  isPublic: boolean;            // 是否公开
  isFavorite?: boolean;         // 是否已收藏
  creator?: Creator;            // 创作者信息
  usage_count?: number;         // 使用次数
  rating?: number;              // 评分
  compatible_models?: string[]; // 兼容模型列表
}

// 占位符位置
interface PlaceholderPosition {
  name: string;    // 占位符名称
  start: number;   // 起始位置
  end: number;     // 结束位置
}

// 卡片变体
type PromptCardVariant = 'standard' | 'simple' | 'detail' | 'workshop';

// 组件属性
interface PromptCardProps {
  data: PromptTemplate;          // 提示词模板数据
  variant?: PromptCardVariant;   // 卡片变体类型
  onClick?: (id: string) => void;// 点击回调
  onFavorite?: (id: string, isFavorite: boolean) => void; // 收藏回调
  onCopy?: (content: string) => void;  // 复制回调
  className?: string;           // 自定义CSS类名，用于外部样式定制
}
```

### 核心组件和函数

```typescript
// 卡片组件
function PromptCard(props: PromptCardProps): React.ReactElement;

// 卡片列表组件
function PromptCardList(props: {
  templates: PromptTemplate[];
  variant?: PromptCardVariant;
  layout?: 'grid' | 'list';
  columns?: number;
  onCardClick?: (id: string) => void;
  onFavorite?: (id: string, isFavorite: boolean) => void;
  onCopy?: (content: string) => void;
  emptyText?: string;
  loading?: boolean;
}): React.ReactElement;

// 详情弹窗组件
function PromptDetailModal(props: {
  visible: boolean;
  template: PromptTemplate | null;
  onClose: () => void;
  onFavorite?: (id: string, isFavorite: boolean) => void;
  onCopy?: (content: string) => void;
  onApply?: (template: PromptTemplate) => void;
  onEdit?: (template: PromptTemplate) => void;
}): React.ReactElement;

// 工具函数
function copyPromptContent(content: string): Promise<boolean>;
function replacePromptPlaceholders(template: PromptTemplate, replacements: Record<string, string>): string;
function checkModelCompatibility(template: PromptTemplate, modelId: string): boolean;
```

## 调用示例

### 基础卡片使用

```tsx
// 单个卡片使用
<PromptCard
  data={template}
  variant="standard"
  onFavorite={(id, isFav) => handleFavorite(id, isFav)}
  onCopy={(content) => copyToClipboard(content)}
  onClick={(id) => showDetail(id)}
/>

// 卡片列表使用
<PromptCardList
  templates={templates}
  variant="standard"
  layout="grid"
  columns={3}
  onCardClick={handleCardClick}
  onFavorite={handleFavorite}
  onCopy={handleCopy}
  loading={isLoading}
/>

// 详情弹窗使用
<PromptDetailModal
  visible={detailVisible}
  template={currentTemplate}
  onClose={() => setDetailVisible(false)}
  onFavorite={handleFavorite}
  onCopy={handleCopy}
  onApply={handleApply}
/>
```

### 与其他模块集成示例

```tsx
// 与提示词工坊集成
function PromptWorkshopPage() {
  const { templates, favoriteTemplate, applyTemplate } = usePromptWorkshop();

  return (
    <PromptCardList
      templates={templates}
      onCardClick={showDetail}
      onFavorite={favoriteTemplate}
    />
  );
}

// 与AI对话集成
function ChatSuggestions() {
  const { suggestedPrompts, applyPromptToChat } = useChatContext();

  return (
    <div className="suggestions">
      {suggestedPrompts.map(prompt => (
        <PromptCard
          key={prompt.id}
          data={prompt}
          variant="simple"
          onApply={() => applyPromptToChat(prompt.content)}
        />
      ))}
    </div>
  );
}
```
