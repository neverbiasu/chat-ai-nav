/**
 * 导航栏配置文件
 * 定义导航项结构和导航数据
 */
export interface NavItem {
  key: string
  label: string
  icon?: string // 修改类型为string，用于存储iconify图标名称
  path: string
  children?: NavItem[]
}

const navConfig: NavItem[] = [
  {
    key: 'home',
    label: '首页',
    icon: 'mdi:home-outline',
    path: '/'
  },
  {
    key: 'discover',
    label: '发现',
    icon: 'mdi:magnify',
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
    icon: 'mdi:bookmark-outline',
    path: '/favorites'
  },
  {
    key: 'prompt',
    label: '提示词工坊',
    icon: 'mdi:book-open-outline',
    path: '/prompt'
  },
  {
    key: 'about',
    label: '关于',
    icon: 'mdi:help-circle-outline',
    path: '/about'
  },
  {
    key: 'settings',
    label: '设置',
    icon: 'mdi:cog-outline',
    path: '/settings'
  }
]

export default navConfig
