import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
  padding?: string;
  margin?: string;
  background?: string;
  className?: string;
}

/**
 * 容器组件
 * 提供统一的内容容器，支持最大宽度、内边距、外边距和背景设置
 */
const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = 'px-6',
  margin = 'mx-auto',
  background = 'bg-white dark:bg-gray-900',
  className = '',
}) => {
  // 根据设计文档定义的最大宽度值
  const maxWidthClasses = {
    xs: 'max-w-xs', // 小尺寸容器
    sm: 'max-w-sm', // 中小尺寸容器
    md: 'max-w-3xl', // 中等尺寸容器
    lg: 'max-w-[1200px]', // 大尺寸容器，根据设计文档定义
    xl: 'max-w-7xl', // 超大尺寸容器
    full: 'max-w-full', // 全宽容器
    none: '', // 无最大宽度限制
  };

  return (
    <div
      className={`${maxWidth !== 'none' ? maxWidthClasses[maxWidth] : ''} ${padding} ${margin} ${background} ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;