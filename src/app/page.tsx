import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="py-8">
      <header>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">ChatAI导航</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">发现、分享和使用最佳的 Chat AI 工具和资源</p>
      </header>

    </main>
  )
}
