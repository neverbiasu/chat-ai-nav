import { PromptTemplate } from "@/components/prompt-template-card/PromptCard";

export const mockPromptTemplates: PromptTemplate[] = [
  {
    id: "creative-writing",
    name: "创意写作助手",
    icon: "mdi:pencil-outline",
    icon_color: "#4F46E5", // 紫色
    desc: "帮助用户突破写作瓶颈，生成创意灵感",
    content:
      "我需要你扮演创意写作顾问。请根据我提供的主题「{{主题}}」，生成一个创意故事开头，包含引人入胜的场景描述和人物介绍。",
    tags: ["写作", "创意", "故事"],
    placeholder_pos: [{ name: "主题", start: 23, end: 29 }],
    isPublic: true,
    creator: { name: "创意工坊", avatar: "/assets/avatars/workshop.png" },
    usage_count: 2543,
    rating: 4.8,
    compatible_models: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "code-review",
    name: "代码审查专家",
    icon: "mdi:code-braces",
    icon_color: "#0EA5E9", // 蓝色
    desc: "详细审查代码，提供改进建议和最佳实践",
    content:
      "请作为代码审查专家检查以下{{编程语言}}代码。提供关于代码质量、可能的错误和性能问题的详细反馈。同时建议具体的改进方法和最佳实践：\n\n```{{编程语言}}\n{{代码}}\n```",
    tags: ["编程", "代码审查", "优化"],
    placeholder_pos: [
      { name: "编程语言", start: 15, end: 21 },
      { name: "编程语言", start: 86, end: 92 },
      { name: "代码", start: 94, end: 98 },
    ],
    isPublic: true,
    creator: { name: "CodeMaster", avatar: "/assets/avatars/codemaster.png" },
    usage_count: 1892,
    rating: 4.9,
    compatible_models: ["GPT-4", "Claude", "Copilot"],
  },
  {
    id: "data-analyst",
    name: "数据分析师",
    icon: "mdi:chart-bar",
    icon_color: "#10B981", // 绿色
    desc: "分析数据集并提供洞察，生成可视化建议",
    content:
      "我希望你担任数据分析师。我将提供一个数据集，我需要你分析这些数据，提供关键指标、趋势分析和异常检测。请同时提供可视化建议，指出哪些图表类型最适合展示这些数据。\n\n数据：\n{{数据}}",
    tags: ["数据分析", "可视化", "洞察"],
    placeholder_pos: [{ name: "数据", start: 110, end: 114 }],
    isPublic: true,
    creator: { name: "DataViz", avatar: "/assets/avatars/dataviz.png" },
    usage_count: 1478,
    rating: 4.7,
    compatible_models: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "marketing-copy",
    name: "营销文案生成器",
    icon: "mdi:bullhorn-outline",
    icon_color: "#F59E0B", // 橙色
    desc: "创建引人注目的营销文案和广告语",
    content:
      "作为营销文案专家，请为以下产品或服务创建5个简洁有力的营销标语或广告语。每个标语不超过15个字，突出产品的核心优势和情感诉求。\n\n产品/服务：{{产品或服务}}\n目标受众：{{目标受众}}\n核心卖点：{{核心卖点}}",
    tags: ["营销", "广告", "文案"],
    placeholder_pos: [
      { name: "产品或服务", start: 94, end: 100 },
      { name: "目标受众", start: 106, end: 112 },
      { name: "核心卖点", start: 118, end: 124 },
    ],
    isPublic: true,
    creator: {
      name: "广告文案工作室",
      avatar: "/assets/avatars/copywriter.png",
    },
    usage_count: 2156,
    rating: 4.6,
    compatible_models: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "study-plan",
    name: "学习计划制定",
    icon: "mdi:book-education-outline",
    icon_color: "#6366F1", // 靛蓝色
    desc: "根据学习目标创建个性化学习计划",
    content:
      "请作为一名教育顾问，为我制定一个详细的学习计划，帮助我在{{时间范围}}内掌握{{学习主题}}。我的当前水平是{{当前水平}}，我每周可以投入约{{每周学习时间}}小时学习。请提供具体的学习资源推荐、进度安排和阶段性目标。",
    tags: ["教育", "学习计划", "自我提升"],
    placeholder_pos: [
      { name: "时间范围", start: 29, end: 35 },
      { name: "学习主题", start: 38, end: 44 },
      { name: "当前水平", start: 50, end: 56 },
      { name: "每周学习时间", start: 64, end: 72 },
    ],
    isPublic: true,
    creator: { name: "学习规划师", avatar: "/assets/avatars/educator.png" },
    usage_count: 1325,
    rating: 4.5,
    compatible_models: ["GPT-4", "Claude", "Gemini"],
  },
  {
    id: "interview-prep",
    name: "面试准备助手",
    icon: "mdi:account-tie-outline",
    icon_color: "#EC4899", // 粉红色
    desc: "模拟面试问题并提供回答建议",
    content:
      "作为面试教练，请帮我准备一场{{职位}}的面试。首先列出这个职位可能的10个关键面试问题，然后为其中3个最重要的问题提供详细的回答思路和示例。我的背景是：{{个人背景}}，我的优势是：{{个人优势}}。",
    tags: ["求职", "面试", "职业发展"],
    placeholder_pos: [
      { name: "职位", start: 17, end: 21 },
      { name: "个人背景", start: 80, end: 86 },
      { name: "个人优势", start: 92, end: 98 },
    ],
    isPublic: true,
    creator: { name: "职业指导专家", avatar: "/assets/avatars/career.png" },
    usage_count: 1876,
    rating: 4.8,
    compatible_models: ["GPT-4", "Claude", "Gemini"],
  },
];
