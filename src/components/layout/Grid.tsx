import React, { ReactNode } from 'react'

type JustifyContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch'
type ColSpan =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 'auto'
  | 'full'
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
// 新增间距类型，符合文档中的间距系统
type GutterSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number

interface ResponsiveValue<T> {
  base?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

interface RowProps {
  children: ReactNode
  gutter?: GutterSize | [GutterSize, GutterSize] | ResponsiveValue<GutterSize | [GutterSize, GutterSize]>
  justify?: JustifyContent
  align?: AlignItems
  className?: string
}

interface ColProps {
  children: ReactNode
  span?: ColSpan | ResponsiveValue<ColSpan>
  offset?: number | ResponsiveValue<number>
  className?: string
}

/**
 * 行组件
 * 基于Flexbox的栅格行组件，支持响应式间距和对齐方式
 */
export const Row: React.FC<RowProps> = ({
  children,
  gutter = 'md', // 默认使用md(24px)间距
  justify = 'start',
  align = 'start',
  className = ''
}) => {
  // 根据设计文档定义的间距值
  const getGutterValue = (size: GutterSize): number => {
    if (typeof size === 'number') return size

    const gutterSizes = {
      xs: 8, // 8px
      sm: 16, // 16px
      md: 24, // 24px
      lg: 32, // 32px
      xl: 48, // 48px
      xxl: 64 // 扩展值
    }

    return gutterSizes[size]
  }

  // 处理间距
  const getGutterStyle = () => {
    if (typeof gutter === 'number' || typeof gutter === 'string') {
      const gutterValue = getGutterValue(gutter)
      const halfGutter = gutterValue / 2
      return {
        marginLeft: -halfGutter,
        marginRight: -halfGutter
      }
    }

    if (Array.isArray(gutter)) {
      const [horizontal, vertical] = gutter
      const horizontalValue = getGutterValue(horizontal)
      const verticalValue = getGutterValue(vertical)
      const halfHorizontal = horizontalValue / 2
      return {
        marginLeft: -halfHorizontal,
        marginRight: -halfHorizontal,
        marginTop: -verticalValue / 2,
        marginBottom: -verticalValue / 2
      }
    }

    return {}
  }

  // 映射justify值到Tailwind类
  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }

  // 映射align值到Tailwind类
  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch'
  }

  return (
    <div
      className={`flex flex-wrap ${justifyClasses[justify]} ${alignClasses[align]} ${className}`}
      style={getGutterStyle()}
    >
      {children}
    </div>
  )
}

/**
 * 列组件
 * 栅格列组件，支持响应式宽度和偏移
 */
export const Col: React.FC<ColProps> = ({ children, span = 24, offset = 0, className = '' }) => {
  // 处理响应式span
  const getSpanClasses = () => {
    if (typeof span === 'object') {
      const classes = []

      // 基础span
      if (span.base !== undefined) {
        classes.push(getColSpanClass(span.base))
      } else {
        classes.push(getColSpanClass(24)) // 默认占满
      }

      // 响应式断点
      const breakpoints: Breakpoint[] = ['sm', 'md', 'lg', 'xl', '2xl']
      breakpoints.forEach((bp) => {
        if (span[bp] !== undefined) {
          classes.push(`${bp}:${getColSpanClass(span[bp]!)}`)
        }
      })

      return classes.join(' ')
    }

    return getColSpanClass(span)
  }

  // 处理响应式offset
  const getOffsetClasses = () => {
    if (typeof offset === 'object') {
      const classes = []

      // 基础offset
      if (offset.base !== undefined && offset.base > 0) {
        classes.push(`ml-${Math.round((offset.base / 24) * 12)}/12`)
      }

      // 响应式断点
      const breakpoints: Breakpoint[] = ['sm', 'md', 'lg', 'xl', '2xl']
      breakpoints.forEach((bp) => {
        if (offset[bp] !== undefined && offset[bp]! > 0) {
          classes.push(`${bp}:ml-${Math.round((offset[bp]! / 24) * 12)}/12`)
        }
      })

      return classes.join(' ')
    }

    return offset > 0 ? `ml-${Math.round((offset / 24) * 12)}/12` : ''
  }

  // 获取列宽类名
  const getColSpanClass = (colSpan: ColSpan) => {
    if (colSpan === 'auto') return 'w-auto'
    if (colSpan === 'full') return 'w-full'

    // 将24栏转换为12栏系统（Tailwind默认是12栏）
    const tailwindSpan = Math.round(((colSpan as number) / 24) * 12)
    return `w-${tailwindSpan}/12`
  }

  return <div className={`${getSpanClasses()} ${getOffsetClasses()} ${className}`}>{children}</div>
}
