import React, { ReactNode } from 'react';

type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'none';
type SpacingDirection = 'horizontal' | 'vertical';

interface SpacingProps {
  children: ReactNode;
  size?: SpacingSize;
  direction?: SpacingDirection;
  className?: string;
}

/**
 * 间距组件
 * 提供统一的间距管理，基于8px作为基础单位
 */
const Spacing: React.FC<SpacingProps> = ({
  children,
  size = 'md',
  direction = 'vertical',
  className = '',
}) => {
  // 根据设计文档定义的间距值
  const spacingClasses = {
    none: '0',
    xs: '2', // 8px
    sm: '4', // 16px
    md: '6', // 24px
    lg: '8', // 32px
    xl: '12', // 48px
    xxl: '16', // 64px
  };

  // 根据方向应用不同的间距类
  const getSpacingClass = () => {
    const spacingValue = spacingClasses[size];
    
    if (direction === 'horizontal') {
      return `space-x-${spacingValue}`;
    } else {
      return `space-y-${spacingValue}`;
    }
  };

  return (
    <div className={`${getSpacingClass()} ${className}`}>
      {children}
    </div>
  );
};

/**
 * 分隔组件
 * 提供水平或垂直分隔线
 */
interface DividerProps {
  direction?: 'horizontal' | 'vertical';
  className?: string;
  margin?: SpacingSize;
}

export const Divider: React.FC<DividerProps> = ({
  direction = 'horizontal',
  className = '',
  margin = 'md',
}) => {
  // 根据设计文档定义的间距值
  const marginClasses = {
    none: '0',
    xs: '2', // 8px
    sm: '4', // 16px
    md: '6', // 24px
    lg: '8', // 32px
    xl: '12', // 48px
    xxl: '16', // 64px
  };

  const getMarginClass = () => {
    const marginValue = marginClasses[margin];
    
    if (direction === 'horizontal') {
      return `my-${marginValue}`;
    } else {
      return `mx-${marginValue}`;
    }
  };

  return (
    <div 
      className={`
        ${direction === 'horizontal' ? 'w-full border-t' : 'h-full border-l'} 
        border-gray-200 dark:border-gray-700 
        ${getMarginClass()} 
        ${className}
      `}
    />
  );
};

export default Spacing;