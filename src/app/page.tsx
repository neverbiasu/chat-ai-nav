import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 头部区域 */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">AI 工具导航</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">发现、分享和使用最佳的 AI 工具和资源</p>
        </header>

        {/* 搜索区域 */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索 AI 工具..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                搜索
              </button>
            </div>
          </div>
        </div>

        {/* 工具分类区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 示例工具卡片 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">文本生成</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">使用 AI 生成高质量的文本内容</p>
            <Link href="/category/text" className="text-blue-600 dark:text-blue-400 hover:underline">
              查看更多 →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">图像处理</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">AI 驱动的图像生成和编辑工具</p>
            <Link href="/category/image" className="text-blue-600 dark:text-blue-400 hover:underline">
              查看更多 →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">代码助手</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">提高开发效率的 AI 编程工具</p>
            <Link href="/category/code" className="text-blue-600 dark:text-blue-400 hover:underline">
              查看更多 →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
