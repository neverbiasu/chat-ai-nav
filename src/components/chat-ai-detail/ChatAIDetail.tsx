'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { HeartIcon, HeartFilledIcon } from '@/components/chat-ai-card/Icons'
import { StarIcon } from '@/components/chat-ai-detail/Icons'

export interface ChatAIDetailProps {
  isOpen: boolean
  onClose: () => void
  id: string
  name: string
  logo_path: string
  desc: string
  full_description?: string
  tags: string[]
  url: string
  company?: {
    name: string
    website: string
  }
  features?: string[]
  screenshots?: string[]
  pricing?: {
    free_tier: boolean
    has_trial: boolean
    starting_price?: string
  }
  rating?: {
    score: number
    count: number
  }
  isFavorite?: boolean
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void
  alternatives?: string[]
}

const ChatAIDetail: React.FC<ChatAIDetailProps> = ({
  isOpen,
  onClose,
  id,
  name,
  logo_path,
  desc,
  full_description,
  tags,
  url,
  company,
  features,
  screenshots,
  pricing,
  rating,
  isFavorite: initialFavorite = false,
  onFavoriteToggle,
  alternatives
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [imageError, setImageError] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing'>('overview')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsFavorite(initialFavorite)

    // 当模态框打开时禁用背景滚动
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    // 组件卸载时恢复背景滚动
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, initialFavorite])

  const handleImageError = () => {
    setImageError(true)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newFavoriteState = !isFavorite
    setIsFavorite(newFavoriteState)

    if (onFavoriteToggle) {
      onFavoriteToggle(id, newFavoriteState)
    }

    // 保存收藏状态到本地存储
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

  if (!isOpen || !mounted) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div
          className="relative bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 头部 */}
          <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 min-w-12 mr-4 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
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
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h2>
                {company && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {company.name}
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleFavoriteClick}
                className="p-2 rounded-md text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 focus:outline-none"
                aria-label={isFavorite ? '取消收藏' : '收藏'}
              >
                <span className="w-6 h-6 block">{isFavorite ? <HeartFilledIcon /> : <HeartIcon />}</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none ml-2"
                aria-label="关闭"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* 标签页导航 */}
          <div className="border-b dark:border-gray-700">
            <nav className="flex px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-4 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                概述
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-3 px-4 text-sm font-medium ${
                  activeTab === 'features'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                功能特性
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`py-3 px-4 text-sm font-medium ${
                  activeTab === 'pricing'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                价格计划
              </button>
            </nav>
          </div>

          {/* 内容区域 */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{full_description || desc}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {rating && (
                    <div className="ml-4 text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">{rating.score.toFixed(1)}</div>
                      <div className="flex items-center justify-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.round(rating.score) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{rating.count} 评价</div>
                    </div>
                  )}
                </div>

                {screenshots && screenshots.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">截图</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {screenshots.map((screenshot, index) => (
                        <div
                          key={index}
                          className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative"
                        >
                          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                            截图 {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {alternatives && alternatives.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">相似工具</h3>
                    <div className="flex flex-wrap gap-2">
                      {alternatives.map((alt) => (
                        <span
                          key={alt}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                        >
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">主要功能特性</h3>
                <ul className="space-y-3">
                  {features &&
                    features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-blue-500 mt-0.5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">价格计划</h3>

                {pricing ? (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">免费版：</span>
                          <span className="text-gray-700 dark:text-gray-300">{pricing.free_tier ? '有' : '无'}</span>
                        </p>
                        <p className="mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">试用期：</span>
                          <span className="text-gray-700 dark:text-gray-300">{pricing.has_trial ? '有' : '无'}</span>
                        </p>
                        {pricing.starting_price && (
                          <p>
                            <span className="font-medium text-gray-900 dark:text-white">起始价格：</span>
                            <span className="text-gray-700 dark:text-gray-300">{pricing.starting_price}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">暂无价格信息</p>
                )}
              </div>
            )}
          </div>

          {/* 底部操作区 */}
          <div className="border-t dark:border-gray-700 p-6 flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={handleFavoriteClick}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
              >
                <span className="w-5 h-5 mr-2">{isFavorite ? <HeartFilledIcon /> : <HeartIcon />}</span>
                {isFavorite ? '已收藏' : '收藏'}
              </button>
            </div>
            <div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors"
              >
                访问官网
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatAIDetail
