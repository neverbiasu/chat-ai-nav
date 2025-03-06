export interface AiTool {
  id: string
  name: string
  logo_path: string
  desc: string
  tags: string[]
  url: string
  company?: string
  hotness?: number
  isFavorite?: boolean
}

export const mockAiTools: AiTool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    logo_path: 'https://logos-world.net/wp-content/uploads/2023/02/ChatGPT-Logo-500x281.png',
    desc: 'OpenAI开发的大型语言模型，支持自然对话和内容创作',
    tags: ['对话', '写作', '翻译'],
    url: 'https://chat.openai.com',
    company: 'OpenAI',
    hotness: 98
  },
  {
    id: 'claude',
    name: 'Claude',
    logo_path:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d6/79/ad/d679ad63-4f76-ef0f-62c4-ff39e9f04b25/AppIcon-0-0-1x_U007epad-0-1-85-220.png/246x0w.webp',
    desc: 'Anthropic开发的AI助手，专注于有用、无害和诚实的回答',
    tags: ['对话', '研究', '助手'],
    url: 'https://claude.ai',
    company: 'Anthropic',
    hotness: 92
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    logo_path: 'https://github.blog/wp-content/uploads/2022/05/Copilot_Blog_Icon-1.svg',
    desc: 'AI驱动的代码辅助工具，帮助开发者更快地编写代码',
    tags: ['编程', '代码', '开发'],
    url: 'https://github.com/features/copilot',
    company: 'GitHub & OpenAI',
    hotness: 90
  },
  {
    id: 'jasper',
    name: 'Jasper',
    logo_path:
      'https://cdn.prod.website-files.com/60e5f2de011b86acebc30db7/665dd9c1792c38c09c7d74ec_Jasper%20Logo%20Lockup%20-%20Dark%20Khaki.svg',
    desc: 'AI文案写作助手，帮助营销人员创建高质量内容',
    tags: ['营销', '写作', '内容'],
    url: 'https://www.jasper.ai',
    company: 'Jasper AI',
    hotness: 85
  },
  {
    id: 'gemini',
    name: 'Gemini',
    logo_path: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
    desc: 'Google最新多模态AI模型，支持文本、图像、视频理解',
    tags: ['多模态', '搜索', '分析'],
    url: 'https://gemini.google.com',
    company: 'Google',
    hotness: 94
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    logo_path: 'https://framerusercontent.com/images/rT6Gy5rUran71JjQcj4Y5ThtEg.png',
    desc: 'AI驱动的搜索引擎，提供有来源的回答和实时信息',
    tags: ['搜索', '研究', '信息'],
    url: 'https://www.perplexity.ai',
    company: 'Perplexity AI',
    hotness: 87
  }
]
