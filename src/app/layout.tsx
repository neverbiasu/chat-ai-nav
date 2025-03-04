import '@/styles/globals.css'
import Container from '@/components/layout/Container'
import Navbar from '@/components/navbar/Navbar'
import navConfig, { NavItem as ConfigNavItem } from '@/components/navbar/navConfig'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { createElement } from 'react'

export const metadata = {
  title: 'AI 工具导航',
  description: '发现、分享和使用最佳的 AI 工具和资源'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 将 navConfig 中的 icon 类型(ElementType)转换为实际的ReactNode元素
  const typedNavConfig = navConfig.map((item) => {
    const processedItem: any = {
      ...item,
      icon: item.icon ? createElement(item.icon) : null
    }

    if (item.children) {
      processedItem.children = item.children.map((child: ConfigNavItem) => ({
        ...child,
        icon: child.icon ? createElement(child.icon) : null
      }))
    }

    return processedItem
  })

  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ThemeProvider>
          <Navbar navItems={typedNavConfig} />
          <Container maxWidth="lg" padding="px-4 py-0" className="min-h-screen pt-16">
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}
