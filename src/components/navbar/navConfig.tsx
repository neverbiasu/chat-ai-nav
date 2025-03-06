/**
 * 导航栏配置文件
 * 定义导航项结构和导航数据
 */

import { ElementType } from 'react'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

export interface NavItem {
  key: string
  label: string
  icon?: ElementType
  path: string
  children?: NavItem[]
}

const navConfig: NavItem[] = [
  {
    key: 'home',
    label: '首页',
    icon: HomeIcon,
    path: '/'
  },
  {
    key: 'discover',
    label: '发现',
    icon: MagnifyingGlassIcon,
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
    key: 'favorites',
    label: '收藏',
    icon: BookmarkIcon,
    path: '/favorites'
  },
  {
    key: 'prompt',
    label: '提示词工坊',
    icon: BookOpenIcon,
    path: '/prompt'
  },
  {
    key: 'about',
    label: '关于',
    icon: QuestionMarkCircleIcon,
    path: '/about'
  },
  {
    key: 'settings',
    label: '设置',
    icon: Cog6ToothIcon,
    path: '/settings'
  }
]

export default navConfig
