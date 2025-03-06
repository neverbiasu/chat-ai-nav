'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // 当组件挂载时，应用主题以避免闪烁
  useEffect(() => {
    setMounted(true)
  }, [])

  // 在挂载完成前返回无样式的占位符
  if (!mounted) {
    // 返回没有任何主题特定样式的占位符
    return (
      <div
        style={{ visibility: 'hidden' }}
        // 添加一个空白内容以防止布局偏移
        className="bg-gray-50 dark:bg-gray-900 min-h-screen"
      >
        {children}
      </div>
    )
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
