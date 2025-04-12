import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const circleVariants = cva('h-8 w-8 rounded-full flex items-center justify-center border border-solid', {
  variants: {
    variant: {
      amber: 'bg-amber-100 border-amber-500',
      lime: 'bg-lime-100 border-lime-500',
      emerald: 'bg-emerald-100 border-emerald-500',
      sky: 'bg-sky-100 border-sky-500',
      indigo: 'bg-indigo-100 border-indigo-500',
      violet: 'bg-violet-100 border-violet-500',
      fuchsia: 'bg-fuchsia-100 border-fuchsia-500',
      rose: 'bg-rose-100 border-rose-500',
      default: 'bg-gray-100 border-gray-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type Color = 'amber' | 'lime' | 'emerald' | 'sky' | 'indigo' | 'violet' | 'fuchsia' | 'rose' | 'default'
export const ColorDot = ({ value }: { value: Color }) => {
  return <span className={cn(circleVariants({ variant: value }))} />
}
