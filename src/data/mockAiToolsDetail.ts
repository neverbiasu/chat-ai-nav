import { AiTool, mockAiTools } from './mockAiTools'

export interface AiToolDetail extends Omit<AiTool, 'company'> {
  full_description: string
  features: string[]
  screenshots: string[]
  pricing: {
    free_tier: boolean
    has_trial: boolean
    starting_price?: string
  }
  rating: {
    score: number
    count: number
  }
  company: {
    name: string
    website: string
  }
  alternatives?: string[]
}

// 扩展现有的模拟数据，添加详情组件需要的字段
export const getMockAiToolDetail = (id: string): AiToolDetail | undefined => {
  // 获取基本工具数据，使用导入的mockAiTools而非require
  const baseTool = mockAiTools.find((tool) => tool.id === id)

  if (!baseTool) return undefined

  // 详情数据映射
  const detailsMap: Record<string, Partial<AiToolDetail>> = {
    chatgpt: {
      full_description:
        'ChatGPT是由OpenAI开发的一款高级语言模型，能够理解并生成类似人类的文本。它可以用于撰写内容、回答问题、创建创意作品、编写代码等多种任务。ChatGPT基于GPT系列架构，通过大量的互联网文本训练而成。',
      features: ['自然语言对话', '内容创作', '代码辅助', '问题解答', '多语言支持'],
      screenshots: ['/images/chatgpt-screenshot1.png', '/images/chatgpt-screenshot2.png'],
      pricing: {
        free_tier: true,
        has_trial: false,
        starting_price: '$20/月'
      },
      rating: {
        score: 4.7,
        count: 12500
      },
      company: {
        name: 'OpenAI',
        website: 'https://openai.com'
      },
      alternatives: ['claude', 'bard', 'copilot']
    },
    claude: {
      full_description:
        'Claude是由Anthropic开发的AI助手，专注于有帮助、真实和无害的回应。它可以处理广泛的任务，包括写作、编码、对话和创意合作。Claude的目标是生成安全、有益的内容，避免有害或不适当的回应。',
      features: ['安全对话设计', '长上下文理解', '内容摘要', '文档分析', '创意写作'],
      screenshots: ['/images/claude-screenshot1.png', '/images/claude-screenshot2.png'],
      pricing: {
        free_tier: true,
        has_trial: true,
        starting_price: '$20/月'
      },
      rating: {
        score: 4.5,
        count: 8300
      },
      company: {
        name: 'Anthropic',
        website: 'https://anthropic.com'
      },
      alternatives: ['chatgpt', 'bard', 'copilot']
    },
    bard: {
      full_description:
        'Gemini (原Bard)是谷歌开发的一款对话式人工智能服务，能够生成文本、翻译语言、编写不同类型的创意内容，并回答您的问题。它由谷歌的大语言模型支持，可以访问和处理来自网络的信息。',
      features: ['谷歌搜索集成', '实时信息获取', '图像理解', '创意生成', '多语言翻译'],
      screenshots: ['/images/bard-screenshot1.png', '/images/bard-screenshot2.png'],
      pricing: {
        free_tier: true,
        has_trial: false,
        starting_price: '$10/月'
      },
      rating: {
        score: 4.2,
        count: 6700
      },
      company: {
        name: 'Google',
        website: 'https://google.com'
      },
      alternatives: ['chatgpt', 'claude', 'copilot']
    },
    copilot: {
      full_description:
        'GitHub Copilot是一款由GitHub和OpenAI开发的AI编程助手，基于OpenAI的Codex模型。它可以在多种代码编辑器中使用，分析上下文并实时生成代码建议，帮助开发者加速编程过程。',
      features: ['代码自动补全', '多语言支持', '注释转代码', '测试生成', 'IDE集成'],
      screenshots: ['/images/copilot-screenshot1.png', '/images/copilot-screenshot2.png'],
      pricing: {
        free_tier: false,
        has_trial: true,
        starting_price: '$10/月'
      },
      rating: {
        score: 4.8,
        count: 9200
      },
      company: {
        name: 'GitHub (Microsoft)',
        website: 'https://github.com/features/copilot'
      },
      alternatives: ['chatgpt', 'claude', 'codewhisperer']
    }
  }

  // 合并基本数据和详情数据
  return {
    ...baseTool,
    full_description: detailsMap[id]?.full_description || '暂无详细描述',
    features: detailsMap[id]?.features || ['暂无特性描述'],
    screenshots: detailsMap[id]?.screenshots || [],
    pricing: detailsMap[id]?.pricing || {
      free_tier: false,
      has_trial: false
    },
    rating: detailsMap[id]?.rating || {
      score: 0,
      count: 0
    },
    company: detailsMap[id]?.company || {
      name: '未知',
      website: '#'
    },
    alternatives: detailsMap[id]?.alternatives || []
  }
}
