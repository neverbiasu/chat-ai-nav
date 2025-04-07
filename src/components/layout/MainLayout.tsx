'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import navConfig from '../navbar/navConfig'

// 动态导入 Navbar，禁用服务端渲染
const Navbar = dynamic(() => import('../navbar/Navbar'), {
  ssr: false,
  loading: () => (
    <div className="h-16 bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center">
        <div className="text-xl font-bold">ChatAI导航</div>
      </div>
    </div>
  )
})

interface MainLayoutProps {
  children: React.ReactNode
}

/**
 * 主布局组件
 * 包含导航栏和主要内容区域
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <Navbar navItems={navConfig} />
      <main className="flex-1">{children}</main>
      <footer className="bg-white dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-[1200px] mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} ChatAI导航 - 发现最佳AI工具和资源</p>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
