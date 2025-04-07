'use client'

import React, { useState, useEffect } from 'react'
import { PromptCardList, PromptDetailModal, PromptTemplate } from '@/components/prompt-template-card'
import { mockPromptTemplates } from '@/data/mockPromptTemplates'

const PromptCardDemo = () => {
  const [variant, setVariant] = useState<'standard' | 'simple' | 'detail' | 'workshop'>('standard')
  const [templates, setTemplates] = useState<PromptTemplate[]>([])
  const [mounted, setMounted] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)

  useEffect(() => {
    setMounted(true)
    setTemplates(mockPromptTemplates)
  }, [])

  const handleFavoriteToggle = (id: string, isFavorite: boolean) => {
    setTemplates((prev) => prev.map((template) => (template.id === id ? { ...template, isFavorite } : template)))

    // 同步详情弹窗中的收藏状态
    if (selectedTemplate && selectedTemplate.id === id) {
      setSelectedTemplate({ ...selectedTemplate, isFavorite })
    }
  }

  const handleCardClick = (id: string) => {
    const template = templates.find((t) => t.id === id)
    if (template) {
      setSelectedTemplate(template)
      setDetailVisible(true)
    }
  }

  const handleCloseDetail = () => {
    setDetailVisible(false)
  }

  const handleCopy = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log('内容已复制到剪贴板')
      })
      .catch((err) => {
        console.error('复制失败: ', err)
      })
  }

  const handleApply = (template: PromptTemplate) => {
    console.log('应用提示词模板:', template)
    // 实际应用中，这里会将提示词应用到对话或编辑器
  }

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">提示词卡片组件演示</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 min-h-[200px] animate-pulse">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 mr-3"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
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
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">提示词卡片组件演示</h1>

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
              value="detail"
              checked={variant === 'detail'}
              onChange={() => setVariant('detail')}
              className="mr-2"
            />
            详情卡片
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="variant"
              value="workshop"
              checked={variant === 'workshop'}
              onChange={() => setVariant('workshop')}
              className="mr-2"
            />
            工坊卡片
          </label>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">卡片展示</h2>
        <PromptCardList
          templates={templates}
          variant={variant}
          onCardClick={handleCardClick}
          onFavorite={handleFavoriteToggle}
          onCopy={handleCopy}
          onApply={handleApply}
        />
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
          <li>点击卡片：打开详情弹窗，显示完整提示词内容</li>
          <li>点击心形图标：添加/移除收藏（状态保存在本地存储）</li>
          <li>点击复制按钮：复制提示词内容到剪贴板</li>
          <li>点击应用按钮：将提示词应用到目标对话或编辑器</li>
        </ul>
      </section>

      {/* 详情弹窗 */}
      {selectedTemplate && (
        <PromptDetailModal
          visible={detailVisible}
          template={selectedTemplate}
          onClose={handleCloseDetail}
          onFavorite={handleFavoriteToggle}
          onCopy={handleCopy}
          onApply={handleApply}
        />
      )}
    </div>
  )
}

export default PromptCardDemo
