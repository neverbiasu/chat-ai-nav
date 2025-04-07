import chatAIModelsData from "./chatAIModels.json";

// 基础数据模型，符合文档中定义的BaseChatAIModel
export interface BaseChatAIModel {
  id: string;
  name: string;
  logo_path: string;
  desc: string;
  tags: string[];
  ai_url: string;
  company?: {
    name: string;
    website?: string;
  };
}

// 卡片数据模型，符合文档中定义的CardChatAIModel
export interface ChatAIModel extends BaseChatAIModel {
  hotness?: number;
  isFavorite?: boolean;
}

// 从统一的JSON文件中提取基本信息
export const mockChatAIModels: ChatAIModel[] = chatAIModelsData.map(
  (model) => ({
    id: model.id,
    name: model.name,
    logo_path: model.logo_path,
    desc: model.desc,
    tags: model.tags,
    ai_url: model.ai_url,
    company: model.company,
    hotness: model.hotness,
  })
);

export const mockAiTools = mockChatAIModels.map((model) => ({
  id: model.id,
  name: model.name,
  logo_path: model.logo_path,
  desc: model.desc,
  tags: model.tags,
  url: model.ai_url,
  company: model.company,
  hotness: model.hotness,
}));
