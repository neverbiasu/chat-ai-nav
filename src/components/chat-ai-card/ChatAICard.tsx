import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { HeartIcon, HeartFilledIcon } from '@/components/chat-ai-card/Icons'

export interface ChatAICardProps {
  id: string
  name: string
  logo_path: string
  desc: string
  tags: string[]
  url: string
  company?: string
  hotness?: number
  isFavorite?: boolean
  variant?: 'standard' | 'simple' | 'detailed'
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void
}

const ChatAICard: React.FC<ChatAICardProps> = ({
  id,
  name,
  logo_path,
  desc,
  tags,
  url,
  company,
  hotness,
  isFavorite: initialFavorite = false,
  variant = 'standard',
  onFavoriteToggle
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [imageError, setImageError] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 添加挂载检查
  useEffect(() => {
    setMounted(true)

    // 在组件挂载后从 localStorage 获取收藏状态
    if (typeof window !== 'undefined') {
      try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '{}')
        setIsFavorite(!!favorites[id])
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error)
      }
    }
  }, [id])

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newFavoriteState = !isFavorite
    setIsFavorite(newFavoriteState)

    if (onFavoriteToggle) {
      onFavoriteToggle(id, newFavoriteState)
    }

    // 确保仅在客户端访问 localStorage
    if (typeof window !== 'undefined') {
      try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '{}')
        if (newFavoriteState) {
          favorites[id] = true
        } else {
          delete favorites[id]
        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
      } catch (error) {
        console.error('Failed to update favorites in localStorage', error)
      }
    }
  }

  const handleCardClick = () => {
    // 这里可以实现详情弹窗逻辑
    console.log(`Showing details for ${name}`)
  }

  const handleImageError = () => {
    setImageError(true)
  }

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

  // 根据变体决定要渲染的内容
  const renderCardContent = () => {
    if (variant === 'simple') {
      return (
        <>
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 min-w-10 mr-3 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              {!imageError ? (
                <Image
                  src={logo_path}
                  alt={`${name} logo`}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-xl text-blue-500 bg-blue-50 dark:bg-blue-900 dark:text-blue-300">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <h3 className="m-0 text-base font-semibold text-gray-800 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
              {name}
            </h3>
            <button
              className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-red-500 p-1 ml-auto flex items-center justify-center"
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <span className="w-5 h-5">{isFavorite ? <HeartFilledIcon /> : <HeartIcon />}</span>
            </button>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            访问
          </a>
        </>
      )
    }

    return (
      <>
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 min-w-12 mr-3 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            {!imageError ? (
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
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="m-0 text-base font-semibold text-gray-800 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
              {name}
            </h3>
            {company && <p className="m-0 text-xs text-gray-500 dark:text-gray-400">{company}</p>}
          </div>
          <button
            className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-red-500 p-1 ml-auto flex items-center justify-center"
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <span className="w-5 h-5">{isFavorite ? <HeartFilledIcon /> : <HeartIcon />}</span>
          </button>
        </div>

        <div className="flex-1 mb-3">
          <p className="m-0 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{desc}</p>
        </div>

        {variant === 'detailed' && hotness !== undefined && (
          <div className="mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">热度: {hotness}</span>
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-sm overflow-hidden mt-1">
              <div className="h-full bg-blue-500 rounded-sm" style={{ width: `${hotness}%` }} />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, variant === 'detailed' ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors whitespace-nowrap"
            onClick={(e) => e.stopPropagation()}
          >
            访问
          </a>
        </div>
      </>
    )
  }

  // 如果尚未挂载，可以返回一个加载占位符
  if (!mounted) {
    return (
      <div
        className={`relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 w-full ${getCardHeightClasses()} flex flex-col`}
      >
        <div className="animate-pulse">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 mr-3"></div>
            <div className="flex-1">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-5/6"></div>
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 p-4 w-full ${getCardHeightClasses()} flex flex-col transition-all duration-300 cursor-pointer`}
      onClick={handleCardClick}
    >
      {renderCardContent()}
    </div>
  )
}

export default ChatAICard
