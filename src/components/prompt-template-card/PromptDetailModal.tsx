import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { HeartIcon, HeartFilledIcon, CopyIcon, CheckIcon } from "./Icons";
import Image from "next/image";
import { PromptTemplate } from "./PromptCard";
import { Icon } from "@iconify/react";

interface PromptDetailModalProps {
  visible: boolean;
  template: PromptTemplate | null;
  onClose: () => void;
  onFavorite?: (id: string, isFavorite: boolean) => void;
  onCopy?: (content: string) => void;
  onApply?: (template: PromptTemplate) => void;
  onEdit?: (template: PromptTemplate) => void;
}

const PromptDetailModal: React.FC<PromptDetailModalProps> = ({
  visible,
  template,
  onClose,
  onFavorite,
  onCopy,
  onApply,
  onEdit,
}) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!visible || !template) return null;

  const {
    id,
    name,
    logo_path,
    content,
    desc,
    tags,
    isFavorite = false,
    creator,
    compatible_models,
  } = template;

  const handleCopy = () => {
    if (onCopy) {
      onCopy(content);
    } else {
      navigator.clipboard
        .writeText(content)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite(id, !isFavorite);
    }
  };

  const handleApply = () => {
    if (onApply) {
      onApply(template);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(template);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const renderLogo = () => {
    if (template.icon) {
      return (
        <div
          className={`w-full h-full flex items-center justify-center ${template.icon_color ? "" : "text-blue-500 dark:text-blue-300"}`}
        >
          <Icon
            icon={template.icon}
            className="w-full h-full"
            style={template.icon_color ? { color: template.icon_color } : {}}
          />
        </div>
      );
    } else if (template.logo_path && !imageError) {
      return (
        <Image
          src={template.logo_path}
          alt={`${name} logo`}
          width={50}
          height={50}
          className="w-full h-full object-contain"
          onError={handleImageError}
        />
      );
    } else {
      return (
        <div className="w-full h-full flex items-center justify-center font-bold text-xl text-blue-500 bg-blue-50 dark:bg-blue-900 dark:text-blue-300">
          {name.charAt(0)}
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 min-w-12 mr-4 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
              {renderLogo()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {name}
              </h2>
              {creator && (
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {creator.name}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* 内容 */}
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">{desc}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              提示词内容
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {content}
            </div>
          </div>

          {compatible_models && compatible_models.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                兼容模型
              </h3>
              <div className="flex flex-wrap gap-2">
                {compatible_models.map((model) => (
                  <span
                    key={model}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 底部 */}
        <div className="border-t dark:border-gray-700 p-6 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={handleFavorite}
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none mr-2"
            >
              <span className="w-5 h-5 mr-2">
                {isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
              </span>
              {isFavorite ? "已收藏" : "收藏"}
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
            >
              <span className="w-5 h-5 mr-2">
                {copied ? <CheckIcon /> : <CopyIcon />}
              </span>
              {copied ? "已复制" : "复制"}
            </button>
          </div>
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md transition-colors"
              >
                编辑
              </button>
            )}
            {onApply && (
              <button
                onClick={handleApply}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors"
              >
                应用
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetailModal;
