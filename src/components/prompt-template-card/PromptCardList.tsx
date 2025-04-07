import React from 'react'
import PromptCard, { PromptTemplate } from './PromptCard'

interface PromptCardListProps {
  templates: PromptTemplate[]
  variant?: 'standard' | 'simple' | 'detail' | 'workshop'
  layout?: 'grid' | 'list'
  columns?: number
  onCardClick?: (id: string) => void
  onFavorite?: (id: string, isFavorite: boolean) => void
  onCopy?: (content: string) => void
  onApply?: (template: PromptTemplate) => void
  emptyText?: string
  loading?: boolean
}

const PromptCardList: React.FC<PromptCardListProps> = ({
  templates,
  variant = 'standard',
  layout = 'grid',
  columns = 3,
  onCardClick,
  onFavorite,
  onCopy,
  onApply,
  emptyText = '暂无提示词模板',
  loading = false
}) => {
  // 根据列数生成网格类名
  const getGridClassName = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-1 sm:grid-cols-2'
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      case 5:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
      case 3:
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }
  }

  // 加载状态骨架屏
  if (loading) {
    return (
      <div className={`grid ${getGridClassName()} gap-4`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 min-h-[200px] animate-pulse"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 mr-3"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-5/6"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // 空状态
  if (templates.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">{emptyText}</p>
      </div>
    )
  }

  // 列表布局
  if (layout === 'list') {
    return (
      <div className="flex flex-col space-y-4">
        {templates.map((template) => (
          <PromptCard
            key={template.id}
            data={template}
            variant={variant}
            onClick={onCardClick}
            onFavorite={onFavorite}
            onCopy={onCopy}
            onApply={onApply}
            className="w-full"
          />
        ))}
      </div>
    )
  }

  // 网格布局
  return (
    <div className={`grid ${getGridClassName()} gap-4`}>
      {templates.map((template) => (
        <PromptCard
          key={template.id}
          data={template}
          variant={variant}
          onClick={onCardClick}
          onFavorite={onFavorite}
          onCopy={onCopy}
          onApply={onApply}
        />
      ))}
    </div>
  )
}

export default PromptCardList
