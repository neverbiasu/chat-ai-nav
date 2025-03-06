import '@/styles/globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import MainLayout from '@/components/layout/MainLayout'

export const metadata = {
  title: 'AI 工具导航',
  description: '发现、分享和使用最佳的 AI 工具和资源'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
