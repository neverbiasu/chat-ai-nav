import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { HeartIcon, HeartFilledIcon, CopyIcon, CheckIcon } from './Icons'
import { Icon } from '@iconify/react'

// 基础类型定义
export interface PlaceholderPosition {
  name: string
  start: number
  end: number
}

export interface Creator {
  name: string
  avatar: string
}

export interface PromptTemplate {
  id: string
  name: string
  logo_path?: string // 保留旧的路径选项
  icon?: string // 新增Iconify图标名称
  icon_color?: string // 新增图标颜色
  desc: string
  content: string
  tags: string[]
  placeholder_pos?: PlaceholderPosition[]
  isPublic: boolean
  isFavorite?: boolean
  creator?: Creator
  usage_count?: number
  rating?: number
  compatible_models?: string[]
}

export interface PromptCardProps {
  data: PromptTemplate
  variant?: 'standard' | 'simple' | 'detail' | 'workshop'
  onClick?: (id: string) => void
  onFavorite?: (id: string, isFavorite: boolean) => void
  onCopy?: (content: string) => void
  onApply?: (template: PromptTemplate) => void
  className?: string
}

const PromptCard: React.FC<PromptCardProps> = ({
  data,
  variant = 'standard',
  onClick,
  onFavorite,
  onCopy,
  onApply,
  className = ''
}) => {
  const { id, name, logo_path, content, desc, tags, isFavorite: initialFavorite = false } = data

  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [imageError, setImageError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 处理组件挂载
  useEffect(() => {
    setMounted(true)

    // 从localStorage读取收藏状态
    if (typeof window !== 'undefined') {
      try {
        const favorites = JSON.parse(localStorage.getItem('prompt_favorites') || '{}')
        setIsFavorite(!!favorites[id])
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error)
      }
    }
  }, [id])

  // 更新收藏状态
  useEffect(() => {
    setIsFavorite(initialFavorite)
  }, [initialFavorite])

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newFavoriteState = !isFavorite
    setIsFavorite(newFavoriteState)

    if (onFavorite) {
      onFavorite(id, newFavoriteState)
    }

    // 保存到localStorage
    if (typeof window !== 'undefined') {
      try {
        const favorites = JSON.parse(localStorage.getItem('prompt_favorites') || '{}')
        if (newFavoriteState) {
          favorites[id] = true
        } else {
          delete favorites[id]
        }
        localStorage.setItem('prompt_favorites', JSON.stringify(favorites))
      } catch (error) {
        console.error('Failed to update favorites in localStorage', error)
      }
    }
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick(id)
    }
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (onCopy) {
      onCopy(content)
    } else {
      // 默认复制行为
      navigator.clipboard
        .writeText(content)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch((err) => {
          console.error('Failed to copy: ', err)
        })
    }
  }

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onApply) {
      onApply(data)
    }
  }

  const handleImageError = () => {
    console.warn(`Image failed to load: ${logo_path}`)
    setImageError(true)
  }

  const renderLogo = () => {
    if (data.icon) {
      // 使用Iconify图标
      return (
        <div
          className={`w-full h-full flex items-center justify-center ${data.icon_color ? '' : 'text-blue-500 dark:text-blue-300'}`}
        >
          <Icon icon={data.icon} className="w-full h-full" style={data.icon_color ? { color: data.icon_color } : {}} />
        </div>
      )
    } else if (data.logo_path && !imageError) {
      // 使用图片
      return (
        <Image
          src={data.logo_path}
          alt={`${name} logo`}
          width={40}
          height={40}
          className="w-full h-full object-contain"
          onError={handleImageError}
        />
      )
    } else {
      // 默认显示首字母
      return (
        <div className="w-full h-full flex items-center justify-center font-bold text-xl text-blue-500 bg-blue-50 dark:bg-blue-900 dark:text-blue-300">
          {name.charAt(0)}
        </div>
      )
    }
  }

  // 根据变体确定卡片高度
  const getCardHeightClass = () => {
    switch (variant) {
      case 'simple':
        return 'h-[140px]'
      case 'detail':
        return 'min-h-[220px]'
      case 'workshop':
        return 'min-h-[240px]'
      default:
        return 'min-h-[200px]'
    }
  }

  const renderCardContent = () => {
    return (
      <>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 min-w-10 mr-3 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              {renderLogo()}
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white line-clamp-1">{name}</h3>
              {data.creator && variant !== 'simple' && (
                <p className="text-xs text-gray-500 dark:text-gray-400">{data.creator.name}</p>
              )}
            </div>
          </div>
          <button
            className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-red-500 p-1 flex items-center justify-center"
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? '移除收藏' : '添加收藏'}
          >
            <span className="w-5 h-5">{isFavorite ? <HeartFilledIcon /> : <HeartIcon />}</span>
          </button>
        </div>

        <div className="flex-1 mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{desc}</p>
        </div>

        {variant !== 'simple' && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 mb-3 max-h-20 overflow-hidden text-xs text-gray-700 dark:text-gray-300 font-mono">
            <p className="line-clamp-3">{content}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, variant === 'detail' || variant === 'workshop' ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded transition-colors"
            >
              <span className="w-4 h-4 mr-1">{copied ? <CheckIcon /> : <CopyIcon />}</span>
              {copied ? '已复制' : '复制'}
            </button>
            {(variant === 'detail' || variant === 'workshop') && (
              <button
                onClick={handleApply}
                className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
              >
                应用
              </button>
            )}
          </div>
        </div>
      </>
    )
  }

  // 加载状态骨架屏
  if (!mounted) {
    return (
      <div
        className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 w-full ${getCardHeightClass()} animate-pulse`}
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
        {variant !== 'simple' && <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>}
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 p-4 w-full ${getCardHeightClass()} flex flex-col transition-all duration-300 cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      {renderCardContent()}
    </div>
  )
}

export default PromptCard
