'use client'

import React, { useState, useEffect } from 'react'
import ChatAICard from '@/components/chat-ai-card/ChatAICard'
import { mockAiTools, AiTool } from '@/data/mockAiTools'

const CardDemo = () => {
  const [variant, setVariant] = useState<'standard' | 'simple' | 'detailed'>('standard')
  const [tools, setTools] = useState<AiTool[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // 从本地存储加载收藏状态，仅在客户端执行
    if (typeof window !== 'undefined') {
      try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '{}')

        // 更新工具列表，添加收藏状态
        const toolsWithFavorites = mockAiTools.map((tool) => ({
          ...tool,
          isFavorite: !!favorites[tool.id]
        }))

        setTools(toolsWithFavorites)
      } catch (error) {
        console.error('Failed to load favorites', error)
        setTools(mockAiTools)
      }
    } else {
      setTools(mockAiTools)
    }
  }, [])

  const handleFavoriteToggle = (id: string, isFavorite: boolean) => {
    setTools((prev) => prev.map((tool) => (tool.id === id ? { ...tool, isFavorite } : tool)))
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
          {tools.map((tool) => (
            <ChatAICard key={tool.id} {...tool} variant={variant} onFavoriteToggle={handleFavoriteToggle} />
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
          <li>点击卡片：显示AI工具详情（控制台输出）</li>
          <li>点击心形图标：添加/移除收藏（状态保存在本地存储）</li>
          <li>点击访问按钮：跳转到AI工具官网</li>
        </ul>
      </section>
    </div>
  )
}

export default CardDemo
