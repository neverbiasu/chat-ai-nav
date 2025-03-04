'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'

// 导航项接口定义
interface NavItem {
  key: string
  label: string
  icon?: React.ReactNode
  path: string
  children?: NavItem[]
}

// 导航栏组件接口定义
interface NavbarProps {
  navItems: NavItem[]
  className?: string
}

/**
 * 导航栏组件
 * 提供统一的页面导航和功能入口，支持主题切换和移动端适配
 */
const Navbar: React.FC<NavbarProps> = ({ navItems, className = '' }) => {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [activeKey, setActiveKey] = useState<string>('')
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

  // 检测窗口尺寸变化，更新移动端状态
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // 初始化检测
    handleResize()

    // 添加窗口尺寸变化监听
    window.addEventListener('resize', handleResize)

    // 清理监听器
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 根据当前路径设置激活的导航项
  useEffect(() => {
    if (pathname) {
      const activeItem = navItems.find(
        (item) => item.path === pathname || (item.children && item.children.some((child) => child.path === pathname))
      )
      if (activeItem) {
        setActiveKey(activeItem.key)
      }
    }
  }, [pathname, navItems])

  // 切换主题
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // 切换移动端菜单折叠状态
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  // 渲染导航项
  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => (
      <li key={item.key} className="relative group">
        <Link
          href={item.path}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeKey === item.key ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-gray-800' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
          onClick={() => {
            setActiveKey(item.key)
            if (isMobile) setIsCollapsed(true)
          }}
        >
          {item.icon && <span className="mr-2 w-5 h-5">{item.icon}</span>}
          <span>{item.label}</span>
        </Link>

        {/* 子菜单 */}
        {item.children && item.children.length > 0 && (
          <ul className="hidden group-hover:block absolute left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
            {item.children.map((child) => (
              <li key={child.key}>
                <Link
                  href={child.path}
                  className={`block px-4 py-2 text-sm transition-colors ${pathname === child.path ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-gray-800' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                  onClick={() => {
                    if (isMobile) setIsCollapsed(true)
                  }}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))
  }

  return (
    <nav className={`bg-white dark:bg-gray-900 shadow-sm ${className}`}>
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo区域 */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              ChatAI导航
            </Link>
          </div>

          {/* 桌面端导航 */}
          {!isMobile && (
            <div className="hidden md:block">
              <ul className="flex space-x-4">{renderNavItems(navItems)}</ul>
            </div>
          )}

          {/* 右侧功能区 */}
          <div className="flex items-center space-x-4">
            {/* 主题切换按钮 */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
              aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
            >
              {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>

            {/* 移动端菜单按钮 */}
            {isMobile && (
              <button
                onClick={toggleCollapse}
                className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                aria-label={isCollapsed ? '打开菜单' : '关闭菜单'}
              >
                {isCollapsed ? <Bars3Icon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 移动端折叠菜单 */}
      {isMobile && !isCollapsed && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25 z-40" onClick={toggleCollapse}></div>
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-gray-900 shadow-xl z-50 transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">菜单</h2>
              <button
                onClick={toggleCollapse}
                className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                aria-label="关闭菜单"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">{renderNavItems(navItems)}</ul>
            </nav>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
