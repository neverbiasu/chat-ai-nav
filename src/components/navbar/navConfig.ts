/**
 * 导航栏配置文件
 * 定义导航项结构和示例数据
 */

import { HomeIcon, RocketLaunchIcon, BookOpenIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import React from 'react'

// 导航项接口定义
export interface NavItem {
  key: string
  label: string
  icon?: React.ElementType // 修改为 ElementType，更准确地表示 Heroicons 组件类型
  path: string
  children?: NavItem[]
}

// 示例导航配置
const navConfig: NavItem[] = [
  {
    key: 'home',
    label: '首页',
    icon: HomeIcon, // 直接使用组件类型，不需要类型转换
    path: '/'
  },
  {
    key: 'discover',
    label: '发现',
    icon: RocketLaunchIcon,
    path: '/discover',
    children: [
      {
        key: 'new',
        label: '最新工具',
        path: '/discover/new'
      },
      {
        key: 'popular',
        label: '热门工具',
        path: '/discover/popular'
      }
    ]
  },
  {
    key: 'prompt',
    label: '提示词工坊',
    icon: BookOpenIcon,
    path: '/prompt'
  },
  {
    key: 'settings',
    label: '设置',
    icon: Cog6ToothIcon,
    path: '/settings'
  }
]

export default navConfig
