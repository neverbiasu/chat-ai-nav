import { BaseChatAIModel, ChatAIModel, mockChatAIModels } from './mockChatAIModels';
import chatAIModelsData from "./chatAIModels.json";

// 详情数据模型，符合文档中定义的DetailChatAIModel
export interface ChatAIModelDetail extends BaseChatAIModel {
  full_description: string;
  features: string[];
  screenshots?: Array<{ url: string; caption: string }>;
  video_demo?: string;
  company: {
    name: string;
    website?: string;
    founded?: string;
  };
  pricing?: {
    free_tier: boolean;
    has_trial: boolean;
    starting_price?: string;
  };
  release_date?: Date;
  last_update?: Date;
  rating?: {
    score: number;
    count: number;
  };
  reviews?: Array<{
    user: string;
    date: Date;
    content: string;
    rating: number;
  }>;
  alternatives?: Array<{
    id: string;
    name: string;
    similarity: number;
  }>;
  prompt_templates?: Array<{
    id: string;
    name: string;
    desc: string;
    content: string;
  }>;
  isFavorite?: boolean; // 添加收藏状态以支持UI交互
}

// 从统一的JSON文件读取详情数据
export const getMockChatAIModelDetail = (id: string): ChatAIModelDetail | undefined => {
  // 从统一JSON数据中查找完整的模型信息
  const modelData = chatAIModelsData.find(model => model.id === id);

  if (!modelData) return undefined;

  // 获取基础模型数据
  const baseModel = mockChatAIModels.find(model => model.id === id);

  if (!baseModel) return undefined;

  // 构建详情对象
  return {
    ...baseModel,
    full_description: modelData.details.full_description,
    features: modelData.details.features,
    screenshots: modelData.details.screenshots,
    pricing: modelData.details.pricing,
    rating: modelData.details.rating,
    company: modelData.company,
    alternatives: modelData.details.alternatives,
    isFavorite: baseModel.isFavorite
  };
};

// 兼容旧的API，方便过渡
export type AiToolDetail = any;
export const getMockAiToolDetail = (id: string): AiToolDetail => {
  const modelDetail = getMockChatAIModelDetail(id);
  if (!modelDetail) return undefined;

  // 转换为旧格式
  return {
    id: modelDetail.id,
    name: modelDetail.name,
    logo_path: modelDetail.logo_path,
    desc: modelDetail.desc,
    tags: modelDetail.tags,
    url: modelDetail.ai_url,
    company: modelDetail.company,
    full_description: modelDetail.full_description,
    features: modelDetail.features,
    screenshots: modelDetail.screenshots?.map(s => s.url) || [],
    pricing: modelDetail.pricing,
    rating: modelDetail.rating,
    alternatives: modelDetail.alternatives?.map(a => a.id) || [],
    isFavorite: modelDetail.isFavorite
  };
};
