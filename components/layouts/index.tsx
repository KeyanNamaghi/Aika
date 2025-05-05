import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import React from 'react'

type ResponsiveProp<T> = T | Partial<Record<'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', T>>

type StackProps = {
  direction?: ResponsiveProp<'row' | 'col'>
  gap?: ResponsiveProp<string>
  align?: ResponsiveProp<'start' | 'center' | 'end' | 'stretch' | 'baseline'>
  justify?: ResponsiveProp<'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'>
  className?: string
}

const toClass = <T extends string>(prefix: string, prop?: ResponsiveProp<T>) => {
  if (!prop) return []

  if (typeof prop === 'string') return [`${prefix}-${prop}`]

  return Object.entries(prop).map(([breakpoint, value]) =>
    breakpoint === 'base' ? `${prefix}-${value}` : `${breakpoint}:${prefix}-${value}`,
  )
}

export const Stack = ({
  children,
  direction = 'col',
  gap = '5',
  align,
  justify,
  className,
}: PropsWithChildren<StackProps>) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-wrap',
        toClass('flex', direction),
        toClass('gap', gap),
        toClass('items', align),
        toClass('justify', justify),
        className,
      )}
    >
      {children}
    </div>
  )
}

type DividerProps = {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export const Divider = ({ orientation = 'horizontal', className }: DividerProps) => {
  return (
    <div
      role='separator'
      className={clsx(
        'shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        'bg-grey-200',
        className,
      )}
    />
  )
}

type SpacerProps = {
  direction?: 'horizontal' | 'vertical'
  grow?: boolean
  className?: string
}

export const Spacer = ({ direction, grow = true, className }: SpacerProps) => {
  return (
    <div
      className={clsx(
        grow ? 'shrink-0 grow basis-0' : 'shrink-0',
        direction === 'horizontal' && 'h-0 w-full',
        direction === 'vertical' && 'h-full w-0',
        className,
      )}
    />
  )
}
