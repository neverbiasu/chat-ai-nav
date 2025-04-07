import Link from 'next/link'

export default function Home() {
  return (
    <main className="py-8 px-4 max-w-6xl mx-auto transition-colors duration-200">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">ChatAI导航</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">发现、分享和使用最佳的 Chat AI 工具和资源</p>
      </header>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">组件演示</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">查看我们开发的组件演示：</p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/card-demo"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            查看AI卡片演示
          </Link>
          <Link
            href="/prompt-card-demo"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            查看提示词卡片演示
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">项目说明</h2>
        <p className="text-gray-600 dark:text-gray-300">
          这个项目展示了 ChatAI 卡片组件和提示词卡片组件的实现，包括多种变体（标准、简洁和详情卡片）、
          响应式设计以及交互功能（收藏、复制、应用等）。组件开发基于产品文档规范。
        </p>
      </section>
    </main>
  )
}
