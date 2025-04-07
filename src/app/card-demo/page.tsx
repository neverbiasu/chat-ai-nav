'use client'

import React, { useState, useEffect } from 'react'
import ChatAICard from '@/components/chat-ai-card/ChatAICard'
import ChatAIDetail from '@/components/chat-ai-detail/ChatAIDetail'

// 导入新的模型和方法
import { mockChatAIModels, ChatAIModel } from '@/data/mockChatAIModels'
import { getMockChatAIModelDetail, ChatAIModelDetail } from '@/data/mockChatAIModelDetails'

const CardDemo = () => {
  const [variant, setVariant] = useState<'standard' | 'simple' | 'detailed'>('standard')
  const [models, setModels] = useState<ChatAIModel[]>([])
  const [mounted, setMounted] = useState(false)
  const [_, setSelectedModelId] = useState<string | null>(null)
  const [detailVisible, setDetailVisible] = useState(false)
  const [selectedModelDetail, setSelectedModelDetail] = useState<ChatAIModelDetail | null>(null)

  useEffect(() => {
    setMounted(true)

    // 从本地存储加载收藏状态，仅在客户端执行
    if (typeof window !== 'undefined') {
      try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '{}')

        // 更新工具列表，添加收藏状态
        const modelsWithFavorites = mockChatAIModels.map((model) => ({
          ...model,
          isFavorite: !!favorites[model.id]
        }))

        setModels(modelsWithFavorites)
      } catch (error) {
        console.error('Failed to load favorites', error)
        setModels(mockChatAIModels)
      }
    } else {
      setModels(mockChatAIModels)
    }
  }, [])

  const handleFavoriteToggle = (id: string, isFavorite: boolean) => {
    setModels((prev) => prev.map((model) => (model.id === id ? { ...model, isFavorite } : model)))

    // 如果详情弹窗当前打开并且是同一个工具，则同步收藏状态
    if (selectedModelDetail && selectedModelDetail.id === id) {
      setSelectedModelDetail((prev) => (prev ? { ...prev, isFavorite } : null))
    }
  }

  const handleCardClick = (id: string) => {
    // 确保详情数据可以正确获取
    try {
      const modelDetail = getMockChatAIModelDetail(id)
      if (modelDetail) {
        setSelectedModelDetail(modelDetail)
        setSelectedModelId(id)
        setDetailVisible(true)
      } else {
        console.error(`找不到ID为 ${id} 的模型详情数据`)
      }
    } catch (error) {
      console.error('获取模型详情时发生错误:', error)
    }
  }

  const handleCloseDetail = () => {
    setDetailVisible(false)
  }

  // 如果尚未挂载，显示加载状态
  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">ChatAI 卡片组件演示</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 min-h-[160px] animate-pulse">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 mr-3"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">ChatAI 卡片组件演示</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">卡片变体</h2>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="variant"
              value="standard"
              checked={variant === 'standard'}
              onChange={() => setVariant('standard')}
              className="mr-2 accent-blue-500"
            />
            标准卡片
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="variant"
              value="simple"
              checked={variant === 'simple'}
              onChange={() => setVariant('simple')}
              className="mr-2"
            />
            简洁卡片
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="variant"
              value="detailed"
              checked={variant === 'detailed'}
              onChange={() => setVariant('detailed')}
              className="mr-2"
            />
            详情卡片
          </label>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">卡片展示</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {models.map((model) => (
            <ChatAICard
              key={model.id}
              {...model}
              variant={variant}
              onFavoriteToggle={handleFavoriteToggle}
              onClick={() => handleCardClick(model.id)}
            />
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">响应式布局</h2>
        <p className="text-gray-600 dark:text-gray-300">
          尝试调整浏览器窗口大小，查看卡片如何根据屏幕宽度自动调整布局。 在移动设备上，卡片将以列表形式显示。
        </p>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">交互说明</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
          <li>点击卡片：打开详情弹窗，显示完整信息</li>
          <li>点击心形图标：添加/移除收藏（状态保存在本地存储）</li>
          <li>点击访问按钮：跳转到AI工具官网</li>
        </ul>
      </section>

      {/* 详情弹窗 */}
      {selectedModelDetail && (
        <ChatAIDetail
          isOpen={detailVisible}
          onClose={handleCloseDetail}
          {...selectedModelDetail}
          onFavoriteToggle={handleFavoriteToggle}
        />
      )}
    </div>
  )
}

export default CardDemo
