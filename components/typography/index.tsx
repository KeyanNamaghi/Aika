import { cn } from '@/lib/utils'
type Typography<T extends React.ElementType> = { as?: T; children: React.ReactNode } & React.ComponentPropsWithoutRef<T>

export const Caption = <T extends React.ElementType>({ as, className, children }: Typography<T>) => {
  const Component = as || 'caption'
  return <Component className={cn('text-xs', className)}>{children}</Component>
}

export const Body = <T extends React.ElementType>({ as, className, children }: Typography<T>) => {
  const Component = as || 'p'
  return <Component className={cn('text-base', className)}>{children}</Component>
}

export const Heading = <T extends React.ElementType>({ as, className, children }: Typography<T>) => {
  const Component = as || 'h1'
  return <Component className={cn('text-3xl font-bold', className)}>{children}</Component>
}

export const SubHeading = <T extends React.ElementType>({ as, className, children }: Typography<T>) => {
  const Component = as || 'h2'
  return <Component className={cn('text-xl font-bold', className)}>{children}</Component>
}
